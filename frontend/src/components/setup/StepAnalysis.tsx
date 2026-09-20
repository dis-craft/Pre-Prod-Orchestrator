import React from 'react';
import { RepositoryAnalysis } from '../../lib/types/setup';
import { CheckCircle2, ArrowRight, ArrowLeft, RefreshCw, Cpu, GitBranch, Layers, Server, FileCode } from 'lucide-react';

interface StepAnalysisProps {
  analysis: RepositoryAnalysis;
  onProceed: () => void;
  onBack: () => void;
  onReanalyze: () => void;
}

export function StepAnalysis({ analysis, onProceed, onBack, onReanalyze }: StepAnalysisProps) {
  return (
    <div className="space-y-5 font-sans">
      {/* Simulation Notice */}
      <div className="px-3.5 py-2 rounded bg-[#161b22] border border-[#30363d] flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-gray-300">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ANALYSIS COMPLETE</span>
        </div>
        <span className="text-gray-400 text-[11px]">
          Repository analysis is simulated in Demo Mode.
        </span>
      </div>

      {/* Checklist Progress */}
      <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5 space-y-3">
        <h3 className="text-xs font-semibold text-gray-200 uppercase tracking-wider font-mono">
          Inspection Results & Diagnostics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {analysis.checks.map((c) => (
            <div
              key={c.id}
              className="flex items-start gap-2.5 p-2.5 rounded bg-[#0d1117] border border-[#21262d] text-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="font-semibold text-gray-200 block truncate">{c.label}</span>
                <span className="text-[11px] text-gray-400 block mt-0.5">{c.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="bg-[#161b22] border border-[#30363d] rounded p-3">
          <div className="flex items-center gap-1.5 text-gray-400 text-[10px] uppercase mb-1">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Target Repo</span>
          </div>
          <div className="font-bold text-xs text-gray-200 truncate">{analysis.repositoryName}</div>
          <div className="text-[10px] text-gray-500 mt-0.5">ref: {analysis.branch}</div>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded p-3">
          <div className="flex items-center gap-1.5 text-gray-400 text-[10px] uppercase mb-1">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Detected Stack</span>
          </div>
          <div className="font-bold text-xs text-gray-200 truncate">{analysis.detectedStack.framework}</div>
          <div className="text-[10px] text-gray-500 mt-0.5">{analysis.detectedStack.language}</div>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded p-3">
          <div className="flex items-center gap-1.5 text-gray-400 text-[10px] uppercase mb-1">
            <GitBranch className="w-3.5 h-3.5 text-purple-400" />
            <span>Workflows</span>
          </div>
          <div className="font-bold text-xs text-gray-200">{analysis.existingWorkflowsCount} Existing</div>
          <div className="text-[10px] text-gray-500 mt-0.5">.github/workflows/</div>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded p-3">
          <div className="flex items-center gap-1.5 text-gray-400 text-[10px] uppercase mb-1">
            <FileCode className="w-3.5 h-3.5 text-amber-400" />
            <span>Config Changes</span>
          </div>
          <div className="font-bold text-xs text-amber-300">{analysis.configurationChangesCount} Files</div>
          <div className="text-[10px] text-gray-500 mt-0.5">3 create, 2 update</div>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-300 text-xs font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Edit Parameters</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReanalyze}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-400 hover:text-gray-200 text-xs font-medium transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Re-analyze</span>
          </button>

          <button
            type="button"
            onClick={onProceed}
            className="flex items-center gap-1.5 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium shadow-xs transition-colors"
          >
            <span>View Configuration Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
