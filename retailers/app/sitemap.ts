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
  
  // Generate dynamic routes for blog posts
  const dynamicRoutes: MetadataRoute.Sitemap = ids.map((id) => ({
    url: `https://www.zuriscale.com/${id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Static routes
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
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.zuriscale.com/blog',
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://www.zuriscale.com/login',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: 'https://www.zuriscale.com/signup',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  return [...staticRoutes, ...dynamicRoutes]
}