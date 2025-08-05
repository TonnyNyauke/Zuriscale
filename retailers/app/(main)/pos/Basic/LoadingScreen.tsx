import React from 'react';

export const LoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm w-full">
      <div className="animate-spin w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full mx-auto mb-4"></div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Processing Sale...</h2>
      <p className="text-gray-600 text-sm">Sending receipt via WhatsApp</p>
    </div>
  </div>
);