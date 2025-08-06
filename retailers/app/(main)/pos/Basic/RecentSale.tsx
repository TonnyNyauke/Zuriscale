'use client';
import React from 'react';
import { Sale } from '@/app/types/pos';
import { formatCurrency, formatTime } from '@/app/types/pos';

interface RecentSalesProps {
  sales: Sale[];
}

export const RecentSales: React.FC<RecentSalesProps> = ({ sales }) => (
  <aside className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Recent Sales</h3>
    <div className="space-y-3 max-h-64 overflow-y-auto">
      {sales.map((sale) => (
        <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div className="flex-1">
            <p className="font-medium text-gray-900 text-sm">{sale.customer.customer_name}</p>
            <p className="text-xs text-gray-600">
              {formatTime(sale.timestamp)} • {sale.items.length} items
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-teal-600 text-sm">{formatCurrency(sale.total)}</p>
          </div>
        </div>
      ))}
    </div>
  </aside>
);