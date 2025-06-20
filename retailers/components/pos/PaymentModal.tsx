// src/components/pos/PaymentModal.tsx
'use client';

import React, { useState } from 'react';
import { useEnergy } from '../ui/EnergyProvider';

interface PaymentModalProps {
  total: number;
  onClose: () => void;
  onComplete: () => void;
}

export default function PaymentModal({ total, onClose, onComplete }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'cash' | 'card'>('mpesa');
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { energyMode } = useEnergy();
  
  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`w-full max-w-md rounded-xl overflow-hidden ${
        energyMode ? 'bg-gradient-to-b from-[#F8F9FA] to-[#FFF9F0]' : 'bg-white'
      }`}>
        <div className={`p-6 ${
          energyMode ? 'bg-gradient-to-r from-[#004E89] to-[#002D54] text-white' : 'bg-gray-50'
        }`}>
          <h2 className="text-xl font-bold">Complete Payment</h2>
          <p className="mt-1">Total: KES {total.toLocaleString()}</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPaymentMethod('mpesa')}
                className={`p-4 border rounded-lg flex flex-col items-center ${
                  paymentMethod === 'mpesa'
                    ? energyMode
                      ? 'border-[#FF6B35] bg-orange-50'
                      : 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <span className="text-xl mb-1">📱</span>
                <span className="text-xs">M-Pesa</span>
              </button>
              
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`p-4 border rounded-lg flex flex-col items-center ${
                  paymentMethod === 'cash'
                    ? energyMode
                      ? 'border-[#FF6B35] bg-orange-50'
                      : 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <span className="text-xl mb-1">💵</span>
                <span className="text-xs">Cash</span>
              </button>
              
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 border rounded-lg flex flex-col items-center ${
                  paymentMethod === 'card'
                    ? energyMode
                      ? 'border-[#FF6B35] bg-orange-50'
                      : 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <span className="text-xl mb-1">💳</span>
                <span className="text-xs">Card</span>
              </button>
            </div>
          </div>
          
          {paymentMethod === 'mpesa' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                M-Pesa Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07XX XXX XXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={isProcessing || (paymentMethod === 'mpesa' && !phone)}
              className={`px-4 py-2 rounded-lg font-medium ${
                isProcessing || (paymentMethod === 'mpesa' && !phone)
                  ? 'bg-gray-300 text-gray-500'
                  : energyMode
                    ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF9E58] text-white'
                    : 'bg-blue-600 text-white'
              }`}
            >
              {isProcessing ? 'Processing...' : 'Confirm Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}