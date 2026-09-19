import { describe, expect, it } from 'vitest';

import { ConfigurationError, loadRuntimeConfig, summarizeRuntimeConfig } from './index.js';

describe('runtime configuration', () => {
  it('accepts allow-listed non-secret configuration', () => {
    const config = loadRuntimeConfig({
      NODE_ENV: 'test',
      API_PORT: '3100',
      SERVICE_NAME: 'api',
      DATABASE_URL: 'must-not-be-read',
    });

    expect(summarizeRuntimeConfig(config)).toEqual({
      environment: 'test',
      port: 3100,
      serviceName: 'api',
    });
    expect(JSON.stringify(summarizeRuntimeConfig(config))).not.toContain('must-not-be-read');
  });

  it.each([
    [{ API_PORT: '3000' }],
    [{ NODE_ENV: 'test' }],
    [{ NODE_ENV: 'preview', API_PORT: '3000' }],
    [{ NODE_ENV: 'test', API_PORT: '0' }],
    [{ NODE_ENV: 'test', API_PORT: 'not-a-port' }],
    [{ NODE_ENV: 'test', API_PORT: '3000', SERVICE_NAME: 'API Service' }],
  ])('fails closed for invalid configuration', (environment) => {
    let error: unknown;

    try {
      loadRuntimeConfig(environment);
    } catch (caughtError: unknown) {
      error = caughtError;
    }

    expect(error).toBeInstanceOf(ConfigurationError);
    if (!(error instanceof ConfigurationError)) {
      throw new Error('Expected a ConfigurationError.');
    }

    expect(error.message).toBe('Runtime configuration is invalid.');
    expect(error.code).toBe('CONFIGURATION_INVALID');
  });
});
