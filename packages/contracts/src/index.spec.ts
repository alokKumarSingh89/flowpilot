import { describe, expect, it } from 'vitest';

import { toErrorResponse } from './index.js';

describe('safe error contract', () => {
  it('returns a stable response without path or exception details', () => {
    const response = toErrorResponse({
      status: 500,
      correlationId: 'request-123',
      path: '/contains-a-token/secret-value',
    });

    expect(response).toEqual({
      version: 'v1',
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred.',
        requestId: 'request-123',
      },
    });
    expect(JSON.stringify(response)).not.toContain('secret-value');
    expect(JSON.stringify(response)).not.toContain('stack');
  });
});
