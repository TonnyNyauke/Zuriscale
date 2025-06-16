//components/dashboard/MetricCard.tsx
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: 'positive' | 'negative';
  priority?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  description,
  trend,
  priority = false
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${
      priority ? 'ring-2 ring-orange-100 bg-gradient-to-br from-orange-50 to-white' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-gray-600 text-sm font-medium leading-tight">{title}</h3>
          <div className="mt-3 flex items-baseline">
            <p className={`font-bold text-gray-900 ${
              priority ? 'text-2xl' : 'text-xl'
            }`}>
              {value}
            </p>
            {trend && (
              <span className={`ml-2 text-lg ${
                trend === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend === 'positive' ? '↗' : '↘'} 
              </span>
            )}
          </div>
          {description && (
            <p className="mt-2 text-xs text-gray-500 leading-tight">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;