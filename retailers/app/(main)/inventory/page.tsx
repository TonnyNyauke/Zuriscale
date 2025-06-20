//app/(main)/inventory/page.tsx
import React from 'react';
import InventoryTable from '@/components/inventory/InventoryTable';
import InventoryChart from '@/components/inventory/InventoryChart';
import { fetchInventoryData } from '@/app/lib/inventoryData';

export default async function InventoryPage() {
  const { products, lowStockItems, categories } = await fetchInventoryData();
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <button className="bg-[#FF6B35] text-white px-4 py-2 rounded-lg">
          + Add Product
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <InventoryTable products={products} />
        </div>
        <div>
          <InventoryChart lowStockItems={lowStockItems} categories={categories} />
        </div>
      </div>
    </div>
  );
}