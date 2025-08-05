'use client';
import React from 'react';
import { ArrowLeft, Store } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface HeaderProps {
  currentStep: string;
  onBack: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, onBack }) => (
  <header className="bg-white shadow-sm border-b sticky top-0 z-50">
    <div className="max-w-4xl mx-auto px-4 py-3">
      <div className="flex items-center justify-between">
        {currentStep !== 'sale' && (
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
        
        <div className="flex-1 flex items-center justify-center lg:justify-start">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Zuriscale POS</h1>
              <p className="text-sm text-gray-500">Basic Plan</p>
            </div>
          </div>
        </div>
        
        {currentStep === 'sale' && (
          <div className="hidden lg:block w-10" />
        )}
      </div>
      
      <ProgressBar currentStep={currentStep} />
    </div>
  </header>
);