# Person 3 — AI Remediation & Validation

## Goal

Generate minimal fixes and prove that they work.

## Own

- `remediation/`
- patch generation
- LLM adapter
- sandbox execution
- validation logic

## Core rule

The LLM proposes a patch. It does not decide whether the patch is correct.

## Phase 1 — deterministic fixes

Implement 2–3 safe rules first, e.g.:
- unsafe string-built SQL → parameterized query pattern where project fixture supports it;
- obvious hard-coded secret removal → environment variable reference in fixture;
- insecure function replacement with a known safe API.

## Phase 2 — local LLM

Add Ollama adapter with a strict prompt requiring:
- finding;
- relevant code context;
- desired behavior;
- minimal unified diff;
- tests to run;
- explanation.

Never send credentials, unrelated files, or the whole repository by default.

## Phase 3 — validation sandbox

For each candidate patch:
1. clone/check out exact SHA;
2. apply patch;
3. run allowlisted commands;
4. run unit/integration tests;
5. re-run security scan;
6. reject if the original finding remains;
7. reject if new HIGH/CRITICAL findings appear;
8. emit evidence.

Use Docker for the MVP. Production should use disposable isolated runners/VMs for untrusted repositories.

## Acceptance

A fix can only return `VALIDATED` when:
- patch applies cleanly;
- tests pass;
- build passes when available;
- original finding disappears;
- no policy-breaking new findings appear.
