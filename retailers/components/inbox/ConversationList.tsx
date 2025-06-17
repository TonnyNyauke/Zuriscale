'use client'

import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Conversation } from '@/app/types/types';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation?: Conversation | null;
  onConversationSelect: (conversation: Conversation) => void;
}

export default function ConversationList({ conversations,
  selectedConversation,
  onConversationSelect
 }: ConversationListProps) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.last_message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && conv.unread_count > 0) ||
                         (filter === 'assigned' && conv.assigned_to) ||
                         (filter === 'unassigned' && !conv.assigned_to);
    return matchesSearch && matchesFilter;
  });

  const getCustomerTypeColor = (type: string) => {
    switch (type) {
      case 'vip': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'repeat': return 'bg-gradient-to-r from-blue-500 to-indigo-500';
      case 'new': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-red-500';
      case 'normal': return 'border-l-4 border-blue-500';
      case 'low': return 'border-l-4 border-gray-300';
      default: return '';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Search */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-3">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </div>
          </div>
          <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
            ⚙️
          </button>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            { key: 'all', label: 'All', count: conversations.length },
            { key: 'unread', label: 'Unread', count: conversations.filter(c => c.unread_count > 0).length },
            { key: 'unassigned', label: 'Unassigned', count: conversations.filter(c => !c.assigned_to).length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                filter === tab.key 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label} {tab.count > 0 && (
                <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                  filter === tab.key ? 'bg-blue-100' : 'bg-gray-200'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {filteredConversations.map((conversation) => (
            <div 
              key={conversation.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors relative ${
                selectedConversation?.id === conversation.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
              } ${getPriorityIndicator(conversation.priority)}`}
              onClick={() => onConversationSelect(conversation)}
            >
              {/* Customer Info Row */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      getCustomerTypeColor(conversation.customer_type)
                    }`}>
                      {conversation.customer_name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {conversation.customer_type === 'vip' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                        ⭐
                      </div>
                    )}
                    {conversation.status === 'open' && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {conversation.customer_name}
                      </h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        conversation.customer_type === 'vip' 
                          ? 'bg-purple-100 text-purple-700'
                          : conversation.customer_type === 'repeat'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                      }`}>
                        {conversation.customer_type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(conversation.last_activity))}
                  </span>
                  {conversation.unread_count > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {conversation.unread_count}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Last Message */}
              <div className="mb-3">
                <p className="text-sm text-gray-600 truncate leading-relaxed">
                  {conversation.last_message}
                </p>
              </div>
              
              {/* Status & Assignment Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    conversation.status === 'open' 
                      ? 'bg-green-100 text-green-800' 
                      : conversation.status === 'resolved' 
                        ? 'bg-gray-100 text-gray-600' 
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {conversation.status === 'open' ? '🟢 Open' : 
                     conversation.status === 'resolved' ? '✅ Resolved' : '⏸️ Pending'}
                  </span>
                  
                  {conversation.priority === 'high' && (
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                      🔥 High
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-1">
                  {conversation.assigned_to ? (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      👤 {conversation.assigned_to.split(' ')[0]}
                    </span>
                  ) : (
                    <button className="text-xs text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded-full transition-colors">
                      Assign
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredConversations.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-2">💬</div>
            <p>No conversations found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}