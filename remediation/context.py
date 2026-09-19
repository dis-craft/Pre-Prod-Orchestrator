"""Build minimal, redacted context for an LLM remediation request."""
from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

from .models import SecurityFinding

_SECRET_PATTERNS = [
    re.compile(r"(?i)\b(api[_-]?key|access[_-]?token|secret|password|passwd)\s*[:=]\s*['"][^'"]+['"]"),
    re.compile(r"(?i)\b(bearer\s+)[A-Za-z0-9._~+/=-]{12,}"),
    re.compile(r"-----BEGIN [A-Z ]+ PRIVATE KEY-----.*?-----END [A-Z ]+ PRIVATE KEY-----", re.S),
    re.compile(r"(?i)\b(?:ghp|github_pat|sk|xoxb|xoxp)-[A-Za-z0-9_-]{12,}\b"),
]


def redact_secrets(text: str) -> str:
    result = text
    for pattern in _SECRET_PATTERNS:
        result = pattern.sub("[REDACTED_SECRET]", result)
    return result


@dataclass(frozen=True)
class RemediationContext:
    finding: dict
    file: str
    line_range: tuple[int, int]
    code: str
    enclosing_symbol: str
    imports: str
    relevant_tests: str
    scanner_context: str

    def as_prompt_text(self) -> str:
        sections = [
            ("FINDING_DATA", self._dump(self.finding)),
            ("CODE_DATA", self.code),
            ("SYMBOL_DATA", self.enclosing_symbol),
            ("IMPORT_DATA", self.imports),
            ("TEST_DATA", self.relevant_tests),
            ("SCANNER_DATA", self.scanner_context),
        ]
        return "\n\n".join(
            f"<UNTRUSTED_{name}>\n{redact_secrets(value)}\n</UNTRUSTED_{name}>"
            for name, value in sections
        )

    @staticmethod
    def _dump(value: object) -> str:
        import json
        return json.dumps(value, indent=2, sort_keys=True)


class ContextBuilder:
    """Extract only the source context needed to propose a small patch."""

    def __init__(self, repo_path: str | Path, max_context_lines: int = 120):
        self.repo_path = Path(repo_path).resolve()
        self.max_context_lines = max_context_lines

    def build(self, finding: SecurityFinding) -> RemediationContext:
        path = self._safe_repo_path(finding.file)
        if not path.is_file():
            raise FileNotFoundError(f"finding file does not exist: {finding.file}")

        lines = path.read_text(encoding="utf-8").splitlines()
        start = max(1, finding.line - 20)
        end = min(len(lines), (finding.end_line or finding.line) + 20)
        if end - start + 1 > self.max_context_lines:
            end = start + self.max_context_lines - 1
        code = "\n".join(f"{i}: {lines[i-1]}" for i in range(start, end + 1))

        imports = "\n".join(
            f"{i}: {line}" for i, line in enumerate(lines, 1)
            if re.match(r"^\s*(import\s+|from\s+\S+\s+import\s+|#include\s+|using\s+)", line)
        )
        relevant_tests = self._find_relevant_tests(path.name, finding)
        symbol = self._find_enclosing_symbol(lines, finding.line)
        scanner_context = (
            f"tool={finding.tool}\nrule={finding.rule}\nseverity={finding.severity}\n"
            f"confidence={finding.confidence}\nmessage={finding.message}"
        )
        return RemediationContext(
            finding={
                "id": finding.id,
                "file": finding.file,
                "line": finding.line,
                "end_line": finding.end_line,
                "severity": finding.severity,
                "rule": finding.rule,
                "confidence": finding.confidence,
            },
            file=finding.file,
            line_range=(start, end),
            code=code,
            enclosing_symbol=symbol,
            imports=imports,
            relevant_tests=relevant_tests,
            scanner_context=scanner_context,
        )

    def _safe_repo_path(self, relative: str) -> Path:
        candidate = (self.repo_path / relative).resolve()
        try:
            candidate.relative_to(self.repo_path)
        except ValueError as exc:
            raise ValueError("finding path escapes repository") from exc
        return candidate

    def _find_relevant_tests(self, filename: str, finding: SecurityFinding) -> str:
        candidates = []
        for directory in (self.repo_path / "tests", self.repo_path / "test"):
            if not directory.is_dir():
                continue
            for path in directory.rglob("*"):
                if path.is_file() and path.suffix in {".py", ".js", ".ts", ".tsx", ".java"}:
                    text = path.read_text(encoding="utf-8", errors="replace")
                    if filename in text or finding.rule in text or finding.id in text:
                        candidates.append(path)
        chunks = []
        for path in candidates[:5]:
            text = redact_secrets(path.read_text(encoding="utf-8", errors="replace"))
            chunks.append(f"### {path.relative_to(self.repo_path)}\n{text[:6000]}")
        return "\n\n".join(chunks)

    @staticmethod
    def _find_enclosing_symbol(lines: list[str], line_number: int) -> str:
        target = min(max(line_number, 1), len(lines)) - 1
        patterns = [
            re.compile(r"^\s*(?:async\s+def|def|class)\s+([A-Za-z_]\w*)"),
            re.compile(r"^\s*(?:export\s+)?(?:async\s+)?function\s+([A-Za-z_]\w*)"),
            re.compile(r"^\s*(?:public|private|protected|static|\s)*\w[\w<>\[\]]*\s+([A-Za-z_]\w*)\s*\("),
        ]
        for i in range(target, -1, -1):
            for pattern in patterns:
                match = pattern.match(lines[i])
                if match:
                    return match.group(1)
        return ""
