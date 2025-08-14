'use server';

import { TwilioService } from '@/app/lib/twilioService';
import { Sale, Customer, CartItem } from '@/app/types/pos';

export interface SaleData {
  customer: Customer;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  receiptNumber?: string;
  storeName?: string;
}

/**
 * Process a sale and send receipt via WhatsApp with inbox integration
 */
export async function processSaleWithReceipt(saleData: SaleData): Promise<{
  success: boolean;
  messageSid?: string;
  error?: string;
}> {
  try {
    // Format receipt data for Twilio
    const receiptData = {
      storeName: saleData.storeName || 'Your Store',
      date: new Date().toLocaleDateString(),
      receiptNumber: saleData.receiptNumber || `RCP-${Date.now()}`,
      items: saleData.items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: saleData.total,
      customerId: saleData.customer.id,
      customerName: saleData.customer.customer_name,
      customerPhone: saleData.customer.customer_phone
    };

    // Send receipt via WhatsApp and save to inbox
    const response = await TwilioService.sendWhatsAppReceipt(
      saleData.customer.customer_phone,
      receiptData,
      false // Set to true if you want to include media
    );

    if (response.success) {
      console.log(`Sale processed successfully. Receipt sent to ${saleData.customer.customer_phone}`);
      return {
        success: true,
        messageSid: response.messageSid
      };
    } else {
      console.error('Failed to send receipt:', response.error);
      return {
        success: false,
        error: response.error || 'Failed to send receipt'
      };
    }

  } catch (error) {
    console.error('Error processing sale:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Send a follow-up message to customer after sale
 */
export async function sendFollowUpMessage(
  customerId: string,
  customerPhone: string,
  message: string
): Promise<{
  success: boolean;
  messageSid?: string;
  error?: string;
}> {
  try {
    const response = await TwilioService.sendMessageWithInboxSync(
      customerPhone,
      message,
      customerId
    );

    return {
      success: response.success,
      messageSid: response.messageSid,
      error: response.error
    };

  } catch (error) {
    console.error('Error sending follow-up message:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Send order confirmation message
 */
export async function sendOrderConfirmation(
  customerId: string,
  customerPhone: string,
  orderDetails: {
    orderNumber: string;
    items: CartItem[];
    total: number;
    estimatedDelivery?: string;
  }
): Promise<{
  success: boolean;
  messageSid?: string;
  error?: string;
}> {
  const itemsList = orderDetails.items
    .map(item => `• ${item.name} x${item.quantity} - KES ${(item.price * item.quantity).toLocaleString()}`)
    .join('\n');

  const message = `📦 *ORDER CONFIRMATION*

Thank you for your order!

🎫 Order #: ${orderDetails.orderNumber}
📅 Date: ${new Date().toLocaleDateString()}

📋 *Items:*
${itemsList}

💰 *Total: KES ${orderDetails.total.toLocaleString()}*

${orderDetails.estimatedDelivery ? `🚚 Estimated Delivery: ${orderDetails.estimatedDelivery}` : ''}

We'll notify you when your order is ready for pickup or delivery.

Thank you for choosing us! 🙏`;

  return sendFollowUpMessage(customerId, customerPhone, message);
}

/**
 * Send delivery update message
 */
export async function sendDeliveryUpdate(
  customerId: string,
  customerPhone: string,
  orderNumber: string,
  status: 'preparing' | 'ready' | 'shipped' | 'delivered',
  additionalInfo?: string
): Promise<{
  success: boolean;
  messageSid?: string;
  error?: string;
}> {
  const statusMessages = {
    preparing: '🔄 Your order is being prepared',
    ready: '✅ Your order is ready for pickup!',
    shipped: '🚚 Your order is on the way',
    delivered: '🎉 Your order has been delivered!'
  };

  const message = `${statusMessages[status]}

🎫 Order #: ${orderNumber}
📅 Update: ${new Date().toLocaleDateString()}

${additionalInfo ? `ℹ️ ${additionalInfo}` : ''}

Thank you for your patience! 🙏`;

  return sendFollowUpMessage(customerId, customerPhone, message);
}