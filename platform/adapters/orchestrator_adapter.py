from typing import List, Optional
from datetime import datetime, timezone

from orchestrator.store import store as upstream_store
from platform.models.finding import PlatformSecurityFinding, WorkflowStatus


class OrchestratorAdapter:
    """
    In-Memory Contract-Conforming Store Adapter.
    Translates upstream orchestrator store data into platform read models
    conforming to contracts/finding.schema.json.
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
            # Map rule_id / rule, start_line / line for contract compatibility
            rule_name = getattr(item, "rule_id", None) or getattr(item, "rule", "unknown-rule")
            line_no = getattr(item, "start_line", None) or getattr(item, "line", 1)
            end_line_no = getattr(item, "end_line", None)

            # Normalize fixability to conform strictly to contracts/finding.schema.json
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

            # Apply filters if provided
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

        # Check for associated remediation, validation, and PR in upstream store
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

        # Derive state from upstream models
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


orchestrator_adapter = OrchestratorAdapter()
