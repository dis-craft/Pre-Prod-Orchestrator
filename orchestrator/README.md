# Person 2 — Orchestration & GitHub Integration

## Goal

Turn PR events and scanner results into a controlled remediation workflow.

## Own

- `orchestrator/`
- GitHub API client wrappers
- workflow state machine tests

## Do not edit

- `scanner/`
- `remediation/`
- `.github/workflows/`

Consume scanner output only through `contracts/finding.schema.json`.

## Phase 1

Implement a local event runner first:

```text
event JSON → changed files → scanner call → findings → decision
```

## Phase 2

Add GitHub integration:

- identify repository and PR;
- identify base/head SHA;
- create remediation branch from the PR head;
- create commit;
- create remediation PR;
- add evidence summary as PR body/comment.

Branch format:

```
security-remediation/pr-<number>/<finding-id>
```

## State machine

```
RECEIVED
→ SCANNING
→ FINDINGS
→ REMEDIATING
→ VALIDATING
→ PR_CREATED
→ AWAITING_REVIEW
→ RESOLVED
```

Failure states:

```
SCAN_FAILED
FIX_FAILED
VALIDATION_FAILED
GITHUB_FAILED
```

## Testing

Use fake GitHub API responses. Do not require live credentials for unit tests.

Acceptance:
- duplicate events do not create duplicate remediation PRs;
- branch names are deterministic;
- an invalid finding is rejected before remediation;
- retries are idempotent.
