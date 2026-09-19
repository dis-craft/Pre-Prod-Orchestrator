"""Unified-diff generation and safety checks."""
from __future__ import annotations

import difflib
import re
from dataclasses import dataclass
from pathlib import PurePosixPath

_DIFF_HEADER = re.compile(r"^(---|\+\+\+) ([^\t]+)(?:\t.*)?$")
_GIT_HEADER = re.compile(r"^diff --git a/(.+) b/(.+)$")
_HUNK = re.compile(r"^@@ -\d+(?:,\d+)? \+\d+(?:,\d+)? @@")
_SAFE_PATH = re.compile(r"^[A-Za-z0-9._/\-]+$")


@dataclass(frozen=True)
class PatchInspection:
    files: tuple[str, ...]
    additions: int
    deletions: int


class PatchError(ValueError):
    pass


def unified_diff(before: str, after: str, path: str) -> str:
    if not path or path.startswith("/") or ".." in PurePosixPath(path).parts or ":" in PurePosixPath(path).parts[0]:
        raise PatchError("unsafe patch path")
    diff = difflib.unified_diff(
        before.splitlines(keepends=True),
        after.splitlines(keepends=True),
        fromfile=f"a/{path}",
        tofile=f"b/{path}",
        n=3,
    )
    return "".join(diff)


def inspect_patch(patch: str, allowed_files: set[str], max_changed_lines: int = 80) -> PatchInspection:
    if not patch.strip():
        raise PatchError("patch is empty")
    if "GIT binary patch" in patch or "\x00" in patch:
        raise PatchError("binary patches are not allowed")

    files: list[str] = []
    additions = deletions = 0
    saw_hunk = False
    pending_old = pending_new = None

    for raw in patch.splitlines():
        if raw.startswith("diff --git "):
            match = _GIT_HEADER.match(raw)
            if not match:
                raise PatchError("invalid git diff header")
            old, new = match.groups()
            if old != new:
                raise PatchError("renames/copies are not allowed")
            if not _safe_file(old):
                raise PatchError("unsafe patch path")
            files.append(old)
        elif raw.startswith("--- "):
            match = _DIFF_HEADER.match(raw)
            if not match:
                raise PatchError("invalid old-file header")
            pending_old = _normalize_header_path(match.group(2))
        elif raw.startswith("+++ "):
            match = _DIFF_HEADER.match(raw)
            if not match:
                raise PatchError("invalid new-file header")
            pending_new = _normalize_header_path(match.group(2))
            if pending_old != pending_new:
                raise PatchError("patch must modify one existing file without rename")
            if pending_new and pending_new not in files:
                files.append(pending_new)
        elif raw.startswith("@@ "):
            if not _HUNK.match(raw):
                raise PatchError("invalid hunk header")
            saw_hunk = True
        elif raw.startswith("+") and not raw.startswith("+++"):
            additions += 1
        elif raw.startswith("-") and not raw.startswith("---"):
            deletions += 1

    if not saw_hunk:
        raise PatchError("patch contains no hunks")
    if not files:
        raise PatchError("patch contains no files")
    if len(set(files)) != len(files):
        raise PatchError("duplicate file entries")
    if set(files) != allowed_files:
        raise PatchError(f"patch files {sorted(set(files))} do not exactly match allowed files {sorted(allowed_files)}")
    if additions + deletions > max_changed_lines:
        raise PatchError("patch exceeds maximum changed-line budget")
    return PatchInspection(tuple(files), additions, deletions)


def _normalize_header_path(path: str) -> str:
    if path == "/dev/null":
        raise PatchError("file creation/deletion is not allowed")
    if path.startswith("a/") or path.startswith("b/"):
        path = path[2:]
    if not _safe_file(path):
        raise PatchError("unsafe patch path")
    return path


def _safe_file(path: str) -> bool:
    if not path or path.startswith("/") or "\\" in path or "\x00" in path:
        return False
    parts = PurePosixPath(path).parts
    return ".." not in parts and all(part not in {"", "."} for part in parts) and bool(_SAFE_PATH.fullmatch(path))
