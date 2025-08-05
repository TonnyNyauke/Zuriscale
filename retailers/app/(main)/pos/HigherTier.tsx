'use client';

import React, { useState } from 'react';
import ProductGrid from '@/components/pos/ProductGrid';
import CartPanel from '@/components/pos/CartPanel';
import { Product, Category, CartItem } from '@/app/types/pos';

// Mock data - replace with actual API calls
const mockProducts: Product[] = [
  { id: '1', name: 'Ankara Maxi Dress', price: 3500, category: 'dresses', stock: 12 },
  { id: '2', name: 'Cotton Blouse', price: 2200, category: 'tops', stock: 8 },
  { id: '3', name: 'Denim Jacket', price: 4200, category: 'outerwear', stock: 5 },
  { id: '4', name: 'Silk Scarf', price: 1800, category: 'accessories', stock: 15 },
  { id: '5', name: 'Maasai Print Skirt', price: 2800, category: 'bottoms', stock: 6 },
  { id: '6', name: 'Leather Handbag', price: 5500, category: 'accessories', stock: 3 },
  { id: '7', name: 'Traditional Kitenge Top', price: 2900, category: 'tops', stock: 9 },
  { id: '8', name: 'Beaded Necklace', price: 1200, category: 'accessories', stock: 20 },
  { id: '9', name: 'Wrap Dress', price: 3200, category: 'dresses', stock: 7 },
  { id: '10', name: 'Casual Pants', price: 2600, category: 'bottoms', stock: 11 },
];

const mockCategories: Category[] = [
  { id: 'dresses', name: 'Dresses' },
  { id: 'tops', name: 'Tops' },
  { id: 'bottoms', name: 'Bottoms' },
  { id: 'outerwear', name: 'Outerwear' },
  { id: 'accessories', name: 'Accessories' },
];

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { 
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1 
      }];
    });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    setCart(prev => 
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };
  
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Product Grid Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 bg-white border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Point of Sale</h1>
          <p className="text-gray-600 mt-1">
            Select products to add to cart, then process customer sale
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <ProductGrid 
            products={mockProducts} 
            categories={mockCategories}
            onAddToCart={addToCart}
          />
        </div>
      </div>
      
      {/* Cart Panel Section */}
      <div className="w-96 border-l border-gray-200 bg-white">
        <CartPanel 
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
          onClearCart={clearCart}
        />
      </div>
    </div>
  );
}