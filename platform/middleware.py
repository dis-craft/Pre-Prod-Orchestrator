import uuid
import time
from typing import Dict, Tuple
from fastapi import Request, Response, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint

from platform.logging import logger
from platform.config import settings


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """
    Applies security headers to every outgoing Platform HTTP response.
    """
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        return response


class RequestCorrelationMiddleware(BaseHTTPMiddleware):
    """
    Tracks and injects request correlation ID (X-Request-ID) into log context and response headers.
    """
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        request_id = request.headers.get("X-Request-ID") or f"req-{uuid.uuid4().hex[:12]}"
        request.state.request_id = request_id

        start_time = time.time()
        response = await call_next(request)
        duration_ms = round((time.time() - start_time) * 1000, 2)

        response.headers["X-Request-ID"] = request_id

        logger.info(
            f"request_id={request_id} method={request.method} path={request.url.path} "
            f"status={response.status_code} duration_ms={duration_ms}"
        )

        return response


class RateLimiterMiddleware(BaseHTTPMiddleware):
    """
    Lightweight, in-memory rate limiter per IP address for API protection.
    Limits requests to max_requests per window_seconds per client IP.
    """
    def __init__(self, app, max_requests: int = 120, window_seconds: int = 60):
        super().__init__(app)
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        # client_ip -> (request_count, window_start_timestamp)
        self._ip_cache: Dict[str, Tuple[int, float]] = {}

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        client_ip = request.client.host if request.client else "unknown"
        now = time.time()

        count, window_start = self._ip_cache.get(client_ip, (0, now))

        if now - window_start > self.window_seconds:
            # Reset window
            count = 1
            window_start = now
        else:
            count += 1

        self._ip_cache[client_ip] = (count, window_start)

        if count > self.max_requests:
            logger.warning(f"Rate limit exceeded for client_ip={client_ip} (count={count})")
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={
                    "error": {
                        "code": "RATE_LIMIT_EXCEEDED",
                        "message": "Too many requests. Please try again later.",
                        "timestamp": request.state.request_id if hasattr(request.state, "request_id") else ""
                    }
                },
                headers={"Retry-After": str(self.window_seconds)}
            )

        return await call_next(request)
