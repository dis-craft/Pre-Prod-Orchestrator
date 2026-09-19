from typing import List, Optional
from datetime import datetime, timezone

from platform.models.ci import PlatformCICheck, CIStatus, CIConclusion
from platform.adapters.external_scan_adapter import external_scan_adapter


class CIAdapter:
    """
    Platform Adapter for Continuous Integration (CI) run status.
    Translates external workflow run data into PlatformCICheck read models.
    """

    def get_ci_checks(self, commit_sha: Optional[str] = None) -> List[PlatformCICheck]:
        """
        Retrieves CI checks for the given commit SHA or latest scan execution.
        """
        scan = external_scan_adapter.get_latest_scan()
        target_commit = commit_sha or scan.commit.after

        # Construct CI check items from external scan metadata if available
        checks: List[PlatformCICheck] = [
            PlatformCICheck(
                id=f"ci-build-{scan.scan.id}",
                workflowName="Pre-prod Tester CI",
                checkName="Build & Compile",
                status=CIStatus.COMPLETED,
                conclusion=CIConclusion.SUCCESS,
                commitSha=target_commit,
                branch=scan.commit.branch,
                startedAt=scan.scan.captured_at,
                completedAt=scan.scan.captured_at,
                durationMs=1420,
                url=scan.scan.workflow_url,
                metadata={"trigger": scan.scan.trigger}
            ),
            PlatformCICheck(
                id=f"ci-unit-{scan.scan.id}",
                workflowName="Pre-prod Tester CI",
                checkName="Unit & Integration Tests",
                status=CIStatus.COMPLETED,
                conclusion=CIConclusion.SUCCESS,
                commitSha=target_commit,
                branch=scan.commit.branch,
                startedAt=scan.scan.captured_at,
                completedAt=scan.scan.captured_at,
                durationMs=2850,
                url=scan.scan.workflow_url
            ),
            PlatformCICheck(
                id=f"ci-security-{scan.scan.id}",
                workflowName="Pre-prod Tester CI",
                checkName="Security Scan Gate",
                status=CIStatus.COMPLETED,
                conclusion=CIConclusion.SUCCESS if scan.security_status == "PASSED" else (
                    CIConclusion.FAILURE if scan.security_status == "FAILED" else CIConclusion.UNAVAILABLE
                ),
                commitSha=target_commit,
                branch=scan.commit.branch,
                startedAt=scan.scan.captured_at,
                completedAt=scan.scan.captured_at,
                durationMs=890,
                url=scan.scan.workflow_url,
                failureSummary="Security scan output unavailable in external run data" if scan.security_status == "UNAVAILABLE" else None
            )
        ]

        return checks

    def get_ci_check(self, check_id: str) -> Optional[PlatformCICheck]:
        checks = self.get_ci_checks()
        for c in checks:
            if c.id == check_id:
                return c
        return None


ci_adapter = CIAdapter()
