// src/components/inbox/ConversationList.tsx
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Conversation } from '@/app/types/types';

interface ConversationListProps {
  conversations: Conversation[];
}

export default function ConversationList({ conversations }: ConversationListProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b">
        <input 
          type="text" 
          placeholder="Search conversations..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="divide-y divide-gray-200">
        {conversations.map((conversation) => (
          <div 
            key={conversation.id}
            className={`p-4 cursor-pointer hover:bg-gray-50 ${
              conversation.id === "conv_001" ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex justify-between">
              <div className="font-medium">Sarah K.</div>
              <div className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(conversation.last_activity))} ago
              </div>
            </div>
            
            <div className="flex items-center mt-1">
              <div className="text-sm text-gray-600 truncate flex-1">
                {conversation.last_message}
              </div>
              
              {conversation.unread_count > 0 && (
                <span className="ml-2 bg-[#FF6B35] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {conversation.unread_count}
                </span>
              )}
            </div>
            
            <div className="mt-2">
              <span className={`text-xs px-2 py-1 rounded ${
                conversation.status === 'open' 
                  ? 'bg-green-100 text-green-800' 
                  : conversation.status === 'closed' 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'bg-yellow-100 text-yellow-800'
              }`}>
                {conversation.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}