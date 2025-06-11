// src/components/inbox/CustomerProfile.tsx
'use client'; // Add this to make it a client component

import { Customer } from '@/app/types/types';
import React from 'react';
import { useEnergy } from '../ui/EnergyProvider';

interface CustomerProfileProps {
  customer: Customer;
}

export default function CustomerProfile({ customer }: CustomerProfileProps) {
  const { energyMode } = useEnergy(); // Get the energy mode state

  return (
    <div className="p-6 h-full">
      <div className="text-center">
        <div 
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto ${
            energyMode 
              ? 'bg-gradient-to-br from-[#FF6B35] to-[#FF9E58]' 
              : 'bg-gray-300'
          }`}
        >
          {customer.name.split(' ').map(n => n[0]).join('')}
        </div>
        <h2 className="text-xl font-bold mt-3">{customer.name}</h2>
        <p className="text-gray-600">{customer.phone}</p>
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium text-gray-900 mb-2">Customer Details</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="font-medium">{customer.total_orders}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Spent</p>
            <p className="font-medium">KES {customer.total_spent.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Order</p>
            <p className="font-medium">{customer.last_order}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {customer.tags.map(tag => (
            <span 
              key={tag} 
              className={`text-xs px-2 py-1 rounded ${
                energyMode 
                  ? 'bg-gradient-to-r from-[#FFD700] to-[#FF9E58] text-gray-900' 
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium text-gray-900 mb-2">Notes</h3>
        <p className="text-sm text-gray-700">{customer.notes}</p>
      </div>
      
      <div className="mt-8">
        <button 
          className={`w-full py-2 rounded-lg font-medium ${
            energyMode 
              ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF9E58] text-white' 
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          View Full Profile
        </button>
      </div>
    </div>
  );
}