'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { TIER_PLANS, TierType } from '../types/tiers';

interface TieredPricingProps {
  showTitle?: boolean;
  className?: string;
}

export default function TieredPricing({ showTitle = true, className = '' }: TieredPricingProps) {
  return (
    <section className={`py-16 bg-gradient-to-br from-slate-50 to-teal-50 ${className}`}>
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Choose Your Boutique Business Growth Plan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start with our affordable Basic plan, scale as your boutique grows. All plans include M-Pesa payments and 24/6 support.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {Object.values(TIER_PLANS).map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-6 shadow-sm border ${
                plan.bestValue 
                  ? 'shadow-lg border-2 border-teal-200 relative' 
                  : 'border-gray-200'
              }`}
            >
              {plan.badge && (
                <Badge 
                  className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 ${
                    plan.bestValue 
                      ? 'bg-teal-500 text-white' 
                      : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {plan.badge}
                </Badge>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  ${plan.price}<span className="text-lg text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>
              
              <div className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <div key={feature.id} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">
                      {feature.description}
                      {feature.limit && ` (${feature.limit})`}
                    </span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full ${
                  plan.id === 'basic' 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : plan.id === 'standard'
                    ? 'bg-teal-500 hover:bg-teal-600'
                    : 'bg-purple-500 hover:bg-purple-600'
                } text-white`}
                asChild
              >
                <Link 
                  href={`/signup?plan=${plan.id}`} 
                  data-track-event="pricing_cta_click" 
                  data-track-properties={`{"plan":"${plan.id}"}`}
                >
                  {plan.id === 'basic' ? 'Start Basic Plan' : `Choose ${plan.name}`}
                </Link>
              </Button>
              
              <div className="mt-3 text-center">
                <p className="text-xs text-emerald-600 font-semibold">
                  90-Day Money-Back Guarantee
                </p>
                <p className="text-xs text-gray-500">
                  Additional messages: ${plan.additionalMessagePrice} each
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Pricing Note */}
        <div className="text-center mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-3xl mx-auto">
            <h4 className="font-semibold text-blue-800 mb-2">Flexible Message System</h4>
            <p className="text-sm text-blue-700">
              When you exceed your monthly message limit, you can purchase additional messages or upgrade to a higher plan. 
              No service interruption - you stay in control of your boutique messaging.
            </p>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            M-Pesa payments accepted • 90-day money-back guarantee • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}