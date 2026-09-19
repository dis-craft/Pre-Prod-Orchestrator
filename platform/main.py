from datetime import datetime, timezone
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from platform.api.router import router as findings_router


class HealthResponse(BaseModel):
    status: str
    version: str
    timestamp: str
    module: str


app = FastAPI(
    title="Platform Security & Workflow API",
    description="Person 4 Platform API for Pre-Prod Security Remediation Orchestrator",
    version="1.0.0"
)

# CORS configuration
origins_str = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
allowed_origins = [o.strip() for o in origins_str.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Platform P1 router
app.include_router(findings_router)


@app.get("/api/health", response_model=HealthResponse)
def health_check():
    return HealthResponse(
        status="healthy",
        version="1.0.0",
        timestamp=datetime.now(timezone.utc).isoformat(),
        module="platform"
    )
