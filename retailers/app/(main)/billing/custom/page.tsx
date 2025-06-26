//app/(main)/billing/custom/page.tsx
'use client';

import React, { useState } from 'react';
import CustomBundleForm from '@/components/billing/CustomBundleForm';
import PaymentMethodSelector from '@/components/billing/PaymentMethodSelector';
import BundleProgress from '@/components/billing/BundleProgress';
import { fetchUsage } from '@/app/lib/data';

function CustomBundlePage() {
  const [credits, setCredits] = useState(100);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate pricing (KES 0.50 per WhatsApp, KES 1 per SMS)
  const whatsappCost = credits * 0.5;
  const smsCost = Math.ceil(credits * 0.2) * 1; // 20% SMS allocation
  const total = whatsappCost + smsCost;
  
  const handlePurchase = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Redirect to success page
    window.location.href = `/billing/success?amount=${total}&credits=${credits}`;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Custom Bundle</h1>
        <p className="text-gray-600">
          Specify exactly how many WhatsApp messages you need
        </p>
      </div>
      
      <BundleProgress usage={fetchUsage()} />
      
      <div className="mt-10 bg-white rounded-xl shadow-sm p-6">
        <CustomBundleForm 
          credits={credits} 
          onChange={setCredits} 
        />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Bundle Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>WhatsApp Messages:</span>
                <span>{credits} messages</span>
              </div>
              <div className="flex justify-between">
                <span>SMS Fallback (20%):</span>
                <span>{Math.ceil(credits * 0.2)} messages</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="font-medium">Total Cost:</span>
                <span className="font-bold">KES {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Payment Method</h3>
            <PaymentMethodSelector 
              method={paymentMethod} 
              onChange={setPaymentMethod} 
            />
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            onClick={handlePurchase}
            disabled={isProcessing}
            className={`px-6 py-3 rounded-lg font-medium ${
              isProcessing
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#FF6B35] to-[#FF9E58] text-white'
            }`}
          >
            {isProcessing ? 'Processing Payment...' : 'Purchase Bundle'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomBundlePage;