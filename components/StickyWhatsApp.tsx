'use client';

import { useState, useEffect } from 'react';
import { useHeaderData } from '../hooks/useHeaderData';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
  </svg>
);

export default function StickyWhatsApp() {
  const { headerData, loading, error } = useHeaderData();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleWhatsAppClick = () => {
    const whatsappNumber = headerData?.contact_info?.whatsapp_number;
    if (whatsappNumber) {
      // Clean the number by removing all non-numeric characters
      const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${cleanNumber}?text=Hi! I'm interested in your photography services.`;
      window.open(whatsappUrl, '_blank');
    } else {
      // Fallback if no WhatsApp number is configured
      console.warn('No WhatsApp number configured in header settings');
    }
  };

  // Don't render if loading, error, or no WhatsApp number
  if (loading || error || !headerData?.contact_info?.whatsapp_number) {
    return null;
  }

  return (
    <>
      {/* Desktop WhatsApp Button */}
      <div className="hidden md:block">
        <div
          className={`fixed bottom-6 right-6 z-[9000] transition-all duration-300 transform ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-16 opacity-0 scale-75'
          }`}
        >
          <button
            onClick={handleWhatsAppClick}
            className="bg-[#25D366] hover:bg-[#22c55e] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group border-2 border-white/20"
            title={`WhatsApp: ${headerData.contact_info.whatsapp_number}`}
            aria-label="Contact us on WhatsApp"
          >
            <WhatsAppIcon className="w-7 h-7 group-hover:animate-bounce" />
          </button>
          
          {/* Ripple effect */}
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-25 -z-10"></div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Chat with us on WhatsApp
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
          </div>
        </div>
      </div>

      {/* Mobile WhatsApp Button - larger and always visible */}
      <div className="md:hidden">
        <div className="fixed bottom-4 right-4 z-[9000]">
          <button
            onClick={handleWhatsAppClick}
            className="bg-[#25D366] hover:bg-[#22c55e] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group border-2 border-white/20"
            title={`WhatsApp: ${headerData.contact_info.whatsapp_number}`}
            aria-label="Contact us on WhatsApp"
          >
            <WhatsAppIcon className="w-8 h-8 group-hover:animate-bounce" />
          </button>
          
          {/* Ripple effect */}
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-25 -z-10"></div>
          
          {/* Mobile label below button */}
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            WhatsApp Chat
          </div>
        </div>
      </div>
    </>
  );
}