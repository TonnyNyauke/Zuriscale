// src/app/(main)/products/[id]/page.tsx
import { fetchProductDetail } from '@/app/lib/inventoryData';
import ProductForm from '@/components/products/ProductForm';
import React from 'react';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await fetchProductDetail(params.id);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {product ? 'Edit Product' : 'Create New Product'}
      </h1>
      
      <ProductForm product={product} />
    </div>
  );
}