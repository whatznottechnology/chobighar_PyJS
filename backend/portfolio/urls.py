from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import CategoryViewSet, PortfolioViewSet, showcase_images, portfolio_videos

# Create router and register viewsets
router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'portfolios', PortfolioViewSet, basename='portfolio')

urlpatterns = [
    path('', include(router.urls)),
    path('showcase-images/', showcase_images, name='showcase-images'),
    path('videos/', portfolio_videos, name='portfolio-videos'),
]