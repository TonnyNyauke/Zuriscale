// app/sitemap.ts
import { MetadataRoute } from 'next'
import { blogData } from './lib/blogMock'

// Import your blog mock data

async function fetchAllIds(): Promise<string[]> {
  // Get all blog post IDs from your mock data
  return blogData.articles.map(article => article.id)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all your dynamic IDs
  const ids = await fetchAllIds()

  // Get current date for lastModified
  const currentDate = new Date()
  
  // Generate proper dynamic routes for blog posts with /blog/ prefix
  const dynamicRoutes: MetadataRoute.Sitemap = ids.map((id) => ({
    url: `https://www.zuriscale.com/blog/${id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Static routes with improved priorities and change frequencies
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: 'https://www.zuriscale.com',
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://www.zuriscale.com/communities',
      lastModified: currentDate,
      changeFrequency: 'weekly', // More frequent updates due to community activity
      priority: 0.9, // High priority for community engagement
    },
    {
      url: 'https://www.zuriscale.com/blog',
      lastModified: currentDate,
      changeFrequency: 'daily', // Blog index updates frequently
      priority: 0.9,
    },
    {
      url: 'https://www.zuriscale.com/signup',
      lastModified: currentDate,
      changeFrequency: 'monthly', // Signup page is relatively static
      priority: 0.8, // Signup is important for conversions
    },
    {
      url: 'https://www.zuriscale.com/login',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3, // Login pages typically have lower SEO value
    },
    
    {
      url: 'https://www.zuriscale.com/pricing',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.zuriscale.com/contact',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Combine routes with static routes first for better crawling
  return [...staticRoutes, ...dynamicRoutes]
}

// ADDED: Optional function to validate sitemap URLs
export function validateSitemapUrls(urls: string[]): boolean {
  const validUrlPattern = /^https:\/\/www\.zuriscale\.com(\/[a-zA-Z0-9\-\/]*)?$/
  
  return urls.every(url => validUrlPattern.test(url))
}