'use client';

import { useState, useEffect } from 'react';
import { getApiUrl, API_ENDPOINTS } from '@/config/api';

interface ContactHero {
  id: number;
  hero_image: string | null;
  hero_image_url: string | null;
  main_title: string;
  subtitle: string;
  description: string;
  is_active: boolean;
}

interface ContactInfo {
  id: number;
  primary_phone: string;
  secondary_phone: string | null;
  primary_email: string;
  secondary_email: string | null;
  whatsapp_number: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  full_address: string;
  weekday_hours: string;
  weekend_hours: string;
  emergency_note: string;
  phone_label: string;
  email_label: string;
  address_label: string;
  hours_label: string;
  phone_description: string;
  email_description: string;
  address_description: string;
  google_map_url: string | null;
  map_height: number;
  is_active: boolean;
}

interface WhyChooseUsPoint {
  id: number;
  point: string;
  order: number;
  is_active: boolean;
}

interface ContactTestimonial {
  id: number;
  name: string;
  service: string;
  rating: number;
  comment: string;
  order: number;
  is_active: boolean;
}

interface ContactPageData {
  hero: ContactHero;
  contact_info: ContactInfo;
  why_choose_us: WhyChooseUsPoint[];
  testimonials: ContactTestimonial[];
}

interface UseContactDataReturn {
  contactData: ContactPageData | null;
  loading: boolean;
  error: string | null;
}

export const useContactData = (): UseContactDataReturn => {
  const [contactData, setContactData] = useState<ContactPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(getApiUrl(API_ENDPOINTS.CONTACT_PAGE_DATA));
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ContactPageData = await response.json();
        setContactData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch contact data');
        console.error('Error fetching contact data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  return { contactData, loading, error };
};