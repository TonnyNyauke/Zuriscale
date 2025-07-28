// components/ClientTrackingWrapper.tsx
'use client';

import { useEffect } from 'react';

// Analytics tracking function
const trackEvent = (eventName: string, properties?: any) => {
  if (typeof window !== 'undefined') {
    // Google Analytics 4 event tracking
    (window as any).gtag?.('event', eventName, properties);
    
    // Custom analytics event (you can replace with your analytics service)
    console.log(`Event tracked: ${eventName}`, properties);
  }
};

export default function ClientTrackingWrapper() {
  useEffect(() => {
    // Scroll depth tracking
    let scrollDepths = [25, 50, 75, 100];
    let firedDepths: number[] = [];
    
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      
      scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !firedDepths.includes(depth)) {
          firedDepths.push(depth);
          trackEvent('scroll_depth', {
            'event_category': 'engagement',
            'event_label': depth + '%',
            'value': depth
          });
        }
      });
    };

    // Click tracking for elements with data-track-event
    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const trackingElement = target.closest('[data-track-event]') as HTMLElement;
      
      if (trackingElement) {
        const eventName = trackingElement.getAttribute('data-track-event');
        const propertiesString = trackingElement.getAttribute('data-track-properties');
        
        let properties = {};
        if (propertiesString) {
          try {
            properties = JSON.parse(propertiesString);
          } catch (e) {
            console.warn('Invalid JSON in data-track-properties:', propertiesString);
          }
        }
        
        if (eventName) {
          trackEvent(eventName, properties);
        }
      }
    };

    // Smooth scroll for "learn more" button
    const handleLearnMoreClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.matches('[data-track-event="hero_learn_more_click"]')) {
        event.preventDefault();
        trackEvent('hero_learn_more_click');
        document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClick);
    document.addEventListener('click', handleLearnMoreClick);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('click', handleLearnMoreClick);
    };
  }, []);

  return null; // This component doesn't render anything
}