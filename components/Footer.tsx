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
import useFooterData from '@/hooks/useFooterData';

// Social media icon mapping
const getSocialIcon = (name: string) => {
  const iconProps = { className: "w-6 h-6" };
  
  switch (name.toLowerCase()) {
    case 'facebook':
      return (
        <svg {...iconProps} fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg {...iconProps} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.683 13.6 3.683 12c0-1.6.515-2.895 1.443-3.691.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.796 1.443 2.091 1.443 3.691 0 1.6-.515 2.895-1.443 3.691-.875.807-2.026 1.297-3.323 1.297zm7.74-9.079h-3.711c.015-.533.06-1.02.166-1.385.165-.557.404-.986.712-1.204.185-.14.404-.227.657-.227.252 0 .471.087.657.227.307.218.547.647.712 1.204.105.365.15.852.165 1.385h1.642V7.91z"/>
        </svg>
      );
    case 'twitter':
    case 'x':
      return (
        <svg {...iconProps} fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg {...iconProps} fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case 'whatsapp':
      return (
        <svg {...iconProps} fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
        </svg>
      );
    case 'pinterest':
      return (
        <svg {...iconProps} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.690 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.751-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...iconProps} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    default:
      return null;
  }
};

export default function Footer() {
  const { footerData, loading, error } = useFooterData();

  if (loading) {
    return (
      <footer className="text-white relative overflow-hidden border-t border-red-700/30" style={{ backgroundColor: '#B22222' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center text-white">Loading footer content...</div>
        </div>
      </footer>
    );
  }

  const brandInfo = footerData?.brand_info;
  const contactInfo = footerData?.contact_info;
  const socialMedia = footerData?.social_media || [];
  const copyrightInfo = footerData?.copyright_info;

  return (
    <footer className="text-white relative overflow-hidden border-t border-red-700/30" style={{ backgroundColor: '#B22222' }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 bottom-0 w-3/5 sm:w-1/2 lg:w-2/5">
          <Image
            src="/img/62569719_9509225.png"
            alt="Background decoration"
            fill
            className="object-contain object-right opacity-30"
            priority={false}
          />
        </div>
        {/* Gradient overlay to blend the image - adjusted for mobile visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#B22222] from-40% via-[#B22222]/80 via-70% to-[#B22222]/50 sm:from-[#B22222] sm:via-[#B22222]/90 sm:to-[#B22222]/60"></div>
      </div>

      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="jamdani-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.4"/>
                <path d="M10,5 Q15,10 10,15 Q5,10 10,5 Z" fill="currentColor" opacity="0.3"/>
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
              {brandInfo && (
                <>
                  <div className="flex items-start space-x-3 mb-6">
                    {brandInfo.logo_image_url && (
                      <Image
                        src={brandInfo.logo_image_url}
                        alt={brandInfo.main_text}
                        width={50}
                        height={50}
                        className="rounded-lg shadow-lg flex-shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <h3 
                        className="text-2xl font-bold text-white"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {brandInfo.main_text}
                      </h3>
                      <p className="text-white text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {brandInfo.sub_text}
                      </p>
                    </div>
                  </div>
                  <p className="text-white mb-6 leading-relaxed">
                    {brandInfo.description}
                  </p>
                </>
              )}
              
              {/* Social Media */}
              <div className="flex space-x-4">
                {socialMedia.map((social) => {
                  const icon = getSocialIcon(social.name);
                  if (!icon) return null;
                  
                  return (
                    <a 
                      key={social.id} 
                      href={social.url} 
                      className="text-white hover:text-gray-200 transition-colors duration-200 transform hover:scale-110"
                      title={social.display_name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {icon}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-semibold text-white mb-6 border-b border-white/30 pb-2">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-white hover:text-gray-200 transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-white/60 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/photoshoot" className="text-white hover:text-gray-200 transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-white/60 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    Photography
                  </Link>
                </li>
                <li>
                  <Link href="/vendors" className="text-white hover:text-gray-200 transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-white/60 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    Wedding Vendors
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-white hover:text-gray-200 transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-white/60 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white hover:text-gray-200 transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-white/60 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="lg:col-span-3">
              <h4 className="text-lg font-semibold text-white mb-6 border-b border-white/30 pb-2">
                Our Services
              </h4>
              <ul className="space-y-3">
                <li>
                  <span className="text-white flex items-center">
                    <span className="w-2 h-2 bg-white/60 rounded-full mr-3"></span>
                    Wedding Photography
                  </span>
                </li>
                <li>
                  <span className="text-white flex items-center">
                    <span className="w-2 h-2 bg-white/60 rounded-full mr-3"></span>
                    Pre-Wedding Shoots
                  </span>
                </li>
                <li>
                  <span className="text-white flex items-center">
                    <span className="w-2 h-2 bg-white/60 rounded-full mr-3"></span>
                    Event Videography
                  </span>
                </li>
                <li>
                  <span className="text-white flex items-center">
                    <span className="w-2 h-2 bg-white/60 rounded-full mr-3"></span>
                    Portrait Sessions
                  </span>
                </li>
                <li>
                  <span className="text-white flex items-center">
                    <span className="w-2 h-2 bg-white/60 rounded-full mr-3"></span>
                    Vendor Directory
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-3">
              <h4 className="text-lg font-semibold text-white mb-6 border-b border-white/30 pb-2">
                Get In Touch
              </h4>
              {contactInfo && (
                <div className="space-y-4">
                  {(contactInfo.address_line1 || contactInfo.address_line2) && (
                    <div className="flex items-start space-x-3">
                      <MapPinIcon className="w-5 h-5 text-white/70 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-white text-sm leading-relaxed">
                          {contactInfo.address_line1 && <>{contactInfo.address_line1}<br /></>}
                          {contactInfo.address_line2}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {contactInfo.phone && (
                    <div className="flex items-center space-x-3">
                      <PhoneIcon className="w-5 h-5 text-white/70 flex-shrink-0" />
                      <a href={`tel:${contactInfo.phone}`} className="text-white hover:text-gray-200 transition-colors text-sm">
                        {contactInfo.phone}
                      </a>
                    </div>
                  )}
                  
                  {contactInfo.email && (
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="w-5 h-5 text-white/70 flex-shrink-0" />
                      <a href={`mailto:${contactInfo.email}`} className="text-white hover:text-gray-200 transition-colors text-sm">
                        {contactInfo.email}
                      </a>
                    </div>
                  )}
                  
                  {(contactInfo.weekday_hours || contactInfo.weekend_hours) && (
                    <div className="flex items-start space-x-3">
                      <ClockIcon className="w-5 h-5 text-white/70 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-white text-sm">
                          {contactInfo.weekday_hours && <>{contactInfo.weekday_hours}<br /></>}
                          {contactInfo.weekend_hours}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h4 
                className="text-xl font-semibold text-white mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Ready to Capture Your Special Moments?
              </h4>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Contact us today to discuss your photography needs and let us create beautiful memories together.
              </p>
              
              {/* Contact Cards */}
              {contactInfo && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {/* Phone Card */}
                  {contactInfo.phone && (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
                      <PhoneIcon className="w-8 h-8 text-white mx-auto mb-3" />
                      <h5 className="text-white font-semibold mb-2">{contactInfo.phone_text}</h5>
                      <a href={`tel:${contactInfo.phone}`} className="text-white hover:text-gray-200 transition-colors text-lg font-medium">
                        {contactInfo.phone}
                      </a>
                      {contactInfo.weekday_hours && (
                        <p className="text-white/70 text-sm mt-1">{contactInfo.weekday_hours}</p>
                      )}
                    </div>
                  )}

                  {/* WhatsApp Card */}
                  {contactInfo.whatsapp_number && (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
                      {getSocialIcon('whatsapp') && (
                        <div className="w-8 h-8 text-white mx-auto mb-3">
                          {getSocialIcon('whatsapp')}
                        </div>
                      )}
                      <h5 className="text-white font-semibold mb-2">{contactInfo.whatsapp_text}</h5>
                      <a href={`https://wa.me/${contactInfo.whatsapp_number.replace(/[^0-9]/g, '')}`} className="text-white hover:text-gray-200 transition-colors text-lg font-medium">
                        {contactInfo.whatsapp_number}
                      </a>
                      <p className="text-white/70 text-sm mt-1">Quick Response</p>
                    </div>
                  )}

                  {/* Email Card */}
                  {contactInfo.email && (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 sm:col-span-2 lg:col-span-1">
                      <EnvelopeIcon className="w-8 h-8 text-white mx-auto mb-3" />
                      <h5 className="text-white font-semibold mb-2">{contactInfo.email_text}</h5>
                      <a href={`mailto:${contactInfo.email}`} className="text-white hover:text-gray-200 transition-colors text-lg font-medium">
                        {contactInfo.email}
                      </a>
                      <p className="text-white/70 text-sm mt-1">24/7 Support</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {copyrightInfo?.text && (
                <div className="text-white text-sm">
                  <span>{copyrightInfo.text}</span>
                </div>
              )}

              {/* Center Love Sign with Taglines */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center space-x-2 text-white">
                  <HeartIcon className="w-5 h-5 text-white" />
                  <span className="text-sm font-medium">Made with love in Bengal</span>
                </div>
                <div className="text-center">
                  <p className="text-white text-sm font-medium">
                    "Your celebration, our arrangement"
                  </p>
                  <p className="text-white/80 text-xs mt-1" style={{ fontFamily: 'SolaimanLipi, Arial, sans-serif' }}>
                    "আপনার উৎসব, আমাদের আয়োজন"
                  </p>
                  <p className="text-white text-xs mt-1 tracking-wider">
                    Events • Shopping • Memories
                  </p>
                </div>
              </div>

              <div className="flex space-x-6 text-sm">
                <Link href="/privacy" className="text-white hover:text-gray-200 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white hover:text-gray-200 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/sitemap" className="text-white hover:text-gray-200 transition-colors">
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
