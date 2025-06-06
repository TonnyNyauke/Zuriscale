import React from 'react';

interface RevenueData {
  date: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const maxRevenue = Math.max(...data.map(d => d.revenue), 0);
  
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-gray-900 font-medium mb-4">Daily Revenue</h3>
      <div className="flex items-end h-40 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-gradient-to-t from-[#FF6B35] to-[#FF9E58] rounded-t"
              style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
            />
            <span className="text-xs text-gray-500 mt-1">
              {new Date(item.date).toLocaleDateString('en-KE', { day: 'numeric' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;