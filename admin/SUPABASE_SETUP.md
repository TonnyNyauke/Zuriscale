# 🚀 Supabase Setup Guide for Blog System

## 📋 Prerequisites
- Supabase account (free tier available)
- Node.js 18+ and npm

## 🔧 Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `your-admin-blog`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. Wait for project setup (2-3 minutes)

## 🗄️ Step 2: Database Schema Setup

### Create the following tables in your Supabase SQL editor:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Blog Posts Table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured_image TEXT,
  seo_title TEXT,
  seo_description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  allow_comments BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0,
  read_time INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Categories Table
CREATE TABLE blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Tags Table
CREATE TABLE blog_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_author ON blog_posts(author);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);

-- Enable Row Level Security on blog tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public read access" ON blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admin full access" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Similar policies for categories and tags
CREATE POLICY "Public read access" ON blog_categories
  FOR SELECT USING (true);

CREATE POLICY "Admin full access" ON blog_categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read access" ON blog_tags
  FOR SELECT USING (true);

CREATE POLICY "Admin full access" ON blog_tags
  FOR ALL USING (auth.role() = 'authenticated');

-- Create function to increment views
CREATE OR REPLACE FUNCTION increment_views(post_id UUID)
RETURNS INTEGER AS $$
BEGIN
  UPDATE blog_posts 
  SET views = views + 1 
  WHERE id = post_id;
  
  RETURN (SELECT views FROM blog_posts WHERE id = post_id);
END;
$$ LANGUAGE plpgsql;
```

## 🔑 Step 3: Get API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL**
   - **Anon public key**

## ⚙️ Step 4: Environment Configuration

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Optional: Database URL for direct connections
DATABASE_URL=your_database_connection_string
```

## 🚀 Step 5: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/admin/blogs` to test the blog management system

3. Try creating a new blog post

## 🔒 Step 6: Authentication Setup (Optional)

For production use, set up authentication:

1. Go to **Authentication** → **Settings** in Supabase
2. Configure your authentication providers
3. Set up email templates
4. Configure redirect URLs

## 📊 Step 7: Real-time Features

Enable real-time subscriptions for live updates:

```typescript
// Subscribe to blog post changes
const subscription = supabase
  .channel('blog_posts')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'blog_posts' }, 
    (payload) => {
      console.log('Change received!', payload);
      // Handle real-time updates
    }
  )
  .subscribe();
```

## 🎯 Key Features Available

- ✅ **Blog CRUD Operations**: Create, read, update, delete posts
- ✅ **Status Management**: Draft, published, archived states
- ✅ **SEO Optimization**: Custom titles and descriptions
- ✅ **Category & Tag System**: Organized content management
- ✅ **View Tracking**: Analytics for post performance
- ✅ **Real-time Updates**: Live content synchronization
- ✅ **Row Level Security**: Secure data access
- ✅ **Performance Optimized**: Indexed queries for speed

## 🆘 Troubleshooting

### Common Issues:

1. **CORS Errors**: Check your Supabase project settings
2. **RLS Policy Issues**: Verify your policies are correctly set
3. **API Key Errors**: Ensure environment variables are loaded
4. **Database Connection**: Check your database password and connection string

### Support:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

## 🚀 Next Steps

After setup, you can:
1. Customize the blog schema for your needs
2. Add more advanced features like comments, reactions
3. Implement search functionality with Postgres full-text search
4. Set up automated backups and monitoring
5. Scale your database as your content grows

---

**Happy Blogging! 🎉**
