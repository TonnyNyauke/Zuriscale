// src/components/pos/ProductGrid.tsx
'use client';

import { Category, Product } from '@/app/types/types';
import React, { useState } from 'react';
import { useEnergy } from '../ui/EnergyProvider';

interface ProductGridProps {
  products: Product[];
  categories: Category[];
}

export default function ProductGrid({ products, categories }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { energyMode } = useEnergy();
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);
    
  return (
    <div>
      <div className="flex space-x-3 mb-6 overflow-x-auto py-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            selectedCategory === 'all'
              ? energyMode
                ? 'bg-[#FF6B35] text-white'
                : 'bg-blue-600 text-white'
              : 'bg-gray-100'
          }`}
        >
          All Products
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category.id
                ? energyMode
                  ? 'bg-[#FF6B35] text-white'
                  : 'bg-blue-600 text-white'
                : 'bg-gray-100'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <div 
            key={product.id}
            className={`border rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
              energyMode ? 'border-orange-200' : 'border-gray-200'
            }`}
            onClick={() => console.log('Add to cart', product.id)}
          >
            <div className="bg-gray-100 h-40 flex items-center justify-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-bold">KES {product.price.toLocaleString()}</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  product.stock > 5 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock} in stock
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}