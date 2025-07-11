// app/blog/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import { blogData } from '../lib/blogMock';
import MobileNav from '@/components/MobileNav';
import TheFooter from '@/components/ui/TheFooter';


const BlogListingPage = () => {
  const { articles } = blogData;
  const featuredArticle = articles.find(article => article.featured);
  const otherArticles = articles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileNav />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-600 to-green-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Fashion Retail Insights
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Practical tips and strategies to help Kenyan fashion retailers grow their businesses and keep customers coming back.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <Image
                        src={featuredArticle.coverImage || '/api/placeholder/600/400'}
                        alt={featuredArticle.title}
                        width={600}
                        height={400}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Clock size={16} className="mr-1" />
                          {featuredArticle.readTime} min read
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {featuredArticle.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image
                            src={featuredArticle.author.avatar || '/api/placeholder/40/40'}
                            alt={featuredArticle.author.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{featuredArticle.author.name}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <Link
                          href={`/blog/${featuredArticle.id}`}
                          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          Read More
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Other Articles */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
                Latest Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherArticles.map((article) => (
                  <div key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <Image
                      src={article.coverImage || '/api/placeholder/400/250'}
                      alt={article.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock size={16} className="text-gray-600" />
                        <span className="text-sm text-gray-600">{article.readTime} min read</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image
                            src={article.author.avatar || '/api/placeholder/32/32'}
                            alt={article.author.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div>
                            <p className="font-medium text-gray-800 text-sm">{article.author.name}</p>
                            <p className="text-xs text-gray-600">
                              {new Date(article.publishedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Link
                          href={`/blog/${article.id}`}
                          className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center gap-1"
                        >
                          Read More
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-teal-600">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Never Miss a Fashion Retail Tip
              </h2>
              <p className="text-teal-100 mb-8">
                Join 500+ Kenyan fashion retailers getting weekly insights on customer retention and business growth.
              </p>
              <form className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-none outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <TheFooter />
    </div>
  );
};

export default BlogListingPage;