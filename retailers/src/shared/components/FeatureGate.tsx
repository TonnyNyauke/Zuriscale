'use client';

import { ReactNode } from 'react';
import { useFeature } from '../context/TierContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Star } from 'lucide-react';
import Link from 'next/link';

interface FeatureGateProps {
  featureId: string;
  children: ReactNode;
  fallback?: ReactNode;
  showUpgradePrompt?: boolean;
  upgradeMessage?: string;
  className?: string;
}

export default function FeatureGate({ 
  featureId, 
  children, 
  fallback,
  showUpgradePrompt = true,
  upgradeMessage,
  className = ''
}: FeatureGateProps) {
  const { isAvailable, limit } = useFeature(featureId);

  if (isAvailable) {
    return <div className={className}>{children}</div>;
  }

  if (fallback) {
    return <div className={className}>{fallback}</div>;
  }

  if (!showUpgradePrompt) {
    return null;
  }

  const defaultUpgradeMessage = upgradeMessage || 
    `This feature requires a higher tier plan. Upgrade to access ${featureId}.`;

  return (
    <div className={`p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg ${className}`}>
      <div className="text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="h-8 w-8 text-amber-600" />
        </div>
        <h3 className="text-lg font-semibold text-amber-800 mb-2">
          Feature Locked
        </h3>
        <p className="text-amber-700 mb-4">
          {defaultUpgradeMessage}
        </p>
        <div className="flex gap-2 justify-center">
          <Button asChild variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
            <Link href="/pricing">
              View Plans
            </Link>
          </Button>
          <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white">
            <Link href="/signup">
              Upgrade Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Component for showing tier-specific limits
interface FeatureLimitProps {
  featureId: string;
  children: (limit: string | number) => ReactNode;
  fallback?: ReactNode;
}

export function FeatureLimit({ featureId, children, fallback }: FeatureLimitProps) {
  const { isAvailable, limit } = useFeature(featureId);

  if (!isAvailable || !limit) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children(limit)}</>;
}

// Component for showing upgrade prompts
interface UpgradePromptProps {
  featureId: string;
  message?: string;
  showFeatureName?: boolean;
  className?: string;
}

export function UpgradePrompt({ 
  featureId, 
  message, 
  showFeatureName = true,
  className = ''
}: UpgradePromptProps) {
  const { isAvailable } = useFeature(featureId);

  if (isAvailable) {
    return null;
  }

  const displayMessage = message || 
    `${showFeatureName ? `${featureId} - ` : ''}Upgrade your plan to access this feature`;

  return (
    <div className={`p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg ${className}`}>
      <div className="flex items-center gap-3">
        <Star className="h-5 w-5 text-purple-600" />
        <div className="flex-1">
          <p className="text-sm text-purple-700 font-medium">
            {displayMessage}
          </p>
        </div>
        <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
          <Link href="/pricing">
            Upgrade
          </Link>
        </Button>
      </div>
    </div>
  );
}