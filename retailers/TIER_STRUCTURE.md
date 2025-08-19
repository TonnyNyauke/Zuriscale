# Zuriscale Tier-Based Architecture

## Overview
This document outlines the new scalable, tier-based folder structure for the Zuriscale application. The structure is designed to support three different subscription tiers (Basic, Standard, Pro) with clear separation of concerns and scalable code organization.

## Folder Structure

```
app/
├── (main)/                    # Basic Tier - Default features
│   ├── dashboard/            # Basic dashboard
│   ├── pos/                  # Basic POS system
│   ├── customers/            # Basic customer management
│   ├── inbox/               # Basic messaging
│   ├── products/            # Basic product management
│   ├── inventory/           # Basic inventory tracking
│   ├── campaigns/           # Basic campaign management
│   └── billing/             # Basic billing
│
├── (standard)/               # Standard Tier - Advanced features
│   ├── layout.tsx           # Tier-specific layout with auth checks
│   ├── dashboard/           # Enhanced dashboard with analytics
│   ├── pos/                 # Advanced POS with customer history
│   ├── customers/           # Customer segmentation & analytics
│   ├── analytics/           # Advanced analytics dashboard
│   ├── campaigns/           # Automated campaign management
│   └── billing/             # Advanced billing & reporting
│
├── (pro)/                    # Pro Tier - Enterprise features
│   ├── layout.tsx           # Tier-specific layout with auth checks
│   ├── dashboard/           # Executive dashboard
│   ├── pos/                 # Full POS with inventory management
│   ├── customers/           # CRM with advanced analytics
│   ├── analytics/           # Business intelligence dashboard
│   ├── inventory/           # Full inventory management system
│   ├── reporting/           # Advanced reporting & insights
│   ├── campaigns/           # AI-powered campaign optimization
│   └── billing/             # Enterprise billing & invoicing
│
├── shared/                   # Shared components across all tiers
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   └── types/               # TypeScript type definitions
│
├── pricing/                  # Pricing page
├── upgrade/                  # Plan upgrade page
└── page.tsx                 # Homepage
```

## Key Principles

### 1. **Tier-Based Access Control**
- Each tier has its own layout.tsx that checks subscription level
- Users are redirected to upgrade page if they don't have access
- Clear separation between Basic, Standard, and Pro features

### 2. **Feature Progression**
- **Basic**: Core functionality for small businesses
- **Standard**: Advanced features for growing businesses
- **Pro**: Enterprise features for established businesses

### 3. **Code Reusability**
- Shared components in `/shared` directory
- Common functionality abstracted into reusable hooks
- Consistent UI patterns across all tiers

### 4. **Scalability**
- Easy to add new tiers
- Simple to add new features to specific tiers
- Clear upgrade path for users

## Implementation Guidelines

### Creating New Features

1. **Determine the tier** where the feature belongs
2. **Create the feature** in the appropriate tier directory
3. **Use shared components** when possible
4. **Follow the tier's layout** and authentication

### Example: Adding a New Standard Tier Feature

```typescript
// app/(standard)/analytics/page.tsx
export default function AnalyticsPage() {
  // This page is automatically protected by the Standard tier layout
  // Users without Standard subscription will be redirected to upgrade
  
  return (
    <div>
      <h1>Advanced Analytics Dashboard</h1>
      {/* Standard tier specific analytics features */}
    </div>
  );
}
```

### Authentication & Access Control

Each tier's layout.tsx automatically handles access control:

```typescript
// app/(standard)/layout.tsx
export default async function StandardLayout({ children }) {
  const session = await getServerSession(authOptions);
  
  // Check if user has access to Standard tier
  if (!session?.user?.subscriptionTier || session.user.subscriptionTier === 'basic') {
    redirect('/upgrade?tier=standard');
  }

  return <div>{children}</div>;
}
```

## Migration from Old Structure

### Current Issues
- Mixed tier functionality in single directories
- Hard to maintain and scale
- No clear upgrade path
- Confusing for developers

### Benefits of New Structure
- Clear separation of concerns
- Easy to maintain and scale
- Clear upgrade path for users
- Better developer experience
- Easier testing and deployment

## Development Workflow

### 1. **Feature Development**
- Develop features in the appropriate tier directory
- Use shared components for consistency
- Test with different subscription levels

### 2. **Testing**
- Test Basic tier features
- Test Standard tier features (with upgrade)
- Test Pro tier features (with upgrade)
- Test upgrade flow

### 3. **Deployment**
- Deploy all tiers together
- Ensure proper routing
- Test access control

## Future Considerations

### Adding New Tiers
1. Create new directory: `app/(enterprise)/`
2. Add tier-specific layout with auth checks
3. Implement tier-specific features
4. Update pricing and upgrade flow

### Feature Migration
1. Identify which tier a feature belongs to
2. Move code to appropriate tier directory
3. Update imports and references
4. Test thoroughly

## Best Practices

1. **Always use the tier-specific layout** for authentication
2. **Keep shared code in `/shared`** directory
3. **Follow consistent naming conventions** across tiers
4. **Document tier-specific features** clearly
5. **Test upgrade/downgrade flows** regularly
6. **Use TypeScript** for better type safety
7. **Implement proper error handling** for tier mismatches

## Support

For questions about the tier structure or implementation, refer to:
- This documentation
- Code examples in each tier directory
- Shared component documentation
- Authentication flow documentation
