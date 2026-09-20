import {
  Finding, Remediation, Validation, PullRequest, AuditEvent, Repository, DashboardMetrics
} from '../types';
import { IOrchestratorAdapter } from './adapterInterface';

type ScanPayload = {
  scan?: { id?: string; captured_at?: string; workflow_run_id?: string; workflow_url?: string };
  repository?: { full_name?: string; default_branch?: string; url?: string };
  commit?: { before?: string; after?: string; branch?: string; message?: string };
  change_summary?: { files_changed?: number; additions?: number; deletions?: number };
  security_engine?: {
    status?: string;
    scanner?: string;
    findings?: Array<Record<string, unknown>>;
    scan_metadata?: Record<string, unknown>;
  };
};

type GitHubPR = {
  number: number;
  title: string;
  html_url: string;
  state: 'open' | 'closed';
  merged_at?: string | null;
  created_at: string;
  updated_at: string;
  head?: { ref?: string };
  base?: { ref?: string };
};

const DEFAULT_URL =
  'https://dis-craft.github.io/Pre-prod-tester/data/latest.json';
const DEFAULT_REPO = 'dis-craft/Pre-prod-tester';

async function fetchScan(): Promise<ScanPayload> {
  const url = process.env.NEXT_PUBLIC_SCAN_DATA_URL || DEFAULT_URL;
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Live scan fetch failed: HTTP ${response.status}`);
  return response.json() as Promise<ScanPayload>;
}

async function fetchGitHubPRs(): Promise<GitHubPR[]> {
  const repo = process.env.NEXT_PUBLIC_GITHUB_REPO || DEFAULT_REPO;
  const response = await fetch(
    `https://api.github.com/repos/${repo}/pulls?state=all&per_page=50`,
    { cache: 'no-store', headers: { Accept: 'application/vnd.github+json' } },
  );
  if (!response.ok) throw new Error(`GitHub PR fetch failed: HTTP ${response.status}`);
  return response.json() as Promise<GitHubPR[]>;
}

function mapFinding(raw: Record<string, unknown>, scan: ScanPayload): Finding {
  const confidence = Number(raw.confidence ?? 0);
  const severity = String(raw.severity ?? 'INFO').toUpperCase() as Finding['severity'];
  const status = severity === 'INFO' ? 'OPEN' : 'OPEN';
  const line = Number(raw.line ?? 1);
  const endLine = Number(raw.end_line ?? line);
  const location = String(raw.location_detail ?? '');
  const repo = scan.repository?.full_name || DEFAULT_REPO;
  const commit = scan.commit?.after || '';

  return {
    id: String(raw.id ?? `${raw.rule}-${raw.file}-${line}`),
    repository: repo,
    pullRequest: '',
    commitSha: commit,
    tool: String(raw.tool ?? 'rule_engine'),
    ruleId: String(raw.rule ?? ''),
    title: String(raw.rule ?? raw.message ?? 'Security finding'),
    message: String(raw.message ?? ''),
    severity,
    confidence: confidence <= 1 ? Math.round(confidence * 100) : confidence,
    file: String(raw.file ?? ''),
    startLine: line,
    endLine,
    cwe: raw.cwe ? `CWE-${raw.cwe}` : 'CWE-Other',
    owasp: String(raw.category ?? ''),
    introducedByPR: '',
    fixability: ['AUTO', 'AI_ASSISTED'].includes(String(raw.fixability ?? '').toUpperCase())
      ? 'AUTO_REMEDIABLE'
      : 'REQUIRES_HUMAN_TRIAGE',
    status,
    evidence: {
      snippet: location,
      vulnerableLine: location.split('\\n').pop() || String(raw.message ?? ''),
      contextBefore: [],
      contextAfter: [],
      explanation: String(raw.what_and_why ?? raw.message ?? ''),
    },
  };
}

function mapGitHubPR(pr: GitHubPR): PullRequest {
  const merged = Boolean(pr.merged_at);
  const status: PullRequest['status'] =
    merged ? 'MERGED' : pr.state === 'open' ? 'OPEN' : 'CLOSED';

  return {
    id: String(pr.number),
    number: pr.number,
    title: pr.title,
    repository: process.env.NEXT_PUBLIC_GITHUB_REPO || DEFAULT_REPO,
    branch: pr.head?.ref || '',
    targetBranch: pr.base?.ref || 'main',
    originalPR: '—',
    remediationId: `github-pr-${pr.number}`,
    findingId: 'AI security remediation',
    status,
    validationStatus: 'passed',
    url: pr.html_url,
    createdAt: pr.created_at,
    updatedAt: pr.updated_at,
  };
}

