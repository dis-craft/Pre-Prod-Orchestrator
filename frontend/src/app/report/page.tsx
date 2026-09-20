'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { ShieldCheck, ShieldAlert, ExternalLink, RefreshCw } from 'lucide-react';

const SCAN_URL =
  process.env.NEXT_PUBLIC_SCAN_DATA_URL ||
  'https://dis-craft.github.io/Pre-prod-tester/data/latest.json';

type Scan = {
  scan?: { id?: string; captured_at?: string; workflow_run_id?: string; workflow_url?: string };
  repository?: { full_name?: string };
  commit?: { before?: string; after?: string; branch?: string; message?: string };
  change_summary?: { files_changed?: number; additions?: number; deletions?: number };
  security_engine?: {
    status?: string;
    scanner?: string;
    findings?: Array<Record<string, unknown>>;
  };
};

export default function ReportPage() {
  const [scan, setScan] = useState<Scan | null>(null);
  const [error, setError] = useState('');
  const load = async () => {
    try {
      setError('');
      const res = await fetch(SCAN_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setScan(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to load live scan');
    }
  };

  useEffect(() => { void load(); }, []);

  const findings = scan?.security_engine?.findings || [];
  const high = findings.filter((f) => ['HIGH', 'CRITICAL'].includes(String(f.severity).toUpperCase()));
  const status = scan?.security_engine?.status || 'UNAVAILABLE';

  return (
    <AppShell>
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
          <div>
            <h1 className="text-lg font-bold text-gray-100">Live Security Report</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Directly backed by the latest Pre-Prod Tester scan published by CI/CD.
            </p>
          </div>
          <button onClick={() => void load()} className="p-2 rounded border border-[#30363d] hover:bg-[#21262d]">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {error ? (
          <div className="p-4 border border-red-900/50 bg-red-950/20 rounded text-sm text-red-300">
            Live report unavailable: {error}
          </div>
        ) : !scan ? (
          <div className="p-8 text-center text-gray-500">Loading live scan…</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <Metric label="STATUS" value={status} />
              <Metric label="FINDINGS" value={findings.length} />
              <Metric label="HIGH / CRITICAL" value={high.length} />
              <Metric label="FILES CHANGED" value={scan.change_summary?.files_changed ?? 0} />
              <Metric label="ADDITIONS" value={scan.change_summary?.additions ?? 0} />
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded p-4 font-mono text-xs space-y-2">
              <div><span className="text-gray-500">Repository:</span> {scan.repository?.full_name}</div>
              <div><span className="text-gray-500">Branch:</span> {scan.commit?.branch}</div>
              <div><span className="text-gray-500">Commit:</span> {scan.commit?.after}</div>
              <div><span className="text-gray-500">Captured:</span> {scan.scan?.captured_at}</div>
              {scan.scan?.workflow_url && (
                <a href={scan.scan.workflow_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-400 hover:underline">
                  GitHub Actions run <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded overflow-hidden">
              <div className="p-3 border-b border-[#30363d] font-semibold text-sm">Detected vulnerabilities</div>
              <div className="divide-y divide-[#30363d]">
                {findings.map((f, i) => (
                  <div key={String(f.id ?? i)} className="p-3 font-mono text-xs space-y-1">
                    <div className="flex flex-wrap gap-2">
                      <span className="font-semibold text-gray-100">{String(f.rule ?? 'unknown-rule')}</span>
                      <span className="text-gray-400">{String(f.severity ?? 'INFO')}</span>
                      <span className="text-gray-500">{String(f.file ?? '')}:{String(f.line ?? '')}</span>
                    </div>
                    <div className="text-gray-300">{String(f.message ?? '')}</div>
                    <div className="text-gray-500">{String(f.what_and_why ?? '')}</div>
                  </div>
                ))}
                {!findings.length && (
                  <div className="p-8 text-center text-gray-500">No vulnerabilities detected in the latest scan.</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded p-3">
      <div className="text-[10px] text-gray-500 font-mono">{label}</div>
      <div className="text-lg font-bold text-gray-100 mt-1">{value}</div>
    </div>
  );
}
