import { Metadata } from 'next';
import TieredPricing from '@/shared/components/TieredPricing';
import TierComparison from '@/shared/components/TierComparison';
import BasicFeatures from '@/tiers/basic/features/BasicFeatures';
import StandardFeatures from '@/tiers/standard/features/StandardFeatures';
import ProFeatures from '@/tiers/pro/features/ProFeatures';

export const metadata: Metadata = {
  title: 'Pricing - Choose Your Boutique Business Growth Plan | Zuriscale',
  description: 'Compare our three pricing tiers: Basic ($13/month), Standard ($49/month), and Pro ($149/month). Find the perfect plan for your boutique business growth.',
  keywords: [
    'boutique pricing Kenya',
    'boutique software pricing',
    'WhatsApp business pricing Kenya',
    'boutique POS pricing',
    'boutique growth plans',
    'Kenyan boutique software cost'
  ],
  alternates: {
    canonical: 'https://www.zuriscale.com/pricing',
  },
  openGraph: {
    title: 'Pricing - Choose Your Boutique Business Growth Plan',
    description: 'Compare our three pricing tiers and find the perfect plan for your boutique business growth.',
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
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
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
      <TieredPricing showTitle={false} />

      {/* Feature Details by Tier */}
      <BasicFeatures />
      <StandardFeatures />
      <ProFeatures />

      {/* Tier Comparison Table */}
      <TierComparison />

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
            <a
              href="/signup"
              className="inline-block bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </a>
            <a
              href="/contact"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors"
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}