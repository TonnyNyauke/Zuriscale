import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Star, DollarSign, Users, MessageSquare, TrendingUp, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

// SEO-optimized metadata for pricing page
export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  title: 'Pricing - Choose Your Boutique Business Growth Plan | Zuriscale Kenya',
  description: 'Compare our three pricing tiers: Basic ($13/month), Standard ($49/month), and Pro ($149/month). Find the perfect plan for your Kenyan boutique business growth. Start free today.',
  keywords: [
    'boutique pricing Kenya',
    'boutique software pricing Kenya',
    'WhatsApp business pricing Kenya',
    'boutique POS pricing Kenya',
    'boutique growth plans Kenya',
    'Kenyan boutique software cost',
    'fashion retail pricing Kenya',
    'customer retention pricing Kenya',
    'boutique management software Kenya',
    'WhatsApp marketing pricing Kenya',
    'retail software pricing Nairobi',
    'boutique CRM pricing Kenya'
  ],
  alternates: {
    canonical: 'https://www.zuriscale.com/pricing',
  },
  openGraph: {
    title: 'Pricing - Choose Your Boutique Business Growth Plan | Zuriscale',
    description: 'Compare our three pricing tiers and find the perfect plan for your boutique business growth. Start free with 1,000 messages included.',
    url: 'https://www.zuriscale.com/pricing',
    siteName: 'Zuriscale',
    images: [
      {
        url: '/pricing-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zuriscale Pricing - Choose Your Boutique Business Growth Plan',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing - Choose Your Boutique Business Growth Plan',
    description: 'Compare our three pricing tiers and find the perfect plan for your boutique business growth.',
    images: ['/pricing-og-image.jpg'],
    creator: '@zuriscale',
  },
  other: {
    'geo.region': 'KE',
    'geo.placename': 'Kenya',
    'geo.position': '-1.2921;36.8219',
    'ICBM': '-1.2921, 36.8219',
  },
};

// Structured data for pricing page
const pricingStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.zuriscale.com/pricing#webpage",
      "url": "https://www.zuriscale.com/pricing",
      "name": "Zuriscale Pricing - Choose Your Boutique Business Growth Plan",
      "description": "Compare our three pricing tiers and find the perfect plan for your boutique business growth. Start free with 1,000 messages included.",
      "inLanguage": "en-KE",
      "isPartOf": {
        "@id": "https://www.zuriscale.com/#website"
      },
      "about": {
        "@id": "https://www.zuriscale.com/#organization"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.zuriscale.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Pricing",
            "item": "https://www.zuriscale.com/pricing"
          }
        ]
      }
    },
    {
      "@type": "Product",
      "name": "Zuriscale Basic Plan",
      "description": "Perfect for small boutique businesses starting with customer retention",
      "offers": {
        "@type": "Offer",
        "price": "13",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "13",
          "priceCurrency": "USD",
          "billingIncrement": "P1M"
        },
        "description": "Basic plan with 1,000 WhatsApp messages per month"
      },
      "category": "Business Software"
    },
    {
      "@type": "Product",
      "name": "Zuriscale Standard Plan",
      "description": "Ideal for growing boutique businesses with advanced features",
      "offers": {
        "@type": "Offer",
        "price": "49",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "49",
          "priceCurrency": "USD",
          "billingIncrement": "P1M"
        },
        "description": "Standard plan with 5,000 WhatsApp messages per month"
      },
      "category": "Business Software"
    },
    {
      "@type": "Product",
      "name": "Zuriscale Pro Plan",
      "description": "Complete solution for established boutique businesses",
      "offers": {
        "@type": "Offer",
        "price": "149",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "149",
          "priceCurrency": "USD",
          "billingIncrement": "P1M"
        },
        "description": "Pro plan with unlimited WhatsApp messages and advanced features"
      },
      "category": "Business Software"
    }
  ]
};

