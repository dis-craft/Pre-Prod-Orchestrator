'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { orchestratorService } from '../../lib/services/orchestrator';
import { Repository } from '../../lib/types';
import { GitBranch, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

export default function RepositoriesPage() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    orchestratorService.getRepositories().then(setRepositories);
  }, []);

  return (
    <AppShell>
      <div className="space-y-4 max-w-full">
        {/* Header Title */}
        <div className="border-b border-[#30363d] pb-3">
          <h1 className="text-lg font-bold tracking-tight text-gray-100">Monitored Repositories</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            GitHub repositories registered under Pre-Prod Orchestrator security policies.
          </p>
        </div>

        {/* Repository Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {repositories.map((repo) => (
            <div
              key={repo.id}
              className="bg-[#161b22] border border-[#30363d] rounded p-3.5 sm:p-4 flex flex-col justify-between hover:border-gray-500 transition-colors shadow-sm min-w-0"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <GitBranch className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="font-mono text-xs text-gray-400 truncate">{repo.owner}/</span>
                    <span className="font-semibold text-gray-100 text-sm truncate">{repo.name}</span>
                  </div>
                  <span
                    className={clsx(
                      'px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase border shrink-0',
                      repo.securityStatus === 'COMPLIANT' && 'bg-emerald-500/10 text-emerald-400 border-emerald-800/40',
                      repo.securityStatus === 'NEEDS_ATTENTION' && 'bg-amber-500/10 text-amber-400 border-amber-800/40',
                      repo.securityStatus === 'CRITICAL_RISK' && 'bg-red-500/10 text-red-400 border-red-800/40'
                    )}
                  >
                    {repo.securityStatus.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="bg-[#0d1117] p-1.5 rounded border border-[#30363d]">
                    <span className="text-gray-500 text-[9px] block">CRITICAL</span>
                    <span className="text-xs font-semibold text-red-400">{repo.criticalCount}</span>
                  </div>
                  <div className="bg-[#0d1117] p-1.5 rounded border border-[#30363d]">
                    <span className="text-gray-500 text-[9px] block">HIGH</span>
                    <span className="text-xs font-semibold text-amber-400">{repo.highCount}</span>
                  </div>
                  <div className="bg-[#0d1117] p-1.5 rounded border border-[#30363d]">
                    <span className="text-gray-500 text-[9px] block">MEDIUM</span>
                    <span className="text-xs font-semibold text-yellow-400">{repo.mediumCount}</span>
                  </div>
                </div>

                <div className="mt-3 text-xs font-mono text-gray-400 space-y-1">
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-500">Default Branch:</span>
                    <span className="text-gray-300 truncate">{repo.defaultBranch}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-500">Last SAST Scan:</span>
                    <span className="text-gray-300 truncate">{repo.lastScanAt}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-500">Policy:</span>
                    <span className="text-gray-200 font-semibold truncate">{repo.policy}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-[#30363d] flex justify-end">
                <Link
                  href={`/repositories/${repo.name}`}
                  className="flex items-center gap-1 text-xs text-gray-300 hover:text-gray-100 font-medium"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
