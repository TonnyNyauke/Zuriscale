// app/page.tsx
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="container py-20 text-center">
        <Badge variant="secondary" className="mb-4 bg-[#00C49A]/20 text-[#006D53]">
          Trusted by 500+ Kenyan Fashion Businesses 🇰🇪
        </Badge>
        
        <h1 className="text-5xl font-bold mb-6 text-[#004E89]">
          Boost Your Retail Sales Through Smarter
          <span className="block text-[#FF6B35] mt-3">Customer Retention & Analytics</span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Zuriscale gives you real-time sales tracking, inventory management, and WhatsApp-powered customer retention campaigns - all in one simple platform
        </p>

        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-[#FF6B35] hover:bg-[#E55A2B]">
            Start 7-Day Free Trial
          </Button>
          <Button variant="outline" size="lg" className="text-[#004E89]">
            How It Works 
            {/* <Icons.arrowRight className="ml-2" /> */}
          </Button>
        </div>

        {/* Social Proof */}
        {/* <div className="mt-16 flex justify-center gap-8">
          <Icons.mpesa className="h-12 w-auto opacity-75" />
          <Icons.facebook className="h-12 w-auto opacity-75" />
          <Icons.whatsapp className="h-12 w-auto opacity-75" />
        </div> */}
      </section>

      {/* Features Grid */}
      <section className="bg-white py-20">
        <div className="container grid md:grid-cols-3 gap-12">
          <div className="p-6 border rounded-lg hover:border-[#00C49A] transition-all">
            {/* <Icons.analytics className="h-12 w-12 text-[#004E89] mb-4" /> */}
            <h3 className="text-xl font-bold mb-2">Real-Time Analytics</h3>
            <p className="text-gray-600">Track daily sales, customer trends, and inventory levels</p>
          </div>
          
          <div className="p-6 border rounded-lg hover:border-[#00C49A] transition-all">
            {/* <Icons.whatsapp className="h-12 w-12 text-[#004E89] mb-4" /> */}
            <h3 className="text-xl font-bold mb-2">WhatsApp Campaigns</h3>
            <p className="text-gray-600">Send targeted promotions directly to customer phones</p>
          </div>

          <div className="p-6 border rounded-lg hover:border-[#00C49A] transition-all">
            {/* <Icons.social className="h-12 w-12 text-[#004E89] mb-4" /> */}
            <h3 className="text-xl font-bold mb-2">Social Media Ads</h3>
            <p className="text-gray-600">Attract new customers via Facebook & Instagram</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container py-20 text-center">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-[#00C49A]/20">
          <Badge variant="outline" className="mb-4">Most Popular Plan</Badge>
          <div className="text-5xl font-bold text-[#004E89] mb-4">
            $20<span className="text-xl text-gray-500">/month</span>
          </div>
          <p className="text-gray-600 mb-6">(~2,500 KES via M-Pesa)</p>
          
          <ul className="text-left space-y-4 mb-8 mx-auto max-w-sm">
            <li className="flex items-center gap-2">
              {/* <Icons.check className="h-5 w-5 text-[#00C49A]" /> */}
              Track up to 1,000 customers
            </li>
            <li className="flex items-center gap-2">
              {/* <Icons.check className="h-5 w-5 text-[#00C49A]" /> */}
              Daily sales analytics
            </li>
            <li className="flex items-center gap-2">
              {/* <Icons.check className="h-5 w-5 text-[#00C49A]" /> */}
              100 WhatsApp messages/month
            </li>
            <li className="flex items-center gap-2">
              {/* <Icons.check className="h-5 w-5 text-[#00C49A]" /> */}
              Facebook/Instagram ad tools
            </li>
          </ul>

          <Button size="lg" className="bg-[#FF6B35] hover:bg-[#E55A2B] w-full">
            Start Free Trial - No Credit Card Needed
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      {/* <Testimonials /> */}

      {/* FAQ */}
      <section className="container py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#004E89]">
          Frequently Asked Questions
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border rounded-lg p-6">
            <h3 className="font-bold mb-2">Is my data secure?</h3>
            <p className="text-gray-600">We use enterprise-grade security with Supabase and SSL encryption</p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-bold mb-2">Do you support M-Pesa payments?</h3>
            <p className="text-gray-600">Yes! We accept M-Pesa and all major credit cards</p>
          </div>
        </div>
      </section>
    </div>
  );
}