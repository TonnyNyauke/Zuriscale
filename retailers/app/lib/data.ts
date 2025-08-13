//lib/data.ts

import { Campaign, Conversation, Customer } from "../types/types";

// Enhanced mock data structured like real database responses
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
      customer_name: "Sarah Mwangi",
      last_message: "That's great news! Thanks for your help.",
      unread_count: 0,
      last_activity: "2024-05-20T14:30:00Z",
      status: "open",
      priority: "normal",
      assigned_to: "John Doe",
      customer_type: "vip",
      messages
    },
    {
      id: "conv_002",
      customer_id: "cust_002",
      customer_name: "Grace Njeri",
      last_message: "Do you have any new arrivals in dresses?",
      unread_count: 3,
      last_activity: "2024-05-20T15:45:00Z",
      status: "open",
      priority: "high",
      assigned_to: null,
      customer_type: "repeat",
      messages: []
    },
    {
      id: "conv_003",
      customer_id: "cust_003",
      customer_name: "Mary Wanjiku",
      last_message: "Do you have this in size L?",
      unread_count: 1,
      last_activity: "2024-05-20T09:45:00Z",
      status: "open",
      priority: "normal",
      assigned_to: "Jane Smith",
      customer_type: "new",
      messages: []
    },
    {
      id: "conv_004",
      customer_id: "cust_004",
      customer_name: "Alice Adhiambo",
      last_message: "Thanks for the discount code!",
      unread_count: 0,
      last_activity: "2024-05-19T11:15:00Z",
      status: "resolved",
      priority: "normal",
      assigned_to: "John Doe",
      customer_type: "repeat",
      messages: []
    },
    {
      id: "conv_005",
      customer_id: "cust_005",
      customer_name: "Faith Akinyi",
      last_message: "Is my order ready for pickup?",
      unread_count: 2,
      last_activity: "2024-05-20T16:20:00Z",
      status: "open",
      priority: "high",
      assigned_to: null,
      customer_type: "vip",
      messages: []
    },
    {
      id: "conv_006",
      customer_id: "cust_006",
      customer_name: "Rose Chebet",
      last_message: "What are your store hours?",
      unread_count: 1,
      last_activity: "2024-05-20T08:30:00Z",
      status: "open",
      priority: "low",
      assigned_to: "Jane Smith",
      customer_type: "new",
      messages: []
    }
  ];

  const activeConversation = conversations[0];

  // Structure as an array like a real database would return
  const customers: Customer[] = [
    {
      id: "cust_001",
      name: "Sarah Mwangi",
      phone_number: "+254723111222",
      first_purchase_date: "2024-03-15",
      last_purchase_date: "2024-05-20",
      last_order: "2024-05-17",
      total_orders: 8,
      total_spent: 25400,
      status: "repeat",
      status_level: 'Gold',
      tags: ["VIP", "Loyal", "Evening Delivery"],
      notes: "Prefers evening deliveries. Loves floral dresses. Size M.",
      purchase_count: 4
    },
    {
      id: "cust_002",
      name: "Grace Njeri",
      phone_number: "+254733222333",
      first_purchase_date: "2024-04-01",
      last_purchase_date: "2024-05-15",
      last_order: "2024-05-15",
      total_orders: 4,
      total_spent: 18200,
      status: "repeat",
      status_level: 'Regular',
      tags: ["Frequent Buyer", "Corporate"],
      notes: "Works in corporate, prefers professional wear. Size L.",
      purchase_count: 3
    },
    {
      id: "cust_003",
      name: "Mary Wanjiku",
      phone_number: "+254744333444",
      first_purchase_date: "2024-05-18",
      last_purchase_date: "2024-05-18",
      last_order: "2024-05-18",
      total_orders: 1,
      total_spent: 3200,
      status: "new",
      status_level: 'Regular',
      tags: ["New Customer"],
      notes: "First time buyer. Interested in casual wear.",
      purchase_count: 2
    }
  ];

  // Return the first customer as active (like you'd get from a DB query)
  const customer = customers.find(c => c.id === "cust_001") || null;

  return {
    conversations,
    activeConversation,
    customer,
    customers
  };
};

