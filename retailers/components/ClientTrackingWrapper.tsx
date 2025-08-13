// components/ClientTrackingWrapper.tsx
'use client';

import { useEffect } from 'react';

// Define types for analytics
interface TrackingProperties {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

// Analytics tracking function
const trackEvent = (eventName: string, properties?: TrackingProperties): void => {
  if (typeof window !== 'undefined') {
    // Google Analytics 4 event tracking
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, properties || {});
    }
    
    // Custom analytics event (you can replace with your analytics service)
    // Note: Remove console.log in production for security
  }
};

export default function ClientTrackingWrapper(): null {
  useEffect(() => {
    // Scroll depth tracking
    const scrollDepths: number[] = [25, 50, 75, 100];
    const firedDepths: number[] = [];
    
    const handleScroll = (): void => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      
      scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !firedDepths.includes(depth)) {
          firedDepths.push(depth);
          trackEvent('scroll_depth', {
            event_category: 'engagement',
            event_label: `${depth}%`,
            value: depth
          });
        }
      });
    };

    // Click tracking for elements with data-track-event
    const handleClick = (event: Event): void => {
      const target = event.target as HTMLElement;
      if (!target) return;
      
      const trackingElement = target.closest('[data-track-event]') as HTMLElement | null;
      
      if (trackingElement) {
        const eventName = trackingElement.getAttribute('data-track-event');
        const propertiesString = trackingElement.getAttribute('data-track-properties');
        
        let properties: TrackingProperties = {};
        if (propertiesString) {
          try {
            const parsed = JSON.parse(propertiesString) as Record<string, unknown>;
            // Validate and type-cast the parsed properties
            properties = Object.entries(parsed).reduce((acc, [key, value]) => {
              if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                acc[key] = value;
              }
              return acc;
            }, {} as TrackingProperties);
          } catch {
            // Silently handle invalid JSON, fall back to empty properties object
            properties = {};
          }
        }
        
        if (eventName) {
          trackEvent(eventName, properties);
        }
      }
    };

    // Smooth scroll for "learn more" button
    const handleLearnMoreClick = (event: Event): void => {
      const target = event.target as HTMLElement;
      if (!target) return;
      
      if (target.matches('[data-track-event="hero_learn_more_click"]')) {
        event.preventDefault();
        trackEvent('hero_learn_more_click');
        const howItWorksSection = document.getElementById('how-it-works');
        howItWorksSection?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClick);
    document.addEventListener('click', handleLearnMoreClick);

    // Cleanup
    return (): void => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('click', handleLearnMoreClick);
    };
  }, []);

  return null; // This component doesn't render anything
}