'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppShell } from '../../../components/layout/AppShell';
import { orchestratorService } from '../../../lib/services/orchestrator';
import { Finding } from '../../../lib/types';
import { SeverityBadge } from '../../../components/ui/SeverityBadge';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { CodeViewer } from '../../../components/code/CodeViewer';
import { ArrowLeft, Wrench, AlertTriangle, FileCode, UserCheck } from 'lucide-react';

export default function FindingDetailPage({ params }: { params: Promise<{ findingId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [finding, setFinding] = useState<Finding | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    orchestratorService.getFindingById(resolvedParams.findingId).then((f) => {
      if (f) setFinding(f);
    });
  }, [resolvedParams.findingId]);

  const handleRemediate = async () => {
    if (!finding) return;
    setIsGenerating(true);
    const rem = await orchestratorService.startRemediation(finding.id);
    setTimeout(() => {
      router.push(`/remediation/${rem.id}`);
    }, 400);
  };

  if (!finding) {
    return (
      <AppShell>
        <div className="py-12 text-center text-gray-400 font-mono text-xs">
          Loading security finding {resolvedParams.findingId}...
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-4 sm:space-y-5 max-w-full">
        {/* Navigation Breadcrumb */}
        <Link
          href="/findings"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Findings</span>
        </Link>

        {/* Finding Header Bar */}
        <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 min-w-0">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-bold text-gray-100">{finding.id}</span>
              <SeverityBadge severity={finding.severity} />
              <StatusBadge status={finding.status} />
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 border border-emerald-800/40 text-emerald-400 font-semibold shrink-0">
                AUTO-REMEDIATION ELIGIBLE
              </span>
            </div>

            <h1 className="text-base sm:text-lg font-bold text-gray-100 font-sans mt-1.5">{finding.title}</h1>
            <p className="text-xs text-gray-400 font-mono mt-0.5 truncate">
              Repository: <span className="text-gray-200">{finding.repository}</span> • File:{' '}
              <span className="text-gray-200">{finding.file}:{finding.startLine}</span>
            </p>
          </div>

          {/* Action Control Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleRemediate}
              disabled={isGenerating}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-100 border border-[#30363d] text-xs font-semibold transition-colors disabled:opacity-60"
            >
              <Wrench className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Generating Patch...' : 'Remediate Finding'}</span>
            </button>

            <button
              onClick={() => alert('Finding marked for human triage review.')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0d1117] hover:bg-[#21262d] text-gray-300 border border-[#30363d] text-xs font-medium transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-gray-400" />
              <span>Human Review</span>
            </button>
          </div>
        </div>

        {/* Metadata Summary Line */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
          <div className="bg-[#161b22] p-2.5 rounded border border-[#30363d] min-w-0">
            <span className="text-gray-500 text-[10px] block uppercase font-medium">CLASSIFICATION</span>
            <span className="text-gray-200 font-semibold block mt-0.5 truncate">{finding.cwe}</span>
            <span className="text-[10px] text-gray-400 block truncate">{finding.owasp}</span>
          </div>

          <div className="bg-[#161b22] p-2.5 rounded border border-[#30363d] min-w-0">
            <span className="text-gray-500 text-[10px] block uppercase font-medium">SCANNER TOOL</span>
            <span className="text-gray-200 font-semibold block mt-0.5 truncate">{finding.tool}</span>
            <span className="text-[10px] text-emerald-400 block font-semibold">{finding.confidence}% Confidence</span>
          </div>

          <div className="bg-[#161b22] p-2.5 rounded border border-[#30363d] min-w-0">
            <span className="text-gray-500 text-[10px] block uppercase font-medium">COMMIT ORIGIN</span>
            <span className="text-gray-200 font-semibold block mt-0.5 truncate">{finding.commitSha}</span>
            <span className="text-[10px] text-gray-400 block truncate">PR {finding.introducedByPR}</span>
          </div>

          <div className="bg-[#161b22] p-2.5 rounded border border-[#30363d] min-w-0">
            <span className="text-gray-500 text-[10px] block uppercase font-medium">FIXABILITY</span>
            <span className="text-emerald-400 font-semibold block mt-0.5 truncate">{finding.fixability}</span>
            <span className="text-[10px] text-gray-400 block truncate">Deterministic Patch</span>
          </div>
        </div>

        {/* Source Code Evidence Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-gray-400 shrink-0" />
            <h2 className="text-sm font-semibold text-gray-200">Vulnerable Code Snippet Evidence</h2>
          </div>

          <CodeViewer
            filePath={finding.file}
            startLine={finding.startLine}
            snippet={finding.evidence.snippet}
            vulnerableLineNumber={42}
            explanation={finding.evidence.explanation}
          />
        </div>

        {/* Technical Risk Context Box */}
        <div className="bg-[#161b22] border border-[#30363d] rounded p-3.5 sm:p-4 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Why This Is Dangerous</span>
          </div>
          <p className="text-gray-300 leading-relaxed font-sans">
            The scanner identified direct string concatenation of user-supplied variables into an active SQL query structure.
            An attacker sending malicious input such as <code className="bg-[#0d1117] px-1.5 py-0.5 rounded text-amber-300 font-mono text-[11px] break-all">&apos; OR &apos;1&apos;=&apos;1</code> could alter the SQL execution tree, bypassing login checks or exposing non-public database tables.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
