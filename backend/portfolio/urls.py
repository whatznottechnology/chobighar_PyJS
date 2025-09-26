from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import CategoryViewSet, PortfolioViewSet, PortfolioInquiryViewSet

# Create router and register viewsets
router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'portfolios', PortfolioViewSet, basename='portfolio')
router.register(r'inquiries', PortfolioInquiryViewSet, basename='inquiry')

urlpatterns = [
    path('api/portfolio/', include(router.urls)),
]