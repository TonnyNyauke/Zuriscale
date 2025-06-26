//components/billing/BundleCard.tsx
import React from 'react';
import Link from 'next/link';
import { Bundle } from '@/app/types/types';
import { useEnergy } from '../ui/EnergyProvider';

interface BundleCardProps {
  bundle: Bundle;
}

export default function BundleCard({ bundle }: BundleCardProps) {
  const { energyMode } = useEnergy();
  
  // Calculate savings percentage
  const savings = Math.round((1 - (bundle.price / (bundle.whatsapp_credits * 0.5))) * 100);
  
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${
      energyMode ? 'hover:shadow-lg hover:border-[#FF6B35]' : 'hover:shadow'
    }`}>
      <div className={`p-5 ${
        energyMode 
          ? 'bg-gradient-to-r from-[#004E89] to-[#002D54] text-white' 
          : 'bg-gray-50'
      }`}>
        <h3 className="font-bold text-lg">{bundle.name}</h3>
        <p className="text-sm opacity-80 mt-1">{bundle.description}</p>
      </div>
      
      <div className="p-5">
        <div className="mb-4">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">KES {bundle.price.toLocaleString()}</span>
            {savings > 0 && (
              <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                Save {savings}%
              </span>
            )}
          </div>
          {bundle.original_price && (
            <p className="text-sm text-gray-500 line-through">
              KES {bundle.original_price.toLocaleString()}
            </p>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs mr-2">
              ✓
            </div>
            <span>{bundle.whatsapp_credits.toLocaleString()} WhatsApp messages</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs mr-2">
              ✓
            </div>
            <span>{bundle.sms_credits.toLocaleString()} SMS messages</span>
          </div>
          {bundle.features.map((feature, i) => (
            <div key={i} className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs mr-2">
                ✓
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        <Link 
          href={`/billing/bundles/purchase?bundle=${bundle.id}`} 
          className={`block mt-6 py-2.5 text-center rounded-lg font-medium ${
            energyMode
              ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF9E58] text-white'
              : 'bg-blue-600 text-white'
          }`}
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
}