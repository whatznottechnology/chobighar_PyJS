"""
Utility functions for Django Unfold Admin
"""
from django.conf import settings
from django.db.models import Count
from django.utils.translation import gettext_lazy as _


def environment_callback(request):
    """
    Callback to show environment badge in admin
    """
    if settings.DEBUG:
        return ["Development", "info"]  # Blue badge
    return ["Production", "danger"]  # Red badge


def dashboard_callback(request, context):
    """
    Callback to customize dashboard
    """
    # Add quick stats to dashboard context
    from inquiry.models import Inquiry
    from vendor.models import VendorProfile
    from portfolio.models import Portfolio
    from blog.models import BlogPost
    
    context.update({
        "navigation": [
            {
                "title": _("Quick Stats"),
                "items": [
                    {
                        "title": _("Total Inquiries"),
                        "value": Inquiry.objects.count(),
                        "icon": "mail",
                    },
                    {
                        "title": _("Total Vendors"),
                        "value": VendorProfile.objects.count(),
                        "icon": "store",
                    },
                    {
                        "title": _("Total Portfolios"),
                        "value": Portfolio.objects.count(),
                        "icon": "photo_camera",
                    },
                    {
                        "title": _("Blog Posts"),
                        "value": BlogPost.objects.count(),
                        "icon": "article",
                    },
                ],
            },
            {
                "title": _("Recent Activity"),
                "items": [
                    {
                        "title": _("New Inquiries Today"),
                        "value": Inquiry.objects.filter(
                            created_at__date=request.user.date_joined.date() if hasattr(request.user, 'date_joined') else None
                        ).count(),
                        "icon": "new_releases",
                    },
                ],
            },
        ],
    })
    
    return context
