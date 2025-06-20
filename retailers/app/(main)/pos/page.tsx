//app/(main)/pos/page.tsx
import React from 'react';
import ProductGrid from '@/components/pos/ProductGrid';
import CartPanel from '@/components/pos/CartPanel';
import { fetchPOSData } from '@/app/lib/inventoryData';

export default async function POSPage() {
  const { products, categories } = await fetchPOSData();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-3/4 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Point of Sale</h1>
        <ProductGrid products={products} categories={categories} />
      </div>
      <div className="w-1/4 border-l">
        <CartPanel />
      </div>
    </div>
  );
}