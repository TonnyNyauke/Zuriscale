'use client';

import { Customer } from '@/app/types/types';
import React, { useState } from 'react';
import { useEnergy } from '../ui/EnergyProvider';

interface CustomerProfileProps {
  customer: Customer;
}

export default function CustomerProfile({ customer,
 }: CustomerProfileProps) {
  const { energyMode } = useEnergy();
  const [activeTab, setActiveTab] = useState('details');

  const getCustomerStatusColor = (status: string) => {
    switch (status) {
      case 'vip': return 'from-purple-500 to-pink-500';
      case 'repeat': return 'from-blue-500 to-indigo-500';
      case 'new': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="text-center">
          <div className="relative mx-auto w-16 h-16 mb-3">
            <div className={`w-full h-full rounded-full bg-gradient-to-br ${
              getCustomerStatusColor(customer.status)
            } flex items-center justify-center text-white font-bold text-xl shadow-lg`}
            >
              {customer.name.split(' ').map(n => n[0]).join('')}
              
            </div>
            {customer.status_level === 'vip' && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xs">⭐</span>
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-1">{customer.name}</h2>
          <p className="text-sm text-gray-600 mb-2">{customer.phone_number}</p>
          
          <div className="flex justify-center space-x-2">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
              customer.status_level === 'vip' 
                ? 'bg-purple-100 text-purple-700'
                : customer.status === 'repeat'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-green-100 text-green-700'
            }`}>
              {customer.status.toUpperCase()} CUSTOMER
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-lg font-bold text-gray-900">{customer.total_orders}</div>
            <div className="text-xs text-gray-600">Orders</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-lg font-bold text-green-600">{formatCurrency(customer.total_spent)}</div>
            <div className="text-xs text-gray-600">Spent</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm font-bold text-gray-900">
              {Math.round(customer.total_spent / customer.total_orders)}
            </div>
            <div className="text-xs text-gray-600">Avg Order</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 pt-4">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            { key: 'details', label: 'Details', icon: '📋' },
            { key: 'history', label: 'Orders', icon: '📦' },
            { key: 'notes', label: 'Notes', icon: '📝' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === tab.key 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {activeTab === 'details' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Customer Since</span>
                  <span className="text-sm text-gray-900">{new Date(customer.first_purchase_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Last Order</span>
                  <span className="text-sm text-gray-900">{new Date(customer.last_order).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Last Purchase</span>
                  <span className="text-sm text-gray-900">{new Date(customer.last_purchase_date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <span className="mr-2">🏷️</span> Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {customer.tags.map(tag => (
                  <span 
                    key={tag} 
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      energyMode 
                        ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white' 
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
                <button className="px-3 py-1 text-xs font-medium border border-dashed border-gray-400 text-gray-600 rounded-full hover:border-gray-600 hover:text-gray-800 transition-colors">
                  + Add Tag
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900 flex items-center">
                <span className="mr-2">📦</span> Recent Orders
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            
            {/* Mock Order History */}
            {[
              { id: 'ORD-789456', date: '2024-05-17', amount: 4200, status: 'Delivered', items: 'Floral Dress, Handbag' },
              { id: 'ORD-789123', date: '2024-05-10', amount: 6800, status: 'Delivered', items: 'Evening Gown' },
              { id: 'ORD-788901', date: '2024-04-28', amount: 3200, status: 'Delivered', items: 'Casual Top, Jeans' }
            ].map(order => (
              <div key={order.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{order.id}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-1">{order.items}</div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{new Date(order.date).toLocaleDateString()}</span>
                  <span className="font-medium text-gray-900">{formatCurrency(order.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900 flex items-center">
                <span className="mr-2">📝</span> Customer Notes
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                {customer.notes}
              </p>
            </div>
            
            <button className="w-full py-2 text-sm text-gray-600 border border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:text-gray-800 transition-colors">
              + Add Note
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-6 border-t border-gray-200 space-y-3">
        <button 
          className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
            energyMode 
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg transform hover:scale-105' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          View Full Profile
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="py-2 px-4 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            📞 Call
          </button>
          <button className="py-2 px-4 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            📧 Email
          </button>
        </div>
      </div>
    </div>
  );
}