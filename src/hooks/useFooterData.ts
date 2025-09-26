import { useState, useEffect } from 'react';

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
        const response = await fetch('http://localhost:8000/api/footer/');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setFooterData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching footer data:', err);
        setError('Failed to load footer data');
        
        // Fallback data
        setFooterData({
          brand_info: {
            id: 1,
            logo_image: null,
            logo_image_url: null,
            main_text: "Chabighar",
            sub_text: "(Art Direction and Design Studio)",
            description: "Your trusted partner for creating memorable wedding experiences. From planning to execution, we make your special day perfect.",
            is_active: true
          },
          contact_info: {
            id: 1,
            phone: "+91 96479 66765",
            email: "booking@chabighar.com",
            whatsapp_number: "+91 96479 66765",
            address_line1: "123 Wedding Street",
            address_line2: "Kolkata, West Bengal 700001",
            weekday_hours: "Mon-Fri: 10:00 AM - 8:00 PM",
            weekend_hours: "Sat-Sun: 11:00 AM - 6:00 PM",
            phone_text: "Call us anytime",
            whatsapp_text: "Chat with us",
            email_text: "Send us an email",
            is_active: true
          },
          social_media: [
            { id: 1, name: 'instagram', display_name: 'Instagram', url: 'https://instagram.com/chabighar', icon_svg: '', is_active: true, order: 1 },
            { id: 2, name: 'facebook', display_name: 'Facebook', url: 'https://facebook.com/chabighar', icon_svg: '', is_active: true, order: 2 },
            { id: 3, name: 'youtube', display_name: 'YouTube', url: 'https://youtube.com/chabighar', icon_svg: '', is_active: true, order: 3 }
          ],
          copyright_info: {
            id: 1,
            text: "© 2024 Chabighar. All rights reserved.",
            company_name: "Chabighar",
            company_url: null,
            is_active: true
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  return { footerData, loading, error };
};

export default useFooterData;