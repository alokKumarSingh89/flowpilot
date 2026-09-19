import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { afterEach, describe, expect, it } from 'vitest';

import { createApplication } from '../src/application.js';

describe('API foundation contracts', () => {
  let application: INestApplication | undefined;

  function httpServer(): Parameters<typeof request>[0] {
    if (application === undefined) {
      throw new Error('The test application has not been initialized.');
    }

    return application.getHttpServer() as Parameters<typeof request>[0];
  }

  afterEach(async () => {
    await application?.close();
    application = undefined;
  });

  it('returns a generated correlation ID and a safe error contract for an unknown route', async () => {
    application = await createApplication();

    const response = await request(httpServer()).get('/not-a-product-endpoint').expect(404);

    expect(response.headers['x-request-id']).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(response.body).toEqual({
      version: 'v1',
      error: {
        code: 'NOT_FOUND',
        message: 'The requested resource was not found.',
        requestId: response.headers['x-request-id'],
      },
    });
    expect(JSON.stringify(response.body)).not.toContain('stack');
  });

  it('propagates a valid inbound correlation ID and replaces malformed values', async () => {
    application = await createApplication();

    const suppliedId = 'request-123_ABC';
    await request(httpServer())
      .get('/missing')
      .set('x-request-id', suppliedId)
      .expect(404)
      .expect('x-request-id', suppliedId);

    const malformedResponse = await request(httpServer())
      .get('/missing')
      .set('x-request-id', 'invalid value with spaces')
      .expect(404);

    expect(malformedResponse.headers['x-request-id']).toMatch(/^[0-9a-f-]{36}$/i);
  });

  it('publishes the OpenAPI document without a product controller', async () => {
    application = await createApplication();

    const response = await request(httpServer()).get('/docs-json').expect(200);

    expect(response.text).toContain('"title":"FlowPilot API"');
    expect(response.text).toContain('"paths":{}');
  });
});
