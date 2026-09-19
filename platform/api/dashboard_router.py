from typing import List, Optional, Dict, Any
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from orchestrator.store import store as upstream_store
from platform.adapters.orchestrator_adapter import orchestrator_adapter
from platform.errors import NotFoundError

router = APIRouter(prefix="/api", tags=["Dashboard & Orchestration Proxy"])


class StartRemediationRequest(BaseModel):
    findingId: str


@router.get("/metrics")
def get_dashboard_metrics():
    """
    Get aggregated dashboard metrics for Live Mode.
    """
    metrics = upstream_store.get_metrics()
    return metrics.model_dump(by_alias=True)


@router.get("/repositories")
def list_repositories():
    """
    List monitored repositories and compliance statuses.
    """
    repos = upstream_store.get_repositories()
    return [r.model_dump(by_alias=True) for r in repos]


@router.get("/repositories/{name:path}")
def get_repository_detail(name: str):
    """
    Get detailed repository compliance by full name.
    """
    repo = upstream_store.get_repository(name)
    if not repo:
        raise NotFoundError(message=f"Repository '{name}' not found.")
    return repo.model_dump(by_alias=True)


@router.get("/remediations/{rem_id}")
def get_remediation_detail(rem_id: str):
    """
    Get candidate remediation patch by Remediation ID.
    """
    rem = upstream_store.get_remediation(rem_id)
    if not rem:
        raise NotFoundError(message=f"Remediation '{rem_id}' not found.")
    return rem.model_dump(by_alias=True)


@router.get("/remediations/finding/{finding_id}")
def get_remediation_by_finding(finding_id: str):
    """
    Get candidate remediation patch by Finding ID.
    """
    rem = upstream_store.get_remediation_by_finding(finding_id)
    if not rem:
        raise NotFoundError(message=f"Remediation for finding '{finding_id}' not found.")
    return rem.model_dump(by_alias=True)


@router.post("/remediations")
def start_remediation(body: StartRemediationRequest):
    """
    Trigger remediation patch generation for a security finding.
    """
    try:
        rem = upstream_store.start_remediation(body.findingId)
        return rem.model_dump(by_alias=True)
    except ValueError as e:
        raise NotFoundError(message=str(e))


@router.get("/validations/remediation/{remediation_id}")
def get_validation_by_remediation_alias(remediation_id: str):
    """
    Alias endpoint for fetching validation status by Remediation ID.
    """
    val = orchestrator_adapter.get_validation_by_remediation(remediation_id)
    if not val:
        raise NotFoundError(message=f"Validation for remediation '{remediation_id}' not found.")
    return val


@router.post("/validations/{val_id}/run")
def run_validation_pipeline(val_id: str):
    """
    Execute sandbox validation pipeline steps for a candidate remediation patch.
    """
    try:
        val_raw = upstream_store.run_validation(val_id)
        val = orchestrator_adapter.get_validation(val_id)
        return val.model_dump(by_alias=True) if val else val_raw.model_dump(by_alias=True)
    except ValueError as e:
        raise NotFoundError(message=str(e))


@router.get("/pull-requests")
def list_pull_requests():
    """
    List pull requests created for security remediations.
    """
    prs = upstream_store.get_pull_requests()
    return [pr.model_dump(by_alias=True) for pr in prs]


@router.get("/pull-requests/{pr_id}")
def get_pull_request_detail(pr_id: str):
    """
    Get pull request detail by ID.
    """
    pr = upstream_store.get_pull_request(pr_id)
    if not pr:
        raise NotFoundError(message=f"Pull request '{pr_id}' not found.")
    return pr.model_dump(by_alias=True)


@router.get("/audit")
def list_audit_events():
    """
    List audit trail events.
    """
    events = upstream_store.get_audit_events()
    return [e.model_dump(by_alias=True) for e in events]


@router.post("/reset")
def reset_store_state():
    """
    Reset in-memory store state to default seed data.
    """
    upstream_store.reset()
    return {"status": "reset_success"}
