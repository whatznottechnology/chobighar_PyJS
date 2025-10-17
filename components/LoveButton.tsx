import React, { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface LoveButtonProps {
  portfolioId: string;
  initialLoveCount: number;
  className?: string;
}

export const LoveButton: React.FC<LoveButtonProps> = ({ 
  portfolioId, 
  initialLoveCount, 
  className = "" 
}) => {
  const [loveCount, setLoveCount] = useState(initialLoveCount);
  const [isLoved, setIsLoved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoveClick = async () => {
    if (isLoading) return;

    setIsLoading(true);
    
    try {
      const response = await fetch(`http://localhost:8000/api/portfolio/portfolios/${portfolioId}/love/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLoveCount(data.love_count);
        setIsLoved(true);
        
        // Reset the love animation after 2 seconds
        setTimeout(() => {
          setIsLoved(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error adding love:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLoveClick}
      disabled={isLoading}
      className={`
        group flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold
        transition-all duration-300 transform hover:scale-105
        ${isLoved 
          ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/30 border-0' 
          : 'hover:bg-red-50/90 hover:text-red-600 hover:border-red-300/50'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
        ${className}
      `}
    >
      <div className="relative">
        {isLoved ? (
          <HeartSolidIcon 
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
              isLoved ? 'animate-pulse scale-110 text-white' : ''
            }`} 
          />
        ) : (
          <HeartIcon 
            className="w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 group-hover:text-red-500" 
          />
        )}
        
        {/* Love animation effect */}
        {isLoved && (
          <div className="absolute inset-0 animate-ping">
            <HeartSolidIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 opacity-75" />
          </div>
        )}
      </div>
      
      <span className="text-xs sm:text-sm font-medium min-w-[16px] sm:min-w-[20px] text-center">
        {loveCount}
      </span>
      
      {isLoading && (
        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-current border-t-transparent rounded-full animate-spin ml-1" />
      )}
    </button>
  );
};

export default LoveButton;