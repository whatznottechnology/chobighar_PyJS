import { useState, useEffect } from 'react';

export interface PhotoshootHero {
  id: number;
  title: string;
  subtitle: string;
  hero_image: string | null;
  image_url: string | null;
  alt_text: string;
  cta_text: string;
  cta_link: string | null;
  is_active: boolean;
  order: number;
}

export interface PhotoshootService {
  id: number;
  title: string;
  description: string;
  short_description: string;
  price: string;
  duration: string;
  inclusions: string[];
  deliverables: string;
  service_image: string | null;
  image_url: string | null;
  alt_text: string;
  is_active: boolean;
  order: number;
}

export interface PhotoshootPageSettings {
  id: number;
  hero_section_title: string;
  hero_section_subtitle: string;
  services_section_title: string;
  services_section_subtitle: string;
  contact_section_title: string;
  contact_section_subtitle: string;
  meta_title: string;
  meta_description: string;
  is_active: boolean;
}

export interface PhotoshootTestimonial {
  id: number;
  client_name: string;
  service_type: string;
  rating: number;
  testimonial_text: string;
  client_image: string | null;
  client_image_url: string | null;
  order: number;
  is_active: boolean;
  is_featured: boolean;
}

export interface PhotoshootPageData {
  hero: PhotoshootHero | null;
  services: PhotoshootService[];
  testimonials: PhotoshootTestimonial[];
  settings: PhotoshootPageSettings | null;
}

export const usePhotoshootPageData = () => {
  const [data, setData] = useState<PhotoshootPageData>({
    hero: null,
    services: [],
    testimonials: [],
    settings: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotoshootPageData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://127.0.0.1:8000/api/photoshootpage/page-data/');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const responseData = await response.json();
        setData(responseData);
        setError(null);
      } catch (err) {
        console.error('Error fetching photoshoot page data:', err);
        setError('Failed to load photoshoot data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotoshootPageData();
  }, []);

  return { data, isLoading, error };
};