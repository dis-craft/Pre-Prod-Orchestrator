from fastapi.testclient import TestClient
import pytest

from platform.main import app
from platform.models.workflow import PlatformWorkflow, WorkflowState
from platform.services.workflow_service import workflow_service
from orchestrator.store import store as upstream_store, Validation, ValidationStep, SecurityFinding, FindingEvidence


client = TestClient(app)


def test_unified_workflow_model_and_correlation():
    # Fetch workflow for standard test finding
    wf = workflow_service.get_workflow_by_finding("FIND-PROD-001")
    assert wf is not None
    assert wf.workflow_id == "WF-FIND-PROD-001"
    assert wf.finding is not None
    assert wf.finding.id == "FIND-PROD-001"
    assert wf.commit_sha == "b7a3d91f2c4e"
    assert isinstance(wf.ci, list)
    assert isinstance(wf.evidence, list)
    assert wf.overall_status in [
        WorkflowState.FINDING_DETECTED,
        WorkflowState.TRIAGED,
        WorkflowState.REMEDIATION_AVAILABLE,
        WorkflowState.VALIDATION_PASSED,
        WorkflowState.PR_OPEN,
        WorkflowState.MERGED
    ]


def test_workflow_service_queries():
    workflows = workflow_service.get_workflows()
    assert isinstance(workflows, list)
    assert len(workflows) >= 1

    wf_id = workflows[0].workflow_id
    wf_by_id = workflow_service.get_workflow_by_id(wf_id)
    assert wf_by_id is not None
    assert wf_by_id.workflow_id == wf_id

    # Test unknown finding returns None
    assert workflow_service.get_workflow_by_finding("FIND-DOES-NOT-EXIST") is None
    assert workflow_service.get_workflow_by_id("WF-DOES-NOT-EXIST") is None


def test_unified_workflow_api_endpoints():
    # 1. GET /api/workflows
    res = client.get("/api/workflows")
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)
    assert len(data) >= 1

    # 2. GET /api/workflows/{workflow_id}
    wf_id = data[0]["workflowId"]
    res_detail = client.get(f"/api/workflows/{wf_id}")
    assert res_detail.status_code == 200
    assert res_detail.json()["workflowId"] == wf_id

    # 3. GET /api/workflows/finding/{finding_id}
    res_finding = client.get("/api/workflows/finding/FIND-PROD-001")
    assert res_finding.status_code == 200
    assert res_finding.json()["finding"]["id"] == "FIND-PROD-001"

    # 4. GET 404 for unknown workflow
    res_404 = client.get("/api/workflows/WF-NON-EXISTENT")
    assert res_404.status_code == 404
    assert res_404.json()["error"]["code"] == "NOT_FOUND"


def test_honest_workflow_status_representation():
    # Add a custom finding without remediation or validation
    test_finding_id = "FIND-UNREMEDIATED-001"
    upstream_store.findings.append(
        SecurityFinding(
            id=test_finding_id,
            repository="acme-corp/auth-api",
            pullRequest="PR-99",
            commitSha="c1234567890a",
            tool="semgrep",
            ruleId="python.lang.security.hardcoded-secret",
            title="Hardcoded API Secret Key",
            message="Hardcoded API secret found in codebase.",
            severity="CRITICAL",
            confidence=0.99,
            file="src/config/secrets.py",
            startLine=12,
            endLine=12,
            cwe="CWE-798",
            owasp="A07:2021 - Identification and Authentication Failures",
            introducedByPR="PR-99",
            fixability="HUMAN_ONLY",
            status="OPEN",
            evidence=FindingEvidence(
                snippet="API_SECRET = 'secret_123'",
                vulnerableLine="API_SECRET = 'secret_123'",
                contextBefore=[],
                contextAfter=[],
                explanation="Hardcoded secret string"
            )
        )
    )

    wf = workflow_service.get_workflow_by_finding(test_finding_id)
    assert wf is not None
    assert wf.remediation is None
    assert wf.validation is None
    assert wf.pull_request is None
    # Must report FINDING_DETECTED honestly, NOT fabricated PASSED or MERGED
    assert wf.overall_status == WorkflowState.FINDING_DETECTED
