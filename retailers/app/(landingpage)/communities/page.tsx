import type { Metadata } from 'next';
import { Facebook, Instagram, Linkedin, MessageCircle, Users, Zap, TrendingUp, Heart, ArrowRight, ArrowLeft, Star, CheckCircle, Calendar, Award, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true
  },
  title: 'Join Our Fashion Retail Community | Zuriscale - Network & Grow Together',
  description: 'Connect with 500+ fashion retailers across Kenya and beyond. Join our vibrant communities for customer retention tips, business networking, success stories, and exclusive growth strategies. Free to join, valuable insights daily.',
  keywords: 'fashion retail community Kenya, customer retention network, Kenya fashion retailers, retail networking, fashion business community, customer engagement, boutique owner community, retail success stories',
  openGraph: {
    title: 'Join Our Fashion Retail Community | Zuriscale',
    description: 'Connect with 500+ fashion retailers across Kenya and beyond. Network, learn, and grow together with exclusive insights and support.',
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
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join Our Fashion Retail Community | Zuriscale',
    description: 'Connect with 500+ fashion retailers across Kenya and beyond. Network, learn, and grow together.',
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
    url: 'https://web.facebook.com/profile.php?id=61578723004156',
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    description: 'Get the latest product updates, company news, and industry insights directly from Zuriscale. Stay informed about new features, success stories, and market trends affecting Kenyan fashion retail.',
    benefits: [
      'Weekly product announcements and feature releases',
      'Company updates, milestones, and team insights',
      'Customer success stories and detailed case studies',
      'Market trends and retail industry analysis for Kenya',
      'Live Q&A sessions with our product team',
      'Early access to beta features and testing opportunities'
    ],
    audience: 'Stay updated with official Zuriscale news',
    cta: 'Follow Our Page',
    memberCount: '1,200+',
    activityLevel: 'Daily posts'
  },
  {
    name: 'Facebook Community Group',
    icon: Users,
    url: 'https://web.facebook.com/groups/zuriscale',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    description: 'Join our exclusive private community of fashion retailers sharing strategies, tips, and supporting each other. This is where real business growth happens through peer collaboration and expert guidance.',
    benefits: [
      'Peer-to-peer networking and business collaboration opportunities',
      'Share proven customer retention strategies and tactics',
      'Ask questions and get expert advice from successful retailers',
      'Weekly discussion topics, challenges, and growth experiments',
      'Access to exclusive resources, templates, and guides',
      'Monthly virtual meetups and networking events'
    ],
    audience: 'Connect with fellow fashion retailers',
    cta: 'Join Our Group',
    memberCount: '800+',
    activityLevel: '50+ posts weekly'
  },
  {
    name: 'LinkedIn Business Network',
    icon: Linkedin,
    url: 'https://www.linkedin.com/company/zuriscale',
    color: 'bg-blue-700',
    hoverColor: 'hover:bg-blue-800',
    description: 'Professional networking hub for fashion industry leaders and business owners across Kenya and beyond. Connect with decision-makers, industry experts, and potential business partners.',
    benefits: [
      'Professional development content and leadership insights',
      'Industry analysis and market research reports',
      'Business networking opportunities with key industry players',
      'Career advancement and partnership announcements',
      'Thought leadership articles on retail innovation',
      'Access to exclusive industry events and conferences'
    ],
    audience: 'Network with industry professionals',
    cta: 'Connect With Us',
    memberCount: '2,500+',
    activityLevel: '3-5 posts weekly'
  },
  {
    name: 'Instagram Visual Community',
    icon: Instagram,
    url: 'https://www.instagram.com/zuriscale/',
    color: 'bg-gradient-to-br from-purple-600 to-pink-600',
    hoverColor: 'hover:from-purple-700 hover:to-pink-700',
    description: 'Behind-the-scenes content, customer spotlights, and visual inspiration for fashion retailers. Get inspired by real success stories and discover new trends in retail customer engagement.',
    benefits: [
      'Visual inspiration, trends, and styling ideas for your business',
      'Customer spotlight features showcasing member successes',
      'Behind-the-scenes content from our team and community',
      'Quick tips, infographics, and actionable business advice',
      'Live stories featuring member businesses and achievements',
      'Fashion trends and seasonal retail strategies'
    ],
    audience: 'Get inspired with visual content',
    cta: 'Follow Us',
    memberCount: '3,000+',
    activityLevel: 'Daily stories & posts'
  }
];

const communityStats = [
  { label: 'Active Members', value: '500+', icon: Users, description: 'Fashion retailers actively growing their businesses' },
  { label: 'Monthly Discussions', value: '150+', icon: MessageCircle, description: 'Conversations about strategies and tips' },
  { label: 'Success Stories', value: '50+', icon: TrendingUp, description: 'Documented business growth achievements' },
  { label: 'Countries Reached', value: '5+', icon: Zap, description: 'Expanding across East Africa and beyond' }
];

