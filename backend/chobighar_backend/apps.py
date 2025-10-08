"""
Main App Configuration for chobighar Backend
Registers automatic watermark signals for all image uploads
"""
from django.apps import AppConfig
import logging

logger = logging.getLogger(__name__)


class ChobigharBackendConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'chobighar_backend'
    verbose_name = 'Chobighar Backend Core'
    
    def ready(self):
        """
        Called when Django starts
        Register automatic watermark signals here
        """
        try:
            from .signals import register_watermark_signals
            
            # Register watermark signals for all models with ImageField
            registered = register_watermark_signals()
            
            logger.info("=" * 70)
            logger.info("🎨 AUTOMATIC WATERMARK SYSTEM ACTIVATED")
            logger.info(f"📸 Monitoring {len(registered)} models for image uploads")
            logger.info("💧 Watermark: backend/static/admin/img/chobighar.png")
            logger.info("📍 Position: Bottom-Right Corner")
            logger.info("📏 Size: 8% of image size (dynamic)")
            logger.info("=" * 70)
            
        except Exception as e:
            logger.warning(f"⚠️  Could not register watermark signals: {str(e)}")
