from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BlogCategoryViewSet, BlogPostViewSet, BlogCommentViewSet,
    PopupInquiryViewSet, PopupSettingsViewSet
)

router = DefaultRouter()
router.register(r'categories', BlogCategoryViewSet, basename='blog-category')
router.register(r'posts', BlogPostViewSet, basename='blog-post')
router.register(r'comments', BlogCommentViewSet, basename='blog-comment')
router.register(r'popup-inquiry', PopupInquiryViewSet, basename='popup-inquiry')
router.register(r'popup-settings', PopupSettingsViewSet, basename='popup-settings')

urlpatterns = [
    path('', include(router.urls)),
]
