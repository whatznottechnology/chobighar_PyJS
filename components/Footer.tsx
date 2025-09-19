'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  ClockIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

// Inline Social Icons
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.683 13.6 3.683 12c0-1.6.515-2.895 1.443-3.691.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.796 1.443 2.091 1.443 3.691 0 1.6-.515 2.895-1.443 3.691-.875.807-2.026 1.297-3.323 1.297zm7.74-9.079h-3.711c.015-.533.06-1.02.166-1.385.165-.557.404-.986.712-1.204.185-.14.404-.227.657-.227.252 0 .471.087.657.227.307.218.547.647.712 1.204.105.365.15.852.165 1.385h1.642V7.91z"/>
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-royal-red via-red-800 to-red-900 text-white relative overflow-hidden">
      {/* Decorative Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="jamdani-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.3"/>
                <path d="M10,5 Q15,10 10,15 Q5,10 10,5 Z" fill="currentColor" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#jamdani-pattern)"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
            
            {/* Company Info - More space */}
            <div className="lg:col-span-4">
              <div className="flex items-start space-x-3 mb-6">
                <Image
                  src="/img/chabighar.png"
                  alt="Chabighar"
                  width={50}
                  height={50}
                  className="rounded-lg shadow-lg flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Chabighar
                  </h3>
                  <p className="text-red-200 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    (Art Direction and Design Studio)
                  </p>
                </div>
              </div>
              <p className="text-red-100 mb-6 leading-relaxed">
                Professional photography and videography services capturing your most precious moments with artistic excellence and cultural authenticity.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                <a href="#" className="text-red-200 hover:text-white transition-colors duration-200 transform hover:scale-110">
                  <FacebookIcon className="w-6 h-6" />
                </a>
                <a href="#" className="text-red-200 hover:text-white transition-colors duration-200 transform hover:scale-110">
                  <InstagramIcon className="w-6 h-6" />
                </a>
                <a href="#" className="text-red-200 hover:text-white transition-colors duration-200 transform hover:scale-110">
                  <TwitterIcon className="w-6 h-6" />
                </a>
                <a href="#" className="text-red-200 hover:text-white transition-colors duration-200 transform hover:scale-110">
                  <YouTubeIcon className="w-6 h-6" />
                </a>
                <a href="https://wa.me/919647966765" className="text-red-200 hover:text-white transition-colors duration-200 transform hover:scale-110">
                  <WhatsAppIcon className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-semibold text-white mb-6 border-b border-red-400 pb-2">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/photoshoot" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    Photography
                  </Link>
                </li>
                <li>
                  <Link href="/vendors" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    Wedding Vendors
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="lg:col-span-3">
              <h4 className="text-lg font-semibold text-white mb-6 border-b border-red-400 pb-2">
                Our Services
              </h4>
              <ul className="space-y-3">
                <li>
                  <span className="text-red-100 flex items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                    Wedding Photography
                  </span>
                </li>
                <li>
                  <span className="text-red-100 flex items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                    Pre-Wedding Shoots
                  </span>
                </li>
                <li>
                  <span className="text-red-100 flex items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                    Event Videography
                  </span>
                </li>
                <li>
                  <span className="text-red-100 flex items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                    Portrait Sessions
                  </span>
                </li>
                <li>
                  <span className="text-red-100 flex items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                    Vendor Directory
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-3">
              <h4 className="text-lg font-semibold text-white mb-6 border-b border-red-400 pb-2">
                Get In Touch
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="w-5 h-5 text-red-300 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-red-100 text-sm leading-relaxed">
                      Kolkata, West Bengal<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-5 h-5 text-red-300 flex-shrink-0" />
                  <a href="tel:+919647966765" className="text-red-100 hover:text-white transition-colors text-sm">
                    +91 96479 66765
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-red-300 flex-shrink-0" />
                  <a href="mailto:info@chabighar.com" className="text-red-100 hover:text-white transition-colors text-sm">
                    info@chabighar.com
                  </a>
                </div>
                
                <div className="flex items-start space-x-3">
                  <ClockIcon className="w-5 h-5 text-red-300 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-red-100 text-sm">
                      Mon - Sat: 9:00 AM - 8:00 PM<br />
                      Sunday: By Appointment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-red-400/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h4 
                className="text-xl font-semibold text-white mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Stay Updated with Our Latest Work
              </h4>
              <p className="text-red-100 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter to get updates on our latest photography sessions, wedding stories, and exclusive offers.
              </p>
              <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-red-300/30 text-white placeholder-red-200 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                />
                <button className="bg-white text-royal-red px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-red-400/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-red-100 text-sm">
                <span>&copy; 2025 Chabighar. All rights reserved.</span>
              </div>

              {/* Center Love Sign with Taglines */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center space-x-2 text-red-100">
                  <HeartIcon className="w-5 h-5 text-red-300" />
                  <span className="text-sm font-medium">Made with love in Bengal</span>
                </div>
                <div className="text-center">
                  <p className="text-red-200 text-sm font-medium">
                    "Your celebration, our arrangement"
                  </p>
                  <p className="text-red-200 text-xs mt-1" style={{ fontFamily: 'SolaimanLipi, Arial, sans-serif' }}>
                    "আপনার উৎসব, আমাদের আয়োজন"
                  </p>
                  <p className="text-red-300 text-xs mt-1 tracking-wider">
                    Events • Shopping • Memories
                  </p>
                </div>
              </div>

              <div className="flex space-x-6 text-sm">
                <Link href="/privacy" className="text-red-100 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-red-100 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/sitemap" className="text-red-100 hover:text-white transition-colors">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
