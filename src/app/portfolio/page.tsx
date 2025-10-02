'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  PhotoIcon, 
  HeartIcon, 
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline';
import { usePortfolios, useCategoriesWithCount, usePortfolioVideos, usePortfolioImages } from '@/hooks/usePortfolio';
import InquiryModal from '../../../components/InquiryModal';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentAlbum, setCurrentAlbum] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data using custom hooks
  const { portfolios, loading: portfoliosLoading } = usePortfolios({ category: selectedCategory });
  const { categories, loading: categoriesLoading } = useCategoriesWithCount();
  const { videos: portfolioVideos, loading: videosLoading } = usePortfolioVideos();
  const { images: portfolioImages, loading: portfolioImagesLoading } = usePortfolioImages();

  // Back to top visibility handler
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Filter portfolios by selected category
  const filteredAlbums = portfolios;

  const openLightbox = (albumId: string, imageIndex: number) => {
    setCurrentAlbum(albumId);
    setSelectedImage(imageIndex);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentAlbum(null);
  };

  const nextImage = () => {
    if (currentAlbum && selectedImage !== null) {
      const album = portfolios.find(a => a.id === currentAlbum);
      if (album && album.images) {
        setSelectedImage((selectedImage + 1) % album.images.length);
      }
    }
  };

  const prevImage = () => {
    if (currentAlbum && selectedImage !== null) {
      const album = portfolios.find(a => a.id === currentAlbum);
      if (album && album.images) {
        setSelectedImage(selectedImage === 0 ? album.images.length - 1 : selectedImage - 1);
      }
    }
  };

  const currentAlbumData = currentAlbum ? portfolios.find(a => a.id === currentAlbum) : null;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center">
            <h1 
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: '#B22222'
              }}
            >
              Our Portfolio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our collection of beautiful moments captured through the lens. Each album tells a unique story of love, celebration, and life's precious memories.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categoriesLoading ? (
              <div className="flex gap-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 w-32 bg-gray-200 rounded-full animate-pulse"></div>
                ))}
              </div>
            ) : (
              categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category.id ? '#B22222' : '',
                    color: selectedCategory === category.id ? 'white' : ''
                  }}
                >
                  {category.name}
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Portfolio Albums Grid */}
      <section className="py-16 bg-white">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
          {portfoliosLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="group">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg mb-4 aspect-[4/3] bg-gray-200 animate-pulse"></div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              {filteredAlbums.map((album) => (
                <div key={album.id} className="group">
                  {/* Album Cover */}
                  <div className="relative overflow-hidden rounded-2xl shadow-lg mb-4 aspect-[4/3]">
                    {album.cover_image ? (
                      <Image
                        src={album.cover_image}
                        alt={album.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <PhotoIcon className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex justify-between items-end">
                          <div>
                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                              {album.image_count} Photos
                            </span>
                          </div>
                          <button
                            onClick={() => album.images && album.images.length > 0 && openLightbox(album.id, 0)}
                            className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                          >
                            <MagnifyingGlassIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Album Info */}
                  <div className="space-y-3">
                    <div>
                    <h3 
                        className="text-xl font-bold text-gray-900 group-hover:transition-colors"
                        style={{ 
                          fontFamily: 'Playfair Display, serif',
                          color: '#1f2937'
                        }}
                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#B22222'}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#1f2937'}
                      >
                        {album.title}
                      </h3>
                      <p 
                        className="font-medium text-sm"
                        style={{ color: '#B22222' }}
                      >
                        {album.subtitle}
                      </p>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {album.description}
                    </p>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{new Date(album.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                      <span>{album.location}</span>
                    </div>

                    {/* Photo Preview Grid */}
                    {album.images && album.images.length > 0 && (
                      <div className="grid grid-cols-4 gap-1 mt-4">
                        {album.images.slice(0, 4).map((image, idx) => (
                          <div
                            key={idx}
                            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group/img"
                            onClick={() => openLightbox(album.id, idx)}
                          >
                            {image.image ? (
                              <Image
                                src={image.image}
                                alt={`${album.title} ${idx + 1}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover/img:scale-110"
                                sizes="(max-width: 768px) 25vw, (max-width: 1200px) 16vw, 12vw"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <PhotoIcon className="w-4 h-4 text-gray-400" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200"></div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* View Album Button */}
                    <a
                      href={`/portfolio/${album.id}`}
                      className="block w-full mt-4 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg text-center hover:opacity-90"
                      style={{ 
                        backgroundColor: '#B22222'
                      }}
                    >
                      View Portfolio Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!portfoliosLoading && filteredAlbums.length === 0 && (
            <div className="text-center py-16">
              <PhotoIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No albums found</h3>
              <p className="text-gray-400">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Videos Gallery */}
      <section className="py-16 bg-white">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: '#1f2937'
              }}
            >
              Featured Wedding Videos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the magic through our cinematic wedding highlights and emotional moments captured on film.
            </p>
          </div>

          {videosLoading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-6 space-y-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="break-inside-avoid mb-6">
                  <div className="rounded-xl shadow-lg bg-gray-200 animate-pulse">
                    <div className="aspect-video bg-gray-300 rounded-t-xl"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded mb-3"></div>
                      <div className="flex justify-between">
                        <div className="h-3 bg-gray-300 rounded w-20"></div>
                        <div className="h-3 bg-gray-300 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-6 space-y-6">
              {portfolioVideos && portfolioVideos.map((video, index) => (
                <div key={video.id} className="break-inside-avoid mb-6">
                  <div className="relative overflow-hidden rounded-xl shadow-lg group bg-black">
                    <div className={`relative ${index % 4 === 0 ? 'aspect-video' : 
                                               index % 4 === 1 ? 'aspect-[9/16]' : 
                                               index % 4 === 2 ? 'aspect-video' : 'aspect-[4/5]'}`}>
                      <Image
                        src={video.thumbnail}
                        alt={`${video.title} thumbnail`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{video.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{video.description}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Wedding Video</span>
                        <a 
                          href={`https://www.youtube.com/watch?v=${video.video_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-700 font-medium"
                        >
                          Watch Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View All Videos Button */}
          <div className="text-center mt-12">
            <a
              href="/portfolio/videos"
              className="text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg inline-flex items-center gap-2 hover:opacity-90"
              style={{
                backgroundColor: '#B22222'
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              View All Wedding Videos
            </a>
          </div>
        </div>
      </section>

      {/* Individual Photos Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: '#1f2937'
              }}
            >
              Individual Photos Gallery
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our collection of stunning individual photographs captured across various events and occasions.
            </p>
          </div>

          {portfolioImagesLoading ? (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4 space-y-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="break-inside-avoid mb-4">
                  <div className="rounded-xl shadow-lg bg-gray-200 animate-pulse" style={{ height: `${200 + (i % 4) * 100}px` }}>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4 space-y-4">
              {portfolioImages && portfolioImages.map((image, index) => (
                <div key={image.id} className="break-inside-avoid mb-4">
                  <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                    {image.image && (
                      <Image
                        src={image.image}
                        alt={image.caption || `Portfolio Gallery Image ${index + 1}`}
                        width={400}
                        height={index % 4 === 0 ? 600 : index % 4 === 1 ? 300 : index % 4 === 2 ? 700 : 450}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-medium">
                          {image.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button 
              className="text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg inline-flex items-center gap-2 hover:scale-105 transform hover:opacity-90"
              style={{
                backgroundColor: '#B22222'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Load More Photos
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && currentAlbumData && currentAlbumData.images && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 z-10 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/20 active:bg-black transition-colors"
              style={{
                color: '#fbbf24'
              }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#f59e0b'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#fbbf24'}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 z-10 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/20 active:bg-black transition-colors"
              style={{
                color: '#fbbf24'
              }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#f59e0b'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#fbbf24'}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div className="relative max-w-5xl max-h-[80vh] w-full mx-4">
              <Image
                src={currentAlbumData.images[selectedImage].image}
                alt={`${currentAlbumData.title} ${selectedImage + 1}`}
                width={1200}
                height={800}
                className="object-contain w-full h-full"
                priority
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto">
                <h3 className="text-white font-semibold text-lg">{currentAlbumData.title}</h3>
                <p className="text-white/80 text-sm">
                  {selectedImage + 1} of {currentAlbumData.images.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section 
        className="py-20 text-white"
        style={{
          background: 'linear-gradient(135deg, #B22222 0%, #8B0000 50%, #B22222 100%)'
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <HeartIcon className="w-16 h-16 mx-auto mb-6" style={{ color: '#f87171' }} />
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ready to Create Your Own Album?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#f9fafb' }}>
            Let's capture your special moments and create beautiful memories that will last a lifetime. Get in touch with us to discuss your photography needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-lg hover:opacity-90"
              style={{
                backgroundColor: 'white',
                color: '#B22222'
              }}
            >
              Book a Session
            </button>
            <a
              href="/photoshoot"
              className="border-2 text-white px-8 py-4 rounded-xl font-semibold hover:text-current transition-colors inline-flex items-center justify-center gap-2"
              style={{
                borderColor: 'white'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'white';
                (e.target as HTMLElement).style.color = '#B22222';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
                (e.target as HTMLElement).style.color = 'white';
              }}
            >
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 transform hover:opacity-90"
          style={{
            backgroundColor: '#B22222'
          }}
          aria-label="Back to top"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inquiryType="photoshoot"
        serviceName="Photography Session"
        serviceId=""
        prefilledData={{
          subject: 'Photography Session Booking',
          message: 'Hi, I would like to book a photography session. Please provide more details about availability and pricing.'
        }}
      />
    </main>
  );
}
