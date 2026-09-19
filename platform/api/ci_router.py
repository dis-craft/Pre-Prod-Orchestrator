from typing import List, Optional
from fastapi import APIRouter, Query
from platform.models.ci import PlatformCICheck
from platform.services.ci_service import ci_service
from platform.errors import NotFoundError

router = APIRouter(prefix="/api/ci", tags=["CI Integration"])


@router.get("", response_model=List[PlatformCICheck])
def list_ci_checks(commit_sha: Optional[str] = Query(default=None, alias="commitSha", description="Filter by commit SHA")):
    """
    List CI checks and workflow run conclusions.
    """
    return ci_service.get_ci_checks(commit_sha=commit_sha)


@router.get("/{check_id}", response_model=PlatformCICheck)
def get_ci_check_detail(check_id: str):
    """
    Get detail of a specific CI check by ID.
    """
    check = ci_service.get_ci_check(check_id)
    if not check:
        raise NotFoundError(message=f"CI check '{check_id}' not found.")
    return check
