from datetime import datetime, timezone
from typing import Dict, Any
from fastapi import APIRouter
from pydantic import BaseModel, Field

from platform.config import settings

router = APIRouter(prefix="/api", tags=["Health & Readiness"])


class HealthResponse(BaseModel):
    status: str
    version: str
    timestamp: str
    module: str
    env: str
    details: Dict[str, Any] = Field(default_factory=dict)


@router.get("/health", response_model=HealthResponse)
def health_check():
    """
    Liveness probe. Indicates if the Platform API process is up and serving requests.
    """
    return HealthResponse(
        status="healthy",
        version=settings.version,
        timestamp=datetime.now(timezone.utc).isoformat(),
        module="platform",
        env=settings.env,
        details={
            "app_name": settings.app_name
        }
    )


@router.get("/readiness", response_model=HealthResponse)
def readiness_check():
    """
    Readiness probe. Indicates if the Platform API and its upstream store connections are ready.
    """
    # Check upstream orchestrator adapter availability
    from platform.adapters.orchestrator_adapter import orchestrator_adapter
    is_ready = True
    adapter_status = "ready"

    try:
        # Simple non-destructive query to verify upstream readiness
        _ = orchestrator_adapter.get_findings()
    except Exception as e:
        is_ready = False
        adapter_status = f"unhealthy: {str(e)}"

    overall_status = "ready" if is_ready else "not_ready"

    return HealthResponse(
        status=overall_status,
        version=settings.version,
        timestamp=datetime.now(timezone.utc).isoformat(),
        module="platform",
        env=settings.env,
        details={
            "orchestrator_adapter": adapter_status
        }
    )
