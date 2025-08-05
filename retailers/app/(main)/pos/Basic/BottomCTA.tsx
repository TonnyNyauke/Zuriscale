'use client';
import React from 'react';
import { Smartphone } from 'lucide-react';
import { SaleItem, CustomerData } from '@/app/types/pos';

interface BottomCTAProps {
  currentStep: string;
  saleItems: SaleItem[];
  customerData: CustomerData;
  onContinueToCustomer: () => void;
  onContinueToPayment: () => void;
  onCompleteSale: () => void;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({ 
  currentStep, 
  saleItems, 
  customerData, 
  onContinueToCustomer, 
  onContinueToPayment, 
  onCompleteSale 
}) => {
  const canProceedToCustomer = saleItems.length > 0;
  const canProceedToPayment = customerData.name.trim() && customerData.phone.trim();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg lg:relative lg:border-0 lg:shadow-none lg:bg-transparent lg:p-0 lg:mt-6 z-40">
      <div className="max-w-6xl mx-auto">
        {currentStep === 'sale' && (
          <button
            onClick={onContinueToCustomer}
            disabled={!canProceedToCustomer}
            className="w-full bg-teal-600 text-white py-4 rounded-xl font-semibold hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-base"
          >
            Continue to Customer Info ({saleItems.length} items)
          </button>
        )}
        
        {currentStep === 'customer' && (
          <button
            onClick={onContinueToPayment}
            disabled={!canProceedToPayment}
            className="w-full bg-teal-600 text-white py-4 rounded-xl font-semibold hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-base"
          >
            Continue to Payment
          </button>
        )}
        
        {currentStep === 'payment' && (
          <button
            onClick={onCompleteSale}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors text-base flex items-center justify-center"
          >
            <Smartphone className="w-5 h-5 mr-2" />
            Complete Sale & Send Receipt
          </button>
        )}
      </div>
    </div>
  );
};