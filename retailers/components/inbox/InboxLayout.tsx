// src/components/inbox/InboxLayout.tsx
'use client';

import React from 'react';
import { useEnergy } from '../ui/EnergyProvider';

export default function InboxLayout({ children }: { children: React.ReactNode }) {
  const { energyMode } = useEnergy();

  return (
    <div className={`h-full flex flex-col ${
      energyMode ? 'bg-gradient-to-br from-[#E6F7FF] to-[#F0FFF4]' : 'bg-gray-50'
    }`}>
      <div className="border-b px-6 py-4">
        <h1 className={`text-2xl font-bold ${
          energyMode ? 'text-[#004E89]' : 'text-gray-900'
        }`}>
          WhatsApp Inbox
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Engage with customers directly through WhatsApp
        </p>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}