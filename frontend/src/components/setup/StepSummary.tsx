import React, { useState } from 'react';
import Link from 'next/link';
import { SetupState } from '../../lib/types/setup';
import { 
  CheckCircle2, 
  Download, 
  RotateCcw, 
  LayoutDashboard, 
  ArrowRight, 
  FileCode, 
  Workflow, 
  Server, 
  ShieldCheck, 
  GitBranch, 
  Terminal,
  Layers,
  Copy,
  Check
} from 'lucide-react';

interface StepSummaryProps {
  state: SetupState;
  onReset: () => void;
}

export function StepSummary({ state, onReset }: StepSummaryProps) {
  const [copiedBundle, setCopiedBundle] = useState(false);

  const createCount = state.files.filter((f) => f.action === 'CREATE').length;
  const updateCount = state.files.filter((f) => f.action === 'UPDATE').length;

  const handleDownloadBundle = () => {
    const bundleData = {
      repository: state.analysis.repositoryName,
      branch: state.form.branch,
      provider: state.form.provider,
      projectType: state.form.projectType,
      deploymentProvider: state.form.deploymentProvider,
      environment: state.form.environment,
      generatedAt: new Date().toISOString(),
      simulation: true,
      files: state.files.map((f) => ({
        path: f.path,
        action: f.action,
        purpose: f.purpose,
        content: f.content,
      })),
    };

    const blob = new Blob([JSON.stringify(bundleData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `preprod-setup-${state.analysis.repositoryName.replace('/', '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopySummary = () => {
    const text = `Pre-Prod-Orchestrator Setup Summary
Repository: ${state.analysis.repositoryName} (${state.form.branch})
Stack: ${state.form.projectType}
Deployment: ${state.form.deploymentProvider} (${state.form.environment})
Files to Create: ${createCount}
Files to Update: ${updateCount}
Validation Status: SIMULATED — PASSED`;
    navigator.clipboard.writeText(text);
    setCopiedBundle(true);
    setTimeout(() => setCopiedBundle(false), 2000);
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Top Banner */}
      <div className="bg-[#161b22] border border-emerald-800/50 rounded p-4 sm:p-5">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-100 flex items-center gap-2">
                Repository Setup Complete (Simulation)
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                The configuration files, security policies, GitHub Actions workflows, and Vercel settings have been generated and validated.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-300 text-xs font-mono transition-colors"
            >
              {copiedBundle ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
              <span>{copiedBundle ? 'Copied' : 'Copy Summary'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadBundle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/50 text-blue-300 text-xs font-mono transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Bundle (.json)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Matrix Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono">
        <div className="p-3.5 rounded bg-[#161b22] border border-[#30363d]">
          <span className="text-[10px] text-gray-500 uppercase block mb-1">Target Repository</span>
          <span className="text-xs font-bold text-gray-200 block truncate">{state.analysis.repositoryName}</span>
          <span className="text-[11px] text-gray-400 block mt-0.5">ref: {state.form.branch}</span>
        </div>

        <div className="p-3.5 rounded bg-[#161b22] border border-[#30363d]">
          <span className="text-[10px] text-gray-500 uppercase block mb-1">Files Impacted</span>
          <span className="text-xs font-bold text-gray-200 block">
            {createCount} Created • {updateCount} Updated
          </span>
          <span className="text-[11px] text-emerald-400 block mt-0.5">5 Config files total</span>
        </div>

        <div className="p-3.5 rounded bg-[#161b22] border border-[#30363d]">
          <span className="text-[10px] text-gray-500 uppercase block mb-1">CI Automation</span>
          <span className="text-xs font-bold text-purple-300 block">2 Workflows</span>
          <span className="text-[11px] text-gray-400 block mt-0.5">GitHub Actions (Simulated)</span>
        </div>

        <div className="p-3.5 rounded bg-[#161b22] border border-[#30363d]">
          <span className="text-[10px] text-gray-500 uppercase block mb-1">Validation Status</span>
          <span className="text-xs font-bold text-emerald-400 block">SIMULATED — PASSED</span>
          <span className="text-[11px] text-gray-400 block mt-0.5">7/7 checks passed</span>
        </div>
      </div>

      {/* Next Steps: Production Guide vs Simulation */}
      <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5 space-y-3">
        <h3 className="text-xs font-semibold text-gray-200 uppercase tracking-wider font-mono flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span>Production Implementation Roadmap</span>
        </h3>
        <p className="text-xs text-gray-400">
          In a production deployment, executing this automation performs the following sequential operations:
        </p>

        <div className="space-y-2 pt-1">
          {[
            { step: '1', title: 'GitHub Authentication & App Installation', desc: 'Authenticate via GitHub OAuth / App with repository permissions for workflows and pull requests.' },
            { step: '2', title: 'Repository Checkout & Branch Creation', desc: 'Create an isolated setup branch (e.g., preprod-orchestrator-setup) from the target default branch.' },
            { step: '3', title: 'Configuration File Synthesis', desc: 'Commit .github/workflows/preprod-security.yml, .preprod/config.yml, and vercel.json descriptors.' },
            { step: '4', title: 'Secrets & Environment Provisioning', desc: 'Configure encrypted repository secrets (GEMINI_API_KEY, PREPROD_TOKEN) in GitHub Settings.' },
            { step: '5', title: 'Pull Request Dispatch & Automated CI Check', desc: 'Open setup PR with security policy documentation and trigger initial verification run.' },
            { step: '6', title: 'Human Review & Merge', desc: 'Engineering team reviews the setup PR, verifies CI results, and merges into main.' },
          ].map((item) => (
            <div key={item.step} className="p-2.5 rounded bg-[#0d1117] border border-[#21262d] flex items-start gap-2.5 text-xs">
              <span className="w-5 h-5 rounded bg-[#21262d] border border-[#30363d] flex items-center justify-center font-mono font-bold text-[10px] text-blue-400 shrink-0 mt-0.5">
                {item.step}
              </span>
              <div>
                <span className="font-semibold text-gray-200">{item.title}</span>
                <p className="text-[11px] text-gray-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-300 text-xs font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Configure Another Repository</span>
        </button>

        <div className="flex items-center gap-2">
          <Link
            href="/findings"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-200 text-xs font-medium transition-colors"
          >
            <span>View Security Findings</span>
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium shadow-xs transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Go to Live Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
