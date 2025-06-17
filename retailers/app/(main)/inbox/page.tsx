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
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
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

  // const handleConversationSelect = (conversation: Conversation) => {
  //   setSelectedConversation(conversation);
  //   setMobileView('chat');
  // };

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
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Desktop Layout - Only show on large screens */}
      <div className="hidden lg:flex flex-1 overflow-hidden">
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <ConversationList conversations={conversations} />
        </div>
        
        <div className="w-2/3 flex flex-col">
          <div className="flex-1 overflow-hidden">
            {selectedConversation ? (
              <MessageThread 
                conversation={selectedConversation} 
                onShowProfile={handleShowProfile}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a conversation to start messaging
              </div>
            )}
          </div>
          
          {selectedConversation && (
            <div className="border-t border-gray-200 p-4 bg-white">
              <MessageInput />
            </div>
          )}
        </div>
        
        <div className="w-1/4 border-l border-gray-200 flex flex-col">
          {customer ? (
            <CustomerProfile customer={customer} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No customer selected
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout - Show on small to medium screens */}
      <div className="lg:hidden flex-1 relative overflow-hidden">
        {/* Conversations View */}
        <div className={`absolute inset-0 bg-white transition-transform duration-300 ease-in-out z-10 ${
          mobileView === 'conversations' ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="h-full flex flex-col">
            <ConversationList conversations={conversations} />
          </div>
        </div>

        {/* Chat View */}
        <div className={`absolute inset-0 bg-white transition-transform duration-300 ease-in-out z-20 ${
          mobileView === 'chat' ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="h-full flex flex-col">
            {/* Mobile Chat Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
              <button 
                onClick={handleBackToConversations}
                className="p-2 -ml-2 rounded-full hover:bg-gray-100 flex items-center"
              >
                <span className="mr-2">←</span>
                <span>Back</span>
              </button>
              <h2 className="font-semibold text-gray-900 truncate">
                {selectedConversation?.customer_name || 'Chat'}
              </h2>
              <button 
                onClick={handleShowProfile}
                className="p-2 -mr-2 rounded-full hover:bg-gray-100"
              >
                👤
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden">
              {selectedConversation ? (
                <MessageThread 
                  conversation={selectedConversation} 
                  onShowProfile={handleShowProfile}
                  hideHeader={true}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <div className="text-4xl mb-2">💬</div>
                    <p>Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
            
            {selectedConversation && (
              <div className="border-t border-gray-200 p-4 bg-white flex-shrink-0">
                <MessageInput />
              </div>
            )}
          </div>
        </div>

        {/* Profile View */}
        <div className={`absolute inset-0 bg-white transition-transform duration-300 ease-in-out z-30 ${
          mobileView === 'profile' ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="h-full flex flex-col">
            {/* Mobile Profile Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center flex-shrink-0">
              <button 
                onClick={handleBackFromProfile}
                className="p-2 -ml-2 rounded-full hover:bg-gray-100 flex items-center"
              >
                <span className="mr-2">←</span>
                <span>Back to Chat</span>
              </button>
              <h2 className="ml-4 font-semibold text-gray-900">Customer Profile</h2>
            </div>
            
            <div className="flex-1 overflow-hidden">
              {customer ? (
                <CustomerProfile customer={customer} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <div className="text-4xl mb-2">👤</div>
                    <p>No customer selected</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Only show when needed */}
      <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-2 flex-shrink-0">
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
    </div>
  );
}