"""Deterministic remediation rules."""
from __future__ import annotations
import re
from pathlib import Path
from .models import RemediationProposal, SecurityFinding
from .patching import unified_diff

class NoDeterministicFix(Exception):
    pass

def sql_injection_fix(repo_path: str | Path, finding: SecurityFinding) -> RemediationProposal:
    if "sql" not in finding.rule.lower() and "injection" not in finding.message.lower():
        raise NoDeterministicFix("finding is not classified as SQL injection")
    root = Path(repo_path).resolve()
    path = (root / finding.file).resolve()
    try:
        path.relative_to(root)
    except ValueError as exc:
        raise NoDeterministicFix("finding path escapes repository") from exc
    if path.suffix != ".py":
        raise NoDeterministicFix("deterministic SQL rule currently targets Python fixtures")
    before = path.read_text(encoding="utf-8")
    lines = before.splitlines(keepends=True)
    index = finding.line - 1
    if not 0 <= index < len(lines):
        raise NoDeterministicFix("finding line is outside the file")
    line = lines[index]
    # Narrow audited pattern: SQL text is built from one variable concatenation.
    pattern = re.compile(
        r'''^(?P<indent>\\s*)query\\s*=\\s*"(?P<left>.*?)"\\s*\\+\\s*'''
        r'''(?P<var>[A-Za-z_]\\w*)\\s*\\+\\s*"(?P<right>.*?)"\\s*$'''
    )
    match = pattern.match(line.rstrip("\\n"))
    if not match:
        raise NoDeterministicFix("no audited SQL concatenation pattern found")

    left = match.group("left")
    right = match.group("right")
    if not (left.endswith("'") and right.startswith("'")):
        raise NoDeterministicFix("SQL concatenation does not match the audited quoted-value pattern")

    prefix = left[:-1]
    suffix = right[1:]
    replacement = (
        f'{match.group("indent")}query = "{prefix}?{suffix}"'
        + ("\\n" if line.endswith("\\n") else "")
    )
    new_lines = list(lines)
    new_lines[index] = replacement
    execute_index = next((j for j in range(index + 1, min(index + 6, len(new_lines))) if "execute(query" in new_lines[j]), None)
    if execute_index is None:
        raise NoDeterministicFix("could not locate execute(query) call")
    new_lines[execute_index] = new_lines[execute_index].replace(
        "execute(query)", f"execute(query, ({match.group('var')},))"
    )
    after = "".join(new_lines)
    if after == before:
        raise NoDeterministicFix("deterministic rule produced no change")
    return RemediationProposal(
        root_cause="User-controlled input is concatenated into an SQL statement.",
        patch=unified_diff(before, after, finding.file),
        tests=["remediation/fixture_tests.py"],
        assumptions=["The fixture uses a DB-API qmark parameter style."],
        confidence=1.0,
        risk="LOW",
    )
