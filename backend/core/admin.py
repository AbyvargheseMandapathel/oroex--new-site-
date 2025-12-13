from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Navbar, HeaderVideo, Service, Category, SubCategory, Product

class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'is_staff', 'is_active')
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('OTP', {'fields': ('otp', 'otp_created_at')}),
    )
    readonly_fields = ('otp', 'otp_created_at')

# Remove username from fieldsets as we don't have it
# BaseUserAdmin expects username, so we must override carefully.
# simpler to just inherit from admin.ModelAdmin if BaseUserAdmin assumes username field exists

class SimpleUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_staff', 'is_active')
    search_fields = ('email',)
    ordering = ('email',)
    readonly_fields = ('last_login', 'date_joined')
    exclude = ('otp', 'otp_created_at')

admin.site.register(User, SimpleUserAdmin)

@admin.register(Navbar)
class NavbarAdmin(admin.ModelAdmin):
    list_display = ('label', 'url', 'order', 'is_highlight')
    list_editable = ('order', 'is_highlight')
    search_fields = ('label', 'url')

@admin.register(HeaderVideo)
class HeaderVideoAdmin(admin.ModelAdmin):
    list_display = ('id', 'is_active', 'order', 'video_url', 'video_file', 'created_at')
    list_editable = ('is_active', 'order')
    list_filter = ('is_active',)
    ordering = ('order',)

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon', 'show_in_homepage', 'order')
    list_editable = ('show_in_homepage', 'order')
    search_fields = ('title', 'description')
    list_filter = ('show_in_homepage',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'order')
    list_editable = ('order',)

@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'order')
    list_editable = ('order',)
    list_filter = ('category',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'subcategory', 'price', 'badge', 'show_in_homepage', 'order')
    list_editable = ('show_in_homepage', 'order')
    list_filter = ('show_in_homepage', 'subcategory__category', 'subcategory')
    search_fields = ('title', 'short_description')

# Custom Admin Site to Group Models
class CustomAdminSite(admin.AdminSite):
    def get_app_list(self, request):
        app_list = super().get_app_list(request)
        
        # Create new groups
        services_group = {
            'name': 'Services Management',
            'app_label': 'services_section',
            'app_url': '/admin/core/service/', # Point to service list or keep generic?
            'has_module_perms': True,
            'models': [],
            'order': 1
        }
        
        products_group = {
            'name': 'Products Catalog',
            'app_label': 'products_section',
            'app_url': '/admin/core/product/',
            'has_module_perms': True,
            'models': [],
            'order': 2
        }

        # Filter and redistribute models
        new_app_list = []
        for app in app_list:
            if app['app_label'] == 'core':
                for model in app['models']:
                    if model['object_name'] == 'Service':
                        services_group['models'].append(model)
                    elif model['object_name'] in ['Category', 'SubCategory', 'Product']:
                        products_group['models'].append(model)
                    else:
                        # Keep other core models (User, Navbar, etc) in original Core app?
                        # Or put them in a "General" group?
                        # For now, let's keep them in a modified Core app or just ignore them if we want strict groups?
                        # User wants separate sections. Let's keep the rest in 'Core'.
                        pass
                
                # Rebuild Core app without the moved models
                remaining_models = [m for m in app['models'] 
                                  if m['object_name'] not in ['Service', 'Category', 'SubCategory', 'Product']]
                
                if remaining_models:
                    app['models'] = remaining_models
                    new_app_list.append(app)
            else:
                new_app_list.append(app)

        if services_group['models']:
            new_app_list.insert(0, services_group)
        if products_group['models']:
            new_app_list.insert(1, products_group)
            
        return new_app_list

# Instantiate the custom admin site
custom_admin_site = CustomAdminSite(name='custom_admin')

# Register all models to the custom site as well (or instead of default)
# Since we are replacing the default site in urls.py, we need to register them there.
# But existing decorators @admin.register register to the DEFAULT site.
# Function to re-register models to custom site
def register_models_to_custom_site():
    custom_admin_site.register(User, UserAdmin)
    custom_admin_site.register(Navbar, NavbarAdmin)
    custom_admin_site.register(HeaderVideo, HeaderVideoAdmin)
    custom_admin_site.register(Service, ServiceAdmin)
    custom_admin_site.register(Category, CategoryAdmin)
    custom_admin_site.register(SubCategory, SubCategoryAdmin)
    custom_admin_site.register(Product, ProductAdmin)

register_models_to_custom_site()





