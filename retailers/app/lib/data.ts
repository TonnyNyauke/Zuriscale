//lib/data.ts

import { Conversation, Customer } from "../types/types";

export const fetchInboxData = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const messages = [
    {
      id: "msg_001",
      text: "Hi, I ordered a dress 3 days ago. When will it arrive?",
      sender: "customer" as const,
      timestamp: "2024-05-20T10:30:00Z",
      status: "read" as const
    },
    {
      id: "msg_002",
      text: "Hello Sarah! Thanks for reaching out. Could you share your order number?",
      sender: "agent" as const,
      timestamp: "2024-05-20T10:32:00Z",
      status: "read" as const
    },
    {
      id: "msg_003",
      text: "Sure, it's ORD-789456",
      sender: "customer" as const,
      timestamp: "2024-05-20T10:33:00Z",
      status: "read" as const
    },
    {
      id: "msg_004",
      text: "Thank you! I see your order is scheduled for delivery today between 2-4 PM.",
      sender: "agent" as const,
      timestamp: "2024-05-20T10:35:00Z",
      status: "delivered" as const
    },
    {
      id: "msg_005",
      text: "That's great news! Thanks for your help.",
      sender: "customer" as const,
      timestamp: "2024-05-20T10:36:00Z",
      status: "sent" as const
    }
  ];

  const conversations: Conversation[] = [
    {
      id: "conv_001",
      customer_id: "cust_001",
      last_message: "When will my order arrive?",
      unread_count: 2,
      last_activity: "2024-05-20T14:30:00Z",
      status: "open",
      messages
    },
    {
      id: "conv_002",
      customer_id: "cust_002",
      last_message: "Thanks for the discount!",
      unread_count: 0,
      last_activity: "2024-05-19T11:15:00Z",
      status: "closed",
      messages: []
    },
    {
      id: "conv_003",
      customer_id: "cust_003",
      last_message: "Do you have this in size L?",
      unread_count: 1,
      last_activity: "2024-05-20T09:45:00Z",
      status: "open",
      messages: []
    }
  ];

  const activeConversation = conversations[0];

  const customer: Customer = {
    id: "cust_001",
    name: "Sarah K.",
    phone: "+254722111222",
    first_purchase: "2024-05-01",
    last_purchase: "2024-05-20",
    last_order: "2024-05-17",
    total_orders: 5,
    total_spent: 12500,
    status: "repeat",
    tags: ["VIP", "Loyal"],
    notes: "Prefers evening deliveries"
  };

  return {
    conversations,
    activeConversation,
    customer
  };
};


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
        },
        {
          id:"cust_002",
          name: "Tonny Nyauke",
          total_spent: 20300,
          last_purchase: "5 days ago"
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