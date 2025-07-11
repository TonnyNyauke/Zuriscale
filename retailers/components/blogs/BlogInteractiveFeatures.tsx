// components/BlogInteractiveFeatures.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Reading progress bar component
interface ReadingProgressProps {
  target: React.RefObject<HTMLElement | null>;
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({ target }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!target.current) return;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [target]);

  return (
    <div className="fixed bottom-0 left-0 w-full h-2 bg-gray-200 z-50">
      <div className="h-full bg-teal-600 transition-all duration-300" style={{ width: `${progress}%` }} />
    </div>
  );
};

// Scroll-to-top button
const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-4 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300"
    >
      <ChevronUp size={24} />
    </Button>
  );
};

// Social sharing component
const SocialShare: React.FC<{ title: string; url: string }> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : url;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link');
    }
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`Check out this article: ${title}`);
    const whatsappUrl = `https://wa.me/?text=${text}%20${encodeURIComponent(shareUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(title);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600">Share:</span>
      <div className="flex items-center gap-2">
        <Button
          onClick={shareOnWhatsApp}
          variant="outline"
          size="sm"
          className="text-green-600 hover:bg-green-50"
        >
          WhatsApp
        </Button>
        <Button
          onClick={shareOnTwitter}
          variant="outline"
          size="sm"
          className="text-blue-600 hover:bg-blue-50"
        >
          Twitter
        </Button>
        <Button
          onClick={handleCopyLink}
          variant="outline"
          size="sm"
          className="text-gray-600 hover:bg-gray-50"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
      </div>
    </div>
  );
};

// Newsletter signup component
const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
    setEmail('');
  };

  return (
    <div className="bg-gradient-to-r from-teal-50 to-green-50 p-6 rounded-lg border border-teal-100">
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-xl font-bold text-teal-800 mb-2">
          Get More Fashion Retail Tips
        </h3>
        <p className="text-gray-600 mb-4">
          Join 500+ Kenyan fashion retailers getting weekly insights on customer retention and business growth.
        </p>
        {subscribed ? (
          <div className="text-green-600 font-medium">
            Thank you for subscribing! Check your email for confirmation.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

// Combined interactive features
interface BlogInteractiveFeaturesProps {
  article: {
    title: string;
    content: string;
    id: string;
  };
  readingTime: number;
}

const BlogInteractiveFeatures: React.FC<BlogInteractiveFeaturesProps> = ({article}) => {
  const articleRef = useRef<HTMLDivElement>(null);
  const readingTime = Math.ceil(article.content.split(/\s+/).length /200) //Calculate reading time

  return (
    <>
      <ReadingProgress target={articleRef} />
      <div ref={articleRef} className="hidden">
        {readingTime} min read
      </div>
      <ScrollToTop />
      <div className="mt-8 space-y-6">
        <SocialShare title={article.title} url={`/blog/${article.id}`} />
        <NewsletterSignup />
      </div>
    </>
  );
};

export default BlogInteractiveFeatures;