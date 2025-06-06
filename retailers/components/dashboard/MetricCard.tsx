import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: 'positive' | 'negative';
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  description,
  trend 
}) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <span className={`ml-2 text-sm ${trend === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'positive' ? '↑' : '↓'} 
          </span>
        )}
      </div>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
    </div>
  );
};

export default MetricCard;