// src/context/EnergyContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EnergyContextType {
  energyMode: boolean;
  toggleEnergyMode: () => void;
}

const EnergyContext = createContext<EnergyContextType | undefined>(undefined);

export const EnergyProvider = ({ children }: { children: ReactNode }) => {
  const [energyMode, setEnergyMode] = useState(true);

  const toggleEnergyMode = () => {
    setEnergyMode(!energyMode);
  };

  return (
    <EnergyContext.Provider value={{ energyMode, toggleEnergyMode }}>
      {children}
    </EnergyContext.Provider>
  );
};

export const useEnergy = () => {
  const context = useContext(EnergyContext);
  if (context === undefined) {
    throw new Error('useEnergy must be used within an EnergyProvider');
  }
  return context;
};