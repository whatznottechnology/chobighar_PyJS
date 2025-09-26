import { useState, useEffect } from 'react';

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

interface PhotoshootPageData {
  hero?: PhotoshootHero;
  services: PhotoshootService[];
  settings?: PhotoshootPageSettings;
}

// Custom hooks
export function usePhotoshootHero() {
  const [hero, setHero] = useState<PhotoshootHero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHero() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/photoshootpage/hero/');
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
        const response = await fetch('http://127.0.0.1:8000/api/photoshootpage/services/');
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
        const response = await fetch('http://127.0.0.1:8000/api/photoshootpage/settings/');
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

export function usePhotoshootPageData() {
  const [data, setData] = useState<PhotoshootPageData>({
    services: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPageData() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/photoshootpage/page-data/');
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          setError('Failed to fetch page data');
        }
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
  PhotoshootPageData
};