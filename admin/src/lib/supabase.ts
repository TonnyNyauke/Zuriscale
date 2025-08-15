import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Blog-related types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  featured_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  allow_comments: boolean;
  views: number;
  read_time: number;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

// Blog API functions
export const blogApi = {
  // Get all blog posts
  async getPosts(status?: string) {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as BlogPost[];
  },

  // Get a single blog post
  async getPost(id: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as BlogPost;
  },

  // Create a new blog post
  async createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'views'>) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
      .single();

    if (error) throw error;
    return data as BlogPost;
  },

  // Update a blog post
  async updatePost(id: string, updates: Partial<BlogPost>) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as BlogPost;
  },

  // Delete a blog post
  async deletePost(id: string) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get categories
  async getCategories() {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data as BlogCategory[];
  },

  // Get tags
  async getTags() {
    const { data, error } = await supabase
      .from('blog_tags')
      .select('*')
      .order('name');

    if (error) throw error;
    return data as BlogTag[];
  },

  // Increment view count
  async incrementViews(id: string) {
    const { error } = await supabase
      .from('blog_posts')
      .update({ views: supabase.rpc('increment_views', { post_id: id }) })
      .eq('id', id);

    if (error) throw error;
  }
};
