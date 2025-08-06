'use client';
import React from 'react';
import { formatCurrency, formatTime } from '@/app/types/pos';

// Updated interface to match Supabase data structure
interface SupabaseSale {
  id: string;
  total_amount: number;
  created_at: string;
  customers: {
    name: string;
    phone_number: string;
  } | null;
  sale_items: Array<{
    item_name: string;
    quantity: number;
    unit_price: number;
  }>;
}

interface RecentSalesProps {
  sales: SupabaseSale[];
}

export const RecentSales: React.FC<RecentSalesProps> = ({ sales }) => {
  // Handle empty sales array
  if (!sales || sales.length === 0) {
    return (
      <aside className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Recent Sales</h3>
        <div className="text-center text-gray-500 py-8">
          <p>No recent sales found</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
      <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Recent Sales</h3>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {sales.map((sale) => (
          <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">
                {sale.customers?.name || 'Unknown Customer'}
              </p>
              <p className="text-xs text-gray-600">
                {formatTime(new Date(sale.created_at))} • {sale.sale_items?.length || 0} items
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-teal-600 text-sm">
                {formatCurrency(sale.total_amount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};