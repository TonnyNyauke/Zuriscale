// src/components/pos/CartPanel.tsx
'use client';

import React, { useState } from 'react';
import { useEnergy } from '@/context/EnergyContext';
import PaymentModal from './PaymentModal';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPanel() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const { energyMode } = useEnergy();
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.16; // 16% VAT in Kenya
  const total = subtotal + tax;
  
  const addToCart = (product: { id: string; name: string; price: number }) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prev => 
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Current Sale</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No items in cart</p>
            <p className="text-sm mt-2">Add products from the grid</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-start border-b pb-3">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">KES {item.price.toLocaleString()}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-red-500"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="border-t p-4 space-y-3">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>KES {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>VAT (16%):</span>
          <span>KES {tax.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold border-t pt-2">
          <span>Total:</span>
          <span>KES {total.toLocaleString()}</span>
        </div>
        
        <button
          onClick={() => setIsPaymentOpen(true)}
          disabled={cart.length === 0}
          className={`w-full py-3 rounded-lg font-medium mt-4 ${
            cart.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : energyMode
                ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF9E58] text-white'
                : 'bg-blue-600 text-white'
          }`}
        >
          Process Payment
        </button>
      </div>
      
      {isPaymentOpen && (
        <PaymentModal 
          total={total} 
          onClose={() => setIsPaymentOpen(false)}
          onComplete={() => {
            console.log('Sale completed', cart);
            setCart([]);
            setIsPaymentOpen(false);
          }}
        />
      )}
    </div>
  );
}