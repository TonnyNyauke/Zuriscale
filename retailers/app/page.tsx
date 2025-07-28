//app/page.tsx (Conversion Optimized - Server Component)
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, MessageSquare, TrendingUp, Users, ShoppingBag, Star, AlertTriangle } from 'lucide-react';
import MobileNav from '@/components/MobileNav';
import Link from 'next/link';
import ClientTrackingWrapper from '@/components/ClientTrackingWrapper';

// Page-specific metadata
export const metadata: Metadata = {
  robots:{
    index: true,
    follow: true
  },
  title: 'Zuriscale - Boutique Business Growth Software Kenya | Stop Losing 80% of Customers',
  description: 'Most Kenyan boutique businesses lose 80% of customers after first purchase. Zuriscale\'s WhatsApp retention system helps boutique owners keep customers coming back. Start free.',
  keywords: [
    'boutique business Kenya',
    'boutique business growth Kenya',
    'Kenyan boutique software',
    'fashion boutique management',
    'boutique customer retention',
    'WhatsApp business Kenya',
    'boutique POS system Kenya',
    'fashion retail Kenya',
    'boutique marketing Kenya',
    'Kenyan small business',
    'Nairobi boutique business',
    'boutique sales system',
    'fashion boutique software',
    'M-Pesa boutique payments',
    'boutique inventory management'
  ],
  alternates: {
    canonical: 'https://www.zuriscale.com/',
  },
  openGraph: {
    title: 'Zuriscale - Boutique Business Growth Software for Kenya',
    description: 'Help your boutique business reach KES 1M in sales with WhatsApp customer retention. Used by growing Kenyan boutique owners.',
    url: 'https://www.zuriscale.com',
    siteName: 'Zuriscale',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zuriscale - Boutique Business Growth Platform for Kenya',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zuriscale - Boutique Business Growth Software Kenya',
    description: 'Turn one-time buyers into repeat customers. WhatsApp retention system for Kenyan boutique businesses.',
    images: ['/twitter-image.jpg'],
    creator: '@zuriscale',
  },
};

// Structured data
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.zuriscale.com/#organization",
      "name": "Zuriscale",
      "url": "https://www.zuriscale.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zuriscale.com/logo.png",
        "width": 200,
        "height": 60
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254-742-065-623",
        "contactType": "customer service",
        "availableLanguage": ["English", "Swahili"],
        "areaServed": "KE"
      }
    },
    {
      "@type": "SoftwareApplication",
      "name": "Zuriscale",
      "description": "WhatsApp customer retention platform for boutique businesses in Kenya",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free to start, pay per message"
      },
      "featureList": [
        "WhatsApp customer messaging",
        "Customer analytics dashboard",
        "Online product catalog",
        "Simple POS system"
      ]
    }
  ]
};

