// src/components/campaigns/CreateCampaignButton.tsx
'use client';

import React, { useState } from 'react';
import { useEnergy } from '../ui/EnergyProvider';
import CreateCampaignModal from './CreateCampaignModal';


export default function CreateCampaignButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { energyMode } = useEnergy();
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`px-4 py-2 rounded-lg font-medium flex items-center ${
          energyMode
            ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF9E58] text-white'
            : 'bg-blue-600 text-white'
        }`}
      >
        <span className="mr-2">+</span> Create Campaign
      </button>
      
      {isOpen && <CreateCampaignModal onClose={() => setIsOpen(false)} />}
    </>
  );
}