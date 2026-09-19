"""Deterministic remediation rules."""
from __future__ import annotations
import re
from pathlib import Path
from .models import RemediationProposal, SecurityFinding
from .patching import unified_diff

class NoDeterministicFix(Exception):
    pass

def sql_injection_fix(repo_path: str | Path, finding: SecurityFinding) -> RemediationProposal:
    """Fix only the audited Python qmark-SQL fixture pattern."""
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
    pattern = re.compile(
        r'(?P<indent>\s*)query\s*=\s*"(?P<prefix>[^"]*)"\s*\+\s*'
        r'(?P<var>[A-Za-z_]\w*)\s*\+\s*"(?P<suffix>[^"]*)"'
    )
    match = pattern.fullmatch(line.rstrip("\n"))
    if not match:
        raise NoDeterministicFix("no audited SQL concatenation pattern found")
    var = match.group("var")
    replacement = (
        f'{match.group("indent")}query = "'
        f'{match.group("prefix")}?{match.group("suffix")}"'
        + ("\n" if line.endswith("\n") else "")
    )
    new_lines = list(lines)
    new_lines[index] = replacement
    execute_index = None
    for j in range(index + 1, min(index + 6, len(new_lines))):
        if "execute(query" in new_lines[j]:
            execute_index = j
            break
    if execute_index is None:
        raise NoDeterministicFix("could not locate execute(query) call")
    execute_line = new_lines[execute_index]
    if f"execute(query, ({var},))" not in execute_line:
        execute_line = execute_line.replace("execute(query)", f"execute(query, ({var},))")
    new_lines[execute_index] = execute_line
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
