'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TierType, getTierPlan } from '../types/tiers';

interface TierContextType {
  currentTier: TierType;
  setCurrentTier: (tier: TierType) => void;
  tierPlan: ReturnType<typeof getTierPlan>;
  isFeatureAvailable: (featureId: string) => boolean;
  getFeatureLimit: (featureId: string) => string | number | undefined;
}

const TierContext = createContext<TierContextType | undefined>(undefined);

interface TierProviderProps {
  children: ReactNode;
  initialTier?: TierType;
}

export function TierProvider({ children, initialTier = 'basic' }: TierProviderProps) {
  const [currentTier, setCurrentTier] = useState<TierType>(initialTier);

  // Load tier from localStorage on mount
  useEffect(() => {
    const savedTier = localStorage.getItem('selectedTier') as TierType;
    if (savedTier && ['basic', 'standard', 'pro'].includes(savedTier)) {
      setCurrentTier(savedTier);
    }
  }, []);

  // Save tier to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('selectedTier', currentTier);
  }, [currentTier]);

  const tierPlan = getTierPlan(currentTier);

  const isFeatureAvailable = (featureId: string): boolean => {
    return tierPlan.features.some(feature => feature.id === featureId);
  };

  const getFeatureLimit = (featureId: string): string | number | undefined => {
    const feature = tierPlan.features.find(f => f.id === featureId);
    return feature?.limit;
  };

  const value: TierContextType = {
    currentTier,
    setCurrentTier,
    tierPlan,
    isFeatureAvailable,
    getFeatureLimit
  };

  return (
    <TierContext.Provider value={value}>
      {children}
    </TierContext.Provider>
  );
}

export function useTier() {
  const context = useContext(TierContext);
  if (context === undefined) {
    throw new Error('useTier must be used within a TierProvider');
  }
  return context;
}

// Hook for conditional feature rendering
export function useFeature(featureId: string) {
  const { isFeatureAvailable, getFeatureLimit } = useTier();
  
  return {
    isAvailable: isFeatureAvailable(featureId),
    limit: getFeatureLimit(featureId)
  };
}