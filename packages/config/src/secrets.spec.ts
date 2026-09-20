import { inspect } from 'node:util';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  createSecretResolver,
  loadRuntimeConfig,
  SecretResolutionError,
  SecretValue,
  summarizeRuntimeConfig,
} from './index.js';

// Synthetic, nonfunctional fixture; never a credential for a real service.
const fixture = 'synthetic-private-value';

afterEach(() => vi.useRealTimers());

describe('server-only secret contract (SEC-003, SEC-004, OBS-006)', () => {
  it('resolves only bootstrap grants, snapshots them, and does not cache values', async () => {
    const read = vi.fn().mockResolvedValueOnce(fixture).mockResolvedValueOnce('rotated-fixture');
    const grants = ['service.connection'];
    const resolver = createSecretResolver({ read }, grants);
    grants.push('other.connection');
    const value = await resolver.resolve('service.connection');
    expect(value.reveal()).toBe(fixture);
    expect((await resolver.resolve('service.connection')).reveal()).toBe('rotated-fixture');
    await expect(resolver.resolve('other.connection')).rejects.toMatchObject({
      code: 'SECRET_ACCESS_DENIED',
    });
    expect(read).toHaveBeenCalledTimes(2);
    expect(read).toHaveBeenCalledWith('service.connection', expect.any(AbortSignal));
  });

  it.each([undefined, null, 42, {}, '', '../secret', 'https://secret', 'UPPER', 'x'.repeat(129)])(
    'rejects malformed references before provider access: %j',
    async (reference) => {
      const read = vi.fn();
      await expect(createSecretResolver({ read }, []).resolve(reference)).rejects.toMatchObject({
        code: 'SECRET_REFERENCE_INVALID',
      });
      expect(read).not.toHaveBeenCalled();
    },
  );

  it('denies ungranted references without accessing the provider', async () => {
    const read = vi.fn();
    await expect(
      createSecretResolver({ read }, ['service.connection']).resolve('other.connection'),
    ).rejects.toMatchObject({ code: 'SECRET_ACCESS_DENIED' });
    expect(read).not.toHaveBeenCalled();
  });

  it('validates grant configuration and timeout bounds', () => {
    const read = vi.fn();
    expect(() => createSecretResolver({ read }, ['../invalid'])).toThrow(SecretResolutionError);
    for (const timeout of [0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, 30_001]) {
      expect(() => createSecretResolver({ read }, [], timeout)).toThrow(SecretResolutionError);
    }
    expect(read).not.toHaveBeenCalled();
  });

  it.each([
    [undefined, 'SECRET_MISSING'],
    [null, 'SECRET_INVALID'],
    [123, 'SECRET_INVALID'],
    [{ value: fixture }, 'SECRET_INVALID'],
    ['', 'SECRET_INVALID'],
    ['  ', 'SECRET_INVALID'],
    ['value\0', 'SECRET_INVALID'],
  ])('normalizes invalid provider output without disclosure', async (value, code) => {
    const resolver = createSecretResolver({ read: vi.fn().mockResolvedValue(value) }, [
      'service.key',
    ]);
    await expect(resolver.resolve('service.key')).rejects.toMatchObject({ code });
  });

  it('discards raw provider errors, even errors claiming a public failure code', async () => {
    const raw = Object.assign(new Error(fixture, { cause: { credential: fixture } }), {
      code: 'SECRET_MISSING',
    });
    const resolver = createSecretResolver({ read: vi.fn().mockRejectedValue(raw) }, [
      'service.key',
    ]);
    try {
      await resolver.resolve('service.key');
      expect.fail('Expected provider failure');
    } catch (error) {
      expect(error).toBeInstanceOf(SecretResolutionError);
      expect(error).toMatchObject({ code: 'SECRET_UNAVAILABLE' });
      expect(error).not.toHaveProperty('cause');
      for (const output of [JSON.stringify(error), String(error), inspect(error)]) {
        expect(output).not.toContain(fixture);
        expect(output).not.toContain('service.key');
      }
    }
  });

  it('normalizes synchronous provider exceptions', async () => {
    const read = vi.fn(() => {
      throw new Error(fixture);
    });
    await expect(
      createSecretResolver({ read }, ['service.key']).resolve('service.key'),
    ).rejects.toMatchObject({ code: 'SECRET_UNAVAILABLE' });
  });

  it('bounds provider waiting, aborts once, and does not retry', async () => {
    vi.useFakeTimers();
    let signal: AbortSignal | undefined;
    const read = vi.fn((_reference: string, abortSignal: AbortSignal) => {
      signal = abortSignal;
      return new Promise<unknown>(() => {});
    });
    const resolution = createSecretResolver({ read }, ['service.key'], 50).resolve('service.key');
    const assertion = expect(resolution).rejects.toMatchObject({ code: 'SECRET_UNAVAILABLE' });
    await vi.advanceTimersByTimeAsync(50);
    await assertion;
    expect(signal?.aborted).toBe(true);
    expect(read).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('clears the timeout after a successful resolution', async () => {
    vi.useFakeTimers();
    await createSecretResolver({ read: vi.fn().mockResolvedValue(fixture) }, [
      'service.key',
    ]).resolve('service.key');
    expect(vi.getTimerCount()).toBe(0);
  });

  it('redacts secrets from serialization, inspection, coercion, and property enumeration', () => {
    const value = new SecretValue(fixture);
    for (const output of [
      JSON.stringify({ connection: value }),
      String(value),
      inspect({ connection: value }),
      inspect(value, { showHidden: true, customInspect: false }),
      JSON.stringify({ ...value }),
    ]) {
      expect(output).not.toContain(fixture);
    }
    expect(Object.keys(value)).toEqual([]);
    expect(Object.isFrozen(value)).toBe(true);
    expect(value.reveal()).toBe(fixture);
  });

  it('keeps secret configuration outside public runtime config and its summary', () => {
    const config = loadRuntimeConfig({
      NODE_ENV: 'test',
      API_PORT: '3000',
      DATABASE_URL: fixture,
      PROVIDER_TOKEN: fixture,
    });
    expect(JSON.stringify(config)).not.toContain(fixture);
    const serverConfig = { ...config, connection: new SecretValue(fixture) };
    expect(summarizeRuntimeConfig(serverConfig)).toEqual(config);
  });
});
