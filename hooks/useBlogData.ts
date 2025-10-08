import { useState, useEffect } from 'react';
import { getApiUrl, API_ENDPOINTS } from '@/config/api';

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  display_order: number;
  is_active: boolean;
  posts_count: number;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category_name: string;
  category_slug: string;
  author: string;
  excerpt: string;
  content?: string;
  thumbnail: string | null;
  featured_image?: string | null;
  featured_image_alt?: string;
  status: string;
  published_date: string;
  views_count: number;
  reading_time: number;
  is_featured: boolean;
  tags_list: string[];
  meta_title: string;
  meta_description: string;
  meta_keywords?: string;
  og_image?: string | null;
  created_at: string;
  related_posts?: BlogPost[];
}

export interface PopupSettings {
  id: number;
  is_active: boolean;
  popup_image: string;
  popup_title: string;
  popup_subtitle: string;
  show_delay: number;
  cookie_duration_days: number;
}

export const useBlogCategories = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl(API_ENDPOINTS.BLOG_CATEGORIES));
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          setError('Failed to load categories');
        }
      } catch (err) {
        setError('Error loading categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const useBlogPosts = (filters?: {
  category?: string;
  tag?: string;
  featured?: boolean;
  search?: string;
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        let url = getApiUrl(API_ENDPOINTS.BLOG_POSTS);
        const params = new URLSearchParams();
        
        if (filters?.category) params.append('category', filters.category);
        if (filters?.tag) params.append('tag', filters.tag);
        if (filters?.featured) params.append('featured', 'true');
        if (filters?.search) params.append('search', filters.search);
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          setError('Failed to load posts');
        }
      } catch (err) {
        setError('Error loading posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filters?.category, filters?.tag, filters?.featured, filters?.search]);

  return { posts, loading, error };
};

export const useBlogPost = (slug: string) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const url = getApiUrl(API_ENDPOINTS.BLOG_POST_DETAIL.replace(':slug', slug));
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          setError('Failed to load post');
        }
      } catch (err) {
        setError('Error loading post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
};

export const useFeaturedPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl(API_ENDPOINTS.BLOG_FEATURED));
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          setError('Failed to load featured posts');
        }
      } catch (err) {
        setError('Error loading featured posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  return { posts, loading, error };
};

export const usePopupSettings = () => {
  const [settings, setSettings] = useState<PopupSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl(API_ENDPOINTS.POPUP_SETTINGS));
        if (response.ok) {
          const data = await response.json();
          setSettings(data.is_active !== false ? data : null);
        } else {
          setSettings(null);
        }
      } catch (err) {
        setError('Error loading popup settings');
        console.error(err);
        setSettings(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error };
};
