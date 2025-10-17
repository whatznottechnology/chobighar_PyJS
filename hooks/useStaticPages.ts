import { useState, useEffect } from 'react';
import { getApiUrl, API_ENDPOINTS } from '@/config/api';

export interface StaticPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  created_at: string;
  updated_at: string;
}

export interface StaticPageLink {
  id: number;
  title: string;
  slug: string;
  display_order: number;
}

export function useStaticPage(slug: string) {
  const [page, setPage] = useState<StaticPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${getApiUrl(API_ENDPOINTS.STATIC_PAGES)}/pages/${slug}/`);
        
        if (!response.ok) {
          throw new Error('Page not found');
        }
        
        const data = await response.json();
        setPage(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load page');
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  return { page, loading, error };
}

export function useStaticPageLinks() {
  const [links, setLinks] = useState<StaticPageLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(`${getApiUrl(API_ENDPOINTS.STATIC_PAGES)}/pages/`);
        const data = await response.json();
        setLinks(data);
      } catch (err) {
        console.error('Failed to load static page links:', err);
        setLinks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  return { links, loading };
}
