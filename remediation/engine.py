"""Orchestrate deterministic/LLM remediation and validation."""
from __future__ import annotations

from dataclasses import asdict
from typing import Callable, Protocol

from .context import ContextBuilder
from .deterministic import NoDeterministicFix, sql_injection_fix
from .llm import LLMError, LLMProvider
from .models import RemediationResult, SecurityFinding, ValidationEvidence
from .safety import SafetyError, validate_proposal
from .sandbox import SandboxError


class Validator(Protocol):
    def validate(self, repo_path: str, expected_sha: str, finding: SecurityFinding, patch: str) -> ValidationEvidence: ...


TraceFn = Callable[[str, str, dict], None]


class RemediationEngine:
    def __init__(
        self,
        repo_path: str,
        validator: Validator,
        llm_provider: LLMProvider | None = None,
        trace: TraceFn | None = None,
    ):
        self.repo_path = repo_path
        self.validator = validator
        self.llm_provider = llm_provider
        self.context_builder = ContextBuilder(repo_path)
        self.trace = trace or (lambda _stage, _status, _details: None)

    def _emit(self, stage: str, status: str, **details: object) -> None:
        self.trace(stage, status, details)

    def remediate(
        self,
        finding: SecurityFinding,
        expected_sha: str,
        *,
        prefer_deterministic: bool = True,
    ) -> RemediationResult:
        self._emit(
            "finding",
            "loaded",
            finding_id=finding.id,
            rule=finding.rule,
            severity=finding.severity,
            file=finding.file,
            line=finding.line,
        )
        proposal = None
        source = None

        if prefer_deterministic:
            try:
                proposal = sql_injection_fix(self.repo_path, finding)
                source = "deterministic"
                self._emit("proposal", "generated", source=source, confidence=proposal.confidence)
            except NoDeterministicFix as exc:
                self._emit("deterministic", "not_applicable", reason=str(exc))

        if proposal is None:
            if self.llm_provider is None:
                return self._rejected(
                    finding,
                    "no deterministic rule matched and no LLM provider is configured",
                    trace=self.trace,
                )
            try:
                context = self.context_builder.build(finding)
                self._emit(
                    "context",
                    "built",
                    file=context.file,
                    line_start=context.line_range[0],
                    line_end=context.line_range[1],
                    enclosing_symbol=context.enclosing_symbol,
                    relevant_tests=bool(context.relevant_tests),
                )
                proposal = self.llm_provider.generate(context)
                source = "llm"
                self._emit(
                    "llm",
                    "response_parsed",
                    confidence=proposal.confidence,
                    risk=proposal.risk,
                    test_count=len(proposal.tests),
                )
            except (LLMError, ValueError, FileNotFoundError) as exc:
                return self._rejected(finding, f"LLM proposal failed: {exc}", trace=self.trace)

        try:
            inspection = validate_proposal(finding, proposal)
            self._emit(
                "patch_safety",
                "passed",
                files=list(inspection.files),
                additions=inspection.additions,
                deletions=inspection.deletions,
            )
        except SafetyError as exc:
            self._emit("patch_safety", "rejected", reason=str(exc))
            return self._rejected(
                finding,
                f"patch safety gate failed: {exc}",
                proposal.patch,
                source=source,
                trace=self.trace,
            )

        try:
            self._emit("validation", "started", validator=type(self.validator).__name__)
            evidence = self.validator.validate(self.repo_path, expected_sha, finding, proposal.patch)
        except (SandboxError, OSError) as exc:
            self._emit("validation", "failed", reason=str(exc))
            return self._rejected(
                finding,
                f"validation sandbox failed: {exc}",
                proposal.patch,
                source=source,
                trace=self.trace,
            )

        status = "VALIDATED" if evidence.validated else "REJECTED"
        self._emit(
            "validation",
            "completed",
            status=status,
            patch_applied=evidence.patch_applied,
            tests_passed=evidence.tests_passed,
            original_finding_resolved=evidence.original_finding_resolved,
            new_high_critical_findings=evidence.new_high_critical_findings,
        )
        summary = (
            "Patch validated in isolated sandbox."
            if status == "VALIDATED"
            else "Patch was rejected by validation gates."
        )
        return RemediationResult(
            finding_id=finding.id,
            status=status,
            patch=proposal.patch,
            summary=summary,
            tests=[{"name": test, "requested_by_model": source == "llm"} for test in proposal.tests],
            security_rescan=evidence.security_rescan,
            evidence={
                "source": source,
                "confidence": proposal.confidence,
                "risk": proposal.risk,
                "root_cause": proposal.root_cause,
                "assumptions": proposal.assumptions,
                "patch_files": list(inspection.files),
                "patch_additions": inspection.additions,
                "patch_deletions": inspection.deletions,
                **asdict(evidence),
            },
        )

    @staticmethod
    def _rejected(
        finding: SecurityFinding,
        reason: str,
        patch: str = "",
        *,
        source: str = "none",
        trace: TraceFn | None = None,
    ) -> RemediationResult:
        if trace:
            trace("result", "rejected", {"reason": reason, "source": source})
        return RemediationResult(
            finding_id=finding.id,
            status="REJECTED",
            patch=patch,
            summary=reason,
            security_rescan={},
            evidence={"source": source, "reason": reason},
        )
