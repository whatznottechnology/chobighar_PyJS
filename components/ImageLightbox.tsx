'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import Image from 'next/image';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  alt?: string;
}

export default function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
  alt = 'Gallery image'
}: ImageLightboxProps) {
  // Touch/swipe states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;
  
  // Reset loading state when image changes
  useEffect(() => {
    setImageLoading(true);
  }, [currentIndex]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrevious();
  }, [onClose, onNext, onPrevious]);

  // Touch handlers for swipe navigation
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && images.length > 1) {
      onNext();
    }
    if (isRightSwipe && images.length > 1) {
      onPrevious();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  if (!images || images.length === 0 || currentIndex < 0 || currentIndex >= images.length) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
        aria-label="Close lightbox"
      >
        <XMarkIcon className="w-6 h-6" />
      </button>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="absolute left-2 sm:left-4 md:left-6 z-10 bg-white/10 backdrop-blur-md p-2 sm:p-3 rounded-full text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </button>
      )}

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 sm:right-4 md:right-6 z-10 bg-white/10 backdrop-blur-md p-2 sm:p-3 rounded-full text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
          aria-label="Next image"
        >
          <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </button>
      )}

      {/* Main Image Container - Responsive and Centered */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
          {/* Loading Spinner */}
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          
          <Image
            src={images[currentIndex]}
            alt={`${alt} ${currentIndex + 1}`}
            fill
            className={`object-contain transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
            priority
            quality={95}
            onLoadingComplete={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
        </div>
      </div>

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm font-medium shadow-lg">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Enhanced Instructions */}
      {images.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 md:hidden">
          <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-white text-xs border border-white/20">
            <div className="flex items-center gap-2">
              <span>←</span>
              <span>Swipe to navigate</span>
              <span>→</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Desktop Instructions */}
      <div className="absolute top-4 left-4 z-10 hidden md:block">
        <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-2 text-white text-xs border border-white/20">
          <div className="flex flex-col gap-1">
            <div>← → Arrow keys to navigate</div>
            <div>ESC to close</div>
          </div>
        </div>
      </div>
    </div>
  );
}
