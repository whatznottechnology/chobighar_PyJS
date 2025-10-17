import React, { useState } from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

interface ShareButtonProps {
  portfolioId: string;
  portfolioTitle: string;
  className?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ 
  portfolioId, 
  portfolioTitle, 
  className = "" 
}) => {
  const [isShared, setIsShared] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShareClick = async () => {
    if (isLoading) return;

    setIsLoading(true);
    
    const shareUrl = `${window.location.origin}/portfolio/${portfolioId}`;
    const shareData = {
      title: `${portfolioTitle} - chobighar Photography`,
      text: `Check out this beautiful portfolio: ${portfolioTitle}`,
      url: shareUrl,
    };

    try {
      // Use Web Share API if available
      if (navigator.share) {
        await navigator.share(shareData);
        setIsShared(true);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareUrl);
        setIsShared(true);
      }

      // Reset the share animation after 2 seconds
      setTimeout(() => {
        setIsShared(false);
      }, 2000);
    } catch (error) {
      // User cancelled sharing or other error
      console.log('Share cancelled or failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleShareClick}
      disabled={isLoading}
      className={`
        group flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold
        transition-all duration-300 transform hover:scale-105
        ${isShared 
          ? 'bg-blue-500/90 text-white shadow-lg shadow-blue-500/30 border-0' 
          : 'hover:bg-blue-50/90 hover:text-blue-600 hover:border-blue-300/50'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
        ${className}
      `}
    >
      <div className="relative">
        {isShared ? (
          <CheckIcon 
            className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-all duration-300 animate-bounce" 
          />
        ) : (
          <ShareIcon 
            className="w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 group-hover:text-blue-500" 
          />
        )}
      </div>
      
      <span className="text-xs sm:text-sm font-medium">
        {isShared ? 'Shared!' : 'Share'}
      </span>
      
      {isLoading && (
        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-current border-t-transparent rounded-full animate-spin ml-1" />
      )}
    </button>
  );
};

export default ShareButton;