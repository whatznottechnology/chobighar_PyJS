"""
Django settings for Namecheap shared hosting deployment
Optimized for shared hosting environment with limited resources
"""

import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'di00k#g_9-2h)dwvggsd!9=!$l-j8_0#^#943u3&(y7@bjs^k+')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# Allowed hosts for Namecheap hosting
ALLOWED_HOSTS = [
    'admin.chobighar.com',
    'www.admin.chobighar.com',
    'chobighar.com',
    'www.chobighar.com',
    'yourdomain.com',  # Replace with your actual domain
    'www.yourdomain.com',
    '127.0.0.1',
    'localhost',
]

# Application definition
INSTALLED_APPS = [
    'jazzmin',  # Must be before django.contrib.admin
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'django_filters',
    'header',
    'footer',
    'contact',
    'homepage',
    'aboutpage',
    'photoshootpage',
    'portfolio',
    'vendor',
    'search',
    'inquiry',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'chabighar_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'chabighar_backend.wsgi.application'

# Database - SQLite for shared hosting (most compatible)
# Namecheap shared hosting typically doesn't provide PostgreSQL access
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
        'OPTIONS': {
            'timeout': 30,  # Timeout for database connections
        }
    }
}

# If you have MySQL access on Namecheap, use this configuration instead:
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': os.environ.get('DB_NAME', 'your_database_name'),
#         'USER': os.environ.get('DB_USER', 'your_username'),
#         'PASSWORD': os.environ.get('DB_PASSWORD', 'your_password'),
#         'HOST': os.environ.get('DB_HOST', 'localhost'),
#         'PORT': os.environ.get('DB_PORT', '3306'),
#         'OPTIONS': {
#             'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
#             'charset': 'utf8mb4',
#         },
#     }
# }

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 8,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Dhaka'  # Bangladesh timezone
USE_I18N = True
USE_TZ = True

# Static files configuration for shared hosting - FIXED FOR CSS ISSUES
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'  # Changed to standard Django location
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

# Static files finders - ensure all static files are found
STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

# Media files configuration
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'  # Standard Django location

# Force Django to use absolute URLs for static files in production
USE_STATIC_FILES_ABSOLUTE_URL = True

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS settings - Allow frontend domains and localhost for development
CORS_ALLOWED_ORIGINS = [
    "https://chobighar.com",
    "https://www.chobighar.com",
    "https://admin.chobighar.com",
    "https://www.admin.chobighar.com",
    "http://localhost:3000",  # For local development
    "http://127.0.0.1:3000",  # For local development
]

# Additional CORS settings for better API access
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

CORS_ALLOWED_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

# REST Framework settings - with rate limiting for shared hosting
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '50/hour',  # Lower rates for shared hosting
        'user': '200/hour'
    }
}

# Cache configuration - simple file-based cache for shared hosting
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': BASE_DIR / 'cache',
        'TIMEOUT': 300,
        'OPTIONS': {
            'MAX_ENTRIES': 1000,
        }
    }
}

# Session configuration
SESSION_ENGINE = 'django.contrib.sessions.backends.file'
SESSION_FILE_PATH = BASE_DIR / 'sessions'
SESSION_COOKIE_AGE = 86400  # 24 hours
SESSION_SAVE_EVERY_REQUEST = False

# Security settings for shared hosting
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# Email configuration for shared hosting
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'mail.chobighar.com'  # Your domain's mail server
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', 'admin@chobighar.com')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', 'your-email-password')
DEFAULT_FROM_EMAIL = 'Chabighar Admin <admin@chobighar.com>'

# Logging configuration for shared hosting
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': 'WARNING',  # Only log warnings and errors on shared hosting
            'class': 'logging.FileHandler',
            'filename': BASE_DIR / 'logs' / 'django.log',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['file'],
        'level': 'WARNING',
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'WARNING',
            'propagate': False,
        },
    },
}

