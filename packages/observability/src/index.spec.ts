import { describe, expect, it } from 'vitest';

import { createRequestContext, getRequestContext, requestContextStorage } from './index.js';

describe('request correlation', () => {
  it('preserves a valid inbound request ID', () => {
    expect(createRequestContext('request-123_ABC').correlationId).toBe('request-123_ABC');
  });

  it('replaces malformed values with a generated UUID', () => {
    expect(createRequestContext('invalid value').correlationId).toMatch(/^[0-9a-f-]{36}$/i);
  });

  it('keeps request context isolated in async storage', () => {
    const context = createRequestContext('request-123');

    requestContextStorage.run(context, () => {
      expect(getRequestContext()).toEqual(context);
    });
  });
});
