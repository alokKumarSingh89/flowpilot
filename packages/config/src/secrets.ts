import { inspect } from 'node:util';

export type SecretErrorCode =
  | 'SECRET_REFERENCE_INVALID'
  | 'SECRET_ACCESS_DENIED'
  | 'SECRET_MISSING'
  | 'SECRET_UNAVAILABLE'
  | 'SECRET_INVALID';

export class SecretResolutionError extends Error {
  constructor(readonly code: SecretErrorCode) {
    super('Secret resolution failed.');
    this.name = 'SecretResolutionError';
    Object.freeze(this);
  }
}

/** Server-only adapter. Undefined means missing; failures must reject. */
export interface SecretProvider {
  read(reference: string, signal: AbortSignal): Promise<unknown>;
}

/** Raw access is explicit and reserved for trusted server-side consumers. */
export class SecretValue {
  readonly #value: string;

  constructor(value: string) {
    if (typeof value !== 'string' || value.trim().length === 0 || value.includes('\0')) {
      throw new SecretResolutionError('SECRET_INVALID');
    }
    this.#value = value;
    Object.freeze(this);
  }

  reveal(): string {
    return this.#value;
  }

  toJSON(): string {
    return '[REDACTED]';
  }

  toString(): string {
    return '[REDACTED]';
  }

  [inspect.custom](): string {
    return '[REDACTED]';
  }
}

export interface SecretResolver {
  resolve(reference: unknown): Promise<SecretValue>;
}

const referencePattern = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/;

function validReference(reference: unknown): reference is string {
  return (
    typeof reference === 'string' && reference.length <= 128 && referencePattern.test(reference)
  );
}

/** Grants are supplied by trusted bootstrap code, never a request or tenant identifier. */
export function createSecretResolver(
  provider: SecretProvider,
  allowedReferences: readonly string[],
  timeoutMs = 5_000,
): SecretResolver {
  if (!Array.isArray(allowedReferences) || !allowedReferences.every(validReference)) {
    throw new SecretResolutionError('SECRET_REFERENCE_INVALID');
  }
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 30_000) {
    throw new SecretResolutionError('SECRET_INVALID');
  }
  const grants = new Set(allowedReferences);

  return Object.freeze({
    async resolve(reference: unknown): Promise<SecretValue> {
      if (!validReference(reference)) {
        throw new SecretResolutionError('SECRET_REFERENCE_INVALID');
      }
      if (!grants.has(reference)) {
        throw new SecretResolutionError('SECRET_ACCESS_DENIED');
      }

      const controller = new AbortController();
      let timer: ReturnType<typeof setTimeout> | undefined;
      let value: unknown;
      try {
        value = await Promise.race([
          Promise.resolve().then(() => provider.read(reference, controller.signal)),
          new Promise<never>((_resolve, reject) => {
            timer = setTimeout(() => {
              reject(new SecretResolutionError('SECRET_UNAVAILABLE'));
              controller.abort();
            }, timeoutMs);
          }),
        ]);
      } catch {
        // Never retain provider errors, causes, references, or response bodies.
        throw new SecretResolutionError('SECRET_UNAVAILABLE');
      } finally {
        clearTimeout(timer);
      }

      if (value === undefined) {
        throw new SecretResolutionError('SECRET_MISSING');
      }
      if (typeof value !== 'string') {
        throw new SecretResolutionError('SECRET_INVALID');
      }
      return new SecretValue(value);
    },
  });
}
