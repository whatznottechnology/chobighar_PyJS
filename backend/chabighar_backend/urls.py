"""
URL configuration for chabighar_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import redirect
from django.http import HttpResponseRedirect
from .health_views import HealthCheckView, ReadinessCheckView, LivenessCheckView

# Redirect function for root URL
def redirect_to_admin(request):
    """Redirect root URL to admin panel"""
    return HttpResponseRedirect('/admin/')

urlpatterns = [
    # Root URL - Redirect to Admin Panel
    path('', redirect_to_admin, name='root_redirect'),
    
    # Admin Panel
    path('admin/', admin.site.urls),
    
    # Health Check Endpoints for Production Monitoring
    path('health/', HealthCheckView.as_view(), name='health_check'),
    path('health/ready/', ReadinessCheckView.as_view(), name='readiness_check'),
    path('health/live/', LivenessCheckView.as_view(), name='liveness_check'),
    
    # API Endpoints
    path('api/header/', include('header.urls')),
    path('api/footer/', include('footer.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/homepage/', include('homepage.urls')),
    path('api/aboutpage/', include('aboutpage.urls')),
    path('api/photoshootpage/', include('photoshootpage.urls')),
    path('api/vendor/', include('vendor.urls')),  # Vendor APIs
    path('api/search/', include('search.urls')),
    path('api/inquiry/', include('inquiry.urls')),  # Inquiry APIs
    path('api/portfolio/', include('portfolio.urls')),  # Portfolio APIs
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
