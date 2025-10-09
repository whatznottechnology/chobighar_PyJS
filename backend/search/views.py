from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from django.urls import reverse

from vendor.models import VendorProfile, VendorCategory, VendorSubCategory
from portfolio.models import Portfolio, Category as PortfolioCategory
from homepage.models import ShowcaseImage
from photoshootpage.models import PhotoshootService

@api_view(['GET'])
def global_search(request):
    """
    Global search across vendors, portfolios, categories, and services
    """
    query = request.GET.get('q', '').strip()
    
    if not query or len(query) < 2:
        return Response({
            'message': 'Please enter at least 2 characters to search',
            'results': []
        }, status=status.HTTP_400_BAD_REQUEST)
    
    results = []
    
    try:
        # Search in Vendor Profiles - comprehensive search
        vendor_profiles = VendorProfile.objects.filter(
            Q(name__icontains=query) |
            Q(tagline__icontains=query) |
            Q(description__icontains=query) |
            Q(story__icontains=query) |
            Q(location__icontains=query) |
            Q(type__icontains=query) |
            Q(category__name__icontains=query) |
            Q(subcategory__name__icontains=query),
            is_active=True
        ).distinct()[:10]
        
        for vendor in vendor_profiles:
            # Get image URL properly from VendorImage
            image_url = None
            first_image = vendor.images.filter(is_active=True).first()
            if first_image and first_image.image:
                image_url = request.build_absolute_uri(first_image.image.url)
            
            results.append({
                'type': 'vendor',
                'id': str(vendor.id),
                'title': vendor.name,
                'subtitle': vendor.tagline,
                'description': vendor.description[:150] + '...' if len(vendor.description) > 150 else vendor.description,
                'image': image_url,
                'url': f'/vendor/{vendor.slug}',
                'category': vendor.category.name if vendor.category else 'Vendor',
                'subcategory': vendor.subcategory.name if vendor.subcategory else None,
                'location': vendor.location,
                'rating': float(vendor.rating) if vendor.rating else None,
                'price_range': vendor.price_range,
                'vendor_type': vendor.type
            })
        
        # Search in Vendor Categories
        vendor_categories = VendorCategory.objects.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query),
            is_active=True
        ).distinct()[:5]
        
        for category in vendor_categories:
            # Count vendors in this category
            vendor_count = VendorProfile.objects.filter(category=category, is_active=True).count()
            
            # Get image URL properly
            image_url = None
            if category.image:
                image_url = request.build_absolute_uri(category.image.url)
            
            results.append({
                'type': 'vendor_category',
                'id': str(category.id),
                'title': category.name,
                'subtitle': f"{vendor_count} vendors available",
                'description': category.description[:150] + '...' if len(category.description) > 150 else category.description,
                'image': image_url,
                'url': f'/vendors?category={category.slug}',
                'category': 'Category',
                'vendor_count': vendor_count
            })
        
        # Search in Vendor Subcategories
        vendor_subcategories = VendorSubCategory.objects.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query),
            is_active=True
        ).distinct()[:5]
        
        for subcategory in vendor_subcategories:
            # Count vendors in this subcategory
            vendor_count = VendorProfile.objects.filter(subcategory=subcategory, is_active=True).count()
            
            # Get image URL properly
            image_url = None
            if subcategory.banner_image:
                image_url = request.build_absolute_uri(subcategory.banner_image.url)
            
            results.append({
                'type': 'vendor_subcategory',
                'id': str(subcategory.id),
                'title': subcategory.name,
                'subtitle': f"{vendor_count} vendors available",
                'description': subcategory.description[:150] + '...' if len(subcategory.description) > 150 else subcategory.description,
                'image': image_url,
                'url': f'/vendors?subcategory={subcategory.slug}',
                'category': 'Subcategory',
                'vendor_count': vendor_count
            })
        
        # Search in Portfolios
        portfolios = Portfolio.objects.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(location__icontains=query) |
            Q(category__name__icontains=query),
            is_active=True
        ).distinct()[:10]
        
        for portfolio in portfolios:
            # Get image URL properly
            image_url = None
            first_image = portfolio.images.filter(is_active=True).first()
            if first_image and first_image.image_file:
                image_url = request.build_absolute_uri(first_image.image_file.url)
            elif first_image and first_image.image_url:
                image_url = first_image.image_url
            
            # Count images in portfolio
            image_count = portfolio.images.filter(is_active=True).count()
            
            results.append({
                'type': 'portfolio',
                'id': str(portfolio.id),
                'title': portfolio.title,
                'subtitle': portfolio.location,
                'description': portfolio.description[:150] + '...' if len(portfolio.description) > 150 else portfolio.description,
                'image': image_url,
                'url': f'/portfolio/{portfolio.id}',
                'category': portfolio.category.name if portfolio.category else 'Album',
                'location': portfolio.location,
                'image_count': image_count
            })
        
        # Search in Portfolio Categories
        portfolio_categories = PortfolioCategory.objects.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query),
            is_active=True
        ).distinct()[:5]
        
        for category in portfolio_categories:
            # Count portfolios in this category
            portfolio_count = Portfolio.objects.filter(category=category, is_active=True).count()
            
            # Get image URL properly - Portfolio Category doesn't have image field
            image_url = None
            # Use first portfolio's cover image if available
            first_portfolio = Portfolio.objects.filter(category=category, is_active=True).first()
            if first_portfolio and first_portfolio.cover_image:
                # cover_image is a property that returns URL string
                if first_portfolio.cover_image_file:
                    image_url = request.build_absolute_uri(first_portfolio.cover_image_file.url)
                elif first_portfolio.cover_image_url:
                    image_url = first_portfolio.cover_image_url
            
            results.append({
                'type': 'portfolio_category',
                'id': str(category.id),
                'title': category.name,
                'subtitle': f"{portfolio_count} albums available",
                'description': category.description[:150] + '...' if len(category.description) > 150 else category.description,
                'image': image_url,
                'url': f'/portfolio?category={category.id}',
                'category': 'Portfolio Category',
                'portfolio_count': portfolio_count
            })
        
        # Search in Portfolio Images (for individual image search)
        from portfolio.models import PortfolioImage
        portfolio_images = PortfolioImage.objects.filter(
            Q(caption__icontains=query) |
            Q(portfolio__title__icontains=query) |
            Q(portfolio__location__icontains=query),
            is_active=True,
            portfolio__is_active=True
        ).select_related('portfolio').distinct()[:5]
        
        for image in portfolio_images:
            # Get image URL properly
            image_url = None
            if image.image_file:
                image_url = request.build_absolute_uri(image.image_file.url)
            elif image.image_url:
                image_url = image.image_url
            
            results.append({
                'type': 'portfolio_image',
                'id': f"{image.portfolio.id}_{image.id}",
                'title': image.caption or f"Photo from {image.portfolio.title}",
                'subtitle': image.portfolio.title,
                'description': f"From {image.portfolio.title} album in {image.portfolio.location}",
                'image': image_url,
                'url': f'/portfolio/{image.portfolio.id}',
                'category': 'Photo',
                'location': image.portfolio.location,
                'portfolio_title': image.portfolio.title
            })
        
        # Search in Vendor Images (for individual vendor photos search)
        from vendor.models import VendorImage
        vendor_images = VendorImage.objects.filter(
            Q(title__icontains=query) |
            Q(vendor__name__icontains=query) |
            Q(vendor__location__icontains=query),
            is_active=True,
            vendor__is_active=True
        ).select_related('vendor').distinct()[:5]
        
        for image in vendor_images:
            # Get image URL properly
            image_url = None
            if image.image:
                image_url = request.build_absolute_uri(image.image.url)
            
            results.append({
                'type': 'vendor_image',
                'id': f"{image.vendor.id}_{image.id}",
                'title': image.title or f"Photo from {image.vendor.name}",
                'subtitle': image.vendor.name,
                'description': f"From {image.vendor.name} in {image.vendor.location}",
                'image': image_url,
                'url': f'/vendor/{image.vendor.slug}',
                'category': 'Vendor Photo',
                'location': image.vendor.location,
                'rating': image.vendor.rating,
                'vendor_type': image.vendor.type
            })
        
        # Search in Vendor Services
        from vendor.models import VendorService
        vendor_services = VendorService.objects.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query) |
            Q(vendor__name__icontains=query) |
            Q(vendor__location__icontains=query),
            is_active=True,
            vendor__is_active=True
        ).select_related('vendor').distinct()[:5]
        
        for service in vendor_services:
            # Get vendor image URL properly
            image_url = None
            first_vendor_image = service.vendor.images.filter(is_active=True).first()
            if first_vendor_image and first_vendor_image.image:
                image_url = request.build_absolute_uri(first_vendor_image.image.url)
            
            results.append({
                'type': 'vendor_service',
                'id': f"{service.vendor.id}_{service.id}",
                'title': service.name,
                'subtitle': f"by {service.vendor.name}",
                'description': service.description[:150] + '...' if service.description and len(service.description) > 150 else service.description or f"Service offered by {service.vendor.name}",
                'image': image_url,
                'url': f'/vendor/{service.vendor.slug}',
                'category': 'Service',
                'location': service.vendor.location,
                'rating': service.vendor.rating,
                'vendor_name': service.vendor.name,
                'vendor_type': service.vendor.type
            })
        
        # Search in Photoshoot Services
        photoshoot_services = PhotoshootService.objects.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(price__icontains=query) |
            Q(deliverables__icontains=query),
            is_active=True
        ).distinct()[:5]
        
        for service in photoshoot_services:
            # Get image URL properly
            image_url = None
            if service.service_image:
                image_url = request.build_absolute_uri(service.service_image.url)
            
            results.append({
                'type': 'photoshoot_service',
                'id': str(service.id),
                'title': service.title,
                'subtitle': service.price,
                'description': service.description[:150] + '...' if len(service.description) > 150 else service.description,
                'image': image_url,
                'url': '/photoshoot',
                'category': 'Photography Service',
                'price': service.price,
                'duration': service.duration,
                'deliverables': service.deliverables,
                'is_featured': service.is_featured
            })
        
        # If no results found, provide suggestions
        if not results:
            return Response({
                'message': f'No results found for "{query}"',
                'results': [],
                'suggestions': [
                    'Try searching for photographers, venues, decorators, or wedding albums',
                    'Use broader terms like "wedding", "photography", or "venue"',
                    'Check spelling and try different keywords'
                ]
            })
        
        return Response({
            'results': results,
            'total': len(results),
            'query': query
        })
    
    except Exception as e:
        return Response({
            'error': f'Search failed: {str(e)}',
            'results': []
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def search_suggestions(request):
    """
    Get search suggestions based on popular terms and available data
    """
    try:
        suggestions = [
            {'term': 'photographers', 'type': 'vendor_category', 'count': VendorProfile.objects.filter(category__name__icontains='photo').count()},
            {'term': 'venues', 'type': 'vendor_category', 'count': VendorProfile.objects.filter(category__name__icontains='venue').count()},
            {'term': 'decorators', 'type': 'vendor_category', 'count': VendorProfile.objects.filter(category__name__icontains='decor').count()},
            {'term': 'wedding', 'type': 'portfolio_category', 'count': Portfolio.objects.filter(Q(title__icontains='wedding') | Q(category__name__icontains='wedding')).count()},
            {'term': 'pre-wedding', 'type': 'portfolio_category', 'count': Portfolio.objects.filter(title__icontains='pre-wedding').count()},
            {'term': 'portrait', 'type': 'portfolio_category', 'count': Portfolio.objects.filter(title__icontains='portrait').count()},
            {'term': 'events', 'type': 'vendor_category', 'count': VendorProfile.objects.filter(category__name__icontains='event').count()},
            {'term': 'photoshoot services', 'type': 'photoshoot_service', 'count': PhotoshootService.objects.filter(is_active=True).count()},
        ]
        
        # Filter out suggestions with 0 results
        suggestions = [s for s in suggestions if s['count'] > 0]
        
        return Response({
            'suggestions': suggestions
        })
    
    except Exception as e:
        return Response({
            'error': f'Failed to get suggestions: {str(e)}',
            'suggestions': []
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)