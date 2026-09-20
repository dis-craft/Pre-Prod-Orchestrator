'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { orchestratorService } from '../../lib/services/orchestrator';
import { PullRequest } from '../../lib/types';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ArrowRight } from 'lucide-react';

export default function PullRequestsPage() {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);

  useEffect(() => {
    orchestratorService.getPullRequests().then(setPullRequests);
    return orchestratorService.subscribe(() => {
      orchestratorService.getPullRequests().then(setPullRequests);
    });
  }, []);

  return (
    <AppShell>
      <div className="space-y-4 max-w-full">
        {/* Header Title */}
        <div className="border-b border-[#30363d] pb-3">
          <h1 className="text-lg font-bold tracking-tight text-gray-100">Remediation Pull Requests</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Automated security fix PRs generated after full validation pipeline verification.
          </p>
        </div>

        {/* PR Table List */}
        <div className="bg-[#161b22] border border-[#30363d] rounded overflow-hidden max-w-full">
          <div className="overflow-x-auto max-w-full">
            <table className="w-full text-left text-xs font-mono min-w-max">
              <thead className="bg-[#0d1117] border-b border-[#30363d] text-gray-400 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 px-3.5">PR Number</th>
                  <th className="py-2.5 px-3.5">Title / Branch</th>
                  <th className="py-2.5 px-3.5">Repository</th>
                  <th className="py-2.5 px-3.5">Original PR</th>
                  <th className="py-2.5 px-3.5">Validation</th>
                  <th className="py-2.5 px-3.5">Status</th>
                  <th className="py-2.5 px-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30363d]/60 text-gray-300">
                {pullRequests.map((pr) => (
                  <tr key={pr.id} className="hover:bg-[#21262d]/50 transition-colors">
                    <td className="py-2.5 px-3.5 font-semibold text-gray-200 whitespace-nowrap">
                      #{pr.number}
                    </td>
                    <td className="py-2.5 px-3.5 max-w-xs">
                      <Link href={`/pull-requests/${pr.id}`} className="font-sans font-semibold text-gray-200 hover:text-gray-100 hover:underline block truncate">
                        {pr.title}
                      </Link>
                      <span className="text-[11px] text-gray-400 block font-mono mt-0.5 truncate">{pr.branch}</span>
                    </td>
                    <td className="py-2.5 px-3.5 whitespace-nowrap text-gray-200 font-semibold">
                      {pr.repository}
                    </td>
                    <td className="py-2.5 px-3.5 whitespace-nowrap text-gray-400">
                      {pr.originalPR}
                    </td>
                    <td className="py-2.5 px-3.5 whitespace-nowrap">
                      <StatusBadge status={pr.validationStatus} type="step" />
                    </td>
                    <td className="py-2.5 px-3.5 whitespace-nowrap">
                      <StatusBadge status={pr.status} type="pr" />
                    </td>
                    <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                      <Link
                        href={`/pull-requests/${pr.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-200 border border-[#30363d] text-[11px] font-sans font-semibold transition-colors"
                      >
                        <span>Inspect PR</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
