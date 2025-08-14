import { createClient } from "@/utils/supabase/client";
import { Message } from "@/app/types/types";

const supabase = createClient();

export async function getMessages(conversationId: string): Promise<Message[]> {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('timestamp', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }

  // Transform the data to match the Message interface
  return data?.map(msg => ({
    id: msg.id,
    text: msg.text,
    sender: msg.sender as 'customer' | 'agent',
    timestamp: msg.timestamp,
    status: msg.status as 'sent' | 'delivered' | 'read'
  })) || [];
}
