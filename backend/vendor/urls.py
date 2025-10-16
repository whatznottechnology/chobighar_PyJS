from django.urls import path
from . import views

app_name = 'vendor'

urlpatterns = [
    # Get all categories with subcategories for main vendors page
    path('categories/', views.VendorCategoryListView.as_view(), name='category-list'),
    
    # Get specific category details by slug
    path('categories/<slug:slug>/', views.vendor_category_detail, name='category-detail'),
    
    # Get subcategories for a specific category
    path('categories/<slug:category_slug>/subcategories/', views.vendor_subcategory_by_category, name='category-subcategories'),
    
    # Get individual subcategory details by slug
    path('subcategories/<slug:slug>/', views.VendorSubCategoryDetailView.as_view(), name='subcategory-detail'),
    
    # Vendor profile endpoints
    path('profiles/', views.VendorProfileListView.as_view(), name='profile-list'),
    path('profiles/<slug:slug>/', views.VendorProfileDetailView.as_view(), name='profile-detail'),
    path('profiles/<slug:slug>/love/', views.increment_love_count, name='increment-love'),
    
    # Featured vendors
    path('featured/', views.featured_vendors, name='featured-vendors'),
    
    # Vendors by category/subcategory
    path('categories/<slug:category_slug>/vendors/', views.vendors_by_category, name='vendors-by-category'),
    path('subcategories/<slug:subcategory_slug>/vendors/', views.vendors_by_subcategory, name='vendors-by-subcategory'),
]