import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Global/Default metadata for the entire site
export const metadata: Metadata = {
  metadataBase: new URL('https://zuriscale.com'),
  
  // Default title template - will be overridden by page-specific titles
  title: {
    template: '%s | Zuriscale - WhatsApp Customer Retention for Fashion Retailers',
    default: 'Zuriscale - WhatsApp Customer Retention for Kenyan Fashion Retailers'
  },
  
  // Default description - will be overridden by page-specific descriptions
  description: 'Turn one-time buyers into repeat customers with Zuriscale\'s WhatsApp messaging platform. Trusted by 500+ Kenyan fashion retailers. Pay-as-you-use starting at KES 1.5/message.',
  
  // Global keywords that apply to your entire site
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
    'Nairobi fashion retailers'
  ],
  
  // Company/Brand information
  authors: [{ name: 'Zuriscale Team' }],
  creator: 'Zuriscale',
  publisher: 'Zuriscale',
  
  // Format detection settings
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Canonical URL will be set per page
  alternates: {
    canonical: '/',
  },
  
  // Global Open Graph settings
  openGraph: {
    siteName: 'Zuriscale',
    locale: 'en_KE',
    type: 'website',
    // Page-specific OG data will override these
  },
  
  // Global Twitter settings
  twitter: {
    card: 'summary_large_image',
    creator: '@zuriscale',
    // Page-specific Twitter data will override these
  },
  
  // Robots settings
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification codes (global)
  verification: {
    google: 'your-google-verification-code',
    // Add other verification codes here
  },
  
  // Global icons and manifest
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-KE">
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Analytics />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}