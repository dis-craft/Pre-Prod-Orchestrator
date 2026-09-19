from typing import List, Optional, Dict, Any
from datetime import datetime, timezone

from platform.models.workflow import PlatformWorkflow, WorkflowState
from platform.services.finding_service import finding_service
from platform.services.validation_service import validation_service
from platform.services.ci_service import ci_service
from platform.services.evidence_service import evidence_service
from platform.services.scan_service import scan_service
from platform.adapters.orchestrator_adapter import orchestrator_adapter
from orchestrator.store import store as upstream_store


class WorkflowService:
    """
    Platform Unified Workflow Service for Phase 3.
    Composes existing platform services into correlated unified workflow read models.
    """

    def get_workflows(self) -> List[PlatformWorkflow]:
        findings = finding_service.list_findings()
        workflows: List[PlatformWorkflow] = []

        for finding in findings:
            wf = self.get_workflow_by_finding(finding.id)
            if wf:
                workflows.append(wf)

        return workflows

    def get_workflow_by_finding(self, finding_id: str) -> Optional[PlatformWorkflow]:
        finding = finding_service.get_finding(finding_id)
        if not finding:
            return None

        # 1. Correlate Remediation
        rem_raw = upstream_store.get_remediation_by_finding(finding_id)
        remediation_dict = None
        if rem_raw:
            remediation_dict = {
                "id": rem_raw.id,
                "strategy": rem_raw.strategy,
                "model": rem_raw.model,
                "confidence": rem_raw.confidence,
                "rootCause": rem_raw.root_cause,
                "patch": rem_raw.patch,
                "status": rem_raw.status
            }

        # 2. Correlate Validation
        val = validation_service.get_validation_by_finding(finding_id)

        # 3. Correlate CI Checks
        commit_sha = finding.metadata.get("commit_sha") or "b7a3d91f2c4e"
        ci_checks = ci_service.get_ci_checks(commit_sha=commit_sha)

        # 4. Correlate Evidence
        evidence_items = evidence_service.get_evidence_list(validation_id=val.id if val else None)

        # 5. Correlate Pull Request
        pr_raw = None
        prs = upstream_store.get_pull_requests()
        for pr in prs:
            if getattr(pr, "finding_id", None) == finding_id:
                pr_raw = pr
                break

        pr_dict = None
        if pr_raw:
            pr_dict = {
                "id": pr_raw.id,
                "number": getattr(pr_raw, "number", 1),
                "title": getattr(pr_raw, "title", f"Fix {finding.rule}"),
                "repository": getattr(pr_raw, "repository", finding.repository or ""),
                "branch": getattr(pr_raw, "branch", "security-fix"),
                "status": getattr(pr_raw, "status", "OPEN"),
                "url": getattr(pr_raw, "url", "")
            }

        # Derive honest overall workflow status
        overall_status = WorkflowState.FINDING_DETECTED
        if pr_dict and pr_dict.get("status") == "MERGED":
            overall_status = WorkflowState.MERGED
        elif pr_dict:
            overall_status = WorkflowState.PR_OPEN
        elif val and val.status.value == "PASSED":
            overall_status = WorkflowState.VALIDATION_PASSED
        elif val and val.status.value == "FAILED":
            overall_status = WorkflowState.VALIDATION_FAILED
        elif val and val.status.value == "RUNNING":
            overall_status = WorkflowState.VALIDATION_RUNNING
        elif remediation_dict:
            overall_status = WorkflowState.REMEDIATION_AVAILABLE
        elif finding.status == "TRIAGED":
            overall_status = WorkflowState.TRIAGED

        now_str = datetime.now(timezone.utc).isoformat()

        return PlatformWorkflow(
            workflowId=f"WF-{finding.id}",
            repository=finding.repository or "unknown/repo",
            commitSha=commit_sha,
            finding=finding,
            remediation=remediation_dict,
            validation=val,
            ci=ci_checks,
            evidence=evidence_items,
            pullRequest=pr_dict,
            overallStatus=overall_status,
            createdAt=now_str,
            updatedAt=now_str
        )

    def get_workflow_by_id(self, workflow_id: str) -> Optional[PlatformWorkflow]:
        clean_id = workflow_id.replace("WF-", "")
        return self.get_workflow_by_finding(clean_id)


workflow_service = WorkflowService()
