// app/page.tsx (SSR)
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, MessageSquare, TrendingUp, Users, ShoppingBag, Star } from 'lucide-react';
import MobileNav from '@/components/MobileNav';

export default function ZuriscaleLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Mobile Navigation - Client Component */}
      <MobileNav />

      {/* Hero Section - SSR */}
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
          <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white shadow-lg">
            Start for KES 1.25/Message
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="border-teal-200 text-teal-700 hover:bg-teal-50">
            See How It Works
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-500" />
            <span>No monthly fees</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-500" />
            <span>Pay as you use</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-500" />
            <span>24/6 Support</span>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section - SSR */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Why Fashion Retailers Struggle to Grow
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Most fashion retailers are stuck in a cycle of finding new customers 
              but never keeping them. Here's how Zuriscale breaks that cycle:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Problems */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Without Zuriscale 😰
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-red-800">Customers buy once and disappear</p>
                    <p className="text-sm text-red-600">No follow-up system to bring them back</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-red-800">Guessing what customers want</p>
                    <p className="text-sm text-red-600">No data on buying patterns or preferences</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-red-800">Stuck at KES 20K-50K monthly</p>
                    <p className="text-sm text-red-600">Same customers, same revenue, no growth</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                With Zuriscale 🚀
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <Check className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-emerald-800">Automated WhatsApp follow-ups</p>
                    <p className="text-sm text-emerald-600">Remind customers about new arrivals & sales</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <Check className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-emerald-800">Customer analytics & insights</p>
                    <p className="text-sm text-emerald-600">Know exactly what sells and to whom</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <Check className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-emerald-800">Scale to KES 1M+ monthly</p>
                    <p className="text-sm text-emerald-600">Proven system with 24/6 support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - SSR */}
      <section id="features" className="py-16 md:py-20 bg-gradient-to-br from-teal-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Everything You Need to Grow Your Fashion Business
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start with pay-as-you-use WhatsApp messaging. Add more features as you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-teal-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">WhatsApp Customer Retention</h3>
              <p className="text-gray-600 mb-4">Send personalized messages to bring customers back. Start at KES 1.25 per message.</p>
              <div className="text-sm text-teal-600 font-medium">
                ✓ Automated follow-ups
                <br />✓ New arrival alerts
                <br />✓ Sale notifications
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-teal-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Customer Analytics</h3>
              <p className="text-gray-600 mb-4">See who buys what, when they buy, and what they're likely to buy next.</p>
              <div className="text-sm text-teal-600 font-medium">
                ✓ Sales tracking
                <br />✓ Customer behavior
                <br />✓ Best-selling items
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-teal-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Online Catalog</h3>
              <p className="text-gray-600 mb-4">Beautiful online store that customers can browse and share with friends.</p>
              <div className="text-sm text-teal-600 font-medium">
                ✓ Mobile-friendly
                <br />✓ Easy to update
                <br />✓ SEO optimized
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-teal-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Simple POS System</h3>
              <p className="text-gray-600 mb-4">Track in-store sales and inventory. Works on any smartphone or tablet.</p>
              <div className="text-sm text-teal-600 font-medium">
                ✓ Quick checkout
                <br />✓ Inventory tracking
                <br />✓ Up to 5 users
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-teal-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">24/6 Customer Support</h3>
              <p className="text-gray-600 mb-4">Get help when you need it. Our goal is to get you to KES 1M in sales.</p>
              <div className="text-sm text-teal-600 font-medium">
                ✓ WhatsApp support
                <br />✓ Business advice
                <br />✓ Technical help
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - SSR */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-8 rounded-2xl shadow-lg">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-amber-300" />
                ))}
              </div>
              <blockquote className="text-lg md:text-xl font-medium mb-4">
                "Before Zuriscale, I was making KES 30,000 per month. Now I'm consistently 
                hitting KES 80,000+ because my customers keep coming back. The WhatsApp 
                follow-ups work like magic!"
              </blockquote>
              <cite className="text-teal-100">
                - Sarah M., Fashion Boutique Owner, Nairobi
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - SSR */}
      <section id="pricing" className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start for free. Pay only for what you use. No hidden fees.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-teal-200">
              <div className="text-center mb-6">
                <Badge className="bg-red-100 text-red-800 border-red-200 mb-4">
                  Pay As You Use
                </Badge>
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  KES 1.25
                  <span className="text-lg text-gray-500 font-normal">/message</span>
                </div>
                <p className="text-gray-600">Plus WhatsApp messaging bundles available</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span>WhatsApp customer messaging</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span>Customer analytics dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span>Online catalog for your products</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span>Simple POS system</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span>Up to 5 team members</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span>24/6 customer support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span>M-Pesa payments accepted</span>
                </div>
              </div>

              <Button size="lg" className="w-full bg-red-500 hover:bg-red-600 text-white shadow-lg">
                Start Now - Create Account
              </Button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                No setup fees • Cancel anytime • Pay with M-Pesa
              </p>
            </div>
          </div>

          {/* Message Bundles */}
          <div className="mt-12 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-center mb-6 text-gray-800">
              WhatsApp Message Bundles
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-teal-100 text-center">
                <div className="font-bold text-lg text-gray-800">Starter</div>
                <div className="text-2xl font-bold text-teal-600 my-2">KES 120</div>
                <div className="text-sm text-gray-600">100 messages</div>
                <div className="text-xs text-gray-500 mt-1">KES 1.20/message</div>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-red-200 text-center relative">
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white">
                  Popular
                </Badge>
                <div className="font-bold text-lg text-gray-800">Growth</div>
                <div className="text-2xl font-bold text-teal-600 my-2">KES 550</div>
                <div className="text-sm text-gray-600">500 messages</div>
                <div className="text-xs text-gray-500 mt-1">KES 1.10/message</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-teal-100 text-center">
                <div className="font-bold text-lg text-gray-800">Scale</div>
                <div className="text-2xl font-bold text-teal-600 my-2">KES 1000</div>
                <div className="text-sm text-gray-600">1000 messages</div>
                <div className="text-xs text-gray-500 mt-1">KES 1.00/message</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - SSR */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border rounded-lg p-6 hover:border-teal-200 transition-colors">
              <h3 className="font-bold mb-2 text-gray-800">How does the pay-as-you-use model work?</h3>
              <p className="text-gray-600">You only pay for WhatsApp messages you send. Buy message bundles with M-Pesa, and use them whenever you need to contact customers. All other features are included for free.</p>
            </div>
            
            <div className="border rounded-lg p-6 hover:border-teal-200 transition-colors">
              <h3 className="font-bold mb-2 text-gray-800">Can I really reach KES 1M in sales?</h3>
              <p className="text-gray-600">Yes! Our system is designed to help you retain customers and increase repeat purchases. With proper follow-up and customer insights, many of our clients have doubled or tripled their monthly sales within 6-12 months.</p>
            </div>
            
            <div className="border rounded-lg p-6 hover:border-teal-200 transition-colors">
              <h3 className="font-bold mb-2 text-gray-800">Do you accept M-Pesa payments?</h3>
              <p className="text-gray-600">Yes! We accept M-Pesa for all message bundles and future subscription features. You can also pay with mobile money or bank transfer.</p>
            </div>
            
            <div className="border rounded-lg p-6 hover:border-teal-200 transition-colors">
              <h3 className="font-bold mb-2 text-gray-800">What kind of support do you provide?</h3>
              <p className="text-gray-600">We offer 24/6 support (Monday-Friday) via WhatsApp, email, and phone. Our team helps with technical issues, business advice, and marketing strategies to help you grow.</p>
            </div>
            
            <div className="border rounded-lg p-6 hover:border-teal-200 transition-colors">
              <h3 className="font-bold mb-2 text-gray-800">Is my customer data secure?</h3>
              <p className="text-gray-600">Absolutely. We use enterprise-grade security with SSL encryption and secure cloud storage. Your customer data is protected with the same security standards used by banks.</p>
            </div>
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
                <p>WhatsApp: +254 700 123 456</p>
                <p>Email: support@zuriscale.com</p>
                <p>Hours: 24/6 Support</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2 text-gray-400">
                <p><a href="#features" className="hover:text-white">Features</a></p>
                <p><a href="#pricing" className="hover:text-white">Pricing</a></p>
                <p><a href="#" className="hover:text-white">Privacy Policy</a></p>
                <p><a href="#" className="hover:text-white">Terms of Service</a></p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Zuriscale. All rights reserved. Made with ❤️ in Kenya.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}