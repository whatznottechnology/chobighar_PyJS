'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Album {
  id: number;
  title: string;
  image: string;
  category: string;
  photos: number;
}

const albums: Album[] = [
  {
    id: 1,
    title: 'Bridal Beauty',
    image: '/img/bridalwear.jpg',
    category: 'Wedding Photography',
    photos: 45
  },
  {
    id: 2,
    title: 'Pre-Wedding Moments',
    image: '/img/prewedding.jpg',
    category: 'Pre-Wedding',
    photos: 32
  },
  {
    id: 3,
    title: 'Groom Portraits',
    image: '/img/groomwear.jpg',
    category: 'Portrait',
    photos: 28
  },
  {
    id: 4,
    title: 'Wedding Venues',
    image: '/img/venues.jpg',
    category: 'Venue',
    photos: 38
  },
  {
    id: 5,
    title: 'Mehndi Ceremony',
    image: '/img/mehndi.jpg',
    category: 'Ceremony',
    photos: 42
  },
  {
    id: 6,
    title: 'Wedding Jewelry',
    image: '/img/jewellery.jpg',
    category: 'Details',
    photos: 25
  }
];

export default function AlbumsShowcase() {
  return (
    <section className="py-20 bg-soft-white">
      <div className="w-full mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold text-text mb-4" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our Wedding Albums
          </h2>
          <p 
            className="text-lg text-muted max-w-2xl mx-auto" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Discover our curated collection of wedding photography showcasing love stories captured with artistic excellence
          </p>
        </div>

        {/* Albums Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {albums.map((album) => (
            <div
              key={album.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Album Image */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={album.image}
                  alt={album.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span 
                    className="inline-block px-3 py-1 bg-royal-red rounded-full text-xs font-medium mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {album.category}
                  </span>
                  <h3 
                    className="text-xl font-bold mb-1" 
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {album.title}
                  </h3>
                  <p 
                    className="text-sm opacity-90" 
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {album.photos} Photos
                  </p>
                </div>
              </div>

              {/* Static Info (visible on mobile) */}
              <div className="lg:hidden p-4 bg-white">
                <span 
                  className="inline-block px-3 py-1 bg-royal-red text-white rounded-full text-xs font-medium mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {album.category}
                </span>
                <h3 
                  className="text-lg font-bold text-text mb-1" 
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {album.title}
                </h3>
                <p 
                  className="text-sm text-muted" 
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {album.photos} Photos
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <Link
            href="/photoshoot"
            className="inline-flex items-center px-8 py-4 bg-royal-red text-white font-semibold rounded-lg hover:bg-royal-red-hover transition-colors duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span>See More Albums</span>
            <svg 
              className="ml-2 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}