import { TierCapabilities } from './index';

export const POS_TIER_CAPABILITIES: Record<string, TierCapabilities> = {
  basic: {
    maxItemsPerSale: 50,
    maxDailySales: 100,
    inventoryManagement: false,
    customerAnalytics: false,
    multiLocation: false,
    advancedReporting: false,
    bulkOperations: false,
    customBranding: false,
  },
  standard: {
    maxItemsPerSale: 200,
    maxDailySales: 500,
    inventoryManagement: true,
    customerAnalytics: true,
    multiLocation: false,
    advancedReporting: false,
    bulkOperations: false,
    customBranding: false,
  },
  pro: {
    maxItemsPerSale: 1000,
    maxDailySales: 5000,
    inventoryManagement: true,
    customerAnalytics: true,
    multiLocation: true,
    advancedReporting: true,
    bulkOperations: true,
    customBranding: true,
  },
};

export const getPOSTierCapabilities = (tier: string): TierCapabilities => {
  return POS_TIER_CAPABILITIES[tier] || POS_TIER_CAPABILITIES.basic;
};

export const isFeatureAvailable = (tier: string, feature: keyof TierCapabilities): boolean => {
  const capabilities = getPOSTierCapabilities(tier);
  return capabilities[feature];
};