// src/app/(main)/inbox/page.tsx
import React from 'react';
import MessageInput from '@/components/inbox/MessageInput';
import ConversationList from '@/components/inbox/ConversationList';
import MessageThread from '@/components/inbox/MessageThread';
import CustomerProfile from '@/components/inbox/CustomerProfile';
import { fetchInboxData } from '@/app/lib/data';

export default async function InboxPage() {
  const { conversations, activeConversation, customer } = await fetchInboxData();
  
  return (
    <div className="flex flex-1 h-full">
      <div className="w-1/3 border-r border-gray-200">
        <ConversationList conversations={conversations} />
      </div>
      
      <div className="w-2/3 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <MessageThread conversation={activeConversation} />
        </div>
        
        <div className="border-t border-gray-200 p-4">
          <MessageInput />
        </div>
      </div>
      
      <div className="w-1/4 border-l border-gray-200">
        <CustomerProfile customer={customer} />
      </div>
    </div>
  );
}