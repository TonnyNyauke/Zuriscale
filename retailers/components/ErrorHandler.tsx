'use client';
import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorHandlerProps {
  error: string | null;
  onClose: () => void;
}

export const ErrorHandler: React.FC<ErrorHandlerProps> = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 max-w-md bg-red-50 border border-red-200 rounded-xl p-4 shadow-lg z-50">
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="text-sm text-red-700 mt-1">{error}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-3 text-red-400 hover:text-red-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface LoadingOverlayProps {
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  message = "Processing..." 
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 text-center min-w-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
      <p className="text-gray-900 font-medium">{message}</p>
    </div>
  </div>
);

interface SuccessNotificationProps {
  message: string;
  onClose: () => void;
}

export const SuccessNotification: React.FC<SuccessNotificationProps> = ({ 
  message, 
  onClose 
}) => (
  <div className="fixed top-4 right-4 max-w-md bg-green-50 border border-green-200 rounded-xl p-4 shadow-lg z-50">
    <div className="flex items-start">
      <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-green-800">Success</h3>
        <p className="text-sm text-green-700 mt-1">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-3 text-green-400 hover:text-green-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  </div>
);