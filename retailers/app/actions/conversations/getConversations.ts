import { createClient } from "@/utils/supabase/client";
import { Conversation } from "@/app/types/types";

const supabase = createClient();

export async function getConversations(): Promise<Conversation[]> {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('conversations')
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
    .eq('retailer_id', session.user.id)
    .order('last_activity', { ascending: false });

  if (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }

  // Transform the data to match the Conversation interface
  return data?.map(conv => ({
    id: conv.id,
    customer_id: conv.customer_id,
    customer_name: conv.customers?.name || 'Unknown Customer',
    customer_type: conv.customers?.status || 'new',
    priority: conv.priority || 'normal',
    assigned_to: conv.assigned_to,
    last_message: conv.last_message || '',
    unread_count: conv.unread_count || 0,
    last_activity: conv.last_activity,
    status: conv.status || 'open',
    messages: [] // We'll load messages separately
  })) || [];
}
