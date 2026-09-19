"""Data models for the Person 3 remediation pipeline."""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Literal

Severity = Literal["INFO", "LOW", "MEDIUM", "HIGH", "CRITICAL"]
Risk = Literal["LOW", "MEDIUM", "HIGH"]
Status = Literal["PROPOSED", "VALIDATED", "REJECTED"]


@dataclass(frozen=True)
class SecurityFinding:
    id: str
    tool: str
    rule: str
    severity: Severity
    file: str
    line: int
    message: str
    confidence: float
    end_line: int | None = None
    fixability: str | None = None
    metadata: dict[str, Any] = field(default_factory=dict)

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "SecurityFinding":
        required = ("id", "tool", "rule", "severity", "file", "line", "message", "confidence")
        missing = [key for key in required if key not in data]
        if missing:
            raise ValueError(f"finding missing required fields: {missing}")
        if not 0 <= float(data["confidence"]) <= 1:
            raise ValueError("finding confidence must be between 0 and 1")
        if int(data["line"]) < 1:
            raise ValueError("finding line must be >= 1")
        return cls(
            id=str(data["id"]),
            tool=str(data["tool"]),
            rule=str(data["rule"]),
            severity=data["severity"],
            file=str(data["file"]),
            line=int(data["line"]),
            end_line=int(data["end_line"]) if data.get("end_line") else None,
            message=str(data["message"]),
            confidence=float(data["confidence"]),
            fixability=data.get("fixability"),
            metadata=dict(data.get("metadata") or {}),
        )


@dataclass(frozen=True)
class RemediationProposal:
    root_cause: str
    patch: str
    tests: list[str]
    assumptions: list[str]
    confidence: float
    risk: Risk

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "RemediationProposal":
        required = ("root_cause", "patch", "tests", "assumptions", "confidence", "risk")
        missing = [key for key in required if key not in data]
        if missing:
            raise ValueError(f"LLM response missing required fields: {missing}")
        if not isinstance(data["patch"], str):
            raise ValueError("patch must be a string")
        if not 0 <= float(data["confidence"]) <= 1:
            raise ValueError("confidence must be between 0 and 1")
        if data["risk"] not in {"LOW", "MEDIUM", "HIGH"}:
            raise ValueError("risk must be LOW, MEDIUM or HIGH")
        if not isinstance(data["tests"], list) or not all(isinstance(x, str) for x in data["tests"]):
            raise ValueError("tests must be an array of strings")
        if not isinstance(data["assumptions"], list) or not all(isinstance(x, str) for x in data["assumptions"]):
            raise ValueError("assumptions must be an array of strings")
        return cls(
            root_cause=str(data["root_cause"]),
            patch=data["patch"],
            tests=list(data["tests"]),
            assumptions=list(data["assumptions"]),
            confidence=float(data["confidence"]),
            risk=data["risk"],
        )


@dataclass(frozen=True)
class ValidationEvidence:
    patch_applied: bool
    tests_passed: bool
    build_passed: bool | None
    lint_passed: bool | None
    original_finding_resolved: bool
    new_high_critical_findings: int
    command_results: list[dict[str, Any]] = field(default_factory=list)
    security_rescan: dict[str, Any] = field(default_factory=dict)
    error: str | None = None

    @property
    def validated(self) -> bool:
        return (
            self.patch_applied
            and self.tests_passed
            and self.original_finding_resolved
            and self.new_high_critical_findings == 0
            and self.build_passed is not False
            and self.lint_passed is not False
        )


@dataclass(frozen=True)
class RemediationResult:
    finding_id: str
    status: Status
    patch: str
    summary: str
    tests: list[dict[str, Any]] = field(default_factory=list)
    security_rescan: dict[str, Any] = field(default_factory=dict)
    evidence: dict[str, Any] = field(default_factory=dict)

    def as_contract(self) -> dict[str, Any]:
        return {
            "finding_id": self.finding_id,
            "status": self.status,
            "patch": self.patch,
            "summary": self.summary,
            "tests": self.tests,
            "security_rescan": self.security_rescan,
            "evidence": self.evidence,
        }
