import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        'royal-red': '#B22222',
        'royal-red-hover': '#8B0000', 
        'royal-red-light': '#DC143C',
        
        // Secondary Colors
        'gold': '#D4AF37',
        'gold-light': '#F4E4A1',
        
        // Neutral Colors
        'soft-white': '#FAF9F6',
        'charcoal': '#1C1C1C',
        'elegant-gray': '#707070',
        
        // Background & Foreground
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'bengali-pattern': 'linear-gradient(135deg, var(--color-royal-red) 0%, #DC143C 50%, var(--color-royal-red) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'royal': '0 10px 25px -3px rgba(178, 34, 34, 0.1), 0 4px 6px -2px rgba(178, 34, 34, 0.05)',
        'royal-lg': '0 25px 50px -12px rgba(178, 34, 34, 0.25)',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [
    function({ addUtilities }: any) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
      addUtilities(newUtilities)
    }
  ],
} satisfies Config;