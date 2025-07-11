// In your types file or at the top of the component
export interface DashboardCustomer {
  id: string;
  name: string;
  total_spent: number;
  last_purchase: string;
}

export interface Customer {
    id: string;
    name: string;
    phone: string;
    first_purchase: string;
    last_purchase: string;
    purchase_count: number,
    total_spent: number;
    status: 'new' | 'repeat' | 'churned';
    status_level: string;
    total_orders: number;
    last_order: string;
    tags: string[],
    notes: string
  }

export interface Campaign {
  id: string;
  name: string;
  type: 'whatsapp' | 'sms' | 'instagram' | 'facebook';
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  target_count: number;
  delivered_count: number;
  open_rate: number;
  created_at: string;
  scheduled_at?: string;
  message: string;
  criteria: {
    min_orders?: number;
    last_purchase_days?: number;
    tags?: string[];
  };
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
  customer_name: string;
  customer_type: string;
  priority: string;
  assigned_to: string | null; 
  last_message: string;
  unread_count: number;
  last_activity: string;
  status: 'open' | 'closed' | 'pending' | 'resolved';
  messages: Message[]; // Add this line
}

// Add these interfaces to your component files or a shared types file

// For ConversationList component
export interface ConversationListProps {
  conversations: Conversation[];
  onSelectConversation: (conversation: Conversation) => void;
  selectedId?: string;
}

// For MessageThread component
export interface MessageThreadProps {
  conversation: Conversation;
  onShowProfile: () => void;
  hideHeader?: boolean;
}

// For CustomerProfile component
export interface CustomerProfileProps {
  customer: Customer;
}

// For MessageInput component (if it needs props)
export interface MessageInputProps {
  // Add any props MessageInput might need
  onSendMessage?: (message: string) => void;
}

// src/types/types.ts
// Add to existing types

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  sku: string;
  category: string;
  description?: string;
  costPrice?: number;
}

export interface Category {
  id: string;
  name: string;
  productCount: number;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  whatsapp_credits: number;
  sms_credits: number;
  features: string[];
}

export interface Prospect {
  id: string;
  name: string;
  phone: string;
  inquiry: string;
  visit_date: string;
  budget: number;
  status: 'new' | 'contacted' | 'interested' | 'not_interested' | 'converted';
  created_at: string;
}

// types/blog.ts
export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  author: {
    name: string;
    bio: string;
    avatar?: string;
  };
  coverImage?: string;
  readTime: number;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  tags: string[];
}