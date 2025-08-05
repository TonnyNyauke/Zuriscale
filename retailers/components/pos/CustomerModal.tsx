'use client';

import React, { useState, useEffect } from 'react';
import { User, Phone, Check, Clock, Star, ShoppingBag } from 'lucide-react';
import { Customer, CustomerFormData } from '@/app/types/pos';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customer: CustomerFormData) => void;
}

// Mock customer database - replace with actual API calls
const mockCustomers: Customer[] = [
  { 
    phone: '254712345678', 
    name: 'Grace Wanjiku', 
    lastPurchase: '2024-07-15', 
    totalSpent: 12500, 
    visits: 3 
  },
  { 
    phone: '254723456789', 
    name: 'Mary Akinyi', 
    lastPurchase: '2024-07-20', 
    totalSpent: 8200, 
    visits: 2 
  },
  { 
    phone: '254734567890', 
    name: 'Sarah Muthoni', 
    lastPurchase: '2024-07-25', 
    totalSpent: 18500, 
    visits: 5 
  },
];

export default function CustomerModal({ isOpen, onClose, onSubmit }: CustomerModalProps) {
  const [customer, setCustomer] = useState<CustomerFormData>({ phone: '', name: '' });
  const [searchingCustomer, setSearchingCustomer] = useState(false);
  const [customerFound, setCustomerFound] = useState<Customer | null>(null);

  const searchCustomer = async (phone: string) => {
    if (phone.length < 10) return;
    
    setSearchingCustomer(true);
    // Simulate API call delay
    setTimeout(() => {
      const found = mockCustomers.find(c => c.phone === phone);
      setCustomerFound(found || null);
      if (found) {
        setCustomer(prev => ({ ...prev, name: found.name }));
      }
      setSearchingCustomer(false);
    }, 800);
  };

  useEffect(() => {
    if (customer.phone && customer.phone.length >= 10) {
      searchCustomer(customer.phone);
    } else {
      setCustomerFound(null);
      setCustomer(prev => ({ ...prev, name: '' }));
    }
  }, [customer.phone]);

  const handleSubmit = () => {
    if (customer.phone && customer.name) {
      onSubmit(customer);
      // Reset form
      setCustomer({ phone: '', name: '' });
      setCustomerFound(null);
    }
  };

  const handleClose = () => {
    setCustomer({ phone: '', name: '' });
    setCustomerFound(null);
    onClose();
  };

  if (!isOpen) return null;

  const isReturningCustomer = customerFound && customerFound.visits && customerFound.visits > 1;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Customer Details</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="tel"
                placeholder="254712345678"
                value={customer.phone}
                onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent text-base"
              />
              {searchingCustomer && (
                <Clock className="absolute right-3 top-3 h-4 w-4 text-[#0f766e] animate-spin" />
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Include country code (254 for Kenya)
            </p>
          </div>

          {customerFound && (
            <div className={`border rounded-lg p-4 ${
              isReturningCustomer 
                ? 'bg-gradient-to-r from-[#0f766e]/5 to-[#059669]/5 border-[#0f766e]/20' 
                : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center space-x-2 mb-3">
                {isReturningCustomer ? (
                  <>
                    <Star className="h-5 w-5 text-[#f97316] fill-current" />
                    <span className="text-sm font-semibold text-[#0f766e]">VIP Customer!</span>
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Returning Customer</span>
                  </>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{customerFound.visits} visits</span>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#0f766e]">
                    KES {customerFound.totalSpent?.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">total spent</p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-600">
                  Last visit: {customerFound.lastPurchase ? 
                    new Date(customerFound.lastPurchase).toLocaleDateString('en-KE', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : 'Unknown'}
                </p>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter customer name"
                value={customer.name}
                onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent text-base"
                disabled={searchingCustomer}
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mt-8">
          <button
            onClick={handleClose}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!customer.phone || !customer.name || searchingCustomer}
            className="flex-1 py-3 px-4 bg-[#0f766e] text-white rounded-lg hover:bg-[#0d5d56] disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
          >
            {searchingCustomer ? 'Searching...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}