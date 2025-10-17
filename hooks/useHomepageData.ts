'use client';

import { useState, useEffect } from 'react';
import { getApiUrl, API_ENDPOINTS } from '@/config/api';

interface HeroSlide {
  id: number;
  title: string;
  image: string | null;
  image_url: string | null;
  alt_text: string;
  order: number;
  caption: string;
  link_url: string;
  is_active: boolean;
}

interface ShowcaseImage {
  id: number;
  image: string;
  image_url: string;
  caption: string;
  order: number;
  is_cover: boolean;
  featured: boolean;
}

interface VideoTestimonial {
  id: number;
  name: string;
  location: string;
  event: string;
  date: string;
  video_file: string;
  video_url: string | null;
  thumbnail: string | null;
  thumbnail_url: string | null;
  rating: number;
  description: string;
  order: number;
  is_active: boolean;
}

interface TextTestimonial {
  id: number;
  name: string;
  location: string;
  event: string;
  date: string;
  image: string;
  image_url: string | null;
  text: string;
  rating: number;
  order: number;
  is_active: boolean;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
  keywords: string;
  is_active: boolean;
}

interface Achievement {
  id: number;
  title: string;
  count_value: number;
  suffix: string;
  description: string;
  icon_type: string;
  order: number;
  is_active: boolean;
}

interface VideoShowcase {
  id: number;
  title: string;
  description: string;
  youtube_video_id: string;
  thumbnail_image: string | null;
  thumbnail_url: string | null;
  youtube_thumbnail_url: string;
  youtube_embed_url: string;
  is_active: boolean;
  autoplay: boolean;
  loop_video: boolean;
  show_controls: boolean;
  mute_audio: boolean;
  alt_text: string;
}

interface UseHeroSlidesReturn {
  slides: HeroSlide[] | null;
  loading: boolean;
  error: string | null;
}

interface UseShowcaseImagesReturn {
  images: ShowcaseImage[] | null;
  loading: boolean;
  error: string | null;
}

interface UseVideoTestimonialsReturn {
  testimonials: VideoTestimonial[] | null;
  loading: boolean;
  error: string | null;
}

interface UseTextTestimonialsReturn {
  testimonials: TextTestimonial[] | null;
  loading: boolean;
  error: string | null;
}

interface UseFAQsReturn {
  faqs: FAQ[] | null;
  loading: boolean;
  error: string | null;
}

interface UseAchievementsReturn {
  achievements: Achievement[] | null;
  loading: boolean;
  error: string | null;
}

interface UseVideoShowcaseReturn {
  videoShowcase: VideoShowcase | null;
  loading: boolean;
  error: string | null;
}

interface UseVideoShowcasesReturn {
  videoShowcases: VideoShowcase[] | null;
  loading: boolean;
  error: string | null;
}

export const useHeroSlides = (): UseHeroSlidesReturn => {
  const [slides, setSlides] = useState<HeroSlide[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(getApiUrl(API_ENDPOINTS.HERO_SLIDES));
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: HeroSlide[] = await response.json();
        setSlides(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch hero slides');
        console.error('Error fetching hero slides:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroSlides();
  }, []);

  return { slides, loading, error };
};

export const useShowcaseImages = (): UseShowcaseImagesReturn => {
  const [images, setImages] = useState<ShowcaseImage[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowcaseImages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(getApiUrl(API_ENDPOINTS.SHOWCASE_IMAGES));
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle paginated response
        if (data.results) {
          setImages(data.results);
        } else {
          // Fallback for non-paginated response
          setImages(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch showcase images');
        console.error('Error fetching showcase images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShowcaseImages();
  }, []);

  return { images, loading, error };
};

export const useVideoTestimonials = (): UseVideoTestimonialsReturn => {
  const [testimonials, setTestimonials] = useState<VideoTestimonial[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(getApiUrl(API_ENDPOINTS.VIDEO_TESTIMONIALS));
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: VideoTestimonial[] = await response.json();
        setTestimonials(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch video testimonials');
        console.error('Error fetching video testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoTestimonials();
  }, []);

  return { testimonials, loading, error };
};

export const useTextTestimonials = (): UseTextTestimonialsReturn => {
  const [testimonials, setTestimonials] = useState<TextTestimonial[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTextTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(getApiUrl(API_ENDPOINTS.TEXT_TESTIMONIALS));
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: TextTestimonial[] = await response.json();
        setTestimonials(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch text testimonials');
        console.error('Error fetching text testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTextTestimonials();
  }, []);

  return { testimonials, loading, error };
};

export const useFAQs = (): UseFAQsReturn => {
  const [faqs, setFaqs] = useState<FAQ[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(getApiUrl(API_ENDPOINTS.FAQS));
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: FAQ[] = await response.json();
        setFaqs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch FAQs');
        console.error('Error fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  return { faqs, loading, error };
};

export const useAchievements = (): UseAchievementsReturn => {
  const [achievements, setAchievements] = useState<Achievement[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(getApiUrl(API_ENDPOINTS.ACHIEVEMENTS));
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: Achievement[] = await response.json();
        setAchievements(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch achievements');
        console.error('Error fetching achievements:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  return { achievements, loading, error };
};

export const useVideoShowcase = (): UseVideoShowcaseReturn => {
  const [videoShowcase, setVideoShowcase] = useState<VideoShowcase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoShowcase = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(getApiUrl(API_ENDPOINTS.VIDEO_SHOWCASE));
        
        if (!response.ok) {
          if (response.status === 404) {
            setVideoShowcase(null);
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: VideoShowcase = await response.json();
        setVideoShowcase(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch video showcase');
        console.error('Error fetching video showcase:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoShowcase();
  }, []);

  return { videoShowcase, loading, error };
};

export const useVideoShowcases = (): UseVideoShowcasesReturn => {
  const [videoShowcases, setVideoShowcases] = useState<VideoShowcase[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoShowcases = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(getApiUrl(API_ENDPOINTS.VIDEO_SHOWCASES));
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: VideoShowcase[] = await response.json();
        setVideoShowcases(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch video showcases');
        console.error('Error fetching video showcases:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoShowcases();
  }, []);

  return { videoShowcases, loading, error };
};
