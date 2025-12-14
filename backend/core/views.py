from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from .models import Navbar, HeaderVideo, Service, Category, SubCategory, Product, Contact, Project, Download, FAQ, Career, About, CompanyInfo

# ...

def about_detail(request):
    about = About.objects.first()
    data = {}
    if about:
        data = {
            'title': about.title,
            'description': about.description,
            'image': request.build_absolute_uri(about.image.url) if about.image else None
        }
    return JsonResponse(data)

def company_info(request):
    info = CompanyInfo.objects.first()
    data = {}
    if info:
        data = {
            'address': info.address,
            'phone': info.phone,
            'email': info.email,
            'facebook': info.facebook,
            'twitter': info.twitter,
            'instagram': info.instagram,
            'linkedin': info.linkedin,
        }
    return JsonResponse(data)

# ...

def faq_list(request):
    faqs = FAQ.objects.filter(is_active=True).order_by('order', '-created_at')
    data = [{
        'id': f.id,
        'question': f.question,
        'answer': f.answer
    } for f in faqs]
    return JsonResponse(data, safe=False)

def career_list(request):
    careers = Career.objects.filter(is_active=True).order_by('order', '-created_at')
    data = [{
        'id': c.id,
        'title': c.title,
        'slug': c.slug,
        'location': c.location,
        'type': c.type,
        'description': c.description, # RichTextField returns HTML
    } for c in careers]
    return JsonResponse(data, safe=False)

def career_detail(request, slug):
    career = get_object_or_404(Career, slug=slug)
    data = {
        'id': career.id,
        'title': career.title,
        'slug': career.slug,
        'location': career.location,
        'type': career.type,
        'description': career.description,
    }
    return JsonResponse(data)
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
            'link': item.url, 
            'is_highlight': item.is_highlight,
            'showInFooter': item.show_in_footer
        }
        for item in items
    ]
    return JsonResponse(data, safe=False)

def header_videos(request):
    # ... (no change, but easier to just replace block if simpler, here I will skip replace if not needed)
    videos = HeaderVideo.objects.filter(is_active=True).order_by('order')
    data = []
    # ... (abbreviated content check, I will only replace navbar_list separately if possible or keep context)
    for video in videos:
         url = None
         if video.video_file:
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
    # ... (Previous helper code) ...
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

    final_media_url = video_url if video_url else image_url

    return {
        'id': service.id,
        'title': service.title,
        'slug': service.slug,  # Ensure slug is here
        'icon': service.icon,
        'description': service.short_description, 
        'shortDescription': service.short_description,
        'longDescription': service.long_description,
        'videoUrl': final_media_url,
        'showInFooter': service.show_in_footer
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


def get_download_data(request, download):
    image_url = None
    if download.image:
        image_url = request.build_absolute_uri(download.image.url)
    
    file_url = None
    file_size = "Unknown"
    if download.file:
        file_url = request.build_absolute_uri(download.file.url)
        try:
            size_bytes = download.file.size
            if size_bytes < 1024 * 1024:
                file_size = f"{size_bytes / 1024:.1f} KB"
            else:
                file_size = f"{size_bytes / (1024 * 1024):.1f} MB"
        except:
             pass

    return {
        'id': download.id,
        'title': download.title,
        'type': download.type,
        'description': download.description,
        'link': file_url,
        'image': image_url,
        'size': file_size
    }

def downloads_list(request):
    downloads = Download.objects.all().order_by('order', '-created_at')
    data = [get_download_data(request, d) for d in downloads]
    return JsonResponse(data, safe=False)






