'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { AppShell } from '../../../components/layout/AppShell';
import { orchestratorService } from '../../../lib/services/orchestrator';
import { Repository, Finding } from '../../../lib/types';
import { SeverityBadge } from '../../../components/ui/SeverityBadge';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { GitBranch, SearchCode, ArrowLeft } from 'lucide-react';

export default function RepositoryDetailPage({ params }: { params: Promise<{ repo: string }> }) {
  const resolvedParams = use(params);
  const [repo, setRepo] = useState<Repository | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);

  useEffect(() => {
    orchestratorService.getRepositoryByName(resolvedParams.repo).then((r) => {
      if (r) setRepo(r);
    });
    orchestratorService.getFindings().then((list) => {
      setFindings(list.filter((f) => f.repository.toLowerCase() === resolvedParams.repo.toLowerCase()));
    });
  }, [resolvedParams.repo]);

  if (!repo) {
    return (
      <AppShell>
        <div className="py-12 text-center text-gray-400 font-mono text-xs">
          Loading repository parameters for {resolvedParams.repo}...
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-4 max-w-full">
        {/* Navigation Breadcrumb */}
        <Link
          href="/repositories"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Repositories</span>
        </Link>

        {/* Repository Header Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 min-w-0">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <GitBranch className="w-4 h-4 text-gray-400 shrink-0" />
              <h1 className="text-lg font-bold text-gray-100 truncate">{repo.owner}/{repo.name}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#21262d] border border-[#30363d] text-gray-300 shrink-0">
                {repo.policy}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono mt-1 leading-relaxed">
              Default branch: <span className="text-gray-200">{repo.defaultBranch}</span> • Last scan: <span className="text-gray-200">{repo.lastScanAt}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-left md:text-right font-mono">
              <span className="text-[10px] text-gray-500 block font-medium">TOTAL OPEN FINDINGS</span>
              <span className="text-xl font-bold text-amber-400">{repo.openFindingsCount}</span>
            </div>
          </div>
        </div>

        {/* Repository Specific Findings List */}
        <div className="bg-[#161b22] border border-[#30363d] rounded p-3.5 sm:p-4 min-w-0">
          <div className="flex items-center gap-2 border-b border-[#30363d] pb-2.5 mb-3 min-w-0">
            <SearchCode className="w-4 h-4 text-gray-400 shrink-0" />
            <h2 className="text-sm font-semibold text-gray-200 truncate">Security Findings for {repo.name}</h2>
          </div>

          {findings.length > 0 ? (
            <div className="space-y-2">
              {findings.map((f) => (
                <Link
                  key={f.id}
                  href={`/findings/${f.id}`}
                  className="block p-3 rounded bg-[#0d1117] border border-[#30363d] hover:border-gray-500 transition-colors group min-w-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-gray-200 group-hover:underline">{f.id}</span>
                        <SeverityBadge severity={f.severity} />
                        <span className="text-xs text-gray-400 font-mono">{f.cwe}</span>
                      </div>
                      <h3 className="text-xs font-semibold text-gray-200 font-sans mt-1">{f.title}</h3>
                      <p className="text-xs text-gray-400 font-mono mt-0.5 truncate">{f.file}:{f.startLine}</p>
                    </div>
                    <div className="shrink-0 self-start sm:self-auto">
                      <StatusBadge status={f.status} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-gray-500 font-mono border border-dashed border-[#30363d] rounded">
              No active security findings detected in this repository under current policies.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
