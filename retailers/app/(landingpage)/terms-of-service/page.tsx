import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Terms of Service - Zuriscale',
  description: 'Terms and conditions for using Zuriscale',
};

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-gray-500 mb-8">Last updated: July 13, 2025</p>

          <div className="space-y-8 text-[#374151]">
            <section>
              <h2 className="text-xl font-bold mb-4 text-[#0f766e]">
                Introduction
              </h2>
              <p>
                Welcome to Zuriscale! These Terms of Service govern your use of our WhatsApp customer retention platform designed for Kenyan fashion retailers. By accessing or using our services, you agree to be bound by these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 text-[#0f766e]">
                Account Registration
              </h2>
              <p>
                To use Zuriscale, you must:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Be at least 18 years old</li>
                <li>Provide accurate business information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Comply with WhatsApp Business policies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 text-[#0f766e]">
                Payment Terms
              </h2>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-4">
                <p className="font-bold text-[#ea580c]">
                  Pay-As-You-Use Model
                </p>
                <p>
                  You only pay for WhatsApp messages sent through our platform at KES 1.5 per message.
                </p>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li>Message bundles are non-refundable</li>
                <li>All payments are processed through M-Pesa or bank transfer</li>
                <li>Prices are subject to change with 30-day notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 text-[#0f766e]">
                Acceptable Use
              </h2>
              <p>
                You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Send spam or unsolicited messages</li>
                <li>Use our platform for illegal activities</li>
                <li>Harass customers or send abusive content</li>
                <li>Violate WhatsApp&apos;s terms of service</li>
                <li>Share your account with unauthorized users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 text-[#0f766e]">
                Data Ownership
              </h2>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <p className="font-bold text-[#059669]">
                  You own your customer data
                </p>
                <p>
                  All customer information you add to Zuriscale remains your exclusive property.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 text-[#0f766e]">
                Service Availability
              </h2>
              <p>
                We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service due to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Third-party service outages (WhatsApp, internet providers)</li>
                <li>Scheduled maintenance with advance notice</li>
                <li>Unforeseen technical issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 text-[#0f766e]">
                Termination
              </h2>
              <p>
                You may close your account at any time. We reserve the right to suspend accounts for:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Violation of these terms</li>
                <li>Non-payment of outstanding fees</li>
                <li>Abusive behavior toward customers or staff</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 text-[#0f766e]">
                Limitation of Liability
              </h2>
              <p>
                Zuriscale is not liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Indirect or consequential damages</li>
                <li>Loss of profits or business opportunities</li>
                <li>Issues arising from third-party services</li>
                <li>Data loss due to circumstances beyond our control</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 text-[#0f766e]">
                Changes to Terms
              </h2>
              <p>
                We may update these terms periodically. Continued use after changes constitutes acceptance. We&apos;ll notify you of significant changes via email or in-app notification.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 text-[#0f766e]">
                Governing Law
              </h2>
              <p>
                These terms are governed by Kenyan law. Any disputes will be resolved in the courts of Nairobi, Kenya.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 text-[#0f766e]">
                Contact Us
              </h2>
              <p>
                For questions about these terms:
                <br />
                <span className="font-semibold">Email:</span> legal@zuriscale.com
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