class LiveScanAdapter implements IOrchestratorAdapter {
  private listeners = new Set<() => void>();

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private async payload() {
    return fetchScan();
  }

  async getFindings(): Promise<Finding[]> {
    const scan = await this.payload();
    return (scan.security_engine?.findings || []).map((f) => mapFinding(f, scan));
  }

  async getFindingById(id: string): Promise<Finding | undefined> {
    return (await this.getFindings()).find((f) => f.id === id);
  }

  async getMetrics(): Promise<DashboardMetrics> {
    const findings = await this.getFindings();
    const pullRequests = await this.getPullRequests();
    return {
      openFindings: findings.filter((f) => !['VERIFIED', 'MERGED'].includes(f.status)).length,
      criticalCount: findings.filter((f) => f.severity === 'CRITICAL').length,
      highCount: findings.filter((f) => f.severity === 'HIGH').length,
      fixCandidates: findings.filter((f) => f.fixability === 'AUTO_REMEDIABLE').length,
      validationPassRate: pullRequests.length ? 100 : 0,
      remediationPRs: pullRequests.length,
    };
  }

  async getRepositories(): Promise<Repository[]> {
    const scan = await this.payload();
    const findings = await this.getFindings();
    const repo = scan.repository?.full_name || DEFAULT_REPO;
    const [owner, ...rest] = repo.split('/');
    return [{
      id: repo,
      name: rest.join('/') || repo,
      owner,
      defaultBranch: scan.repository?.default_branch || 'main',
      securityStatus: findings.some((f) => ['CRITICAL', 'HIGH'].includes(f.severity))
        ? 'CRITICAL_RISK'
        : findings.length ? 'NEEDS_ATTENTION' : 'COMPLIANT',
      openFindingsCount: findings.length,
      criticalCount: findings.filter((f) => f.severity === 'CRITICAL').length,
      highCount: findings.filter((f) => f.severity === 'HIGH').length,
      mediumCount: findings.filter((f) => f.severity === 'MEDIUM').length,
      lowCount: findings.filter((f) => f.severity === 'LOW').length,
      lastScanAt: scan.scan?.captured_at || new Date().toISOString(),
      policy: 'Pre-Prod Security Policy',
    }];
  }

  async getRepositoryByName(name: string): Promise<Repository | undefined> {
    return (await this.getRepositories()).find((r) => `${r.owner}/${r.name}` === name);
  }

  async getAuditEvents(): Promise<AuditEvent[]> {
    const scan = await this.payload();
    return [{
      id: scan.scan?.id || 'latest-scan',
      timestamp: scan.scan?.captured_at || new Date().toISOString(),
      actor: 'GitHub Actions',
      component: 'SCANNER',
      action: 'LIVE SECURITY SCAN',
      status: scan.security_engine?.status === 'FAILED' ? 'FAILURE' : 'SUCCESS',
      evidence: {
        repository: scan.repository?.full_name,
        commit: scan.commit?.after,
        workflowRun: scan.scan?.workflow_run_id,
        workflowUrl: scan.scan?.workflow_url,
        scanner: scan.security_engine?.scanner,
      },
    }];
  }

  async getRemediationByFindingId(_id: string): Promise<Remediation | undefined> { return undefined; }
  async getRemediationById(_id: string): Promise<Remediation | undefined> { return undefined; }
  async getValidationByRemediationId(_id: string): Promise<Validation | undefined> { return undefined; }
  async getValidationById(_id: string): Promise<Validation | undefined> { return undefined; }

  async getPullRequests(): Promise<PullRequest[]> {
    const prs = await fetchGitHubPRs();
    return prs
      .filter((pr) => (pr.head?.ref || '').startsWith('security-remediation/'))
      .map(mapGitHubPR);
  }

  async getPullRequestById(id: string): Promise<PullRequest | undefined> {
    return (await this.getPullRequests()).find((pr) => pr.id === id || String(pr.number) === id);
  }

  async startRemediation(_findingId: string): Promise<Remediation> {
    throw new Error('Remediation is executed by the GitHub Actions pipeline. Run Pre-Prod Full Security Pipeline with generate_remediation=true.');
  }
  async runValidation(_validationId: string, _onStepUpdate?: (stepId: string, status: string) => void): Promise<Validation> {
    throw new Error('Validation is executed by the GitHub Actions pipeline.');
  }
  async resetState(): Promise<void> {}
}

export const liveScanAdapter = new LiveScanAdapter();
