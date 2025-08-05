'use client';
import React from 'react';
import { ShoppingCart, Receipt } from 'lucide-react';
import { SaleItem } from '@/app/types/pos';
import { SaleItemRow } from './SaleItemRow';
import { formatCurrency } from '@/app/types/pos';

interface CurrentSaleProps {
  saleItems: SaleItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  total: number;
}

export const CurrentSale: React.FC<CurrentSaleProps> = ({ 
  saleItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  total 
}) => {
  const isEmpty = saleItems.length === 0;

  return (
    <section className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
      <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <ShoppingCart className="w-5 h-5 mr-2" />
        Current Sale
      </h3>
      
      {isEmpty ? (
        <div className="text-center py-8 text-gray-500">
          <Receipt className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">No items added yet</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-4 max-h-64 lg:max-h-96 overflow-y-auto">
            {saleItems.map((item) => (
              <SaleItemRow
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemoveItem}
              />
            ))}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg lg:text-xl font-semibold text-gray-900">Total:</span>
              <span className="text-xl lg:text-2xl font-bold text-teal-600">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </>
      )}
    </section>
  );
};