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
  { name: 'Shopping', href: '/shopping' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Policies', href: '/policies' },
];

const socialIcons = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
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

  // Handle scroll effect for navbar shadow
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
      {/* Royal Red Top Strip with Subtle Bengali Pattern */}
      <div 
        className="h-10 relative" 
        style={{ 
          backgroundColor: '#B22222',
          color: 'white'
        }}
      >
        {/* Pure Lotus Flowers Only - Dense Pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 60 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='lotus-dense' x='0' y='0' width='60' height='50' patternUnits='userSpaceOnUse'%3E%3C!-- Main lotus flower centered and moved up --%3E%3Cg transform='translate(30,15) scale(0.12)' fill='%23D4AF37' opacity='0.4'%3E%3Cpath d='M247.01172,123.28906a11.85553,11.85553,0,0,0-7.37305-5.60156,77.94121,77.94121,0,0,0-31.98633-1.02295c4.53907-19.72266,1.623-35.25342-1.313-44.29346a11.96839,11.96839,0,0,0-13.90821-8.02832A79.74731,79.74731,0,0,0,163.7168,77.08984a90.58717,90.58717,0,0,0-28.51075-37.08007,11.96508,11.96508,0,0,0-14.4121.001A90.57885,90.57885,0,0,0,92.2832,77.08984,79.74932,79.74932,0,0,0,63.56934,64.34277a11.96879,11.96879,0,0,0-13.9087,8.0293c-2.936,9.03906-5.852,24.57031-1.313,44.29248a77.95793,77.95793,0,0,0-31.98633,1.02295,11.95881,11.95881,0,0,0-8.53711,14.78711c3.375,12.06641,13.74512,35.02832,45.28613,53.23828C84.7749,203.99414,112.87842,204,127.98438,204l.01171.001L128,204.00049l.00391.00049.01171-.001c15.106,0,43.20948-.00586,74.874-18.28711,31.541-18.21,41.91113-41.17187,45.28613-53.23828A11.85252,11.85252,0,0,0,247.01172,123.28906ZM194.0957,72.167a3.99548,3.99548,0,0,1,4.63477,2.67578c2.9082,8.95411,5.76953,24.98682-.32813,45.53614a4.02737,4.02737,0,0,0-.189.64795,108.397,108.397,0,0,1-9.96484,22.61962,128.53907,128.53907,0,0,1-33.57569,37.61817c-.83642.63183-1.667,1.23877-2.49316,1.832C162.28223,169.79688,172,149.374,172,120a112.06092,112.06092,0,0,0-5.37451-35.16748A72.28407,72.28407,0,0,1,194.0957,72.167ZM125.5791,46.42188a4.01863,4.01863,0,0,1,4.8418-.001C140.51709,53.957,164,76.21289,164,120c0,23.05664-6.36133,42.9209-18.90625,59.041A75.7999,75.7999,0,0,1,128,195.28613,75.7999,75.7999,0,0,1,110.90625,179.041C98.36133,162.9209,92,143.05664,92,120,92,76.21289,115.48291,53.957,125.5791,46.42188ZM57.26953,74.84375A3.99483,3.99483,0,0,1,61.90479,72.167,72.28121,72.28121,0,0,1,89.374,84.83252,112.07816,112.07816,0,0,0,84,120c0,29.374,9.71777,49.79688,19.82031,63.09668-.82617-.59326-1.65674-1.2002-2.49316-1.832a128.53907,128.53907,0,0,1-33.57569-37.61817,108.334,108.334,0,0,1-9.99218-22.7124,3.98872,3.98872,0,0,0-.15918-.54638C51.499,99.834,54.36133,83.79834,57.26953,74.84375ZM15.52881,130.32031a3.95868,3.95868,0,0,1,2.81933-4.88281c6.94874-1.78125,18.09131-3.18555,32.38672-.18506a117.552,117.552,0,0,0,10.08838,22.394c12.8794,22.30762,31.65674,38.3501,46.84131,47.54493a124.27327,124.27327,0,0,1-50.5542-16.40625C28.02783,161.99414,18.5752,141.21289,15.52881,130.32031Zm224.94238,0c-3.04639,10.89258-12.499,31.67383-41.58154,48.46485a124.27327,124.27327,0,0,1-50.5542,16.40625c15.18457-9.19483,33.96191-25.23731,46.84131-47.54493a117.57532,117.57532,0,0,0,10.08789-22.39355c14.29541-3.001,25.43847-1.59668,32.38721.18457a3.95868,3.95868,0,0,1,2.81933,4.88281Z' /%3E%3C/g%3E%3C!-- Additional lotus flowers for dense pattern moved up with gaps --%3E%3Cg transform='translate(5,15) scale(0.09)' fill='%23D4AF37' opacity='0.35'%3E%3Cpath d='M247.01172,123.28906a11.85553,11.85553,0,0,0-7.37305-5.60156,77.94121,77.94121,0,0,0-31.98633-1.02295c4.53907-19.72266,1.623-35.25342-1.313-44.29346a11.96839,11.96839,0,0,0-13.90821-8.02832A79.74731,79.74731,0,0,0,163.7168,77.08984a90.58717,90.58717,0,0,0-28.51075-37.08007,11.96508,11.96508,0,0,0-14.4121.001A90.57885,90.57885,0,0,0,92.2832,77.08984,79.74932,79.74932,0,0,0,63.56934,64.34277a11.96879,11.96879,0,0,0-13.9087,8.0293c-2.936,9.03906-5.852,24.57031-1.313,44.29248a77.95793,77.95793,0,0,0-31.98633,1.02295,11.95881,11.95881,0,0,0-8.53711,14.78711c3.375,12.06641,13.74512,35.02832,45.28613,53.23828C84.7749,203.99414,112.87842,204,127.98438,204l.01171.001L128,204.00049l.00391.00049.01171-.001c15.106,0,43.20948-.00586,74.874-18.28711,31.541-18.21,41.91113-41.17187,45.28613-53.23828A11.85252,11.85252,0,0,0,247.01172,123.28906Z' /%3E%3C/g%3E%3Cg transform='translate(55,15) scale(0.09)' fill='%23D4AF37' opacity='0.35'%3E%3Cpath d='M247.01172,123.28906a11.85553,11.85553,0,0,0-7.37305-5.60156,77.94121,77.94121,0,0,0-31.98633-1.02295c4.53907-19.72266,1.623-35.25342-1.313-44.29346a11.96839,11.96839,0,0,0-13.90821-8.02832A79.74731,79.74731,0,0,0,163.7168,77.08984a90.58717,90.58717,0,0,0-28.51075-37.08007,11.96508,11.96508,0,0,0-14.4121.001A90.57885,90.57885,0,0,0,92.2832,77.08984,79.74932,79.74932,0,0,0,63.56934,64.34277a11.96879,11.96879,0,0,0-13.9087,8.0293c-2.936,9.03906-5.852,24.57031-1.313,44.29248a77.95793,77.95793,0,0,0-31.98633,1.02295,11.95881,11.95881,0,0,0-8.53711,14.78711c3.375,12.06641,13.74512,35.02832,45.28613,53.23828C84.7749,203.99414,112.87842,204,127.98438,204l.01171.001L128,204.00049l.00391.00049.01171-.001c15.106,0,43.20948-.00586,74.874-18.28711,31.541-18.21,41.91113-41.17187,45.28613-53.23828A11.85252,11.85252,0,0,0,247.01172,123.28906Z' /%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='60' height='50' fill='url(%23lotus-dense)'/%3E%3C/svg%3E")`,
            backgroundSize: '50px 40px',
            backgroundRepeat: 'repeat'
          }}
        ></div>
        <div 
          className="w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between relative z-10"
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
            className="hidden sm:flex items-center gap-4 text-sm text-white font-medium"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
          >
            <a
              href="tel:+919647966765"
              className="flex items-center gap-2 hover:text-white/80 transition-colors duration-200"
              aria-label="Call us"
            >
              <PhoneIcon className="w-4 h-4" />
              <span className="font-medium">+91 96479 66765</span>
            </a>
            <span className="text-white/60">|</span>
            <a
              href="mailto:booking@chabighar.com"
              className="flex items-center gap-2 hover:text-white/80 transition-colors duration-200"
              aria-label="Email us"
            >
              <EnvelopeIcon className="w-4 h-4" />
              <span className="font-medium">booking@chabighar.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar with Soft White Background */}
      <nav
        className={`border-b transition-shadow duration-200 ${
          isScrolled ? 'shadow-md' : 'shadow-sm'
        }`}
        style={{ 
          backgroundColor: '#FAF9F6',
          borderColor: '#707070'
        }}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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
                width={40}
                height={40}
                className="rounded-full object-cover border-2 group-hover:opacity-90 transition-opacity"
                style={{ borderColor: 'rgba(178, 34, 34, 0.2)' }}
                priority
              />
            </div>
            
            {/* Brand Text - Clean and professional with Royal Red */}
            <div className="flex flex-col">
              <span
                className="text-2xl md:text-3xl font-semibold tracking-tight group-hover:opacity-90 transition-opacity"
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  color: '#B22222'
                }}
              >
                Chabighar
              </span>
              {/* Simple underline accent with Royal Red */}
              <div 
                className="h-0.5 rounded-full transition-opacity group-hover:opacity-80" 
                style={{ backgroundColor: '#B22222' }}
              ></div>
            </div>
          </Link>

          {/* Desktop Navigation with Bengali-inspired hover effects */}
          <nav className={`hidden lg:flex items-center gap-6 lg:gap-8 transition-all duration-300 ${
            isSearchExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
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
