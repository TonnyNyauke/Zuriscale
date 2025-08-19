import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Check, Crown, Star, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Upgrade Your Plan - Unlock More Features | Zuriscale',
  description: 'Upgrade your Zuriscale plan to unlock advanced features, better analytics, and unlimited growth potential for your boutique business.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function UpgradePage({
  searchParams,
}: {
  searchParams: { tier?: string };
}) {
  const requestedTier = searchParams.tier || 'standard';

  const tiers = {
    standard: {
      name: 'Standard',
      price: '$49',
      features: [
        'Everything in Basic',
        '5,000 WhatsApp messages/month',
        'Advanced analytics dashboard',
        'Automated campaigns',
        'Priority support',
        'M-Pesa integration',
        'Customer segmentation',
        'Advanced reporting'
      ],
      color: 'teal',
      icon: Star
    },
    pro: {
      name: 'Pro',
      price: '$149',
      features: [
        'Everything in Standard',
        'Unlimited WhatsApp messages',
        'Full POS system',
        'Inventory management',
        'Advanced reporting & insights',
        'Dedicated account manager',
        'API access',
        'White-label options',
        'Custom integrations'
      ],
      color: 'purple',
      icon: Crown
    }
  };

  const currentTier = tiers[requestedTier as keyof typeof tiers] || tiers.standard;
  const IconComponent = currentTier.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">Z</span>
                </div>
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent hover:from-teal-700 hover:to-teal-900 transition-all duration-200">Zuriscale</Link>
            </div>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-gray-100">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full mb-6">
              <IconComponent className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Upgrade to {currentTier.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unlock powerful features to take your boutique business to the next level
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-gray-800 mb-2">{currentTier.price}</div>
              <div className="text-gray-600">per month</div>
              <div className="text-sm text-gray-500 mt-2">
                {requestedTier === 'standard' ? '5,000 WhatsApp messages included' : 'Unlimited WhatsApp messages'}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">What you'll get:</h3>
                <ul className="space-y-3">
                  {currentTier.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Why upgrade?</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Zap className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800">Faster Growth</div>
                      <div className="text-sm text-gray-600">Advanced tools to scale your business</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800">Better Insights</div>
                      <div className="text-sm text-gray-600">Data-driven decisions for success</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Crown className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800">Premium Support</div>
                      <div className="text-sm text-gray-600">Get help when you need it most</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to unlock {currentTier.name} features?
              </h2>
              <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
                Join hundreds of boutique owners who have already upgraded and are seeing 
                incredible results in their business growth.
              </p>
              
                             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Button 
                   size="lg" 
                   className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                 >
                   Upgrade Now
                 </Button>
                 <Button 
                   size="lg" 
                   variant="outline"
                   className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 text-lg font-semibold transition-all duration-200 transform hover:-translate-y-0.5"
                 >
                   Talk to Sales
                 </Button>
               </div>
              
              <p className="text-sm text-teal-200 mt-6">
                ✓ No setup fees • ✓ 90-day money-back guarantee • ✓ Cancel anytime
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
              Frequently Asked Questions
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Can I upgrade anytime?
                </h4>
                <p className="text-gray-600 text-sm">
                  Yes! You can upgrade your plan at any time. Changes take effect immediately 
                  and we'll prorate your billing.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">
                  What happens to my data?
                </h4>
                <p className="text-gray-600 text-sm">
                  All your data, customers, and settings are preserved when you upgrade. 
                  You'll have access to everything plus new features.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Can I downgrade later?
                </h4>
                <p className="text-gray-600 text-sm">
                  Yes, you can downgrade to a lower tier at any time. Your data remains 
                  accessible within the limits of the new plan.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Is there a setup fee?
                </h4>
                <p className="text-gray-600 text-sm">
                  No setup fees! You can start using new features immediately after upgrading. 
                  All plans include onboarding support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
