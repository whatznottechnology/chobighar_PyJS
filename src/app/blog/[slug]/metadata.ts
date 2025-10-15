import { Metadata } from 'next';
import { apiConfig } from '@/config/api';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  author: string;
  published_date: string;
  category_name: string;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || apiConfig.baseUrl;
    const res = await fetch(`${apiUrl}/blog/posts/${slug}/`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching blog post for metadata:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | chobighar',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || apiConfig.baseUrl;
  const featuredImageUrl = post.featured_image 
    ? post.featured_image.startsWith('http') 
      ? post.featured_image 
      : `${apiUrl}${post.featured_image}`
    : null;

  return {
    title: post.meta_title || `${post.title} | chobighar Blog`,
    description: post.meta_description || post.excerpt,
    keywords: post.meta_keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      type: 'article',
      publishedTime: post.published_date,
      authors: [post.author],
      images: featuredImageUrl ? [
        {
          url: featuredImageUrl,
          alt: post.title,
        }
      ] : [],
      siteName: 'chobighar',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: featuredImageUrl ? [featuredImageUrl] : [],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}
