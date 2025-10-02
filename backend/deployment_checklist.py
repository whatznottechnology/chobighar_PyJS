#!/usr/bin/env python#!/usr/bin/env python#!/usr/bin/env python3

"""

Simple deployment checklist for chobighar backend""""""

"""

Deployment checklist for chobighar backendPre-deployment checklist for chobighar Backend

import os

import sysRun this script to verify your setup is ready for productionRun this script to verify everything is ready for Namecheap shared hosting

import subprocess

from pathlib import Path""""""



def main():

    print("🚀 chobighar BACKEND DEPLOYMENT CHECKLIST")

    print("="*60)import osimport os

    

    # Check if we're in the right directoryimport sysimport sys

    if not Path('manage.py').exists():

        print("❌ Error: manage.py not found. Please run this script from the backend directory.")import subprocessimport django

        return False

    from pathlib import Pathfrom pathlib import Path

    print("✅ Found manage.py - in correct directory")

    import subprocess

    # Check Django

    try:def check_environment():

        result = subprocess.run([sys.executable, 'manage.py', 'check'], capture_output=True, text=True, check=True)

        print("✅ Django check passed")    """Check if environment variables are set"""# Add the project directory to Python path

    except subprocess.CalledProcessError as e:

        print(f"❌ Django check failed: {e}")    print("🔍 Checking Environment Variables...")sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

        return False

        

    # Check required files

    required_files = ['manage.py', 'requirements_production.txt', 'chobighar_backend/settings.py']    required_vars = ['DJANGO_DEBUG', 'DJANGO_SECRET_KEY']# Set up Django

    for file_path in required_files:

        if Path(file_path).exists():    optional_vars = ['DJANGO_SETTINGS_MODULE']os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chobighar_backend.settings_namecheap')

            print(f"✅ {file_path} exists")

        else:    django.setup()

            print(f"❌ {file_path} is missing")

        all_good = True

    # Check environment variables

    print("\n🔍 Environment Variables:")    from django.core.management import call_command

    if os.environ.get('DJANGO_SECRET_KEY'):

        print("✅ DJANGO_SECRET_KEY is set")    for var in required_vars:from django.conf import settings

    else:

        print("⚠️  DJANGO_SECRET_KEY not set (set for production)")        if os.environ.get(var):from django.core.exceptions import ImproperlyConfigured

    

    if os.environ.get('DJANGO_DEBUG'):            print(f"✅ {var} is set")

        print(f"✅ DJANGO_DEBUG is set to: {os.environ.get('DJANGO_DEBUG')}")

    else:        else:def check_mark():

        print("ℹ️  DJANGO_DEBUG not set (will use default)")

                print(f"⚠️  {var} is not set (recommended for production)")    return "✅"

    print("\n🎉 Basic checks completed!")

    print("\n📋 For production deployment:")            if var == 'DJANGO_SECRET_KEY':

    print("1. Set DJANGO_DEBUG=False")

    print("2. Set DJANGO_SECRET_KEY to a secure value")                print("   You can generate one at: https://djecrety.ir/")def cross_mark():

    print("3. Run: python manage.py collectstatic --noinput")

    print("4. Run: python manage.py migrate")            all_good = False    return "❌"

    print("5. Upload to admin.chobighar.com")

        

    return True

    for var in optional_vars:def warning_mark():

if __name__ == '__main__':

    main()        if os.environ.get(var):    return "⚠️"

            print(f"✅ {var} is set to: {os.environ.get(var)}")

        else:def print_header(title):

            print(f"ℹ️  {var} is not set (will use default)")    print(f"\n{'='*50}")

        print(f" {title}")

    return all_good    print(f"{'='*50}")



def check_django_setup():def print_subheader(title):

    """Check if Django setup is working"""    print(f"\n{'-'*30}")

    print("\n🔍 Checking Django Setup...")    print(f" {title}")

        print(f"{'-'*30}")

    try:

        result = subprocess.run([def main():

            sys.executable, 'manage.py', 'check'    print_header("chobighar BACKEND DEPLOYMENT CHECKLIST")

        ], capture_output=True, text=True, check=True)    print("🚀 Preparing for Namecheap Shared Hosting Deployment")

            

        print("✅ Django check passed")    issues = []

        return True    warnings = []

            

    except subprocess.CalledProcessError as e:    # Check 1: Django Settings

        print(f"❌ Django check failed: {e}")    print_subheader("Django Configuration")

        print(f"Error output: {e.stderr}")    

        return False    try:

        print(f"{check_mark()} Django settings loaded successfully")

