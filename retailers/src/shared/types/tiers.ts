export type TierType = 'basic' | 'standard' | 'pro';

export interface TierFeature {
  id: string;
  name: string;
  description: string;
  included: boolean;
  limit?: string | number;
}

export interface TierPlan {
  id: TierType;
  name: string;
  price: number;
  priceCurrency: string;
  billingCycle: 'monthly' | 'yearly';
  description: string;
  badge?: string;
  features: TierFeature[];
  messageLimit: number;
  additionalMessagePrice: number;
  popular?: boolean;
  bestValue?: boolean;
}

export const TIER_PLANS: Record<TierType, TierPlan> = {
  basic: {
    id: 'basic',
    name: 'Basic',
    price: 13,
    priceCurrency: 'USD',
    billingCycle: 'monthly',
    description: 'Perfect for starting boutique businesses',
    badge: 'Most Popular for New Boutiques',
    popular: true,
    messageLimit: 1000,
    additionalMessagePrice: 0.01,
    features: [
      {
        id: 'whatsapp_messages',
        name: 'WhatsApp Messages',
        description: '1,000 WhatsApp messages included',
        included: true,
        limit: '1,000'
      },
      {
        id: 'customer_database',
        name: 'Customer Database',
        description: 'Basic boutique customer database',
        included: true
      },
      {
        id: 'online_catalog',
        name: 'Online Catalog',
        description: 'Simple online boutique catalog',
        included: true
      },
      {
        id: 'pos_system',
        name: 'POS System',
        description: 'Basic boutique POS system',
        included: true
      },
      {
        id: 'mpesa_integration',
        name: 'M-Pesa Integration',
        description: 'M-Pesa integration',
        included: true
      },
      {
        id: 'customer_support',
        name: 'Customer Support',
        description: '24/6 customer support',
        included: true
      }
    ]
  },
  standard: {
    id: 'standard',
    name: 'Standard',
    price: 49,
    priceCurrency: 'USD',
    billingCycle: 'monthly',
    description: 'For growing boutique businesses',
    badge: 'Best Value',
    bestValue: true,
    messageLimit: 5000,
    additionalMessagePrice: 0.008,
    features: [
      {
        id: 'basic_features',
        name: 'Basic Features',
        description: 'Everything in Basic',
        included: true
      },
      {
        id: 'whatsapp_messages',
        name: 'WhatsApp Messages',
        description: '5,000 WhatsApp messages included',
        included: true,
        limit: '5,000'
      },
      {
        id: 'customer_analytics',
        name: 'Customer Analytics',
        description: 'Advanced boutique customer analytics',
        included: true
      },
      {
        id: 'follow_up_campaigns',
        name: 'Follow-up Campaigns',
        description: 'Automated follow-up campaigns',
        included: true
      },
      {
        id: 'customer_segmentation',
        name: 'Customer Segmentation',
        description: 'Boutique customer segmentation',
        included: true
      },
      {
        id: 'priority_support',
        name: 'Priority Support',
        description: 'Priority support',
        included: true
      }
    ]
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 149,
    priceCurrency: 'USD',
    billingCycle: 'monthly',
    description: 'For established boutique retailers',
    messageLimit: 15000,
    additionalMessagePrice: 0.006,
    features: [
      {
        id: 'standard_features',
        name: 'Standard Features',
        description: 'Everything in Standard',
        included: true
      },
      {
        id: 'whatsapp_messages',
        name: 'WhatsApp Messages',
        description: '15,000 WhatsApp messages included',
        included: true,
        limit: '15,000'
      },
      {
        id: 'advanced_pos',
        name: 'Advanced POS',
        description: 'Advanced boutique POS with inventory',
        included: true
      },
      {
        id: 'multi_location',
        name: 'Multi-Location',
        description: 'Multi-boutique location support',
        included: true
      },
      {
        id: 'custom_catalog',
        name: 'Custom Catalog',
        description: 'Custom branded boutique catalog',
        included: true
      },
      {
        id: 'dedicated_manager',
        name: 'Dedicated Manager',
        description: 'Dedicated account manager',
        included: true
      }
    ]
  }
};

export const getTierFeatures = (tier: TierType): TierFeature[] => {
  return TIER_PLANS[tier].features;
};

export const getTierPlan = (tier: TierType): TierPlan => {
  return TIER_PLANS[tier];
};

export const getAllTiers = (): TierPlan[] => {
  return Object.values(TIER_PLANS);
};