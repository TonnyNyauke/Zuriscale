//Scomponents/inbox/MessageBubble.tsx
import React from 'react';
import { format } from 'date-fns';
import { Message } from '@/app/types/types';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isCustomer = message.sender === 'customer';
  
  return (
    <div className={`flex ${isCustomer ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
        isCustomer 
          ? 'bg-white border border-gray-200 rounded-tl-none' 
          : 'bg-[#D9FDD3] rounded-tr-none'
      }`}>
        <p>{message.text}</p>
        <div className={`text-xs mt-1 flex ${
          isCustomer ? 'text-gray-500' : 'text-green-600 justify-end'
        }`}>
          {format(new Date(message.timestamp), 'HH:mm')}
          {!isCustomer && (
            <span className="ml-1">
              {message.status === 'sent' ? '✓' : message.status === 'delivered' ? '✓✓' : '✓✓✓'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}