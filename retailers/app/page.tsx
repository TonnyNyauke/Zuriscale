// app/page.tsx (SEO Optimized)
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, MessageSquare, TrendingUp, Users, ShoppingBag, Star } from 'lucide-react';
import MobileNav from '@/components/MobileNav';
import Link from 'next/link';

// Page-specific metadata that overrides layout defaults
export const metadata: Metadata = {
  // Specific title for landing page
  title: 'Zuriscale - WhatsApp Customer Retention for Kenyan Fashion Retailers | Reach KES 1M Sales',
  
  // Specific description for landing page
  description: 'Turn one-time buyers into repeat customers with Zuriscale\'s WhatsApp messaging platform. Trusted by 500+ Kenyan fashion retailers. Pay-as-you-use starting at KES 1.5/message. 24/6 support included.',
  
  // Landing page specific keywords (more targeted)
  keywords: [
    'fashion retail Kenya',
    'WhatsApp business Kenya',
    'customer retention software',
    'fashion business growth',
    'Kenyan small business',
    'retail POS system Kenya',
    'WhatsApp marketing Kenya',
    'fashion boutique software',
    'M-Pesa payments',
    'Nairobi fashion retailers',
    'KES 1M sales',
    'repeat customers',
    'automated WhatsApp follow-ups'
  ],
  
  // Canonical URL for this specific page
  alternates: {
    canonical: 'https://zuriscale.com/',
  },
  
  // Page-specific Open Graph data
  openGraph: {
    title: 'Zuriscale - WhatsApp Customer Retention for Fashion Retailers',
    description: 'Help your fashion business reach KES 1M in sales with automated WhatsApp follow-ups and customer analytics. Used by 500+ Kenyan retailers.',
    url: 'https://zuriscale.com',
    siteName: 'Zuriscale',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zuriscale - Fashion Retail Growth Platform for Kenya',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  
  // Page-specific Twitter data
  twitter: {
    card: 'summary_large_image',
    title: 'Zuriscale - WhatsApp Customer Retention for Fashion Retailers',
    description: 'Turn one-time buyers into repeat customers. Reach KES 1M in sales with automated WhatsApp messaging.',
    images: ['/twitter-image.jpg'],
    creator: '@zuriscale',
  },
};

// Your existing structured data
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://zuriscale.com/#organization",
      "name": "Zuriscale",
      "url": "https://zuriscale.com",
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
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KE",
        "addressLocality": "Nairobi"
      },
      "sameAs": [
        "https://twitter.com/zuriscale",
        "https://linkedin.com/company/zuriscale"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://zuriscale.com/#website",
      "url": "https://zuriscale.com",
      "name": "Zuriscale",
      "description": "WhatsApp customer retention platform for Kenyan fashion retailers",
      "publisher": {
        "@id": "https://zuriscale.com/#organization"
      },
      "inLanguage": "en-KE"
    },
    {
      "@type": "SoftwareApplication",
      "name": "Zuriscale",
      "description": "WhatsApp customer retention and analytics platform for fashion retailers in Kenya",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": {
        "@type": "Offer",
        "price": "1.5",
        "priceCurrency": "KES",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "1.5",
          "priceCurrency": "KES",
          "unitText": "per message"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      },
      "featureList": [
        "WhatsApp customer messaging",
        "Customer analytics dashboard",
        "Online product catalog",
        "Simple POS system",
        "24/6 customer support"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does the pay-as-you-use model work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You only pay for WhatsApp messages you send. Buy message bundles with M-Pesa, and use them whenever you need to contact customers. All other basic features are included for free."
          }
        },
        {
          "@type": "Question",
          "name": "Can I really reach KES 1M in sales?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Our system is designed to help you retain customers and increase repeat purchases. With proper follow-up and customer insights, many of our clients have doubled or tripled their monthly sales within 6-12 months."
          }
        },
        {
          "@type": "Question",
          "name": "Do you accept M-Pesa payments?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We accept M-Pesa for all message bundles and future subscription features. You can also pay with mobile money or bank transfer."
          }
        }
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
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
        {/* Mobile Navigation - Client Component */}
        <MobileNav />

        {/* Hero Section - SEO Optimized */}
        <section className="container mx-auto px-4 py-12 md:py-20 text-center">
          <Badge className="mb-6 bg-emerald-100 text-emerald-800 border-emerald-200 text-sm px-4 py-2">
            🇰🇪 Trusted by 500+ Kenyan Fashion Retailers
          </Badge>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight">
            Stop Losing Customers After 
            <span className="block text-teal-600 mt-2">One Purchase</span>
          </h1>

          <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-gray-800 px-6 py-4 rounded-xl mb-8 shadow-lg">
            <p className="text-lg md:text-xl font-semibold">
              Reach KES 1M in Sales This Year
            </p>
            <p className="text-sm mt-1 opacity-90">
              With WhatsApp customer retention that actually works
            </p>
          </div>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Turn one-time buyers into repeat customers with automated WhatsApp follow-ups, 
            customer analytics, and online catalogs that bring customers back.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white shadow-lg" asChild>
            <Link href="/signup" aria-label="Start using Zuriscale for KES 1.5 per message">
              Start for KES 1.5/Message
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="border-teal-200 text-teal-700 hover:bg-teal-50" asChild>
            <Link href="#" aria-label="Learn how Zuriscale works">
              See How It Works
            </Link>
          </Button>
        </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              <span>No monthly fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              <span>Pay as you use</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              <span>24/6 Support</span>
            </div>
          </div>
        </section>

        {/* Problem/Solution Section - SEO Optimized */}
        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Why Fashion Retailers in Kenya Struggle to Grow Beyond KES 50,000 Monthly
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Most Kenyan fashion retailers are stuck in a cycle of finding new customers 
                but never keeping them. Here&apos;s how Zuriscale breaks that cycle:
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Problems */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Without Customer Retention System 😰
                </h3>
                <div className="space-y-4">
                  <article className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0" aria-hidden="true"></div>
                    <div>
                      <h4 className="font-medium text-red-800">Customers buy once and disappear</h4>
                      <p className="text-sm text-red-600">No follow-up system to bring them back for repeat purchases</p>
                    </div>
                  </article>
                  <article className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0" aria-hidden="true"></div>
                    <div>
                      <h4 className="font-medium text-red-800">Guessing what customers want</h4>
                      <p className="text-sm text-red-600">No data on buying patterns or customer preferences</p>
                    </div>
                  </article>
                  <article className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0" aria-hidden="true"></div>
                    <div>
                      <h4 className="font-medium text-red-800">Revenue stuck at KES 20K-50K monthly</h4>
                      <p className="text-sm text-red-600">Same customers, same revenue, no sustainable growth</p>
                    </div>
                  </article>
                </div>
              </div>

              {/* Solutions */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  With Zuriscale WhatsApp Retention 🚀
                </h3>
                <div className="space-y-4">
                  <article className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <Check className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <h4 className="font-medium text-emerald-800">Automated WhatsApp follow-ups</h4>
                      <p className="text-sm text-emerald-600">Remind customers about new arrivals, sales, and personalized offers</p>
                    </div>
                  </article>
                  <article className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <Check className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <h4 className="font-medium text-emerald-800">Customer analytics & insights</h4>
                      <p className="text-sm text-emerald-600">Know exactly what sells, when, and to which customers</p>
                    </div>
                  </article>
                  <article className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <Check className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <h4 className="font-medium text-emerald-800">Scale to KES 1M+ monthly revenue</h4>
                      <p className="text-sm text-emerald-600">Proven system with dedicated 24/6 business support</p>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - SEO Optimized */}
        <section id="features" className="py-16 md:py-20 bg-gradient-to-br from-teal-50 to-emerald-50">
          <div className="container mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Complete Fashion Retail Growth Platform for Kenyan Businesses
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Start with pay-as-you-use WhatsApp messaging. Add more features as you grow your fashion business.
              </p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <article className="bg-white p-6 rounded-xl shadow-sm border border-teal-100 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">WhatsApp Customer Retention</h3>
                <p className="text-gray-600 mb-4">Send personalized messages to bring customers back. Start at KES 1.5 per message with M-Pesa payments.</p>
                <div className="text-sm text-teal-600 font-medium">
                  ✓ Automated follow-ups
                  <br />✓ New arrival alerts
                  <br />✓ Sale notifications
                  <br />✓ M-Pesa integration
                </div>
              </article>

              <article className="bg-white p-6 rounded-xl shadow-sm border border-teal-100 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Customer Analytics Dashboard</h3>
                <p className="text-gray-600 mb-4">See who buys what, when they buy, and predict what they&apos;re likely to purchase next.</p>
                <div className="text-sm text-teal-600 font-medium">
                  ✓ Sales tracking
                  <br />✓ Customer behavior analysis
                  <br />✓ Best-selling items report
                  <br />✓ Revenue forecasting
                </div>
              </article>

              <article className="bg-white p-6 rounded-xl shadow-sm border border-teal-100 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingBag className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Online Fashion Catalog</h3>
                <p className="text-gray-600 mb-4">Beautiful online store that customers can browse and share with friends. SEO optimized for Google Kenya.</p>
                <div className="text-sm text-teal-600 font-medium">
                  ✓ Mobile-friendly design
                  <br />✓ Easy inventory updates
                  <br />✓ SEO optimized for Kenya
                  <br />✓ Social media integration
                </div>
              </article>

              <article className="bg-white p-6 rounded-xl shadow-sm border border-teal-100 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Simple POS System</h3>
                <p className="text-gray-600 mb-4">Track in-store sales and inventory on any smartphone or tablet. Perfect for Kenyan retailers.</p>
                <div className="text-sm text-teal-600 font-medium">
                  ✓ Quick mobile checkout
                  <br />✓ Real-time inventory
                  <br />✓ Up to 5 staff members
                  <br />✓ M-Pesa integration
                </div>
              </article>

              <article className="bg-white p-6 rounded-xl shadow-sm border border-teal-100 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">24/6 Business Support</h3>
                <p className="text-gray-600 mb-4">Get help when you need it. Our goal is to help you reach KES 1M in monthly sales.</p>
                <div className="text-sm text-teal-600 font-medium">
                  ✓ WhatsApp support
                  <br />✓ Business growth advice
                  <br />✓ Technical assistance
                  <br />✓ Marketing strategies
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Testimonial Section - SEO Optimized */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-8 rounded-2xl shadow-lg">
                <div className="flex justify-center mb-4" role="img" aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-amber-300" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl font-medium mb-4">
                  &quot;Before Zuriscale, I was making KES 30,000 per month from my fashion boutique in Nairobi. 
                  Now I&apos;m consistently hitting KES 80,000+ because my customers keep coming back. 
                  The WhatsApp follow-ups work like magic for repeat sales!&quot;
                </blockquote>
                <cite className="text-teal-100">
                  - Sarah M., Fashion Boutique Owner, Nairobi
                </cite>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section - SEO Optimized */}
        <section id="pricing" className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-teal-50">
          <div className="container mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Simple, Transparent Pricing for Kenyan Fashion Retailers
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Start for free. Pay only for WhatsApp messages you send. No hidden fees. M-Pesa payments accepted.
              </p>
            </header>

            <div className="max-w-lg mx-auto">
              <article className="bg-white rounded-2xl p-8 shadow-lg border-2 border-teal-200">
                <div className="text-center mb-6">
                  <Badge className="bg-red-100 text-red-800 border-red-200 mb-4">
                    Pay As You Use
                  </Badge>
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    KES 1.5
                    <span className="text-lg text-gray-500 font-normal">/message</span>
                  </div>
                  <p className="text-gray-600">Plus WhatsApp messaging bundles available with M-Pesa</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                    <span>WhatsApp customer messaging system</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                    <span>Customer analytics dashboard</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                    <span>Online catalog for your fashion products</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                    <span>Simple POS system for retail</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                    <span>Up to 5 team members</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                    <span>24/6 customer support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                    <span>M-Pesa payments accepted</span>
                  </div>
                </div>

                <Button size="lg" className="w-full bg-red-500 hover:bg-red-600 text-white shadow-lg" aria-label="Create your Zuriscale account">
                  <Link href='/signup'>
                    Start Now - Create Account
                  </Link>
                </Button>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  No setup fees • Cancel anytime • Pay with M-Pesa
                </p>
              </article>
            </div>

            {/* Message Bundles */}
            <div className="mt-12 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-center mb-6 text-gray-800">
                WhatsApp Message Bundles - Pay with M-Pesa
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <article className="bg-white p-4 rounded-lg border border-teal-100 text-center">
                  <div className="font-bold text-lg text-gray-800">Starter Bundle</div>
                  <div className="text-2xl font-bold text-teal-600 my-2">KES 135</div>
                  <div className="text-sm text-gray-600">100 WhatsApp messages</div>
                  <div className="text-xs text-gray-500 mt-1">KES 1.35 per message</div>
                </article>
                <article className="bg-white p-4 rounded-lg border-2 border-red-200 text-center relative">
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white">
                    Most Popular
                  </Badge>
                  <div className="font-bold text-lg text-gray-800">Growth Bundle</div>
                  <div className="text-2xl font-bold text-teal-600 my-2">KES 600</div>
                  <div className="text-sm text-gray-600">500 WhatsApp messages</div>
                  <div className="text-xs text-gray-500 mt-1">KES 1.20 per message</div>
                </article>
                <article className="bg-white p-4 rounded-lg border border-teal-100 text-center">
                  <div className="font-bold text-lg text-gray-800">Scale Bundle</div>
                  <div className="text-2xl font-bold text-teal-600 my-2">KES 1000</div>
                  <div className="text-sm text-gray-600">1000 WhatsApp messages</div>
                  <div className="text-xs text-gray-500 mt-1">KES 1.00 per message</div>
                </article>
              </div>
            </div>
          </div>
        </section>

      {/* FAQ Section - SSR */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Frequently Asked Questions About Zuriscale
              </h2>
            </header>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <article className="border rounded-lg p-6 hover:border-teal-200 transition-colors">
              <h3 className="font-bold mb-2 text-gray-800">How does the pay-as-you-use model work?</h3>
              <p className="text-gray-600">You only pay for WhatsApp messages you send. Buy message bundles with M-Pesa, and use them whenever you need to contact customers. All other basic features are included for free.</p>
            </article>
            
            <article className="border rounded-lg p-6 hover:border-teal-200 transition-colors">
              <h3 className="font-bold mb-2 text-gray-800">Can I really reach KES 1M in sales?</h3>
              <p className="text-gray-600">Yes! Our system is designed to help you retain customers and increase repeat purchases. With proper follow-up and customer insights, many of our clients have doubled or tripled their monthly sales within 6-12 months.</p>
            </article>
            
            <article className="border rounded-lg p-6 hover:border-teal-200 transition-colors">
              <h3 className="font-bold mb-2 text-gray-800">Do you accept M-Pesa payments?</h3>
              <p className="text-gray-600">Yes! We accept M-Pesa for all message bundles and future subscription features. You can also pay with mobile money or bank transfer.</p>
            </article>
            
            <article className="border rounded-lg p-6 hover:border-teal-200 transition-colors">
              <h3 className="font-bold mb-2 text-gray-800">What kind of support do you provide?</h3>
              <p className="text-gray-600">We offer 24/6 support (Monday-Friday) via WhatsApp, email, and phone. Our team helps with technical issues, business advice, and marketing strategies to help you grow.</p>
            </article>
            
            <article className="border rounded-lg p-6 hover:border-teal-200 transition-colors">
              <h3 className="font-bold mb-2 text-gray-800">Is my customer data secure?</h3>
              <p className="text-gray-600">Absolutely. We use enterprise-grade security with SSL encryption and secure cloud storage. Your customer data is protected with the same security standards used by banks.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Final CTA Section - SSR */}
      <section className="bg-gradient-to-r from-teal-600 to-emerald-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Fashion Business?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of Kenyan fashion retailers who are already growing their sales with Zuriscale. 
            Start today for just KES 1.25 per message.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white shadow-lg">
              Create Your Account Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-teal-700 hover:bg-white hover:text-teal-800">
              Talk to Our Team
            </Button>
          </div>
          
          <p className="text-sm mt-6 opacity-75">
            No setup fees • Pay with M-Pesa • 24/6 support included
          </p>
        </div>
      </section>

      {/* Footer - SSR */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Z</span>
                </div>
                <span className="text-xl font-bold">Zuriscale</span>
              </div>
              <p className="text-gray-400">
                Helping Kenyan fashion retailers reach KES 1M in sales through customer retention and growth strategies.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <Link href='https://wa.me/+254742065623' target='_blank' rel='noopener'>WhatsApp: +254 742 065 623</Link>
                <p>Email: support@zuriscale.com</p>
                <p>Hours: 24/6 Support</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2 text-gray-400">
                <p><Link href="#features" className="hover:text-white">Features</Link></p>
                <p><Link href="#pricing" className="hover:text-white">Pricing</Link></p>
                <p><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></p>
                <p><Link href="terms-of-service" className="hover:text-white">Terms of Service</Link></p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Zuriscale. All rights reserved. Made with ❤️ in Kenya.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}