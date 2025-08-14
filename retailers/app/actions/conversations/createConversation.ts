import { createClient } from "@/utils/supabase/client";
import { Conversation } from "@/app/types/types";

const supabase = createClient();

export async function createConversation(customerId: string): Promise<Conversation> {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  const newConversation = {
    customer_id: customerId,
    retailer_id: session.user.id,
    status: 'open',
    priority: 'normal',
    last_message: '',
    unread_count: 0,
    last_activity: new Date().toISOString(),
    assigned_to: null
  };

  const { data, error } = await supabase
    .from('conversations')
    .insert([newConversation])
    .select(`
      *,
      customers (
        id,
        name,
        phone_number,
        status,
        total_spent,
        total_orders
      )
    `)
    .single();

  if (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }

  return {
    id: data.id,
    customer_id: data.customer_id,
    customer_name: data.customers?.name || 'Unknown Customer',
    customer_type: data.customers?.status || 'new',
    priority: data.priority || 'normal',
    assigned_to: data.assigned_to,
    last_message: data.last_message || '',
    unread_count: data.unread_count || 0,
    last_activity: data.last_activity,
    status: data.status || 'open',
    messages: []
  };
}
