//app/(main)/products/page.tsx
import { fetchShopData } from '@/app/lib/inventoryData';
//import ProductGrid from '@/components/pos/ProductGrid';
import CategoryFilter from '@/components/products/CategoryFilter';
import React from 'react';

export default async function ProductsPage() {
  const { categories } = await fetchShopData();
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
        <button className="bg-[#FF6B35] text-white px-4 py-2 rounded-lg">
          + Add Product
        </button>
      </div>
      
      <CategoryFilter categories={categories} />
      
      {/* <ProductGrid products={products} categories={[]} /> */}
    </div>
  );
}