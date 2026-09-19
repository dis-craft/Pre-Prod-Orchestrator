from typing import List, Optional
from fastapi import APIRouter, Query
from platform.models.evidence import PlatformEvidence
from platform.services.evidence_service import evidence_service
from platform.errors import NotFoundError

router = APIRouter(prefix="/api/evidence", tags=["Evidence Trail"])


@router.get("", response_model=List[PlatformEvidence])
def list_evidence(validation_id: Optional[str] = Query(default=None, alias="validationId", description="Filter by validation ID")):
    """
    List sanitized evidence items for validation, security scans, CI runs, and diffs.
    """
    return evidence_service.get_evidence_list(validation_id=validation_id)


@router.get("/{evidence_id}", response_model=PlatformEvidence)
def get_evidence_detail(evidence_id: str):
    """
    Get detail of a specific sanitized evidence record by ID.
    """
    item = evidence_service.get_evidence_by_id(evidence_id)
    if not item:
        raise NotFoundError(message=f"Evidence item '{evidence_id}' not found.")
    return item
