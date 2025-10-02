import { useState, useEffect } from 'react';
import { getApiUrl, API_ENDPOINTS } from '@/config/api';

// Types
interface PhotoshootHero {
  id: number;
  title: string;
  subtitle: string;
  hero_image: string | null;
  image_url: string | null;
  alt_text: string;
  primary_button_text: string;
  primary_button_link: string;
  secondary_button_text: string;
  secondary_button_link: string;
  is_active: boolean;
}

interface PhotoshootService {
  id: number;
  title: string;
  description: string;
  service_image: string | null;
  image_url: string | null;
  alt_text: string;
  price: string;
  duration: string;
  deliverables: string;
  features: string[];
  inclusions: string[];
  order: number;
  is_active: boolean;
  is_featured: boolean;
}

interface PhotoshootPageSettings {
  id: number;
  services_section_title: string;
  services_section_description: string;
  meta_title: string;
  meta_description: string;
  is_active: boolean;
}

interface PortfolioAlbum {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  category_id: string;
  cover_image: string;
  image_count: number;
  date: string;
  location: string;
  is_active: boolean;
}

interface PhotoshootPageData {
  hero?: PhotoshootHero;
  services: PhotoshootService[];
  settings?: PhotoshootPageSettings;
  testimonials: any[];
  portfolios?: PortfolioAlbum[];
}

// Custom hooks
export function usePhotoshootHero() {
  const [hero, setHero] = useState<PhotoshootHero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHero() {
      try {
        const response = await fetch(getApiUrl(API_ENDPOINTS.PHOTOSHOOT_HERO));
        if (response.ok) {
          const data = await response.json();
          setHero(data);
        } else {
          setError('Failed to fetch hero data');
        }
      } catch (err) {
        setError('Network error');
        console.error('Error fetching photoshoot hero:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchHero();
  }, []);

  return { hero, loading, error };
}

export function usePhotoshootServices() {
  const [services, setServices] = useState<PhotoshootService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch(getApiUrl(API_ENDPOINTS.PHOTOSHOOT_SERVICES));
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        } else {
          setError('Failed to fetch services data');
        }
      } catch (err) {
        setError('Network error');
        console.error('Error fetching photoshoot services:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return { services, loading, error };
}

export function usePhotoshootPageSettings() {
  const [settings, setSettings] = useState<PhotoshootPageSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch(getApiUrl(API_ENDPOINTS.PHOTOSHOOT_SETTINGS));
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        } else {
          setError('Failed to fetch settings data');
        }
      } catch (err) {
        setError('Network error');
        console.error('Error fetching photoshoot settings:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  return { settings, loading, error };
}

export function usePortfolioAlbums() {
  const [portfolios, setPortfolios] = useState<PortfolioAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPortfolios() {
      try {
        const response = await fetch(getApiUrl(API_ENDPOINTS.PORTFOLIO_PORTFOLIOS));
        if (response.ok) {
          const data = await response.json();
          setPortfolios(data);
        } else {
          setError('Failed to fetch portfolios data');
        }
      } catch (err) {
        setError('Network error');
        console.error('Error fetching portfolios:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolios();
  }, []);

  return { portfolios, loading, error };
}

export function usePhotoshootPageData() {
  const [data, setData] = useState<PhotoshootPageData>({
    services: [],
    testimonials: [],
    portfolios: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPageData() {
      try {
        // Fetch photoshoot page data
        const photoshootResponse = await fetch(getApiUrl(API_ENDPOINTS.PHOTOSHOOT_PAGE_DATA));
        let photoshootData: any = { services: [], testimonials: [] };
        if (photoshootResponse.ok) {
          photoshootData = await photoshootResponse.json();
        }

        // Fetch portfolio albums
        const portfolioResponse = await fetch(getApiUrl(API_ENDPOINTS.PORTFOLIO_PORTFOLIOS));
        let portfolioData: PortfolioAlbum[] = [];
        if (portfolioResponse.ok) {
          portfolioData = await portfolioResponse.json();
        }

        setData({
          ...photoshootData,
          portfolios: portfolioData,
          services: photoshootData.services || [],
          testimonials: photoshootData.testimonials || []
        });
      } catch (err) {
        setError('Network error');
        console.error('Error fetching photoshoot page data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPageData();
  }, []);

  return { data, loading, error };
}

// Export types for use in components
export type {
  PhotoshootHero,
  PhotoshootService,
  PhotoshootPageSettings,
  PhotoshootPageData,
  PortfolioAlbum
};