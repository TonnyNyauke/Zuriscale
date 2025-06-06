export interface Customer {
    id: string;
    name: string;
    phone: string;
    first_purchase: string;
    last_purchase: string;
    total_spent: number;
    status: 'new' | 'repeat' | 'churned';
  }
  
  export interface Campaign {
    id: string;
    name: string;
    type: 'whatsapp' | 'sms';
    status: 'draft' | 'sent' | 'failed';
    created_at: string;
    message: string;
    sent_to: string[];
  }
  
  export interface Analytics {
    new_customers: number;
    repeat_customers: number;
    repeat_rate: string;
    churn_rate: string;
    avg_clv: string;
    revenue_trends: {
      daily: { date: string; revenue: number }[];
      weekly: { week: string; revenue: number }[];
    };
    top_customers: {
      id: string;
      name: string;
      total_spent: number;
      last_purchase: string;
    }[];
  }