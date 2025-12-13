from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from .models import Navbar, HeaderVideo, Service, Category, SubCategory, Product, Contact, Project
from django.db.models import Q
from django.shortcuts import get_object_or_404
import json

User = get_user_model()

@csrf_exempt
def send_otp(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            user = User.objects.filter(email=email).first()
            if user:
                user.generate_otp()
                return JsonResponse({'status': 'ok', 'message': 'OTP sent to your email.'})
            else:
                return JsonResponse({'status': 'error', 'message': 'User not found.'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=405)

def navbar_list(request):
    items = Navbar.objects.all().order_by('order')
    data = [
        {
            'label': item.label,
            'link': item.url,  # Frontend uses 'link', model uses 'url'. Let's map it.
            'is_highlight': item.is_highlight
        }
        for item in items
    ]
    return JsonResponse(data, safe=False)

def header_videos(request):
    videos = HeaderVideo.objects.filter(is_active=True).order_by('order')
    data = []
    for video in videos:
        # Prioritize file upload over URL if both exist, or return whichever is present.
        url = None
        if video.video_file:
            # request.build_absolute_uri is good for full URLs
            url = request.build_absolute_uri(video.video_file.url)
        elif video.video_url:
            url = video.video_url
            
        if url:
            data.append({
                'id': video.id,
                'videoUrl': url
            })
    return JsonResponse(data, safe=False)

def get_service_data(request, service):
    # Helper to format service data with media URL prioritization
    video_url = None
    if service.video_file:
        video_url = request.build_absolute_uri(service.video_file.url)
    elif service.video_url:
        video_url = service.video_url
        
    image_url = None
    if service.image_file:
        image_url = request.build_absolute_uri(service.image_file.url)
    elif service.image_url:
        image_url = service.image_url

    # Fallback: if no video but image exists, use image as videoUrl
    # Frontend expects 'videoUrl' for the background media.
    final_media_url = video_url if video_url else image_url

    return {
        'id': service.id,
        'title': service.title,
        'icon': service.icon,
        'description': service.short_description, # Frontend list uses this
        'shortDescription': service.short_description,
        'longDescription': service.long_description,
        'videoUrl': final_media_url, 
    }

def services_list(request):
    services = Service.objects.all().order_by('order')
    data = [get_service_data(request, s) for s in services]
    return JsonResponse(data, safe=False)

def homepage_services(request):
    services = Service.objects.filter(show_in_homepage=True).order_by('order')[:6]
    data = [get_service_data(request, s) for s in services]
    return JsonResponse(data, safe=False)

def service_detail(request, slug):
    service = get_object_or_404(Service, slug=slug)
    data = {
        'id': service.id,
        'title': service.title,
        'slug': service.slug,
        'description': service.short_description,
        'longDescription': service.long_description,
        'image': request.build_absolute_uri(service.image_url) if service.image_url else (request.build_absolute_uri(service.image_file.url) if service.image_file else None),
        'videoUrl': service.video_url if service.video_url else (request.build_absolute_uri(service.video_file.url) if service.video_file else None),
        'icon': service.icon
    }
    return JsonResponse(data)

def get_product_data(request, product):
    # Prioritize uploaded video > video url
    video_url = None
    if product.video_file:
         video_url = request.build_absolute_uri(product.video_file.url)
    elif product.video_url:
        video_url = product.video_url
        
    image_url = None
    if product.image:
        image_url = request.build_absolute_uri(product.image.url)

    # Features: string split or json? user said "text", let's assume comma separated in model
    features_list = []
    if product.features:
        features_list = [f.strip() for f in product.features.split(',') if f.strip()]

    return {
        'id': product.id,
        'title': product.title,
        'category': product.subcategory.category.name,
        'subcategory': product.subcategory.name,
        'slug': product.slug,
        'shortDescription': product.short_description,
        'longDescription': product.long_description,
        'image': image_url,
        'videoUrl': video_url,
        'price': product.price,
        'features': features_list,
        'badge': product.badge
    }

def products_fifteen_backend(request):
    """
    Returns products marked for homepage (limit 5 for carousel + extras if needed).
    This maps to ProductsFifteen component.
    """
    products = Product.objects.filter(show_in_homepage=True).order_by('order')[:5]
    data = [get_product_data(request, p) for p in products]
    return JsonResponse(data, safe=False)

@csrf_exempt
def submit_contact(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            product_slug = data.get('product')
            product = None
            if product_slug:
                product = Product.objects.filter(slug=product_slug).first()
            
            Contact.objects.create(
                name=data.get('name'),
                email=data.get('email'),
                subject=data.get('subject'),
                message=data.get('message'),
                product=product
            )
            return JsonResponse({'message': 'Query submitted successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid method'}, status=405)

def products_list(request):
    """
    Returns products, supporting filtering by 'category' (cat ID) or 'subcategory' (subcat ID).
    """
    category_id = request.GET.get('category')
    subcategory_id = request.GET.get('subcategory')
    
    products = Product.objects.all().order_by('order')
    
    if subcategory_id:
        # Check if it's a digit (ID) or slug
        if str(subcategory_id).isdigit():
             products = products.filter(subcategory__id=subcategory_id)
        else:
             products = products.filter(subcategory__slug=subcategory_id)
    elif category_id:
        if str(category_id).isdigit():
            products = products.filter(subcategory__category__id=category_id)
        else:
            products = products.filter(subcategory__category__slug=category_id)
        
    data = [get_product_data(request, p) for p in products]
    return JsonResponse(data, safe=False)

def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug)
    data = get_product_data(request, product)
    
    # Cascading Related Products Logic
    related_products = []
    needed = 4
    
    # 1. Try same SubCategory
    subcat_products = list(Product.objects.filter(
        subcategory=product.subcategory
    ).exclude(slug=slug).order_by('?')[:needed])
    related_products.extend(subcat_products)
    
    # 2. If not enough, try same Category (different subcategories)
    if len(related_products) < needed:
        remaining = needed - len(related_products)
        existing_ids = [p.id for p in related_products] + [product.id]
        
        cat_products = list(Product.objects.filter(
            subcategory__category=product.subcategory.category
        ).exclude(id__in=existing_ids).order_by('?')[:remaining])
        related_products.extend(cat_products)
        
    # 3. If still not enough, grab ANY random products
    if len(related_products) < needed:
        remaining = needed - len(related_products)
        existing_ids = [p.id for p in related_products] + [product.id]
        
        random_products = list(Product.objects.exclude(
            id__in=existing_ids
        ).order_by('?')[:remaining])
        related_products.extend(random_products)

    data['relatedProducts'] = [get_product_data(request, p) for p in related_products]
    
    return JsonResponse(data)

def get_project_data(request, project):
    image_url = None
    if project.image:
        image_url = request.build_absolute_uri(project.image.url)
    
    return {
        'id': project.id,
        'title': project.title,
        'slug': project.slug,
        'image': image_url,
        'description': project.description,
        'long_description': project.long_description,
        'client': project.client,
        'location': project.location,
        'date': project.date,
        'category': project.category,
        'video_url': project.video_url
    }

def projects_list(request):
    projects = Project.objects.all()
    data = [get_project_data(request, p) for p in projects]
    return JsonResponse(data, safe=False)

def project_detail(request, slug):
    project = get_object_or_404(Project, slug=slug)
    data = get_project_data(request, project)
    return JsonResponse(data)

def product_categories(request):
    """
    Returns hierarchy: Categories -> Subcategories with images and metadata.
    """
    categories = Category.objects.all().order_by('order')
    data = []
    for cat in categories:
        subs = cat.subcategories.all().order_by('order')
        
        cat_image = request.build_absolute_uri(cat.image.url) if cat.image else None
        
        data.append({
            'id': cat.id,
            'name': cat.name,
            'slug': cat.slug,
            'description': cat.description,
            'image': cat_image,
            'subcategories': [{
                'id': s.id, 
                'name': s.name,
                'slug': s.slug,
                'description': s.description,
                'image': request.build_absolute_uri(s.image.url) if s.image else None
            } for s in subs]
        })
    return JsonResponse(data, safe=False)




