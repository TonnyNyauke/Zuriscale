import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Privacy Policy - Zuriscale',
  description: 'How we protect your data at Zuriscale',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#f0fdfa] py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/" className="text-[#0f766e] flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f766e] mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-500 mb-8">Last updated: July 13, 2025</p>

          <div className="space-y-8 text-[#374151]">
            <section>
              <h2 className="text-xl font-bold mb-4 text-[#0f766e]">
                Our Uncompromising Commitment
              </h2>
              <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-4">
                <p className="font-bold text-red-800">
                  We do not share your customer data. Period.
                </p>
                <p className="text-red-700">
                  Your customer information stays private and secure with us.
                </p>
              </div>
              <p>
                At Zuriscale, we understand that your customer relationships are the lifeblood of your fashion business. We're committed to protecting both your data and your customers' information with the highest security standards.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 text-[#0f766e]">
                What Information We Collect
              </h2>
              <p>We collect minimal information to provide our services:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Business Information:</strong> Your shop name, contact details, and business location</li>
                <li><strong>Customer Data:</strong> Only what you choose to store in our system (names, phone numbers, purchase history)</li>
                <li><strong>Usage Data:</strong> How you interact with our platform to improve our service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 text-[#0f766e]">
                How We Use Your Information
              </h2>
              <p>We use your data solely to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Provide and maintain our services</li>
                <li>Improve and personalize your experience</li>
                <li>Process transactions and send payment confirmations</li>
                <li>Communicate important service updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 text-[#0f766e]">
                What We Never Do
              </h2>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <ul className="space-y-2">
                <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>We never store decrypted messages on our servers</span>
                </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>We never sell your data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>We never share customer lists</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>We never use your data for advertising</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>We never have decryption keys for your messages</span>
                </li>
                </ul>
              </div>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4 text-[#0f766e]">
                    How We Maintain Privacy
                </h2>
                <p>
                    We've implemented a zero-access architecture where:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Messages are encrypted before leaving your browser</li>
                    <li>Our servers only handle encrypted data they cannot read</li>
                    <li>Decryption happens exclusively in your browser</li>
                    <li>Encryption keys never leave your device</li>
                </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 text-[#0f766e]">
                Your Rights
              </h2>
              <p>
                You have full control over your data:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Access and download your data anytime</li>
                <li>Request deletion of your account and all associated data</li>
                <li>Opt-out of non-essential communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 text-[#0f766e]">
                Contact Us
              </h2>
              <p>
                For any privacy concerns or data requests:
                <br />
                <span className="font-semibold">Email:</span> privacy@zuriscale.com
                <br />
                <span className="font-semibold">WhatsApp:</span> +254 742 065 623
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}