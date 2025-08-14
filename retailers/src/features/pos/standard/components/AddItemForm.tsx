'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { validateSaleItem } from '../../shared/utils/validation';
import { useTier } from '@/shared/context/TierContext';
import { TierLimit } from '../../shared/components/TierLimit';
import { Product, Category } from '../../shared/types';

interface AddItemFormProps {
  onAddItem: (name: string, price: number, category: string, stock: number) => void;
  currentItemCount: number;
}

// Mock data - in real app, this would come from API
const mockCategories: Category[] = [
  { id: 'dresses', name: 'Dresses' },
  { id: 'tops', name: 'Tops' },
  { id: 'bottoms', name: 'Bottoms' },
  { id: 'outerwear', name: 'Outerwear' },
  { id: 'accessories', name: 'Accessories' },
];

const mockProducts: Product[] = [
  { id: '1', name: 'Ankara Maxi Dress', price: 3500, category: 'dresses', stock: 12 },
  { id: '2', name: 'Cotton Blouse', price: 2200, category: 'tops', stock: 8 },
  { id: '3', name: 'Denim Jacket', price: 4200, category: 'outerwear', stock: 5 },
  { id: '4', name: 'Silk Scarf', price: 1800, category: 'accessories', stock: 15 },
  { id: '5', name: 'Maasai Print Skirt', price: 2800, category: 'bottoms', stock: 6 },
];

export function AddItemForm({ onAddItem, currentItemCount }: AddItemFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { currentTier } = useTier();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const priceNum = parseFloat(price);
    const stockNum = parseInt(stock);
    const validation = validateSaleItem({ name, price: priceNum, quantity: 1 });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onAddItem(name.trim(), priceNum, category, stockNum);
    setName('');
    setPrice('');
    setCategory('');
    setStock('');
    setSelectedProduct(null);
  };

  const handleProductSelect = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setName(product.name);
      setPrice(product.price.toString());
      setCategory(product.category);
      setStock(product.stock.toString());
    }
  };

  const isAtLimit = currentItemCount >= 200; // Standard tier limit

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Item to Sale</h3>
      
      <TierLimit 
        current={currentItemCount}
        limit={200}
        feature="maxItemsPerSale"
        message="Standard plan allows up to 200 items per sale"
      />

      {/* Product Selection */}
      <div className="mb-4">
        <Label htmlFor="productSelect">Select from Inventory</Label>
        <Select onValueChange={handleProductSelect} value={selectedProduct?.id || ''}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Choose a product from inventory" />
          </SelectTrigger>
          <SelectContent>
            {mockProducts.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name} - {product.price} KES (Stock: {product.stock})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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

        <div className="grid grid-cols-2 gap-4">
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

          <div>
            <Label htmlFor="itemCategory">Category</Label>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {mockCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="itemStock">Stock Level</Label>
          <Input
            id="itemStock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
            min="0"
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
          disabled={isAtLimit || !name.trim() || !price.trim() || !category}
          className="w-full"
        >
          Add Item
        </Button>
      </form>

      {isAtLimit && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 text-sm">
            You've reached the Standard plan limit of 200 items per sale. 
            <a href="/pricing" className="text-amber-600 hover:text-amber-800 underline ml-1">
              Upgrade to Pro for unlimited items
            </a>
          </p>
        </div>
      )}

      {/* Inventory Management Feature Highlight */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800 text-sm">
          <strong>Standard Plan Feature:</strong> Inventory management with stock tracking and product categories.
        </p>
      </div>
    </div>
  );
}