from typing import Any
import os
import re

from scanner.findings import VulnRule, RuleHit
from scanner.diff_parser import DiffHunk

# RuleRegistry is typed as Any here to avoid circular imports if it does not exist yet
class RuleEngine:
    def __init__(self, registry: Any):
        self.registry = registry

    def scan_hunks(self, hunks: list[DiffHunk], full_file_cache: dict[str, str] | None = None) -> list[RuleHit]:
        hits = []
        for hunk in hunks:
            # Assuming registry has get_rules_for_file or similar
            # If not, caller must adjust logic depending on actual RuleRegistry
            rules = []
            if hasattr(self.registry, 'get_rules_for_file'):
                rules = self.registry.get_rules_for_file(hunk.file)
            elif hasattr(self.registry, 'rules'):
                rules = [r for r in self.registry.rules if any(hunk.file.endswith(ext) for ext in r.languages)]
                
            if not rules:
                continue
                
            full_content = full_file_cache.get(hunk.file) if full_file_cache else None
                
            hunk_lines = {}
            hunk_lines.update(hunk.context_lines)
            hunk_lines.update(hunk.added_lines)
            
            for line_num, line in hunk.added_lines.items():
                if self._should_skip_line(line):
                    continue
                hits.extend(self._match_line(line, line_num, hunk.file, rules, full_content, hunk_lines=hunk_lines))
                
        return self._deduplicate(hits)

    def _match_line(self, line: str, line_num: int, file_path: str, rules: list[VulnRule], full_content: str | None = None, hunk_lines: dict[int, str] | None = None) -> list[RuleHit]:
        hits = []
        for rule in rules:
            for pattern in rule.patterns:
                if pattern.search(line):
                    context = self._extract_context(file_path, line_num, full_content, hunk_lines=hunk_lines)
                    hit = RuleHit(
                        rule=rule,
                        file=file_path,
                        line=line_num,
                        end_line=line_num,
                        matched_text=line,
                        context=context
                    )
                    hits.append(hit)
                    break  # One hit per rule per line is enough
        return hits

    def _extract_context(self, file_path: str, line_num: int, full_content: str | None = None, hunk_lines: dict[int, str] | None = None, window: int = 20) -> str:
        lines = []
        if full_content:
            lines = full_content.splitlines()
        else:
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    lines = f.read().splitlines()
            except (FileNotFoundError, UnicodeDecodeError, OSError):
                pass
                
        if not lines and hunk_lines:
            selected = [
                f"{num}: {hunk_lines[num]}"
                for num in sorted(hunk_lines.keys())
                if abs(num - line_num) <= window
            ]
            return "\n".join(selected)
                
        if not lines:
            return ""
            
        start = max(0, line_num - 1 - window)
        end = min(len(lines), line_num - 1 + window)
        return "\n".join(lines[start:end])

    def _deduplicate(self, hits: list[RuleHit]) -> list[RuleHit]:
        seen = set()
        deduped = []
        for hit in hits:
            if hit.fingerprint not in seen:
                seen.add(hit.fingerprint)
                deduped.append(hit)
        return deduped

    def _should_skip_line(self, line: str) -> bool:
        s = line.strip()
        if not s:
            return True
        return False
