from django.urls import path
from . import views

urlpatterns = [
    path('send-otp/', views.send_otp, name='send_otp'),
    path('navbars/', views.navbar_list, name='navbar_list'),
    path('header-videos/', views.header_videos, name='header_videos'),
    path('services/', views.services_list, name='services_list'),
    path('homepage-services/', views.homepage_services, name='homepage_services'),
    path('services/<slug:slug>/', views.service_detail, name='service_detail'),
    
    # Products
    path('products/categories/', views.product_categories, name='product_categories'),
    path('products/', views.products_list, name='products_list'),
    path('products/<slug:slug>/', views.product_detail, name='product_detail'),
    path('products-fifteen-backend/', views.products_fifteen_backend, name='products_fifteen_backend'),

    # Projects
    path('projects/', views.projects_list, name='projects_list'),
    path('projects/<slug:slug>/', views.project_detail, name='project_detail'),

    # Contact
    path('contact/', views.submit_contact, name='submit_contact'),

    # Downloads
    path('downloads/', views.downloads_list, name='downloads_list'),

    # FAQs
    path('faqs/', views.faq_list, name='faq_list'),

    # Careers
    path('careers/', views.career_list, name='career_list'),
    path('careers/<slug:slug>/', views.career_detail, name='career_detail'),

    # About
    path('about/', views.about_detail, name='about_detail'),

    # Company Info
    path('company-info/', views.company_info, name='company_info'),

    # Search
    path('search/', views.global_search, name='global_search'),
]