def check_static_files():        print(f"   Settings module: {settings.SETTINGS_MODULE}")

    """Check static files configuration"""    except Exception as e:

    print("\n🔍 Checking Static Files...")        print(f"{cross_mark()} Django settings error: {e}")

            issues.append("Django settings configuration")

    try:    

        result = subprocess.run([    # Debug mode check

            sys.executable, 'manage.py', 'collectstatic', '--dry-run', '--noinput'    if not settings.DEBUG:

        ], capture_output=True, text=True, check=True)        print(f"{check_mark()} DEBUG = False (Production ready)")

            else:

        print("✅ Static files configuration is correct")        print(f"{cross_mark()} DEBUG = True (Should be False for production)")

        return True        issues.append("DEBUG mode is enabled")

            

    except subprocess.CalledProcessError as e:    # Secret key check

        print(f"❌ Static files check failed: {e}")    if settings.SECRET_KEY != 'your-production-secret-key-change-this':

        print(f"Error output: {e.stderr}")        print(f"{check_mark()} SECRET_KEY is configured")

        return False    else:

        print(f"{cross_mark()} SECRET_KEY needs to be changed")

def check_database():        issues.append("Default SECRET_KEY in use")

    """Check database migrations"""    

    print("\n🔍 Checking Database...")    # Check 2: Database

        print_subheader("Database Configuration")

    try:    

        result = subprocess.run([    try:

            sys.executable, 'manage.py', 'showmigrations'        from django.db import connection

        ], capture_output=True, text=True, check=True)        cursor = connection.cursor()

                cursor.execute("SELECT 1")

        print("✅ Database migrations check passed")        print(f"{check_mark()} Database connection successful")

        return True        print(f"   Database: {settings.DATABASES['default']['ENGINE']}")

            except Exception as e:

    except subprocess.CalledProcessError as e:        print(f"{cross_mark()} Database connection failed: {e}")

        print(f"❌ Database check failed: {e}")        issues.append("Database connection")

        print(f"Error output: {e.stderr}")    

        return False    # Check 3: Static Files

    print_subheader("Static Files")

def check_dependencies():    

    """Check if required packages are installed"""    static_root = Path(settings.STATIC_ROOT)

    print("\n🔍 Checking Dependencies...")    if static_root.exists():

            print(f"{check_mark()} STATIC_ROOT exists: {static_root}")

    required_packages = [    else:

        'django',        print(f"{warning_mark()} STATIC_ROOT doesn't exist: {static_root}")

        'djangorestframework',         warnings.append("STATIC_ROOT directory missing")

        'django-jazzmin',    

        'django-cors-headers',    # Check for admin CSS

        'whitenoise',    admin_css_path = static_root / 'admin' / 'css' / 'base.css'

        'pillow'    if admin_css_path.exists():

    ]        print(f"{check_mark()} Admin CSS files found")

        else:

    all_installed = True        print(f"{warning_mark()} Admin CSS files missing - run collectstatic")

            warnings.append("Admin CSS files missing")

    for package in required_packages:    

        try:    # Check custom admin CSS

            __import__(package.replace('-', '_'))    custom_css_path = static_root / 'admin' / 'css' / 'custom_admin.css'

            print(f"✅ {package} is installed")    if custom_css_path.exists():

        except ImportError:        print(f"{check_mark()} Custom admin CSS found")

            print(f"❌ {package} is NOT installed")    else:

            all_installed = False        print(f"{warning_mark()} Custom admin CSS missing")

            warnings.append("Custom admin CSS missing")

    return all_installed    

    # Check 4: Media Files

def check_files():    print_subheader("Media Files")

    """Check if required files exist"""    

    print("\n🔍 Checking Required Files...")    media_root = Path(settings.MEDIA_ROOT)

        if media_root.exists():

    required_files = [        print(f"{check_mark()} MEDIA_ROOT exists: {media_root}")

        'manage.py',    else:

        'requirements_production.txt',        print(f"{warning_mark()} MEDIA_ROOT doesn't exist: {media_root}")

        'chobighar_backend/settings.py',        warnings.append("MEDIA_ROOT directory missing")

        'chobighar_backend/urls.py',    

        'chobighar_backend/wsgi.py',    # Check 5: CORS Configuration

    ]    print_subheader("CORS Configuration")

        

    all_exist = True    cors_origins = getattr(settings, 'CORS_ALLOWED_ORIGINS', [])

        expected_origins = [

    for file_path in required_files:        'https://chobighar.com',

        if Path(file_path).exists():        'https://admin.chobighar.com',

            print(f"✅ {file_path} exists")        'http://localhost:3000'

        else:    ]

            print(f"❌ {file_path} is missing")    

            all_exist = False    for origin in expected_origins:

            if origin in cors_origins:

    return all_exist            print(f"{check_mark()} CORS origin allowed: {origin}")

        else:

