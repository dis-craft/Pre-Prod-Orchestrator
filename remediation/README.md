# Person 3 — AI Remediation & Validation

## Goal

Generate minimal security fixes and prove them with deterministic gates and an isolated validation sandbox.

## Pipeline

SecurityFinding -> ContextBuilder -> deterministic fixer -> LLM fixer -> patch safety -> Docker validation -> RemediationResult.

The LLM proposes a patch. It never decides that a vulnerability is fixed.

## Providers

The architecture requested Ollama, so it is the default:

```bash
export LLM_PROVIDER=ollama
export OLLAMA_BASE_URL=http://127.0.0.1:11434
export OLLAMA_MODEL=qwen2.5-coder:7b
```

A hosted Hugging Face alternative is also implemented behind the same provider interface:

```bash
export LLM_PROVIDER=huggingface
export HF_TOKEN=...
export HF_MODEL=...
```

The HF provider uses Hugging Face's OpenAI-compatible Inference Providers router. The token is read only from the environment and is never placed in model context.

## Diff strategy

There is no need for a "differencing AI model". Rule-based fixes use Python's deterministic `difflib.unified_diff`. AI-assisted fixes return a unified diff which is parsed and restricted to the finding file. `git apply --check` is then used before applying it.

## Context and prompt security

Only the finding, vulnerable line range, enclosing symbol, imports, relevant tests, and scanner metadata are sent. Repository content is explicitly marked as untrusted data. Common credentials/private keys are redacted.

## Validation

The sandbox:
1. copies the repository;
2. checks out the exact requested SHA;
3. checks and applies the patch;
4. runs only server-side allowlisted commands;
5. optionally runs build/lint;
6. re-runs the security check;
7. rejects if the original finding remains;
8. rejects if new HIGH/CRITICAL findings appear.

The MVP Docker boundary disables networking, drops Linux capabilities, sets no-new-privileges, resource limits, a read-only root filesystem, and a temporary workspace. Production should use stronger disposable runners/VMs for hostile repositories.

## Seeded SQL fixture

`remediation/fixtures/vulnerable_sql.py` is intentionally vulnerable to SQL injection. The deterministic fixer converts string concatenation to a parameterized qmark query. `remediation/fixture_tests.py` is the sandbox acceptance test and `remediation/seeded_scan.py` is only a Person 3 fixture scanner until Person 1's real scanner contract is integrated.

## Run

```bash
python -m pytest tests/remediation -q
python -m remediation --repo /path/to/checkout --sha <exact-sha> --finding finding.json
```

Use `--no-llm` to test the deterministic path without a model.

## Model training

Do not fine-tune a model yet. First build a benchmark of vulnerable fixtures, candidate patches, tests, and security-rescan results. Later, several coding models can be compared on verified-fix rate, rejected patches, new HIGH/CRITICAL findings, test success, and latency. LoRA/QLoRA fine-tuning can then be evaluated if the dataset becomes large and consistent enough.
