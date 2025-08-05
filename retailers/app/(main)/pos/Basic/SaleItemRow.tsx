'use client';
import React from 'react';
import { Plus, Minus, X } from 'lucide-react';
import { SaleItem } from '@/app/types/pos';
import { formatCurrency } from '@/app/types/pos';

interface SaleItemRowProps {
  item: SaleItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const SaleItemRow: React.FC<SaleItemRowProps> = ({ item, onUpdateQuantity, onRemove }) => (
  <div className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-xl">
    <div className="flex-1 min-w-0">
      <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
      <p className="text-sm text-gray-600">{formatCurrency(item.price)} each</p>
    </div>
    
    <div className="flex items-center space-x-2 ml-2">
      <button
        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 active:bg-gray-400 transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-8 text-center font-medium text-sm" aria-label={`Quantity: ${item.quantity}`}>
        {item.quantity}
      </span>
      <button
        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 active:bg-gray-400 transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
      <button
        onClick={() => onRemove(item.id)}
        className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 active:bg-red-300 transition-colors ml-1"
        aria-label="Remove item"
      >
        <X className="w-4 h-4 text-red-600" />
      </button>
    </div>
  </div>
);