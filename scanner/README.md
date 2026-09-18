# Person 1 — Detection & Scanning

## Goal

Build the deterministic security detection layer.

## Own

- `scanner/`
- `contracts/finding.schema.json` (contract changes must be coordinated)
- scanner fixtures under `tests/fixtures/scanner/`

## Do not edit

- `orchestrator/`
- `remediation/`
- `.github/workflows/`
- `dashboard/`

## Phase 1

Implement:

1. Semgrep adapter.
2. Gitleaks adapter.
3. OSV-Scanner adapter.
4. Normalizer producing `SecurityFinding`.
5. Deduplication using a stable fingerprint:
   `tool + rule + file + line + normalized message`.
6. CLI:
   `python -m scanner --path <repo> --output findings.json`.

## Output example

```json
{
  "id": "semgrep:sql-injection:src/db.py:42",
  "tool": "semgrep",
  "rule": "python.lang.security.sql-injection",
  "severity": "HIGH",
  "file": "src/db.py",
  "line": 42,
  "message": "Potential SQL injection",
  "confidence": 0.98,
  "fixability": "AI_ASSISTED"
}
```

## Testing

Create deliberately vulnerable fixtures and expected normalized JSON.

Minimum acceptance:
- same input produces deterministic output;
- malformed scanner output fails loudly;
- no scanner can write outside its output directory;
- one scanner failing does not silently erase results from other scanners.

## Definition of done

`scanner/README.md` examples run on a clean clone and produce valid schema-conformant findings.
