'use client';

import React, { useState } from 'react';

// Mock Energy Provider for demonstration
const useEnergy = () => ({ energyMode: true });

export default function InboxLayout({ children }: { children: React.ReactNode }) {
  const { energyMode } = useEnergy();
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New message from Grace Njeri", time: "2 min ago", type: "message" },
    { id: 2, message: "Faith Akinyi marked as VIP", time: "5 min ago", type: "status" }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className={`h-full flex flex-col ${
      energyMode 
        ? 'bg-gradient-to-br from-blue-50 via-white to-purple-50' 
        : 'bg-gray-50'
    }`}>
      {/* Mobile-First Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          {/* Top row - Always visible */}
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h1 className={`text-lg sm:text-2xl font-bold truncate ${
                energyMode ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' : 'text-gray-900'
              }`}>
                WhatsApp Inbox
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 hidden sm:block">
                Engage with customers directly through WhatsApp
              </p>
            </div>
            
            {/* Mobile Header Actions - Simplified */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile notifications dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                >
                  <span className="text-lg">🔔</span>
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
                
                {/* Mobile notifications dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 max-w-[90vw] bg-white rounded-lg shadow-lg border z-50">
                    <div className="p-3 border-b">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        <button 
                          onClick={() => setNotifications([])}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Clear all
                        </button>
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className="p-3 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-start space-x-3">
                            <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              notification.type === 'message' ? 'bg-green-500' : 'bg-blue-500'
                            }`}></span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-700">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                            <button 
                              onClick={() => dismissNotification(notification.id)}
                              className="text-gray-400 hover:text-gray-600 p-1"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Settings */}
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <span className="text-lg">⚙️</span>
              </button>

              {/* Mobile menu toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg">{isMobileMenuOpen ? '✕' : '☰'}</span>
              </button>
            </div>
          </div>
          
          {/* Desktop agent info - hidden on mobile */}
          <div className="hidden sm:flex items-center justify-between mt-4">
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
          </div>
          
          {/* Mobile expandable stats */}
          <div className={`transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 sm:max-h-none sm:opacity-100 sm:mt-4'
          }`}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
              <div className="text-center p-3 bg-white rounded-lg shadow-sm sm:shadow-none sm:bg-transparent">
                <div className={`text-xl sm:text-2xl font-bold ${energyMode ? 'text-blue-600' : 'text-gray-900'}`}>
                  12
                </div>
                <div className="text-xs text-gray-600">Active Chats</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm sm:shadow-none sm:bg-transparent">
                <div className={`text-xl sm:text-2xl font-bold ${energyMode ? 'text-green-600' : 'text-gray-900'}`}>
                  5
                </div>
                <div className="text-xs text-gray-600">Unread</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm sm:shadow-none sm:bg-transparent">
                <div className={`text-xl sm:text-2xl font-bold ${energyMode ? 'text-orange-600' : 'text-gray-900'}`}>
                  3
                </div>
                <div className="text-xs text-gray-600">High Priority</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm sm:shadow-none sm:bg-transparent">
                <div className={`text-xl sm:text-2xl font-bold ${energyMode ? 'text-purple-600' : 'text-gray-900'}`}>
                  2m
                </div>
                <div className="text-xs text-gray-600">Avg Response</div>
              </div>
            </div>
            
            {/* Mobile agent info */}
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mt-4 sm:hidden">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  JD
                </div>
                <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  JS
                </div>
              </div>
              <span>2 agents online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Notifications Bar - Hidden on mobile since we use dropdown */}
      {notifications.length > 0 && (
        <div className="hidden sm:block bg-blue-50 border-b border-blue-200">
          <div className="px-6 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 overflow-x-auto">
                {notifications.map(notification => (
                  <div key={notification.id} className="flex items-center space-x-2 text-sm flex-shrink-0">
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
                className="text-sm text-blue-600 hover:text-blue-800 flex-shrink-0"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content Area */}
      <div className="overflow-hidden">
        {children}
      </div>

      {/* Click outside to close notifications */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
}