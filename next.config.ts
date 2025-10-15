import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for shared hosting
  compress: true,
  poweredByHeader: false,
  
  // Rewrites for proxying media files to Django backend
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    return [
      {
        source: '/media/:path*',
        destination: `${apiUrl}/media/:path*`,
      },
    ];
  },
  
  images: {
    domains: [
      'images.unsplash.com', 
      'img.youtube.com',
      'i.ytimg.com', // YouTube thumbnails alternative domain
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
