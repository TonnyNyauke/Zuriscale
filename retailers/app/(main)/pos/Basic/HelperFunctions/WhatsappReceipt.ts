// app/(main)/pos/Basic/HelperFunctions/WhatsappReceipt.ts
// Updated to use the integrated TwilioService

import { TwilioService } from '@/app/lib/twilioService';

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

/**
 * Send WhatsApp message via API route
 * @deprecated Use TwilioService.sendWhatsAppMessage instead
 */
export async function sendWhatsAppMessage(data: any): Promise<any> {
  return TwilioService.sendWhatsAppMessage(data);
}

/**
 * Format receipt data into a readable message
 * @deprecated Use TwilioService.formatReceiptMessage instead
 */
function formatReceiptMessage(receiptData: ReceiptData): string {
  return TwilioService.formatReceiptMessage(receiptData);
}

/**
 * Send WhatsApp receipt with formatted message and save to inbox
 */
export async function sendWhatsAppReceipt(
  phoneNumber: string,
  receiptData: ReceiptData,
  includeMedia: boolean = false
): Promise<any> {
  return TwilioService.sendWhatsAppReceipt(phoneNumber, receiptData, includeMedia);
}

/**
 * Send simple WhatsApp message with media
 */
export async function createMessage(phoneNumber: string = "+254742065923"): Promise<any> {
  return TwilioService.createMessage(phoneNumber);
}