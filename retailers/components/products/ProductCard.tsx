// src/components/products/ProductCard.tsx
'use client';

import { Product } from '@/app/types/types';
import React from 'react';
import { useEnergy } from '../ui/EnergyProvider';

interface ProductCardProps {
  product: Product;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const { energyMode } = useEnergy();
  
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${
      energyMode ? 'hover:shadow-lg hover:border-[#FF6B35]' : 'hover:shadow'
    }`}>
      <div className="bg-gray-100 h-56 flex items-center justify-center">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24" />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded ${
            product.stock > 10 
              ? 'bg-green-100 text-green-800' 
              : product.stock > 0 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'
          }`}>
            {product.stock} in stock
          </span>
        </div>
        
        <p className="text-lg font-bold mt-2">KES {product.price.toLocaleString()}</p>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {product.description || 'No description available'}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500 capitalize">
            {product.category}
          </span>
          
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className={`text-sm ${
                energyMode ? 'text-[#FF6B35]' : 'text-blue-600'
              }`}
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="text-sm text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}