'use client';
import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { SaleItem, formatCurrency } from '@/app/types/pos';

interface SaleItemRowProps {
  item: SaleItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const SaleItemRow: React.FC<SaleItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove
}) => {
  const itemTotal = (item.unit_price || 0) * (item.quantity || 0);

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">
          {item.item_name || 'Unknown Item'}
        </h4>
        <p className="text-sm text-gray-600">
          {formatCurrency(item.unit_price || 0)} each
        </p>
      </div>
      
      <div className="flex items-center space-x-3">
        {/* Quantity controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            disabled={item.quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <span className="w-8 text-center font-medium">
            {item.quantity || 0}
          </span>
          
          <button
            onClick={() => onUpdateQuantity(item.id, (item.quantity || 0) + 1)}
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        {/* Item total */}
        <div className="text-right min-w-0">
          <p className="font-semibold text-gray-900">
            {formatCurrency(itemTotal)}
          </p>
        </div>
        
        {/* Remove button */}
        <button
          onClick={() => onRemove(item.id)}
          className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};