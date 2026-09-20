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
  const [mode, setModeState] = useState<AppMode>('normal');

  const handleSetMode = useCallback((newMode: AppMode) => {
    if (newMode === 'normal') {
      simulatorEngine.stop();
      demoStore.resetState();
      orchestratorService.setMode('normal');
    } else if (newMode === 'demo') {
      demoStore.resetState();
      simulatorEngine.reset();
      orchestratorService.setMode('demo');
    }

    setModeState(newMode);
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
    } catch {
      // Ignore storage errors
    }
  }, []);

  React.useEffect(() => {
    try {
      const savedMode = localStorage.getItem(STORAGE_KEY) as AppMode | null;
      if (savedMode === 'demo') {
        handleSetMode('demo');
      }
    } catch {
      // Ignore
    }
  }, [handleSetMode]);

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
