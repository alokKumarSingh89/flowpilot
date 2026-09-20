export type FoundationErrorCode = 'CONFIGURATION_INVALID' | 'INTERNAL_ERROR' | 'NOT_FOUND';

export interface ErrorResponse {
  readonly version: 'v1';
  readonly error: {
    readonly code: FoundationErrorCode;
    readonly message: string;
    readonly requestId: string;
  };
}

const errorMessages: Readonly<Record<FoundationErrorCode, string>> = {
  CONFIGURATION_INVALID: 'The service configuration is invalid.',
  INTERNAL_ERROR: 'An unexpected error occurred.',
  NOT_FOUND: 'The requested resource was not found.',
};

function codeForStatus(status: number): FoundationErrorCode {
  if (status === 404) {
    return 'NOT_FOUND';
  }

  return 'INTERNAL_ERROR';
}

export function toErrorResponse(input: {
  readonly status: number;
  readonly correlationId: string;
  readonly path: string;
}): ErrorResponse {
  const code = codeForStatus(input.status);

  return {
    version: 'v1',
    error: {
      code,
      message: errorMessages[code],
      requestId: input.correlationId,
    },
  };
}
