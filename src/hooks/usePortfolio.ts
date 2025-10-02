import { useState, useEffect } from 'react';
import { portfolioAPI, Portfolio, CategoryWithCount } from '../services/portfolioAPI';
import { getApiUrl, API_ENDPOINTS } from '@/config/api';

// Hook for getting all portfolios with filtering
export const usePortfolios = (params?: {
  category?: string;
  featured?: boolean;
  search?: string;
  ordering?: string;
}) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await portfolioAPI.getPortfolios(params);
      setPortfolios(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolios');
      console.error('Error fetching portfolios:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, [params?.category, params?.featured, params?.search, params?.ordering]);

  return { portfolios, loading, error, refetch: fetchPortfolios };
};

// Hook for getting a specific portfolio
export const usePortfolio = (id: string) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await portfolioAPI.getPortfolio(id);
        setPortfolio(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch portfolio');
        console.error('Error fetching portfolio:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  return { portfolio, loading, error };
};

// Hook for getting featured portfolios
export const useFeaturedPortfolios = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedPortfolios = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await portfolioAPI.getFeaturedPortfolios();
        setPortfolios(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch featured portfolios');
        console.error('Error fetching featured portfolios:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPortfolios();
  }, []);

  return { portfolios, loading, error };
};

// Hook for getting categories with counts
export const useCategoriesWithCount = () => {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await portfolioAPI.getCategoriesWithCount();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

// Hook for getting related portfolios
export const useRelatedPortfolios = (id: string) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchRelatedPortfolios = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await portfolioAPI.getRelatedPortfolios(id);
        setPortfolios(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch related portfolios');
        console.error('Error fetching related portfolios:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPortfolios();
  }, [id]);

  return { portfolios, loading, error };
};

// Portfolio videos interface
interface PortfolioVideo {
  id: number;
  video_id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  order: number;
}

// Hook for getting portfolio videos
export const usePortfolioVideos = () => {
  const [videos, setVideos] = useState<PortfolioVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(getApiUrl(API_ENDPOINTS.PORTFOLIO_VIDEOS));
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: PortfolioVideo[] = await response.json();
      setVideos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolio videos');
      console.error('Error fetching portfolio videos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return { videos, loading, error, refetch: fetchVideos };
};

// Hook for getting portfolio showcase images for gallery
export const usePortfolioImages = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(getApiUrl(API_ENDPOINTS.PORTFOLIO_SHOWCASE_IMAGES));
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setImages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolio images');
      console.error('Error fetching portfolio images:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return { images, loading, error, refetch: fetchImages };
};