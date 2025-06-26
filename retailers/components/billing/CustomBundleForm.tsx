// src/components/billing/CustomBundleForm.tsx
'use client';

import React from 'react';
import { useEnergy } from '../ui/EnergyProvider';

interface CustomBundleFormProps {
  credits: number;
  onChange: (credits: number) => void;
}

export default function CustomBundleForm({ credits, onChange }: CustomBundleFormProps) {
  const { energyMode } = useEnergy();
  
  const presetCredits = [100, 250, 500, 1000, 2500];
  
  return (
    <div>
      <h3 className="font-medium text-gray-900 mb-4">WhatsApp Credits Needed</h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {presetCredits.map(amount => (
          <button
            key={amount}
            type="button"
            onClick={() => onChange(amount)}
            className={`px-4 py-2 rounded-lg ${
              credits === amount
                ? energyMode
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF9E58] text-white'
                  : 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {amount.toLocaleString()}
          </button>
        ))}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Or enter custom amount:
        </label>
        <div className="flex">
          <div className="flex items-center justify-center px-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
            <span className="text-gray-500">Messages</span>
          </div>
          <input
            type="number"
            value={credits}
            onChange={(e) => onChange(Number(e.target.value))}
            min="10"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Minimum 10 messages. You'll get 20% SMS credits free.
        </p>
      </div>
    </div>
  );
}