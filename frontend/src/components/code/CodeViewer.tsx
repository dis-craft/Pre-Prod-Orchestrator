'use client';

import React from 'react';
import { Copy, AlertCircle, FileCode } from 'lucide-react';

interface CodeViewerProps {
  filePath: string;
  startLine: number;
  snippet: string;
  vulnerableLineNumber?: number;
  explanation?: string;
}

export function CodeViewer({
  filePath,
  startLine,
  snippet,
  vulnerableLineNumber = 42,
  explanation,
}: CodeViewerProps) {
  const lines = snippet.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
  };

  return (
    <div className="rounded border border-[#30363d] bg-[#0d1117] overflow-hidden font-mono text-xs max-w-full">
      {/* Code Header Bar */}
      <div className="px-3 py-1.5 bg-[#161b22] border-b border-[#30363d] flex flex-wrap items-center justify-between gap-2 text-gray-300">
        <div className="flex items-center gap-2 min-w-0">
          <FileCode className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="font-semibold text-gray-200 truncate max-w-[140px] sm:max-w-xs md:max-w-none">
            {filePath}
          </span>
          <span className="text-[10px] text-gray-500 bg-[#21262d] px-1.5 py-0.5 rounded border border-[#30363d] shrink-0">
            Lines {startLine} - {startLine + lines.length - 1}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-200 bg-[#21262d] border border-[#30363d] px-2 py-0.5 rounded transition-colors shrink-0"
        >
          <Copy className="w-3 h-3" />
          <span>Copy</span>
        </button>
      </div>

      {/* Bounded Code Snippet Table Container */}
      <div className="p-1 overflow-x-auto max-w-full">
        <table className="w-full border-collapse min-w-max">
          <tbody>
            {lines.map((lineText, idx) => {
              const match = lineText.match(/^(\d+):\s?(.*)$/);
              let lineNum = startLine + idx;
              let code = lineText;

              if (match) {
                lineNum = parseInt(match[1], 10);
                code = match[2];
              }

              const isVulnerable = lineNum === vulnerableLineNumber || lineText.includes('SELECT * FROM users');

              return (
                <tr
                  key={idx}
                  className={
                    isVulnerable
                      ? 'bg-red-950/30 border-l-2 border-red-500 text-red-300'
                      : 'hover:bg-[#161b22]/50 text-gray-300'
                  }
                >
                  <td className="w-10 py-1 pr-3 text-right text-gray-600 select-none text-[11px] font-mono border-r border-[#30363d]/40 shrink-0">
                    {lineNum}
                  </td>
                  <td className="py-1 pl-3 whitespace-pre code-font">
                    {isVulnerable && (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-red-500/15 text-red-400 border border-red-800/40 px-1.5 py-0.2 rounded mr-2 select-none">
                        <AlertCircle className="w-2.5 h-2.5 shrink-0" />
                        VULNERABLE LINE
                      </span>
                    )}
                    <span>{code}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Technical Explanation Footer */}
      {explanation && (
        <div className="p-3 bg-[#161b22] border-t border-[#30363d] flex items-start gap-2 text-xs font-sans text-gray-300">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-gray-200 block">Security Context</span>
            <p className="text-gray-400 leading-relaxed mt-0.5">{explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
