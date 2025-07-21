// app/blog/[id]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowLeft, ArrowRight, User, Tag } from 'lucide-react';
import { blogData } from '@/app/lib/blogMock';
import MobileNav from '@/components/MobileNav';
import BlogInteractiveFeatures from '@/components/blogs/BlogInteractiveFeatures';
import TheFooter from '@/components/ui/TheFooter';
import { Metadata } from 'next';

// Fetch article data
function fetchArticle(id: string) {
  const article = blogData.articles.find(article => article.id === id);
  return article || null;
}

// Get related articles
function getRelatedArticles(currentId: string, limit: number = 3) {
  return blogData.articles
    .filter(article => article.id !== currentId)
    .slice(0, limit);
}

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate dynamic metadata for each article
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = fetchArticle(id);

  if (!article) {
    return {
      title: 'Article Not Found | Zuriscale Blog',
      description: 'The requested fashion retail article could not be found.',
      robots: {
        index: false,
        follow: true
      }
    };
  }

  // Create SEO-friendly title that includes main keywords
  const seoTitle = `${article.title} | Fashion Retail Tips Kenya | Zuriscale Blog`;
  
  // Enhanced meta description with target keywords
  const seoDescription = `${article.description} Learn practical fashion retail strategies for Kenyan boutique owners. Expert tips for customer retention and business growth.`;

  return {
    robots: {
      index: true,
      follow: true
    },
    title: seoTitle,
    description: seoDescription,
    
    // Article-specific keywords
    keywords: [
      'fashion retail Kenya',
      'boutique business tips',
      'fashion customer retention',
      'Kenyan fashion retailers',
      'fashion business growth',
      'retail sales strategies Kenya',
      'boutique marketing Kenya',
      'fashion entrepreneur tips',
      'small business Kenya',
      'fashion store management',
      ...article.tags || []
    ],
    
    // Canonical URL for this specific article
    alternates: {
      canonical: `https://www.zuriscale.com/blog/${id}`,
    },
    
    // Open Graph for social sharing
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://www.zuriscale.com/blog/${id}`,
      siteName: 'Zuriscale',
      images: [
        {
          url: article.coverImage || '/blog-default-og.jpg',
          width: 1200,
          height: 630,
          alt: `${article.title} - Fashion retail advice for Kenyan boutique owners`,
        },
      ],
      locale: 'en_KE',
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author?.name || 'Zuriscale Team'],
      tags: article.tags || ['fashion retail', 'business tips', 'Kenya'],
    },
    
    // Twitter Card data
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.coverImage || '/blog-default-twitter.jpg'],
      creator: '@zuriscale',
    },
    
    // Additional metadata
    authors: [{ name: article.author?.name || 'Zuriscale Team' }],
    category: 'Fashion Retail Education',
  };
}

