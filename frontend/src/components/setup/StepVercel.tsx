import React, { useState } from 'react';
import { VercelPlan } from '../../lib/types/setup';
import { 
  Server, 
  Play, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Layers, 
  Terminal, 
  Folder, 
  Lock,
  ExternalLink
} from 'lucide-react';

interface StepVercelProps {
  plan: VercelPlan;
  isSimulated: boolean;
  onSimulate: () => void;
  onProceed: () => void;
  onBack: () => void;
}

export function StepVercel({
  plan,
  isSimulated,
  onSimulate,
  onProceed,
  onBack,
}: StepVercelProps) {
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(plan.jsonContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      onSimulate();
    }, 1200);
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Header Info */}
      <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-semibold text-gray-100">
                Vercel Deployment & Preview Configuration
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-mono font-medium">
                STATUS: {plan.status}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Applies zero-trust HTTP security headers, preview deployment controls, and environment variable references.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-300 text-xs font-mono transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
              <span>{copied ? 'Copied vercel.json' : 'Copy JSON'}</span>
            </button>
          </div>
        </div>

        {/* Project Parameters Card */}
        <div className="mt-4 p-3 rounded bg-[#0d1117] border border-[#21262d] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div>
            <span className="text-gray-500 text-[10px] block">TARGET PROJECT</span>
            <span className="text-gray-200 font-semibold">{plan.projectName}</span>
          </div>
          <div>
            <span className="text-gray-500 text-[10px] block">DEPLOYMENT ENVIRONMENT</span>
            <span className="text-emerald-400">{plan.environment}</span>
          </div>
          <div>
            <span className="text-gray-500 text-[10px] block">OUTPUT DIRECTORY</span>
            <span className="text-gray-300">{plan.outputDirectory}</span>
          </div>
        </div>
      </div>

      {/* Would Configure Grid */}
      <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5 space-y-3">
        <h3 className="text-xs font-semibold text-gray-200 uppercase tracking-wider font-mono">
          Deployment Parameters & Build Gates
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded bg-[#0d1117] border border-[#21262d] space-y-1.5">
            <div className="flex items-center gap-1.5 text-gray-400">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-semibold text-gray-300">BUILD & INSTALL COMMANDS</span>
            </div>
            <div className="text-[11px] text-gray-400 space-y-1 pt-1">
              <div>Build: <code className="text-blue-300 bg-[#161b22] px-1.5 py-0.5 rounded">{plan.buildCommand}</code></div>
              <div>Install: <code className="text-blue-300 bg-[#161b22] px-1.5 py-0.5 rounded">{plan.installCommand}</code></div>
            </div>
          </div>

          <div className="p-3 rounded bg-[#0d1117] border border-[#21262d] space-y-1.5">
            <div className="flex items-center gap-1.5 text-gray-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-gray-300">SECURITY HEADERS IN VERCEL.JSON</span>
            </div>
            <div className="text-[11px] text-gray-400 space-y-0.5 pt-1">
              <div className="text-emerald-400">✓ X-Content-Type-Options: nosniff</div>
              <div className="text-emerald-400">✓ X-Frame-Options: DENY</div>
              <div className="text-emerald-400">✓ Strict-Transport-Security: max-age=63072000</div>
            </div>
          </div>

          <div className="p-3 rounded bg-[#0d1117] border border-[#21262d] space-y-1.5 md:col-span-2">
            <div className="flex items-center gap-1.5 text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-gray-300">ENVIRONMENT VARIABLE REFERENCES (SIMULATED)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
              {plan.envVariables.map((ev, i) => (
                <div key={i} className="p-1.5 rounded bg-[#161b22] border border-[#30363d] text-gray-300 truncate">
                  {ev}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Simulation Box */}
      <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-gray-200 uppercase tracking-wider font-mono block">
              Simulate Vercel Configuration
            </span>
            <p className="text-xs text-gray-400 mt-0.5">
              Simulate project link validation, header verification, and preview deployment readiness.
            </p>
          </div>

          <button
            type="button"
            disabled={isSimulating}
            onClick={handleRunSimulation}
            className="flex items-center gap-2 px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium text-xs shadow-xs transition-colors shrink-0"
          >
            {isSimulating ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Simulating Configuration…</span>
              </>
            ) : isSimulated ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                <span>Re-simulate Configuration</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulate Configuration</span>
              </>
            )}
          </button>
        </div>

        {/* Confirmation */}
        {isSimulated && (
          <div className="mt-4 p-3 rounded bg-emerald-950/40 border border-emerald-800/60 flex items-start gap-2.5 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-200 font-mono block uppercase">
                VERCEL CONFIGURATION PREVIEW READY
              </span>
              <p className="text-emerald-300/90 mt-0.5 text-[11px] leading-relaxed">
                Configuration for <code className="text-emerald-200 font-mono bg-emerald-900/60 px-1 py-0.2 rounded">{plan.projectName}</code> generated. No external Vercel API was called.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-300 text-xs font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to GitHub Actions</span>
        </button>

        <button
          type="button"
          onClick={onProceed}
          className="flex items-center gap-1.5 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium shadow-xs transition-colors"
        >
          <span>Run Configuration Validation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
