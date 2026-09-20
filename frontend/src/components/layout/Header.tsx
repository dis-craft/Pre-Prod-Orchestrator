'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, RotateCcw, GitBranch, Terminal, LogOut, PlayCircle, Menu } from 'lucide-react';
import { orchestratorService } from '../../lib/services/orchestrator';
import { useAppMode } from '../../lib/mode/modeContext';

interface HeaderProps {
  onToggleMobileMenu?: () => void;
}

export function Header({ onToggleMobileMenu }: HeaderProps) {
  const router = useRouter();
  const { setMode, isDemoMode } = useAppMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [repositoryName, setRepositoryName] = useState('Loading repository…');

  useEffect(() => {
    if (isDemoMode) return;
    let active = true;
    void orchestratorService.getRepositories().then((repos) => {
      if (active && repos[0]) setRepositoryName(`${repos[0].owner}/${repos[0].name}`);
    }).catch(() => {
      if (active) setRepositoryName('Repository unavailable');
    });
    return () => { active = false; };
  }, [isDemoMode]);

  const handleResetDemo = async () => {
    setIsResetting(true);
    await orchestratorService.resetDemoData();
    setTimeout(() => {
      setIsResetting(false);
      router.push('/dashboard');
    }, 300);
  };

  return (
    <header className="h-12 border-b border-[#30363d] bg-[#161b22] px-3 sm:px-4 flex items-center justify-between sticky top-0 z-20 font-sans text-xs gap-2 min-w-0">
      {/* Mobile Menu Button + Search & Repo Tag */}
      <div className="flex items-center gap-2 flex-1 min-w-0 max-w-xl">
        {/* Mobile Hamburger Drawer Trigger */}
        <button
          onClick={onToggleMobileMenu}
          aria-label="Toggle Menu"
          className="md:hidden p-1.5 rounded text-gray-400 hover:text-gray-100 hover:bg-[#21262d] transition-colors shrink-0"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Repo Tag (Desktop/Tablet) */}
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-[#0d1117] border border-[#30363d] text-xs text-gray-300 font-mono shrink-0">
          <GitBranch className="w-3.5 h-3.5 text-gray-400" />
          <span className="truncate max-w-[120px] md:max-w-none">
            {isDemoMode ? 'acme-corp/payments-api' : repositoryName}
          </span>
        </div>

        {/* Global Search Input */}
        <div className="relative flex-1 min-w-0">
          <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search findings, rules..."
            className="w-full bg-[#0d1117] border border-[#30363d] rounded pl-8 pr-2.5 py-1 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
          />
        </div>
      </div>

      {/* Right Action Controls & Mode Switcher */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 font-mono">
        {/* Mode-dependent Controls */}
        {isDemoMode ? (
          <>
            {/* Demo Mode Indicator */}
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-amber-950/40 text-amber-400 border border-amber-800/50 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="hidden sm:inline">DEMO MODE</span>
              <span className="sm:hidden">DEMO</span>
            </div>

            {/* Reset Demo State Button */}
            <button
              onClick={handleResetDemo}
              disabled={isResetting}
              title="Reset simulated demo state"
              className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded text-xs text-gray-400 bg-[#0d1117] border border-[#30363d] hover:text-gray-200 hover:border-gray-500 transition-colors disabled:opacity-50"
            >
              <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
              <span>Reset</span>
            </button>

            {/* Exit Demo Button */}
            <button
              onClick={() => setMode('normal')}
              title="Exit Demo Mode and return to Normal product"
              className="flex items-center gap-1 px-2 py-1 rounded text-xs text-red-300 bg-red-950/30 border border-red-900/50 hover:bg-red-900/40 transition-colors"
            >
              <LogOut className="w-3 h-3" />
              <span className="hidden sm:inline">Exit Demo</span>
              <span className="sm:hidden">Exit</span>
            </button>
          </>
        ) : (
          /* Normal Mode Environment Control */
          <div className="flex items-center gap-1.5">
            <span className="hidden sm:inline text-gray-400 text-[11px]">Env:</span>
            <span className="px-1.5 py-0.5 rounded bg-[#0d1117] text-emerald-400 border border-emerald-900/50 text-[11px] font-medium">
              Normal
            </span>
            <button
              onClick={() => setMode('demo')}
              title="Enter interactive simulation Demo Mode"
              className="flex items-center gap-1 px-2 py-1 rounded text-xs text-gray-300 bg-[#0d1117] border border-[#30363d] hover:text-gray-100 hover:border-gray-500 transition-colors"
            >
              <PlayCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden sm:inline">Enter Demo Mode</span>
              <span className="sm:hidden">Demo</span>
            </button>
          </div>
        )}

        {/* System Terminal Status (Desktop Only) */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded bg-[#0d1117] border border-[#30363d] text-xs text-gray-400">
          <Terminal className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[11px]">v1.62</span>
        </div>
      </div>
    </header>
  );
}
