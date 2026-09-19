from typing import List, Optional
from platform.models.ci import PlatformCICheck
from platform.adapters.ci_adapter import ci_adapter, CIAdapter


class CIService:
    """
    Platform CI Service for Phase 2.
    Encapsulates queries for CI check results, status normalization, and commit correlation.
    """

    def __init__(self, adapter: Optional[CIAdapter] = None):
        self.adapter = adapter or ci_adapter

    def get_ci_checks(self, commit_sha: Optional[str] = None) -> List[PlatformCICheck]:
        """
        Retrieves CI checks for a given commit SHA.
        """
        return self.adapter.get_ci_checks(commit_sha=commit_sha)

    def get_ci_check(self, check_id: str) -> Optional[PlatformCICheck]:
        """
        Retrieves a specific CI check detail by ID.
        """
        return self.adapter.get_ci_check(check_id)


ci_service = CIService()
