// app/(main)/pos/Basic/HelperFunctions/WhatsappReceipt.ts

interface WhatsAppMessageData {
    to: string;           // Phone number in format: +254742065623
    message?: string;     // Text message (optional if sending media only)
    mediaUrl?: string | string[]; // Image/media URL(s)
  }
  
  interface WhatsAppResponse {
    success: boolean;
    messageSid?: string;
    status?: string;
    error?: string;
    code?: string;
  }
  
  /**
   * Send WhatsApp message via API route
   */
  export async function sendWhatsAppMessage(data: WhatsAppMessageData): Promise<WhatsAppResponse> {
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
  
    } catch (error: any) {
      console.error('WhatsApp sending failed:', error);
      return {
        success: false,
        error: error.message || 'Network error occurred',
      };
    }
  }
  
  /**
   * Send WhatsApp receipt with formatted message
   */
  export async function sendWhatsAppReceipt(
    phoneNumber: string,
    receiptData: any,
    includeMedia: boolean = false
  ): Promise<WhatsAppResponse> {
    
    const formattedMessage = formatReceiptMessage(receiptData);
    
    const messageData: WhatsAppMessageData = {
      to: phoneNumber,
      message: formattedMessage,
    };
  
    // Add media if requested
    if (includeMedia) {
      messageData.mediaUrl = [
        "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      ];
    }
  
    return sendWhatsAppMessage(messageData);
  }
  
  /**
   * Format receipt data into a readable message
   */
  function formatReceiptMessage(receiptData: any): string {
    // Customize this based on your receipt data structure
    return `
  🧾 *Receipt from ${receiptData.storeName || 'Store'}*
  
  📅 Date: ${receiptData.date || new Date().toLocaleDateString()}
  🎫 Receipt #: ${receiptData.receiptNumber || 'N/A'}
  
  📦 *Items:*
  ${receiptData.items?.map((item: any, index: number) => 
    `${index + 1}. ${item.name} - $${item.price}`
  ).join('\n') || 'No items'}
  
  💰 *Total: $${receiptData.total || '0.00'}*
  
  Thank you for your purchase! 🙏
    `.trim();
  }
  
  /**
   * Send simple WhatsApp message with media (like your original function)
   */
  export async function createMessage(phoneNumber: string = "+254742065923"): Promise<WhatsAppResponse> {
    return sendWhatsAppMessage({
      to: phoneNumber,
      mediaUrl: [
        "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      ],
    });
  }