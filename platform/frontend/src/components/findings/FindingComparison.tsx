'use client';

import React from 'react';
import { Finding } from '../../lib/types';
import { SeverityBadge } from '../ui/SeverityBadge';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

interface FindingComparisonProps {
  finding: Finding;
}

export function FindingComparison({ finding }: FindingComparisonProps) {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded p-3.5 sm:p-4 space-y-3 font-mono text-xs max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#30363d] pb-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <h3 className="text-sm font-semibold text-gray-200 font-sans truncate">
            Security Re-scan & Delta Comparison
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-800/40 text-emerald-400 text-[10px] font-semibold self-start sm:self-auto shrink-0">
          [SIMULATED RESULT] 1 RESOLVED, 0 NEW RISKS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* BEFORE STATE */}
        <div className="bg-[#0d1117] border border-red-900/40 rounded p-3 space-y-2 min-w-0">
          <div className="flex items-center justify-between text-[10px] text-gray-500 uppercase font-semibold">
            <span>PRE-REMEDIATION SCAN</span>
            <span className="text-red-400 font-bold">DETECTED</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-gray-200">{finding.id}</span>
            <SeverityBadge severity={finding.severity} />
            <span className="text-gray-400">{finding.cwe}</span>
          </div>

          <p className="text-gray-300 text-xs font-sans font-medium">{finding.title}</p>
          <div className="bg-red-950/20 p-1.5 rounded border border-red-900/30 text-red-300 text-[11px] truncate">
            {finding.file}:{finding.startLine} • {finding.tool}
          </div>
        </div>

        {/* AFTER STATE */}
        <div className="bg-[#0d1117] border border-emerald-900/40 rounded p-3 space-y-2 min-w-0">
          <div className="flex items-center justify-between text-[10px] text-gray-500 uppercase font-semibold">
            <span>POST-REMEDIATION RE-SCAN</span>
            <span className="text-emerald-400 font-bold">NOT DETECTED</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold text-emerald-400">{finding.id} VERIFIED</span>
            <span className="text-gray-400">PASSED</span>
          </div>

          <p className="text-gray-300 text-xs font-sans font-medium">Rule checks clean on candidate patch diff.</p>
          <div className="bg-emerald-950/20 p-1.5 rounded border border-emerald-900/30 text-emerald-300 text-[11px] truncate">
            0 vulnerabilities match rule {finding.ruleId}
          </div>
        </div>
      </div>
    </div>
  );
}
