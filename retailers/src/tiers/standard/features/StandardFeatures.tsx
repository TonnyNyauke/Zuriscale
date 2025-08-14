'use client';

import { Check, BarChart3, Mail, Users, HeadphonesIcon, TrendingUp } from 'lucide-react';
import { getTierFeatures } from '@/shared/types/tiers';

export default function StandardFeatures() {
  const features = getTierFeatures('standard');
  
  const featureIcons = {
    basic_features: Check,
    whatsapp_messages: TrendingUp,
    customer_analytics: BarChart3,
    follow_up_campaigns: Mail,
    customer_segmentation: Users,
    priority_support: HeadphonesIcon
  };

  return (
    <section className="py-16 bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Standard Plan Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Advanced tools for growing boutique businesses. Build customer relationships and scale your operations efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => {
            const IconComponent = featureIcons[feature.id as keyof typeof featureIcons] || Check;
            
            return (
              <div key={feature.id} className="text-center p-6 bg-white rounded-lg shadow-sm border border-teal-100">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.name}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
                {feature.limit && (
                  <p className="text-sm text-teal-600 font-medium mt-2">
                    {feature.limit} included
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-teal-800 mb-2">
              Best Value for Growing Businesses
            </h3>
            <p className="text-teal-700">
              Get advanced analytics and automation tools that help you understand your customers better 
              and increase repeat sales. Perfect for boutiques with 50+ customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}