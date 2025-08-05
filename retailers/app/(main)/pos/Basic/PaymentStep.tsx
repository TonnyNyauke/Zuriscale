'use client';
import React from 'react';
import { CreditCard } from 'lucide-react';
import { CustomerData } from '@/app/types/pos';
import { formatCurrency } from '@/app/types/pos';

interface PaymentStepProps {
  customerData: CustomerData;
  total: number;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({ customerData, total }) => (
  <div className="max-w-2xl mx-auto">
    <section className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
      <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
      
      <div className="p-6 border-2 border-teal-200 bg-teal-50 rounded-xl">
        <div className="flex items-center justify-center mb-4">
          <CreditCard className="w-12 h-12 text-teal-600" />
        </div>
        <h3 className="font-semibold text-center text-teal-800 mb-2 text-lg">Intasend Payment</h3>
        <p className="text-sm text-teal-700 text-center mb-4">
          Secure payment via M-Pesa, Card, or Bank Transfer
        </p>
        <div className="bg-white p-4 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Customer:</span>
              <span className="font-medium">{customerData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{customerData.phone}</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-xl border-t pt-3">
            <span>Total:</span>
            <span className="text-teal-600">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
);