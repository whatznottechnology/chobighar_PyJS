'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MagnifyingGlassIcon, ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import MasonryGallery from './MasonryGallery';

interface Album {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  photos: number;
  description: string;
  previewImages: string[];
  date: string;
  location: string;
}

const albums: Album[] = [
  {
    id: 'priya-arjun-wedding',
    title: 'Priya & Arjun Wedding',
    subtitle: 'Traditional Bengali Wedding',
    image: '/img/bridalwear.jpg',
    category: 'Wedding Photography',
    photos: 85,
    description: 'A beautiful traditional Bengali wedding celebration filled with rituals, colors, and joy.',
    previewImages: ['/img/bridalwear.jpg', '/img/groomwear.jpg', '/img/venues.jpg', '/img/jewellery.jpg'],
    date: 'December 2024',
    location: 'Kolkata'
  },
  {
    id: 'sneha-rahul-prewedding',
    title: 'Sneha & Rahul',
    subtitle: 'Pre-Wedding Shoot',
    image: '/img/prewedding.jpg',
    category: 'Pre-Wedding',
    photos: 45,
    description: 'Romantic pre-wedding session in the beautiful hills capturing love and connection.',
    previewImages: ['/img/prewedding.jpg', '/img/1.jpg', '/img/2.jpg', '/img/venues.jpg'],
    date: 'November 2024',
    location: 'Darjeeling'
  },
  {
    id: 'kavya-portrait',
    title: 'Kavya Portrait Session',
    subtitle: 'Individual Portraits',
    image: '/img/groomwear.jpg',
    category: 'Portrait',
    photos: 28,
    description: 'Elegant portrait session showcasing grace, beauty and traditional attire.',
    previewImages: ['/img/groomwear.jpg', '/img/makeup.jpg', '/img/jewellery.jpg', '/img/bridalwear.jpg'],
    date: 'October 2024',
    location: 'Studio'
  },
  {
    id: 'ravi-meera-destination',
    title: 'Ravi & Meera Destination Wedding',
    subtitle: 'Royal Palace Wedding',
    image: '/img/venues.jpg',
    category: 'Destination Wedding',
    photos: 120,
    description: 'Grand destination wedding at a royal palace with magnificent architecture.',
    previewImages: ['/img/venues.jpg', '/img/planning.jpg', '/img/food.jpg', '/img/photographers.jpg'],
    date: 'September 2024',
    location: 'Rajasthan'
  },
  {
    id: 'traditional-ceremonies',
    title: 'Traditional Ceremonies Collection',
    subtitle: 'Mehendi & Sangeet',
    image: '/img/mehndi.jpg',
    category: 'Ceremony',
    photos: 42,
    description: 'Vibrant traditional ceremonies filled with music, dance and intricate henna designs.',
    previewImages: ['/img/mehndi.jpg', '/img/music.jpg', '/img/makeup.jpg', '/img/jewellery.jpg'],
    date: 'August 2024',
    location: 'Mumbai'
  },
  {
    id: 'luxury-details',
    title: 'Luxury Wedding Details',  
    subtitle: 'Jewelry & Decor Focus',
    image: '/img/jewellery.jpg',
    category: 'Details',
    photos: 25,
    description: 'Exquisite details of luxury wedding jewelry, decor and intricate craftsmanship.',
    previewImages: ['/img/jewellery.jpg', '/img/invites.jpg', '/img/planning.jpg', '/img/venues.jpg'],
    date: 'July 2024',
    location: 'Delhi'
  }
];

