"""
Django Signal Handlers for Automatic Watermarking
Applies watermark to all ImageField uploads across all models
"""
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.db import models
from .watermark_utils import add_watermark, should_add_watermark
import logging

logger = logging.getLogger(__name__)


def auto_watermark_handler(sender, instance, **kwargs):
    """
    Automatically add watermark to all ImageField uploads
    This is a universal handler for all models with ImageField
    """
    
    # Get all ImageField fields from the model
    image_fields = [
        field for field in sender._meta.get_fields()
        if isinstance(field, models.ImageField)
    ]
    
    if not image_fields:
        return
    
    # Check if this is a new instance or an update
    try:
        if instance.pk:
            old_instance = sender.objects.get(pk=instance.pk)
        else:
            old_instance = None
    except sender.DoesNotExist:
        old_instance = None
    
    # Process each ImageField
    for field in image_fields:
        field_name = field.name
        current_image = getattr(instance, field_name)
        
        # Skip if no image or if we shouldn't watermark this field
        if not current_image or not should_add_watermark(field_name):
            continue
        
        # Check if image has changed
        if old_instance:
            old_image = getattr(old_instance, field_name)
            # Skip if image hasn't changed
            if old_image == current_image:
                continue
        
        # Check if image is new (has a file but not saved yet)
        if hasattr(current_image, 'file'):
            try:
                logger.info(f"🎨 Adding watermark to {sender.__name__}.{field_name}")
                
                # Add watermark
                watermarked_image = add_watermark(
                    current_image.file,
                    position='top-right',
                    opacity=0.8,
                    size_percentage=10  # 10% of image size
                )
                
                # Save watermarked image back to field
                if watermarked_image and watermarked_image != current_image.file:
                    # Delete old file if it exists
                    if old_instance and getattr(old_instance, field_name):
                        old_image = getattr(old_instance, field_name)
                        if old_image and old_image != current_image:
                            old_image.delete(save=False)
                    
                    # Save new watermarked image
                    current_image.save(
                        current_image.name,
                        watermarked_image,
                        save=False
                    )
                    
                    logger.info(f"✅ Watermark added successfully to {field_name}")
                
            except Exception as e:
                logger.error(f"❌ Error adding watermark to {sender.__name__}.{field_name}: {str(e)}")
                # Continue without watermark if error occurs
                pass


def register_watermark_signals():
    """
    Register watermark signal for all models with ImageField
    Call this in apps.py ready() method
    """
    from django.apps import apps
    
    registered_models = []
    
    for model in apps.get_models():
        # Check if model has any ImageField
        has_image_field = any(
            isinstance(field, models.ImageField)
            for field in model._meta.get_fields()
            if hasattr(field, 'get_internal_type')
        )
        
        if has_image_field:
            # Connect the signal
            pre_save.connect(
                auto_watermark_handler,
                sender=model,
                dispatch_uid=f'watermark_{model._meta.label}'
            )
            registered_models.append(model._meta.label)
    
    if registered_models:
        logger.info(f"🎨 Watermark signals registered for {len(registered_models)} models:")
        for model_name in registered_models:
            logger.info(f"   ✓ {model_name}")
    
    return registered_models
