// app/blog/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import { blogData } from '../lib/blogMock';
import MobileNav from '@/components/MobileNav';
import TheFooter from '@/components/ui/TheFooter';
import { Metadata } from 'next';

// SEO-optimized metadata for the blog listing page
export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true
  },
  title: 'Fashion Retail Tips & Business Growth Strategies for Kenya | Zuriscale Blog',
  description: 'Practical fashion retail tips for Kenyan boutique owners. Learn customer retention strategies, sales techniques, and business growth advice from successful fashion retailers reaching KES 1M+ monthly sales.',
  
  // Blog-specific keywords focusing on fashion retail education
  keywords: [
    'fashion retail tips Kenya',
    'boutique business advice Kenya',
    'fashion customer retention strategies',
    'retail sales growth Kenya',
    'fashion business blog Kenya',
    'Kenyan fashion entrepreneur tips',
    'boutique marketing strategies',
    'fashion retail insights Kenya',
    'small business growth Kenya',
    'fashion store management Kenya',
    'retail customer service Kenya',
    'fashion business success stories'
  ],
  
  // Canonical URL for blog listing
  alternates: {
    canonical: 'https://www.zuriscale.com/blog',
  },
  
  // Open Graph for social sharing
  openGraph: {
    title: 'Fashion Retail Tips & Business Growth | Zuriscale Blog',
    description: 'Practical tips and strategies to help Kenyan fashion retailers grow their businesses and increase customer retention. Real advice from successful boutique owners.',
    url: 'https://www.zuriscale.com/blog',
    siteName: 'Zuriscale',
    images: [
      {
        url: '/blog-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zuriscale Fashion Retail Blog - Tips for Kenyan Fashion Entrepreneurs',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  
  // Twitter Card data
  twitter: {
    card: 'summary_large_image',
    title: 'Fashion Retail Tips & Business Growth | Zuriscale Blog',
    description: 'Practical fashion retail advice for Kenyan boutique owners. Learn proven strategies to grow your fashion business.',
    images: ['/blog-twitter-image.jpg'],
    creator: '@zuriscale',
  },
  
  // Additional metadata
  authors: [{ name: 'Zuriscale Team' }],
  category: 'Fashion Retail Education',
};

// Structured data for the blog section
const blogStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": "https://www.zuriscale.com/blog/#blog",
      "url": "https://www.zuriscale.com/blog",
      "name": "Zuriscale Fashion Retail Blog",
      "description": "Practical tips and strategies for Kenyan fashion retailers to grow their businesses and improve customer retention",
      "inLanguage": "en-KE",
      "publisher": {
        "@type": "Organization",
        "name": "Zuriscale",
        "url": "https://www.zuriscale.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://zuriscale.com/logo.png",
          "width": 200,
          "height": 60
        }
      },
      "about": {
        "@type": "Thing",
        "name": "Fashion Retail Business Growth",
        "description": "Strategies and tips for growing fashion retail businesses in Kenya"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Fashion Retailers",
        "geographicArea": {
          "@type": "Country",
          "name": "Kenya"
        }
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.zuriscale.com/blog/#webpage",
      "url": "https://www.zuriscale.com/blog",
      "name": "Fashion Retail Tips & Business Growth Strategies for Kenya",
      "description": "Practical fashion retail tips for Kenyan boutique owners. Learn customer retention strategies and business growth advice.",
      "inLanguage": "en-KE",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Zuriscale",
        "url": "https://www.zuriscale.com"
      },
      "about": {
        "@type": "Thing",
        "name": "Fashion Retail Education"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Small Business Owners",
        "geographicArea": {
          "@type": "Country",
          "name": "Kenya"
        }
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.zuriscale.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://www.zuriscale.com/blog"
        }
      ]
    }
  ]
};

