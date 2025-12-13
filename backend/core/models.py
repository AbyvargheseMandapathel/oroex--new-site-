from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError
import random
import datetime
import string
from ckeditor.fields import RichTextField
from django.utils.text import slugify

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    # OTP fields
    otp = models.CharField(max_length=6, blank=True, null=True)
    otp_created_at = models.DateTimeField(blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def generate_otp(self):
        self.otp = f"{random.randint(100000, 999999)}"
        self.otp_created_at = timezone.now()
        self.save()
        # In a real app, send email here.
        # For now, we will print it to console or just assume it's sent.
        print(f"OTP for {self.email} is {self.otp}")
        return self.otp

    def verify_otp(self, otp_code):
        if self.otp == otp_code and self.otp_created_at:
            # Check expiry (e.g., 5 minutes)
            if timezone.now() < self.otp_created_at + datetime.timedelta(minutes=5):
                # Clear OTP after successful verification? 
                # Maybe keep it for the session - but usually clear it.
                # For admin login, we verify credentials.
                return True
        return False

class Navbar(models.Model):
    label = models.CharField(max_length=100)
    url = models.CharField(max_length=200)
    order = models.PositiveIntegerField(default=0)
    is_highlight = models.BooleanField(default=False, help_text="Check to highlight this item (e.g. Contact Us button)")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.label

class HeaderVideo(models.Model):
    video_url = models.URLField(blank=True, null=True, help_text="URL of the video (e.g. YouTube embed or direct link)")
    video_file = models.FileField(upload_to='header_videos/', blank=True, null=True, help_text="Upload a video file")
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']

    def clean(self):
        if not self.video_url and not self.video_file:
            raise ValidationError("Please provide either a Video URL or upload a Video File.")

    def __str__(self):
        return f"Video {self.id} ({'Active' if self.is_active else 'Inactive'})"

class Service(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, null=True)
    icon = models.CharField(max_length=100, help_text="Icon name (e.g. Installation, Maintenance)")
    short_description = models.TextField(help_text="Short description for homepage/cards")
    long_description = RichTextField(help_text="Detailed description with rich text", blank=True, null=True)
    video_url = models.URLField(blank=True, null=True, help_text="Video URL")
    image_url = models.URLField(blank=True, null=True, help_text="Image URL")
    video_file = models.FileField(upload_to='services/videos/', blank=True, null=True)
    image_file = models.ImageField(upload_to='services/images/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    show_in_homepage = models.BooleanField(default=False, help_text="Show in homepage (limit 6)")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']

    def clean(self):
        if not any([self.video_url, self.image_url, self.video_file, self.image_file]):
            raise ValidationError("Please provide at least one media source (Video/Image URL or File).")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class Category(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, null=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['order']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class SubCategory(models.Model):
    category = models.ForeignKey(Category, related_name='subcategories', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, null=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='subcategories/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = "SubCategories"
        ordering = ['order']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.category.name} - {self.name}"

class Product(models.Model):
    subcategory = models.ForeignKey(SubCategory, related_name='products', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, null=True)
    short_description = models.TextField(help_text="Short description for cards")
    long_description = RichTextField(help_text="Detailed description", blank=True, null=True)
    price = models.CharField(max_length=50, default="Contact for Quote", help_text="e.g. $100 or Contact for Quote")
    image = models.ImageField(upload_to='products/images/', help_text="Main product image")
    video_url = models.URLField(blank=True, null=True, help_text="Video URL")
    video_file = models.FileField(upload_to='products/videos/', blank=True, null=True)
    features = models.TextField(blank=True, null=True, help_text="Comma-separated features e.g. High Efficiency, Durable")
    badge = models.CharField(max_length=50, blank=True, null=True, help_text="Badge text e.g. New Arrival")
    order = models.PositiveIntegerField(default=0)
    show_in_homepage = models.BooleanField(default=False, help_text="Show in homepage (limit 5 for carousel)")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, blank=True, null=True, related_name='inquiries')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.subject} - {self.email}"

class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, null=True)
    image = models.ImageField(upload_to='projects/images/', help_text="Main project image")
    description = models.TextField(help_text="Short description")
    long_description = RichTextField(help_text="Detailed description", blank=True, null=True)
    client = models.CharField(max_length=200, blank=True, null=True)
    location = models.CharField(max_length=200, blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True, help_text="Industry/Category e.g. Oil & Gas")
    video_url = models.URLField(blank=True, null=True, help_text="Optional video link")
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-date']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