const successStories = [
  {
    name: "Sarah Wanjiku",
    location: "Nairobi",
    business: "Elegant Styles Boutique",
    growth: "180% increase in repeat customers",
    quote: "The community taught me WhatsApp automation strategies that tripled my customer retention. I went from 15% to 45% repeat customers in 3 months.",
    timeframe: "3 months"
  },
  {
    name: "Grace Mumbua",
    location: "Mombasa", 
    business: "Coast Fashion Hub",
    growth: "KES 150,000 monthly revenue increase",
    quote: "Learning from other successful retailers in the group helped me identify gaps in my customer journey. Now my customers come back regularly.",
    timeframe: "5 months"
  },
  {
    name: "Faith Njeri",
    location: "Kisumu",
    business: "Western Trends",
    growth: "300+ new WhatsApp subscribers",
    quote: "The community's guidance on customer segmentation helped me send personalized messages that actually convert. My engagement rates doubled.",
    timeframe: "4 months"
  }
];

const monthlyHighlights = [
  {
    month: "November 2024",
    theme: "Holiday Season Customer Retention",
    activities: [
      "Live workshop: 'Maximizing December Sales Through Customer Retention'",
      "Template sharing: Holiday promotional message templates",
      "Success story spotlight: 5 retailers who doubled their December revenue",
      "Community challenge: '12 Days of Customer Engagement'"
    ]
  },
  {
    month: "October 2024",
    theme: "Customer Data & Analytics Mastery",
    activities: [
      "Deep dive session: 'Understanding Your Customer Purchase Patterns'",
      "Tool showcase: Advanced analytics features walkthrough",
      "Member presentation: 'How I Use Data to Predict Customer Behavior'",
      "Resource drop: Customer segmentation spreadsheet templates"
    ]
  }
];

const communityGuidelines = [
  {
    title: "Be Supportive & Collaborative",
    description: "Share your experiences, challenges, and successes openly. Help fellow members by answering questions and offering constructive feedback."
  },
  {
    title: "Focus on Value-Driven Content",
    description: "Share actionable insights, proven strategies, and real results. Avoid promotional content unless it provides genuine value to the community."
  },
  {
    title: "Respect Privacy & Confidentiality",
    description: "Don't share customer data or sensitive business information. Keep discussions professional and respect others' privacy."
  },
  {
    title: "Stay On-Topic & Professional",
    description: "Keep discussions focused on fashion retail, customer retention, and business growth. Maintain a professional and respectful tone."
  }
];

// Structured data for communities page
const communitiesStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://zuriscale.com/communities#webpage",
  "url": "https://zuriscale.com/communities",
  "name": "Join Our Communities - Zuriscale",
  "description": "Connect with fashion retailers across Kenya and beyond in our vibrant online communities",
  "inLanguage": "en-KE",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://zuriscale.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Communities",
        "item": "https://zuriscale.com/communities"
      }
    ]
  },
  "about": {
    "@type": "Organization",
    "name": "Zuriscale Fashion Retail Communities",
    "description": "Network of fashion retailers focused on customer retention and business growth"
  }
};

