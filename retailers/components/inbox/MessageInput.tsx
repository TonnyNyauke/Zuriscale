//components/inbox/MessageInput.tsx
'use client';

import React, { useState } from 'react';
import { InboxService } from '@/app/lib/inboxService';
import { TwilioService } from '@/app/lib/twilioService';

interface MessageInputProps {
  conversationId?: string;
  customerPhone?: string;
  customerId?: string;
  onMessageSent?: (message: any) => void;
}

export default function MessageInput({ conversationId, customerPhone, customerId, onMessageSent }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  
  const handleSend = async () => {
    if (message.trim() && conversationId) {
      setSending(true);
      try {
        let sentMessage;
        
        // If we have customer phone and ID, send via Twilio and save to inbox
        if (customerPhone && customerId) {
          const twilioResponse = await TwilioService.sendMessageWithInboxSync(
            customerPhone,
            message.trim(),
            customerId
          );
          
          if (twilioResponse.success) {
            // Create a message object for the UI
            sentMessage = {
              id: twilioResponse.messageSid || Date.now().toString(),
              text: message.trim(),
              sender: 'agent' as const,
              timestamp: new Date().toISOString(),
              status: 'sent' as const
            };
          } else {
            throw new Error(twilioResponse.error || 'Failed to send message');
          }
        } else {
          // Fallback to just saving to inbox database
          sentMessage = await InboxService.sendNewMessage(conversationId, message.trim());
        }
        
        if (sentMessage && onMessageSent) {
          onMessageSent(sentMessage);
        }
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setSending(false);
      }
    }
  };
  
  return (
    <div className="flex items-center space-x-3">
      <div className="flex-1 bg-white border border-gray-300 rounded-full overflow-hidden">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full px-4 py-2 focus:outline-none"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
      </div>
      
      <div className="flex space-x-2">
        <button className="p-2 text-gray-600 hover:text-gray-900">
          📎
        </button>
        <button 
          onClick={handleSend}
          className={`p-2 rounded-full ${
            message && !sending
              ? 'bg-[#00C49A] text-white' 
              : 'bg-gray-200 text-gray-500'
          }`}
          disabled={!message || sending}
        >
          {sending ? '⏳' : '➤'}
        </button>
      </div>
    </div>
  );
}