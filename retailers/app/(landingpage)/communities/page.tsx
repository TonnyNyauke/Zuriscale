import type { Metadata } from 'next';
import { Facebook, Instagram, Linkedin, MessageCircle, Users, Zap, TrendingUp, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Join Our Communities | Zuriscale - Fashion Retail Customer Retention Network',
  description: 'Connect with fashion retailers across Kenya and beyond. Join our vibrant communities on Facebook, Instagram, LinkedIn for customer retention tips, networking, and product updates.',
  keywords: 'fashion retail community, customer retention network, Kenya fashion retailers, retail networking, fashion business community, customer engagement',
  openGraph: {
    title: 'Join Our Communities | Zuriscale',
    description: 'Connect with fashion retailers across Kenya and beyond. Network, learn, and grow together.',
    url: 'https://zuriscale.com/communities',
    siteName: 'Zuriscale',
    images: [
      {
        url: '/og-communities.jpg',
        width: 1200,
        height: 630,
        alt: 'Zuriscale Communities - Fashion Retail Network',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join Our Communities | Zuriscale',
    description: 'Connect with fashion retailers across Kenya and beyond. Network, learn, and grow together.',
    images: ['/og-communities.jpg'],
  },
  alternates: {
    canonical: 'https://zuriscale.com/communities',
  },
};

const communityData = [
  {
    name: 'Facebook Business Page',
    icon: Facebook,
    url: 'https://web.facebook.com/profile.php?id=61569977734315',
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    description: 'Get the latest product updates, company news, and industry insights directly from Zuriscale.',
    benefits: [
      'Product announcements and feature releases',
      'Company updates and milestones',
      'Customer success stories and case studies',
      'Industry trends and market insights'
    ],
    audience: 'Stay updated with official Zuriscale news',
    cta: 'Follow Our Page'
  },
  {
    name: 'Facebook Community Group',
    icon: Users,
    url: 'https://web.facebook.com/groups/748242847561563',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    description: 'Join our exclusive community of fashion retailers sharing strategies, tips, and supporting each other.',
    benefits: [
      'Peer-to-peer networking and collaboration',
      'Share customer retention strategies',
      'Ask questions and get expert advice',
      'Weekly discussion topics and challenges'
    ],
    audience: 'Connect with fellow fashion retailers',
    cta: 'Join Our Group'
  },
  {
    name: 'LinkedIn Business Network',
    icon: Linkedin,
    url: 'https://www.linkedin.com/company/zuriscale',
    color: 'bg-blue-700',
    hoverColor: 'hover:bg-blue-800',
    description: 'Professional networking hub for fashion industry leaders and business owners across Kenya and beyond.',
    benefits: [
      'Professional development content',
      'Industry leadership insights',
      'Business networking opportunities',
      'Career and partnership announcements'
    ],
    audience: 'Network with industry professionals',
    cta: 'Connect With Us'
  },
  {
    name: 'Instagram Visual Community',
    icon: Instagram,
    url: 'https://www.instagram.com/zuriscale/',
    color: 'bg-gradient-to-br from-purple-600 to-pink-600',
    hoverColor: 'hover:from-purple-700 hover:to-pink-700',
    description: 'Behind-the-scenes content, customer spotlights, and visual inspiration for fashion retailers.',
    benefits: [
      'Visual inspiration and trends',
      'Customer spotlight features',
      'Behind-the-scenes content',
      'Quick tips and infographics'
    ],
    audience: 'Get inspired with visual content',
    cta: 'Follow Us'
  }
];

const communityStats = [
  { label: 'Active Members', value: '500+', icon: Users },
  { label: 'Monthly Discussions', value: '150+', icon: MessageCircle },
  { label: 'Success Stories', value: '50+', icon: TrendingUp },
  { label: 'Countries Reached', value: '5+', icon: Zap }
];

export default function CommunitiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4 mr-2" />
              Join Our Growing Community
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connect, Learn, and{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-700">
                Grow Together
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join thousands of fashion retailers across Kenya and beyond who are transforming their customer retention strategies. 
              Connect with peers, share insights, and stay ahead of industry trends.
            </p>
            
            {/* Community Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {communityStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-lg mb-3">
                    <stat.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Communities Grid */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {communityData.map((community, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 ${community.color} rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <community.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">
                        {community.name}
                      </h2>
                      <p className="text-sm text-gray-600">{community.audience}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {community.description}
                  </p>
                  
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                      What You&apos;ll Get:
                    </h3>
                    <ul className="space-y-2">
                      {community.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button
                    asChild
                    className={`w-full ${community.color} ${community.hoverColor} text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 group-hover:transform group-hover:scale-[1.02]`}
                  >
                    <Link 
                      href={community.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2"
                    >
                      <span>{community.cta}</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Don&apos;t miss out on valuable insights, networking opportunities, and the latest trends in fashion retail customer retention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              className="bg-white text-teal-700 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-all duration-300"
            >
              <Link href="https://web.facebook.com/groups/748242847561563" target="_blank" rel="noopener noreferrer">
                Join Facebook Group
              </Link>
            </Button>
            <Button 
              asChild
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-700 font-medium py-3 px-8 rounded-lg transition-all duration-300"
            >
              <Link href="/signup">
                Start Your Free Trial
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}