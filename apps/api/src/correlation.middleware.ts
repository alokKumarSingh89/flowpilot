import type { NextFunction, Request, Response } from 'express';

import {
  CORRELATION_ID_HEADER,
  createRequestContext,
  requestContextStorage,
} from '@flowpilot/observability';

export function correlationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const headerValue = request.header(CORRELATION_ID_HEADER);
  const context = createRequestContext(headerValue);

  response.setHeader(CORRELATION_ID_HEADER, context.correlationId);
  requestContextStorage.run(context, () => next());
}
