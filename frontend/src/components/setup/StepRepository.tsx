import React from 'react';
import { SetupFormState, RepositoryProvider, ProjectType, DeploymentProvider, TargetEnvironment } from '../../lib/types/setup';
import { REPO_PRESETS } from '../../lib/demo/setupTemplates';
import { GitBranch, Globe, Server, ShieldCheck, Key, Play, Sparkles } from 'lucide-react';

interface StepRepositoryProps {
  form: SetupFormState;
  onChange: (updated: Partial<SetupFormState>) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function StepRepository({ form, onChange, onAnalyze, isAnalyzing }: StepRepositoryProps) {
  const handlePresetSelect = (presetUrl: string, projectType: ProjectType) => {
    onChange({
      repoUrl: presetUrl,
      projectType,
    });
  };

  const isFormValid = form.repoUrl.trim().length > 3;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isFormValid && !isAnalyzing) onAnalyze();
      }}
      autoComplete="off"
      className="space-y-5 font-sans"
    >
      {/* Step Header */}
      <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-sm font-semibold text-gray-100 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-400" />
              Repository & Target Environment Configuration
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Specify the repository details, target branch, and deployment targets to calculate CI/CD automation requirements.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-gray-500 font-mono flex items-center gap-1 mr-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Presets:
            </span>
            {REPO_PRESETS.map((p) => (
              <button
                key={p.url}
                type="button"
                onClick={() => handlePresetSelect(p.url, p.projectType)}
                className="text-[11px] px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-gray-300 font-mono transition-colors cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Repository URL */}
          <div className="space-y-1.5 md:col-span-2">
            <label htmlFor="repoUrl" className="block text-xs font-semibold text-gray-300 font-mono">
              REPOSITORY URL <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                id="repoUrl"
                name="repoUrl"
                type="text"
                value={form.repoUrl}
                onChange={(e) => onChange({ repoUrl: e.target.value })}
                placeholder="https://github.com/example/project"
                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded px-3 py-2 text-xs text-gray-200 font-mono focus:outline-none transition-colors"
              />
            </div>
            <p className="text-[11px] text-gray-500">
              HTTPS URL for the GitHub or GitHub Enterprise repository.
            </p>
          </div>

          {/* Branch */}
          <div className="space-y-1.5">
            <label htmlFor="branch" className="block text-xs font-semibold text-gray-300 font-mono flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-gray-400" />
              TARGET BRANCH <span className="text-red-400">*</span>
            </label>
            <input
              id="branch"
              name="branch"
              type="text"
              value={form.branch}
              onChange={(e) => onChange({ branch: e.target.value })}
              placeholder="main"
              className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded px-3 py-2 text-xs text-gray-200 font-mono focus:outline-none transition-colors"
            />
            <p className="text-[11px] text-gray-500">
              Base branch for PR triggers and security gate policies (default: <code className="text-gray-400">main</code>).
            </p>
          </div>

          {/* Provider */}
          <div className="space-y-1.5">
            <label htmlFor="provider" className="block text-xs font-semibold text-gray-300 font-mono">
              REPOSITORY PROVIDER
            </label>
            <select
              id="provider"
              name="provider"
              value={form.provider}
              onChange={(e) => onChange({ provider: e.target.value as RepositoryProvider })}
              className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded px-3 py-2 text-xs text-gray-200 font-sans focus:outline-none transition-colors"
            >
              <option value="GitHub">GitHub (Cloud)</option>
              <option value="GitHub Enterprise">GitHub Enterprise Server</option>
            </select>
          </div>

          {/* Project Type */}
          <div className="space-y-1.5">
            <label htmlFor="projectType" className="block text-xs font-semibold text-gray-300 font-mono">
              PROJECT STACK / FRAMEWORK
            </label>
            <select
              id="projectType"
              name="projectType"
              value={form.projectType}
              onChange={(e) => onChange({ projectType: e.target.value as ProjectType })}
              className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded px-3 py-2 text-xs text-gray-200 font-sans focus:outline-none transition-colors"
            >
              <option value="Next.js">Next.js (App Router / Pages)</option>
              <option value="React">React (Vite / CRA)</option>
              <option value="Node.js">Node.js (Express / Fastify)</option>
              <option value="FastAPI">FastAPI (Python)</option>
              <option value="Python">Python (Django / Flask)</option>
              <option value="Other">Other / Generic</option>
            </select>
          </div>

          {/* Deployment Provider */}
          <div className="space-y-1.5">
            <label htmlFor="deploymentProvider" className="block text-xs font-semibold text-gray-300 font-mono flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-gray-400" />
              DEPLOYMENT PROVIDER
            </label>
            <select
              id="deploymentProvider"
              name="deploymentProvider"
              value={form.deploymentProvider}
              onChange={(e) => onChange({ deploymentProvider: e.target.value as DeploymentProvider })}
              className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded px-3 py-2 text-xs text-gray-200 font-sans focus:outline-none transition-colors"
            >
              <option value="Vercel">Vercel (Preview & Production)</option>
              <option value="Other">Other / Self-hosted</option>
            </select>
          </div>

          {/* Target Environment */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="block text-xs font-semibold text-gray-300 font-mono">
              TARGET ENVIRONMENT
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Preview', 'Production', 'Development'] as TargetEnvironment[]).map((env) => (
                <button
                  key={env}
                  type="button"
                  onClick={() => onChange({ environment: env })}
                  className={`py-2 px-3 rounded text-xs font-mono text-center border transition-all ${
                    form.environment === env
                      ? 'bg-blue-950/40 border-blue-500/60 text-blue-300 font-bold'
                      : 'bg-[#0d1117] border-[#30363d] text-gray-400 hover:text-gray-200 cursor-pointer'
                  }`}
                >
                  {env}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Demo Credentials (Optional Simulated Inputs) */}
      <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-gray-200 uppercase tracking-wider font-mono">
              Authentication Credentials (Demo Simulation)
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/50 border border-amber-800/60 text-amber-400 font-mono font-medium">
            Demo input — credentials are not transmitted
          </span>
        </div>
        <p className="text-[11px] text-gray-400">
          Optional tokens for testing provider validation workflows. These values remain strictly in local browser memory and are never placed into generated workflows or sent over the network.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="space-y-1">
            <label htmlFor="githubTokenDemo" className="block text-[11px] text-gray-400 font-mono">
              GITHUB ACCESS TOKEN (SIMULATED)
            </label>
            <input
              id="githubTokenDemo"
              name="githubTokenDemo"
              type="password"
              autoComplete="new-password"
              value={form.githubTokenDemo || ''}
              onChange={(e) => onChange({ githubTokenDemo: e.target.value })}
              placeholder="ghp_••••••••••••••••••••••••••••••••"
              className="w-full bg-[#0d1117] border border-[#30363d] focus:border-amber-500/50 rounded px-3 py-1.5 text-xs text-gray-300 font-mono focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="vercelTokenDemo" className="block text-[11px] text-gray-400 font-mono">
              VERCEL API TOKEN (SIMULATED)
            </label>
            <input
              id="vercelTokenDemo"
              name="vercelTokenDemo"
              type="password"
              autoComplete="new-password"
              value={form.vercelTokenDemo || ''}
              onChange={(e) => onChange({ vercelTokenDemo: e.target.value })}
              placeholder="vercel_••••••••••••••••••••••••"
              className="w-full bg-[#0d1117] border border-[#30363d] focus:border-amber-500/50 rounded px-3 py-1.5 text-xs text-gray-300 font-mono focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Ready to analyze repository requirements</span>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isAnalyzing}
          className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white font-medium text-xs shadow-xs transition-colors cursor-pointer"
        >
          {isAnalyzing ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing Repository…</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Analyze Repository</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
