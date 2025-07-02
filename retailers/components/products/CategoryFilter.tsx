// src/components/products/CategoryFilter.tsx
'use client';

import { Category } from '@/app/types/types';
import React, { useState} from 'react';
import { useEnergy } from '../ui/EnergyProvider';


interface CategoryFilterProps {
  categories: Category[];
  onCategoryChange?: (categoryId: string) => void;
  onSearch?: (query: string) => void;
}

export default function CategoryFilter({ 
  categories, 
  onCategoryChange,
  onSearch
}: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { energyMode } = useEnergy();
  
  // Handle category changes
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (onCategoryChange) onCategoryChange(categoryId);
  };
  
  // Handle search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };
  
  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? energyMode
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF9E58] text-white'
                  : 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            All Products
          </button>
          
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? energyMode
                    ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF9E58] text-white'
                    : 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category.name} 
              <span className="ml-1.5 bg-white bg-opacity-20 rounded-full px-2 py-0.5">
                {category.productCount}
              </span>
            </button>
          ))}
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg 
              className="h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg 
                className="h-5 w-5 text-gray-400 hover:text-gray-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Selected Category Indicator */}
      {selectedCategory !== 'all' && (
        <div className={`mt-4 flex items-center text-sm ${
          energyMode ? 'text-[#FF6B35]' : 'text-blue-600'
        }`}>
          <span className="font-medium">
            Showing {categories.find(c => c.id === selectedCategory)?.name} products
          </span>
          <button 
            onClick={() => handleCategoryChange('all')}
            className="ml-2 flex items-center"
          >
            <span>Clear filter</span>
            <svg 
              className="ml-1 h-4 w-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}