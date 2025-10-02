import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for shared hosting
  compress: true,
  poweredByHeader: false,
  
  images: {
    domains: [
      'images.unsplash.com', 
      'img.youtube.com', 
      'localhost', 
      '127.0.0.1',
      'admin.chobighar.com', // Production backend
      'chobighar.com',       // Production frontend
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.chobighar.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.chobighar.com',
        pathname: '/static/**',
      },
    ],
    // Optimize images for shared hosting
    minimumCacheTTL: 60,
    formats: ['image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Production optimizations
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
};

export default nextConfig;
