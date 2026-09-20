'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { AppShell } from '../../../components/layout/AppShell';
import { orchestratorService } from '../../../lib/services/orchestrator';
import { PullRequest } from '../../../lib/types';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';

export default function PRDetailPage({ params }: { params: Promise<{ prId: string }> }) {
  const resolvedParams = use(params);
  const [pr, setPR] = useState<PullRequest | null>(null);

  useEffect(() => {
    orchestratorService.getPullRequestById(resolvedParams.prId).then((p) => {
      if (p) {
        setPR(p);
      }
    });
  }, [resolvedParams.prId]);

  if (!pr) {
    return (
      <AppShell>
        <div className="py-12 text-center text-gray-400 font-mono text-xs">
          Loading pull request details #{resolvedParams.prId}...
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-4 sm:space-y-5 max-w-full">
        {/* Navigation Breadcrumb */}
        <Link
          href="/pull-requests"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Pull Requests</span>
        </Link>

        {/* PR Header */}
        <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 min-w-0">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="font-bold text-gray-100">#{pr.number}</span>
              <StatusBadge status={pr.status} type="pr" />
              <span className="text-gray-400 truncate">Repo: {pr.repository}</span>
            </div>

            <h1 className="text-base sm:text-lg font-bold text-gray-100 font-sans mt-1.5">{pr.title}</h1>
            <p className="text-xs text-gray-400 font-mono mt-0.5 truncate">
              Branch: <span className="text-gray-200 font-semibold">{pr.branch}</span> →{' '}
              <span className="text-gray-300">{pr.targetBranch}</span> • Fixing finding{' '}
              <span className="text-amber-400 font-semibold">{pr.findingId}</span>
            </p>
          </div>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('GitHub PR URL: ' + pr.url);
            }}
            className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-200 border border-[#30363d] text-xs font-semibold transition-colors shrink-0 self-start md:self-auto"
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            <span>Open GitHub PR #{pr.number}</span>
          </a>
        </div>

        {/* Audit Evidence Trail */}
        <div className="bg-[#161b22] border border-[#30363d] rounded p-3.5 sm:p-4 space-y-3 min-w-0">
          <div className="flex items-center gap-2 border-b border-[#30363d] pb-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <h2 className="text-sm font-semibold text-gray-200 font-sans">Attached Security Validation Evidence</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
            <div className="bg-[#0d1117] p-2.5 rounded border border-[#30363d] min-w-0">
              <span className="text-gray-500 text-[10px] block font-medium">VALIDATION PIPELINE</span>
              <span className="text-emerald-400 font-bold block text-xs sm:text-sm mt-0.5 truncate">PASSED (9/9 CHECKS)</span>
            </div>
            <div className="bg-[#0d1117] p-2.5 rounded border border-[#30363d] min-w-0">
              <span className="text-gray-500 text-[10px] block font-medium">SECURITY RE-SCAN</span>
              <span className="text-emerald-400 font-bold block text-xs sm:text-sm mt-0.5 truncate">SEC-001 RESOLVED</span>
            </div>
            <div className="bg-[#0d1117] p-2.5 rounded border border-[#30363d] min-w-0">
              <span className="text-gray-500 text-[10px] block font-medium">HUMAN REVIEW ELIGIBILITY</span>
              <span className="text-gray-200 font-bold block text-xs sm:text-sm mt-0.5 truncate">READY FOR MERGE</span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
