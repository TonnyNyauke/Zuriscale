'use client';
import React from 'react';
import { Smartphone } from 'lucide-react';

interface BottomCTAProps {
  currentStep: 'sale' | 'customer' | 'payment' | 'complete';
  itemCount: number;
  canProceedToCustomer: boolean;
  canProceedToPayment: boolean;
  onContinueToCustomer: () => void;
  onContinueToPayment: () => void;
  onCompleteSale: () => void;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({ 
  currentStep,
  itemCount,
  canProceedToCustomer,
  canProceedToPayment,
  onContinueToCustomer,
  onContinueToPayment,
  onCompleteSale 
}) => {
  const getButtonContent = () => {
    switch (currentStep) {
      case 'sale':
        return {
          text: `Continue to Customer Info (${itemCount} items)`,
          onClick: onContinueToCustomer,
          disabled: !canProceedToCustomer,
          className: "bg-teal-600 hover:bg-teal-700"
        };
      
      case 'customer':
        return {
          text: "Continue to Payment",
          onClick: onContinueToPayment,
          disabled: !canProceedToPayment,
          className: "bg-teal-600 hover:bg-teal-700"
        };
      
      case 'payment':
        return {
          text: "Complete Sale & Send Receipt",
          onClick: onCompleteSale,
          disabled: false,
          className: "bg-green-600 hover:bg-green-700",
          icon: <Smartphone className="w-5 h-5 mr-2" />
        };
      
      default:
        return null;
    }
  };

  const buttonConfig = getButtonContent();
  
  if (!buttonConfig) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg lg:relative lg:border-0 lg:shadow-none lg:bg-transparent lg:p-0 lg:mt-6 z-40">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={buttonConfig.onClick}
          disabled={buttonConfig.disabled}
          className={`w-full text-white py-4 rounded-xl font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-base flex items-center justify-center ${buttonConfig.className}`}
        >
          {buttonConfig.icon}
          {buttonConfig.text}
        </button>
      </div>
    </div>
  );
};