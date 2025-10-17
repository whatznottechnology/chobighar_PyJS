import { API_BASE_URL } from '@/config/api';

export interface VendorCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  icon_emoji: string;
  gradient_from: string;
  gradient_to: string;
  is_active: boolean;
  vendor_count: number;
  gradient_class: string;
  subcategories: VendorSubCategory[];
}

export interface VendorSubCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  banner_image: string | null;
  vendor_count: number;
  is_active: boolean;
  category: number;
}

export interface VendorImage {
  id: number;
  image: string;
  alt_text: string;
  is_active: boolean;
}

export interface VendorVideo {
  id: number;
  title: string;
  youtube_id: string;
  description: string;
  youtube_url: string;
  youtube_embed_url: string;
}

export interface VendorServiceItem {
  id: number;
  name: string;
  description: string;
}

export interface VendorSpecialty {
  id: number;
  name: string;
}

export interface VendorWhyChooseUs {
  id: number;
  text: string;
}

export interface VendorTestimonial {
  id: number;
  client_name: string;
  rating: number;
  review: string;
  event_type: string;
  date: string;
  date_display: string;
  is_featured: boolean;
}

export interface VendorProfile {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  type: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  story: string;
  experience: string;
  price_range: string;
  capacity: string;
  rating: number;
  reviews_count: number;
  business_hours: Record<string, string>;
  is_featured: boolean;
  category_name: string;
  subcategory_name: string;
  social_media: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  hero_images: string[];  // Array of 4 hero image URLs (from hero_image_1-4 fields)
  gallery_images: string[]; // Array of gallery image URLs
  profile_image_url: string | null; // Profile image from dedicated profile_image field
  images: VendorImage[]; // All images with full details (only id, image, alt_text, is_active)
  videos: VendorVideo[];
  services: VendorServiceItem[];
  specialties: VendorSpecialty[];
  why_choose_us: VendorWhyChooseUs[];
  testimonials: VendorTestimonial[];
  // Stats & Engagement
  stats_count: string;
  stats_label: string;
  love_count: number;
  // SEO Metadata
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

export interface VendorProfileListItem {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  type: string;
  location: string;
  phone: string;
  email: string;
  description: string;
  experience: string;
  price_range: string;
  rating: string;
  reviews_count: number;
  is_featured: boolean;
  category_name: string;
  subcategory_name: string;
  main_image: string | null;
}

class VendorService {
  private async fetchWithErrorHandling(url: string): Promise<any> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getCategories(): Promise<VendorCategory[]> {
    const url = `${API_BASE_URL}/api/vendor/categories/`;
    return this.fetchWithErrorHandling(url);
  }

  async getCategoryBySlug(slug: string): Promise<VendorCategory> {
    const url = `${API_BASE_URL}/api/vendor/categories/${slug}/`;
    return this.fetchWithErrorHandling(url);
  }

  async getSubcategories(): Promise<VendorSubCategory[]> {
    const url = `${API_BASE_URL}/api/vendor/subcategories/`;
    return this.fetchWithErrorHandling(url);
  }

  async getSubcategoryBySlug(slug: string): Promise<VendorSubCategory> {
    const url = `${API_BASE_URL}/api/vendor/subcategories/${slug}/`;
    return this.fetchWithErrorHandling(url);
  }

  async getSubcategoriesByCategory(categorySlug: string): Promise<VendorSubCategory[]> {
    const url = `${API_BASE_URL}/api/vendor/categories/${categorySlug}/subcategories/`;
    return this.fetchWithErrorHandling(url);
  }

  // Vendor Profile Methods
  async getVendorProfiles(filters?: {
    category?: string;
    subcategory?: string;
    featured?: boolean;
    location?: string;
    search?: string;
  }): Promise<VendorProfileListItem[]> {
    let url = `${API_BASE_URL}/api/vendor/profiles/`;
    const params = new URLSearchParams();
    
    if (filters) {
      if (filters.category) params.append('category__slug', filters.category);
      if (filters.subcategory) params.append('subcategory__slug', filters.subcategory);
      if (filters.featured !== undefined) params.append('is_featured', filters.featured.toString());
      if (filters.location) params.append('location', filters.location);
      if (filters.search) params.append('search', filters.search);
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    return this.fetchWithErrorHandling(url);
  }

  async getVendorProfileBySlug(slug: string): Promise<VendorProfile> {
    const url = `${API_BASE_URL}/api/vendor/profiles/${slug}/`;
    return this.fetchWithErrorHandling(url);
  }

  async getFeaturedVendors(): Promise<VendorProfileListItem[]> {
    const url = `${API_BASE_URL}/api/vendor/featured/`;
    return this.fetchWithErrorHandling(url);
  }

  async getVendorsByCategory(categorySlug: string): Promise<{
    category: VendorCategory;
    vendors: VendorProfileListItem[];
  }> {
    const url = `${API_BASE_URL}/api/vendor/categories/${categorySlug}/vendors/`;
    return this.fetchWithErrorHandling(url);
  }

  async getVendorsBySubcategory(subcategorySlug: string): Promise<{
    subcategory: VendorSubCategory;
    vendors: VendorProfileListItem[];
  }> {
    const url = `${API_BASE_URL}/api/vendor/subcategories/${subcategorySlug}/vendors/`;
    return this.fetchWithErrorHandling(url);
  }
}

export const vendorService = new VendorService();