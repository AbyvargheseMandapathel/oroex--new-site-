from django.urls import path
from . import views

urlpatterns = [
    path('send-otp/', views.send_otp, name='send_otp'),
    path('navbars/', views.navbar_list, name='navbar_list'),
    path('header-videos/', views.header_videos, name='header_videos'),
    path('services/', views.services_list, name='services_list'),
    path('homepage-services/', views.homepage_services, name='homepage_services'),
    path('services/<int:pk>/', views.service_detail, name='service_detail'),
    path('products/homepage/', views.products_fifteen_backend, name='products_fifteen'),
    path('products/', views.products_list, name='products_list'),
    path('products/<int:pk>/', views.product_detail, name='product_detail'),
    path('product-categories/', views.product_categories, name='product_categories'),
]
