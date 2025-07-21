// app/robots.ts
import { MetadataRoute } from 'next'
import { blogData } from './lib/blogMock'

export default function robots(): MetadataRoute.Robots {
  // Get all blog post IDs
  const blogIds = blogData.articles.map(article => `/${article.id}`)
  
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/communities',
        '/blog', 
        '/login',
        '/signup',
        ...blogIds
      ],
      disallow: ['/api/', '/admin/']
    },
    sitemap: 'https://www.zuriscale.com/sitemap.xml',
  }
}