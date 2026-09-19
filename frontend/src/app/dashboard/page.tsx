'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { SeverityBadge } from '../../components/ui/SeverityBadge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { orchestratorService } from '../../lib/services/orchestrator';
import { DashboardMetrics, Finding, AuditEvent } from '../../lib/types';
import { useAppMode } from '../../lib/mode/modeContext';
import { 
  Activity, 
  ArrowRight,
  FileCode,
  ShieldCheck
} from 'lucide-react';

export default function DashboardPage() {
  const { isDemoMode } = useAppMode();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [activities, setActivities] = useState<AuditEvent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const m = await orchestratorService.getMetrics();
      const f = await orchestratorService.getFindings();
      const a = await orchestratorService.getAuditEvents();
      setMetrics(m);
      setFindings(f);
      setActivities(a);
    };

    fetchData();
    return orchestratorService.subscribe(fetchData);
  }, []);

  if (!metrics) return null;

  return (
    <AppShell>
      <div className="space-y-4 sm:space-y-5 max-w-full">
        {/* Page Title & Context Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#30363d] pb-3">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-100">Security Control Plane</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Automated SAST findings, remediation candidate verification, and audit evidence.
            </p>
          </div>
          {isDemoMode ? (
            <Link
              href="/findings/SEC-001"
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-200 border border-[#30363d] text-xs font-semibold transition-colors font-mono shrink-0 self-start sm:self-auto"
            >
              <span>Inspect SEC-001</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href="/findings"
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-200 border border-[#30363d] text-xs font-semibold transition-colors font-mono shrink-0 self-start sm:self-auto"
            >
              <span>View All Findings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Dense Security Overview Bar */}
        <div className="bg-[#161b22] border border-[#30363d] rounded p-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
          <div className="border-r border-[#30363d] pr-2 sm:pr-3">
            <span className="text-[10px] text-gray-500 uppercase block font-medium truncate">OPEN FINDINGS</span>
            <span className="text-lg font-bold text-gray-100 mt-0.5 block">{metrics.openFindings}</span>
          </div>
          <div className="border-r border-[#30363d] pr-2 sm:pr-3">
            <span className="text-[10px] text-gray-500 uppercase block font-medium truncate">CRITICAL</span>
            <span className="text-lg font-bold text-red-400 mt-0.5 block">{metrics.criticalCount}</span>
          </div>
          <div className="border-r border-[#30363d] pr-2 sm:pr-3">
            <span className="text-[10px] text-gray-500 uppercase block font-medium truncate">HIGH SEVERITY</span>
            <span className="text-lg font-bold text-amber-400 mt-0.5 block">{metrics.highCount}</span>
          </div>
          <div className="border-r border-[#30363d] pr-2 sm:pr-3">
            <span className="text-[10px] text-gray-500 uppercase block font-medium truncate">FIX CANDIDATES</span>
            <span className="text-lg font-bold text-gray-200 mt-0.5 block">{metrics.fixCandidates}</span>
          </div>
          <div className="border-r border-[#30363d] pr-2 sm:pr-3">
            <span className="text-[10px] text-gray-500 uppercase block font-medium truncate">PASS RATE</span>
            <span className="text-lg font-bold text-emerald-400 mt-0.5 block">{metrics.validationPassRate}%</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase block font-medium truncate">REMEDIATION PRS</span>
            <span className="text-lg font-bold text-blue-400 mt-0.5 block">{metrics.remediationPRs}</span>
          </div>
        </div>

        {/* Primary Interactive Workflow Showcase Box (Demo Mode Only) */}
        {isDemoMode ? (
          <div className="bg-[#161b22] border border-[#30363d] rounded p-3.5 sm:p-4 text-xs font-mono">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#30363d] pb-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#21262d] text-amber-400 border border-amber-900/40 text-[10px] font-bold uppercase">
                    ACTIVE DEMO SCENARIO
                  </span>
                  <span className="text-xs text-gray-400">payments-api • PR #142</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-100 font-sans mt-1">
                  SEC-001: SQL Injection in User Authentication Handler
                </h2>
              </div>
              <Link
                href="/findings/SEC-001"
                className="px-3 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-200 border border-[#30363d] font-sans font-semibold transition-colors self-start md:self-auto shrink-0"
              >
                Start Walkthrough →
              </Link>
            </div>

            {/* Compact Workflow Sequence Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mt-3">
              <div className="bg-[#0d1117] p-2.5 rounded border border-[#30363d]">
                <span className="text-gray-500 text-[10px] block">1. SCANNER</span>
                <span className="font-semibold text-red-400 block mt-0.5">Semgrep SAST</span>
                <span className="text-gray-400 text-[10px] block mt-0.5 truncate">src/auth/login.js:42</span>
              </div>
              <div className="bg-[#0d1117] p-2.5 rounded border border-[#30363d]">
                <span className="text-gray-500 text-[10px] block">2. FINDING</span>
                <span className="font-semibold text-amber-400 block mt-0.5">CWE-89 (High)</span>
                <span className="text-gray-400 text-[10px] block mt-0.5 truncate">String Concatenation</span>
              </div>
              <div className="bg-[#0d1117] p-2.5 rounded border border-[#30363d]">
                <span className="text-gray-500 text-[10px] block">3. REMEDIATION</span>
                <span className="font-semibold text-gray-200 block mt-0.5">Parameterization</span>
                <span className="text-gray-400 text-[10px] block mt-0.5 truncate">REM-SEC-001 Patch</span>
              </div>
              <div className="bg-[#0d1117] p-2.5 rounded border border-[#30363d]">
                <span className="text-gray-500 text-[10px] block">4. VALIDATION</span>
                <span className="font-semibold text-blue-400 block mt-0.5">9/9 Checks</span>
                <span className="text-gray-400 text-[10px] block mt-0.5 truncate">VAL-SEC-001 Suite</span>
              </div>
              <div className="bg-[#0d1117] p-2.5 rounded border border-[#30363d]">
                <span className="text-gray-500 text-[10px] block">5. PR & AUDIT</span>
                <span className="font-semibold text-emerald-400 block mt-0.5">PR #157</span>
                <span className="text-gray-400 text-[10px] block mt-0.5 truncate">Verified & Ready</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#161b22] border border-[#30363d] rounded p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-900/50 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-100 font-sans text-sm">Security Pipeline Operational</h2>
                <p className="text-gray-400 font-mono text-[11px] mt-0.5">
                  Monitored repositories: 3 • Active SAST rulesets: 142 • Compliance status: PASSING
                </p>
              </div>
            </div>
            <Link
              href="/repositories"
              className="px-3 py-1.5 rounded bg-[#0d1117] hover:bg-[#21262d] text-gray-300 border border-[#30363d] font-mono text-xs transition-colors shrink-0 self-start sm:self-auto"
            >
              Manage Monitored Repos
            </Link>
          </div>
        )}

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Active Security Findings List */}
          <div className="lg:col-span-2 bg-[#161b22] border border-[#30363d] rounded p-3.5 sm:p-4">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-gray-400 shrink-0" />
                <h3 className="text-sm font-semibold text-gray-200">Open Security Findings</h3>
              </div>
              <Link href="/findings" className="text-xs text-gray-400 hover:text-gray-200 font-medium shrink-0">
                View All →
              </Link>
            </div>

            <div className="space-y-2">
              {findings.length === 0 ? (
                <div className="p-6 text-center text-gray-500 font-mono text-xs bg-[#0d1117] rounded border border-[#30363d]">
                  No open security findings detected across monitored repositories.
                </div>
              ) : (
                findings.map((finding) => (
                  <Link
                    key={finding.id}
                    href={`/findings/${finding.id}`}
                    className="block p-3 rounded bg-[#0d1117] border border-[#30363d] hover:border-gray-500 transition-colors group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-gray-200 group-hover:underline">
                            {finding.id}
                          </span>
                          <SeverityBadge severity={finding.severity} />
                          <span className="text-xs text-gray-400 font-mono">{finding.cwe}</span>
                        </div>
                        <h4 className="text-xs font-semibold text-gray-200 font-sans mt-1">
                          {finding.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 font-mono mt-0.5 truncate">
                          {finding.repository} • {finding.file}:{finding.startLine}
                        </p>
                      </div>
                      <div className="shrink-0 self-start sm:self-auto">
                        <StatusBadge status={finding.status} />
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Activity Log Feed */}
          <div className="bg-[#161b22] border border-[#30363d] rounded p-3.5 sm:p-4">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-gray-400 shrink-0" />
                <h3 className="text-sm font-semibold text-gray-200">Recent Security Activity</h3>
              </div>
              <Link href="/audit" className="text-xs text-gray-400 hover:text-gray-200 font-medium shrink-0">
                Audit Log
              </Link>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {activities.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-[11px] bg-[#0d1117] rounded border border-[#30363d]">
                  No recent security audit events.
                </div>
              ) : (
                activities.slice(0, 5).map((act) => (
                  <div key={act.id} className="p-2 rounded bg-[#0d1117] border border-[#30363d]/60">
                    <div className="flex items-center justify-between text-[10px] text-gray-500 mb-0.5">
                      <span className="truncate pr-1">{act.actor}</span>
                      <span className="shrink-0">{act.timestamp}</span>
                    </div>
                    <span className="text-gray-200 font-semibold block truncate">{act.action}</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5 truncate">{act.component}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
