'use client';

import { useEffect, useRef } from 'react';
import { XMarkIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Photoshoot', href: '/photoshoot' },
  { name: 'Films/Portfolio', href: '/portfolio' },
  { name: 'Associate Vendors', href: '/vendors' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Shopping', href: '/shopping' },
];

const socialIcons = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Focus management and keyboard trap
  useEffect(() => {
    if (isOpen) {
      // Focus close button when drawer opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 150);

      // Trap focus within drawer
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab' && drawerRef.current) {
          const focusableElements = drawerRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-200"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer with Soft White Background */}
      <div
        ref={drawerRef}
        className={`fixed inset-y-0 right-0 w-80 max-w-[88vw] shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#FAF9F6' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex flex-col h-full">
          {/* Header with Logo - Professional styling with new colors */}
          <div 
            className="flex items-center justify-between p-6 border-b-2"
            style={{ 
              backgroundColor: '#FAF9F6',
              borderColor: 'rgba(178, 34, 34, 0.1)'
            }}
          >
            <div className="flex items-center space-x-3">
              {/* Logo Image */}
              <div className="relative">
                <Image
                  src="/img/chabighar.png"
                  alt="Chabighar Logo"
                  width={32}
                  height={32}
                  className="rounded-full object-cover border-2"
                  style={{ borderColor: 'rgba(178, 34, 34, 0.2)' }}
                  priority
                />
              </div>
              
              {/* Brand Text - Clean and professional with Royal Red */}
              <div className="flex flex-col">
                <h2 
                  id="mobile-menu-title" 
                  className="text-lg font-semibold" 
                  style={{ 
                    fontFamily: 'Playfair Display, serif',
                    color: '#B22222'
                  }}
                >
                  Chabighar
                </h2>
                {/* Simple accent line with Royal Red */}
                <div 
                  className="h-0.5 rounded-full"
                  style={{ backgroundColor: 'rgba(178, 34, 34, 0.6)' }}
                ></div>
              </div>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              className="p-2 -mr-2 transition-colors rounded-full hover:opacity-80"
              style={{ color: '#707070' }}
              onClick={onClose}
              aria-label="Close navigation menu"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Social Icons - Clean professional styling with new colors */}
          <div 
            className="px-6 py-4 border-b"
            style={{ borderColor: '#707070' }}
          >
            <div className="flex items-center justify-center gap-6">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="transition-all duration-200 hover:scale-105 p-2 rounded-lg hover:opacity-80"
                  style={{ color: '#707070' }}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links with larger tap targets */}
          <nav className="flex-1 px-6 py-6">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                const isShopping = item.name === 'Shopping';
                
                if (isShopping) {
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="flex items-center justify-center gap-3 bg-black text-white px-4 py-4 text-lg font-medium transition-all duration-300 rounded-lg hover:bg-gray-800 hover:scale-105 hover:shadow-lg transform"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        onClick={onClose}
                      >
                        {/* Shopping Bag SVG */}
                        <svg 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                          <line x1="3" y1="6" x2="21" y2="6"/>
                          <path d="M16 10a4 4 0 01-8 0"/>
                        </svg>
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                }
                
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-4 text-lg font-medium transition-all duration-200 rounded-lg ${
                        isActive
                          ? 'border-l-4'
                          : 'hover:translate-x-1 hover:opacity-80'
                      }`}
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        color: isActive ? '#B22222' : '#1C1C1C',
                        backgroundColor: isActive ? 'rgba(178, 34, 34, 0.05)' : 'transparent',
                        borderColor: isActive ? '#B22222' : 'transparent'
                      }}
                      onClick={onClose}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Contact Info - Professional and clean with new colors */}
          <div 
            className="px-6 py-6 border-t"
            style={{ 
              borderColor: '#707070',
              backgroundColor: 'rgba(250, 249, 246, 0.8)'
            }}
          >
            <div className="space-y-4">
              <a
                href="tel:+919647966765"
                className="flex items-center gap-3 p-3 rounded-lg transition-colors group hover:opacity-80"
                style={{ backgroundColor: 'rgba(178, 34, 34, 0.05)' }}
              >
                <PhoneIcon 
                  className="w-5 h-5 group-hover:scale-105 transition-transform" 
                  style={{ color: '#B22222' }}
                />
                <span 
                  className="font-medium"
                  style={{ color: '#1C1C1C' }}
                >
                  +91 96479 66765
                </span>
              </a>
              <a
                href="mailto:booking@chabighar.com"
                className="flex items-center gap-3 p-3 rounded-lg transition-colors group hover:opacity-80"
                style={{ backgroundColor: 'rgba(178, 34, 34, 0.05)' }}
              >
                <EnvelopeIcon 
                  className="w-5 h-5 group-hover:scale-105 transition-transform" 
                  style={{ color: '#B22222' }}
                />
                <span 
                  className="font-medium"
                  style={{ color: '#1C1C1C' }}
                >
                  booking@chabighar.com
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