// Helper function to find customer by ID (mimics database query)
export const fetchCustomerById = async (customerId: string): Promise<Customer | null> => {
  const { customers } = await fetchInboxData();
  return customers.find(customer => customer.id === customerId) || null;
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
        status: "repeat" as const,
        status_level: "Gold",
        total_orders: 5,
        last_order: "5000",
        tags:["Green Clothes"],
        notes: "Loves Green Clothes"
      },
      {
        id: "cust_002",
        name: "Tonny N.",
        phone: "+254742065623",
        first_purchase: "2024-05-01",
        last_purchase: "2024-05-20",
        total_spent: 12500,
        status: "repeat" as const,
        status_level: "Gold",
        total_orders: 5,
        last_order: "5000",
        tags:[],
        notes: "Loves Green Clothes"
      }
    ]
  };
};

//Campaign
export const fetchCampaignData = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    campaigns: [
      {
        id: "camp_001",
        name: "Loyalty Discount",
        type: "whatsapp" as const,
        status: "sent" as const,
        target_count: 120,
        delivered_count: 118,
        open_rate: 78,
        created_at: "2024-05-15T10:00:00Z",
        message: "Hi {name}! Enjoy 15% off your next purchase with code LOYAL15.",
        criteria: {
          min_orders: 3,
          last_purchase_days: 90,
          tags: ["loyal"]
        }
      },
      {
        id: "camp_002",
        name: "New Collection Launch",
        type: "instagram" as const,
        status: "scheduled" as const,
        target_count: 250,
        delivered_count: 0,
        open_rate: 0,
        created_at: "2024-05-18T14:30:00Z",
        scheduled_at: "2024-05-25T10:00:00Z",
        message: "Our new summer collection is here! First 50 orders get free shipping.",
        criteria: {
          last_purchase_days: 180
        }
      },
      {
        id: "camp_003",
        name: "Abandoned Cart Reminder",
        type: "sms" as const,
        status: "draft" as const,
        target_count: 42,
        delivered_count: 0,
        open_rate: 0,
        created_at: "2024-05-20T09:15:00Z",
        message: "Complete your purchase! Your cart is waiting with special items.",
        criteria: {
          last_purchase_days: 7
        }
      },
      {
        id: "camp_004",
        name: "New Trend",
        type: "sms" as const,
        status: "draft" as const,
        target_count: 42,
        delivered_count: 0,
        open_rate: 0,
        created_at: "2024-05-20T09:15:00Z",
        message: "New blouses to match the new trend.",
        criteria: {
          last_purchase_days: 7
        }
      }
    ] as Campaign[],
    analytics: {
      total_campaigns: 24,
      successful_rate: 85,
      avg_engagement: 42,
      channel_distribution: {
        whatsapp: 65,
        sms: 20,
        instagram: 10,
        facebook: 5
      }
    }
  };
};

export const fetchBundles = async () => {
  return [
    {
      id: 'bundle_1',
      name: 'Starter Pack',
      description: 'Perfect for small businesses',
      price: 500,
      original_price: 600,
      whatsapp_credits: 1000,
      sms_credits: 200,
      features: ['Basic analytics', '24hr support']
    },
    {
      id: 'bundle_2',
      name: 'Growth Pack',
      description: 'For growing retailers',
      price: 1200,
      original_price: 1500,
      whatsapp_credits: 3000,
      sms_credits: 600,
      features: ['Advanced analytics', 'AI campaign suggestions']
    },
    {
      id: 'bundle_3',
      name: 'Pro Pack',
      description: 'For established businesses',
      price: 2500,
      original_price: 3000,
      whatsapp_credits: 6000,
      sms_credits: 1200,
      features: ['Priority support', 'Dedicated account manager']
    },
  ];
};

export const fetchUsage = async () => {
  return {
    whatsapp_used: 850,
    whatsapp_total: 1000,
    sms_used: 150,
    sms_total: 200
  };
};

export const purchaseBundle = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true };
};