def display_summary(checks):            print(f"{cross_mark()} CORS origin missing: {origin}")

    """Display summary of all checks"""            issues.append(f"CORS origin missing: {origin}")

    print("\n" + "="*60)    

    print("📊 DEPLOYMENT CHECKLIST SUMMARY")    # Check 6: Required Apps

    print("="*60)    print_subheader("Installed Apps")

        

    passed = sum(checks.values())    required_apps = [

    total = len(checks)        'jazzmin',

            'django.contrib.admin',

    for check_name, result in checks.items():        'rest_framework',

        status = "✅ PASS" if result else "❌ FAIL"        'corsheaders',

        print(f"{check_name}: {status}")        'header',

            'footer',

    print(f"\nOverall: {passed}/{total} checks passed")        'homepage',

            'portfolio',

    if passed == total:        'vendor',

        print("\n🎉 All checks passed! Your backend is ready for production deployment.")        'inquiry'

        print("\n📋 Next steps:")    ]

        print("1. Set production environment variables")    

        print("2. Upload files to your server")    for app in required_apps:

        print("3. Run: python manage.py collectstatic --noinput")        if app in settings.INSTALLED_APPS:

        print("4. Run: python manage.py migrate")            print(f"{check_mark()} App installed: {app}")

        print("5. Create superuser: python manage.py createsuperuser")        else:

        print("6. Test deployment: curl https://admin.chobighar.com/health/")            print(f"{cross_mark()} App missing: {app}")

                    issues.append(f"Missing app: {app}")

    else:    

        print(f"\n⚠️  {total - passed} checks failed. Please fix the issues above before deployment.")    # Check 7: Middleware

    print_subheader("Middleware Configuration")

def main():    

    """Run all deployment checks"""    required_middleware = [

    print("🚀 chobighar BACKEND DEPLOYMENT CHECKLIST")        'corsheaders.middleware.CorsMiddleware',

    print("="*60)        'django.middleware.security.SecurityMiddleware',

            'django.contrib.auth.middleware.AuthenticationMiddleware',

    # Check if we're in the right directory    ]

    if not Path('manage.py').exists():    

        print("❌ Error: manage.py not found. Please run this script from the backend directory.")    for middleware in required_middleware:

        return False        if middleware in settings.MIDDLEWARE:

                print(f"{check_mark()} Middleware configured: {middleware}")

    # Run all checks        else:

    checks = {            print(f"{cross_mark()} Middleware missing: {middleware}")

        "Environment Variables": check_environment(),            issues.append(f"Missing middleware: {middleware}")

        "Django Setup": check_django_setup(),    

        "Static Files": check_static_files(),    # Check 8: File Permissions (if on Unix-like system)

        "Database": check_database(),    print_subheader("File Structure")

        "Dependencies": check_dependencies(),    

        "Required Files": check_files(),    important_files = [

    }        'passenger_wsgi.py',

            'manage.py',

    # Display summary        'chobighar_backend/settings_namecheap.py',

    display_summary(checks)        'chobighar_backend/urls.py',

        ]

    return all(checks.values())    

    for file_path in important_files:

if __name__ == '__main__':        if Path(file_path).exists():

    success = main()            print(f"{check_mark()} File exists: {file_path}")

    sys.exit(0 if success else 1)        else:
            print(f"{cross_mark()} File missing: {file_path}")
            issues.append(f"Missing file: {file_path}")
    
    # Check 9: Environment Variables
    print_subheader("Environment Configuration")
    
    env_vars = {
        'DJANGO_SETTINGS_MODULE': 'chobighar_backend.settings_namecheap',
        'DJANGO_ENV': 'production'
    }
    
    for var, expected in env_vars.items():
        actual = os.environ.get(var)
        if actual == expected:
            print(f"{check_mark()} Environment variable: {var} = {actual}")
        else:
            print(f"{warning_mark()} Environment variable: {var} = {actual} (expected: {expected})")
            warnings.append(f"Environment variable {var} not set correctly")
    
    # Check 10: URL Configuration
    print_subheader("URL Configuration")
    
    try:
        from django.urls import reverse
        admin_url = reverse('admin:index')
        print(f"{check_mark()} Admin URL configured: {admin_url}")
    except Exception as e:
        print(f"{cross_mark()} URL configuration error: {e}")
        issues.append("URL configuration")
    
    # Final Summary
    print_header("DEPLOYMENT SUMMARY")
    
    if not issues and not warnings:
        print(f"{check_mark()} ALL CHECKS PASSED! Ready for deployment!")
        print("\n🚀 Next steps:")
        print("1. Upload files to Namecheap hosting")
        print("2. Run setup_namecheap.sh script")
        print("3. Create superuser account")
        print("4. Test admin panel at https://admin.chobighar.com")
        return True
    
    if issues:
        print(f"\n{cross_mark()} CRITICAL ISSUES FOUND ({len(issues)}):")
        for i, issue in enumerate(issues, 1):
            print(f"   {i}. {issue}")
    
    if warnings:
        print(f"\n{warning_mark()} WARNINGS ({len(warnings)}):")
        for i, warning in enumerate(warnings, 1):
            print(f"   {i}. {warning}")
    
    if not issues:
        print(f"\n{check_mark()} Ready for deployment with warnings")
        print("You can proceed with deployment, but address warnings for optimal performance.")
    else:
        print(f"\n{cross_mark()} NOT READY for deployment")
        print("Please fix critical issues before deploying.")
    
    print("\n📋 Quick fixes:")
    print("- Run: python manage.py collectstatic --settings=chobighar_backend.settings_namecheap")
    print("- Create missing directories: mkdir -p staticfiles media logs cache sessions")
    print("- Update SECRET_KEY in settings_namecheap.py")
    
    return len(issues) == 0

if __name__ == "__main__":
    try:
        success = main()
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"\n{cross_mark()} Checklist failed with error: {e}")
        sys.exit(1)