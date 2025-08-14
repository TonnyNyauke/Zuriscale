'use client';

import { Check, MessageSquare, Users, ShoppingBag, CreditCard, HeadphonesIcon } from 'lucide-react';
import { getTierFeatures } from '@/shared/types/tiers';

export default function BasicFeatures() {
  const features = getTierFeatures('basic');
  
  const featureIcons = {
    whatsapp_messages: MessageSquare,
    customer_database: Users,
    online_catalog: ShoppingBag,
    pos_system: ShoppingBag,
    mpesa_integration: CreditCard,
    customer_support: HeadphonesIcon
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Basic Plan Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to get your boutique business started. Perfect for new entrepreneurs and small boutiques.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => {
            const IconComponent = featureIcons[feature.id as keyof typeof featureIcons] || Check;
            
            return (
              <div key={feature.id} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.name}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
                {feature.limit && (
                  <p className="text-sm text-red-600 font-medium mt-2">
                    {feature.limit} included
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-red-800 mb-2">
              Perfect for New Boutiques
            </h3>
            <p className="text-red-700">
              Start with essential features and scale up as your business grows. 
              No long-term contracts, upgrade or downgrade anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}