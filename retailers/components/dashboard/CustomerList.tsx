// src/components/dashboard/CustomerList.tsx
'use client';

import { Customer } from '@/app/types/types';
import EngagementButton from '@/components/ui/EngagementButton';

export default function CustomerList({ customers }: { customers: Customer[] }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-gray-900 font-medium mb-4">Top Customers</h3>
      <div className="space-y-4">
        {customers.map(customer => (
          <div key={customer.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">{customer.name}</h4>
              <p className="text-sm text-gray-500">KES {customer.total_spent.toLocaleString()}</p>
            </div>
            <EngagementButton 
              type="whatsapp" 
              onClick={() => console.log(`Engaging ${customer.name}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}