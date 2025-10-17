"""
Utility models and mixins for common functionality
"""
from django.db import models


class AutoOrderMixin(models.Model):
    """
    Mixin that provides auto-ordering functionality
    The order field is automatically managed based on creation order
    """
    order = models.PositiveIntegerField(
        default=0,
        editable=False,
        help_text="Auto-managed ordering (based on creation time)"
    )
    
    class Meta:
        abstract = True
        
    def save(self, *args, **kwargs):
        """Auto-assign order based on creation time"""
        if not self.pk and self.order == 0:
            # Get the highest order value for this model
            max_order = self.__class__.objects.aggregate(
                models.Max('order')
            )['order__max'] or 0
            self.order = max_order + 1
        super().save(*args, **kwargs)