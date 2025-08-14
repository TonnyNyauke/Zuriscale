'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { validateSaleItem } from '../../shared/utils/validation';
import { useTier } from '@/shared/context/TierContext';
import { Product, Category } from '../../shared/types';

interface AddItemFormProps {
  onAddItem: (name: string, price: number, category: string, stock: number, location: string, description?: string) => void;
  currentItemCount: number;
}

// Mock data for Pro tier
const mockCategories: Category[] = [
  { id: 'dresses', name: 'Dresses', description: 'Elegant dresses for all occasions' },
  { id: 'tops', name: 'Tops', description: 'Stylish tops and blouses' },
  { id: 'bottoms', name: 'Bottoms', description: 'Pants, skirts, and shorts' },
  { id: 'outerwear', name: 'Outerwear', description: 'Jackets, coats, and cardigans' },
  { id: 'accessories', name: 'Accessories', description: 'Jewelry, bags, and scarves' },
  { id: 'shoes', name: 'Shoes', description: 'Footwear for every style' },
  { id: 'underwear', name: 'Underwear', description: 'Lingerie and undergarments' },
];

const mockLocations = [
  { id: 'nairobi-main', name: 'Nairobi Main Store' },
  { id: 'nairobi-west', name: 'Nairobi West Branch' },
  { id: 'mombasa', name: 'Mombasa Store' },
  { id: 'kisumu', name: 'Kisumu Store' },
  { id: 'online', name: 'Online Store' },
];

const mockProducts: Product[] = [
  { id: '1', name: 'Ankara Maxi Dress', price: 3500, category: 'dresses', stock: 12, description: 'Beautiful Ankara print maxi dress' },
  { id: '2', name: 'Cotton Blouse', price: 2200, category: 'tops', stock: 8, description: 'Comfortable cotton blouse' },
  { id: '3', name: 'Denim Jacket', price: 4200, category: 'outerwear', stock: 5, description: 'Classic denim jacket' },
  { id: '4', name: 'Silk Scarf', price: 1800, category: 'accessories', stock: 15, description: 'Luxury silk scarf' },
  { id: '5', name: 'Maasai Print Skirt', price: 2800, category: 'bottoms', stock: 6, description: 'Traditional Maasai print skirt' },
];

export function AddItemForm({ onAddItem, currentItemCount }: AddItemFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [enableBulkAdd, setEnableBulkAdd] = useState(false);
  const [bulkQuantity, setBulkQuantity] = useState('1');
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

    if (!location) {
      setErrors(['Please select a location']);
      return;
    }

    onAddItem(name.trim(), priceNum, category, stockNum, location, description);
    
    // Reset form
    setName('');
    setPrice('');
    setCategory('');
    setStock('');
    setLocation('');
    setDescription('');
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
      setDescription(product.description || '');
    }
  };

  const handleBulkAdd = () => {
    if (!selectedProduct || !bulkQuantity || !location) return;
    
    const quantity = parseInt(bulkQuantity);
    for (let i = 0; i < quantity; i++) {
      onAddItem(
        selectedProduct.name,
        selectedProduct.price,
        selectedProduct.category,
        selectedProduct.stock,
        location,
        selectedProduct.description
      );
    }
    
    setBulkQuantity('1');
    setEnableBulkAdd(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Advanced Item Management</h3>
        <div className="flex items-center gap-2">
          <Switch
            id="bulk-mode"
            checked={enableBulkAdd}
            onCheckedChange={setEnableBulkAdd}
          />
          <Label htmlFor="bulk-mode">Bulk Add Mode</Label>
        </div>
      </div>

      {/* Pro Tier Feature Highlight */}
      <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-purple-800 text-sm">
          <strong>Pro Plan Features:</strong> Unlimited items, multi-location support, bulk operations, 
          advanced inventory management, and custom branding.
        </p>
      </div>

      {/* Product Selection */}
      <div className="mb-6">
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="itemName">Item Name</Label>
            <Input
              id="itemName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter item name"
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
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
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

          <div>
            <Label htmlFor="itemStock">Stock Level</Label>
            <Input
              id="itemStock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="0"
              min="0"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="itemLocation">Location</Label>
            <Select onValueChange={setLocation} value={location}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {mockLocations.map((loc) => (
                  <SelectItem key={loc.id} value={loc.id}>
                    {loc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="itemDescription">Description</Label>
          <Textarea
            id="itemDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter item description"
            className="mt-1"
            rows={3}
          />
        </div>

        {enableBulkAdd && selectedProduct && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div>
                <Label htmlFor="bulkQuantity">Quantity to Add</Label>
                <Input
                  id="bulkQuantity"
                  type="number"
                  value={bulkQuantity}
                  onChange={(e) => setBulkQuantity(e.target.value)}
                  min="1"
                  max="100"
                  className="mt-1 w-24"
                />
              </div>
              <Button 
                type="button" 
                onClick={handleBulkAdd}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Bulk Add {bulkQuantity} Items
              </Button>
            </div>
          </div>
        )}

        {errors.length > 0 && (
          <div className="text-red-600 text-sm">
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}

        <Button 
          type="submit" 
          disabled={!name.trim() || !price.trim() || !category || !location}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          Add Item
        </Button>
      </form>

      {/* Multi-location Feature Highlight */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>Multi-Location Support:</strong> Manage inventory across multiple boutique locations 
          with centralized control and real-time synchronization.
        </p>
      </div>
    </div>
  );
}