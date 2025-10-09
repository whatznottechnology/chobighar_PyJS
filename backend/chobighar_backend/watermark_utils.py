"""
Automatic Watermark Utility for All Images
Adds chobighar logo watermark to all uploaded images
"""
from PIL import Image, ImageDraw, ImageFont
from django.core.files.base import ContentFile
from django.conf import settings
import os
from io import BytesIO


def add_watermark(image_field, watermark_path=None, position='top-right', opacity=0.7, size_percentage=10):
    """
    Add watermark to an image
    
    Args:
        image_field: Django ImageField instance
        watermark_path: Path to watermark image (default: backend/static/admin/img/chobighar.png)
        position: Position of watermark ('bottom-right', 'bottom-left', 'top-right', 'top-left', 'center')
        opacity: Watermark opacity (0.0 to 1.0)
        size_percentage: Watermark size as percentage of image (5-50%)
    
    Returns:
        Modified image field
    """
    
    # Return if no image
    if not image_field:
        return image_field
    
    # Default watermark path
    if watermark_path is None:
        watermark_path = os.path.join(settings.BASE_DIR, 'static', 'admin', 'img', 'chobighar.png')
    
    # Check if watermark file exists
    if not os.path.exists(watermark_path):
        print(f"❌ Watermark file not found: {watermark_path}")
        return image_field
    
    try:
        # Open the main image
        image_field.seek(0)
        main_image = Image.open(image_field)
        
        # Convert to RGBA if not already
        if main_image.mode != 'RGBA':
            main_image = main_image.convert('RGBA')
        
        # Open watermark
        watermark = Image.open(watermark_path)
        if watermark.mode != 'RGBA':
            watermark = watermark.convert('RGBA')
        
        # Calculate watermark size based on main image
        main_width, main_height = main_image.size
        
        # Clamp size_percentage between 5 and 50
        size_percentage = max(5, min(50, size_percentage))
        
        # Calculate watermark dimensions (based on percentage of smaller dimension)
        min_dimension = min(main_width, main_height)
        watermark_size = int(min_dimension * (size_percentage / 100))
        
        # Resize watermark maintaining aspect ratio
        watermark.thumbnail((watermark_size, watermark_size), Image.Resampling.LANCZOS)
        
        # Adjust opacity
        if opacity < 1.0:
            # Create a copy with adjusted alpha
            watermark_with_opacity = watermark.copy()
            alpha = watermark_with_opacity.split()[3]
            alpha = alpha.point(lambda p: int(p * opacity))
            watermark_with_opacity.putalpha(alpha)
            watermark = watermark_with_opacity
        
        # Calculate position
        watermark_width, watermark_height = watermark.size
        padding = 10  # 10px padding from edges
        
        positions = {
            'bottom-right': (main_width - watermark_width - padding, main_height - watermark_height - padding),
            'bottom-left': (padding, main_height - watermark_height - padding),
            'top-right': (main_width - watermark_width - padding, padding),
            'top-left': (padding, padding),
            'center': ((main_width - watermark_width) // 2, (main_height - watermark_height) // 2),
        }
        
        watermark_position = positions.get(position, positions['bottom-right'])
        
        # Create a transparent layer for watermark
        transparent = Image.new('RGBA', main_image.size, (0, 0, 0, 0))
        transparent.paste(watermark, watermark_position, watermark)
        
        # Composite the watermark onto the main image
        watermarked = Image.alpha_composite(main_image, transparent)
        
        # Convert back to RGB if original was RGB/JPEG
        output_format = 'PNG'
        if image_field.name.lower().endswith(('.jpg', '.jpeg')):
            watermarked = watermarked.convert('RGB')
            output_format = 'JPEG'
        
        # Save to BytesIO
        output = BytesIO()
        watermarked.save(output, format=output_format, quality=95)
        output.seek(0)
        
        # Get filename
        filename = os.path.basename(image_field.name)
        
        # Return as ContentFile
        return ContentFile(output.read(), name=filename)
        
    except Exception as e:
        print(f"❌ Error adding watermark: {str(e)}")
        return image_field


def should_add_watermark(field_name):
    """
    Determine if watermark should be added to this field
    
    Args:
        field_name: Name of the image field
    
    Returns:
        Boolean
    """
    # Fields to skip watermarking
    skip_fields = [
        'logo',  # Don't watermark logos
        'icon',  # Don't watermark icons
        'og_image',  # Don't watermark OG images (for social media)
    ]
    
    field_name_lower = field_name.lower()
    
    for skip in skip_fields:
        if skip in field_name_lower:
            return False
    
    return True
