// src/lib/data.ts
import { Customer, Analytics, Campaign } from '@/types/types';

// Simulate database fetch
export const fetchDashboardData = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    analytics: {
      new_customers: 1,
      repeat_customers: 2,
      repeat_rate: "66.7%",
      churn_rate: "33.3%",
      avg_clv: "KES 8,133",
      revenue_trends: {
        daily: [
          { date: "2024-05-20", revenue: 4500 },
          { date: "2024-05-19", revenue: 0 },
          { date: "2024-05-18", revenue: 8400 }
        ]
      },
      top_customers: [
        {
          id: "cust_001",
          name: "Sarah K.",
          total_spent: 12500,
          last_purchase: "3 days ago"
        }
      ]
    }
  };
};

export const fetchCustomerData = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    customers: [
      {
        id: "cust_001",
        name: "Sarah K.",
        phone: "+254722111222",
        first_purchase: "2024-05-01",
        last_purchase: "2024-05-20",
        total_spent: 12500,
        status: "repeat"
      }
    ]
  };
};