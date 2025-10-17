from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StaticPageViewSet

router = DefaultRouter()
router.register(r'pages', StaticPageViewSet, basename='static-page')

urlpatterns = [
    path('', include(router.urls)),
]
