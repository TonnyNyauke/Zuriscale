// src/components/billing/PaymentMethodSelector.tsx
'use client';

import React from 'react';
import { useEnergy } from '../ui/EnergyProvider';

interface PaymentMethodSelectorProps {
  method: 'mpesa' | 'card';
  onChange: (method: 'mpesa' | 'card') => void;
}

export default function PaymentMethodSelector({ 
  method, 
  onChange 
}: PaymentMethodSelectorProps) {
  const { energyMode } = useEnergy();
  
  return (
    <div className="space-y-3">
      <button
        onClick={() => onChange('mpesa')}
        className={`w-full p-4 border rounded-lg flex items-center ${
          method === 'mpesa'
            ? energyMode
              ? 'border-[#FF6B35] bg-orange-50'
              : 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white text-xl mr-3">
          M
        </div>
        <div>
          <div className="font-medium">M-Pesa</div>
          <div className="text-sm text-gray-600">Pay with mobile money</div>
        </div>
        <div className="ml-auto">
          {method === 'mpesa' && (
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
      </button>
      
      <button
        onClick={() => onChange('card')}
        className={`w-full p-4 border rounded-lg flex items-center ${
          method === 'card'
            ? energyMode
              ? 'border-[#FF6B35] bg-orange-50'
              : 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl mr-3">
          💳
        </div>
        <div>
          <div className="font-medium">Credit/Debit Card</div>
          <div className="text-sm text-gray-600">Visa, Mastercard, etc.</div>
        </div>
        <div className="ml-auto">
          {method === 'card' && (
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
      </button>
    </div>
  );
}