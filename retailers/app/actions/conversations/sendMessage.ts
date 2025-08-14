import { createClient } from "@/utils/supabase/client";
import { Message } from "@/app/types/types";

const supabase = createClient();

export async function sendMessage(
  conversationId: string, 
  text: string, 
  sender: 'customer' | 'agent' = 'agent'
): Promise<Message> {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  const newMessage = {
    conversation_id: conversationId,
    text,
    sender,
    timestamp: new Date().toISOString(),
    status: 'sent'
  };

  const { data, error } = await supabase
    .from('messages')
    .insert([newMessage])
    .select()
    .single();

  if (error) {
    console.error('Error sending message:', error);
    throw error;
  }

  // Update conversation's last_message and last_activity
  await supabase
    .from('conversations')
    .update({
      last_message: text,
      last_activity: new Date().toISOString()
    })
    .eq('id', conversationId);

  return {
    id: data.id,
    text: data.text,
    sender: data.sender as 'customer' | 'agent',
    timestamp: data.timestamp,
    status: data.status as 'sent' | 'delivered' | 'read'
  };
}
