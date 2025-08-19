'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, Users, Package, CreditCard } from 'lucide-react';
import { Product, Category, CartItem, Customer } from '@/app/types/pos';

// Mock data for Standard tier - more comprehensive than Basic
const mockProducts: Product[] = [
  { id: '1', name: 'Ankara Maxi Dress', price: 3500, category: 'dresses', stock: 12, sku: 'ANK-001' },
  { id: '2', name: 'Cotton Blouse', price: 2200, category: 'tops', stock: 8, sku: 'COT-002' },
  { id: '3', name: 'Denim Jacket', price: 4200, category: 'outerwear', stock: 5, sku: 'DEN-003' },
  { id: '4', name: 'Silk Scarf', price: 1800, category: 'accessories', stock: 15, sku: 'SIL-004' },
  { id: '5', name: 'Maasai Print Skirt', price: 2800, category: 'bottoms', stock: 6, sku: 'MAA-005' },
  { id: '6', name: 'Leather Handbag', price: 5500, category: 'accessories', stock: 3, sku: 'LEA-006' },
  { id: '7', name: 'Traditional Kitenge Top', price: 2900, category: 'tops', stock: 9, sku: 'KIT-007' },
  { id: '8', name: 'Beaded Necklace', price: 1200, category: 'accessories', stock: 20, sku: 'BEA-008' },
  { id: '9', name: 'Wrap Dress', price: 3200, category: 'dresses', stock: 7, sku: 'WRA-009' },
  { id: '10', name: 'Casual Pants', price: 2600, category: 'bottoms', stock: 11, sku: 'CAS-010' },
];

const mockCategories: Category[] = [
  { id: 'dresses', name: 'Dresses' },
  { id: 'tops', name: 'Tops' },
  { id: 'bottoms', name: 'Bottoms' },
  { id: 'outerwear', name: 'Outerwear' },
  { id: 'accessories', name: 'Accessories' },
];

const mockCustomers: Customer[] = [
  { id: '1', name: 'Sarah Muthoni', phone: '+254712345678', email: 'sarah@email.com', totalSpent: 45000, lastVisit: '2024-01-15' },
  { id: '2', name: 'James Kiprop', phone: '+254723456789', email: 'james@email.com', totalSpent: 32000, lastVisit: '2024-01-14' },
  { id: '3', name: 'Grace Wanjiku', phone: '+254734567890', email: 'grace@email.com', totalSpent: 28000, lastVisit: '2024-01-13' },
];

export default function StandardPOSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = mockProducts;
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory]);

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
        quantity: 1,
        sku: product.sku
      }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => 
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setSelectedCustomer(null);
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Left Panel - Products */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Point of Sale - Standard</h1>
              <p className="text-gray-600 mt-1">
                Advanced POS with customer management and analytics
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Total Sales Today</div>
                <div className="text-lg font-semibold text-green-600">KES 45,200</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Transactions</div>
                <div className="text-lg font-semibold text-blue-600">12</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {mockCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowCustomerModal(true)}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Select Customer</span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-300 cursor-pointer transition-colors"
                onClick={() => addToCart(product)}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 text-sm mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.sku}</p>
                  <div className="text-lg font-bold text-gray-900">KES {product.price.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 mt-1">Stock: {product.stock}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Cart and Customer */}
      <div className="w-96 border-l border-gray-200 bg-white flex flex-col">
        {/* Customer Info */}
        {selectedCustomer && (
          <div className="p-4 bg-teal-50 border-b border-teal-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-teal-900">{selectedCustomer.name}</h3>
                <p className="text-sm text-teal-700">{selectedCustomer.phone}</p>
                <p className="text-xs text-teal-600">
                  Total spent: KES {selectedCustomer.totalSpent.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-teal-600 hover:text-teal-800"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Cart Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
          <p className="text-sm text-gray-600">{getTotalItems()} items</p>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No items in cart</p>
              <p className="text-sm">Click on products to add them</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.sku}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">KES {(item.price * item.quantity).toLocaleString()}</div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>KES {getTotalAmount().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>VAT (16%):</span>
                <span>KES {(getTotalAmount() * 0.16).toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-300 pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>KES {(getTotalAmount() * 1.16).toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <button className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-teal-700">
                <CreditCard className="inline h-4 w-4 mr-2" />
                Process Payment
              </button>
              <button
                onClick={clearCart}
                className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Customer Selection Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Select Customer</h3>
              <button
                onClick={() => setShowCustomerModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="space-y-2">
              {mockCustomers.map(customer => (
                <div
                  key={customer.id}
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setShowCustomerModal(false);
                  }}
                  className="p-3 border border-gray-200 rounded-lg hover:border-teal-300 cursor-pointer"
                >
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-sm text-gray-600">{customer.phone}</div>
                  <div className="text-xs text-gray-500">
                    Total: KES {customer.totalSpent.toLocaleString()} | Last: {customer.lastVisit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
