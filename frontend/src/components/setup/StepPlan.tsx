import React from 'react';
import { PlannedFile } from '../../lib/types/setup';
import { PlusCircle, Edit3, ArrowRight, ArrowLeft, Eye, Copy, Check, FileCode, CheckCircle2 } from 'lucide-react';

interface StepPlanProps {
  files: PlannedFile[];
  onProceed: () => void;
  onBack: () => void;
  onSelectFileForPreview: (fileIndex: number) => void;
}

export function StepPlan({ files, onProceed, onBack, onSelectFileForPreview }: StepPlanProps) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (file: PlannedFile) => {
    navigator.clipboard.writeText(file.content);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const createFiles = files.filter((f) => f.action === 'CREATE');
  const updateFiles = files.filter((f) => f.action === 'UPDATE');

  return (
    <div className="space-y-5 font-sans">
      {/* Header Info */}
      <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-sm font-semibold text-gray-100 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-blue-400" />
              Calculated Automation & Configuration Plan
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Review all workflow definitions, security rule policies, and deployment descriptors that would be applied to the repository.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
              {createFiles.length} to create
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/60 text-amber-400">
              {updateFiles.length} to update
            </span>
          </div>
        </div>
      </div>

      {/* Files to Create Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 font-mono">
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span>FILES TO CREATE ({createFiles.length})</span>
        </div>

        <div className="space-y-2.5">
          {createFiles.map((file) => {
            const originalIndex = files.findIndex((f) => f.id === file.id);
            return (
              <div
                key={file.id}
                className="p-3.5 rounded bg-[#161b22] border border-[#30363d] hover:border-gray-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-1.5 py-0.2 rounded bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                      CREATE
                    </span>
                    <span className="font-mono text-xs font-semibold text-gray-200 truncate">
                      {file.path}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {file.purpose}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleCopy(file)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-300 text-xs font-mono transition-colors"
                  >
                    {copiedId === file.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-gray-400" />}
                    <span>{copiedId === file.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectFileForPreview(originalIndex)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-950/50 hover:bg-blue-900/60 border border-blue-800/50 text-blue-300 text-xs font-mono transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View in Editor</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Files to Update Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 font-mono">
          <Edit3 className="w-4 h-4 text-amber-400" />
          <span>FILES TO UPDATE ({updateFiles.length})</span>
        </div>

        <div className="space-y-2.5">
          {updateFiles.map((file) => {
            const originalIndex = files.findIndex((f) => f.id === file.id);
            return (
              <div
                key={file.id}
                className="p-3.5 rounded bg-[#161b22] border border-[#30363d] hover:border-gray-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-1.5 py-0.2 rounded bg-amber-950/80 border border-amber-800/60 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                      UPDATE
                    </span>
                    <span className="font-mono text-xs font-semibold text-gray-200 truncate">
                      {file.path}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {file.purpose}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleCopy(file)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-300 text-xs font-mono transition-colors"
                  >
                    {copiedId === file.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-gray-400" />}
                    <span>{copiedId === file.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectFileForPreview(originalIndex)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-950/50 hover:bg-amber-900/60 border border-amber-800/50 text-amber-300 text-xs font-mono transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Compare Diff</span>
                  </button>
                </div>
              </div>
            );
          })}
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
          <span>Back to Analysis</span>
        </button>

        <button
          type="button"
          onClick={onProceed}
          className="flex items-center gap-1.5 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium shadow-xs transition-colors"
        >
          <span>Proceed to Generated Files</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