const BlogListingPage = () => {
  const { articles } = blogData;
  const featuredArticle = articles.find(article => article.featured);
  const otherArticles = articles.filter(article => !article.featured);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        <MobileNav />
        
        <main className="pt-20">
          {/* SEO-Optimized Hero Section */}
          <section className="bg-gradient-to-r from-teal-600 to-green-600 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <nav aria-label="Breadcrumb" className="mb-6">
                  <ol className="flex justify-center items-center space-x-2 text-teal-100 text-sm">
                    <li><Link href="/" className="hover:text-white">Home</Link></li>
                    <li aria-hidden="true">›</li>
                    <li aria-current="page" className="text-white">Blog</li>
                  </ol>
                </nav>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Fashion Retail Insights
                </h1>
                <p className="text-xl text-teal-100 mb-8">
                  Practical tips and proven strategies to help Kenyan fashion retailers grow their businesses, 
                  increase customer retention, and reach KES 1M+ in monthly sales.
                </p>
                <div className="flex justify-center items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-300 rounded-full"></span>
                    <span>500+ Fashion Retailers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-300 rounded-full"></span>
                    <span>Weekly Tips</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-300 rounded-full"></span>
                    <span>Kenya Focused</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SEO-Enhanced Featured Article */}
          {featuredArticle && (
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <header className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Featured Article</h2>
                    <p className="text-gray-600">Our most popular fashion retail strategy this month</p>
                  </header>
                  
                  <article className="bg-white rounded-2xl shadow-lg overflow-hidden" itemScope itemType="https://schema.org/BlogPosting">
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        <Image
                          src={featuredArticle.coverImage || '/api/placeholder/600/400'}
                          alt={`${featuredArticle.title} - Fashion retail tip for Kenyan boutique owners`}
                          width={600}
                          height={400}
                          className="w-full h-64 md:h-full object-cover"
                          itemProp="image"
                        />
                      </div>
                      <div className="md:w-1/2 p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                            Featured
                          </span>
                          <div className="flex items-center text-gray-600 text-sm">
                            <Clock size={16} className="mr-1" aria-hidden="true" />
                            <span itemProp="timeRequired">{featuredArticle.readTime} min read</span>
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-800 mb-4" itemProp="headline">
                          {featuredArticle.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-6 line-clamp-3" itemProp="description">
                          {featuredArticle.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3" itemScope itemType="https://schema.org/Person">
                            <Image
                              src={featuredArticle.author.avatar || '/api/placeholder/40/40'}
                              alt={`${featuredArticle.author.name} - Fashion retail expert`}
                              width={40}
                              height={40}
                              className="rounded-full"
                              itemProp="image"
                            />
                            <div>
                              <p className="font-medium text-gray-800" itemProp="name">
                                {featuredArticle.author.name}
                              </p>
                              <time 
                                className="text-sm text-gray-600"
                                itemProp="datePublished"
                                dateTime={featuredArticle.publishedAt}
                              >
                                {new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </time>
                            </div>
                          </div>
                          
                          <Link
                            href={`/blog/${featuredArticle.id}`}
                            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                            aria-label={`Read full article: ${featuredArticle.title}`}
                          >
                            Read More
                            <ArrowRight size={16} aria-hidden="true" />
                          </Link>
                        </div>
                        
                        {/* Hidden structured data */}
                        <div className="sr-only">
                          <span itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                            <span itemProp="name">Zuriscale</span>
                            <span itemProp="url">https://www.zuriscale.com</span>
                          </span>
                          <span itemProp="mainEntityOfPage">https://www.zuriscale.com/blog/{featuredArticle.id}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </section>
          )}

          {/* SEO-Enhanced Articles Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <header className="mb-12 text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Latest Fashion Retail Strategies
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Fresh insights and actionable tips to help your fashion boutique thrive in Kenya's competitive retail market
                  </p>
                </header>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherArticles.map((article, index) => (
                    <article 
                      key={article.id} 
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                      itemScope 
                      itemType="https://schema.org/BlogPosting"
                    >
                      <Image
                        src={article.coverImage || '/api/placeholder/400/250'}
                        alt={`${article.title} - Fashion business tip for Kenyan retailers`}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                        itemProp="image"
                      />
                      
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock size={16} className="text-gray-600" aria-hidden="true" />
                          <span className="text-sm text-gray-600" itemProp="timeRequired">
                            {article.readTime} min read
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2" itemProp="headline">
                          <Link 
                            href={`/blog/${article.id}`}
                            className="hover:text-teal-600 transition-colors"
                            aria-label={`Read: ${article.title}`}
                          >
                            {article.title}
                          </Link>
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3" itemProp="description">
                          {article.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3" itemScope itemType="https://schema.org/Person">
                            <Image
                              src={article.author.avatar || '/api/placeholder/32/32'}
                              alt={`${article.author.name} - Fashion retail expert`}
                              width={32}
                              height={32}
                              className="rounded-full"
                              itemProp="image"
                            />
                            <div>
                              <p className="font-medium text-gray-800 text-sm" itemProp="name">
                                {article.author.name}
                              </p>
                              <time 
                                className="text-xs text-gray-600"
                                itemProp="datePublished"
                                dateTime={article.publishedAt}
                              >
                                {new Date(article.publishedAt).toLocaleDateString()}
                              </time>
                            </div>
                          </div>
                        </div>
                          
                          <Link
                            href={`/blog/${article.id}`}
                            className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center gap-1"
                            aria-label={`Continue reading: ${article.title}`}
                          >
                            Read More
                            <ArrowRight size={14} aria-hidden="true" />
                          </Link>
                        </div>
                        
                        {/* Hidden structured data */}
                        <div className="sr-only">
                          <span itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                            <span itemProp="name">Zuriscale</span>
                            <span itemProp="url">https://www.zuriscale.com</span>
                          </span>
                          <span itemProp="mainEntityOfPage">https://www.zuriscale.com/blog/{article.id}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
          </section>

          {/* SEO-Enhanced Newsletter Section */}
          <section className="py-16 bg-teal-600" role="region" aria-labelledby="newsletter-heading">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h2 id="newsletter-heading" className="text-3xl font-bold text-white mb-4">
                  Never Miss a Fashion Retail Tip
                </h2>
                <p className="text-teal-100 mb-8">
                  Join 500+ successful Kenyan fashion retailers getting weekly insights on customer retention, 
                  sales strategies, and business growth techniques that actually work.
                </p>
                
                <form 
                  className="flex gap-4 max-w-md mx-auto" 
                  aria-label="Subscribe to fashion retail newsletter"
                >
                  <label htmlFor="email-newsletter" className="sr-only">
                    Email address for newsletter subscription
                  </label>
                  <input
                    id="email-newsletter"
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-lg border-none outline-none"
                    required
                    aria-describedby="email-description"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    aria-label="Subscribe to newsletter"
                  >
                    Subscribe
                  </button>
                </form>
                
                <p id="email-description" className="text-sm text-teal-100 mt-4">
                  Free weekly tips • Unsubscribe anytime • Kenya-focused content
                </p>
              </div>
            </div>
          </section>
        </main>

        <TheFooter />
      </div>
    </>
  );
};

export default BlogListingPage;