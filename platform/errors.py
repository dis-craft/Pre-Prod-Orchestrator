from datetime import datetime, timezone
from typing import Optional, Dict, Any
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse


class PlatformError(Exception):
    """Base exception for all Platform domain errors."""
    def __init__(self, message: str, code: str = "INTERNAL_ERROR", status_code: int = 500, details: Optional[Dict[str, Any]] = None):
        super().__init__(message)
        self.message = message
        self.code = code
        self.status_code = status_code
        self.details = details or {}


class NotFoundError(PlatformError):
    def __init__(self, message: str = "Resource not found", details: Optional[Dict[str, Any]] = None):
        super().__init__(message=message, code="NOT_FOUND", status_code=status.HTTP_404_NOT_FOUND, details=details)


class ValidationError(PlatformError):
    def __init__(self, message: str = "Validation error", details: Optional[Dict[str, Any]] = None):
        super().__init__(message=message, code="VALIDATION_ERROR", status_code=status.HTTP_400_BAD_REQUEST, details=details)


class UpstreamServiceError(PlatformError):
    def __init__(self, message: str = "Upstream service error", details: Optional[Dict[str, Any]] = None):
        super().__init__(message=message, code="UPSTREAM_SERVICE_ERROR", status_code=status.HTTP_502_BAD_GATEWAY, details=details)


def register_error_handlers(app: FastAPI) -> None:
    """
    Registers platform standard error handlers on the FastAPI app instance.
    """
    @app.exception_handler(PlatformError)
    async def platform_error_handler(request: Request, exc: PlatformError):
        payload = {
            "error": {
                "code": exc.code,
                "message": exc.message,
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "details": exc.details
            }
        }
        return JSONResponse(status_code=exc.status_code, content=payload)
