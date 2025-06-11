export interface Customer {
    id: string;
    name: string;
    phone: string;
    first_purchase: string;
    last_purchase: string;
    total_spent: number;
    status: 'new' | 'repeat' | 'churned';
    total_orders: number;
    last_order: string;
    tags: string[];
    notes: string
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


export interface Message {
  id: string;
  text: string;
  sender: 'customer' | 'agent';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  customer_id: string;
  last_message: string;
  unread_count: number;
  last_activity: string;
  status: 'open' | 'closed' | 'pending';
  messages: Message[]; // Add this line
}