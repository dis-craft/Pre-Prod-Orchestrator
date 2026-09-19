from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from platform.config import settings
from platform.logging import logger
from platform.errors import register_error_handlers
from platform.api.health import router as health_router
from platform.api.router import router as findings_router
from platform.api.validation_router import router as validation_router
from platform.api.scan_router import router as scan_router


app = FastAPI(
    title=settings.app_name,
    description="Person 4 Platform API for Pre-Prod Security Remediation Orchestrator",
    version=settings.version
)

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

logger.info(f"Platform API initialized (app={settings.app_name}, version={settings.version}, env={settings.env})")
