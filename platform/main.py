from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from platform.config import settings
from platform.logging import logger
from platform.errors import register_error_handlers
from platform.middleware import (
    SecurityHeadersMiddleware,
    RequestCorrelationMiddleware,
    RateLimiterMiddleware
)
from platform.api.health import router as health_router
from platform.api.router import router as findings_router
from platform.api.validation_router import router as validation_router
from platform.api.scan_router import router as scan_router
from platform.api.ci_router import router as ci_router
from platform.api.evidence_router import router as evidence_router
from platform.api.workflow_router import router as workflow_router


app = FastAPI(
    title=settings.app_name,
    description="Person 4 Platform API for Pre-Prod Security Remediation Orchestrator",
    version=settings.version
)

# Configure Security, Correlation, and Rate Limiting Middlewares
app.add_middleware(RateLimiterMiddleware, max_requests=150, window_seconds=60)
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(RequestCorrelationMiddleware)

# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register custom error handlers
register_error_handlers(app)

# Include Platform API routers
app.include_router(health_router)
app.include_router(findings_router)
app.include_router(validation_router)
app.include_router(scan_router)
app.include_router(ci_router)
app.include_router(evidence_router)
app.include_router(workflow_router)

logger.info(f"Platform API initialized (app={settings.app_name}, version={settings.version}, env={settings.env})")
