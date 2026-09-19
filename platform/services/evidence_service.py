from typing import List, Optional
from datetime import datetime, timezone

from platform.models.evidence import PlatformEvidence, EvidenceType
from platform.services.validation_service import validation_service
from platform.services.ci_service import ci_service
from platform.adapters.external_scan_adapter import external_scan_adapter


class EvidenceService:
    """
    Platform Evidence Service for Phase 2.
    Retrieves, normalizes, sanitizes, and correlates evidence across validation, security scan, and CI runs.
    """

    def get_evidence_list(self, validation_id: Optional[str] = None) -> List[PlatformEvidence]:
        items: List[PlatformEvidence] = []
        now_str = datetime.now(timezone.utc).isoformat()
        scan = external_scan_adapter.get_latest_scan()

        # 1. CI Run Evidence
        ci_checks = ci_service.get_ci_checks(commit_sha=scan.commit.after)
        for check in ci_checks:
            items.append(
                PlatformEvidence.create_sanitized(
                    id=f"ev-ci-{check.id}",
                    type=EvidenceType.CI_RESULT,
                    source="GitHub Actions CI",
                    title=f"CI Check: {check.check_name}",
                    created_at=check.started_at or now_str,
                    commit_sha=check.commit_sha,
                    reference=check.url,
                    raw_metadata={
                        "conclusion": check.conclusion.value,
                        "duration_ms": check.duration_ms,
                        "workflow": check.workflow_name
                    }
                )
            )

        # 2. Diff Evidence
        if scan.files:
            items.append(
                PlatformEvidence.create_sanitized(
                    id=f"ev-diff-{scan.scan.id}",
                    type=EvidenceType.DIFF,
                    source="Git Commit Comparison",
                    title=f"Unified Diff: {scan.commit.after[:8]}",
                    created_at=scan.scan.captured_at,
                    commit_sha=scan.commit.after,
                    reference=scan.repository.url,
                    raw_metadata={
                        "files_changed": scan.change_summary.files_changed,
                        "additions": scan.change_summary.additions,
                        "deletions": scan.change_summary.deletions
                    }
                )
            )

        # 3. Validation Evidence (if validation_id provided or available)
        val = validation_service.get_validation(validation_id) if validation_id else None
        if not val and validation_id:
            # Return current items filtered or empty
            return items

        if val:
            items.append(
                PlatformEvidence.create_sanitized(
                    id=f"ev-val-{val.id}",
                    type=EvidenceType.VALIDATION_OUTPUT,
                    source="Isolated Sandbox Validator",
                    title=f"Validation Pipeline Execution ({val.id})",
                    created_at=val.started_at or now_str,
                    commit_sha=scan.commit.after,
                    reference=f"/api/validations/{val.id}",
                    raw_metadata={
                        "status": val.status.value,
                        "steps_count": len(val.tests),
                        "remediation_id": val.remediation_id
                    }
                )
            )

            # Test steps evidence
            for test_item in val.tests:
                items.append(
                    PlatformEvidence.create_sanitized(
                        id=f"ev-test-{val.id}-{test_item.name.replace(' ', '_')}",
                        type=EvidenceType.TEST_REPORT,
                        source="Test Runner",
                        title=f"Test Suite: {test_item.name}",
                        created_at=val.started_at or now_str,
                        commit_sha=scan.commit.after,
                        reference=f"/api/validations/{val.id}/tests",
                        raw_metadata={
                            "status": test_item.status,
                            "duration_ms": test_item.duration_ms,
                            "details": test_item.details
                        }
                    )
                )

            # Security scan evidence
            if val.security_scan:
                items.append(
                    PlatformEvidence.create_sanitized(
                        id=f"ev-sec-{val.id}",
                        type=EvidenceType.SECURITY_SCAN,
                        source=val.security_scan.scanner,
                        title="SAST Security Re-Scan Report",
                        created_at=val.security_scan.timestamp or now_str,
                        commit_sha=scan.commit.after,
                        reference=f"/api/validations/{val.id}/security-scan",
                        raw_metadata={
                            "status": val.security_scan.status,
                            "findings_count": val.security_scan.findings_count,
                            "scanner": val.security_scan.scanner
                        }
                    )
                )

        return items

    def get_evidence_by_id(self, evidence_id: str) -> Optional[PlatformEvidence]:
        all_items = self.get_evidence_list()
        for ev in all_items:
            if ev.id == evidence_id:
                return ev
        return None


evidence_service = EvidenceService()
