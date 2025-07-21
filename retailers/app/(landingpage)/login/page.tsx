import { Metadata } from 'next'
import LoginForm from '@/components/auth/LoginForm'
import React from 'react'

// Login page specific metadata
export const metadata: Metadata = {
  // Login pages should generally not be indexed by search engines
  robots: {
    index: false,
    follow: true,
    noarchive: true,
    nosnippet: true
  },
  
  // Concise, functional title for login page
  title: 'Login | Zuriscale - Fashion Retail Growth Platform',
  
  // Brief description for login page
  description: 'Sign in to your Zuriscale account to manage your fashion retail business, track customers, and grow your sales to KES 1M.',
  
  // Minimal keywords for login page (focus on brand and function)
  keywords: [
    'Zuriscale login',
    'fashion retail dashboard',
    'WhatsApp business login Kenya',
    'retail management login'
  ],
  
  // Canonical URL for login page
  alternates: {
    canonical: 'https://www.zuriscale.com/login',
  },
  
  // Open Graph data for login page (minimal sharing)
  openGraph: {
    title: 'Login - Zuriscale',
    description: 'Access your Zuriscale fashion retail dashboard',
    url: 'https://www.zuriscale.com/login',
    siteName: 'Zuriscale',
    // No image needed for login page or use a simple brand image
    images: [
      {
        url: '/brand-card.jpg', // Smaller brand image instead of promotional
        width: 800,
        height: 600,
        alt: 'Zuriscale Login',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  
  // Twitter card for login page (minimal)
  twitter: {
    card: 'summary', // Use summary instead of large image
    title: 'Login - Zuriscale',
    description: 'Access your fashion retail dashboard',
    creator: '@zuriscale',
  },
  
  // Additional meta tags for security and functionality
  other: {
    // Prevent login page from being cached
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    // Security headers
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
  }
};

// Minimal structured data for login page
const loginStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.zuriscale.com/login#webpage",
  "url": "https://www.zuriscale.com/login",
  "name": "Zuriscale Login",
  "description": "Sign in to access your Zuriscale fashion retail dashboard",
  "inLanguage": "en-KE",
  "isPartOf": {
    "@id": "https://www.zuriscale.com/#website"
  },
  "about": {
    "@id": "https://www.zuriscale.com/#organization"
  },
  "mainEntity": {
    "@type": "WebApplication",
    "name": "Zuriscale Login",
    "url": "https://www.zuriscale.com/login",
    "applicationCategory": "BusinessApplication",
    "browserRequirements": "Requires JavaScript. Requires HTML5."
  }
};

function LoginPage() {
  return (
    <>
      {/* Structured Data for Login Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(loginStructuredData)
        }}
      />
      
      {/* Preload critical resources */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      
      {/* Login Form Component */}
      <LoginForm />
    </>
  )
}

export default LoginPage