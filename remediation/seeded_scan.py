"""Tiny deterministic scanner for the seeded SQL-injection fixture."""
from __future__ import annotations
import argparse
import json
import re
from pathlib import Path

def scan(path: str) -> list[dict]:
    p = Path(path)
    findings = []
    for number, line in enumerate(p.read_text(encoding="utf-8").splitlines(), 1):
        if re.search(r'["\'].*(?:SELECT|UPDATE|DELETE|INSERT).*["\']\s*\+\s*[A-Za-z_]\w*\s*\+', line, re.I):
            findings.append({
                "id": f"seeded-sql-{number}", "tool": "seeded-scanner",
                "rule": "python.sql-injection", "severity": "HIGH",
                "file": str(p).replace("\\", "/"), "line": number,
                "message": "User-controlled input is concatenated into SQL.",
                "confidence": 0.99,
            })
    return findings

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("file")
    args = parser.parse_args()
    result = scan(args.file)
    print(json.dumps(result))
    return 1 if result else 0

if __name__ == "__main__":
    raise SystemExit(main())
