import { SetupFormState, PlannedFile, RepositoryAnalysis, GitHubActionsPlan, VercelPlan, ValidationCheckItem } from '../types/setup';

export const DEFAULT_SETUP_FORM: SetupFormState = {
  repoUrl: 'https://github.com/dis-craft/Pre-prod-tester',
  branch: 'main',
  provider: 'GitHub',
  projectType: 'Next.js',
  deploymentProvider: 'Vercel',
  environment: 'Preview',
  githubTokenDemo: '',
  vercelTokenDemo: '',
};

export const REPO_PRESETS: Array<{ label: string; url: string; projectType: SetupFormState['projectType'] }> = [
  { label: 'dis-craft/Pre-prod-tester (Next.js)', url: 'https://github.com/dis-craft/Pre-prod-tester', projectType: 'Next.js' },
  { label: 'acme-corp/payments-api (FastAPI)', url: 'https://github.com/acme-corp/payments-api', projectType: 'FastAPI' },
  { label: 'org/security-demo (Node.js)', url: 'https://github.com/org/security-demo', projectType: 'Node.js' },
];

export function extractRepoName(url: string): string {
  try {
    const cleaned = url.replace(/\/+$/, '');
    const parts = cleaned.split('/');
    if (parts.length >= 2) {
      return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
    }
  } catch {
    // fallback
  }
  return 'example/project';
}

export function extractProjectSlug(repoName: string): string {
  const parts = repoName.split('/');
  return parts[parts.length - 1] || 'project';
}

