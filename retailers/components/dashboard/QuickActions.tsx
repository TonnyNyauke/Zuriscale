//components/dashboard/QuickActions.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const QuickActions: React.FC = () => {
  const router = useRouter();

  const handleNewSale = () => {
    // Navigate to POS or sales page
    router.push('/pos'); // Adjust the route as needed
  };

  const handleViewCustomers = () => {
    // Navigate to customers page
    router.push('/customers'); // Adjust the route as needed
  };

  const handleSendCampaign = () => {
    // Navigate to campaigns page
    router.push('/campaigns'); // Adjust the route as needed
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h3 className="text-gray-900 font-semibold text-lg mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleNewSale}
          className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-200 active:scale-95 transition-transform"
        >
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mb-2">
            <span className="text-white text-lg font-bold">₹</span>
          </div>
          <span className="text-sm font-medium text-green-800">New Sale</span>
        </button>
        
        <button
          onClick={handleSendCampaign}
          className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border-2 border-orange-200 active:scale-95 transition-transform"
        >
          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mb-2">
            <span className="text-white text-lg">📢</span>
          </div>
          <span className="text-sm font-medium text-orange-800">Campaign</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;