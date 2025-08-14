'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface TierLimitProps {
  current: number;
  limit: number;
  feature: string;
  message: string;
  showProgress?: boolean;
  className?: string;
}

export function TierLimit({ 
  current, 
  limit, 
  feature, 
  message, 
  showProgress = true,
  className = '' 
}: TierLimitProps) {
  const percentage = Math.min((current / limit) * 100, 100);
  const isNearLimit = percentage >= 80;
  const isAtLimit = percentage >= 100;

  const getStatusColor = () => {
    if (isAtLimit) return 'text-red-600';
    if (isNearLimit) return 'text-amber-600';
    return 'text-green-600';
  };

  const getStatusIcon = () => {
    if (isAtLimit) return <AlertTriangle className="h-4 w-4" />;
    if (isNearLimit) return <AlertTriangle className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  const getStatusText = () => {
    if (isAtLimit) return 'Limit Reached';
    if (isNearLimit) return 'Near Limit';
    return 'Good';
  };

  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{message}</span>
        <Badge 
          variant={isAtLimit ? "destructive" : isNearLimit ? "secondary" : "default"}
          className="text-xs"
        >
          {current} / {limit}
        </Badge>
      </div>

      {showProgress && (
        <div className="space-y-2">
          <Progress value={percentage} className="h-2" />
          <div className="flex items-center justify-between text-xs">
            <span className={`flex items-center gap-1 ${getStatusColor()}`}>
              {getStatusIcon()}
              {getStatusText()}
            </span>
            <span className="text-gray-500">
              {Math.round(percentage)}% used
            </span>
          </div>
        </div>
      )}

      {isNearLimit && !isAtLimit && (
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 text-sm">
            You're approaching the limit for {feature}. 
            <a href="/pricing" className="text-amber-600 hover:text-amber-800 underline ml-1">
              Consider upgrading
            </a>
          </p>
        </div>
      )}

      {isAtLimit && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">
            You've reached the limit for {feature}. 
            <a href="/pricing" className="text-red-600 hover:text-red-800 underline ml-1">
              Upgrade now to continue
            </a>
          </p>
        </div>
      )}
    </div>
  );
}