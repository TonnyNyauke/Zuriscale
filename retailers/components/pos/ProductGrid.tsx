'use client';

import React, { useState } from 'react';
import { Category, Product } from '@/app/types/pos';
import { useEnergy } from '../ui/EnergyProvider';

interface ProductGridProps {
  products: Product[];
  categories: Category[];
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({ products, categories, onAddToCart }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { energyMode } = useEnergy();
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);
    
  return (
    <div>
      {/* Category Filter */}
      <div className="flex space-x-2 mb-6 overflow-x-auto py-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? energyMode
                ? 'bg-[#f97316] text-white'
                : 'bg-[#0f766e] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Products
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? energyMode
                  ? 'bg-[#f97316] text-white'
                  : 'bg-[#0f766e] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredProducts.map(product => (
          <div 
            key={product.id}
            className={`border rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
              energyMode ? 'border-orange-200 hover:border-orange-300' : 'border-gray-200 hover:border-[#0f766e]'
            }`}
            onClick={() => onAddToCart(product)}
          >
            {/* Product Image Placeholder */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-32 flex items-center justify-center relative overflow-hidden">
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl w-16 h-16 flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-200 rounded" />
              </div>
              
              {/* Stock indicator */}
              {product.stock <= 5 && (
                <div className="absolute top-2 right-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Low Stock
                  </span>
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm leading-tight">
                {product.name}
              </h3>
              
              <div className="flex justify-between items-center">
                <div>
                  <span className={`text-lg font-bold ${
                    energyMode ? 'text-[#f97316]' : 'text-[#0f766e]'
                  }`}>
                    KES {product.price.toLocaleString()}
                  </span>
                </div>
                
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    product.stock > 10 
                      ? 'bg-[#059669]/10 text-[#059669]' 
                      : product.stock > 5
                        ? 'bg-[#f97316]/10 text-[#f97316]'
                        : 'bg-red-100 text-red-700'
                  }`}>
                    {product.stock} left
                  </span>
                </div>
              </div>
              
              {/* Add to cart indicator */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  Tap to add to cart
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty state */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">
            {selectedCategory === 'all' 
              ? 'No products available at the moment.'
              : `No products found in ${categories.find(c => c.id === selectedCategory)?.name || 'this category'}.`
            }
          </p>
        </div>
      )}
    </div>
  );
}