// Generate structured data for the article
function generateArticleStructuredData(article: any, relatedArticles: any[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://www.zuriscale.com/blog/${article.id}/#article`,
        "url": `https://www.zuriscale.com/blog/${article.id}`,
        "headline": article.title,
        "description": article.description,
        "image": {
          "@type": "ImageObject",
          "url": article.coverImage || "https://www.zuriscale.com/blog-default.jpg",
          "width": 800,
          "height": 400
        },
        "author": {
          "@type": "Person",
          "name": article.author?.name || "Zuriscale Team",
          "image": {
            "@type": "ImageObject",
            "url": article.author?.avatar || "https://www.zuriscale.com/default-avatar.jpg"
          }
        },
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
        "datePublished": article.publishedAt,
        "dateModified": article.updatedAt || article.publishedAt,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://www.zuriscale.com/blog/${article.id}`
        },
        "articleSection": "Fashion Retail Business",
        "keywords": article.tags?.join(', ') || "fashion retail, business growth, Kenya",
        "wordCount": article.content ? article.content.replace(/<[^>]*>/g, '').split(' ').length : 1000,
        "timeRequired": `PT${article.readTime || 5}M`,
        "inLanguage": "en-KE",
        "isPartOf": {
          "@type": "Blog",
          "@id": "https://www.zuriscale.com/blog/#blog"
        },
        "about": {
          "@type": "Thing",
          "name": "Fashion Retail Business Growth",
          "description": "Strategies for growing fashion retail businesses in Kenya"
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
        "@id": `https://www.zuriscale.com/blog/${article.id}/#webpage`,
        "url": `https://www.zuriscale.com/blog/${article.id}`,
        "name": article.title,
        "description": article.description,
        "inLanguage": "en-KE",
        "isPartOf": {
          "@type": "WebSite",
          "name": "Zuriscale",
          "url": "https://www.zuriscale.com"
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
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": article.title,
            "item": `https://www.zuriscale.com/blog/${article.id}`
          }
        ]
      },
      // Related articles structured data
      ...(relatedArticles.length > 0 ? [{
        "@type": "ItemList",
        "name": "Related Fashion Retail Articles",
        "description": "More fashion retail tips and strategies for Kenyan boutique owners",
        "itemListElement": relatedArticles.map((relatedArticle, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "BlogPosting",
            "url": `https://www.zuriscale.com/blog/${relatedArticle.id}`,
            "headline": relatedArticle.title,
            "image": relatedArticle.coverImage,
            "datePublished": relatedArticle.publishedAt
          }
        }))
      }] : [])
    ]
  };
}

