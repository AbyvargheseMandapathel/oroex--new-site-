from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Navbar, HeaderVideo, Service, Category, SubCategory, Product, Contact, Project, Download, FAQ, Career, About, CompanyInfo
from .forms import CustomUserCreationForm, CustomUserChangeForm
# from django_admin_listfilter_dropdown.filters import DropdownFilter, RelatedDropdownFilter, ChoiceDropdownFilter

@admin.register(Navbar)
class NavbarAdmin(admin.ModelAdmin):
    list_display = ('label', 'url', 'order', 'is_highlight', 'show_in_footer', 'show_in_navbar')
    list_editable = ('order', 'is_highlight', 'show_in_footer', 'show_in_navbar')
    search_fields = ('label', 'url')

# ... (NavbarAdmin) ...

class UserAdmin(BaseUserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ('email', 'is_staff', 'is_active')
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('OTP', {'fields': ('otp', 'otp_created_at')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password', 'password_2'),
        }),
    )
    readonly_fields = ('otp', 'otp_created_at')

class SimpleUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_staff', 'is_active')
    search_fields = ('email',)
    ordering = ('email',)
    readonly_fields = ('last_login', 'date_joined')
    exclude = ('otp', 'otp_created_at')

admin.site.register(User, SimpleUserAdmin)

@admin.register(HeaderVideo)
class HeaderVideoAdmin(admin.ModelAdmin):
    list_display = ('id', 'is_active', 'order', 'video_url', 'video_file', 'created_at')
    list_editable = ('is_active', 'order')
    search_fields = ('video_url',)
    ordering = ('order',)

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon', 'show_in_homepage', 'show_in_footer', 'order')
    list_editable = ('show_in_homepage', 'show_in_footer', 'order')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'order')
    list_editable = ('order',)
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}

@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'order')
    list_editable = ('order',)
    search_fields = ('name', 'category__name')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'subcategory', 'price', 'badge', 'show_in_homepage', 'order')
    list_editable = ('show_in_homepage', 'order')
    search_fields = ('title', 'short_description')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('subject', 'name', 'email', 'product', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('product', 'created_at')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'client', 'location', 'date', 'order')
    list_editable = ('order',)
    search_fields = ('title', 'description', 'client')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Download)
class DownloadAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'order', 'created_at')
    list_editable = ('order',)
    search_fields = ('title', 'description', 'type')

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'is_active', 'order', 'created_at')
    list_editable = ('is_active', 'order')
    search_fields = ('question', 'answer')
    ordering = ('order',)

@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'type', 'is_active', 'order', 'created_at')
    list_editable = ('is_active', 'order')
    search_fields = ('title', 'description', 'location')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('order',)

@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'phone')

@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    search_fields = ('title', 'description')

# Custom Admin Site to Group Models
class CustomAdminSite(admin.AdminSite):
    def get_app_list(self, request):
        app_list = super().get_app_list(request)
        
        # Create new groups
        about_group = {
            'name': 'About Page',
            'app_label': 'about_section',
            'app_url': '/admin/core/about/',
            'has_module_perms': True,
            'models': [],
            'order': 0
        }

        company_group = {
            'name': 'Company Settings',
            'app_label': 'company_section',
            'app_url': '/admin/core/companyinfo/',
            'has_module_perms': True,
            'models': [],
            'order': 7
        }

        services_group = {
            'name': 'Services Management',
            'app_label': 'services_section',
            'app_url': '/admin/core/service/', 
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

        projects_group = {
            'name': 'Projects Portfolio',
            'app_label': 'projects_section',
            'app_url': '/admin/core/project/',
            'has_module_perms': True,
            'models': [],
            'order': 3
        }

        downloads_group = {
            'name': 'Downloads Center',
            'app_label': 'downloads_section',
            'app_url': '/admin/core/download/',
            'has_module_perms': True,
            'models': [],
            'order': 4
        }
        
        faq_group = {
            'name': 'FAQ Management',
            'app_label': 'faq_section',
            'app_url': '/admin/core/faq/',
            'has_module_perms': True,
            'models': [],
            'order': 5
        }

        careers_group = {
            'name': 'Careers',
            'app_label': 'careers_section',
            'app_url': '/admin/core/career/',
            'has_module_perms': True,
            'models': [],
            'order': 6
        }

        # Filter and redistribute models
        new_app_list = []
        for app in app_list:
            if app['app_label'] == 'core':
                for model in app['models']:
                    if model['object_name'] == 'About':
                         about_group['models'].append(model)
                    elif model['object_name'] == 'CompanyInfo':
                         company_group['models'].append(model)
                    elif model['object_name'] == 'Service':
                        services_group['models'].append(model)
                    elif model['object_name'] in ['Category', 'SubCategory', 'Product']:
                        products_group['models'].append(model)
                    elif model['object_name'] == 'Project':
                        projects_group['models'].append(model)
                    elif model['object_name'] == 'Download':
                        downloads_group['models'].append(model)
                    elif model['object_name'] == 'FAQ':
                        faq_group['models'].append(model)
                    elif model['object_name'] == 'Career':
                        careers_group['models'].append(model)
                    else:
                        pass
                
                # Rebuild Core app without the moved models
                remaining_models = [m for m in app['models'] 
                                  if m['object_name'] not in ['About', 'CompanyInfo', 'Service', 'Category', 'SubCategory', 'Product', 'Project', 'Download', 'FAQ', 'Career']]
                
                if remaining_models:
                    app['models'] = remaining_models
                    new_app_list.append(app)
            else:
                new_app_list.append(app)

        if about_group['models']:
             new_app_list.insert(0, about_group)
             
        if services_group['models']:
            new_app_list.insert(1, services_group)
        if products_group['models']:
            new_app_list.insert(2, products_group)
        if projects_group['models']:
            new_app_list.insert(3, projects_group)
        if downloads_group['models']:
            new_app_list.insert(4, downloads_group)
        if faq_group['models']:
            new_app_list.insert(5, faq_group)
        if careers_group['models']:
            new_app_list.insert(6, careers_group)
        if company_group['models']:
            new_app_list.insert(7, company_group)
            
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
    custom_admin_site.register(Contact, ContactAdmin)
    custom_admin_site.register(Project, ProjectAdmin)
    custom_admin_site.register(Download, DownloadAdmin)
    custom_admin_site.register(FAQ, FAQAdmin)
    custom_admin_site.register(Career, CareerAdmin)
    custom_admin_site.register(About, AboutAdmin)
    custom_admin_site.register(CompanyInfo, CompanyInfoAdmin)

register_models_to_custom_site()
