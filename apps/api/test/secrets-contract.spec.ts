import { inspect } from 'node:util';
import { describe, expect, it, vi } from 'vitest';

import {
  createSecretResolver,
  SecretResolutionError,
  type SecretProvider,
} from '@flowpilot/config';
import {
  createRequestContext,
  requestContextStorage,
  sanitizeDiagnostic,
} from '@flowpilot/observability';

describe('public secret/diagnostic boundary integration (TASK-PLAT-002)', () => {
  it('supports an injected provider and correlated safe diagnostics without provider imports', async () => {
    const fixture = 'synthetic-private-value';
    const provider: SecretProvider = {
      read: vi.fn().mockResolvedValueOnce(fixture).mockRejectedValueOnce(new Error(fixture)),
    };
    const resolver = createSecretResolver(provider, ['service.connection']);
    const output: string[] = [];

    await requestContextStorage.run(createRequestContext('bootstrap-123'), async () => {
      const secret = await resolver.resolve('service.connection');
      expect(secret.reveal()).toBe(fixture);
      output.push(JSON.stringify({ connection: secret }), inspect(secret));
      output.push(JSON.stringify(sanitizeDiagnostic('SECRET_RESOLVED')));
      try {
        await resolver.resolve('service.connection');
        expect.fail('Expected failure');
      } catch (error) {
        expect(error).toBeInstanceOf(SecretResolutionError);
        const code = error instanceof SecretResolutionError ? error.code : 'UNEXPECTED_ERROR';
        const diagnostic = sanitizeDiagnostic(code);
        expect(diagnostic).toEqual({
          event: 'platform_diagnostic',
          code: 'SECRET_UNAVAILABLE',
          correlationId: 'bootstrap-123',
        });
        output.push(JSON.stringify(diagnostic), inspect(error));
      }
    });
    expect(output.join('\n')).not.toContain(fixture);
    expect(output.join('\n')).not.toContain('service.connection');
  });
});
