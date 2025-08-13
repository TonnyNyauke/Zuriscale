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

// Define types for receipt data
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
function formatReceiptMessage(receiptData: ReceiptData): string {
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
 * Send WhatsApp receipt with formatted message
 */
export async function sendWhatsAppReceipt(
  phoneNumber: string,
  receiptData: ReceiptData,
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
      "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
    ];
  }

  return sendWhatsAppMessage(messageData);
}

/**
 * Send simple WhatsApp message with media
 */
export async function createMessage(phoneNumber: string = "+254742065923"): Promise<WhatsAppResponse> {
  return sendWhatsAppMessage({
    to: phoneNumber,
    mediaUrl: [
      "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
    ],
  });
}