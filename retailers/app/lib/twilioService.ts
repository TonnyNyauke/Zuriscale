import { InboxService } from './inboxService';
import { Conversation, Message } from '@/app/types/types';

interface WhatsAppMessageData {
  to: string;
  message?: string;
  mediaUrl?: string | string[];
}

interface WhatsAppResponse {
  success: boolean;
  messageSid?: string;
  status?: string;
  error?: string;
  code?: string;
}

interface ReceiptItem {
  name: string;
  price: number;
  quantity?: number;
}

interface ReceiptData {
  storeName: string;
  date?: string;
  receiptNumber?: string;
  items: ReceiptItem[];
  total: number;
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
}

export class TwilioService {
  /**
   * Send WhatsApp message via API route
   */
  static async sendWhatsAppMessage(data: WhatsAppMessageData): Promise<WhatsAppResponse> {
    try {
      const response = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: WhatsAppResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send WhatsApp message');
      }

      return result;

    } catch (error: unknown) {
      let errorMessage = 'Network error occurred';
      
      if (error instanceof Error) {
        errorMessage = error.message;
        console.error('WhatsApp sending failed:', errorMessage);
      } else {
        console.error('Unexpected error type:', error);
      }
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Format receipt data into a readable message
   */
  static formatReceiptMessage(receiptData: ReceiptData): string {
    const formattedDate = receiptData.date || new Date().toLocaleDateString();
    const formattedReceiptNumber = receiptData.receiptNumber || 'N/A';
    
    const itemsList = receiptData.items.map((item, index) => 
      `${index + 1}. ${item.name} - KES ${item.price.toFixed(2)}` +
      (item.quantity ? ` (x${item.quantity})` : ''))
      .join('\n') || 'No items';

    return `
🧾 *Receipt from ${receiptData.storeName}*

📅 Date: ${formattedDate}
🎫 Receipt #: ${formattedReceiptNumber}

📦 *Items:*
${itemsList}

💰 *Total: KES ${receiptData.total.toFixed(2)}*

Thank you for your purchase! 🙏
`.trim();
  }

  /**
   * Send WhatsApp receipt with formatted message and save to inbox
   */
  static async sendWhatsAppReceipt(
    phoneNumber: string,
    receiptData: ReceiptData,
    includeMedia: boolean = false
  ): Promise<WhatsAppResponse> {
    const formattedMessage = this.formatReceiptMessage(receiptData);
    
    const messageData: WhatsAppMessageData = {
      to: phoneNumber,
      message: formattedMessage,
    };

    // Add media if requested
    if (includeMedia) {
      messageData.mediaUrl = [
        "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
      ];
    }

    // Send via Twilio
    const twilioResponse = await this.sendWhatsAppMessage(messageData);

    // If Twilio message was successful, save to inbox database
    if (twilioResponse.success && receiptData.customerId) {
      try {
        await this.saveReceiptToInbox(receiptData, formattedMessage);
      } catch (error) {
        console.error('Failed to save receipt to inbox:', error);
        // Don't fail the entire operation if inbox save fails
      }
    }

    return twilioResponse;
  }

  /**
   * Save receipt message to inbox database
   */
  static async saveReceiptToInbox(receiptData: ReceiptData, messageText: string): Promise<void> {
    if (!receiptData.customerId) {
      throw new Error('Customer ID is required to save receipt to inbox');
    }

    try {
      // Get or create conversation for this customer
      let conversation = await this.getOrCreateConversation(receiptData.customerId);
      
      // Save the receipt message to the conversation
      await InboxService.sendNewMessage(conversation.id, messageText);
      
      console.log(`Receipt saved to inbox for customer ${receiptData.customerId}`);
    } catch (error) {
      console.error('Error saving receipt to inbox:', error);
      throw error;
    }
  }

  /**
   * Get existing conversation or create new one for customer
   */
  static async getOrCreateConversation(customerId: string): Promise<Conversation> {
    try {
      // Try to get existing conversations
      const conversations = await InboxService.fetchInboxData();
      const existingConversation = conversations.conversations.find(
        conv => conv.customer_id === customerId
      );

      if (existingConversation) {
        return existingConversation;
      }

      // Create new conversation if none exists
      return await InboxService.createNewConversation(customerId);
    } catch (error) {
      console.error('Error getting or creating conversation:', error);
      throw error;
    }
  }

  /**
   * Send a general WhatsApp message and save to inbox
   */
  static async sendMessageWithInboxSync(
    phoneNumber: string,
    messageText: string,
    customerId?: string,
    includeMedia: boolean = false
  ): Promise<WhatsAppResponse> {
    const messageData: WhatsAppMessageData = {
      to: phoneNumber,
      message: messageText,
    };

    if (includeMedia) {
      messageData.mediaUrl = [
        "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
      ];
    }

    // Send via Twilio
    const twilioResponse = await this.sendWhatsAppMessage(messageData);

    // If Twilio message was successful and we have customer ID, save to inbox
    if (twilioResponse.success && customerId) {
      try {
        const conversation = await this.getOrCreateConversation(customerId);
        await InboxService.sendNewMessage(conversation.id, messageText);
      } catch (error) {
        console.error('Failed to save message to inbox:', error);
        // Don't fail the entire operation if inbox save fails
      }
    }

    return twilioResponse;
  }

  /**
   * Send simple WhatsApp message with media
   */
  static async createMessage(phoneNumber: string = "+254742065923"): Promise<WhatsAppResponse> {
    return this.sendWhatsAppMessage({
      to: phoneNumber,
      mediaUrl: [
        "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
      ],
    });
  }
}
