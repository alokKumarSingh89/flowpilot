import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

export const CORRELATION_ID_HEADER = 'x-request-id';

export interface RequestContext {
  readonly correlationId: string;
}

const correlationIdPattern = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;

export const requestContextStorage = new AsyncLocalStorage<RequestContext>();

export function createRequestContext(inboundCorrelationId: string | undefined): RequestContext {
  return {
    correlationId:
      inboundCorrelationId !== undefined && correlationIdPattern.test(inboundCorrelationId)
        ? inboundCorrelationId
        : randomUUID(),
  };
}

export function getRequestContext(): RequestContext {
  const context = requestContextStorage.getStore();

  if (context === undefined) {
    return { correlationId: randomUUID() };
  }

  return context;
}
