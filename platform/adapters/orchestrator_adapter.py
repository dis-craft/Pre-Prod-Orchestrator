from typing import List, Optional, Dict, Any
from datetime import datetime, timezone

from orchestrator.store import store as upstream_store
from platform.models.finding import PlatformSecurityFinding, WorkflowStatus
from platform.models.validation import (
    PlatformValidation,
    ValidationStatusEnum,
    ValidationTestResult,
    SecurityScanResult,
    ValidationEvidence
)


class OrchestratorAdapter:
    """
    In-Memory Contract-Conforming Store Adapter.
    Translates upstream orchestrator store data into platform read models
    conforming to platform domain contracts.
    """

    def get_findings(
        self,
        severity: Optional[str] = None,
        status: Optional[str] = None,
        repository: Optional[str] = None
    ) -> List[PlatformSecurityFinding]:
        raw_findings = upstream_store.get_findings()
        results: List[PlatformSecurityFinding] = []

        for item in raw_findings:
            rule_name = getattr(item, "rule_id", None) or getattr(item, "rule", "unknown-rule")
            line_no = getattr(item, "start_line", None) or getattr(item, "line", 1)
            end_line_no = getattr(item, "end_line", None)

            raw_fixability = getattr(item, "fixability", "UNKNOWN")
            if raw_fixability == "AUTO_REMEDIABLE":
                fixability = "AUTO"
            elif raw_fixability in {"AUTO", "AI_ASSISTED", "HUMAN_ONLY", "UNKNOWN"}:
                fixability = raw_fixability
            else:
                fixability = "UNKNOWN"

            finding = PlatformSecurityFinding(
                id=item.id,
                tool=item.tool,
                rule=rule_name,
                severity=item.severity.upper(),
                file=item.file,
                line=line_no,
                end_line=end_line_no,
                message=item.message,
                confidence=item.confidence,
                fixability=fixability,
                repository=getattr(item, "repository", None),
                cwe=getattr(item, "cwe", None),
                status=getattr(item, "status", "OPEN"),
                metadata={
                    "title": getattr(item, "title", ""),
                    "commit_sha": getattr(item, "commit_sha", ""),
                    "pull_request": getattr(item, "pull_request", ""),
                    "owasp": getattr(item, "owasp", ""),
                }
            )

            if severity and finding.severity != severity.upper():
                continue
            if status and finding.status != status.upper():
                continue
            if repository and finding.repository and finding.repository.lower() != repository.lower():
                continue

            results.append(finding)

        return results

    def get_finding(self, finding_id: str) -> Optional[PlatformSecurityFinding]:
        findings = self.get_findings()
        for f in findings:
            if f.id == finding_id:
                return f
        return None

    def get_workflow_status(self, finding_id: str) -> Optional[WorkflowStatus]:
        finding = self.get_finding(finding_id)
        if not finding:
            return None

        rem = upstream_store.get_remediation_by_finding(finding_id)
        rem_id = rem.id if rem else None

        val_id = None
        if rem_id:
            val = upstream_store.get_validation_by_remediation(rem_id)
            if val:
                val_id = val.id

        pr_id = None
        prs = upstream_store.get_pull_requests()
        for pr in prs:
            if getattr(pr, "finding_id", None) == finding_id:
                pr_id = pr.id
                break

        if pr_id:
            state = "REMEDIATION_PR_CREATED"
        elif val_id:
            state = "VALIDATING"
        elif rem_id:
            state = "REMEDIATION_STARTED"
        elif finding.status == "OPEN":
            state = "DETECTED"
        else:
            state = finding.status or "UNKNOWN"

        now_str = datetime.now(timezone.utc).isoformat()

        return WorkflowStatus(
            finding_id=finding_id,
            state=state,
            remediation_id=rem_id,
            validation_id=val_id,
            pull_request_id=pr_id,
            updated_at=now_str
        )

    def _normalize_validation(self, raw_val: Any) -> PlatformValidation:
        """
        Translates raw upstream Validation object into typed PlatformValidation read model.
        """
        raw_status = (getattr(raw_val, "overall_status", None) or getattr(raw_val, "overallStatus", "pending")).lower()
        if raw_status == "passed":
            status_enum = ValidationStatusEnum.PASSED
        elif raw_status == "running":
            status_enum = ValidationStatusEnum.RUNNING
        elif raw_status == "failed":
            status_enum = ValidationStatusEnum.FAILED
        else:
            status_enum = ValidationStatusEnum.PENDING

        steps = getattr(raw_val, "steps", [])
        test_results: List[ValidationTestResult] = []
        security_scan: Optional[SecurityScanResult] = None

        for step in steps:
            step_name = getattr(step, "name", "Validation Step")
            step_status = getattr(step, "status", "pending")
            step_duration = getattr(step, "duration_ms", None) or getattr(step, "durationMs", None)
            step_logs = getattr(step, "logs", [])
            log_str = "\n".join(step_logs) if step_logs else None

            if "scan" in step_name.lower() or "sast" in step_name.lower() or "security" in step_name.lower():
                sec_status = "PASSED" if step_status == "passed" else ("FAILED" if step_status == "failed" else "PENDING")
                security_scan = SecurityScanResult(
                    status=sec_status,
                    scanner="Semgrep Security Scanner",
                    findings_count=0 if sec_status == "PASSED" else 1,
                    timestamp=getattr(raw_val, "completed_at", None) or getattr(raw_val, "completedAt", None),
                    details=log_str
                )
            else:
                test_results.append(
                    ValidationTestResult(
                        name=step_name,
                        status=step_status,
                        duration_ms=step_duration,
                        details=log_str
                    )
                )

        raw_evidence = getattr(raw_val, "evidence", {})
        if isinstance(raw_evidence, dict):
            sanitized = ValidationEvidence.sanitize_evidence_data(raw_evidence)
        else:
            sanitized = {}

        evidence = ValidationEvidence(
            test_summary=f"{len([t for t in test_results if t.status == 'passed'])}/{len(test_results)} steps passed",
            security_scan_summary=security_scan.status if security_scan else "PENDING",
            artifacts=[],
            timestamps={
                "startedAt": getattr(raw_val, "started_at", None) or getattr(raw_val, "startedAt", ""),
                "completedAt": getattr(raw_val, "completed_at", None) or getattr(raw_val, "completedAt", "") or ""
            },
            execution_metadata=sanitized
        )

        return PlatformValidation(
            id=raw_val.id,
            remediation_id=getattr(raw_val, "remediation_id", None) or getattr(raw_val, "remediationId", ""),
            finding_id=getattr(raw_val, "finding_id", None) or getattr(raw_val, "findingId", None),
            status=status_enum,
            tests=test_results,
            security_scan=security_scan,
            started_at=getattr(raw_val, "started_at", None) or getattr(raw_val, "startedAt", None),
            completed_at=getattr(raw_val, "completed_at", None) or getattr(raw_val, "completedAt", None),
            evidence=evidence
        )

    def get_validation(self, validation_id: str) -> Optional[PlatformValidation]:
        raw_val = upstream_store.get_validation(validation_id)
        if not raw_val:
            return None
        return self._normalize_validation(raw_val)

    def get_validation_by_remediation(self, remediation_id: str) -> Optional[PlatformValidation]:
        raw_val = upstream_store.get_validation_by_remediation(remediation_id)
        if not raw_val:
            return None
        return self._normalize_validation(raw_val)

    def get_validation_by_finding(self, finding_id: str) -> Optional[PlatformValidation]:
        rem = upstream_store.get_remediation_by_finding(finding_id)
        if not rem:
            return None
        return self.get_validation_by_remediation(rem.id)


orchestrator_adapter = OrchestratorAdapter()