export default function CommunitiesPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(communitiesStructuredData)
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
        {/* ADDED: Navigation breadcrumb */}
        <nav className="bg-white border-b border-gray-200 px-4 py-3" aria-label="Breadcrumb">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className="flex items-center text-teal-600 hover:text-teal-700 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Communities</span>
            </div>
          </div>
        </nav>

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
                Join hundreds of fashion retailers across Kenya and beyond who are transforming their customer retention strategies. 
                Connect with peers, share insights, stay ahead of industry trends, and build lasting business relationships that drive real growth.
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
                    <div className="text-xs text-gray-500 mt-1">{stat.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ADDED: Why Join Our Community Section */}
        <section className="pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                Why Join Our Fashion Retail Community?
              </h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Being a boutique owner in Kenya comes with unique challenges. From seasonal trends to customer retention, inventory management to digital marketing - you&apos;re juggling it all. That&apos;s exactly why our community exists.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Peer Learning & Support</h3>
                  <p className="text-gray-600">
                    Learn from retailers who&apos;ve solved the same problems you&apos;re facing. Get practical advice from people who understand the Kenyan market, customer behavior, and local business challenges.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Proven Growth Strategies</h3>
                  <p className="text-gray-600">
                    Access tested strategies that have helped our members increase their repeat customer rates from 20% to 50%+. No theory - just proven tactics that work in the Kenyan fashion market.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Accountability & Motivation</h3>
                  <p className="text-gray-600">
                    Stay motivated with like-minded business owners who celebrate your wins and support you through challenges. Set goals together and achieve them faster through community accountability.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">The Reality Check</h3>
                <p className="text-gray-700">
                  <strong>80% of fashion retailers lose customers after the first purchase.</strong> Our community members have flipped this statistic - they retain 40-60% of their customers through proven retention strategies shared and refined within our groups.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ADDED: Success Stories Section */}
        <section className="pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Real Success Stories from Our Community
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              These aren&apos;t just testimonials - they&apos;re real results from fashion retailers who transformed their businesses by implementing strategies learned in our community.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {successStories.map((story, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {story.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">{story.name}</h3>
                      <p className="text-sm text-gray-600">{story.business}, {story.location}</p>
                    </div>
                  </div>
                  
                  <div className="bg-teal-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 text-teal-600 mr-2" />
                      <span className="text-sm font-medium text-teal-800">{story.growth}</span>
                    </div>
                    <div className="text-xs text-teal-600 mt-1">Achieved in {story.timeframe}</div>
                  </div>
                  
                  <blockquote className="text-gray-700 italic">
                    &quot;{story.quote}&quot;
                  </blockquote>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 mr-2" />
                Join 50+ other success stories in our community
              </div>
            </div>
          </div>
        </section>

        {/* Communities Grid */}
        <section className="pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Choose Your Community Platform
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              We&apos;re active across multiple platforms to meet you where you are. Each community has its own unique value and engagement style.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {communityData.map((community, index) => (
                <article
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
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
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">{community.memberCount}</div>
                        <div className="text-xs text-gray-500">{community.activityLevel}</div>
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
                            <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
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

        {/*Monthly Community Highlights */}
        <section className="pb-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Monthly Community Highlights
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every month, we organize themed discussions, workshops, and challenges to help our community members grow their businesses together.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {monthlyHighlights.map((highlight, index) => (
                <div key={index} className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-teal-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{highlight.month}</h3>
                      <p className="text-sm text-gray-600">{highlight.theme}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {highlight.activities.map((activity, activityIndex) => (
                      <li key={activityIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                New themes and activities every month - never run out of learning opportunities
              </div>
            </div>
          </div>
        </section>

        {/*Getting Started Guide */}
        <section className="pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                How to Get the Most from Our Community
              </h2>
              <p className="text-lg text-gray-600 text-center mb-12">
                Joining is just the first step. Here&apos;s how to maximize your community experience and accelerate your business growth.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Your First Week:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-bold text-teal-600">1</span>
                      </div>
                      <span className="text-gray-700">Introduce yourself in the welcome thread with your business name, location, and biggest customer retention challenge</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-bold text-teal-600">2</span>
                      </div>
                      <span className="text-gray-700">Browse recent discussions and comment with your experiences or questions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-bold text-teal-600">3</span>
                      </div>
                      <span className="text-gray-700">Turn on notifications for the group to stay updated on valuable discussions</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Ongoing Engagement:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-bold text-blue-600">4</span>
                      </div>
                      <span className="text-gray-700">Share your wins and challenges - the community thrives on authentic experiences</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-bold text-blue-600">5</span>
                      </div>
                      <span className="text-gray-700">Participate in monthly challenges and themed discussions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-bold text-blue-600">6</span>
                      </div>
                      <span className="text-gray-700">Help other members by sharing your expertise and successful strategies</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">💡 Pro Tip for Maximum Value:</h4>
                <p className="text-gray-700">
                  The most successful community members are those who actively share their experiences - both successes and failures. 
                  Don&apos;t wait until you&apos;re &qupt;successful enough&qupt; to contribute. Your current challenges are exactly what someone else needs to hear about.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ADDED: Community Guidelines */}
        <section className="pb-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Community Guidelines & Values
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Our community thrives because we maintain high standards of engagement and mutual respect. Here&apos;s what we expect from all members.
            </p>
            
            <div className="grid gap-6">
              {communityGuidelines.map((guideline, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{guideline.title}</h3>
                  <p className="text-gray-700">{guideline.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                <Heart className="w-4 h-4 mr-2" />
                Together, we build a supportive environment where every retailer can thrive
              </div>
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
              Don&apos;t miss out on valuable insights, networking opportunities, and the latest trends in fashion retail customer retention. Your business growth journey starts with the right community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-white text-teal-700 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-all duration-300"
              >
                <Link href="https://web.facebook.com/groups/zuriscale" target="_blank" rel="noopener noreferrer">
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
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/blog" className="text-teal-100 hover:text-white text-sm underline">
                Read Success Stories
              </Link>
              <span className="text-teal-300">•</span>
              <Link href="/" className="text-teal-100 hover:text-white text-sm underline">
                Learn About Zuriscale
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}