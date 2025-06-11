//components/inbox/MessageThread.tsx
import React from 'react';
import MessageBubble from './MessageBubble';
import { Conversation } from '@/app/types/types';

interface MessageThreadProps {
  conversation: Conversation;
}

export default function MessageThread({ conversation }: MessageThreadProps) {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="border-b pb-4 mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF9E58] flex items-center justify-center text-white font-bold">
            SK
          </div>
          <div className="ml-3">
            <h3 className="font-medium">Sarah K.</h3>
            <p className="text-sm text-gray-500">Online now</p>
          </div>
          <div className="ml-auto flex space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              📞
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              ⓘ
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4">
        {conversation.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}