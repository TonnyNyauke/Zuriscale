'use client';
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Sale } from '@/app/types/pos';
import { formatCurrency } from '@/app/types/pos';

interface SuccessScreenProps {
  sale: Sale;
  onNewSale: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ sale, onNewSale }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full mx-auto">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Sale Completed!</h2>
        <p className="text-gray-600 text-sm mb-4">
          Receipt sent via WhatsApp to {sale.customer.customer_phone}
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Customer:</span>
            <span className="font-medium">{sale.customer.customer_name}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Phone:</span>
            <span className="font-medium">{sale.customer.customer_phone}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Items:</span>
            <span className="font-medium">{sale.items.length}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total:</span>
            <span className="text-teal-600">{formatCurrency(sale.total)}</span>
          </div>
        </div>
        
        <button 
          onClick={onNewSale}
          className="w-full bg-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-teal-700 transition-colors"
        >
          New Sale
        </button>
      </div>
    </div>
  </div>
);