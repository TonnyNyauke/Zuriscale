'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAllTiers, TierType } from '../types/tiers';

interface TierSelectorProps {
  selectedTier?: TierType;
  onTierSelect?: (tier: TierType) => void;
  showPricing?: boolean;
  className?: string;
}

export default function TierSelector({ 
  selectedTier, 
  onTierSelect, 
  showPricing = true,
  className = '' 
}: TierSelectorProps) {
  const [hoveredTier, setHoveredTier] = useState<TierType | null>(null);
  const tiers = getAllTiers();

  const getTierColor = (tierId: TierType) => {
    switch (tierId) {
      case 'basic': return 'red';
      case 'standard': return 'teal';
      case 'pro': return 'purple';
      default: return 'gray';
    }
  };

  const getTierGradient = (tierId: TierType) => {
    switch (tierId) {
      case 'basic': return 'from-red-50 to-orange-50';
      case 'standard': return 'from-teal-50 to-blue-50';
      case 'pro': return 'from-purple-50 to-indigo-50';
      default: return 'from-gray-50 to-gray-100';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Choose Your Plan
        </h3>
        <p className="text-gray-600">
          Select the plan that best fits your boutique business needs
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((tier) => {
          const isSelected = selectedTier === tier.id;
          const isHovered = hoveredTier === tier.id;
          const color = getTierColor(tier.id);
          const gradient = getTierGradient(tier.id);

          return (
            <div
              key={tier.id}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? `border-${color}-500 bg-${color}-50 shadow-lg` 
                  : `border-gray-200 hover:border-${color}-300 hover:shadow-md`
              }`}
              onClick={() => onTierSelect?.(tier.id)}
              onMouseEnter={() => setHoveredTier(tier.id)}
              onMouseLeave={() => setHoveredTier(null)}
            >
              {tier.badge && (
                <Badge 
                  className={`absolute -top-2 left-1/2 transform -translate-x-1/2 ${
                    tier.bestValue 
                      ? `bg-${color}-500 text-white` 
                      : `bg-${color}-100 text-${color}-800 border-${color}-200`
                  }`}
                >
                  {tier.badge}
                </Badge>
              )}

              <div className="text-center">
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  {tier.name}
                </h4>
                
                {showPricing && (
                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    ${tier.price}
                    <span className="text-sm text-gray-500 font-normal">/month</span>
                  </div>
                )}
                
                <p className="text-sm text-gray-600 mb-3">
                  {tier.description}
                </p>

                {isSelected && (
                  <div className="mt-3">
                    <Badge className={`bg-${color}-100 text-${color}-800 border-${color}-200`}>
                      Selected
                    </Badge>
                  </div>
                )}

                {onTierSelect && (
                  <Button
                    variant={isSelected ? "default" : "outline"}
                    className={`w-full mt-3 ${
                      isSelected 
                        ? `bg-${color}-500 hover:bg-${color}-600 text-white` 
                        : `border-${color}-300 text-${color}-700 hover:bg-${color}-50`
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTierSelect(tier.id);
                    }}
                  >
                    {isSelected ? 'Current Plan' : 'Select Plan'}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedTier && (
        <div className={`mt-6 p-4 rounded-lg bg-gradient-to-r ${getTierGradient(selectedTier)} border border-${getTierColor(selectedTier)}-200`}>
          <h4 className="font-semibold text-gray-800 mb-2">
            {tiers.find(t => t.id === selectedTier)?.name} Plan Selected
          </h4>
          <p className="text-sm text-gray-600">
            You'll have access to {tiers.find(t => t.id === selectedTier)?.messageLimit.toLocaleString()} WhatsApp messages per month.
          </p>
        </div>
      )}
    </div>
  );
}