"""Unit tests for the rule engine."""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from scanner.diff_parser import DiffHunk
from scanner.rule_engine import RuleEngine
from scanner.rules import RuleRegistry
from scanner.findings import RuleHit


class TestRuleEngine:
    """Tests for the RuleEngine class."""

    def setup_method(self):
        self.registry = RuleRegistry()
        self.engine = RuleEngine(self.registry)

    def test_scan_hunks_finds_sql_injection(self):
        hunk = DiffHunk(
            file="app.py",
            added_lines={
                10: 'cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")',
            },
            context_lines={},
        )
        hits = self.engine.scan_hunks([hunk])
        assert len(hits) > 0, "Expected to find SQL injection"
        assert any("sql" in h.rule.id.lower() or "89" in h.rule.cwe for h in hits)

    def test_scan_hunks_finds_hardcoded_password(self):
        hunk = DiffHunk(
            file="config.py",
            added_lines={
                5: 'password = "super_secret_123"',
            },
            context_lines={},
        )
        hits = self.engine.scan_hunks([hunk])
        assert len(hits) > 0, "Expected to find hardcoded password"

    def test_scan_hunks_finds_eval(self):
        hunk = DiffHunk(
            file="handler.py",
            added_lines={
                20: 'result = eval(user_input)',
            },
            context_lines={},
        )
        hits = self.engine.scan_hunks([hunk])
        assert len(hits) > 0, "Expected to find eval usage"

    def test_scan_hunks_skips_empty_lines(self):
        hunk = DiffHunk(
            file="app.py",
            added_lines={
                1: "",
                2: "   ",
                3: "\t",
            },
            context_lines={},
        )
        hits = self.engine.scan_hunks([hunk])
        assert len(hits) == 0

    def test_scan_hunks_deduplicates(self):
        """Same vulnerability on same line should not produce duplicates."""
        hunk = DiffHunk(
            file="app.py",
            added_lines={
                10: 'cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")',
            },
            context_lines={},
        )
        # Scan the same hunk twice
        hits = self.engine.scan_hunks([hunk, hunk])
        fingerprints = [h.fingerprint for h in hits]
        assert len(fingerprints) == len(set(fingerprints)), "Duplicate fingerprints found"

    def test_hit_has_fingerprint(self):
        hunk = DiffHunk(
            file="app.py",
            added_lines={
                10: 'os.system(user_command)',
            },
            context_lines={},
        )
        hits = self.engine.scan_hunks([hunk])
        for hit in hits:
            assert hit.fingerprint, "Hit missing fingerprint"
            assert len(hit.fingerprint) == 16, f"Fingerprint wrong length: {hit.fingerprint}"

    def test_scan_multiple_files(self):
        hunks = [
            DiffHunk(
                file="db.py",
                added_lines={5: 'cursor.execute(f"DELETE FROM {table}")'},
                context_lines={},
            ),
            DiffHunk(
                file="config.js",
                added_lines={10: 'const password = "hardcoded_api_key_1234"'},
                context_lines={},
            ),
        ]
        hits = self.engine.scan_hunks(hunks)
        assert len(hits) >= 1, f"Expected at least 1 hit, got {len(hits)}"

    def test_scan_hunks_respects_language_filter(self):
        """A Python-specific rule should not match against a .rs file."""
        hunk = DiffHunk(
            file="main.rs",
            added_lines={
                5: 'let x = "normal rust code";',
            },
            context_lines={},
        )
        hits = self.engine.scan_hunks([hunk])
        for hit in hits:
            assert ".rs" in hit.rule.languages or "*" in hit.rule.languages, (
                f"Rule {hit.rule.id} matched a .rs file but doesn't list .rs in its languages"
            )

    def test_hit_fields_populated(self):
        hunk = DiffHunk(
            file="app.py",
            added_lines={
                10: 'eval(request.args["code"])',
            },
            context_lines={},
        )
        hits = self.engine.scan_hunks([hunk])
        assert len(hits) > 0
        hit = hits[0]
        assert isinstance(hit, RuleHit)
        assert hit.file == "app.py"
        assert hit.line == 10
        assert hit.matched_text == 'eval(request.args["code"])'
        assert hit.rule.severity in ("CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO")
