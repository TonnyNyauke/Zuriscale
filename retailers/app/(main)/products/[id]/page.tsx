// src/app/(main)/products/[id]/page.tsx
import { fetchProductDetail } from '@/app/lib/inventoryData';
import ProductForm from '@/components/products/ProductForm';
import React from 'react';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await fetchProductDetail(id);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {product ? 'Edit Product' : 'Create New Product'}
      </h1>
      
      <ProductForm product={product} />
    </div>
  );
}