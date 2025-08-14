'use client';

import React, { useState, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { Conversation, Message } from '@/app/types/types';
import { InboxService } from '@/app/lib/inboxService';

interface MessageThreadProps {
  conversation: Conversation;
  onShowProfile?: () => void;
  hideHeader?: boolean;
}

export default function MessageThread({ 
  conversation, 
  onShowProfile, 
  hideHeader = false 
}: MessageThreadProps) {
  const [showActions, setShowActions] = useState(false);
  const [messages, setMessages] = useState<Message[]>(conversation.messages || []);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Load messages when conversation changes
  useEffect(() => {
    const loadMessages = async () => {
      if (conversation.id) {
        setLoadingMessages(true);
        try {
          const conversationMessages = await InboxService.fetchConversationMessages(conversation.id);
          setMessages(conversationMessages);
        } catch (error) {
          console.error('Error loading messages:', error);
        } finally {
          setLoadingMessages(false);
        }
      }
    };

    loadMessages();
  }, [conversation.id]);

  const getCustomerStatusColor = (type: string) => {
    switch (type) {
      case 'vip': return 'from-purple-500 to-pink-500';
      case 'repeat': return 'from-blue-500 to-indigo-500';
      case 'new': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action} for conversation ${conversation.id}`);
    setShowActions(false);
  };

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">💬</div>
          <p>Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      {!hideHeader && (
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${
                  getCustomerStatusColor(conversation.customer_type)
                } flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-md`}>
                  {conversation.customer_name.split(' ').map(n => n[0]).join('')}
                </div>
                {conversation.customer_type === 'vip' && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xs">⭐</span>
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                    {conversation.customer_name}
                  </h2>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    conversation.customer_type === 'vip' 
                      ? 'bg-purple-100 text-purple-700'
                      : conversation.customer_type === 'repeat'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                  }`}>
                    <span className="hidden sm:inline">{conversation.customer_type.toUpperCase()}</span>
                    <span className="sm:hidden">{conversation.customer_type.charAt(0).toUpperCase()}</span>
                  </span>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1 sm:mr-2"></span>
                    <span className="hidden sm:inline">Online now</span>
                    <span className="sm:hidden">Online</span>
                  </span>
                  {conversation.assigned_to && (
                    <span className="flex items-center truncate">
                      👤 {conversation.assigned_to.split(' ')[0]}
                    </span>
                  )}
                  {conversation.priority === 'high' && (
                    <span className="flex items-center text-red-600 font-medium">
                      🔥 <span className="hidden sm:inline ml-1">High Priority</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              <div className="relative">
                <button 
                  onClick={() => setShowActions(!showActions)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  ⚡
                </button>
                {showActions && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="py-2">
                      <button onClick={() => handleQuickAction('assign')} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                        👤 Assign to Agent
                      </button>
                      <button onClick={() => handleQuickAction('priority')} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                        🔥 Mark as Priority
                      </button>
                      <button onClick={() => handleQuickAction('resolve')} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                        ✅ Mark as Resolved
                      </button>
                      <hr className="my-1" />
                      <button onClick={() => handleQuickAction('template')} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                        📝 Quick Templates
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">📞</button>

              {onShowProfile && (
                <button onClick={onShowProfile} className="p-2 rounded-full hover:bg-gray-100 transition-colors lg:hidden">👤</button>
              )}
              <button className="hidden sm:block p-2 rounded-full hover:bg-gray-100 transition-colors">ℹ️</button>
            </div>
          </div>

          {/* Status Bar */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full ${
                conversation.status === 'open' 
                  ? 'bg-green-100 text-green-800' 
                  : conversation.status === 'resolved' 
                    ? 'bg-gray-100 text-gray-600' 
                    : 'bg-yellow-100 text-yellow-800'
              }`}>
                {conversation.status === 'open' ? '🟢 Active' : 
                 conversation.status === 'resolved' ? '✅ Resolved' : '⏸️ Pending'}
              </span>
              {conversation.unread_count > 0 && (
                <span className="px-2 sm:px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                  {conversation.unread_count} unread
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500 hidden sm:block">
              Last activity: {new Date(conversation.last_activity).toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}

      {/* Message Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50">
        {/* New or VIP Info Banners */}
        {conversation.customer_type === 'new' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4">
            <div className="flex items-center space-x-2 text-blue-800">
              <span>🎉</span>
              <span className="font-medium text-sm sm:text-base">New Customer Alert!</span>
            </div>
            <p className="text-xs sm:text-sm text-blue-700 mt-1">
              This is {conversation.customer_name}&apos;s first conversation. Make it count!
            </p>
          </div>
        )}

        {conversation.customer_type === 'vip' && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 sm:p-4 mb-4">
            <div className="flex items-center space-x-2 text-purple-800">
              <span>⭐</span>
              <span className="font-medium text-sm sm:text-base">VIP Customer</span>
            </div>
            <p className="text-xs sm:text-sm text-purple-700 mt-1">
              High-value customer - prioritize their requests and provide premium support.
            </p>
          </div>
        )}

        {/* Messages List */}
        {loadingMessages ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">⏳</div>
            <p>Loading messages...</p>
          </div>
        ) : messages.length ? (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">💬</div>
            <p>No messages yet</p>
            <p className="text-sm mt-1">Start the conversation with a friendly greeting!</p>
          </div>
        )}

        {/* Typing Indicator */}
        <div className="flex justify-start">
          <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
