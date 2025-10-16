import { Metadata } from 'next';

interface PortfolioData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  story: string;
  location: string;
  date: string;
  category: {
    name: string;
  };
  cover_image: string | null;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  images: Array<{
    id: string;
    image: string;
    caption: string;
  }>;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id: portfolioId } = await params;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  try {
    // Fetch portfolio data for metadata
    const response = await fetch(`${API_BASE_URL}/api/portfolio/portfolios/${portfolioId}/`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!response.ok) {
      return {
        title: 'Portfolio Not Found | chobighar',
        description: 'The requested portfolio could not be found.',
      };
    }
    
    const portfolio: PortfolioData = await response.json();
    
    // Get cover image URL
    const coverImageUrl = portfolio.cover_image 
      ? portfolio.cover_image.startsWith('http') 
        ? portfolio.cover_image 
        : `${API_BASE_URL}${portfolio.cover_image}`
      : portfolio.images?.[0]?.image.startsWith('http')
        ? portfolio.images[0].image
        : portfolio.images?.[0]?.image
          ? `${API_BASE_URL}${portfolio.images[0].image}`
          : null;
    
    // Use meta fields from backend if available, otherwise generate
    const title = portfolio.meta_title || 
                 `${portfolio.title} - ${portfolio.category.name} | chobighar Portfolio`;
    
    const description = portfolio.meta_description || 
                       portfolio.description || 
                       `${portfolio.title} ${portfolio.subtitle ? '- ' + portfolio.subtitle : ''}. ${portfolio.location ? 'Location: ' + portfolio.location : ''}. Professional ${portfolio.category.name} photography by chobighar.`;
    
    // Use meta keywords from backend if available, otherwise generate
    const keywords = portfolio.meta_keywords || 
                    [
                      portfolio.title,
                      portfolio.category.name,
                      portfolio.location,
                      'wedding photography',
                      'event photography',
                      'portfolio',
                      'chobighar',
                      'professional photographer',
                      `${portfolio.category.name} photography`,
                      portfolio.location ? `photography ${portfolio.location}` : null
                    ].filter(Boolean).join(', ');
    
    return {
      title,
      description,
      keywords,
      authors: [{ name: 'chobighar' }],
      creator: 'chobighar',
      publisher: 'chobighar',
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        title,
        description,
        url: `https://chobighar.com/portfolio/${portfolioId}`,
        siteName: 'chobighar',
        type: 'article',
        locale: 'en_IN',
        images: coverImageUrl ? [
          {
            url: coverImageUrl,
            width: 1200,
            height: 630,
            alt: portfolio.title,
          },
          // Add additional portfolio images
          ...portfolio.images.slice(0, 3).map(img => ({
            url: img.image.startsWith('http') ? img.image : `${API_BASE_URL}${img.image}`,
            width: 800,
            height: 600,
            alt: img.caption || portfolio.title,
          }))
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: coverImageUrl ? [coverImageUrl] : [],
        creator: '@chobighar',
        site: '@chobighar',
      },
      alternates: {
        canonical: `https://chobighar.com/portfolio/${portfolioId}`,
      },
      other: {
        'article:published_time': portfolio.date,
        'article:section': portfolio.category.name,
        'article:tag': portfolio.meta_keywords || portfolio.category.name,
      },
    };
    
  } catch (error) {
    console.error('Error generating metadata for portfolio:', error);
    return {
      title: 'Portfolio | chobighar',
      description: 'Explore our beautiful photography portfolio showcasing weddings, events, and special moments.',
    };
  }
}
