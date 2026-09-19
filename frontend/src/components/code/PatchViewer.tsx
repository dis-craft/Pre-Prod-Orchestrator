'use client';

import React, { useState } from 'react';
import { FileDiff, Check, Copy } from 'lucide-react';
import { clsx } from 'clsx';

interface PatchViewerProps {
  patch: string;
  filesChanged: string[];
}

export function PatchViewer({ patch, filesChanged }: PatchViewerProps) {
  const [activeFile, setActiveFile] = useState<string>(filesChanged[0] || 'src/auth/login.js');
  const [copied, setCopied] = useState(false);

  const lines = patch.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(patch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded border border-[#30363d] bg-[#0d1117] overflow-hidden font-mono text-xs">
      {/* File Selection Tabs Header */}
      <div className="px-3.5 py-1.5 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto">
          <FileDiff className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-xs font-sans font-semibold text-gray-300 mr-1">Files Changed:</span>
          {filesChanged.map((file) => (
            <button
              key={file}
              onClick={() => setActiveFile(file)}
              className={clsx(
                'px-2 py-0.5 rounded text-xs font-mono transition-colors border',
                activeFile === file
                  ? 'bg-[#21262d] text-gray-100 border-[#30363d] font-semibold'
                  : 'bg-[#0d1117] text-gray-400 border-transparent hover:text-gray-200'
              )}
            >
              {file}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-200 bg-[#21262d] border border-[#30363d] px-2 py-0.5 rounded transition-colors shrink-0"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy Diff'}</span>
        </button>
      </div>

      {/* Diff Content Rendering */}
      <div className="p-1 overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const isAddition = line.startsWith('+') && !line.startsWith('+++');
              const isDeletion = line.startsWith('-') && !line.startsWith('---');
              const isHeader = line.startsWith('---') || line.startsWith('+++') || line.startsWith('@@');

              return (
                <tr
                  key={idx}
                  className={clsx(
                    isAddition && 'bg-emerald-950/30 text-emerald-400 border-l-2 border-emerald-500',
                    isDeletion && 'bg-red-950/30 text-red-400 border-l-2 border-red-500',
                    isHeader && 'bg-[#161b22] text-gray-400 font-semibold py-0.5',
                    !isAddition && !isDeletion && !isHeader && 'text-gray-300 hover:bg-[#161b22]/40'
                  )}
                >
                  <td className="w-9 py-0.5 pr-2 text-right text-gray-600 select-none text-[11px] font-mono border-r border-[#30363d]/30">
                    {idx + 1}
                  </td>
                  <td className="py-0.5 pl-3 whitespace-pre code-font">
                    {line}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
