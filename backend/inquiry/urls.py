from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_inquiry, name='create_inquiry'),
    path('list/', views.inquiry_list, name='inquiry_list'),
    path('stats/', views.inquiry_stats, name='inquiry_stats'),
]