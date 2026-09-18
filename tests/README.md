# Testing Strategy

## Test layers

### Unit
Each owner tests only their module.

```bash
pytest tests/unit -q
```

### Contract
Validate JSON against schemas.

```bash
pytest tests/contract -q
```

### Integration
Use local fixtures and mocks.

```bash
pytest tests/integration -q
```

### End-to-end
Seed one intentionally vulnerable sample repository and run:

```
PR fixture
→ scan
→ finding
→ remediation
→ validation
→ remediation PR payload
→ final report
```

## Test rules

- Tests must be deterministic.
- No network calls in unit tests.
- No real GitHub mutation in CI unit tests.
- No real LLM calls in normal unit tests.
- LLM tests use recorded fixtures.
- Sandbox tests use a dedicated container image.

## Required demo cases

1. HIGH vulnerability → successfully fixed.
2. AI-generated bad patch → validation rejects.
3. human-only finding → alert only.
4. duplicate webhook → no duplicate PR.
