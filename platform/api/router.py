from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query, status

from platform.models.finding import PlatformSecurityFinding, WorkflowStatus, FindingWithWorkflow
from platform.services.finding_service import finding_service

router = APIRouter(prefix="/api/findings", tags=["Findings & Workflow Status"])


@router.get("", response_model=List[PlatformSecurityFinding])
def list_findings(
    severity: Optional[str] = Query(default=None, description="Filter by severity (INFO, LOW, MEDIUM, HIGH, CRITICAL)"),
    status_filter: Optional[str] = Query(default=None, alias="status", description="Filter by finding status (OPEN, FIXED, etc.)"),
    repository: Optional[str] = Query(default=None, description="Filter by repository name")
):
    valid_severities = {"INFO", "LOW", "MEDIUM", "HIGH", "CRITICAL"}
    if severity and severity.upper() not in valid_severities:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid severity filter '{severity}'. Allowed values: {', '.join(sorted(valid_severities))}"
        )

    return finding_service.list_findings(
        severity=severity,
        status=status_filter,
        repository=repository
    )


@router.get("/{finding_id}", response_model=PlatformSecurityFinding)
def get_finding_detail(finding_id: str):
    finding = finding_service.get_finding(finding_id)
    if not finding:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Finding '{finding_id}' not found."
        )
    return finding


@router.get("/{finding_id}/workflow", response_model=WorkflowStatus)
def get_finding_workflow_status(finding_id: str):
    workflow = finding_service.get_workflow_status(finding_id)
    if not workflow:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Finding '{finding_id}' not found."
        )
    return workflow
