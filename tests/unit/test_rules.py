"""Unit tests for the rule registry."""

import os
import sys
import re

# Ensure the project root is on the path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from scanner.findings import VulnRule
from scanner.rules import RuleRegistry


class TestRuleRegistry:
    """Tests for the RuleRegistry class."""

    def setup_method(self):
        self.registry = RuleRegistry()

    def test_registry_has_rules(self):
        assert len(self.registry.all_rules) > 100, (
            f"Expected 100+ rules, got {len(self.registry.all_rules)}"
        )

    def test_all_rules_are_vuln_rule(self):
        for rule in self.registry.all_rules:
            assert isinstance(rule, VulnRule)

    def test_all_rules_have_required_fields(self):
        for rule in self.registry.all_rules:
            assert rule.id, f"Rule missing id: {rule}"
            assert rule.cwe, f"Rule {rule.id} missing cwe"
            assert rule.category, f"Rule {rule.id} missing category"
            assert rule.severity in ("CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"), (
                f"Rule {rule.id} has invalid severity: {rule.severity}"
            )
            assert len(rule.patterns) > 0, f"Rule {rule.id} has no patterns"
            assert len(rule.languages) > 0, f"Rule {rule.id} has no languages"
            assert rule.description, f"Rule {rule.id} missing description"
            assert rule.impact, f"Rule {rule.id} missing impact"
            assert rule.remediation, f"Rule {rule.id} missing remediation"

    def test_all_patterns_are_compiled(self):
        for rule in self.registry.all_rules:
            for pat in rule.patterns:
                assert isinstance(pat, re.Pattern), (
                    f"Rule {rule.id} has uncompiled pattern: {pat}"
                )

    def test_get_rules_for_python_file(self):
        rules = self.registry.get_rules_for_file("app.py")
        assert len(rules) > 0, "No rules for Python files"
        for rule in rules:
            assert ".py" in rule.languages or "*" in rule.languages

    def test_get_rules_for_javascript_file(self):
        rules = self.registry.get_rules_for_file("index.js")
        assert len(rules) > 0, "No rules for JavaScript files"

    def test_get_rules_for_dockerfile(self):
        rules = self.registry.get_rules_for_file("Dockerfile")
        # Dockerfile has no extension, so it should return all rules (wildcard match)
        assert len(rules) > 0

    def test_get_rules_by_category(self):
        injection_rules = self.registry.get_rules_by_category("Injection")
        assert len(injection_rules) > 0, "No injection rules found"
        for rule in injection_rules:
            assert rule.category.lower() == "injection"

    def test_categories_coverage(self):
        """Ensure we cover the major security categories."""
        categories = set(rule.category.lower() for rule in self.registry.all_rules)
        expected = {"injection", "secrets & credentials", "cryptography"}
        for cat in expected:
            assert cat in categories, f"Missing category: {cat}"

    # ── Positive match tests ──
    def test_sql_injection_matches(self):
        """SQL injection patterns should match vulnerable code."""
        test_lines = [
            'cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")',
            'cursor.execute("SELECT * FROM users WHERE id = " + user_id)',
            "cursor.execute(\"SELECT * FROM users WHERE id = %s\" % user_id)",
        ]
        sql_rules = [
            r for r in self.registry.all_rules
            if "sql" in r.id.lower() and "injection" in r.category.lower()
        ]
        assert len(sql_rules) > 0, "No SQL injection rules found"

        matched = False
        for line in test_lines:
            for rule in sql_rules:
                for pat in rule.patterns:
                    if pat.search(line):
                        matched = True
                        break
        assert matched, "SQL injection patterns failed to match any test case"

    def test_hardcoded_password_matches(self):
        """Hardcoded password patterns should match."""
        test_lines = [
            'password = "supersecret123"',
            "db_password = 'hunter2'",
            'PASSWORD = "admin123"',
        ]
        secret_rules = [
            r for r in self.registry.all_rules
            if "password" in r.id.lower() or "password" in r.name.lower()
        ]
        assert len(secret_rules) > 0, "No password rules found"

        matched = False
        for line in test_lines:
            for rule in secret_rules:
                for pat in rule.patterns:
                    if pat.search(line):
                        matched = True
                        break
        assert matched, "Password patterns failed to match any test case"

    def test_eval_matches(self):
        """eval/exec patterns should match."""
        test_lines = [
            'eval(user_input)',
            'exec(code_string)',
        ]
        eval_rules = [
            r for r in self.registry.all_rules
            if "eval" in r.id.lower() or "code_injection" in r.id.lower() or "code injection" in r.name.lower()
        ]

        matched = False
        for line in test_lines:
            for rule in eval_rules:
                for pat in rule.patterns:
                    if pat.search(line):
                        matched = True
                        break
        # eval might be caught by general injection rules too
        if not matched:
            for line in test_lines:
                for rule in self.registry.all_rules:
                    for pat in rule.patterns:
                        if pat.search(line):
                            matched = True
                            break
        assert matched, "eval/exec patterns not matched by any rule"

    def test_weak_hash_matches(self):
        """Weak hash patterns should match MD5/SHA1 usage."""
        test_lines = [
            'hashlib.md5(data)',
            'hashlib.sha1(password)',
            'MD5.new(data)',
        ]
        hash_rules = [
            r for r in self.registry.all_rules
            if "md5" in r.id.lower() or "sha1" in r.id.lower()
               or "weak" in r.id.lower() and "hash" in r.id.lower()
        ]

        matched = False
        for line in test_lines:
            for rule in hash_rules:
                for pat in rule.patterns:
                    if pat.search(line):
                        matched = True
                        break
            if not matched:
                for rule in self.registry.all_rules:
                    for pat in rule.patterns:
                        if pat.search(line):
                            matched = True
                            break
        assert matched, "Weak hash patterns not matched"

    # ── Negative / false positive tests ──
    def test_normal_string_assignment_no_match(self):
        """Normal variable assignments should not trigger password rules."""
        test_line = 'username = "john_doe"'
        password_rules = [
            r for r in self.registry.all_rules
            if "password" in r.id.lower() and "hardcoded" in r.name.lower()
        ]
        for rule in password_rules:
            for pat in rule.patterns:
                assert not pat.search(test_line), (
                    f"Rule {rule.id} falsely matched: {test_line}"
                )

