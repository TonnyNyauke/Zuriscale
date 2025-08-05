'use client';

import React from 'react';

interface ProgressBarProps {
  currentStep: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = ['sale', 'customer', 'payment'];
  const currentIndex = steps.indexOf(currentStep);
  
  return (
    <div className="flex items-center justify-center mt-4 space-x-2" role="progressbar" aria-label="Sale progress">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div 
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index <= currentIndex ? 'bg-teal-600' : 'bg-gray-300'
            }`}
            aria-label={`Step ${index + 1}: ${step}`}
          />
          {index < steps.length - 1 && (
            <div className={`w-8 h-1 transition-all duration-300 ${
              index < currentIndex ? 'bg-teal-600' : 'bg-gray-300'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};