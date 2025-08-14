'use client';

import { Check, Building2, MapPin, Palette, UserCheck, TrendingUp } from 'lucide-react';
import { getTierFeatures } from '@/shared/types/tiers';

export default function ProFeatures() {
  const features = getTierFeatures('pro');
  
  const featureIcons = {
    standard_features: Check,
    whatsapp_messages: TrendingUp,
    advanced_pos: Building2,
    multi_location: MapPin,
    custom_catalog: Palette,
    dedicated_manager: UserCheck
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Pro Plan Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enterprise-grade solutions for established boutique retailers. Multi-location support and dedicated account management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => {
            const IconComponent = featureIcons[feature.id as keyof typeof featureIcons] || Check;
            
            return (
              <div key={feature.id} className="text-center p-6 bg-white rounded-lg shadow-lg border border-purple-100">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.name}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
                {feature.limit && (
                  <p className="text-sm text-purple-600 font-medium mt-2">
                    {feature.limit} included
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">
              Enterprise Features for Established Retailers
            </h3>
            <p className="text-purple-700">
              Scale your boutique business across multiple locations with advanced inventory management, 
              custom branding, and dedicated support. Perfect for boutiques with 100+ customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}