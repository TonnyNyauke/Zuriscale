//app/(main)/dashboard/page.tsx
import MetricCard from '@/components/dashboard/MetricCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import CustomerList from '@/components/dashboard/CustomerList';
import QuickActions from '@/components/dashboard/QuickActions';
import { fetchDashboardData } from '@/app/lib/data';

export default async function Dashboard() {
  const { analytics } = await fetchDashboardData();
  
  return (
    <div className="px-4 py-6 pb-24 max-w-sm mx-auto sm:max-w-none sm:px-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          Business Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Track your customer retention & growth
        </p>
      </div>
      
      {/* Priority Metrics - Mobile: 2x2 grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <MetricCard 
          title="Repeat Customers" 
          value={analytics.repeat_customers} 
          trend="positive"
          priority
        />
        <MetricCard 
          title="Repeat Rate" 
          value={analytics.repeat_rate} 
          description="vs last month"
          trend="positive"
          priority
        />
        <MetricCard 
          title="Churn Rate" 
          value={analytics.churn_rate} 
          trend="negative"
        />
        <MetricCard 
          title="Avg Value" 
          value={analytics.avg_clv} 
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <QuickActions />
      </div>
      
      {/* Customer List - Priority Section */}
      <div className="mb-6">
        <CustomerList customers={analytics.top_customers.map(customer => ({
          ...customer,
          phone: '',
          first_purchase: '',
          status: 'repeat' as const
        }))} />
      </div>

      {/* Revenue Chart - Secondary */}
      <div className="mb-6">
        <RevenueChart data={analytics.revenue_trends.daily} />
      </div>
    </div>
  );
}