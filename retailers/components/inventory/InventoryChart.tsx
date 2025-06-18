// src/components/inventory/InventoryChart.tsx
'use client';

import React from 'react';
import { useEnergy } from '@/context/EnergyContext';

interface InventoryChartProps {
  lowStockItems: { name: string; stock: number }[];
  categories: { name: string; count: number }[];
}

export default function InventoryChart({ lowStockItems, categories }: InventoryChartProps) {
  const { energyMode } = useEnergy();
  
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <h3 className="font-medium text-gray-900 mb-4">Inventory Overview</h3>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Low Stock Items</h4>
        <div className="space-y-2">
          {lowStockItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-800 text-xs mr-3">
                !
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">{item.stock} units remaining</p>
              </div>
              <button className={`text-sm ${
                energyMode ? 'text-[#FF6B35]' : 'text-blue-600'
              }`}>
                Restock
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Stock by Category</h4>
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span>{category.name}</span>
                <span>{category.count} items</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    energyMode ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF9E58]' : 'bg-blue-600'
                  }`}
                  style={{ width: `${(category.count / 50) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}