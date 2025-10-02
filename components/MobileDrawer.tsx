'use client';

import { useEffect, useRef } from 'react';
import { XMarkIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useHeaderData } from '../hooks/useHeaderData';
import { getSocialMediaIcon } from '../utils/socialIcons';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  headerData?: {
    social_media: Array<{
      id: number;
      name: string;
      display_name: string;
      url: string;
      is_active: boolean;
    }>;
    contact_info: {
      phone: string;
      email: string;
    };
    brand_info: {
      logo_image: string | null;
      logo_image_url: string | null;
      main_text: string;
      sub_text: string;
    };
  } | null;
}

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Photoshoot', href: '/photoshoot' },
  { name: 'Films/Portfolio', href: '/portfolio' },
  { name: 'Associate Vendors', href: '/vendors' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Shopping', href: '/shopping' },
];

export default function MobileDrawer({ isOpen, onClose, headerData: propHeaderData }: MobileDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // Get dynamic header data from hook or use prop data
  const { headerData: hookHeaderData, loading, error } = useHeaderData();
  const headerData = propHeaderData || hookHeaderData;

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
            {headerData?.brand_info && (
              <div className="flex items-center space-x-3">
                {/* Logo Image */}
                {headerData.brand_info.logo_image_url && (
                  <div className="relative">
                    <Image
                      src={headerData.brand_info.logo_image_url}
                      alt={`${headerData.brand_info.main_text} Logo`}
                      width={32}
                      height={32}
                      className="rounded-full object-cover border-2"
                      style={{ borderColor: 'rgba(178, 34, 34, 0.2)' }}
                      priority
                    />
                  </div>
                )}
                
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
                    {headerData.brand_info.main_text}
                  </h2>
                  {/* Simple accent line with Royal Red */}
                  <div 
                    className="h-0.5 rounded-full"
                    style={{ backgroundColor: 'rgba(178, 34, 34, 0.6)' }}
                  ></div>
                </div>
              </div>
            )}
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

          {/* Social Icons - Clean professional styling with reduced gap */}
          <div 
            className="px-6 py-4 border-b"
            style={{ borderColor: '#707070' }}
          >
            <div className="flex items-center justify-center gap-4">
              {headerData?.social_media?.filter(social => social.is_active).map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-200 hover:scale-110 p-1.5 rounded-lg hover:opacity-80 flex items-center justify-center"
                  style={{ 
                    color: '#707070',
                    width: '36px',
                    height: '36px'
                  }}
                  aria-label={social.display_name}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    {getSocialMediaIcon(social.name, true)}
                  </div>
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
              {headerData?.contact_info && (
                <>
                  <a
                    href={`tel:${headerData.contact_info.phone}`}
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
                      {headerData.contact_info.phone}
                    </span>
                  </a>
                  <a
                    href={`mailto:${headerData.contact_info.email}`}
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
                      {headerData.contact_info.email}
                    </span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
