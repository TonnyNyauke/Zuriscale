// src/components/inventory/InventoryTable.tsx
'use client';

import React, { useState } from 'react';
import StockAdjustment from './StockAdjustment';
import { Product } from '@/app/types/types';
import { useEnergy } from '../ui/EnergyProvider';

interface InventoryTableProps {
  products: Product[];
}

export default function InventoryTable({ products }: InventoryTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdjustmentOpen, setIsAdjustmentOpen] = useState(false);
  const { energyMode } = useEnergy();
  
  const handleAdjustStock = (product: Product) => {
    setSelectedProduct(product);
    setIsAdjustmentOpen(true);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  product.stock > 10 
                    ? 'bg-green-100 text-green-800' 
                    : product.stock > 0 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock} units
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                KES {product.price.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleAdjustStock(product)}
                  className={`text-sm ${
                    energyMode ? 'text-[#FF6B35] hover:text-[#E55A2B]' : 'text-blue-600 hover:text-blue-900'
                  }`}
                >
                  Adjust Stock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {isAdjustmentOpen && selectedProduct && (
        <StockAdjustment 
          product={selectedProduct} 
          onClose={() => setIsAdjustmentOpen(false)}
          onSave={(newStock) => {
            console.log(`Updating stock for ${selectedProduct.name} to ${newStock}`);
            setIsAdjustmentOpen(false);
          }}
        />
      )}
    </div>
  );
}