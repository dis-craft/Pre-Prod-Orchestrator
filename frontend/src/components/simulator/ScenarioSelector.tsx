'use client';

import React, { useEffect, useState } from 'react';
import { ALL_SCENARIOS } from '../../lib/simulator/scenarios';
import { simulatorEngine } from '../../lib/simulator/engine';
import { Layers } from 'lucide-react';

export function ScenarioSelector() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('sql-injection');

  useEffect(() => {
    const update = () => {
      setActiveScenarioId(simulatorEngine.getStatus().activeScenario.id);
    };
    update();
    return simulatorEngine.subscribe(update);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    setActiveScenarioId(newId);
    simulatorEngine.setScenario(newId);
  };

  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      <Layers className="w-3.5 h-3.5 text-gray-400 shrink-0" />
      <span className="text-gray-500 select-none hidden sm:inline">Scenario:</span>
      <select
        value={activeScenarioId}
        onChange={handleChange}
        className="bg-[#0d1117] border border-[#30363d] rounded px-2 py-1 text-xs text-gray-200 font-medium focus:outline-none focus:border-gray-500 cursor-pointer"
      >
        {ALL_SCENARIOS.map((sc) => (
          <option key={sc.id} value={sc.id}>
            {sc.name}
          </option>
        ))}
      </select>
    </div>
  );
}