export default function AlbumsShowcase() {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute top-0 left-0 w-1/3 lg:w-1/4">
        <img
          src="/img/12873194_7666-removebg-preview.png"
          alt="Background decoration"
          className="w-full h-auto object-contain opacity-10"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-1/3 lg:w-2/5">
        <img
          src="/img/62569719_9509225.png"
          alt="Background decoration"
          className="w-full h-auto object-contain opacity-10"
        />
      </div>

      {/* Enhanced Decorative Background Elements - Same as FAQ */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-royal-red/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-royal-red/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-royal-red/2 rounded-full blur-3xl"></div>
      
      {/* Subtle gradient overlay at bottom to match footer */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-royal-red/5 to-transparent"></div>
      
      <div className="w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-royal-red"></div>
            <span 
              className="text-royal-red font-medium tracking-wider uppercase text-sm"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Our Portfolio
            </span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-royal-red"></div>
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Captured <span className="text-royal-red">Moments</span> & Stories
          </h2>
          <p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Every frame tells a story, every moment becomes a memory. Explore our recent work showcasing the beauty and artistry of life's celebrations.
          </p>
        </div>

        {/* Scrollable Albums Container */}
        <div className="relative mb-16">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
              !canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
            disabled={!canScrollLeft}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
              !canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
            disabled={!canScrollRight}
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {albums.map((album) => (
              <div key={album.id} className="group flex-shrink-0">
                {/* Compact Card Container */}
                <div 
                  className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 w-80 cursor-pointer"
                  onClick={() => router.push(`/portfolio/${album.id}`)}
                >
                  {/* Album Cover */}
                  <div className="relative overflow-hidden rounded-t-2xl aspect-[4/3]">
                    <Image
                      src={album.image}
                      alt={album.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    {/* Photo Count Badge */}
                    <div className="absolute top-3 left-3">
                      <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md">
                        <span className="text-royal-red font-bold text-xs">{album.photos}</span>
                        <span className="text-gray-600 text-xs ml-1">photos</span>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-royal-red/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium">
                        {album.category}
                      </span>
                    </div>

                    {/* View Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/portfolio/${album.id}`);
                        }}
                        className="bg-white/20 backdrop-blur-md border border-white/30 text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                      >
                        <MagnifyingGlassIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Compact Content */}
                  <div className="p-4">
                    {/* Title */}
                    <h3 
                      className="text-lg font-bold text-gray-900 group-hover:text-royal-red transition-colors duration-300 mb-1 line-clamp-1"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {album.title}
                    </h3>
                    
                    {/* Subtitle */}
                    <p className="text-royal-red/80 font-medium text-sm mb-2 line-clamp-1">{album.subtitle}</p>
                    
                    {/* Location & Date */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {album.location}
                      </span>
                      <span>{album.date}</span>
                    </div>

                    {/* Mini Preview Images */}
                    <div className="flex items-center gap-2 mb-3">
                      {album.previewImages.slice(0, 3).map((image, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer group/img border border-gray-200 shadow-sm"
                        >
                          <Image
                            src={image}
                            alt={`Preview ${idx + 1}`}
                            width={32}
                            height={32}
                            className="object-cover transition-transform duration-300 group-hover/img:scale-110"
                          />
                        </div>
                      ))}
                      <span className="text-xs text-gray-500 ml-auto font-medium">+{album.photos - 3} more</span>
                    </div>

                    {/* Compact CTA Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/portfolio/${album.id}`);
                      }}
                      className="group/btn w-full bg-black hover:bg-royal-red text-white font-medium py-2 px-3 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-md"
                    >
                      <span>View Gallery</span>
                      <ArrowRightIcon className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* View All Card */}
            <div className="flex-shrink-0 w-80">
              <div className="h-full bg-gradient-to-br from-royal-red via-red-800 to-red-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRightIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                    View All
                  </h3>
                  <p className="text-white/80 text-sm mb-6">
                    Explore our complete portfolio with {albums.length * 15}+ collections
                  </p>
                  <Link
                    href="/portfolio"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 inline-flex items-center gap-2 border border-white/30 hover:scale-105"
                  >
                    <span>Explore Portfolio</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="flex justify-center mt-6 md:hidden">
          <div className="flex gap-2">
            {albums.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300"
              ></div>
            ))}
          </div>
        </div>

        {/* Masonry Gallery - 2 Rows Full Width */}
        <div className="mb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">            
            {/* Gallery Grid - 2 Rows */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
              {/* Row 1 - Top Row */}
              <div className="col-span-1 md:col-span-2 lg:col-span-2">
                <div className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500">
                  <Image
                    src="/img/bridalwear.jpg"
                    alt="Wedding ceremony"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-semibold text-sm">Traditional Wedding</h4>
                  </div>
                </div>
              </div>

              <div className="col-span-1">
                <div className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500">
                  <Image
                    src="/img/jewellery.jpg"
                    alt="Bridal jewelry"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-semibold text-xs">Jewelry Details</h4>
                  </div>
                </div>
              </div>

              <div className="col-span-1">
                <div className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500">
                  <Image
                    src="/img/makeup.jpg"
                    alt="Bridal makeup"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-semibold text-xs">Bridal Makeup</h4>
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-1 lg:col-span-2">
                <div className="group relative aspect-[3/2] rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500">
                  <Image
                    src="/img/venues.jpg"
                    alt="Wedding venue"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-semibold text-sm">Elegant Venues</h4>
                  </div>
                </div>
              </div>

              {/* Row 2 - Bottom Row */}
              <div className="col-span-1">
                <div className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500">
                  <Image
                    src="/img/mehndi.jpg"
                    alt="Mehndi ceremony"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-semibold text-xs">Mehndi Art</h4>
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <div className="group relative aspect-[2/1] rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500">
                  <Image
                    src="/img/prewedding.jpg"
                    alt="Pre-wedding shoot"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-semibold text-sm">Pre-Wedding Romance</h4>
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-1 lg:col-span-2">
                <div className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500">
                  <Image
                    src="/img/groomwear.jpg"
                    alt="Groom portrait"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-semibold text-sm">Groom Style</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}