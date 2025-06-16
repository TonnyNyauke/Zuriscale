//components/dashboard/CustomerList.tsx
'use client';

import { Customer } from '@/app/types/types';
import EngagementButton from '@/components/ui/EngagementButton';

export default function CustomerList({ customers }: { customers: Customer[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 pb-3 border-b border-gray-100">
        <h3 className="text-gray-900 font-semibold text-lg">Top Customers</h3>
        <p className="text-sm text-gray-500 mt-1">Ready for engagement</p>
      </div>
      <div className="divide-y divide-gray-50">
        {customers.map(customer => (
          <div key={customer.id} className="p-4 active:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 mr-3">
                <h4 className="font-medium text-gray-900 text-base truncate">
                  {customer.name}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  KES {customer.total_spent.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  High-value customer
                </p>
              </div>
              <div className="flex-shrink-0">
                <EngagementButton 
                  type="whatsapp" 
                  onClick={() => console.log(`Engaging ${customer.name}`)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {customers.length > 3 && (
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <button className="w-full text-center text-sm font-medium text-orange-600 py-2 rounded-lg hover:bg-orange-50 transition-colors">
            View All Customers
          </button>
        </div>
      )}
    </div>
  );
}