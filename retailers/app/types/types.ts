export interface Customer {
    id: string;
    name: string;
    phone: string;
    first_purchase: string;
    last_purchase: string;
    total_spent: number;
    status: 'new' | 'repeat' | 'churned';
    status_level: string;
    total_orders: number;
    last_order: string;
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