# File upload settings
FILE_UPLOAD_MAX_MEMORY_SIZE = 5242880  # 5MB
DATA_UPLOAD_MAX_MEMORY_SIZE = 5242880  # 5MB
DATA_UPLOAD_MAX_NUMBER_FIELDS = 1000

# Jazzmin configuration for Namecheap hosting
JAZZMIN_SETTINGS = {
    "site_title": "Chabighar Admin",
    "site_header": "Chabighar",
    "site_brand": "Chabighar Admin",
    "site_logo": "admin/img/chabighar-logo.png",
    "login_logo": None,
    "site_logo_classes": "img-circle",
    "site_icon": None,
    "welcome_sign": "Welcome to Chabighar Admin Panel",
    "copyright": "© 2025 Chabighar Photography & Events",
    "search_model": ["auth.User", "inquiry.Inquiry", "vendor.VendorProfile", "portfolio.Portfolio"],
    "user_avatar": None,

    # Optimized for shared hosting
    "topmenu_links": [
        {"name": "🏠 Dashboard", "url": "admin:index"},
        {"name": "🌐 View Website", "url": "https://chobighar.com", "new_window": True},
        {"name": "📧 Inquiries", "model": "inquiry.Inquiry"},
    ],

    "usermenu_links": [
        {"name": "🌐 View Website", "url": "https://chobighar.com", "new_window": True},
    ],

    "show_sidebar": True,
    "navigation_expanded": False,  # Collapsed by default for better performance
    "hide_apps": [],
    "hide_models": [],
    "order_with_respect_to": [
        "inquiry", "vendor", "portfolio", "homepage", 
        "header", "footer", "contact", "aboutpage", 
        "photoshootpage", "auth"
    ],

    "icons": {
        "auth": "fas fa-users-cog",
        "auth.user": "fas fa-user",
        "auth.Group": "fas fa-users",
        "inquiry": "fas fa-envelope",
        "vendor": "fas fa-store",
        "portfolio": "fas fa-camera",
        "homepage": "fas fa-home",
        "header": "fas fa-header",
        "footer": "fas fa-align-bottom",
        "contact": "fas fa-address-book",
        "aboutpage": "fas fa-info-circle",
        "photoshootpage": "fas fa-camera-retro",
    },

    "default_icon_parents": "fas fa-chevron-circle-right",
    "default_icon_children": "fas fa-circle",
    "related_modal_active": False,
    
    # Lightweight settings for shared hosting
    "custom_css": "admin/css/custom_admin.css",
    "custom_js": "admin/js/custom_admin.js",
    "use_google_fonts_cdn": False,  # Use local fonts for better performance
    "show_ui_builder": False,
    "changeform_format": "horizontal_tabs",
    "language_chooser": False,
}

JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": False,
    "footer_small_text": True,  # Smaller footer for shared hosting
    "body_small_text": False,
    "brand_small_text": False,
    "brand_colour": "navbar-danger",
    "accent": "accent-danger",
    "navbar": "navbar-dark",
    "no_navbar_border": False,
    "navbar_fixed": False,  # Not fixed for better compatibility
    "layout_boxed": False,
    "footer_fixed": False,
    "sidebar_fixed": False,  # Not fixed for shared hosting
    "sidebar": "sidebar-dark-danger",
    "sidebar_nav_small_text": True,  # Smaller text for space
    "sidebar_disable_expand": False,
    "sidebar_nav_child_indent": True,
    "sidebar_nav_compact_style": True,  # Compact style for shared hosting
    "sidebar_nav_legacy_style": False,
    "sidebar_nav_flat_style": False,
    "theme": "cosmo",
    "dark_mode_theme": None,
    "button_classes": {
        "primary": "btn-primary",
        "secondary": "btn-secondary",
        "info": "btn-info",
        "warning": "btn-warning",
        "danger": "btn-danger",
        "success": "btn-success"
    }
}