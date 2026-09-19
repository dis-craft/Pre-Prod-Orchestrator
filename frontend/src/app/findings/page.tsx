'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { orchestratorService } from '../../lib/services/orchestrator';
import { Finding } from '../../lib/types';
import { SeverityBadge } from '../../components/ui/SeverityBadge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Search, ArrowRight } from 'lucide-react';

export default function FindingsPage() {
  const [findings, setFindings] = useState<Finding[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  useEffect(() => {
    orchestratorService.getFindings().then(setFindings);
    return orchestratorService.subscribe(() => {
      orchestratorService.getFindings().then(setFindings);
    });
  }, []);

  const filteredFindings = useMemo(() => {
    return findings.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.file.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cwe.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ruleId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSeverity = selectedSeverity === 'ALL' || item.severity === selectedSeverity;
      const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;

      return matchesSearch && matchesSeverity && matchesStatus;
    });
  }, [findings, searchQuery, selectedSeverity, selectedStatus]);

  return (
    <AppShell>
      <div className="space-y-4 max-w-full">
        {/* Header & Filter Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#30363d] pb-3">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-100">Security Findings</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              SAST vulnerability findings detected by security scanners.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter findings..."
                className="bg-[#0d1117] border border-[#30363d] rounded pl-8 pr-3 py-1 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-500 w-full sm:w-44 font-mono"
              />
            </div>

            {/* Severity Filter Dropdown */}
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-[#0d1117] border border-[#30363d] rounded px-2.5 py-1 text-xs text-gray-300 font-mono focus:outline-none focus:border-gray-500 flex-1 sm:flex-initial"
            >
              <option value="ALL">All Severities</option>
              <option value="CRITICAL">CRITICAL</option>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>

            {/* Status Filter Dropdown */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-[#0d1117] border border-[#30363d] rounded px-2.5 py-1 text-xs text-gray-300 font-mono focus:outline-none focus:border-gray-500 flex-1 sm:flex-initial"
            >
              <option value="ALL">All Statuses</option>
              <option value="OPEN">OPEN</option>
              <option value="REMEDIATING">REMEDIATING</option>
              <option value="VERIFIED">VERIFIED</option>
              <option value="HUMAN_REVIEW">HUMAN_REVIEW</option>
            </select>
          </div>
        </div>

        {/* Findings Data Table Container */}
        <div className="bg-[#161b22] border border-[#30363d] rounded overflow-hidden max-w-full">
          <div className="overflow-x-auto max-w-full">
            <table className="w-full text-left text-xs font-mono min-w-max">
              <thead className="bg-[#0d1117] border-b border-[#30363d] text-gray-400 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 px-3.5">Severity</th>
                  <th className="py-2.5 px-3.5">Finding / CWE</th>
                  <th className="py-2.5 px-3.5">Repository & File</th>
                  <th className="py-2.5 px-3.5">Scanner</th>
                  <th className="py-2.5 px-3.5">Confidence</th>
                  <th className="py-2.5 px-3.5">Status</th>
                  <th className="py-2.5 px-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30363d]/60 text-gray-300">
                {filteredFindings.length > 0 ? (
                  filteredFindings.map((finding) => (
                    <tr key={finding.id} className="hover:bg-[#21262d]/50 transition-colors">
                      <td className="py-2.5 px-3.5 whitespace-nowrap">
                        <SeverityBadge severity={finding.severity} />
                      </td>
                      <td className="py-2.5 px-3.5">
                        <div className="font-sans font-semibold text-gray-200">
                          <Link href={`/findings/${finding.id}`} className="hover:text-gray-100 hover:underline">
                            {finding.title}
                          </Link>
                        </div>
                        <div className="text-[11px] text-gray-400 font-mono mt-0.5">
                          <span className="text-gray-200 font-semibold mr-2">{finding.id}</span>
                          <span>{finding.cwe}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3.5 whitespace-nowrap">
                        <span className="text-gray-200 font-semibold block">{finding.repository}</span>
                        <span className="text-gray-400 text-[11px] block">{finding.file}:{finding.startLine}</span>
                      </td>
                      <td className="py-2.5 px-3.5 whitespace-nowrap">
                        <span className="text-gray-300">{finding.tool}</span>
                      </td>
                      <td className="py-2.5 px-3.5 whitespace-nowrap font-semibold text-emerald-400">
                        {finding.confidence}%
                      </td>
                      <td className="py-2.5 px-3.5 whitespace-nowrap">
                        <StatusBadge status={finding.status} />
                      </td>
                      <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                        <Link
                          href={`/findings/${finding.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-200 border border-[#30363d] text-[11px] font-sans font-semibold transition-colors"
                        >
                          <span>Remediate</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500 italic">
                      No security findings match the active search and filter parameters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
