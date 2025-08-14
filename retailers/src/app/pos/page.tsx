'use client';

import React from 'react';
import { useTier } from '@/shared/context/TierContext';
import { BasicPOS } from '@/features/pos/basic/components/BasicPOS';
import { StandardPOS } from '@/features/pos/standard/components/StandardPOS';
import { ProPOS } from '@/features/pos/pro/components/ProPOS';
import { UpgradePrompt } from '@/shared/components/FeatureGate';

export default function POSPage() {
  const { currentTier } = useTier();

  const renderPOSByTier = () => {
    switch (currentTier) {
      case 'basic':
        return <BasicPOS />;
      case 'standard':
        return <StandardPOS />;
      case 'pro':
        return <ProPOS />;
      default:
        return <BasicPOS />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Point of Sale System
          </h1>
          <p className="text-gray-600">
            Current Plan: <span className="font-semibold capitalize">{currentTier}</span>
          </p>
        </div>

        {renderPOSByTier()}
      </div>
    </div>
  );
}