// Main Page Component
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = fetchArticle(id);
  const relatedArticles = getRelatedArticles(id);

  if (!article) {
    notFound();
  }

  const structuredData = generateArticleStructuredData(article, relatedArticles);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-white">
        <MobileNav />
        
        <main className="pt-20">
          {/* SEO-Enhanced Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-teal-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-400">›</li>
              <li>
                <Link href="/blog" className="hover:text-teal-600 transition-colors">
                  Fashion Retail Blog
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-400">›</li>
              <li aria-current="page" className="text-gray-800 font-medium truncate">
                {article.title}
              </li>
            </ol>
            
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors mt-4"
            >
              <ArrowLeft size={16} />
              Back to Fashion Retail Tips
            </Link>
          </nav>

          {/* SEO-Enhanced Article Header */}
          <article className="max-w-4xl mx-auto px-4 pb-16" itemScope itemType="https://schema.org/BlogPosting">
            <header className="mb-8">
              {/* Cover Image with proper alt text */}
              {article.coverImage && (
                <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={article.coverImage}
                    alt={`${article.title} - Fashion retail strategy for Kenyan boutique owners`}
                    width={800}
                    height={400}
                    className="w-full h-[400px] object-cover"
                    itemProp="image"
                    priority
                  />
                </div>
              )}

              {/* Enhanced Article Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock size={16} aria-hidden="true" />
                  <span className="text-sm" itemProp="timeRequired">
                    {article.readTime} min read
                  </span>
                </div>
                <span className="text-gray-400" aria-hidden="true">•</span>
                <time 
                  className="text-sm" 
                  itemProp="datePublished"
                  dateTime={article.publishedAt}
                >
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                {article.author && (
                  <>
                    <span className="text-gray-400" aria-hidden="true">•</span>
                    <div className="flex items-center gap-2" itemScope itemType="https://schema.org/Person">
                      <User size={16} aria-hidden="true" />
                      <span className="text-sm" itemProp="name">
                        {article.author.name}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* SEO-Optimized Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight" itemProp="headline">
                {article.title}
              </h1>

              {/* Enhanced Description */}
              {article.description && (
                <div className="text-xl text-gray-600 mb-8 leading-relaxed" itemProp="description">
                  <p>{article.description}</p>
                  <p className="text-lg text-gray-500 mt-4">
                    Learn practical strategies to grow your fashion retail business in Kenya and increase customer retention.
                  </p>
                </div>
              )}

              {/* Enhanced Tags with semantic markup */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8" role="list" aria-label="Article topics">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium"
                      role="listitem"
                      itemProp="keywords"
                    >
                      <Tag size={12} aria-hidden="true" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Enhanced Article Content */}
            <div className="prose prose-lg max-w-none" itemProp="articleBody">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
              
              {/* Add contextual CTA within content */}
              <div className="my-8 p-6 bg-teal-50 rounded-lg border-l-4 border-teal-500">
                <h3 className="text-xl font-semibold text-teal-800 mb-2">
                  Ready to implement these strategies?
                </h3>
                <p className="text-teal-700 mb-4">
                  Join 500+ successful Kenyan fashion retailers using Zuriscale to automate customer follow-ups and increase repeat purchases.
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Try Zuriscale Free
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Hidden structured data elements */}
            <div className="sr-only">
              <span itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                <span itemProp="name">Zuriscale</span>
                <span itemProp="url">https://www.zuriscale.com</span>
              </span>
              <span itemProp="mainEntityOfPage">https://www.zuriscale.com/blog/{id}</span>
              <span itemProp="inLanguage">en-KE</span>
              <span itemProp="articleSection">Fashion Retail Business</span>
            </div>

            {/* Enhanced Interactive Features */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <BlogInteractiveFeatures article={article} readingTime={article.readTime || 0} />
            </div>
          </article>

          {/* Enhanced Related Articles with better SEO */}
          {relatedArticles.length > 0 && (
            <section className="bg-slate-50 py-16" aria-labelledby="related-articles-heading">
              <div className="max-w-6xl mx-auto px-4">
                <header className="text-center mb-12">
                  <h2 id="related-articles-heading" className="text-3xl font-bold text-gray-900 mb-4">
                    More Fashion Retail Strategies
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Continue learning with these hand-picked articles to help your Kenyan boutique thrive
                  </p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Related fashion retail articles">
                  {relatedArticles.map((relatedArticle) => (
                    <article 
                      key={relatedArticle.id}
                      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                      role="listitem"
                      itemScope 
                      itemType="https://schema.org/BlogPosting"
                    >
                      <Link href={`/blog/${relatedArticle.id}`} aria-label={`Read: ${relatedArticle.title}`}>
                        {relatedArticle.coverImage && (
                          <div className="aspect-video overflow-hidden">
                            <Image
                              src={relatedArticle.coverImage}
                              alt={`${relatedArticle.title} - Fashion business tip`}
                              width={400}
                              height={250}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              itemProp="image"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2" itemProp="headline">
                            {relatedArticle.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-3" itemProp="description">
                            {relatedArticle.description}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span className="flex items-center gap-1" itemProp="timeRequired">
                              <Clock size={14} aria-hidden="true" />
                              {relatedArticle.readTime} min read
                            </span>
                            <span className="inline-flex items-center gap-1 text-teal-600 group-hover:gap-2 transition-all">
                              Read more
                              <ArrowRight size={14} />
                            </span>
                          </div>
                          
                          {/* Hidden structured data */}
                          <div className="sr-only">
                            <time itemProp="datePublished" dateTime={relatedArticle.publishedAt}>
                              {relatedArticle.publishedAt}
                            </time>
                            <span itemProp="author">{relatedArticle.author?.name}</span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Enhanced Newsletter CTA */}
          <section className="bg-teal-600 py-16" role="region" aria-labelledby="newsletter-cta-heading">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 id="newsletter-cta-heading" className="text-3xl font-bold text-white mb-4">
                Get Weekly Fashion Retail Tips
              </h2>
              <p className="text-teal-100 mb-8 text-lg">
                Join successful Kenyan fashion retailers getting actionable business growth strategies delivered weekly
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" aria-label="Subscribe to newsletter">
                <label htmlFor="article-newsletter-email" className="sr-only">
                  Email address for newsletter
                </label>
                <input
                  id="article-newsletter-email"
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-teal-500 bg-white/10 text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-transparent"
                  required
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Get Free Tips
                </button>
              </form>
              <p className="text-sm text-teal-100 mt-4">
                500+ fashion retailers subscribed • Unsubscribe anytime
              </p>
            </div>
          </section>
        </main>

        <TheFooter />
      </div>
    </>
  );
}