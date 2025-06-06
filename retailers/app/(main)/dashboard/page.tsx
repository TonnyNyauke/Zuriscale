//app/(main)/dashboard/page.tsx
import MetricCard from '@/components/dashboard/MetricCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import CustomerList from '@/components/dashboard/CustomerList';
import { fetchDashboardData } from '@/app/lib/data';

export default async function Dashboard() {
  const { analytics } = await fetchDashboardData();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Business Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Repeat Customers" 
          value={analytics.repeat_customers} 
          trend="positive"
        />
        <MetricCard 
          title="Repeat Rate" 
          value={analytics.repeat_rate} 
          description="Higher than last month"
          trend="positive"
        />
        <MetricCard 
          title="Churn Rate" 
          value={analytics.churn_rate} 
          trend="negative"
        />
        <MetricCard 
          title="Avg Customer Value" 
          value={analytics.avg_clv} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RevenueChart data={analytics.revenue_trends.daily} />
        </div>
        <CustomerList customers={analytics.top_customers.map(customer => ({
          ...customer,
          phone: '', // Add required fields with default values
          first_purchase: '',
          status: 'repeat' as const
        }))} />
      </div>
    </div>
  );
}