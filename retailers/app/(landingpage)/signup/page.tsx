import { Metadata } from 'next'
import ZuriscaleSignup from '@/components/auth/SignupForm'
import React from 'react'
import { signupAction } from '@/app/actions/signup'
import Link from 'next/link'
import { ArrowLeft, Users, TrendingUp, Shield, Zap } from 'lucide-react'

// Signup page specific metadata - FIXED CACHE HEADERS
export const metadata: Metadata = {
  // Signup pages should be indexed (unlike login) as they're conversion pages
  robots: {
    index: true,
    follow: true,
    noarchive: true, // Don't cache signup forms
    'max-snippet': 150,
    'max-image-preview': 'standard'
  },
  
  // Conversion-focused title for signup page
  title: 'Start Free Account | Zuriscale - Grow Your Fashion Business to KES 1M',
  
  // Compelling description focused on benefits and conversion
  description: 'Join 500+ Kenyan fashion retailers using Zuriscale to grow their sales. Start your free account today and turn one-time buyers into repeat customers. No monthly fees - pay only KES 1.5 per WhatsApp message.',
  
  // Signup-focused keywords with conversion intent
  keywords: [
    'fashion business Kenya signup',
    'WhatsApp business registration Kenya',
    'Zuriscale free account',
    'fashion retail growth platform',
    'KES 1M sales goal',
    'customer retention software Kenya',
    'fashion boutique management',
    'Nairobi fashion business',
    'small business growth Kenya',
    'WhatsApp marketing signup',
    'retail POS Kenya registration',
    'fashion business automation'
  ],
  
  // Canonical URL for signup page
  alternates: {
    canonical: 'https://www.zuriscale.com/signup',
  },
  
  // Open Graph data optimized for conversion
  openGraph: {
    title: 'Start Free - Zuriscale Fashion Business Growth Platform',
    description: 'Join 500+ Kenyan fashion retailers growing their sales with Zuriscale. Free to start, pay only KES 1.5 per WhatsApp message.',
    url: 'https://www.zuriscale.com/signup',
    siteName: 'Zuriscale',
    images: [
      {
        url: '/og-signup.jpg', // Specific signup conversion image
        width: 1200,
        height: 630,
        alt: 'Join Zuriscale - Fashion Retail Growth Platform for Kenya',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  
  // Twitter card optimized for conversion
  twitter: {
    card: 'summary_large_image',
    title: 'Start Free - Zuriscale Fashion Business Platform',
    description: 'Join 500+ Kenyan fashion retailers. Free to start, pay only KES 1.5 per message. 🚀',
    images: ['/twitter-signup.jpg'],
    creator: '@zuriscale',
  },
  
  // FIXED: Removed no-cache directives, added SEO-friendly headers
  other: {
    // SEO-friendly cache headers that allow indexing
    'Cache-Control': 'public, max-age=3600, s-maxage=86400', // 1 hour browser, 1 day CDN
    // Security headers
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    // Conversion tracking preparation
    'fb:app_id': 'YOUR_FACEBOOK_APP_ID', // Add if you use Facebook ads
  }
};

// Rich structured data for signup page - focuses on the offer
const signupStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.zuriscale.com/signup#webpage",
      "url": "https://www.zuriscale.com/signup",
      "name": "Sign Up - Zuriscale",
      "description": "Create your free Zuriscale account and start growing your fashion business today",
      "inLanguage": "en-KE",
      "isPartOf": {
        "@id": "https://www.zuriscale.com/#website"
      },
      "about": {
        "@id": "https://www.zuriscale.com/#organization"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://www.zuriscale.com/og-signup.jpg",
        "width": 1200,
        "height": 630
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.zuriscale.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Sign Up",
            "item": "https://www.zuriscale.com/signup"
          }
        ]
      }
    },
    {
      "@type": "Offer",
      "@id": "https://www.zuriscale.com/signup#offer",
      "name": "Zuriscale Free Account",
      "description": "Free fashion retail growth platform with pay-as-you-use WhatsApp messaging",
      "price": "0",
      "priceCurrency": "KES",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01",
      "priceSpecification": [
        {
          "@type": "UnitPriceSpecification",
          "price": "0",
          "priceCurrency": "KES",
          "unitText": "account setup",
          "description": "Free account creation"
        },
        {
          "@type": "UnitPriceSpecification",
          "price": "1.5",
          "priceCurrency": "KES", 
          "unitText": "per WhatsApp message",
          "description": "Pay-as-you-use messaging"
        }
      ],
      "seller": {
        "@id": "https://www.zuriscale.com/#organization"
      },
      "category": "Business Software",
      "areaServed": {
        "@type": "Country",
        "name": "Kenya"
      }
    },
    {
      "@type": "Service",
      "@id": "https://www.zuriscale.com/signup#service",
      "name": "Fashion Retail Growth Platform",
      "description": "WhatsApp customer retention and analytics platform for fashion retailers in Kenya",
      "provider": {
        "@id": "https://www.zuriscale.com/#organization"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Kenya"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Zuriscale Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "WhatsApp Customer Messaging"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Customer Analytics Dashboard"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Online Product Catalog"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Simple POS System"
            }
          }
        ]
      }
    }
  ]
};

function SignupPage() {
  return (
    <>
      {/* Structured Data for Signup Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(signupStructuredData)
        }}
      />
      
      {/* Preload critical resources for faster conversion */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/og-signup.jpg" as="image" />
      
      {/* DNS prefetch for external services */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      
      {/* Hidden SEO content - not visible but indexed by search engines */}
      <div className="sr-only">
        <h1>Join 500+ Fashion Retailers Growing Their Business with Zuriscale</h1>
        <p>Stop losing 80% of your customers after their first purchase. Our WhatsApp retention system automatically brings them back, turning one-time buyers into loyal repeat customers.</p>
        
        <h2>What You Get With Your Free Account</h2>
        <ul>
          <li>Automatic WhatsApp customer follow-ups and retention messages</li>
          <li>Customer analytics dashboard showing repeat purchase patterns</li>
          <li>Mobile-friendly online product catalog your customers can share</li>
          <li>Simple POS system that works on any phone or tablet</li>
          <li>M-Pesa payment integration for seamless transactions</li>
          <li>24/6 customer support from our team in Nairobi</li>
        </ul>
        
        <h2>Proven Results</h2>
        <p>Average retailers increase repeat customers from 20% to 50% within 8 weeks. Built for Kenyan businesses with M-Pesa integration and local support.</p>
        
        <blockquote>"I went from KES 30,000 to KES 85,000 monthly because customers actually come back now. The WhatsApp reminders work perfectly for my boutique in Nairobi." - Sarah M., Boutique Owner, Nairobi</blockquote>
        
        <p>Free to start, no monthly fees, no setup costs. Pay only KES 1.5 per WhatsApp message you send. Get started in under 5 minutes.</p>
        
        <nav>
          <Link href="/">Back to Home</Link>
          <Link href="/communities">Join Our Community</Link>
          <Link href="/blog">Read Success Stories</Link>
        </nav>
      </div>
      
      {/* Signup Form Component - Full Screen Experience */}
      <ZuriscaleSignup signupAction={signupAction}/>
    </>
  )
}

export default SignupPage