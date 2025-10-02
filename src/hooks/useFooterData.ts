import { useState, useEffect } from 'react';
import { getApiUrl, API_ENDPOINTS } from '@/config/api';

export interface FooterBrandInfo {
  id: number;
  logo_image: string | null;
  logo_image_url: string | null;
  main_text: string;
  sub_text: string;
  description: string;
  is_active: boolean;
}

export interface FooterContactInfo {
  id: number;
  phone: string;
  email: string;
  whatsapp_number: string;
  address_line1: string;
  address_line2: string;
  weekday_hours: string;
  weekend_hours: string;
  phone_text: string;
  whatsapp_text: string;
  email_text: string;
  is_active: boolean;
}

export interface FooterSocialMedia {
  id: number;
  name: string;
  display_name: string;
  url: string;
  icon_svg: string;
  is_active: boolean;
  order: number;
}

export interface FooterCopyright {
  id: number;
  text: string;
  company_name: string;
  company_url: string | null;
  is_active: boolean;
}

export interface FooterData {
  brand_info: FooterBrandInfo;
  contact_info: FooterContactInfo;
  social_media: FooterSocialMedia[];
  copyright_info: FooterCopyright;
}

const useFooterData = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl(API_ENDPOINTS.FOOTER));
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setFooterData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching footer data:', err);
        setError('Failed to load footer data');
        setFooterData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  return { footerData, loading, error };
};

export default useFooterData;