export function generateSetupFiles(form: SetupFormState): PlannedFile[] {
  const repoName = extractRepoName(form.repoUrl);
  const projectSlug = extractProjectSlug(repoName);
  const branch = form.branch || 'main';

  const securityYml = `# .github/workflows/preprod-security.yml
# Pre-Prod Security Orchestrator — Automated PR Gate
name: Pre-Prod Security Analysis

on:
  pull_request:
    branches: [ ${branch} ]
  push:
    branches: [ ${branch} ]
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write
  security-events: write

jobs:
  security-gate:
    name: Security Scan & Remediation
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Python Runtime
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'

      - name: Install Orchestrator Engine
        run: |
          python -m pip install --upgrade pip
          pip install google-genai requests jinja2 jsonschema

      - name: Run Deterministic Vulnerability Scan
        id: scanner
        run: |
          python -m scanner \\
            --repo . \\
            --base \${{ github.base_ref || '${branch}' }} \\
            --head \${{ github.head_ref || 'HEAD' }} \\
            --output reports/ \\
            --format all \\
            --severity-threshold HIGH
        env:
          GEMINI_API_KEY: \${{ secrets.GEMINI_API_KEY }}

      - name: Evaluate Findings & Generate Candidate Remediation
        if: always()
        run: |
          if [ -f reports/findings.json ]; then
            python -m remediation.ci_entrypoint \\
              --repo . \\
              --findings reports/findings.json \\
              --output reports/remediation-report.json
          fi
        env:
          GEMINI_API_KEY: \${{ secrets.GEMINI_API_KEY }}

      - name: Upload Security Findings Artifact
        uses: actions/upload-artifact@v4
        with:
          name: security-audit-report
          path: reports/
`;

  const remediationYml = `# .github/workflows/preprod-remediation.yml
# Autonomous Remediation Dispatcher
name: Pre-Prod Auto-Remediation PR

on:
  workflow_dispatch:
    inputs:
      finding_id:
        description: 'Specific Finding ID to Remediate'
        required: false
        default: 'all'
      severity_threshold:
        description: 'Minimum Severity Threshold'
        required: true
        default: 'HIGH'

jobs:
  dispatch-remediation:
    name: Create Remediation PR
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Run Orchestrator Pipeline
        run: |
          python -m orchestrator \\
            --repo-path . \\
            --findings reports/findings.json \\
            --base-ref ${branch} \\
            --severity-threshold \${{ github.event.inputs.severity_threshold }}
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          GEMINI_API_KEY: \${{ secrets.GEMINI_API_KEY }}
`;

  const preprodConfigYml = `# .preprod/config.yml
# Pre-Prod-Orchestrator Repository Configuration
version: 1

target:
  repository: "${repoName}"
  default_branch: "${branch}"
  project_type: "${form.projectType.toLowerCase()}"

policy:
  enforce_human_approval: true
  block_on_critical: true
  min_confidence_score: 85
  severity_threshold: "HIGH"
  context_window_lines: 30

rules:
  enabled_categories:
    - "Injection"
    - "Broken Access Control"
    - "Cryptographic Failures"
    - "Security Misconfiguration"
    - "Sensitive Data Exposure"

sandbox:
  isolation_level: "container"
  allow_network_during_scan: false
  timeout_seconds: 120

reporting:
  publish_dashboard_events: true
  formats:
    - "json"
    - "markdown"
    - "html"
`;

  const vercelJsonOriginal = `{
  "framework": "${form.projectType === 'Next.js' ? 'nextjs' : 'other'}"
}`;

  const vercelJsonUpdated = `{
  "version": 2,
  "framework": "${form.projectType === 'Next.js' ? 'nextjs' : 'other'}",
  "buildCommand": "${form.projectType === 'Next.js' ? 'npm run build' : 'npm run build'}",
  "installCommand": "npm install",
  "outputDirectory": "${form.projectType === 'Next.js' ? '.next' : 'dist'}",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        }
      ]
    }
  ],
  "github": {
    "silent": false,
    "autoJobCancelation": true
  }
}`;

  const readmeOriginal = `# ${projectSlug}

Application repository for ${projectSlug}.
`;

  const readmeUpdated = `# ${projectSlug}

[![Pre-Prod Security Gate](https://img.shields.io/badge/Pre--Prod-Protected-emerald?logo=shield)](https://github.com/dis-craft/Pre-Prod-Orchestrator)
[![Security Policy](https://img.shields.io/badge/Security_Policy-Enforced-blue)](.preprod/config.yml)

Application repository for ${projectSlug}.

## Security Verification

This repository is continuously monitored by [Pre-Prod-Orchestrator](https://github.com/dis-craft/Pre-Prod-Orchestrator):
- Pull requests are automatically scanned for CWE/OWASP vulnerabilities before merge.
- AI-assisted remediation patches are submitted as isolated review branches with human sign-off.
- Verified test reports are attached to each remediation pull request.
`;

  return [
    {
      id: 'wf-security',
      path: '.github/workflows/preprod-security.yml',
      action: 'CREATE',
      purpose: 'Runs the Pre-Prod-Orchestrator security scanning workflow on pull requests and pushes.',
      language: 'yaml',
      content: securityYml,
    },
    {
      id: 'wf-remediation',
      path: '.github/workflows/preprod-remediation.yml',
      action: 'CREATE',
      purpose: 'Dispatches autonomous AI remediation worker to create PR candidate branches.',
      language: 'yaml',
      content: remediationYml,
    },
    {
      id: 'cfg-preprod',
      path: '.preprod/config.yml',
      action: 'CREATE',
      purpose: 'Defines Pre-Prod Orchestrator policy thresholds, scan categories, and sandbox constraints.',
      language: 'yaml',
      content: preprodConfigYml,
    },
    {
      id: 'cfg-vercel',
      path: 'vercel.json',
      action: 'UPDATE',
      purpose: 'Adds secure response headers, preview deployment controls, and build routing.',
      language: 'json',
      content: vercelJsonUpdated,
      originalContent: vercelJsonOriginal,
    },
    {
      id: 'doc-readme',
      path: 'README.md',
      action: 'UPDATE',
      purpose: 'Documents Pre-Prod security enforcement and attaches verified protection badges.',
      language: 'markdown',
      content: readmeUpdated,
      originalContent: readmeOriginal,
    },
  ];
}

