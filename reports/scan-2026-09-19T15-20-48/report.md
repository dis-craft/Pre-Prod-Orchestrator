# Security Scan Report

| Severity | Location | What & Why (Impact) | All Occurrences | How to Fix | Why Fix Helps |
|----------|----------|---------------------|-----------------|------------|---------------|
| 🔴 CRITICAL | scanner/rules.py:71 | Attacker can execute arbitrary Python code. | scanner/rules.py:71 | Avoid eval(). Use ast.literal_eval if parsing data. | Mitigates vulnerability |
| 🔴 CRITICAL | scanner/rules.py:73 | Attacker can execute arbitrary Python code. | scanner/rules.py:73 | Avoid eval(). Use ast.literal_eval if parsing data. | Mitigates vulnerability |
| 🔴 CRITICAL | scanner/rules.py:74 | Attacker can execute arbitrary Python code. | scanner/rules.py:74 | Avoid eval(). Use ast.literal_eval if parsing data. | Mitigates vulnerability |
| 🔴 CRITICAL | scanner/rules.py:76 | Attacker can execute arbitrary Python code. | scanner/rules.py:76 | Avoid eval(). Use ast.literal_eval if parsing data. | Mitigates vulnerability |
| 🔴 CRITICAL | scanner/rules.py:77 | Attacker can execute arbitrary Python code. | scanner/rules.py:77 | Avoid eval(). Use ast.literal_eval if parsing data. | Mitigates vulnerability |
| 🔴 CRITICAL | scanner/rules.py:79 | Attacker can execute arbitrary Python code. | scanner/rules.py:79 | Avoid eval(). Use ast.literal_eval if parsing data. | Mitigates vulnerability |
| 🔴 CRITICAL | tests/unit/test_diff_parser.py:21 | Attacker can execute arbitrary SQL queries. | tests/unit/test_diff_parser.py:21 | Use parameterized queries. | Mitigates vulnerability |
| 🔴 CRITICAL | tests/unit/test_rules.py:82 | Attacker can execute arbitrary SQL queries. | tests/unit/test_rules.py:82 | Use parameterized queries. | Mitigates vulnerability |
| 🔴 CRITICAL | tests/unit/test_rules.py:126 | Attacker can execute arbitrary Python code. | tests/unit/test_rules.py:126 | Avoid eval(). Use ast.literal_eval if parsing data. | Mitigates vulnerability |
| 🔴 CRITICAL | tests/unit/test_rules.py:127 | Attacker can execute arbitrary Python code. | tests/unit/test_rules.py:127 | Avoid eval(). Use ast.literal_eval if parsing data. | Mitigates vulnerability |
| 🔴 CRITICAL | tests/unit/test_rule_engine.py:25 | Attacker can execute arbitrary SQL queries. | tests/unit/test_rule_engine.py:25 | Use parameterized queries. | Mitigates vulnerability |
| 🔴 CRITICAL | tests/unit/test_rule_engine.py:44 | Attacker can execute arbitrary Python code. | tests/unit/test_rule_engine.py:44 | Avoid eval(). Use ast.literal_eval if parsing data. | Mitigates vulnerability |
| 🔴 CRITICAL | tests/unit/test_rule_engine.py:48 | Attacker can execute arbitrary Python code. | tests/unit/test_rule_engine.py:48 | Avoid eval(). Use ast.literal_eval if parsing data. | Mitigates vulnerability |
| 🔴 CRITICAL | tests/unit/test_rule_engine.py:99 | Attacker can execute arbitrary SQL queries. | tests/unit/test_rule_engine.py:99 | Use parameterized queries. | Mitigates vulnerability |
| 🔴 CRITICAL | tests/unit/test_rule_engine.py:130 | Attacker can execute arbitrary Python code. | tests/unit/test_rule_engine.py:130 | Avoid eval(). Use ast.literal_eval if parsing data. | Mitigates vulnerability |
| 🔴 CRITICAL | tests/unit/test_rule_engine.py:140 | Attacker can execute arbitrary Python code. | tests/unit/test_rule_engine.py:140 | Avoid eval(). Use ast.literal_eval if parsing data. | Mitigates vulnerability |
| 🟠 HIGH | reports/scan-2026-09-19T15-18-00/report.json:576 | Attacker can use the password to gain access. | reports/scan-2026-09-19T15-18-00/report.json:576 | Use secure vault or env vars. | Mitigates vulnerability |
| 🟠 HIGH | reports/scan-2026-09-19T15-20-22/report.json:446 | Attacker can use the password to gain access. | reports/scan-2026-09-19T15-20-22/report.json:446 | Use secure vault or env vars. | Mitigates vulnerability |
| 🟠 HIGH | reports/scan-2026-09-19T15-20-22/report.json:602 | Attacker can use the password to gain access. | reports/scan-2026-09-19T15-20-22/report.json:602 | Use secure vault or env vars. | Mitigates vulnerability |
| 🟠 HIGH | scanner/rules.py:195 | Attacker can perform actions on behalf of the user. | scanner/rules.py:195 | Remove @csrf_exempt and enforce CSRF tokens. | Mitigates vulnerability |
| 🟠 HIGH | scanner/rules.py:196 | Attacker can perform actions on behalf of the user. | scanner/rules.py:196 | Remove @csrf_exempt and enforce CSRF tokens. | Mitigates vulnerability |
| 🟠 HIGH | tests/unit/test_diff_parser.py:20 | Attacker can use the password to gain access. | tests/unit/test_diff_parser.py:20 | Use secure vault or env vars. | Mitigates vulnerability |
| 🟠 HIGH | tests/unit/test_diff_parser.py:66 | Exposes stack traces and interactive debuggers. | tests/unit/test_diff_parser.py:66 | Set DEBUG=False in production. | Mitigates vulnerability |
| 🟠 HIGH | tests/unit/test_rules.py:104 | Attacker can use the password to gain access. | tests/unit/test_rules.py:104 | Use secure vault or env vars. | Mitigates vulnerability |
| 🟠 HIGH | tests/unit/test_rules.py:105 | Attacker can use the password to gain access. | tests/unit/test_rules.py:105 | Use secure vault or env vars. | Mitigates vulnerability |
| 🟠 HIGH | tests/unit/test_rules.py:106 | Attacker can use the password to gain access. | tests/unit/test_rules.py:106 | Use secure vault or env vars. | Mitigates vulnerability |
| 🟠 HIGH | tests/unit/test_rules.py:154 | Attacker can perform collision attacks. | tests/unit/test_rules.py:154 | Use SHA-256 or SHA-3. | Mitigates vulnerability |
| 🟠 HIGH | tests/unit/test_rules.py:155 | Attacker can perform collision attacks. | tests/unit/test_rules.py:155 | Use SHA-256 or SHA-3. | Mitigates vulnerability |
| 🟠 HIGH | tests/unit/test_rule_engine.py:37 | Attacker can use the password to gain access. | tests/unit/test_rule_engine.py:37 | Use secure vault or env vars. | Mitigates vulnerability |
| 🟠 HIGH | tests/unit/test_rule_engine.py:104 | Attacker can use the password to gain access. | tests/unit/test_rule_engine.py:104 | Use secure vault or env vars. | Mitigates vulnerability |
| 🔵 LOW | scanner/report_builder.py:44 | Can cause logic errors across different timezones. | scanner/report_builder.py:44 | Use timezone-aware datetimes (datetime.now(timezone.utc)). | Mitigates vulnerability |
| 🔵 LOW | scanner/report_builder.py:92 | Can cause logic errors across different timezones. | scanner/report_builder.py:92 | Use timezone-aware datetimes (datetime.now(timezone.utc)). | Mitigates vulnerability |