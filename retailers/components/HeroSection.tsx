'use client';

import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Star, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { MouseEvent, useCallback } from 'react';

export default function HeroSection() {
  const handleScrollToCalculator = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Track the click with type safety
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hero_learn_more_click', {
        section: 'hero',
        target: 'roi_calculator'
      });
    }
    
    // Scroll to calculator
    document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      
      {/* Attention-Grabbing Problem Statement */}
      <div className="text-center mb-8">
        <div className="bg-red-100 border border-red-200 rounded-lg p-4 mb-6 inline-block">
          <div className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-semibold">Alert for Kenyan Boutique Owners</span>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight">
          Your Boutique Business is Losing 
          <span className="block text-red-600 mt-2">80% of Customers</span>
          <span className="block text-gray-800 mt-2">After One Purchase</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
          Most Kenyan boutique businesses don&apos;t realize that <strong>8 out of 10 customers</strong> who buy from their boutique 
          <strong> never come back</strong>. That&apos;s thousands of shillings in lost boutique revenue every month.
        </p>

        {/* Money Lost Calculator */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-xl mb-8 shadow-lg max-w-md mx-auto">
          <p className="text-sm opacity-90 mb-1">If your boutique serves 100 customers monthly:</p>
          <p className="text-2xl font-bold">
            You&apos;re losing KES 240,000+
          </p>
          <p className="text-sm opacity-90">in potential boutique revenue every year</p>
        </div>
      </div>

      {/* Solution Promise */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
          Zuriscale Keeps Your Boutique Customers Coming Back
        </h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Our WhatsApp retention system automatically follows up with your boutique customers, 
          sends personalized offers, and tracks what actually works for your boutique business.
        </p>
        
        {/* Value Proposition */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 max-w-lg mx-auto mb-6">
          <p className="text-emerald-800 font-semibold">
            Start for just $13/month - includes 1,000 WhatsApp messages
          </p>
          <p className="text-emerald-700 text-sm">
            That&apos;s enough to follow up with 200+ customers monthly
          </p>
        </div>
        
        {/* Money Back Guarantee Badge */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full mb-6 shadow-lg max-w-sm mx-auto">
          <p className="font-bold text-lg">90-Day Money-Back Guarantee</p>
          <p className="text-sm opacity-90">If you don&apos;t see results, get 100% refunded</p>
        </div>
      </div>

      {/* Single Primary CTA */}
      <div className="text-center mb-8">
        <Button 
          size="lg" 
          className="bg-red-500 hover:bg-red-600 text-white shadow-lg px-8 py-4 text-lg"
          asChild
        >
          <Link 
            href="/signup" 
            data-track-event="hero_cta_click" 
            data-track-properties='{"position":"primary"}'
          >
            Start Growing Your Boutique Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        
        <p className="text-sm text-gray-500 mt-3">
          $13/month • 90-day money-back guarantee • M-Pesa accepted
        </p>
        
        {/* Secondary Education Link */}
        <div className="mt-4">
          <button 
            className="text-teal-600 hover:text-teal-700 underline text-sm"
            onClick={handleScrollToCalculator}
            aria-label="Calculate your boutique revenue losses"
          >
            Calculate your exact losses first ↓
          </button>
        </div>
      </div>

      {/* Enhanced Social Proof */}
      <div className="text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex" role="img" aria-label="5 star rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current text-amber-400" />
              ))}
            </div>
            <span className="text-gray-600">4.8/5 from retailers</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-500" />
            <span className="text-gray-600">Growing Kenyan businesses</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-500" />
            <span className="text-gray-600">24/6 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}