// components/customers/DashboardStats.tsx
import React from 'react';
import { Users, Target, ShoppingBag, DollarSign } from 'lucide-react';
import StatsCard from './StatsCard';
import { Customer, Prospect } from '@/app/types/types';

interface DashboardStatsProps {
  customers: Customer[];
  prospects: Prospect[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ customers, prospects }) => {
  // Calculate stats
  const totalCustomers = customers.length;
  const totalProspects = prospects.length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.total_spent, 0);
  const activeProspects = prospects.filter(p => ['new', 'contacted', 'interested'].includes(p.status)).length;
  
  // Calculate conversion rate
  const convertedProspects = prospects.filter(p => p.status === 'converted').length;
  const conversionRate = prospects.length > 0 ? ((convertedProspects / prospects.length) * 100).toFixed(1) : '0';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Customers"
        value={totalCustomers}
        subtitle="Paying customers"
        icon={Users}
        color="teal"
        trend="+12% this month"
      />
      
      <StatsCard
        title="Active Prospects"
        value={activeProspects}
        subtitle={`${totalProspects} total prospects`}
        icon={Target}
        color="coral"
        trend={`${conversionRate}% conversion rate`}
      />
      
      <StatsCard
        title="Total Revenue"
        value={`KES ${totalRevenue.toLocaleString()}`}
        subtitle="All time"
        icon={DollarSign}
        color="green"
        trend="+8% this month"
      />
      
      <StatsCard
        title="Avg. Order Value"
        value={`KES ${totalCustomers > 0 ? Math.round(totalRevenue / totalCustomers).toLocaleString() : '0'}`}
        subtitle="Per customer"
        icon={ShoppingBag}
        color="gray"
      />
    </div>
  );
};

export default DashboardStats;