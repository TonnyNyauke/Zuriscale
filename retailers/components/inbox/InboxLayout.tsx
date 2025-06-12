'use client';

import React, { useState } from 'react';
import { useEnergy } from '../ui/EnergyProvider';

export default function InboxLayout({ children }: { children: React.ReactNode }) {
  const { energyMode } = useEnergy();
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New message from Grace Njeri", time: "2 min ago", type: "message" },
    { id: 2, message: "Faith Akinyi marked as VIP", time: "5 min ago", type: "status" }
  ]);

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className={`h-full flex flex-col ${
      energyMode 
        ? 'bg-gradient-to-br from-blue-50 via-white to-purple-50' 
        : 'bg-gray-50'
    }`}>
      {/* Enhanced Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${
                energyMode ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' : 'text-gray-900'
              }`}>
                WhatsApp Inbox
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Engage with customers directly through WhatsApp
              </p>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              {/* Active Users Indicator */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    JD
                  </div>
                  <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    JS
                  </div>
                </div>
                <span>2 agents online</span>
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                  🔔
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Settings */}
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                ⚙️
              </button>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="mt-4 grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`text-2xl font-bold ${energyMode ? 'text-blue-600' : 'text-gray-900'}`}>
                12
              </div>
              <div className="text-xs text-gray-600">Active Chats</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${energyMode ? 'text-green-600' : 'text-gray-900'}`}>
                5
              </div>
              <div className="text-xs text-gray-600">Unread</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${energyMode ? 'text-orange-600' : 'text-gray-900'}`}>
                3
              </div>
              <div className="text-xs text-gray-600">High Priority</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${energyMode ? 'text-purple-600' : 'text-gray-900'}`}>
                2m
              </div>
              <div className="text-xs text-gray-600">Avg Response</div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Bar */}
      {notifications.length > 0 && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="px-6 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {notifications.map(notification => (
                  <div key={notification.id} className="flex items-center space-x-2 text-sm">
                    <span className={`w-2 h-2 rounded-full ${
                      notification.type === 'message' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></span>
                    <span className="text-gray-700">{notification.message}</span>
                    <span className="text-gray-500 text-xs">({notification.time})</span>
                    <button 
                      onClick={() => dismissNotification(notification.id)}
                      className="text-gray-400 hover:text-gray-600 ml-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setNotifications([])}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {children}
      </div>

      {/* Mobile-First Responsive Considerations */}
      <style jsx>{`
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          
          .header-actions {
            flex-direction: column;
            align-items: flex-end;
            gap: 0.5rem;
          }
          
          .notification-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
        
        @media (max-width: 640px) {
          .main-content {
            flex-direction: column;
          }
          
          .conversation-list {
            height: 40vh;
            border-right: none;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .message-area {
            height: 60vh;
          }
          
          .customer-profile {
            position: fixed;
            top: 0;
            right: -100%;
            width: 100vw;
            height: 100vh;
            z-index: 50;
            transition: right 0.3s ease-in-out;
            background: white;
          }
          
          .customer-profile.open {
            right: 0;
          }
        }
      `}</style>
    </div>
  );
}