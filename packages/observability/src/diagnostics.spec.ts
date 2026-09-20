import { inspect } from 'node:util';
import { describe, expect, it } from 'vitest';

import { createRequestContext, requestContextStorage, sanitizeDiagnostic } from './index.js';

describe('diagnostic redaction (OBS-006)', () => {
  it.each([
    'SECRET_RESOLVED',
    'SECRET_REFERENCE_INVALID',
    'SECRET_ACCESS_DENIED',
    'SECRET_MISSING',
    'SECRET_UNAVAILABLE',
    'SECRET_INVALID',
    'CONFIGURATION_INVALID',
  ])('retains only the known outcome and correlation: %s', (code) => {
    requestContextStorage.run(createRequestContext('request-123'), () => {
      expect(sanitizeDiagnostic(code)).toEqual({
        event: 'platform_diagnostic',
        code,
        correlationId: 'request-123',
      });
    });
  });

  it('discards entire untrusted diagnostics without invoking getters or serializers', () => {
    const fixture = 'synthetic-private-value';
    const hostile = {
      get code() {
        throw new Error(fixture);
      },
      toJSON() {
        throw new Error(fixture);
      },
      [inspect.custom]() {
        throw new Error(fixture);
      },
    };
    const circular: Record<string, unknown> = { connection: fixture };
    circular.self = circular;
    for (const input of [fixture, new Error(fixture), circular, hostile, null, 42]) {
      const result = sanitizeDiagnostic(input);
      expect(result.code).toBe('UNEXPECTED_ERROR');
      expect(JSON.stringify(result)).not.toContain(fixture);
      expect(inspect(result)).not.toContain(fixture);
      expect(Object.keys(result)).toEqual(['event', 'code', 'correlationId']);
    }
  });

  it('keeps concurrent operation correlation contexts separate', async () => {
    const results = await Promise.all(
      ['request-a', 'request-b'].map((id) =>
        requestContextStorage.run(createRequestContext(id), async () => {
          await Promise.resolve();
          return sanitizeDiagnostic('SECRET_RESOLVED');
        }),
      ),
    );
    expect(results.map((result) => result.correlationId)).toEqual(['request-a', 'request-b']);
  });
});
