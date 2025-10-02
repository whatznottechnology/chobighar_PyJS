// Portfolio API service functions
import { API_BASE_URL } from '@/config/api';

const PORTFOLIO_BASE = `${API_BASE_URL}/api/portfolio`;

export interface Category {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  order: number;
  portfolio_count: number;
}

export interface Portfolio {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  category_id: string;
  cover_image: string;
  image_count: number;
  date: string;
  location: string;
  duration: string;
  guests: string;
  description: string;
  story?: string;
  featured: boolean;
  images?: PortfolioImage[];
  videos?: PortfolioVideo[];
  highlights?: PortfolioHighlight[];
  services?: PortfolioService[];
  created_at: string;
  updated_at: string;
}

export interface PortfolioImage {
  id: number;
  image: string;
  caption: string;
  order: number;
  is_cover: boolean;
}

export interface PortfolioVideo {
  id: number;
  video_id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail_url: string;
  order: number;
}

export interface PortfolioHighlight {
  id: number;
  highlight_text: string;
  order: number;
}

export interface PortfolioService {
  id: number;
  service_name: string;
  order: number;
}

export interface CategoryWithCount {
  id: string;
  name: string;
  count: number;
}

export interface PortfolioInquiry {
  name: string;
  phone: string;
  email?: string;
  event_date: string;
  portfolio?: string;
  message?: string;
}

class PortfolioAPI {
  private async fetchAPI(endpoint: string, options?: RequestInit) {
    try {
      const response = await fetch(`${PORTFOLIO_BASE}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Portfolio API Error:', error);
      throw error;
    }
  }

  // Get all portfolios with optional filtering
  async getPortfolios(params?: {
    category?: string;
    featured?: boolean;
    search?: string;
    ordering?: string;
  }): Promise<Portfolio[]> {
    const searchParams = new URLSearchParams();
    
    if (params?.category && params.category !== 'all') {
      searchParams.append('category', params.category);
    }
    if (params?.featured) {
      searchParams.append('featured', 'true');
    }
    if (params?.search) {
      searchParams.append('search', params.search);
    }
    if (params?.ordering) {
      searchParams.append('ordering', params.ordering);
    }

    const queryString = searchParams.toString();
    const endpoint = `/portfolios/${queryString ? `?${queryString}` : ''}`;
    
    return this.fetchAPI(endpoint);
  }

  // Get specific portfolio by ID
  async getPortfolio(id: string): Promise<Portfolio> {
    return this.fetchAPI(`/portfolios/${id}/`);
  }

  // Get featured portfolios
  async getFeaturedPortfolios(): Promise<Portfolio[]> {
    return this.fetchAPI('/portfolios/featured/');
  }

  // Get categories with portfolio counts
  async getCategoriesWithCount(): Promise<CategoryWithCount[]> {
    return this.fetchAPI('/portfolios/categories_with_count/');
  }

  // Get related portfolios
  async getRelatedPortfolios(id: string): Promise<Portfolio[]> {
    return this.fetchAPI(`/portfolios/${id}/related/`);
  }

  // Get all categories
  async getCategories(): Promise<Category[]> {
    return this.fetchAPI('/categories/');
  }

  // Submit portfolio inquiry
  async submitInquiry(inquiry: PortfolioInquiry): Promise<{ message: string; inquiry_id: string }> {
    return this.fetchAPI('/inquiry/create/', {
      method: 'POST',
      body: JSON.stringify({
        inquiry_type: 'portfolio',
        name: inquiry.name,
        email: inquiry.email || 'contact@portfolio.com', // fallback email
        phone: inquiry.phone,
        subject: `Portfolio Inquiry - ${inquiry.portfolio}`,
        message: `I'm interested in this portfolio style for my event on ${inquiry.event_date}`,
        service_name: 'Portfolio Style',
        service_id: inquiry.portfolio,
        event_date: inquiry.event_date,
        source: 'portfolio_page'
      }),
    });
  }
}

export const portfolioAPI = new PortfolioAPI();