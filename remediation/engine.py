"""Orchestrate deterministic/LLM remediation and validation."""
from __future__ import annotations
from dataclasses import asdict
from typing import Protocol
from .context import ContextBuilder
from .deterministic import NoDeterministicFix, sql_injection_fix
from .llm import LLMError, LLMProvider
from .models import RemediationResult, SecurityFinding, ValidationEvidence
from .safety import SafetyError, validate_proposal
from .sandbox import SandboxError

class Validator(Protocol):
    def validate(self, repo_path: str, expected_sha: str, finding: SecurityFinding, patch: str) -> ValidationEvidence: ...

class RemediationEngine:
    def __init__(self, repo_path: str, validator: Validator, llm_provider: LLMProvider | None = None):
        self.repo_path = repo_path
        self.validator = validator
        self.llm_provider = llm_provider
        self.context_builder = ContextBuilder(repo_path)

    def remediate(self, finding: SecurityFinding, expected_sha: str, *, prefer_deterministic: bool = True) -> RemediationResult:
        proposal = None
        source = None
        if prefer_deterministic:
            try:
                proposal = sql_injection_fix(self.repo_path, finding)
                source = "deterministic"
            except NoDeterministicFix:
                pass
        if proposal is None:
            if self.llm_provider is None:
                return self._rejected(finding, "no deterministic rule matched and no LLM provider is configured")
            try:
                context = self.context_builder.build(finding)
                proposal = self.llm_provider.generate(context)
                source = "llm"
            except (LLMError, ValueError, FileNotFoundError) as exc:
                return self._rejected(finding, f"LLM proposal failed: {exc}")
        try:
            inspection = validate_proposal(finding, proposal)
        except SafetyError as exc:
            return self._rejected(finding, f"patch safety gate failed: {exc}", proposal.patch, source=source)
        try:
            evidence = self.validator.validate(self.repo_path, expected_sha, finding, proposal.patch)
        except (SandboxError, OSError) as exc:
            return self._rejected(finding, f"validation sandbox failed: {exc}", proposal.patch, source=source)
        status = "VALIDATED" if evidence.validated else "REJECTED"
        summary = "Patch validated in isolated sandbox." if status == "VALIDATED" else "Patch was rejected by validation gates."
        return RemediationResult(
            finding_id=finding.id, status=status, patch=proposal.patch, summary=summary,
            tests=[{"name": test, "requested_by_model": source == "llm"} for test in proposal.tests],
            security_rescan=evidence.security_rescan,
            evidence={
                "source": source, "confidence": proposal.confidence, "risk": proposal.risk,
                "root_cause": proposal.root_cause, "assumptions": proposal.assumptions,
                "patch_files": list(inspection.files), "patch_additions": inspection.additions,
                "patch_deletions": inspection.deletions, **asdict(evidence),
            },
        )

    @staticmethod
    def _rejected(finding: SecurityFinding, reason: str, patch: str = "", *, source: str = "none") -> RemediationResult:
        return RemediationResult(finding_id=finding.id, status="REJECTED", patch=patch,
                                 summary=reason, security_rescan={}, evidence={"source": source, "reason": reason})
