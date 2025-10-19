'use client';

import { useState, useEffect } from 'react';
import { Bars3Icon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileDrawer from './MobileDrawer';
import SearchBar from './SearchBar';
import { useHeaderData } from '../hooks/useHeaderData';
import { getSocialMediaIcon } from '../utils/socialIcons';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Photoshoot', href: '/photoshoot' },
  { name: 'Films/Portfolio', href: '/portfolio' },
  { name: 'Associate Vendors', href: '/vendors' },
  { name: 'Blog', href: '/blog' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Shopping', href: 'https://store.chobighar.com' },
];

const desktopMenuItems = [
  { name: 'Photoshoot', href: '/photoshoot' },
  { name: 'Films/Portfolio', href: '/portfolio' },
  { name: 'Associate Vendors', href: '/vendors' },
  { name: 'Blog', href: '/blog' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Shopping', href: 'https://store.chobighar.com' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [hasPWABanner, setHasPWABanner] = useState(false);
  const pathname = usePathname();
  
  // Get dynamic header data
  const { headerData, loading, error } = useHeaderData();

  // Check if PWA banner is visible
  useEffect(() => {
    // Listen for PWA banner visibility changes
    const handleBannerVisible = () => {
      setHasPWABanner(true);
    };
    
    const handleBannerHidden = () => {
      setHasPWABanner(false);
    };
    
    window.addEventListener('pwa-banner-visible', handleBannerVisible);
    window.addEventListener('pwa-banner-hidden', handleBannerHidden);
    window.addEventListener('appinstalled', handleBannerHidden);

    // Check initial state
    const checkInitialState = () => {
      try {
        // Check if app is installed
        const isInstalled = 
          window.matchMedia('(display-mode: standalone)').matches || 
          (window.navigator as any).standalone === true ||
          document.referrer.includes('android-app://');
        
        if (isInstalled) {
          setHasPWABanner(false);
          return;
        }

        // Check localStorage
        const stored = localStorage.getItem('pwa-banner-state');
        if (!stored) {
          setHasPWABanner(false);
          return;
        }

        const state = JSON.parse(stored);
        if (state.installedOnce) {
          setHasPWABanner(false);
          return;
        }

        const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000;
        if (state.dismissed) {
          const timeSinceDismiss = Date.now() - state.dismissedAt;
          setHasPWABanner(timeSinceDismiss >= DISMISS_DURATION);
        } else {
          setHasPWABanner(true);
        }
      } catch {
        setHasPWABanner(false);
      }
    };

    checkInitialState();

    return () => {
      window.removeEventListener('pwa-banner-visible', handleBannerVisible);
      window.removeEventListener('pwa-banner-hidden', handleBannerHidden);
      window.removeEventListener('appinstalled', handleBannerHidden);
    };
  }, []);

  // Handle scroll effect for navbar shadow and hiding top strip
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 4);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header 
      className={`sticky z-50 transition-all duration-300 ease-in-out ${
        hasPWABanner ? 'top-[52px] sm:top-[58px]' : 'top-0'
      }`}
    >
      {/* Royal Red Top Strip - Clean and Simple - Hide on scroll */}
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isScrolled ? 'h-0 opacity-0' : 'h-8 md:h-9 opacity-100'
        }`}
        style={{ 
          backgroundColor: '#B22222',
          color: 'white'
        }}
      >
        <div 
          className={`w-full mx-auto px-4 sm:px-6 lg:px-8 h-8 md:h-9 flex items-center justify-between transition-opacity duration-300 ${
            isScrolled ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
        >
          {/* Social Icons - Clean and professional */}
          <div className="flex items-center gap-2 md:gap-3">
            {headerData?.social_media?.filter(social => social.is_active).map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-all duration-200 hover:scale-105 flex items-center justify-center"
                aria-label={social.display_name}
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
              >
                <span className="w-4 h-4 md:w-4 md:h-4 flex items-center justify-center">
                  {getSocialMediaIcon(social.name)}
                </span>
              </a>
            ))}
          </div>

          {/* Contact Info - Red and white styling with text shadow for readability */}
          <div 
            className="hidden sm:flex items-center gap-3 md:gap-4 text-white text-sm"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
          >
            {headerData?.contact_info && (
              <>
                <a
                  href={`tel:${headerData.contact_info.phone}`}
                  className="flex items-center gap-1.5 hover:text-white/80 transition-colors duration-200"
                  aria-label="Call us"
                >
                  <PhoneIcon className="w-3.5 h-3.5" />
                  <span className="font-semibold text-[13px]">{headerData.contact_info.phone}</span>
                </a>
                <span className="text-white/50">|</span>
                <a
                  href={`mailto:${headerData.contact_info.email}`}
                  className="flex items-center gap-1.5 hover:text-white/80 transition-colors duration-200"
                  aria-label="Email us"
                >
                  <EnvelopeIcon className="w-3.5 h-3.5" />
                  <span className="font-semibold text-[13px]">{headerData.contact_info.email}</span>
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar with Soft White Background */}
      <nav
        className={`border-b transition-all duration-300 ease-in-out ${
          isScrolled ? 'shadow-md h-12 md:h-14' : 'shadow-sm h-14 md:h-16'
        }`}
        style={{ 
          backgroundColor: '#FAF9F6',
          borderColor: '#707070'
        }}
      >
        <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ease-in-out ${
          isScrolled ? 'h-12 md:h-14' : 'h-14 md:h-16'
        }`}>
          {/* Brand with Logo - Professional styling */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity group"
          >
            {/* Logo Image */}
            {headerData?.brand_info?.logo_image_url && (
              <div className="relative">
                <Image
                  src={headerData.brand_info.logo_image_url}
                  alt={`${headerData.brand_info.main_text} Logo`}
                  width={isScrolled ? 32 : 40}
                  height={isScrolled ? 32 : 40}
                  className="rounded-full object-cover border-2 group-hover:opacity-90 transition-all duration-300"
                  style={{ borderColor: 'rgba(178, 34, 34, 0.2)' }}
                  priority
                />
              </div>
            )}
            
            {/* Brand Text - Clean and professional with Royal Red */}
            {headerData?.brand_info && (
              <div className="flex flex-col">
                <span
                  className={`font-semibold tracking-tight group-hover:opacity-90 transition-all duration-300 ${
                    isScrolled ? 'text-base md:text-lg' : 'text-lg md:text-xl'
                  }`}
                  style={{ 
                    fontFamily: 'Playfair Display, serif',
                    color: '#B22222'
                  }}
                >
                  {headerData.brand_info.main_text}
                </span>
                <span
                  className={`font-medium tracking-wide -mt-0.5 transition-all duration-300 ${
                    isScrolled ? 'text-[8px] md:text-[9px]' : 'text-[9px] md:text-[10px]'
                  }`}
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    color: '#707070'
                  }}
                >
                  {headerData.brand_info.sub_text}
                </span>
                {/* Simple underline accent with Royal Red */}
                <div 
                  className="h-0.5 rounded-full transition-opacity group-hover:opacity-80" 
                  style={{ backgroundColor: '#B22222' }}
                ></div>
              </div>
            )}
          </Link>

          {/* Desktop Navigation with Bengali-inspired hover effects */}
          <nav className={`hidden lg:flex items-center gap-4 xl:gap-6 transition-all duration-300 ${
            isSearchExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            {desktopMenuItems.map((item) => {
              const isActive = pathname === item.href;
              const isShopping = item.name === 'Shopping';
              const isContact = item.name === 'Contact Us';
              
              if (isShopping) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded-lg font-medium text-sm transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-lg transform"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {/* Shopping Bag SVG */}
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5"
                    >
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                    <span>{item.name}</span>
                  </Link>
                );
              }

              if (isContact) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-300 relative ${
                      isActive
                        ? 'font-semibold'
                        : 'hover:opacity-80 bengali-underline'
                    }`}
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: isActive ? '#B22222' : '#1C1C1C'
                    }}
                  >
                    {/* Contact Icon */}
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <span>{item.name}</span>
                    {/* Active state underline - Clean and professional with Royal Red */}
                    {isActive && (
                      <div 
                        className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full" 
                        style={{ backgroundColor: '#B22222' }}
                      ></div>
                    )}
                  </Link>
                );
              }
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-all duration-300 relative ${
                    isActive
                      ? 'font-semibold'
                      : 'hover:opacity-80 bengali-underline'
                  }`}
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    color: isActive ? '#B22222' : '#1C1C1C'
                  }}
                >
                  {item.name}
                  {/* Active state underline - Clean and professional with Royal Red */}
                  {isActive && (
                    <div 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: '#B22222' }}
                    ></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Enhanced Search Component */}
            <div className="hidden md:block">
              <SearchBar onExpandedChange={setIsSearchExpanded} />
            </div>
            
            {/* Mobile Search */}
            <div className="md:hidden">
              <SearchBar isMobile />
            </div>

            {/* Mobile Menu Button with Royal Red styling */}
            <button
              type="button"
              className="lg:hidden p-2 hover:opacity-80 transition-all duration-200 rounded-full relative group"
              style={{ color: '#707070' }}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label="Open navigation menu"
            >
              <Bars3Icon className="w-6 h-6" />
              {/* Decorative accent with Royal Red */}
              <div 
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full group-hover:opacity-80 transition-opacity"
                style={{ backgroundColor: 'rgba(178, 34, 34, 0.3)' }}
              ></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        headerData={headerData}
      />
    </header>
  );
}
