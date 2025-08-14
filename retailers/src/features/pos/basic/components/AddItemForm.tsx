'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateSaleItem } from '../../shared/utils/validation';
import { useTier } from '@/shared/context/TierContext';
import { TierLimit } from '../../shared/components/TierLimit';

interface AddItemFormProps {
  onAddItem: (name: string, price: number) => void;
  currentItemCount: number;
}

export function AddItemForm({ onAddItem, currentItemCount }: AddItemFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const { currentTier } = useTier();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const priceNum = parseFloat(price);
    const validation = validateSaleItem({ name, price: priceNum, quantity: 1 });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onAddItem(name.trim(), priceNum);
    setName('');
    setPrice('');
  };

  const isAtLimit = currentItemCount >= 50; // Basic tier limit

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Item to Sale</h3>
      
      <TierLimit 
        current={currentItemCount}
        limit={50}
        feature="maxItemsPerSale"
        message="Basic plan allows up to 50 items per sale"
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="itemName">Item Name</Label>
          <Input
            id="itemName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name"
            disabled={isAtLimit}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="itemPrice">Price (KES)</Label>
          <Input
            id="itemPrice"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0"
            min="0"
            step="100"
            disabled={isAtLimit}
            className="mt-1"
          />
        </div>

        {errors.length > 0 && (
          <div className="text-red-600 text-sm">
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isAtLimit || !name.trim() || !price.trim()}
          className="w-full"
        >
          Add Item
        </Button>
      </form>

      {isAtLimit && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 text-sm">
            You've reached the Basic plan limit of 50 items per sale. 
            <a href="/pricing" className="text-amber-600 hover:text-amber-800 underline ml-1">
              Upgrade to add more items
            </a>
          </p>
        </div>
      )}
    </div>
  );
}