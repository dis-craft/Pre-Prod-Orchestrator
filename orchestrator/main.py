from typing import List
from datetime import datetime, timezone
import os

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from .schemas import (
    HealthResponse,
    DashboardMetrics,
    Repository,
    SecurityFinding,
    RemediationResult,
    Validation,
    PullRequest,
    AuditEvent,
    StartRemediationRequest
)
from .store import store

app = FastAPI(
    title="Security Orchestrator API",
    description="Backend HTTP API for Pre-Prod Security Remediation Orchestrator",
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


@app.get("/api/health", response_model=HealthResponse)
def health_check():
    return HealthResponse(
        status="healthy",
        version="1.0.0",
        timestamp=datetime.now(timezone.utc).isoformat()
    )


@app.get("/api/metrics", response_model=DashboardMetrics)
def get_metrics():
    return store.get_metrics()


@app.get("/api/repositories", response_model=List[Repository])
def get_repositories():
    return store.get_repositories()


@app.get("/api/repositories/{name:path}", response_model=Repository)
def get_repository(name: str):
    repo = store.get_repository(name)
    if not repo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Repository '{name}' not found."
        )
    return repo


@app.get("/api/findings", response_model=List[SecurityFinding])
def get_findings():
    return store.get_findings()


@app.get("/api/findings/{finding_id}", response_model=SecurityFinding)
def get_finding(finding_id: str):
    finding = store.get_finding(finding_id)
    if not finding:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Finding '{finding_id}' not found."
        )
    return finding


@app.post("/api/remediations", response_model=RemediationResult, status_code=status.HTTP_201_CREATED)
def start_remediation(req: StartRemediationRequest):
    try:
        return store.start_remediation(req.finding_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


@app.get("/api/remediations/{rem_id}", response_model=RemediationResult)
def get_remediation(rem_id: str):
    rem = store.get_remediation(rem_id)
    if not rem:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Remediation '{rem_id}' not found."
        )
    return rem


@app.get("/api/remediations/finding/{finding_id}", response_model=RemediationResult)
def get_remediation_by_finding(finding_id: str):
    rem = store.get_remediation_by_finding(finding_id)
    if not rem:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Remediation for finding '{finding_id}' not found."
        )
    return rem


@app.post("/api/validations/{val_id}/run", response_model=Validation)
def run_validation(val_id: str):
    try:
        return store.run_validation(val_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


@app.get("/api/validations/{val_id}", response_model=Validation)
def get_validation(val_id: str):
    val = store.get_validation(val_id)
    if not val:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Validation '{val_id}' not found."
        )
    return val


@app.get("/api/validations/remediation/{rem_id}", response_model=Validation)
def get_validation_by_remediation(rem_id: str):
    val = store.get_validation_by_remediation(rem_id)
    if not val:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Validation for remediation '{rem_id}' not found."
        )
    return val


@app.get("/api/pull-requests", response_model=List[PullRequest])
def get_pull_requests():
    return store.get_pull_requests()


@app.get("/api/pull-requests/{pr_id}", response_model=PullRequest)
def get_pull_request(pr_id: str):
    pr = store.get_pull_request(pr_id)
    if not pr:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Pull request '{pr_id}' not found."
        )
    return pr


@app.get("/api/audit", response_model=List[AuditEvent])
def get_audit_events():
    return store.get_audit_events()