export default function ZuriscaleLanding() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Client-side Analytics Tracking */}
      <ClientTrackingWrapper />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
        <MobileNav />

        {/* Problem-Aware Hero Section */}
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
          </div>

          {/* Single Primary CTA */}
          <div className="text-center mb-8">
            <Button 
              size="lg" 
              className="bg-red-500 hover:bg-red-600 text-white shadow-lg px-8 py-4 text-lg"
              asChild
            >
              <Link href="/signup" data-track-event="hero_cta_click" data-track-properties='{"position":"primary"}'>
                Start Free - No Setup Fees
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <p className="text-sm text-gray-500 mt-3">
              Free to start • Pay only when you send messages • M-Pesa accepted
            </p>
            
            {/* Secondary Education Link */}
            <div className="mt-4">
              <button 
                className="text-teal-600 hover:text-teal-700 underline text-sm"
                data-track-event="hero_learn_more_click"
              >
                See how it works in 30 seconds ↓
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

        {/* How It Works - Quick Education */}
        <section id="how-it-works" className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                How Zuriscale Stops Boutique Customer Loss in 3 Simple Steps
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Customer Visits Your Boutique</h3>
                <p className="text-gray-600">Your customer makes a purchase at your boutique or browses your online catalog</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Auto WhatsApp Follow-up</h3>
                <p className="text-gray-600">Zuriscale automatically sends personalized boutique messages about new arrivals and special offers</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Customer Returns to Your Boutique</h3>
                <p className="text-gray-600">They come back for repeat purchases, increasing your boutique&apos;s monthly revenue</p>
              </div>
            </div>

            {/* Quick Result Promise */}
            <div className="text-center mt-12">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-emerald-800 mb-2">
                  Result: 30-50% More Monthly Boutique Sales
                </h3>
                <p className="text-emerald-700">
                  Instead of losing 80% of boutique customers, you keep 40-60% coming back regularly
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Condensed Social Proof */}
        <section className="bg-gradient-to-r from-teal-50 to-emerald-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-teal-100">
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-lg font-medium mb-3 text-gray-800">
                  &quot;I went from KES 30,000 to KES 85,000 monthly because customers actually come back now. 
                  The WhatsApp reminders work perfectly for my boutique in Nairobi.&quot;
                </blockquote>
                <cite className="text-gray-600">
                  - Sarah M., Boutique Owner, Nairobi
                </cite>
              </div>
            </div>
          </div>
        </section>

        {/* Streamlined Features */}
        <section id='features' className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Everything Your Boutique Business Needs to Retain Customers
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                <MessageSquare className="h-8 w-8 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">WhatsApp Boutique Messaging</h3>
                  <p className="text-gray-600">Automatically send follow-ups, new arrival alerts, and personalized offers to bring boutique customers back.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Boutique Analytics Dashboard</h3>
                  <p className="text-gray-600">See which boutique customers buy what, when they&apos;re likely to return, and what messages work best.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                <ShoppingBag className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Online Boutique Catalog</h3>
                  <p className="text-gray-600">Beautiful mobile-friendly boutique store that customers can browse and share with friends.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                <Users className="h-8 w-8 text-emerald-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Boutique POS System</h3>
                  <p className="text-gray-600">Track boutique sales and inventory on any phone or tablet. Perfect for Kenyan boutique businesses.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Tiered Pricing */}
        <section id='pricing' className="py-16 bg-gradient-to-br from-slate-50 to-teal-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Choose Your Boutique Business Growth Plan
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Start free, scale as your boutique grows. All plans include M-Pesa payments and 24/6 support.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              
              {/* Basic Plan */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Basic</h3>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    Free to Start
                  </div>
                  <p className="text-sm text-gray-600">Pay only for WhatsApp messages</p>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 mt-2">
                    Most Popular for New Boutiques
                  </Badge>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">WhatsApp messaging (KES 1.5/message)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Basic boutique customer database</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Simple online boutique catalog</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Basic boutique POS system</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">M-Pesa integration</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                  asChild
                >
                  <Link href="/signup" data-track-event="pricing_cta_click" data-track-properties='{"plan":"basic"}'>
                    Start Free
                  </Link>
                </Button>
              </div>

              {/* Standard Plan */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-teal-200 relative">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white px-4 py-1">
                  Best Value
                </Badge>
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Standard</h3>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    $49<span className="text-lg text-gray-500">/month</span>
                  </div>
                  <p className="text-sm text-gray-600">For growing boutique businesses</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Everything in Basic</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">500 FREE WhatsApp messages/month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Advanced boutique customer analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Automated follow-up campaigns</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Boutique customer segmentation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Priority support</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                  asChild
                >
                  <Link href="/signup" data-track-event="pricing_cta_click" data-track-properties='{"plan":"standard"}'>
                    Choose Standard
                  </Link>
                </Button>
              </div>

              {/* Pro Plan */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Pro</h3>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    $149<span className="text-lg text-gray-500">/month</span>
                  </div>
                  <p className="text-sm text-gray-600">For established boutique retailers</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Everything in Standard</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">2000 FREE WhatsApp messages/month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Advanced boutique POS with inventory</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Multi-boutique location support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Custom branded boutique catalog</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Dedicated account manager</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                  asChild
                >
                  <Link href="/signup" data-track-event="pricing_cta_click" data-track-properties='{"plan":"pro"}'>
                    Choose Pro
                  </Link>
                </Button>
              </div>
            </div>

            {/* Message Pricing Note */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-600">
                Additional WhatsApp messages: KES 1.5 each • M-Pesa payments accepted • Cancel anytime
              </p>
            </div>
          </div>
        </section>

        {/* Condensed FAQ */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Quick Questions & Answers
              </h2>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-4">
              <details className="border rounded-lg p-4 hover:border-teal-200 transition-colors">
                <summary className="font-bold cursor-pointer text-gray-800">
                  How quickly will I see results?
                </summary>
                <p className="text-gray-600 mt-2 text-sm">
                  Most retailers see increased repeat customers within 2-4 weeks of sending their first follow-up messages.
                </p>
              </details>
              
              <details className="border rounded-lg p-4 hover:border-teal-200 transition-colors">
                <summary className="font-bold cursor-pointer text-gray-800">
                  Do I need technical skills?
                </summary>
                <p className="text-gray-600 mt-2 text-sm">
                  No! Zuriscale is designed for busy retailers. If you can use WhatsApp, you can use our system.
                </p>
              </details>
              
              <details className="border rounded-lg p-4 hover:border-teal-200 transition-colors">
                <summary className="font-bold cursor-pointer text-gray-800">
                  Can I really start for free?
                </summary>
                <p className="text-gray-600 mt-2 text-sm">
                  Yes! Create your account, add customers, and set up your catalog for free. You only pay when you send WhatsApp messages.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-red-500 to-red-600 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stop Losing Money - Grow Your Boutique Business Today
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join the Kenyan boutique owners who are keeping their customers coming back. 
              Start your free boutique growth account in under 2 minutes.
            </p>
            
            <Button 
              size="lg" 
              className="bg-white text-red-600 hover:bg-gray-100 shadow-lg px-8 py-4 text-lg"
              asChild
            >
              <Link href="/signup" data-track-event="final_cta_click">
                Create Free Account Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <p className="text-sm mt-4 opacity-75">
              Free to start • No setup fees • 24/6 support • Cancel anytime
            </p>
          </div>
        </section>

        {/* Simplified Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Z</span>
                </div>
                <span className="text-xl font-bold">Zuriscale</span>
              </div>
              
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                Helping Kenyan boutique businesses turn one-time buyers into loyal customers.
              </p>
              
              <div className="flex justify-center space-x-6 text-sm text-gray-400">
                <Link href="https://wa.me/+254742065623" className="hover:text-white">
                  WhatsApp: +254 742 065 623
                </Link>
                <Link href="mailto:support@zuriscale.com" className="hover:text-white">
                  support@zuriscale.com
                </Link>
              </div>
              
              <p className="text-xs text-gray-500">
                &copy; {new Date().getFullYear()} Zuriscale. Made with ❤️ in Kenya.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}