// components/tour/MobileTour.tsx
'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface TourStep {
  target: string;
  content: string;
  title?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

interface MobileTourProps {
  steps: TourStep[];
  isOpen: boolean;
  onClose: () => void;
  primaryColor?: string;
}

interface Position {
  top: number;
  left: number;
  width: number;
  height: number;
}

const MobileTour: React.FC<MobileTourProps> = ({
  steps,
  isOpen,
  onClose,
  primaryColor = '#0d9488'
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetPosition, setTargetPosition] = useState<Position | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<Position | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Wait for DOM to be ready
  useEffect(() => {
    if (isOpen) {
      // Wait for next tick to ensure DOM is ready
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsReady(false);
    }
  }, [isOpen]);

  // Enhanced position calculation with retry logic
  const calculatePositions = useCallback((retryCount = 0) => {
    if (!isOpen || !steps[currentStep] || !isReady) return;

    const targetElement = document.querySelector(steps[currentStep].target);
    
    if (!targetElement) {
      // Retry finding the element up to 5 times
      if (retryCount < 5) {
        retryTimeoutRef.current = setTimeout(() => {
          calculatePositions(retryCount + 1);
        }, 100 * (retryCount + 1)); // Exponential backoff
      } else {
        console.warn(`Tour target element not found: ${steps[currentStep].target}`);
      }
      return;
    }

    // Clear any existing retry timeout
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }

    const rect = targetElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    const targetPos: Position = {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      width: rect.width,
      height: rect.height
    };

    setTargetPosition(targetPos);

    // Enhanced tooltip positioning for mobile
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tooltipWidth = isMobile ? Math.min(300, viewportWidth - 32) : 320;
    const tooltipHeight = 200;
    const padding = isMobile ? 12 : 16;
    const placement = steps[currentStep].placement || (isMobile ? 'bottom' : 'bottom');

    let tooltipPos: Position = {
      top: 0,
      left: 0,
      width: tooltipWidth,
      height: tooltipHeight
    };

    // Mobile-first positioning
    if (isMobile) {
      switch (placement) {
        case 'top':
          tooltipPos.top = Math.max(
            scrollTop + padding,
            targetPos.top - tooltipHeight - padding
          );
          break;
        case 'bottom':
        default:
          tooltipPos.top = Math.min(
            scrollTop + viewportHeight - tooltipHeight - padding,
            targetPos.top + targetPos.height + padding
          );
          break;
        case 'center':
          tooltipPos.top = scrollTop + viewportHeight / 2 - tooltipHeight / 2;
          break;
      }
      // Center horizontally on mobile
      tooltipPos.left = Math.max(
        padding,
        Math.min(
          viewportWidth - tooltipWidth - padding,
          viewportWidth / 2 - tooltipWidth / 2
        )
      );
    } else {
      // Desktop positioning logic
      switch (placement) {
        case 'top':
          tooltipPos.top = targetPos.top - tooltipHeight - padding;
          tooltipPos.left = targetPos.left + (targetPos.width - tooltipWidth) / 2;
          break;
        case 'bottom':
          tooltipPos.top = targetPos.top + targetPos.height + padding;
          tooltipPos.left = targetPos.left + (targetPos.width - tooltipWidth) / 2;
          break;
        case 'left':
          tooltipPos.top = targetPos.top + (targetPos.height - tooltipHeight) / 2;
          tooltipPos.left = targetPos.left - tooltipWidth - padding;
          break;
        case 'right':
          tooltipPos.top = targetPos.top + (targetPos.height - tooltipHeight) / 2;
          tooltipPos.left = targetPos.left + targetPos.width + padding;
          break;
        case 'center':
          tooltipPos.top = viewportHeight / 2 - tooltipHeight / 2 + scrollTop;
          tooltipPos.left = viewportWidth / 2 - tooltipWidth / 2;
          break;
      }

      // Ensure tooltip stays within viewport on desktop
      if (tooltipPos.left < padding) {
        tooltipPos.left = padding;
      } else if (tooltipPos.left + tooltipWidth > viewportWidth - padding) {
        tooltipPos.left = viewportWidth - tooltipWidth - padding;
      }

      if (tooltipPos.top < scrollTop + padding) {
        tooltipPos.top = scrollTop + padding;
      } else if (tooltipPos.top + tooltipHeight > scrollTop + viewportHeight - padding) {
        tooltipPos.top = scrollTop + viewportHeight - tooltipHeight - padding;
      }
    }

    setTooltipPosition(tooltipPos);
  }, [isOpen, currentStep, steps, isMobile, isReady]);

  // Enhanced scroll behavior for mobile
  const scrollToTarget = useCallback(() => {
    if (!targetPosition) return;

    const offset = isMobile ? 80 : 150;
    const viewportHeight = window.innerHeight;
    const targetCenter = targetPosition.top + targetPosition.height / 2;
    
    let scrollTarget;
    if (isMobile) {
      // On mobile, scroll to show the target in the upper third of the screen
      scrollTarget = targetPosition.top - viewportHeight / 3;
    } else {
      scrollTarget = targetCenter - viewportHeight / 2;
    }

    window.scrollTo({
      top: Math.max(0, scrollTarget - offset),
      behavior: 'smooth'
    });
  }, [targetPosition, isMobile]);

  // Update positions when step changes
  useEffect(() => {
    if (!isOpen || !isReady) return;

    const timer = setTimeout(() => {
      calculatePositions();
    }, 150); // Increased delay for mobile

    return () => clearTimeout(timer);
  }, [currentStep, isOpen, isReady, calculatePositions]);

  // Scroll to target when positions are calculated
  useEffect(() => {
    if (targetPosition) {
      const timer = setTimeout(scrollToTarget, isMobile ? 300 : 200);
      return () => clearTimeout(timer);
    }
  }, [targetPosition, scrollToTarget, isMobile]);

  // Enhanced event handlers
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      setTimeout(() => calculatePositions(), 150);
    };

    const handleScroll = () => {
      if (isMobile) {
        // Throttle scroll events on mobile
        clearTimeout(retryTimeoutRef.current!);
        retryTimeoutRef.current = setTimeout(() => {
          calculatePositions();
        }, 50);
      } else {
        calculatePositions();
      }
    };

    const handleOrientationChange = () => {
      setTimeout(() => {
        calculatePositions();
      }, 300); // Wait for orientation change to complete
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('orientationchange', handleOrientationChange);
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [isOpen, calculatePositions, isMobile]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent | React.TouchEvent) => {
    // Removed overlay click handler since there's no overlay anymore
  };

  // Reset step when tour opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setTargetPosition(null);
      setTooltipPosition(null);
    }
  }, [isOpen]);

  if (!isOpen || !steps.length || !isReady) return null;

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none" style={{ touchAction: 'none' }}>
      {/* Spotlight - Just a colored border highlight */}
      {targetPosition && (
        <div
          className="absolute pointer-events-none"
          style={{
            top: targetPosition.top - 4,
            left: targetPosition.left - 4,
            width: targetPosition.width + 8,
            height: targetPosition.height + 8,
            border: `3px solid ${primaryColor}`,
            borderRadius: '8px',
            transition: 'all 0.3s ease-out',
            zIndex: 999
          }}
        />
      )}

      {/* Tooltip */}
      {tooltipPosition && (
        <div
          ref={tooltipRef}
          className="absolute bg-white rounded-lg shadow-xl border border-gray-200 pointer-events-auto"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            width: tooltipPosition.width,
            zIndex: 1000,
            maxWidth: isMobile ? '90vw' : '400px',
            transition: 'all 0.3s ease-out'
          }}
        >
          <div className="p-4">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                {currentStepData.title && (
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {currentStepData.title}
                  </h3>
                )}
                <div className="flex items-center text-sm text-gray-500">
                  <span>Step {currentStep + 1} of {steps.length}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 touch-manipulation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="text-gray-700 text-sm leading-relaxed mb-4">
              {currentStepData.content}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                  backgroundColor: primaryColor
                }}
              />
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors touch-manipulation ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </button>

              <button
                onClick={onClose}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors touch-manipulation"
              >
                Skip
              </button>

              <button
                onClick={handleNext}
                className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-white transition-colors touch-manipulation"
                style={{ backgroundColor: primaryColor }}
              >
                {isLastStep ? 'Finish' : 'Next'}
                {!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileTour;