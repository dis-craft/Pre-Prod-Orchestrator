export type ApiErrorKind = 
  | 'NETWORK_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'RATE_LIMITED'
  | 'SERVER_ERROR'
  | 'TIMEOUT'
  | 'INVALID_RESPONSE';

export class ApiError extends Error {
  public readonly kind: ApiErrorKind;
  public readonly statusCode?: number;
  public readonly details?: unknown;

  constructor(message: string, kind: ApiErrorKind, statusCode?: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.kind = kind;
    this.statusCode = statusCode;
    this.details = details;
  }

  public static fromStatusCode(statusCode: number, detailMessage?: string): ApiError {
    switch (statusCode) {
      case 401:
        return new ApiError(detailMessage || 'Authentication required to access security backend.', 'UNAUTHORIZED', 401);
      case 403:
        return new ApiError(detailMessage || 'Insufficient permissions for this operation.', 'FORBIDDEN', 403);
      case 404:
        return new ApiError(detailMessage || 'Requested security resource not found.', 'NOT_FOUND', 404);
      case 422:
        return new ApiError(detailMessage || 'Invalid request payload or parameters.', 'VALIDATION_ERROR', 422);
      case 429:
        return new ApiError(detailMessage || 'Rate limit exceeded. Please try again later.', 'RATE_LIMITED', 429);
      default:
        if (statusCode >= 500) {
          return new ApiError(detailMessage || 'Internal backend server error.', 'SERVER_ERROR', statusCode);
        }
        return new ApiError(detailMessage || `HTTP Request failed with status ${statusCode}`, 'SERVER_ERROR', statusCode);
    }
  }

  public static networkError(originalError?: Error): ApiError {
    return new ApiError(
      `Unable to connect to Security Orchestrator backend API. ${originalError?.message || ''}`.trim(),
      'NETWORK_ERROR'
    );
  }

  public static timeout(): ApiError {
    return new ApiError('Backend API request timed out.', 'TIMEOUT');
  }
}
