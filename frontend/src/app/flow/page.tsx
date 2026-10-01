'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { RefreshCw, ExternalLink, GitCommit, ShieldCheck, Bot, GitPullRequest, UserCheck, GitMerge } from 'lucide-react';

const FLOW_URL =
  process.env.NEXT_PUBLIC_FLOW_DATA_URL ||
  'https://dis-craft.github.io/Pre-prod-tester/data/flow.json';

type Stage = {
  label: string;
  status: string;
  detail?: string;
  run_url?: string | null;
  pr_url?: string | null;
};

type Flow = {
  generated_at?: string;
  current_stage_label?: string;
  commit?: { sha?: string; author?: string; branch?: string; message?: string; url?: string };
  pull_request?: { number?: number; url?: string; state?: string; head?: string; base?: string; merged?: boolean } | null;
  stages?: Stage[];
};

const icons = [GitCommit, ShieldCheck, Bot, ShieldCheck, ShieldCheck, GitPullRequest, GitPullRequest, ShieldCheck, UserCheck, GitMerge];

function statusClass(status: string) {
  switch (status) {
    case 'pass': return 'border-emerald-900/60 text-emerald-300 bg-emerald-950/20';
    case 'running': return 'border-amber-900/60 text-amber-300 bg-amber-950/20';
    case 'fail':
    case 'error': return 'border-red-900/60 text-red-300 bg-red-950/20';
    default: return 'border-blue-900/60 text-blue-300 bg-blue-950/20';
  }
}

export default function FlowPage() {
  const [flow, setFlow] = useState<Flow | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const response = await fetch(`${FLOW_URL}?t=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setFlow((await response.json()) as Flow);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to load live flow');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    const run = async () => {
      try {
        const response = await fetch(`${FLOW_URL}?t=${Date.now()}`, { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = (await response.json()) as Flow;
        if (active) {
          setFlow(data);
          setError('');
        }
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : 'Unable to load live flow');
      } finally {
        if (active) setLoading(false);
      }
    };
    void run();
    const timer = window.setInterval(() => void run(), 8000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <AppShell>
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
          <div>
            <h1 className="text-lg font-bold text-gray-100">Live Security Flow</h1>
            <p className="text-xs text-gray-400 mt-0.5">Commit → scan → AI fix → validate → PR → re-scan → review → merge</p>
          </div>
          <button onClick={() => void load()} className="p-2 rounded border border-[#30363d] hover:bg-[#21262d]" aria-label="Refresh flow">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-4 border border-red-900/60 bg-red-950/20 rounded text-sm text-red-300">
            Live flow unavailable: {error}
          </div>
        )}

        {loading && !flow ? (
          <div className="p-8 text-center text-gray-500">Loading live flow…</div>
        ) : flow ? (
          <>
            <div className="bg-[#161b22] border border-[#30363d] rounded p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
                <Metric label="CURRENT STAGE" value={flow.current_stage_label || 'Unknown'} />
                <Metric label="COMMIT" value={flow.commit?.sha?.slice(0, 12) || 'Unknown'} />
                <Metric label="BRANCH" value={flow.commit?.branch || 'main'} />
                <Metric label="PR" value={flow.pull_request ? `#${flow.pull_request.number}` : 'Not created'} />
              </div>
              {flow.commit?.url && (
                <a href={flow.commit.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-3 text-xs text-blue-400 hover:underline">
                  Open source commit <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="space-y-2">
              {(flow.stages || []).map((stage, index) => {
                const Icon = icons[index] || ShieldCheck;
                return (
                  <div key={stage.label} className="relative flex gap-3">
                    <div className="w-9 h-9 shrink-0 rounded-full border border-[#30363d] bg-[#161b22] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-gray-300" />
                    </div>
                    <div className="flex-1 bg-[#161b22] border border-[#30363d] rounded p-3 mb-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold text-gray-100">{stage.label}</h2>
                        <span className={`px-2 py-1 rounded border text-[10px] uppercase font-mono ${statusClass(stage.status)}`}>
                          {stage.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{stage.detail || ''}</p>
                      <div className="flex gap-3 mt-2 text-[11px]">
                        {stage.run_url && <a href={stage.run_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Workflow ↗</a>}
                        {stage.pr_url && <a href={stage.pr_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">PR ↗</a>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : null}

        {flow?.generated_at && (
          <div className="text-[10px] text-gray-500 font-mono">Last update: {flow.generated_at} · refreshes every 8 seconds</div>
        )}
      </div>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#0d1117] border border-[#30363d] rounded p-3">
      <div className="text-[10px] text-gray-500">{label}</div>
      <div className="text-sm font-semibold text-gray-100 mt-1 break-words">{value}</div>
    </div>
  );
}
