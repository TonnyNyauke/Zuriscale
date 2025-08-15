import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

// Mock data - replace with actual API calls
const mockBlogs = [
  {
    id: 1,
    title: "Getting Started with Next.js 15",
    excerpt: "Learn the fundamentals of Next.js 15 and build your first application...",
    author: "John Doe",
    status: "published",
    category: "Development",
    publishedAt: "2024-01-15",
    views: 1247,
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    excerpt: "Discover advanced TypeScript patterns that will make your code more maintainable...",
    author: "Jane Smith",
    status: "draft",
    category: "Programming",
    publishedAt: null,
    views: 0,
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "Building Scalable APIs with Node.js",
    excerpt: "Learn how to design and implement scalable REST APIs using Node.js...",
    author: "Mike Johnson",
    status: "published",
    category: "Backend",
    publishedAt: "2024-01-10",
    views: 892,
    readTime: "12 min read"
  }
];

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBlogs = mockBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default" className="bg-green-100 text-green-800">Published</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'archived':
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Blog Management</h1>
          <p className="text-gray-600">Create, edit, and manage your blog content</p>
        </div>
        <Link href="/admin/blogs/create">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Create New Post
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search blogs by title or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Filter by status"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
              <Button variant="outline">
                <FunnelIcon className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blog List */}
      <div className="space-y-4">
        {filteredBlogs.map((blog) => (
          <Card key={blog.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">{blog.title}</h3>
                    {getStatusBadge(blog.status)}
                  </div>
                  <p className="text-gray-600 line-clamp-2">{blog.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>By {blog.author}</span>
                    <span>•</span>
                    <span>{blog.category}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                    {blog.publishedAt && (
                      <>
                        <span>•</span>
                        <span>Published {new Date(blog.publishedAt).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>👁️ {blog.views} views</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Link href={`/admin/blogs/${blog.id}`}>
                    <Button variant="outline" size="sm">
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/blogs/${blog.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredBlogs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No blogs found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters.'
                : 'Get started by creating your first blog post.'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <div className="mt-6">
                <Link href="/admin/blogs/create">
                  <Button>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create New Post
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
