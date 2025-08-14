'use client';

import { Check, X } from 'lucide-react';
import { getAllTiers } from '../types/tiers';

export default function TierComparison() {
  const tiers = getAllTiers();
  
  // Get all unique feature IDs across all tiers
  const allFeatureIds = new Set<string>();
  tiers.forEach(tier => {
    tier.features.forEach(feature => {
      allFeatureIds.add(feature.id);
    });
  });

  const featureIds = Array.from(allFeatureIds);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Compare All Plans
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See exactly what's included in each plan and choose the right one for your boutique business.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-4 text-left font-semibold text-gray-800">Features</th>
                {tiers.map(tier => (
                  <th key={tier.id} className="p-4 text-center font-semibold text-gray-800">
                    <div className="text-lg font-bold">{tier.name}</div>
                    <div className="text-2xl font-bold text-gray-800">
                      ${tier.price}
                      <span className="text-sm text-gray-500 font-normal">/month</span>
                    </div>
                    <div className="text-sm text-gray-600">{tier.description}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureIds.map(featureId => {
                // Find the feature in each tier
                const tierFeatures = tiers.map(tier => 
                  tier.features.find(f => f.id === featureId)
                );

                return (
                  <tr key={featureId} className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-800">
                      {tierFeatures.find(f => f)?.name || featureId}
                    </td>
                    {tierFeatures.map((feature, index) => (
                      <td key={index} className="p-4 text-center">
                        {feature ? (
                          <div className="flex items-center justify-center">
                            <Check className="h-5 w-5 text-green-500" />
                            {feature.limit && (
                              <span className="ml-2 text-sm text-gray-600">
                                {feature.limit}
                              </span>
                            )}
                          </div>
                        ) : (
                          <X className="h-5 w-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
              
              {/* Message limits row */}
              <tr className="border-b border-gray-100 bg-gray-50">
                <td className="p-4 font-medium text-gray-800">WhatsApp Messages</td>
                {tiers.map(tier => (
                  <td key={tier.id} className="p-4 text-center">
                    <div className="font-semibold text-gray-800">{tier.messageLimit.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">
                      +${tier.additionalMessagePrice} each
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-center mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-3xl mx-auto">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> All plans include M-Pesa integration, 24/6 support, and a 90-day money-back guarantee. 
              Upgrade or downgrade anytime with no penalties.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}