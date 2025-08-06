'use client';
import React from 'react';
import { User, Phone } from 'lucide-react';
import { CustomerData, SaleItem } from '@/app/types/pos';
import { formatCurrency } from '@/app/types/pos';

interface CustomerFormProps {
  customerData: CustomerData;
  onChange: (data: CustomerData) => void;
  saleItems: SaleItem[];
  total: number;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ 
  customerData, 
  onChange, 
  saleItems, 
  total 
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <section className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
      <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Customer Details</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="customer-name" className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-1" />
            Customer Name *
          </label>
          <input
            id="customer-name"
            type="text"
            value={customerData.customer_name}
            onChange={(e) => onChange({ ...customerData, customer_name: e.target.value })}
            placeholder="Enter customer name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
            required
          />
        </div>
        
        <div>
          <label htmlFor="customer-phone" className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-1" />
            Phone Number *
          </label>
          <input
            id="customer-phone"
            type="tel"
            value={customerData.customer_phone}
            onChange={(e) => onChange({ ...customerData, customer_phone: e.target.value })}
            placeholder="0700000000"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Receipt will be sent via WhatsApp</p>
        </div>
      </div>
    </section>
    
    <section className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
      <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Sale Summary</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {saleItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>{item.item_name} x{item.quantity}</span>
            <span>{formatCurrency(item.unit_price * item.quantity)}</span>
          </div>
        ))}
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span className="text-teal-600">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
);