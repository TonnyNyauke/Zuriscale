# POS System - Tier-Based Architecture

This document outlines the new tier-based POS (Point of Sale) system architecture for Zuriscale.

## Overview

The POS system has been restructured to support three distinct pricing tiers, each with different capabilities and limits:

- **Basic** - Simple POS with basic features and limits
- **Standard** - Enhanced POS with inventory management
- **Pro** - Advanced POS with multi-location support and unlimited features

## Architecture

```
src/features/pos/
├── shared/                    # Shared code across all tiers
│   ├── components/           # Common UI components
│   ├── hooks/                # Shared hooks and utilities
│   ├── types/                # TypeScript interfaces
│   └── utils/                # Utility functions
├── basic/                    # Basic tier implementation
│   ├── components/           # Basic tier components
│   ├── hooks/                # Basic tier hooks
│   └── utils/                # Basic tier utilities
├── standard/                 # Standard tier implementation
│   ├── components/           # Standard tier components
│   ├── hooks/                # Standard tier hooks
│   └── utils/                # Standard tier utilities
└── pro/                      # Pro tier implementation
    ├── components/           # Pro tier components
    ├── hooks/                # Pro tier hooks
    └── utils/                # Pro tier utilities
```

## Tier Capabilities

### Basic Tier ($13/month)
- **Items per sale**: 50 maximum
- **Daily sales**: 100 maximum
- **Features**: Simple item management, basic customer info, M-Pesa payments
- **Limitations**: No inventory management, no analytics, no multi-location

### Standard Tier ($49/month)
- **Items per sale**: 200 maximum
- **Daily sales**: 500 maximum
- **Features**: Everything in Basic + inventory management, product categories, stock tracking
- **Limitations**: No multi-location, no advanced reporting

### Pro Tier ($149/month)
- **Items per sale**: Unlimited
- **Daily sales**: Unlimited
- **Features**: Everything in Standard + multi-location support, bulk operations, advanced reporting, custom branding
- **Limitations**: None

## Key Components

### Shared Components

#### `TierLimit`
Displays tier limits with progress bars and upgrade prompts.

```tsx
<TierLimit 
  current={5}
  limit={50}
  feature="maxItemsPerSale"
  message="Basic plan allows up to 50 items per sale"
/>
```

#### `AddItemForm` (Tier-Specific)
Each tier has its own AddItemForm with appropriate features:

- **Basic**: Simple name/price input
- **Standard**: + category and stock management
- **Pro**: + location selection, bulk operations, descriptions

### Tier-Specific Hooks

#### `useSaleManagement` (Basic)
Basic tier sale management with limits and validation.

```tsx
const {
  saleItems,
  addItem,
  limits,
  // ... other properties
} = useSaleManagement();
```

## Usage Examples

### Basic Tier Usage
```tsx
import { BasicPOS } from '@/features/pos/basic/components/BasicPOS';

function BasicPOSPage() {
  return <BasicPOS />;
}
```

### Standard Tier Usage
```tsx
import { StandardPOS } from '@/features/pos/standard/components/StandardPOS';

function StandardPOSPage() {
  return <StandardPOS />;
}
```

### Pro Tier Usage
```tsx
import { ProPOS } from '@/features/pos/pro/components/ProPOS';

function ProPOSPage() {
  return <ProPOS />;
}
```

### Dynamic Tier Rendering
```tsx
import { useTier } from '@/shared/context/TierContext';

function POSPage() {
  const { currentTier } = useTier();
  
  const renderPOSByTier = () => {
    switch (currentTier) {
      case 'basic': return <BasicPOS />;
      case 'standard': return <StandardPOS />;
      case 'pro': return <ProPOS />;
      default: return <BasicPOS />;
    }
  };
  
  return renderPOSByTier();
}
```

## Feature Gating

The system automatically gates features based on user tier:

```tsx
import { useFeature } from '@/shared/context/TierContext';

function InventoryManager() {
  const { isAvailable } = useFeature('inventory_management');
  
  if (!isAvailable) {
    return <UpgradePrompt featureId="inventory_management" />;
  }
  
  return <InventoryDashboard />;
}
```

## Validation and Limits

### Tier-Specific Validation
Each tier has its own validation rules:

```tsx
// Basic tier validation
if (saleItems.length >= BASIC_LIMITS.maxItemsPerSale) {
  throw new Error(`Basic plan allows maximum ${BASIC_LIMITS.maxItemsPerSale} items per sale`);
}
```

### Shared Validation
Common validation functions used across all tiers:

```tsx
import { validateSaleItem, validateCustomerData } from '@/features/pos/shared/utils/validation';

const itemValidation = validateSaleItem({ name, price, quantity: 1 });
const customerValidation = validateCustomerData(customerData);
```

## Adding New Features

### 1. Define Feature in Tier Configuration
```tsx
// src/features/pos/shared/types/tiers.ts
export const POS_TIER_CAPABILITIES = {
  basic: {
    // ... existing capabilities
    newFeature: false,
  },
  standard: {
    // ... existing capabilities
    newFeature: true,
  },
  pro: {
    // ... existing capabilities
    newFeature: true,
  },
};
```

### 2. Create Tier-Specific Components
```tsx
// src/features/pos/standard/components/NewFeature.tsx
export function NewFeature() {
  // Standard tier implementation
}

// src/features/pos/pro/components/NewFeature.tsx
export function NewFeature() {
  // Pro tier implementation with enhanced features
}
```

### 3. Use Feature Gating
```tsx
import { useFeature } from '@/shared/context/TierContext';

function FeatureWrapper() {
  const { isAvailable } = useFeature('newFeature');
  
  if (!isAvailable) {
    return <UpgradePrompt featureId="newFeature" />;
  }
  
  return <NewFeature />;
}
```

## Migration from Old Structure

### Old Structure
```
app/(main)/pos/
├── Basic/                    # Basic tier components
├── HigherTier.tsx           # Commented out advanced features
└── page.tsx                 # Main POS page
```

### New Structure
```
src/features/pos/
├── basic/                    # Clean Basic tier implementation
├── standard/                 # Standard tier with inventory
├── pro/                      # Pro tier with advanced features
└── shared/                   # Common utilities and types
```

## Benefits

1. **Clear Separation**: Each tier has its own folder and implementation
2. **Feature Gating**: Automatic feature access control based on subscription
3. **Scalability**: Easy to add new tiers or modify existing ones
4. **Maintainability**: Clear organization makes code easier to maintain
5. **User Experience**: Users see only features available in their tier
6. **Upgrade Paths**: Clear upgrade prompts and feature highlights

## Testing

### Testing Tier Limits
```tsx
// Test Basic tier limits
const basicPOS = render(<BasicPOS />);
expect(basicPOS.getByText('50 items per sale')).toBeInTheDocument();

// Test upgrade prompts
const upgradePrompt = basicPOS.getByText(/upgrade to standard/i);
expect(upgradePrompt).toBeInTheDocument();
```

### Testing Feature Gating
```tsx
// Mock different tiers
const mockTierContext = {
  currentTier: 'basic',
  isFeatureAvailable: (feature: string) => feature === 'basic_feature',
};

// Test feature availability
const { isAvailable } = useFeature('inventory_management');
expect(isAvailable).toBe(false);
```

## Next Steps

1. **Complete Component Migration**: Move remaining components to new structure
2. **Add Integration Tests**: Test tier switching and feature gating
3. **Implement Analytics**: Track feature usage by tier
4. **Add Upgrade Workflows**: Seamless tier upgrades
5. **Performance Optimization**: Lazy load tier-specific components