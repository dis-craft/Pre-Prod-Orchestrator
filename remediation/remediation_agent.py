"""
Remediation Agent — AI-powered security fix generation.

Takes scanner findings (JSON), reads source files, sends context to Gemini LLM,
receives structured JSON edits, verifies them, and applies fixes.
"""
from __future__ import annotations

import json
import logging
import os
import re
import textwrap
from dataclasses import dataclass, field, asdict
from pathlib import Path
from typing import Optional

from google import genai

log = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Data classes
# ---------------------------------------------------------------------------

@dataclass
class EditProposal:
    """A single line-level code edit returned by the LLM."""
    file: str
    start_line: int
    end_line: int
    original: str
    replacement: str
    explanation: str

    def to_dict(self) -> dict:
        return asdict(self)


@dataclass
class RemediationResult:
    """Outcome of remediating one finding."""
    finding_id: str
    status: str                          # PROPOSED | APPLIED | SKIPPED | FAILED
    edits: list[EditProposal] = field(default_factory=list)
    error: Optional[str] = None

    def to_dict(self) -> dict:
        return {
            "finding_id": self.finding_id,
            "status": self.status,
            "edits": [e.to_dict() for e in self.edits],
            "error": self.error,
        }


# ---------------------------------------------------------------------------
# Prompt template
# ---------------------------------------------------------------------------

_SYSTEM_PROMPT = textwrap.dedent("""\
You are a senior security engineer. You receive a vulnerability finding and
the relevant source code with line numbers. Your job is to produce the
MINIMAL code edit that fixes the vulnerability.

Rules:
- Return ONLY valid JSON, no markdown fences, no commentary outside JSON.
- The JSON must match this schema exactly:
  {
    "edits": [
      {
        "file": "<relative path>",
        "start_line": <int>,
        "end_line": <int>,
        "original": "<exact text currently in the file at those lines>",
        "replacement": "<fixed text>",
        "explanation": "<one-line why this fixes the issue>"
      }
    ]
  }
- "original" must be the EXACT characters on lines start_line..end_line
  (inclusive), joined with newlines. Copy them verbatim from the context.
- Keep changes minimal — only modify what is necessary to fix the vulnerability.
- Preserve indentation, quotes, and whitespace exactly.
- Do NOT add imports unless absolutely required (and if so, add a separate edit).
- The post-remediation scanner will run against your replacement. The replacement MUST remove the triggering pattern from the finding, not merely make the code semantically safer.
- For INJ-SQL-JS specifically, do NOT leave a dynamically constructed SQL string in a variable passed to db.query/query(...). Prefer a parameterized call such as db.query("SELECT ... WHERE username = ?", [username]).
- Re-read the supplied source context mentally after your edit and ensure the original scanner rule would no longer match.
- If the vulnerability cannot be fixed with a simple edit, return {"edits": []}.
""")

_USER_PROMPT_TEMPLATE = textwrap.dedent("""\
## Finding

| Field | Value |
|-------|-------|
| ID | {finding_id} |
| Rule | {rule} |
| CWE | {cwe} |
| Severity | {severity} |
| File | {file} |
| Line | {line} |
| Category | {category} |
| Message | {message} |

### What & Why
{what_and_why}

### Suggested Fix Approach
{how_to_fix}

---

## Repository Context
{repo_context}

---

## Source Code (with line numbers)

File: `{file}`

```
{context}
```

---

Produce the JSON edit to fix this vulnerability.
""")


# ---------------------------------------------------------------------------
# Agent
# ---------------------------------------------------------------------------

