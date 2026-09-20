import { getRequestContext } from './index.js';

const diagnosticCodes = [
  'SECRET_RESOLVED',
  'SECRET_REFERENCE_INVALID',
  'SECRET_ACCESS_DENIED',
  'SECRET_MISSING',
  'SECRET_UNAVAILABLE',
  'SECRET_INVALID',
  'CONFIGURATION_INVALID',
  'UNEXPECTED_ERROR',
] as const;

export type DiagnosticCode = (typeof diagnosticCodes)[number];

export interface SafeDiagnostic {
  readonly event: 'platform_diagnostic';
  readonly code: DiagnosticCode;
  readonly correlationId: string;
}

/** Project only a known code; never traverse or serialize arbitrary errors/configuration. */
export function sanitizeDiagnostic(input: unknown): SafeDiagnostic {
  const code = diagnosticCodes.find((candidate) => candidate === input) ?? 'UNEXPECTED_ERROR';
  return Object.freeze({
    event: 'platform_diagnostic',
    code,
    correlationId: getRequestContext().correlationId,
  });
}
