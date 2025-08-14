import { getCustomers } from '@/app/actions/customers/getCustomers';
import { getConversations } from '@/app/actions/conversations/getConversations';
import { getMessages } from '@/app/actions/conversations/getMessages';
import { sendMessage } from '@/app/actions/conversations/sendMessage';
import { createConversation } from '@/app/actions/conversations/createConversation';
import { Conversation, Customer, Message } from '@/app/types/types';

export class InboxService {
  static async fetchInboxData() {
    try {
      // Fetch conversations and customers in parallel
      const [conversations, customers] = await Promise.all([
        getConversations(),
        getCustomers()
      ]);

      // Get the first conversation as active (or null if no conversations)
      const activeConversation = conversations.length > 0 ? conversations[0] : null;
      
      // Get customer for the active conversation
      let customer: Customer | null = null;
      if (activeConversation) {
        customer = customers.find(c => c.id === activeConversation.customer_id) || null;
      }

      return {
        conversations,
        activeConversation,
        customer,
        customers
      };
    } catch (error) {
      console.error('Error fetching inbox data:', error);
      throw error;
    }
  }

  static async fetchCustomerById(customerId: string): Promise<Customer | null> {
    try {
      const customers = await getCustomers();
      return customers.find(customer => customer.id === customerId) || null;
    } catch (error) {
      console.error('Error fetching customer by ID:', error);
      return null;
    }
  }

  static async fetchConversationMessages(conversationId: string): Promise<Message[]> {
    try {
      return await getMessages(conversationId);
    } catch (error) {
      console.error('Error fetching conversation messages:', error);
      return [];
    }
  }

  static async sendNewMessage(conversationId: string, text: string): Promise<Message | null> {
    try {
      return await sendMessage(conversationId, text, 'agent');
    } catch (error) {
      console.error('Error sending message:', error);
      return null;
    }
  }

  static async getConversationWithMessages(conversationId: string): Promise<Conversation | null> {
    try {
      const conversations = await getConversations();
      const conversation = conversations.find(c => c.id === conversationId);
      
      if (conversation) {
        const messages = await getMessages(conversationId);
        return {
          ...conversation,
          messages
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching conversation with messages:', error);
      return null;
    }
  }

  static async createNewConversation(customerId: string): Promise<Conversation> {
    try {
      return await createConversation(customerId);
    } catch (error) {
      console.error('Error creating new conversation:', error);
      throw error;
    }
  }
}
