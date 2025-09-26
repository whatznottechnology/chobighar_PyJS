'use client';

import { useState, useEffect } from 'react';

interface SocialMedia {
  id: number;
  name: string;
  display_name: string;
  url: string;
  icon_svg: string;
  is_active: boolean;
  order: number;
}

interface ContactInfo {
  id: number;
  phone: string;
  email: string;
  is_active: boolean;
}

interface BrandInfo {
  id: number;
  logo_image: string | null;
  logo_image_url: string | null;
  main_text: string;
  sub_text: string;
  is_active: boolean;
}

interface HeaderData {
  social_media: SocialMedia[];
  contact_info: ContactInfo;
  brand_info: BrandInfo;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function useHeaderData() {
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/header/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setHeaderData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching header data:', err);
        setError('Failed to load header data');
        // Fallback to static data if API fails
        setHeaderData({
          social_media: [],
          contact_info: {
            id: 1,
            phone: '+91 96479 66765',
            email: 'booking@chabighar.com',
            is_active: true
          },
          brand_info: {
            id: 1,
            logo_image: null,
            logo_image_url: null,
            main_text: 'Chabighar',
            sub_text: '(Art Direction and Design Studio)',
            is_active: true
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  return { headerData, loading, error };
}