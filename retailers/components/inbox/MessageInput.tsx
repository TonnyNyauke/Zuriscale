// src/components/inbox/MessageInput.tsx
'use client';

import React, { useState } from 'react';

export default function MessageInput() {
  const [message, setMessage] = useState('');
  
  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };
  
  return (
    <div className="flex items-center space-x-3">
      <div className="flex-1 bg-white border border-gray-300 rounded-full overflow-hidden">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full px-4 py-2 focus:outline-none"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
      </div>
      
      <div className="flex space-x-2">
        <button className="p-2 text-gray-600 hover:text-gray-900">
          📎
        </button>
        <button 
          onClick={handleSend}
          className={`p-2 rounded-full ${
            message 
              ? 'bg-[#00C49A] text-white' 
              : 'bg-gray-200 text-gray-500'
          }`}
          disabled={!message}
        >
          ➤
        </button>
      </div>
    </div>
  );
}