# Zuriscale Source Code Structure

This document outlines the new tier-based folder structure for the Zuriscale application.

## Overview

The application has been restructured to support three distinct pricing tiers:
- **Basic** ($13/month) - For starting boutique businesses
- **Standard** ($49/month) - For growing boutique businesses  
- **Pro** ($149/month) - For established boutique retailers

## Folder Structure

```
src/
├── app/                          # Next.js app directory
│   ├── pricing/                 # Dedicated pricing page
│   └── ...                      # Other app routes
├── tiers/                       # Tier-specific code
│   ├── basic/                   # Basic tier features
│   │   ├── components/          # Basic tier components
│   │   ├── features/            # Basic tier feature components
│   │   └── pages/               # Basic tier specific pages
│   ├── standard/                # Standard tier features
│   │   ├── components/          # Standard tier components
│   │   ├── features/            # Standard tier feature components
│   │   └── pages/               # Standard tier specific pages
│   └── pro/                     # Pro tier features
│       ├── components/           # Pro tier components
│       ├── features/             # Pro tier feature components
│       └── pages/                # Pro tier specific pages
├── shared/                      # Shared code across all tiers
│   ├── components/              # Shared UI components
│   ├── context/                 # React contexts (TierContext)
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Utility functions
│   └── lib/                     # Shared libraries
├── components/                   # Legacy components (to be migrated)
│   ├── ui/                      # UI components
│   ├── layout/                  # Layout components
│   └── forms/                   # Form components
├── types/                       # Legacy types (to be migrated)
├── utils/                       # Legacy utilities (to be migrated)
└── lib/                         # Legacy libraries (to be migrated)
```

## Key Components

### Tier Management
- **`TierContext`** - React context for managing current tier state
- **`useTier()`** - Hook for accessing tier information
- **`useFeature(featureId)`** - Hook for checking feature availability

### Feature Gating
- **`FeatureGate`** - Conditionally renders content based on tier
- **`FeatureLimit`** - Shows tier-specific limits
- **`UpgradePrompt`** - Prompts users to upgrade for locked features

### Pricing Components
- **`TieredPricing`** - Main pricing display component
- **`TierComparison`** - Side-by-side tier comparison table
- **`TierSelector`** - Interactive tier selection component

### Tier-Specific Features
- **`BasicFeatures`** - Displays Basic tier features
- **`StandardFeatures`** - Displays Standard tier features  
- **`ProFeatures`** - Displays Pro tier features

## Usage Examples

### Checking Feature Availability
```tsx
import { useFeature } from '@/shared/context/TierContext';

function MyComponent() {
  const { isAvailable, limit } = useFeature('customer_analytics');
  
  if (!isAvailable) {
    return <UpgradePrompt featureId="customer_analytics" />;
  }
  
  return <div>Analytics available: {limit}</div>;
}
```

### Conditional Feature Rendering
```tsx
import FeatureGate from '@/shared/components/FeatureGate';

function MyComponent() {
  return (
    <FeatureGate featureId="multi_location">
      <MultiLocationManager />
    </FeatureGate>
  );
}
```

### Tier Selection
```tsx
import { useTier } from '@/shared/context/TierContext';
import TierSelector from '@/shared/components/TierSelector';

function MyComponent() {
  const { currentTier, setCurrentTier } = useTier();
  
  return (
    <TierSelector 
      selectedTier={currentTier}
      onTierSelect={setCurrentTier}
    />
  );
}
```

## Migration Guide

### From Old Structure
1. Move existing components to appropriate tier folders
2. Update imports to use new `@/` alias
3. Wrap tier-specific features with `FeatureGate`
4. Use `useTier()` hook for tier-aware logic

### Adding New Features
1. Define feature in tier configuration (`src/shared/types/tiers.ts`)
2. Create tier-specific components in appropriate tier folder
3. Use `FeatureGate` for conditional rendering
4. Update tier configuration with new features

## Benefits

- **Clear Separation**: Each tier has its own folder structure
- **Feature Gating**: Easy to control access to premium features
- **Scalability**: Easy to add new tiers or modify existing ones
- **Maintainability**: Clear organization makes code easier to maintain
- **User Experience**: Users see only features available in their tier

## Next Steps

1. Migrate existing components to new structure
2. Implement tier-based routing
3. Add tier-specific onboarding flows
4. Create tier upgrade/downgrade workflows
5. Add analytics for tier usage