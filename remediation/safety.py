"""Safety gates for model-generated remediation proposals."""
from __future__ import annotations

import re
from pathlib import PurePosixPath

from .models import RemediationProposal, SecurityFinding
from .patching import PatchError, PatchInspection, inspect_patch

MIN_CONFIDENCE = {
    "INFO": 0.90,
    "LOW": 0.85,
    "MEDIUM": 0.90,
    "HIGH": 0.95,
    "CRITICAL": 0.98,
}

_SECRET = re.compile(
    r"""(?i)(?:-----BEGIN .* PRIVATE KEY-----|(?:api[_-]?key|secret|password|token)\s*[:=]\s*[\'"][^\'"]+)"""
)


class SafetyError(ValueError):
    pass


def validate_proposal(
    finding: SecurityFinding,
    proposal: RemediationProposal,
    *,
    max_changed_lines: int = 80,
) -> PatchInspection:
    threshold = MIN_CONFIDENCE[finding.severity]
    if proposal.confidence < threshold:
        raise SafetyError(
            f"confidence {proposal.confidence:.3f} is below {finding.severity} threshold {threshold:.3f}"
        )
    if proposal.risk == "HIGH":
        raise SafetyError("HIGH-risk LLM proposals are not auto-validatable")
    if _SECRET.search(proposal.patch):
        raise SafetyError("patch appears to contain a secret")
    try:
        inspection = inspect_patch(
            proposal.patch,
            allowed_files={finding.file},
            max_changed_lines=max_changed_lines,
        )
    except PatchError as exc:
        raise SafetyError(str(exc)) from exc

    for test_path in proposal.tests:
        _validate_test_reference(test_path)
    return inspection


def _validate_test_reference(path: str) -> None:
    if path.startswith("/") or "\\" in path:
        raise SafetyError(f"unsafe test path: {path}")
    parts = PurePosixPath(path).parts
    if ".." in parts:
        raise SafetyError(f"test path escapes repository: {path}")
