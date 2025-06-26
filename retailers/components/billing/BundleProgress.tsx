//app/(main)/billing/bundles/page.tsx
import React from 'react';
import BundleCard from '@/components/billing/BundleCard';
import BundleProgress from '@/components/billing/BundleProgress';
import { fetchBundles, fetchUsage } from '@/app/lib/data';

export default async function BundlePage() {
  const bundles = await fetchBundles();
  const usage = await fetchUsage();
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Buy WhatsApp & SMS Bundles</h1>
        <p className="text-gray-600">
          Purchase message bundles to power your customer engagement campaigns
        </p>
      </div>
      
      <BundleProgress usage={usage} />
      
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Available Bundles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bundles.map(bundle => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <a 
          href="/billing/custom" 
          className="inline-block text-[#FF6B35] hover:underline font-medium"
        >
          Or create a custom bundle →
        </a>
      </div>
    </div>
  );
}