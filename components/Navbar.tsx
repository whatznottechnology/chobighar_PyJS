'use client';

import { useState, useEffect } from 'react';
import { Bars3Icon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileDrawer from './MobileDrawer';
import SearchBar from './SearchBar';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Photoshoot', href: '/photoshoot' },
  { name: 'Films/Portfolio', href: '/portfolio' },
  { name: 'Associate Vendors', href: '/vendors' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Shopping', href: '/shopping' },
];

const desktopMenuItems = [
  { name: 'Photoshoot', href: '/photoshoot' },
  { name: 'Films/Portfolio', href: '/portfolio' },
  { name: 'Associate Vendors', href: '/vendors' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Shopping', href: '/shopping' },
];

const socialIcons = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[19px] h-[19px]">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[19px] h-[19px]">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[19px] h-[19px]">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[19px] h-[19px]">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const pathname = usePathname();

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
    <header className="sticky top-0 z-50">
      {/* Royal Red Top Strip - Clean and Simple - Hide on scroll */}
      <div 
        className={`transition-all duration-300 ${
          isScrolled ? 'h-0' : 'h-10'
        }`}
        style={{ 
          backgroundColor: '#B22222',
          color: 'white'
        }}
      >
        <div 
          className={`w-full mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between transition-opacity duration-300 ${
            isScrolled ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
        >
          {/* Social Icons - Clean and professional */}
          <div className="flex items-center gap-3 -translate-y-0.5">
            {socialIcons.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-white hover:text-white/80 transition-all duration-200 hover:scale-105 flex items-center justify-center"
                aria-label={social.name}
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Contact Info - Red and white styling with text shadow for readability */}
          <div 
            className="hidden sm:flex items-center gap-4 text-white"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
          >
            <a
              href="tel:+919647966765"
              className="flex items-center gap-2 hover:text-white/80 transition-colors duration-200"
              aria-label="Call us"
            >
              <PhoneIcon className="w-4 h-4" />
              <span className="font-bold text-[15px]">+91 96479 66765</span>
            </a>
            <span className="text-white/60">|</span>
            <a
              href="mailto:booking@chabighar.com"
              className="flex items-center gap-2 hover:text-white/80 transition-colors duration-200"
              aria-label="Email us"
            >
              <EnvelopeIcon className="w-4 h-4" />
              <span className="font-bold text-[15px]">booking@chabighar.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar with Soft White Background */}
      <nav
        className={`border-b transition-all duration-300 ${
          isScrolled ? 'shadow-md h-12' : 'shadow-sm h-16'
        }`}
        style={{ 
          backgroundColor: '#FAF9F6',
          borderColor: '#707070'
        }}
      >
        <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-12' : 'h-16'
        }`}>
          {/* Brand with Logo - Professional styling */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity group"
          >
            {/* Logo Image */}
            <div className="relative">
              <Image
                src="/img/chabighar.png"
                alt="Chabighar Logo"
                width={isScrolled ? 36 : 44}
                height={isScrolled ? 36 : 44}
                className="rounded-full object-cover border-2 group-hover:opacity-90 transition-all duration-300"
                style={{ borderColor: 'rgba(178, 34, 34, 0.2)' }}
                priority
              />
            </div>
            
            {/* Brand Text - Clean and professional with Royal Red */}
            <div className="flex flex-col">
              <span
                className={`font-semibold tracking-tight group-hover:opacity-90 transition-all duration-300 ${
                  isScrolled ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
                }`}
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  color: '#B22222'
                }}
              >
                Chabighar
              </span>
              <span
                className={`font-medium tracking-wide -mt-1 transition-all duration-300 ${
                  isScrolled ? 'text-[9px] md:text-[10px]' : 'text-[10px] md:text-xs'
                }`}
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#707070'
                }}
              >
                (Art Direction and Design Studio)
              </span>
              {/* Simple underline accent with Royal Red */}
              <div 
                className="h-0.5 rounded-full transition-opacity group-hover:opacity-80 mt-0.5" 
                style={{ backgroundColor: '#B22222' }}
              ></div>
            </div>
          </Link>

          {/* Desktop Navigation with Bengali-inspired hover effects */}
          <nav className={`hidden lg:flex items-center gap-6 lg:gap-8 transition-all duration-300 ${
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
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-medium transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-lg transform"
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
                      className="w-4 h-4"
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
                    className={`flex items-center gap-2 text-sm md:text-base font-medium transition-all duration-300 relative ${
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
                      className="w-4 h-4"
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
                  className={`text-sm md:text-base font-medium transition-all duration-300 relative ${
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
      />
    </header>
  );
}
