// src/components/inventory/StockAdjustment.tsx
'use client';

import { Product } from '@/app/types/types';
import React, { useState } from 'react';
import { useEnergy } from '../ui/EnergyProvider';

interface StockAdjustmentProps {
  product: Product;
  onClose: () => void;
  onSave: (newStock: number) => void;
}

export default function StockAdjustment({ product, onClose, onSave }: StockAdjustmentProps) {
  const [newStock, setNewStock] = useState(product.stock);
  const [reason, setReason] = useState('');
  const { energyMode } = useEnergy();
  
  const handleSubmit = () => {
    if (reason.trim() === '') return;
    onSave(newStock);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`w-full max-w-md rounded-xl overflow-hidden ${
        energyMode ? 'bg-gradient-to-b from-[#F8F9FA] to-[#FFF9F0]' : 'bg-white'
      }`}>
        <div className={`p-6 ${
          energyMode ? 'bg-gradient-to-r from-[#004E89] to-[#002D54] text-white' : 'bg-gray-50'
        }`}>
          <h2 className="text-xl font-bold">Adjust Stock</h2>
          <p className="mt-1">{product.name}</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Stock
            </label>
            <div className="text-lg font-bold">{product.stock} units</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Stock Quantity
            </label>
            <input
              type="number"
              value={newStock}
              onChange={(e) => setNewStock(Number(e.target.value))}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adjustment Reason
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select reason</option>
              <option value="restock">Restock from supplier</option>
              <option value="damaged">Damaged goods</option>
              <option value="return">Customer return</option>
              <option value="audit">Audit correction</option>
              <option value="theft">Theft/loss</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!reason}
              className={`px-4 py-2 rounded-lg font-medium ${
                !reason
                  ? 'bg-gray-300 text-gray-500'
                  : energyMode
                    ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF9E58] text-white'
                    : 'bg-blue-600 text-white'
              }`}
            >
              Save Adjustment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}