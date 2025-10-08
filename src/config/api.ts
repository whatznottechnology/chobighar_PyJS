/**
 * API Configuration
 * Centralized API URL management for the entire application
 */

// Get API URL from environment variable, fallback to localhost for development
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Helper function to build full API URLs
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

// Helper function to build media URLs
export const getMediaUrl = (mediaPath: string | null | undefined): string | null => {
  if (!mediaPath) return null;
  
  // If it's already a full URL, return as is
  if (mediaPath.startsWith('http://') || mediaPath.startsWith('https://')) {
    return mediaPath;
  }
  
  // If it starts with /media/, build full URL
  if (mediaPath.startsWith('/media/')) {
    return `${API_BASE_URL}${mediaPath}`;
  }
  
  // Otherwise, assume it needs /media/ prefix
  return `${API_BASE_URL}/media/${mediaPath}`;
};

// API Endpoints - centralized endpoint definitions
export const API_ENDPOINTS = {
  // Health & Status
  HEALTH: '/health/',
  HEALTH_READY: '/health/ready/',
  HEALTH_LIVE: '/health/live/',
  
  // Header
  HEADER: '/api/header/',
  SOCIAL_MEDIA: '/api/header/social-media/',
  CONTACT_INFO: '/api/header/contact-info/',
  BRAND_INFO: '/api/header/brand-info/',
  
  // Footer
  FOOTER: '/api/footer/',
  
  // Contact
  CONTACT: '/api/contact/',
  CONTACT_PAGE_DATA: '/api/contact/contact-page-data/',
  
  // Homepage
  HOMEPAGE: '/api/homepage/',
  HERO_SLIDES: '/api/homepage/hero-slides/',
  VIDEO_TESTIMONIALS: '/api/homepage/video-testimonials/',
  TEXT_TESTIMONIALS: '/api/homepage/text-testimonials/',
  FAQS: '/api/homepage/faqs/',
  ACHIEVEMENTS: '/api/homepage/achievements/',
  SHOWCASE_IMAGES: '/api/homepage/showcase-images/',
  VIDEO_SHOWCASE: '/api/homepage/video-showcase/',
  VIDEO_SHOWCASES: '/api/homepage/video-showcases/',
  
  // About Page
  ABOUT: '/api/aboutpage/',
  ABOUT_HERO: '/api/aboutpage/hero/',
  ABOUT_STORY: '/api/aboutpage/story/',
  ABOUT_VALUES: '/api/aboutpage/values/',
  ABOUT_TEAM: '/api/aboutpage/team/',
  ABOUT_CONTENT: '/api/aboutpage/content/',
  
  // Photoshoot Page
  PHOTOSHOOT: '/api/photoshootpage/',
  PHOTOSHOOT_PAGE_DATA: '/api/photoshootpage/page-data/',
  PHOTOSHOOT_HERO: '/api/photoshootpage/hero/',
  PHOTOSHOOT_SERVICES: '/api/photoshootpage/services/',
  PHOTOSHOOT_SETTINGS: '/api/photoshootpage/settings/',
  
  // Vendor
  VENDOR_CATEGORIES: '/api/vendor/categories/',
  VENDOR_SUBCATEGORIES: '/api/vendor/subcategories/',
  VENDOR_PROFILES: '/api/vendor/profiles/',
  VENDOR_FEATURED: '/api/vendor/featured/',
  
  // Portfolio
  PORTFOLIO: '/api/portfolio/',
  PORTFOLIO_CATEGORIES: '/api/portfolio/categories/',
  PORTFOLIO_PORTFOLIOS: '/api/portfolio/portfolios/',
  PORTFOLIO_VIDEOS: '/api/portfolio/videos/',
  PORTFOLIO_SHOWCASE_IMAGES: '/api/portfolio/showcase-images/',
  
  // Search
  SEARCH: '/api/search/',
  SEARCH_SUGGESTIONS: '/api/search/suggestions/',
  
  // Inquiry
  INQUIRY_CREATE: '/api/inquiry/create/',
  INQUIRY_CATEGORIES: '/api/inquiry/categories/',
  
  // Blog
  BLOG_CATEGORIES: '/api/blog/categories/',
  BLOG_POSTS: '/api/blog/posts/',
  BLOG_POST_DETAIL: '/api/blog/posts/:slug/',
  BLOG_FEATURED: '/api/blog/posts/featured/',
  BLOG_RECENT: '/api/blog/posts/recent/',
  BLOG_COMMENTS: '/api/blog/comments/',
  
  // Popup
  POPUP_INQUIRY: '/api/blog/popup-inquiry/',
  POPUP_SETTINGS: '/api/blog/popup-settings/active/',
};

// Export configuration object
export const apiConfig = {
  baseUrl: API_BASE_URL,
  getUrl: getApiUrl,
  getMediaUrl: getMediaUrl,
  endpoints: API_ENDPOINTS,
};

export default apiConfig;
