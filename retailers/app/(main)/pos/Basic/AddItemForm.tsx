'use client';
import React, { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';

interface AddItemFormProps {
  onAddItem: (name: string, price: number) => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    if (!itemName.trim() || !itemPrice) return;
    
    onAddItem(itemName.trim(), parseFloat(itemPrice));
    setItemName('');
    setItemPrice('');
  }, [itemName, itemPrice, onAddItem]);

  const isValid = itemName.trim() && itemPrice && parseFloat(itemPrice) > 0;

  return (
    <section className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
      <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Add Item to Sale</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
        <div className="lg:col-span-1">
          <label htmlFor="item-name" className="sr-only">Item name</label>
          <input
            id="item-name"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item name (e.g., Cotton Dress)"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
            required
          />
        </div>
        
        <div className="lg:col-span-1">
          <label htmlFor="item-price" className="sr-only">Item price</label>
          <input
            id="item-price"
            type="number"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            placeholder="Price (KES)"
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
            required
          />
        </div>
        
        <div className="lg:col-span-1">
          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Item
          </button>
        </div>
      </form>
    </section>
  );
};