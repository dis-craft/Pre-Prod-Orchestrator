from typing import List, Optional, Dict
from datetime import datetime, timezone
import copy
from .schemas import (
    SecurityFinding,
    RemediationResult,
    Validation,
    ValidationStep,
    PullRequest,
    AuditEvent,
    Repository,
    DashboardMetrics,
    FindingEvidence
)


class BackendStore:
    def __init__(self):
        self._init_data()

    def reset(self):
        self._init_data()

    def _init_data(self):
        self.repositories: List[Repository] = [
            Repository(
                id="repo-prod-1",
                name="acme-corp/main-service",
                owner="acme-corp",
                defaultBranch="main",
                securityStatus="COMPLIANT",
                openFindingsCount=0,
                criticalCount=0,
                highCount=0,
                mediumCount=0,
                lowCount=0,
                lastScanAt="2026-09-19T01:00:00Z",
                policy="Strict Compliance"
            ),
            Repository(
                id="repo-prod-2",
                name="acme-corp/auth-api",
                owner="acme-corp",
                defaultBranch="main",
                securityStatus="NEEDS_ATTENTION",
                openFindingsCount=1,
                criticalCount=0,
                highCount=1,
                mediumCount=0,
                lowCount=0,
                lastScanAt="2026-09-19T01:15:00Z",
                policy="Strict Compliance"
            ),
            Repository(
                id="repo-prod-3",
                name="acme-corp/gateway-proxy",
                owner="acme-corp",
                defaultBranch="main",
                securityStatus="COMPLIANT",
                openFindingsCount=0,
                criticalCount=0,
                highCount=0,
                mediumCount=0,
                lowCount=0,
                lastScanAt="2026-09-19T01:30:00Z",
                policy="Standard Compliance"
            )
        ]

        self.findings: List[SecurityFinding] = [
            SecurityFinding(
                id="FIND-PROD-001",
                repository="acme-corp/auth-api",
                pullRequest="PR-88",
                commitSha="b7a3d91f2c4e",
                tool="semgrep",
                ruleId="python.lang.security.sql-injection",
                title="SQL Injection in User Authentication Route",
                message="User input formatted into unparameterized query string in auth service.",
                severity="HIGH",
                confidence=0.97,
                file="src/auth/service.py",
                startLine=54,
                endLine=58,
                cwe="CWE-89",
                owasp="A03:2021 - Injection",
                introducedByPR="PR-88",
                fixability="AUTO_REMEDIABLE",
                status="OPEN",
                evidence=FindingEvidence(
                    snippet="query = f\"SELECT * FROM users WHERE email = '{email}' AND status = 'ACTIVE'\"",
                    vulnerableLine="query = f\"SELECT * FROM users WHERE email = '{email}' AND status = 'ACTIVE'\"",
                    contextBefore=["def get_user_by_email(db, email: str):"],
                    contextAfter=["return db.execute(query).fetchone()"],
                    explanation="User input 'email' is directly formatted into the raw SQL query."
                )
            )
        ]

        self.remediations: Dict[str, RemediationResult] = {}
        self.validations: Dict[str, Validation] = {}
        self.pull_requests: List[PullRequest] = []
        self.audit_events: List[AuditEvent] = [
            AuditEvent(
                id="AUD-PROD-100",
                timestamp="2026-09-19T01:15:00Z",
                actor="Semgrep Scanner Worker",
                component="SCANNER",
                action="SCAN_COMPLETED",
                status="WARNING",
                evidence={
                    "repository": "acme-corp/auth-api",
                    "findings_detected": 1,
                    "rule": "python.lang.security.sql-injection"
                }
            ),
            AuditEvent(
                id="AUD-PROD-099",
                timestamp="2026-09-19T01:00:00Z",
                actor="Pre-Prod SAST Engine",
                component="SCANNER",
                action="SCHEDULED_SCAN_PASSED",
                status="SUCCESS",
                evidence={
                    "repository": "acme-corp/main-service",
                    "findings_detected": 0
                }
            )
        ]

    def get_metrics(self) -> DashboardMetrics:
        open_count = len([f for f in self.findings if f.status in ("OPEN", "TRIAGED", "REMEDIATING", "VALIDATING")])
        critical_count = len([f for f in self.findings if f.status in ("OPEN", "TRIAGED", "REMEDIATING", "VALIDATING") and f.severity == "CRITICAL"])
        high_count = len([f for f in self.findings if f.status in ("OPEN", "TRIAGED", "REMEDIATING", "VALIDATING") and f.severity == "HIGH"])
        fix_candidates = len([f for f in self.findings if f.fixability == "AUTO_REMEDIABLE" and f.status in ("OPEN", "TRIAGED")])
        pr_count = len(self.pull_requests)
        
        pass_rate = 100.0
        if self.validations:
            passed = len([v for v in self.validations.values() if v.overall_status == "passed"])
            pass_rate = round((passed / len(self.validations)) * 100.0, 1)

        return DashboardMetrics(
            openFindings=open_count,
            criticalCount=critical_count,
            highCount=high_count,
            fixCandidates=fix_candidates,
            validationPassRate=pass_rate,
            remediationPRs=pr_count
        )

    def get_repositories(self) -> List[Repository]:
        return copy.deepcopy(self.repositories)

    def get_repository(self, name: str) -> Optional[Repository]:
        clean_name = name.lower()
        for r in self.repositories:
            if r.name.lower() == clean_name:
                return copy.deepcopy(r)
        return None

    def get_findings(self) -> List[SecurityFinding]:
        return copy.deepcopy(self.findings)

    def get_finding(self, finding_id: str) -> Optional[SecurityFinding]:
        for f in self.findings:
            if f.id == finding_id:
                return copy.deepcopy(f)
        return None

    def start_remediation(self, finding_id: str) -> RemediationResult:
        finding = self.get_finding(finding_id)
        if not finding:
            raise ValueError(f"Finding with ID '{finding_id}' not found.")

        # Existing remediation if present
        for rem in self.remediations.values():
            if rem.finding_id == finding_id:
                return copy.deepcopy(rem)

        rem_id = f"REM-{finding_id}"
        remediation = RemediationResult(
            id=rem_id,
            findingId=finding_id,
            strategy="Parameterised Query Migration",
            model="Local Security LLM / Ollama",
            confidence=0.96,
            rootCause="Unsanitized user input string formatting in raw SQL query.",
            patch="--- a/src/auth/service.py\n+++ b/src/auth/service.py\n@@ -54,1 +54,1 @@\n-query = f\"SELECT * FROM users WHERE email = '{email}' AND status = 'ACTIVE'\"\n+query = \"SELECT * FROM users WHERE email = %s AND status = 'ACTIVE'\"\n",
            filesChanged=["src/auth/service.py"],
            testsAdded=["tests/test_auth_parameterization.py"],
            assumptions=["DB driver accepts tuple params for string substitution"],
            risk="LOW",
            status="CANDIDATE"
        )

        self.remediations[rem_id] = remediation

        # Update finding status
        for f in self.findings:
            if f.id == finding_id:
                f.status = "REMEDIATING"

        # Log audit event
        self.audit_events.insert(0, AuditEvent(
            id=f"AUD-{int(datetime.now(timezone.utc).timestamp())}",
            timestamp=datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
            actor="AI Remediation Worker",
            component="REMEDIATION_ENGINE",
            action="PATCH_GENERATED",
            status="SUCCESS",
            evidence={
                "finding_id": finding_id,
                "remediation_id": rem_id,
                "strategy": remediation.strategy
            }
        ))

        # Seed corresponding validation
        val_id = f"VAL-{rem_id}"
        self.validations[val_id] = Validation(
            id=val_id,
            remediationId=rem_id,
            findingId=finding_id,
            steps=[
                ValidationStep(id="step-1", name="Checkout SHA & Workspace Isolation", status="pending", command="git checkout -b sandbox/rem-fix"),
                ValidationStep(id="step-2", name="Apply Patch", status="pending", command="git apply patch.diff"),
                ValidationStep(id="step-3", name="Unit & Integration Tests", status="pending", command="pytest tests/unit"),
                ValidationStep(id="step-4", name="SAST Security Re-scan", status="pending", command="semgrep --config p/security-audit"),
            ],
            overallStatus="pending",
            startedAt=datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
        )

        return copy.deepcopy(remediation)

    def get_remediation(self, rem_id: str) -> Optional[RemediationResult]:
        if rem_id in self.remediations:
            return copy.deepcopy(self.remediations[rem_id])
        return None

    def get_remediation_by_finding(self, finding_id: str) -> Optional[RemediationResult]:
        for r in self.remediations.values():
            if r.finding_id == finding_id:
                return copy.deepcopy(r)
        return None

    def run_validation(self, val_id: str) -> Validation:
        if val_id not in self.validations:
            raise ValueError(f"Validation '{val_id}' not found.")

        val = self.validations[val_id]
        val.overall_status = "running"
        
        # Mark all steps passed
        for step in val.steps:
            step.status = "passed"
            step.duration_ms = 240
            step.logs = [f"{step.name} completed with 0 errors."]

        val.overall_status = "passed"
        val.completed_at = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

        # Update remediation and finding state
        rem = self.remediations.get(val.remediation_id)
        if rem:
            rem.status = "VERIFIED"
            for f in self.findings:
                if f.id == rem.finding_id:
                    f.status = "VERIFIED"

        # Log audit
        self.audit_events.insert(0, AuditEvent(
            id=f"AUD-VAL-{int(datetime.now(timezone.utc).timestamp())}",
            timestamp=datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
            actor="Sandbox Validator",
            component="VALIDATOR",
            action="VALIDATION_SUCCEEDED",
            status="SUCCESS",
            evidence={
                "validation_id": val_id,
                "remediation_id": val.remediation_id,
                "steps_passed": len(val.steps)
            }
        ))

        return copy.deepcopy(val)

    def get_validation(self, val_id: str) -> Optional[Validation]:
        if val_id in self.validations:
            return copy.deepcopy(self.validations[val_id])
        return None

    def get_validation_by_remediation(self, rem_id: str) -> Optional[Validation]:
        for v in self.validations.values():
            if v.remediation_id == rem_id:
                return copy.deepcopy(v)
        return None

    def get_pull_requests(self) -> List[PullRequest]:
        return copy.deepcopy(self.pull_requests)

    def get_pull_request(self, pr_id: str) -> Optional[PullRequest]:
        for pr in self.pull_requests:
            if pr.id == pr_id or str(pr.number) == pr_id:
                return copy.deepcopy(pr)
        return None

    def get_audit_events(self) -> List[AuditEvent]:
        return copy.deepcopy(self.audit_events)


store = BackendStore()