export default function PricingPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingStructuredData) }}
      />

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">Z</span>
                </div>
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">Zuriscale</Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/#features" className="text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium">Features</Link>
                <Link href="/pricing" className="text-teal-600 font-semibold border-b-2 border-teal-500 pb-1">Pricing</Link>
                <Link href="/blog" className="text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium">Blog</Link>
                <Link href="/communities" className="text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium">Communities</Link>
                <Link href="/login" className="text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium">Login</Link>
                <Link href="/signup" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
                  Start Free
                </Link>
              </div>

              {/* Mobile Navigation Button */}
              <div className="md:hidden">
                <Link href="/" className="text-gray-600 hover:text-gray-800">Menu</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-teal-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose the plan that fits your boutique business needs. Start small and scale up as you grow. 
              No hidden fees, no surprises.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                M-Pesa payments accepted
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                90-day money-back guarantee
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Cancel anytime
              </div>
            </div>
          </div>
        </section>

        {/* Main Pricing Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Basic Plan */}
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 hover:border-teal-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Basic</h3>
                  <div className="text-4xl font-bold text-gray-800 mb-2">$13</div>
                  <div className="text-gray-600">per month</div>
                  <div className="text-sm text-gray-500 mt-2">1,000 WhatsApp messages</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">WhatsApp customer messaging</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Basic customer database</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Simple analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Email support</span>
                  </li>
                </ul>
                
                <Link href="/signup" className="block w-full text-center bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                  Start Free Trial
                </Link>
              </div>

              {/* Standard Plan */}
              <div className="bg-white p-8 rounded-xl shadow-xl border-2 border-teal-500 relative transform scale-105 hover:shadow-2xl transition-all duration-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium">Most Popular</span>
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Standard</h3>
                  <div className="text-4xl font-bold text-gray-800 mb-2">$49</div>
                  <div className="text-gray-600">per month</div>
                  <div className="text-sm text-gray-500 mt-2">5,000 WhatsApp messages</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Everything in Basic</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Advanced analytics dashboard</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Automated campaigns</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Priority support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">M-Pesa integration</span>
                  </li>
                </ul>
                
                <Link href="/signup" className="block w-full text-center bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                  Start Free Trial
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 hover:border-teal-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Pro</h3>
                  <div className="text-4xl font-bold text-gray-800 mb-2">$149</div>
                  <div className="text-gray-600">per month</div>
                  <div className="text-sm text-gray-500 mt-2">Unlimited WhatsApp messages</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Everything in Standard</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Full POS system</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Inventory management</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Advanced reporting</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Dedicated account manager</span>
                  </li>
                </ul>
                
                <Link href="/signup" className="block w-full text-center bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get answers to common questions about our pricing and plans
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I change my plan anytime?
                </h3>
                <p className="text-gray-600">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                  and we'll prorate your billing accordingly.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What happens if I exceed my message limit?
                </h3>
                <p className="text-gray-600">
                  You can purchase additional messages at the rate specified for your plan, or upgrade to a higher tier. 
                  No service interruption - you stay in control.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Do you offer annual billing?
                </h3>
                <p className="text-gray-600">
                  Currently, we offer monthly billing for maximum flexibility. We're working on annual plans 
                  with discounts for long-term commitments.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Is there a setup fee?
                </h3>
                <p className="text-gray-600">
                  No setup fees! You can start using Zuriscale immediately after signing up. 
                  All plans include onboarding support to get you started quickly.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600">
                  We accept M-Pesa for Kenyan customers, as well as major credit cards and bank transfers. 
                  All payments are processed securely.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  How quickly will I see results?
                </h3>
                <p className="text-gray-600">
                  Most retailers see increased repeat customers within 2-4 weeks of sending their first follow-up messages. 
                  The sooner you start, the faster you'll see results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Grow Your Boutique Business?
            </h2>
            <p className="text-teal-100 max-w-2xl mx-auto mb-8">
              Join hundreds of Kenyan boutique owners who are already using Zuriscale to increase their sales 
              and build lasting customer relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-block bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                Start Free Trial
              </Link>
              <Link
                href="https://wa.me/+254742065623"
                className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4">
                              <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">Z</span>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-teal-300 to-teal-100 bg-clip-text text-transparent">Zuriscale</span>
                </div>
              
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                Helping Kenyan boutique businesses turn one-time buyers into loyal customers.
              </p>
              
                              <div className="flex justify-center space-x-6 text-sm text-gray-400">
                  <Link href="https://wa.me/+254742065623" className="hover:text-white transition-colors duration-200 font-medium">
                    WhatsApp: +254 742 065 623
                  </Link>
                  <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200 font-medium">
                    Privacy Policy
                  </Link>
                  <Link href="/terms-of-service" className="hover:text-white transition-colors duration-200 font-medium">
                    Terms of Service
                  </Link>
                </div>
              
              <p className="text-gray-500 text-xs">
                © {new Date().getFullYear()} Zuriscale. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
