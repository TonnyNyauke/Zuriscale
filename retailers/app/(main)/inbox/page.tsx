'use client';

import React, { useState, useEffect } from 'react';
import MessageInput from '@/components/inbox/MessageInput';
import ConversationList from '@/components/inbox/ConversationList';
import MessageThread from '@/components/inbox/MessageThread';
import CustomerProfile from '@/components/inbox/CustomerProfile';
import { fetchInboxData } from '@/app/lib/data';
import { Conversation, Customer } from '@/app/types/types';

// Mobile view states
type MobileView = 'conversations' | 'chat' | 'profile';

export default function InboxPage() {
  const [mobileView, setMobileView] = useState<MobileView>('conversations');
  const [selectedConversation, setSelectedConversation] = useState<Conversation>();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [customer, setCustomer] = useState<Customer>();
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const loadInboxData = async () => {
      try {
        const { conversations, activeConversation, customer } = await fetchInboxData();
        setConversations(conversations);
        setSelectedConversation(activeConversation);
        setCustomer(customer);
      } catch (error) {
        console.error('Error loading inbox data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInboxData();
  }, []);

  const handleConversationSelect = (conversation: any) => {
    setSelectedConversation(conversation);
    setMobileView('chat');
  };

  const handleBackToConversations = () => {
    setMobileView('conversations');
  };

  const handleShowProfile = () => {
    setMobileView('profile');
  };

  const handleBackFromProfile = () => {
    setMobileView('chat');
  };

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-1 h-full">
        <div className="w-1/3 border-r border-gray-200">
          <ConversationList 
            conversations={conversations} 
            onSelectConversation={handleConversationSelect}
            selectedId={selectedConversation?.id}
          />
        </div>
        
        <div className="w-2/3 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <MessageThread 
              conversation={selectedConversation} 
              onShowProfile={handleShowProfile}
            />
          </div>
          
          <div className="border-t border-gray-200 p-4">
            <MessageInput />
          </div>
        </div>
        
        <div className="w-1/4 border-l border-gray-200">
          <CustomerProfile customer={customer} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-1 h-full relative">
        {/* Conversations View */}
        <div className={`absolute inset-0 bg-white transition-transform duration-300 ease-in-out ${
          mobileView === 'conversations' ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="h-full">
            <ConversationList 
              conversations={conversations} 
              onSelectConversation={handleConversationSelect}
              selectedId={selectedConversation?.id}
            />
          </div>
        </div>

        {/* Chat View */}
        <div className={`absolute inset-0 bg-white transition-transform duration-300 ease-in-out ${
          mobileView === 'chat' ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="h-full flex flex-col">
            {/* Mobile Chat Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <button 
                onClick={handleBackToConversations}
                className="p-2 -ml-2 rounded-full hover:bg-gray-100"
              >
                ← Back
              </button>
              <button 
                onClick={handleShowProfile}
                className="p-2 -mr-2 rounded-full hover:bg-gray-100"
              >
                👤 Profile
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <MessageThread 
                conversation={selectedConversation} 
                onShowProfile={handleShowProfile}
                hideHeader={true}
              />
            </div>
            
            <div className="border-t border-gray-200 p-4">
              <MessageInput />
            </div>
          </div>
        </div>

        {/* Profile View */}
        <div className={`absolute inset-0 bg-white transition-transform duration-300 ease-in-out ${
          mobileView === 'profile' ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="h-full flex flex-col">
            {/* Mobile Profile Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center">
              <button 
                onClick={handleBackFromProfile}
                className="p-2 -ml-2 rounded-full hover:bg-gray-100"
              >
                ← Back to Chat
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <CustomerProfile customer={customer} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation (Optional - for quick access) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
        <div className="flex justify-around">
          <button 
            onClick={() => setMobileView('conversations')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              mobileView === 'conversations' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
          >
            <span className="text-lg mb-1">💬</span>
            <span className="text-xs">Chats</span>
          </button>
          
          {selectedConversation && (
            <button 
              onClick={() => setMobileView('chat')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                mobileView === 'chat' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              <span className="text-lg mb-1">📱</span>
              <span className="text-xs">Active</span>
            </button>
          )}
          
          {customer && (
            <button 
              onClick={() => setMobileView('profile')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                mobileView === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              <span className="text-lg mb-1">👤</span>
              <span className="text-xs">Profile</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}