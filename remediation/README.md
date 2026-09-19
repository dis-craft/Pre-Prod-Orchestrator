# Person 3 — AI Remediation & Validation

## Goal
Generate minimal security fixes and prove them with deterministic gates and an isolated validation sandbox.

## Pipeline
SecurityFinding -> ContextBuilder -> deterministic fixer -> LLM fixer -> patch safety -> Docker validation -> RemediationResult.

The LLM proposes a patch. It never decides that a vulnerability is fixed.

## What you should see

The CLI now emits JSONL progress events to stderr and the final RemediationResult JSON to stdout. This makes the pipeline observable without breaking machine-readable output.

A successful run looks conceptually like:

    {"event":"remediation","stage":"finding","status":"loaded",...}
    {"event":"remediation","stage":"proposal","status":"generated",...}
    {"event":"remediation","stage":"patch_safety","status":"passed",...}
    {"event":"remediation","stage":"validation","status":"started",...}
    {"event":"remediation","stage":"validation","status":"completed",...}
    {
      "finding_id": "...",
      "status": "VALIDATED",
      "patch": "...",
      "tests": [...],
      "security_rescan": {...},
      "evidence": {...}
    }

The trace shows which stage ran. The final status is only VALIDATED when the sandbox evidence satisfies the validation gates.

## One-command seeded demo

From a checkout of the person3/remediation branch:

    python -m remediation --demo

The demo automatically:
1. scans the intentionally vulnerable SQL fixture;
2. creates the SecurityFinding in memory;
3. records the current Git SHA;
4. generates the deterministic parameterized-query patch;
5. runs patch safety checks;
6. creates the disposable Docker validation environment;
7. applies the patch at the exact SHA;
8. runs the acceptance test;
9. re-runs the seeded security scanner;
10. prints the final RemediationResult.

Docker is required because validation deliberately happens in a disposable container.

To test without an LLM:

    python -m remediation --demo --no-llm

To suppress progress events and print only the final contract:

    python -m remediation --demo --no-llm --quiet

## Real finding input

The normal interface remains:

    python -m remediation --repo /path/to/checkout --sha <exact-sha> --finding finding.json

The finding file must conform to the SecurityFinding model. The final output conforms to contracts/remediation.schema.json.

## Providers

Ollama is the default local provider:

    export LLM_PROVIDER=ollama
    export OLLAMA_BASE_URL=http://127.0.0.1:11434
    export OLLAMA_MODEL=qwen2.5-coder:7b

A hosted Hugging Face alternative uses the same provider interface:

    export LLM_PROVIDER=huggingface
    export HF_TOKEN=...
    export HF_MODEL=...

The HF provider uses Hugging Face's OpenAI-compatible Inference Providers router. The token is read only from the environment and is never placed in model context.

The LLM is optional for the seeded demo because the first fixture has an audited deterministic fix. This lets the entire validation architecture be demonstrated before an API key is configured.

To explicitly exercise the configured LLM instead of deterministic rules:

    python -m remediation --demo --force-llm

If no provider is configured, this command exits with a structured REJECTED result instead of silently pretending that an AI call happened.

## Diff strategy

There is no need for a differencing AI model. Rule-based fixes use Python's deterministic difflib.unified_diff. AI-assisted fixes return a unified diff which is parsed and restricted to the finding file. git apply --check is then used before applying it.

## Context and prompt security

Only the finding, vulnerable line range, enclosing symbol, imports, relevant tests, and scanner metadata are sent. Repository content is explicitly marked as untrusted data. Common credentials/private keys are redacted.

## Validation

The sandbox:
1. copies the repository;
2. checks out the exact requested SHA;
3. checks and applies the patch;
4. runs only allowlisted commands;
5. optionally runs build/lint;
6. re-runs the security check;
7. rejects if the original finding remains;
8. rejects if new HIGH/CRITICAL findings appear.

The MVP Docker boundary disables networking, drops Linux capabilities, sets no-new-privileges, resource limits, a read-only root filesystem, and a temporary workspace. Production should use stronger disposable runners/VMs for hostile repositories.

## Seeded SQL fixture

remediation/fixtures/vulnerable_sql.py is intentionally vulnerable to SQL injection. The deterministic fixer converts string concatenation to a parameterized qmark query. remediation/fixture_tests.py is the sandbox acceptance test and remediation/seeded_scan.py is only a Person 3 fixture scanner until Person 1's real scanner contract is integrated.

## Tests

    python -m pytest tests/remediation -q

## Model training

Do not fine-tune a model yet. First build a benchmark of vulnerable fixtures, candidate patches, tests, and security-rescan results. Later, compare coding models on verified-fix rate, rejected patches, new HIGH/CRITICAL findings, test success, and latency. LoRA/QLoRA can be evaluated if the dataset becomes large and consistent enough.