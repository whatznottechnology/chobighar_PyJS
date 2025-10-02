from django.urls import path
from . import views

urlpatterns = [
    path('', views.global_search, name='global_search'),
    path('suggestions/', views.search_suggestions, name='search_suggestions'),
]