# Team Workflow — Divide and Rule

## Branch policy

Use one branch per person:

- `person1/scanner`
- `person2/orchestrator`
- `person3/remediation`
- `person4/platform`

For each feature, create a child branch from the person's branch.

Examples:
- `person1/semgrep-adapter`
- `person2/github-pr-flow`
- `person3/ollama-adapter`
- `person4/security-workflow`

## Merge order

Phase 0 must land first:
1. contracts
2. skeleton
3. test fixtures

Then parallel work:
- Person 1 builds scanner.
- Person 2 builds orchestration using mock scanner data.
- Person 3 builds remediation using fixture findings.
- Person 4 builds CI using fixture inputs.

Integration happens only through contracts.

## Rules to prevent conflicts

1. No shared-file drive-by edits.
2. Cross-cutting changes go through a tiny dedicated PR.
3. Never rewrite another person's module from your branch.
4. Keep PRs small and single-purpose.
5. Rebase/pull the latest main before requesting merge.
6. Run the local test suite before PR.
7. Add tests with every feature.
8. Use conventional commits.
9. Never commit secrets.
10. Prefer additive changes to existing interfaces.

## PR naming

`feat(scanner): add semgrep adapter`
`feat(orchestrator): create remediation PR`
`feat(remediation): add ollama provider`
`ci(platform): add PR security workflow`

## Integration checkpoints

- Checkpoint A: all four modules import.
- Checkpoint B: scanner emits valid findings.
- Checkpoint C: mocked remediation completes.
- Checkpoint D: end-to-end local demo passes.
- Checkpoint E: live GitHub PR demo passes.

## Conflict strategy

If a contract must change:
1. open an issue;
2. agree on schema;
3. update schema first;
4. add backward-compatible fields where possible;
5. all owners update their adapters independently;
6. merge contract change before dependent implementation.