class RemediationAgent:
    """Reads findings, calls Gemini for fixes, verifies and applies edits."""

    def __init__(
        self,
        api_key: str | None = None,
        model_name: str = "gemini-3.5-flash-lite",
        repo_path: str = ".",
        context_window: int = 30,
    ):
        self.api_key = api_key or os.environ.get("GEMINI_API_KEY", "")
        if not self.api_key:
            raise ValueError(
                "Gemini API key required. Pass api_key= or set GEMINI_API_KEY env var."
            )
        self.model_name = model_name
        self.repo_path = Path(repo_path).resolve()
        self.context_window = context_window

        self.client = genai.Client(api_key=self.api_key)

        # Accumulated file changes: {abs_path: new_content}
        self._file_cache: dict[str, str] = {}

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def remediate_findings(self, findings: list[dict]) -> list[RemediationResult]:
        """Process all findings and return remediation results."""
        results: list[RemediationResult] = []
        for finding in findings:
            fid = finding.get("id", "unknown")
            try:
                result = self._remediate_one(finding)
                results.append(result)
            except Exception as exc:
                log.error("Failed to remediate %s: %s", fid, exc)
                results.append(RemediationResult(
                    finding_id=fid, status="FAILED", error=str(exc),
                ))
        return results

    def get_file_changes(self) -> dict[str, str]:
        """Return accumulated {relative_path: new_content} for all applied edits."""
        changes: dict[str, str] = {}
        for abs_path, content in self._file_cache.items():
            rel = str(Path(abs_path).relative_to(self.repo_path))
            changes[rel] = content
        return changes

    # ------------------------------------------------------------------
    # Core pipeline per finding
    # ------------------------------------------------------------------

    def _remediate_one(self, finding: dict) -> RemediationResult:
        fid = finding.get("id", "unknown")
        file_rel = finding.get("file", "")
        line = finding.get("line", 1)
        end_line = finding.get("end_line") or line

        if not file_rel:
            return RemediationResult(finding_id=fid, status="SKIPPED",
                                     error="No file path in finding")

        # 1. Read file (use cached version if we've already edited it)
        file_abs = str(self.repo_path / file_rel)
        file_content, resolved_file_abs = self._read_file(file_abs)
        if file_content is None or not resolved_file_abs:
            return RemediationResult(finding_id=fid, status="SKIPPED",
                                     error=f"Cannot read {file_rel}")
        file_abs = resolved_file_abs

        # 2. Extract context (enclosing function ± window)
        context, ctx_start, ctx_end = self._extract_context(
            file_content, line, end_line
        )

        # 3. Build prompt
        repo_context = self._repository_context(finding)
        prompt = self._build_prompt(finding, context, repo_context)

        # 4. Call LLM
        log.info("Calling Gemini for finding %s (%s:%d)", fid, file_rel, line)
        raw_response = self._call_llm(prompt)

        # 5. Parse edits
        edits = self._parse_edits(raw_response, file_rel)
        if not edits:
            return RemediationResult(finding_id=fid, status="SKIPPED",
                                     error="LLM returned no edits")

        # 6. Verify and apply each edit
        applied_edits: list[EditProposal] = []
        current_content = file_content

        for edit in edits:
            edit_file_abs = str(self.repo_path / edit.file)

            # If this edit targets a different file, read that file
            if edit_file_abs != file_abs:
                edit_content, resolved_edit_abs = self._read_file(edit_file_abs)
                if edit_content is None or not resolved_edit_abs:
                    log.warning("Cannot read %s for edit, skipping", edit.file)
                    continue
                edit_file_abs = resolved_edit_abs
            else:
                edit_content = current_content

            # Verify original text matches
            if not self._verify_edit(edit_content, edit):
                log.warning(
                    "Edit verification failed for %s:%d-%d — original text mismatch",
                    edit.file, edit.start_line, edit.end_line,
                )
                continue

            # Apply edit
            new_content = self._apply_edit(edit_content, edit)
            if new_content is None:
                log.warning("Failed to apply edit for %s:%d", edit.file, edit.start_line)
                continue

            # Update cache
            self._file_cache[edit_file_abs] = new_content
            if edit_file_abs == file_abs:
                current_content = new_content

            applied_edits.append(edit)
            log.info("Applied edit: %s:%d-%d — %s",
                      edit.file, edit.start_line, edit.end_line, edit.explanation)

        if not applied_edits:
            return RemediationResult(finding_id=fid, status="FAILED",
                                     error="No edits could be verified and applied")

        return RemediationResult(
            finding_id=fid, status="APPLIED", edits=applied_edits,
        )

    # ------------------------------------------------------------------
    # File I/O
    # ------------------------------------------------------------------

    def _read_file(self, abs_path: str) -> tuple[str, str] | tuple[None, None]:
        """Read file content and return (content, resolved_abs_path), using cache if available."""
        if abs_path in self._file_cache:
            return self._file_cache[abs_path], abs_path

        target_path = Path(abs_path)
        if not target_path.exists():
            # If not found directly, search within repo
            rel = str(target_path.name)
            candidates = list(self.repo_path.rglob(rel))
            if candidates:
                target_path = candidates[0]
                abs_path = str(target_path)
                if abs_path in self._file_cache:
                    return self._file_cache[abs_path], abs_path

        try:
            content = target_path.read_text(encoding="utf-8")
            return content, abs_path
        except (FileNotFoundError, UnicodeDecodeError, OSError) as exc:
            log.warning("Cannot read %s: %s", abs_path, exc)
            return None, None

    def write_changes(self) -> list[str]:
        """Write all cached file changes to disk. Returns list of written paths."""
        written: list[str] = []
        for abs_path, content in self._file_cache.items():
            Path(abs_path).write_text(content, encoding="utf-8")
            rel = str(Path(abs_path).relative_to(self.repo_path))
            written.append(rel)
            log.info("Wrote %s", rel)
        return written

    # ------------------------------------------------------------------
    # Context extraction
    # ------------------------------------------------------------------

    def _extract_context(
        self, file_content: str, line: int, end_line: int
    ) -> tuple[str, int, int]:
        """Extract enclosing function ± context_window lines, with line numbers."""
        lines = file_content.splitlines()
        total = len(lines)

        # Expand to enclosing function boundaries (heuristic: look for def/function/class)
        func_start = max(0, line - 1 - self.context_window)
        func_end = min(total, end_line + self.context_window)

        # Try to find function boundary going upward
        for i in range(line - 2, max(-1, line - 1 - self.context_window * 2), -1):
            if i < 0:
                break
            stripped = lines[i].lstrip()
            if (stripped.startswith(("def ", "async def ", "class "))        # Python
                or re.match(r"(function\s|const\s+\w+\s*=|.*=>\s*\{)", stripped)   # JS
                or re.match(r"(public|private|protected|static)\s+", stripped)):    # Java/C#
                func_start = i
                break

        # Build numbered context
        ctx_start = func_start + 1   # 1-indexed
        ctx_end = func_end
        numbered_lines = []
        for i in range(func_start, func_end):
            numbered_lines.append(f"{i + 1}: {lines[i]}")

        return "\n".join(numbered_lines), ctx_start, ctx_end

    # ------------------------------------------------------------------
    # Prompt building
    # ------------------------------------------------------------------

    def _repository_context(self, finding: dict) -> str:
        skip = {".git", ".venv", "venv", "node_modules", "__pycache__", "dist", "build", ".preprod", "data"}
        files = []
        for root, dirs, names in os.walk(self.repo_path):
            dirs[:] = [d for d in dirs if d not in skip]
            for name in names:
                try:
                    files.append(str(Path(root, name).relative_to(self.repo_path)).replace("\\", "/"))
                except ValueError:
                    pass
        files.sort()
        important = []
        for rel in files:
            if Path(rel).name in {"README.md", "package.json", "requirements.txt", "pyproject.toml", "go.mod", "pom.xml", "Cargo.toml"} and len(important) < 6:
                try:
                    important.append("--- " + rel + " ---\n" + (self.repo_path / rel).read_text(encoding="utf-8", errors="replace")[:6000])
                except OSError:
                    pass
        target = str(finding.get("file", ""))
        related = []
        stem = Path(target).stem
        for rel in files:
            if rel == target or len(related) >= 4 or Path(rel).stem != stem:
                continue
            try:
                related.append("--- " + rel + " ---\n" + (self.repo_path / rel).read_text(encoding="utf-8", errors="replace")[:4000])
            except OSError:
                pass
        parts = ["Repository file tree:\n" + "\n".join(files[:300])]
        if important:
            parts.append("Important project files:\n" + "\n".join(important))
        if related:
            parts.append("Related modules:\n" + "\n".join(related))
        return "\n\n".join(parts)[:26000]

    def _build_prompt(self, finding: dict, context: str, repo_context: str) -> str:
        return _USER_PROMPT_TEMPLATE.format(
            finding_id=finding.get("id", ""),
            rule=finding.get("rule", ""),
            cwe=finding.get("cwe", ""),
            severity=finding.get("severity", ""),
            file=finding.get("file", ""),
            line=finding.get("line", ""),
            category=finding.get("category", ""),
            message=finding.get("message", ""),
            what_and_why=finding.get("what_and_why", finding.get("message", "")),
            how_to_fix=finding.get("how_to_fix", "Apply standard secure coding practices."),
            context=context,
            repo_context=repo_context,
        )

    # ------------------------------------------------------------------
    # LLM call
    # ------------------------------------------------------------------

    def _call_llm(self, prompt: str) -> str:
        """Call the selected model. Gemini is primary; xAI/Grok is supported as fallback."""
        provider = os.environ.get("REMEDIATION_PROVIDER", "gemini").lower()
        if provider == "xai":
            return self._call_xai(prompt)

        attempts = max(1, int(os.environ.get("GEMINI_RETRY_ATTEMPTS", "4")))
        last_error = None
        for attempt in range(1, attempts + 1):
            try:
                response = self.client.models.generate_content(
                    model=self.model_name,
                    contents=prompt,
                    config=genai.types.GenerateContentConfig(
                        system_instruction=_SYSTEM_PROMPT,
                        temperature=0.1,
                        max_output_tokens=4096,
                    ),
                )
                return response.text or ""
            except Exception as exc:
                last_error = exc
                message = str(exc).lower()
                transient = any(
                    marker in message
                    for marker in ("503", "unavailable", "429", "resource exhausted", "high demand", "timeout")
                )
                if not transient or attempt == attempts:
                    raise
                time.sleep(2 ** (attempt - 1))
        raise RuntimeError(f"Gemini failed: {last_error}")

    def _call_xai(self, prompt: str) -> str:
        """Call xAI's OpenAI-compatible chat-completions API."""
        import urllib.error
        import urllib.request

        api_key = os.environ.get("XAI_API_KEY", "")
        if not api_key:
            raise RuntimeError("XAI_API_KEY is required for the xAI fallback")

        payload = json.dumps({
            "model": self.model_name,
            "messages": [
                {"role": "system", "content": _SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
            "temperature": 0.1,
            "max_tokens": 4096,
        }).encode("utf-8")

        attempts = max(1, int(os.environ.get("XAI_RETRY_ATTEMPTS", "3")))
        for attempt in range(1, attempts + 1):
            request = urllib.request.Request(
                "https://api.x.ai/v1/chat/completions",
                data=payload,
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                method="POST",
            )
            try:
                with urllib.request.urlopen(request, timeout=90) as response:
                    data = json.loads(response.read().decode("utf-8"))
                content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
                if isinstance(content, list):
                    content = "".join(
                        item.get("text", "") if isinstance(item, dict) else str(item)
                        for item in content
                    )
                return content or ""
            except urllib.error.HTTPError as exc:
                detail = exc.read().decode("utf-8", errors="replace")
                if exc.code not in {429, 500, 502, 503, 504} or attempt == attempts:
                    raise RuntimeError(f"xAI HTTP {exc.code}: {detail[:500]}") from exc
                time.sleep(2 ** (attempt - 1))
            except (urllib.error.URLError, TimeoutError) as exc:
                if attempt == attempts:
                    raise RuntimeError(f"xAI request failed: {exc}") from exc
                time.sleep(2 ** (attempt - 1))

        raise RuntimeError("xAI request exhausted")

    # ------------------------------------------------------------------
    # Parse LLM response
    # ------------------------------------------------------------------

    def _parse_edits(self, raw: str, default_file: str) -> list[EditProposal]:
        """Parse LLM JSON response into EditProposal list."""
        # Strip markdown code fences if the LLM wraps them anyway
        cleaned = raw.strip()
        cleaned = re.sub(r"^```(?:json)?\s*\n?", "", cleaned)
        cleaned = re.sub(r"\n?```\s*$", "", cleaned)
        cleaned = cleaned.strip()

        try:
            data = json.loads(cleaned)
        except json.JSONDecodeError as exc:
            log.warning("Failed to parse LLM JSON response: %s", exc)
            log.debug("Raw response: %s", raw[:500])
            return []

        edits_raw = data.get("edits", [])
        if not isinstance(edits_raw, list):
            log.warning("LLM response 'edits' is not a list")
            return []

        edits: list[EditProposal] = []
        for e in edits_raw:
            try:
                edits.append(EditProposal(
                    file=e.get("file", default_file),
                    start_line=int(e["start_line"]),
                    end_line=int(e["end_line"]),
                    original=e["original"],
                    replacement=e["replacement"],
                    explanation=e.get("explanation", ""),
                ))
            except (KeyError, ValueError, TypeError) as exc:
                log.warning("Skipping malformed edit: %s — %s", e, exc)

        return edits

    # ------------------------------------------------------------------
    # Verification & application
    # ------------------------------------------------------------------

    @staticmethod
    def _verify_edit(file_content: str, edit: EditProposal) -> bool:
        """Verify that edit.original matches the file content at the claimed lines."""
        lines = file_content.splitlines()

        # Bounds check (1-indexed)
        if edit.start_line < 1 or edit.end_line > len(lines):
            log.debug(
                "Line range %d-%d out of bounds (file has %d lines)",
                edit.start_line, edit.end_line, len(lines),
            )
            return False

        # Extract the actual lines at that range
        actual_lines = lines[edit.start_line - 1 : edit.end_line]
        actual_text = "\n".join(actual_lines)
        expected_text = edit.original

        # Exact match first
        if actual_text == expected_text:
            return True

        # Whitespace-normalized match (trailing whitespace tolerance)
        actual_stripped = "\n".join(l.rstrip() for l in actual_lines)
        expected_stripped = "\n".join(l.rstrip() for l in expected_text.splitlines())
        if actual_stripped == expected_stripped:
            return True

        log.debug(
            "Mismatch at %s:%d-%d\nExpected:\n%s\nActual:\n%s",
            edit.file, edit.start_line, edit.end_line,
            repr(expected_text[:200]), repr(actual_text[:200]),
        )
        return False

    @staticmethod
    def _apply_edit(file_content: str, edit: EditProposal) -> str | None:
        """Apply a verified edit to file content. Returns new content or None."""
        lines = file_content.splitlines(keepends=True)

        # Convert to 0-indexed
        start_idx = edit.start_line - 1
        end_idx = edit.end_line  # exclusive for slice

        # Build replacement lines (preserving final newline behavior)
        replacement_lines = edit.replacement.splitlines(keepends=True)
        # Ensure last replacement line has a newline if original did
        if replacement_lines and not replacement_lines[-1].endswith("\n"):
            if end_idx <= len(lines) and (end_idx == len(lines) or lines[end_idx - 1].endswith("\n")):
                replacement_lines[-1] += "\n"

        # Splice
        new_lines = lines[:start_idx] + replacement_lines + lines[end_idx:]
        return "".join(new_lines)

