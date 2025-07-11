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

// Main Page Component
export default async function ArticlePage({ params }: ArticlePageProps ) {
  const {id} = await params;
  const article = fetchArticle(id);
  const relatedArticles = getRelatedArticles(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <MobileNav />
      
      <main className="pt-20">
        {/* Back to Blog */}
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 pb-16">
          <header className="mb-8">
            {/* Cover Image */}
            {article.coverImage && (
              <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  width={800}
                  height={400}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            )}

            {/* Article Meta */}
            <div className="flex items-center gap-4 mb-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span className="text-sm">{article.readTime} min read</span>
              </div>
              <span className="text-gray-400">•</span>
              <time className="text-sm">
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {article.author && (
                <>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span className="text-sm">{article.author.name}</span>
                  </div>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.description && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {article.description}
              </p>
            )}

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Interactive Features */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <BlogInteractiveFeatures article={article} readingTime={0} />
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-slate-50 py-16">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Related Articles
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Discover more insights and stories from our blog
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/blog/${relatedArticle.id}`}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    {relatedArticle.coverImage && (
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={relatedArticle.coverImage}
                          alt={relatedArticle.title}
                          width={400}
                          height={250}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {relatedArticle.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {relatedArticle.readTime} min read
                        </span>
                        <span className="inline-flex items-center gap-1 text-teal-600 group-hover:gap-2 transition-all">
                          Read more
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="bg-teal-600 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with Our Latest Articles
            </h2>
            <p className="text-teal-100 mb-8 text-lg">
              Get the latest insights and stories delivered directly to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-teal-500 bg-white/10 text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <TheFooter />
    </div>
  );
}