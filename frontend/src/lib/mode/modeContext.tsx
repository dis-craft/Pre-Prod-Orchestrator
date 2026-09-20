'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { orchestratorService, AppMode } from '../services/orchestrator';
import { simulatorEngine } from '../simulator/engine';
import { demoStore } from '../demo/state';

interface AppModeContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  isDemoMode: boolean;
}

const AppModeContext = createContext<AppModeContextType>({
  mode: 'normal',
  setMode: () => {},
  isDemoMode: false,
});

const STORAGE_KEY = 'preprod_orchestrator_app_mode';

function getInitialMode(): AppMode {
  if (typeof window === 'undefined') return 'normal';
  try {
    const savedMode = localStorage.getItem(STORAGE_KEY) as AppMode | null;
    if (savedMode === 'demo' || savedMode === 'normal') {
      return savedMode;
    }
  } catch {
    // Ignore storage errors
  }
  return 'normal';
}

export function AppModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<AppMode>(() => {
    const initial = getInitialMode();
    orchestratorService.setMode(initial);
    if (initial === 'demo') {
      demoStore.resetState();
      simulatorEngine.reset();
    } else {
      simulatorEngine.stop();
    }
    return initial;
  });

  const handleSetMode = useCallback((newMode: AppMode) => {
    if (newMode === 'normal') {
      // 1. Stop simulator engine & cancel all active timers
      simulatorEngine.stop();
      // 2. Clear & reset demo store state so it stays isolated
      demoStore.resetState();
      // 3. Switch orchestrator service data adapter to Normal mode
      orchestratorService.setMode('normal');
    } else if (newMode === 'demo') {
      // 1. Reset demo store to deterministic clean initial state
      demoStore.resetState();
      // 2. Initialize simulator engine cleanly
      simulatorEngine.reset();
      // 3. Switch orchestrator service data adapter to Demo mode
      orchestratorService.setMode('demo');
    }

    setModeState(newMode);
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  return (
    <AppModeContext.Provider
      value={{
        mode,
        setMode: handleSetMode,
        isDemoMode: mode === 'demo',
      }}
    >
      {children}
    </AppModeContext.Provider>
  );
}

export function useAppMode() {
  const context = useContext(AppModeContext);
  if (!context) {
    throw new Error('useAppMode must be used within an AppModeProvider');
  }
  return context;
}