export function generateAnalysis(form: SetupFormState): RepositoryAnalysis {
  const repoName = extractRepoName(form.repoUrl);
  return {
    repositoryName: repoName,
    branch: form.branch || 'main',
    detectedStack: {
      framework: form.projectType,
      language: form.projectType.includes('Python') ? 'Python 3.11+' : 'TypeScript 5.x',
      styling: form.projectType === 'Next.js' ? 'Tailwind CSS v4' : 'CSS Modules / Vanilla',
      packageManager: form.projectType.includes('Python') ? 'pip / venv' : 'npm / pnpm',
    },
    existingWorkflowsCount: 3,
    configurationChangesCount: 5,
    checks: [
      { id: '1', label: 'Repository URL validated', detail: `Connected to ${form.provider} repository endpoints`, status: 'COMPLETED' },
      { id: '2', label: 'Branch detected', detail: `Targeting default baseline ref: '${form.branch || 'main'}'`, status: 'COMPLETED' },
      { id: '3', label: 'Project type detected', detail: `Recognized runtime stack: ${form.projectType}`, status: 'COMPLETED' },
      { id: '4', label: 'Deployment configuration detected', detail: `Targeting ${form.deploymentProvider} (${form.environment})`, status: 'COMPLETED' },
      { id: '5', label: 'Existing GitHub workflows inspected', detail: '3 existing workflows found in .github/workflows/', status: 'COMPLETED' },
      { id: '6', label: 'Configuration requirements calculated', detail: '3 files to create, 2 files to update', status: 'COMPLETED' },
    ],
  };
}

export function generateGitHubPlan(form: SetupFormState): GitHubActionsPlan {
  const files = generateSetupFiles(form);
  const secWf = files.find((f) => f.path.includes('preprod-security.yml'))?.content || '';

  return {
    status: 'SIMULATED',
    workflowName: 'preprod-security.yml',
    workflowPath: '.github/workflows/preprod-security.yml',
    triggers: ['pull_request', 'push', 'workflow_dispatch'],
    isSimulated: true,
    yamlContent: secWf,
    stages: [
      { id: 's1', name: 'GitHub Event', description: 'PR opened or synchronized', status: 'READY' },
      { id: 's2', name: 'Pre-Prod Tester', description: 'Checks out branch & sets up Python environment', status: 'CONFIGURED' },
      { id: 's3', name: 'Security Scan', description: 'Runs deterministic AST & regex vulnerability rules', status: 'CONFIGURED' },
      { id: 's4', name: 'Finding Processing', description: 'Normalizes and filters findings by severity threshold', status: 'CONFIGURED' },
      { id: 's5', name: 'Remediation', description: 'Synthesizes minimal line-level edit proposals via LLM', status: 'SIMULATED' },
      { id: 's6', name: 'Validation', description: 'Re-scans isolated workspace & opens human review PR', status: 'SIMULATED' },
    ],
  };
}

export function generateVercelPlan(form: SetupFormState): VercelPlan {
  const repoName = extractRepoName(form.repoUrl);
  const projectSlug = extractProjectSlug(repoName);
  const files = generateSetupFiles(form);
  const vercelFile = files.find((f) => f.path === 'vercel.json')?.content || '{}';

  return {
    status: 'SIMULATED',
    projectName: projectSlug,
    environment: form.environment,
    buildCommand: form.projectType === 'Next.js' ? 'npm run build' : 'npm run build',
    installCommand: 'npm install',
    outputDirectory: form.projectType === 'Next.js' ? '.next' : 'dist',
    envVariables: [
      'NEXT_PUBLIC_SCAN_DATA_URL (Pre-Prod Tester Published Scan)',
      'ORCHESTRATOR_API_KEY (Pre-Prod Bridge Token)',
      'NODE_ENV (Production / Preview)',
    ],
    jsonContent: vercelFile,
    isSimulated: true,
  };
}

export const VALIDATION_CHECKS_LIST: ValidationCheckItem[] = [
  { id: 'vc-1', title: 'Repository configuration', description: 'Repository URL, provider format, and base branch validated', status: 'PASSED' },
  { id: 'vc-2', title: 'YAML syntax', description: 'Parsed .github/workflows/*.yml files for valid GitHub Actions schema', status: 'PASSED' },
  { id: 'vc-3', title: 'Workflow structure', description: 'Verified step permissions, environment dependencies, and trigger filters', status: 'PASSED' },
  { id: 'vc-4', title: 'Pre-Prod configuration', description: 'Validated .preprod/config.yml against schema and security policy bounds', status: 'PASSED' },
  { id: 'vc-5', title: 'Vercel configuration', description: 'Checked vercel.json headers, build parameters, and route masks', status: 'PASSED' },
  { id: 'vc-6', title: 'Required paths', description: 'Ensured output directory reports/ and .github/ directory exist in plan', status: 'PASSED' },
  { id: 'vc-7', title: 'Environment configuration', description: 'Confirmed secret references (GEMINI_API_KEY, GITHUB_TOKEN) mapped correctly', status: 'PASSED' },
];
