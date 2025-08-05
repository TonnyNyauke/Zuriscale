'use client';

import React, { useState, useEffect } from 'react';
import { Check, MessageCircle, Loader2, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { Receipt } from '@/app/types/pos';

interface WhatsAppReceiptModalProps {
  isOpen: boolean;
  receipt: Receipt | null;
  onClose: () => void;
  onComplete: () => void;
}

export default function WhatsAppReceiptModal({ 
  isOpen, 
  receipt, 
  onClose, 
  onComplete 
}: WhatsAppReceiptModalProps) {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && receipt) {
      // Generate a mock receipt URL
      setReceiptUrl(`https://zuriscale.com/receipt/${receipt.id}`);
      simulateWhatsAppSend();
    }
  }, [isOpen, receipt]);

  const simulateWhatsAppSend = async () => {
    setIsSending(true);
    setIsSuccess(false);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
    }, 2500);
  };

  const formatReceiptMessage = () => {
    if (!receipt) return '';
    
    const itemsList = receipt.items
      .map(item => `• ${item.name} x${item.quantity} - KES ${(item.price * item.quantity).toLocaleString()}`)
      .join('\n');

    return `🧾 *DIGITAL RECEIPT*

👋 Hi ${receipt.customerName}!

Thank you for shopping with us today!

📋 *ORDER DETAILS:*
${itemsList}

💰 *PAYMENT SUMMARY:*
Subtotal: KES ${receipt.subtotal.toLocaleString()}
VAT (16%): KES ${receipt.tax.toLocaleString()}
*Total: KES ${receipt.total.toLocaleString()}*

🕐 Date: ${new Date(receipt.timestamp).toLocaleDateString('en-KE', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

🛍️ *Browse our latest collection:*
${receiptUrl}

We'd love to see you again soon! 💕

---
✨ Powered by Zuriscale
🌐 zuriscale.com`;
  };

  const copyReceiptMessage = async () => {
    try {
      await navigator.clipboard.writeText(formatReceiptMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!isOpen || !receipt) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0f766e] to-[#059669] p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">WhatsApp Receipt</h2>
                <p className="text-green-100">Sending to {receipt.customerName}</p>
              </div>
            </div>
            {!isSending && !isSuccess && (
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Status */}
          <div className="mb-6">
            {isSending && (
              <div className="flex items-center justify-center space-x-3 py-8">
                <Loader2 className="h-8 w-8 text-[#0f766e] animate-spin" />
                <div className="text-center">
                  <p className="font-medium text-gray-900">Sending receipt...</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Delivering to {receipt.customerPhone}
                  </p>
                </div>
              </div>
            )}

            {isSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Receipt Sent Successfully!</p>
                    <p className="text-sm text-green-600 mt-1">
                      Digital receipt delivered to {receipt.customerPhone}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Receipt Preview */}
          {isSuccess && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Message Preview:</h3>
                <button
                  onClick={copyReceiptMessage}
                  className="flex items-center space-x-2 text-sm text-[#0f766e] hover:text-[#0d5d56]"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                  {formatReceiptMessage()}
                </pre>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <ExternalLink className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800">Customer Catalog Link</p>
                    <p className="text-sm text-blue-600 mt-1">
                      {receipt.customerName} can browse your full collection and share with friends
                    </p>
                    <a 
                      href={receiptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline hover:text-blue-800 mt-2 inline-block"
                    >
                      {receiptUrl}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {isSuccess && (
          <div className="border-t p-6 bg-gray-50">
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
              >
                Close
              </button>
              <button
                onClick={onComplete}
                className="flex-1 py-3 px-4 bg-[#0f766e] text-white rounded-lg hover:bg-[#0d5d56] font-medium"
              >
                Complete Sale
              </button>
            </div>
            
            <p className="text-xs text-gray-500 text-center mt-3">
              Your customer will receive this message in their WhatsApp inbox
            </p>
          </div>
        )}
      </div>
    </div>
  );
}