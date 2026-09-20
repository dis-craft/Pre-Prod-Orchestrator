import React, { useState } from 'react';
import { PlannedFile } from '../../lib/types/setup';
import { 
  FileCode, 
  Copy, 
  Check, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Eye, 
  FileDiff, 
  FolderTree, 
  Maximize2, 
  Minimize2,
  AlertCircle
} from 'lucide-react';
import { clsx } from 'clsx';

interface StepGeneratedFilesProps {
  files: PlannedFile[];
  selectedFileIndex: number;
  onSelectFile: (index: number) => void;
  onProceed: () => void;
  onBack: () => void;
}

export function StepGeneratedFiles({
  files,
  selectedFileIndex,
  onSelectFile,
  onProceed,
  onBack,
}: StepGeneratedFilesProps) {
  const [viewMode, setViewMode] = useState<'code' | 'diff'>('code');
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const activeFile = files[selectedFileIndex] || files[0];
  const hasDiff = Boolean(activeFile?.originalContent);

  const handleCopy = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = activeFile ? activeFile.content.split('\n') : [];

  // Generate simple diff lines for preview
  const renderDiff = () => {
    if (!activeFile?.originalContent) return null;
    const origLines = activeFile.originalContent.split('\n');
    const newLines = activeFile.content.split('\n');

    return (
      <div className="overflow-x-auto font-mono text-xs">
        <table className="w-full border-collapse">
          <tbody>
            <tr className="bg-[#161b22] text-gray-500 text-[11px]">
              <td colSpan={2} className="px-3 py-1 font-semibold">--- Original {activeFile.path}</td>
            </tr>
            {origLines.map((l, i) => (
              <tr key={`orig-${i}`} className="bg-red-950/20 text-red-400 border-l-2 border-red-600/60">
                <td className="w-10 py-0.5 pr-2 text-right text-gray-600 select-none text-[11px] font-mono border-r border-[#30363d]/30">
                  {i + 1}
                </td>
                <td className="py-0.5 pl-3 whitespace-pre">
                  - {l}
                </td>
              </tr>
            ))}
            <tr className="bg-[#161b22] text-gray-500 text-[11px]">
              <td colSpan={2} className="px-3 py-1 font-semibold">+++ Proposed {activeFile.path}</td>
            </tr>
            {newLines.map((l, i) => (
              <tr key={`new-${i}`} className="bg-emerald-950/25 text-emerald-400 border-l-2 border-emerald-500">
                <td className="w-10 py-0.5 pr-2 text-right text-gray-600 select-none text-[11px] font-mono border-r border-[#30363d]/30">
                  {i + 1}
                </td>
                <td className="py-0.5 pl-3 whitespace-pre">
                  + {l}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Step Header */}
      <div className="bg-[#161b22] border border-[#30363d] rounded p-4 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-sm font-semibold text-gray-100 flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-blue-400" />
            Generated Configuration & Workflow Files
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Inspect the synthesized YAML workflows, JSON descriptors, and security policy rules before simulating CI deployment.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0d1117] border border-[#30363d] text-[11px] font-mono text-gray-400">
          <AlertCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>Preview only — no repository files modified</span>
        </div>
      </div>

      {/* Code Explorer Split Panel */}
      <div className={clsx(
        'grid grid-cols-1 md:grid-cols-12 gap-3 transition-all',
        expanded && 'fixed inset-4 z-50 bg-[#0d1117] p-4 rounded border border-[#30363d] shadow-2xl overflow-hidden'
      )}>
        {/* Left Side: File Explorer */}
        <div className="md:col-span-4 bg-[#161b22] border border-[#30363d] rounded flex flex-col overflow-hidden">
          <div className="px-3.5 py-2 border-b border-[#30363d] bg-[#0d1117] flex items-center justify-between text-xs font-mono text-gray-400">
            <span>REPOSITORY FILES ({files.length})</span>
            <span className="text-[10px] text-gray-500">SELECT TO VIEW</span>
          </div>

          <div className="p-2 space-y-1 overflow-y-auto max-h-[420px]">
            {files.map((file, idx) => {
              const isSelected = idx === selectedFileIndex;
              const isCreate = file.action === 'CREATE';

              return (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => {
                    onSelectFile(idx);
                    if (viewMode === 'diff' && !file.originalContent) {
                      setViewMode('code');
                    }
                  }}
                  className={clsx(
                    'w-full text-left p-2.5 rounded text-xs font-mono transition-all flex items-center justify-between gap-2 border',
                    isSelected
                      ? 'bg-[#21262d] text-gray-100 border-[#58a6ff]/50 font-semibold shadow-xs'
                      : 'bg-[#0d1117]/60 text-gray-400 border-transparent hover:text-gray-200 hover:bg-[#21262d]/40'
                  )}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileCode className={clsx('w-3.5 h-3.5 shrink-0', isSelected ? 'text-blue-400' : 'text-gray-500')} />
                    <span className="truncate">{file.path}</span>
                  </div>

                  <span
                    className={clsx(
                      'text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase tracking-wider shrink-0 border',
                      isCreate
                        ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                        : 'bg-amber-950/60 text-amber-400 border-amber-800/40'
                    )}
                  >
                    {file.action}
                  </span>
                </button>
              );
            })}
          </div>

          {activeFile && (
            <div className="p-3 border-t border-[#30363d] bg-[#0d1117]/80 text-[11px] text-gray-400">
              <span className="text-gray-300 font-semibold block mb-0.5">Purpose:</span>
              <p className="leading-relaxed">{activeFile.purpose}</p>
            </div>
          )}
        </div>

        {/* Right Side: Code Editor / Viewer */}
        <div className="md:col-span-8 bg-[#161b22] border border-[#30363d] rounded flex flex-col overflow-hidden">
          {/* Editor Header Bar */}
          <div className="px-3.5 py-2 border-b border-[#30363d] bg-[#0d1117] flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
            <div className="flex items-center gap-2 min-w-0">
              <FileCode className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="text-gray-200 font-semibold truncate">{activeFile?.path}</span>
              <span className="text-[10px] text-gray-500 px-1.5 py-0.5 rounded bg-[#21262d] border border-[#30363d]">
                {lines.length} lines • {activeFile?.language}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Diff Toggle if applicable */}
              {hasDiff && (
                <div className="flex items-center rounded bg-[#21262d] p-0.5 border border-[#30363d]">
                  <button
                    type="button"
                    onClick={() => setViewMode('code')}
                    className={clsx(
                      'px-2 py-0.5 rounded text-[11px] transition-colors',
                      viewMode === 'code' ? 'bg-[#30363d] text-gray-100 font-semibold' : 'text-gray-400 hover:text-gray-200'
                    )}
                  >
                    Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('diff')}
                    className={clsx(
                      'px-2 py-0.5 rounded text-[11px] transition-colors flex items-center gap-1',
                      viewMode === 'diff' ? 'bg-[#30363d] text-amber-300 font-semibold' : 'text-gray-400 hover:text-gray-200'
                    )}
                  >
                    <FileDiff className="w-3 h-3 text-amber-400" />
                    <span>Diff</span>
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-300 text-[11px] transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-gray-400" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="p-1 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-400 hover:text-gray-200 transition-colors"
                title={expanded ? 'Minimize' : 'Expand Editor'}
              >
                {expanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Editor Body */}
          <div className="flex-1 p-2 bg-[#0d1117] overflow-y-auto max-h-[380px]">
            {viewMode === 'diff' && hasDiff ? (
              renderDiff()
            ) : (
              <div className="overflow-x-auto font-mono text-xs">
                <table className="w-full border-collapse">
                  <tbody>
                    {lines.map((line, idx) => (
                      <tr key={idx} className="hover:bg-[#161b22]/50 text-gray-300">
                        <td className="w-10 py-0.5 pr-3 text-right text-gray-600 select-none text-[11px] font-mono border-r border-[#30363d]/30 shrink-0">
                          {idx + 1}
                        </td>
                        <td className="py-0.5 pl-3 whitespace-pre code-font text-gray-300">
                          {line}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
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
          <span>Back to Plan</span>
        </button>

        <button
          type="button"
          onClick={onProceed}
          className="flex items-center gap-1.5 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium shadow-xs transition-colors"
        >
          <span>Configure GitHub Actions</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
