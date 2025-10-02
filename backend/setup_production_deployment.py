#!/usr/bin/env python
"""
Production Deployment Setup Script
This script sets up the environment for production deployment
"""

import os
import sys
import shutil
import subprocess
from pathlib import Path

def create_env_file():
    """Create .env file if it doesn't exist"""
    env_file = Path('.env')
    if not env_file.exists():
        print("📝 Creating .env file from template...")
        shutil.copy('.env.example', '.env')
        print("✅ .env file created! Please edit it with your production values.")
        return False
    else:
        print("✅ .env file already exists")
        return True

def check_environment():
    """Check environment configuration"""
    print("🔍 Checking environment configuration...")
    
    # Load environment variables from .env file
    if Path('.env').exists():
        from decouple import config
        
        # Check critical settings
        secret_key = config('DJANGO_SECRET_KEY', default='')
        debug = config('DJANGO_DEBUG', default=True, cast=bool)
        
        if 'django-insecure' in secret_key or len(secret_key) < 50:
            print("⚠️  WARNING: Please set a secure DJANGO_SECRET_KEY in .env file")
            return False
        else:
            print("✅ Secure SECRET_KEY is configured")
        
        if debug:
            print("⚠️  WARNING: DEBUG is True. Set DJANGO_DEBUG=False for production")
            return False
        else:
            print("✅ DEBUG is set to False for production")
        
        return True
    else:
        print("❌ .env file not found")
        return False

def run_deployment_commands():
    """Run essential deployment commands"""
    print("🚀 Running deployment commands...")
    
    commands = [
        ("python manage.py check", "Django configuration check"),
        ("python manage.py collectstatic --noinput", "Collecting static files"),
        ("python manage.py migrate", "Running database migrations"),
    ]
    
    for command, description in commands:
        print(f"\n📦 {description}...")
        try:
            result = subprocess.run(command.split(), check=True, capture_output=True, text=True)
            print(f"✅ {description} completed successfully")
        except subprocess.CalledProcessError as e:
            print(f"❌ {description} failed: {e}")
            if e.stdout:
                print(f"stdout: {e.stdout}")
            if e.stderr:
                print(f"stderr: {e.stderr}")
            return False
    
    return True

def create_deployment_package():
    """Create a deployment package"""
    print("📦 Creating deployment package...")
    
    # Files and directories to include in deployment
    deployment_items = [
        'manage.py',
        '.env',
        'requirements_production.txt',
        'chabighar_backend/',
        'staticfiles/',
        'media/',
        'db.sqlite3',
        'logs/',
        # All app directories
        'header/',
        'footer/', 
        'contact/',
        'homepage/',
        'aboutpage/',
        'photoshootpage/',
        'portfolio/',
        'vendor/',
        'search/',
        'inquiry/',
    ]
    
    deployment_dir = Path('deployment_package')
    deployment_dir.mkdir(exist_ok=True)
    
    print("Copying files to deployment package...")
    for item in deployment_items:
        source = Path(item)
        if source.exists():
            if source.is_file():
                shutil.copy2(source, deployment_dir / source.name)
                print(f"✅ Copied {item}")
            elif source.is_dir():
                dest = deployment_dir / source.name
                if dest.exists():
                    shutil.rmtree(dest)
                shutil.copytree(source, dest)
                print(f"✅ Copied directory {item}")
        else:
            print(f"⚠️  {item} not found, skipping...")
    
    print(f"✅ Deployment package created in: {deployment_dir.absolute()}")
    return deployment_dir

def create_deployment_instructions():
    """Create deployment instructions file"""
    instructions = """
# CHABIGHAR BACKEND DEPLOYMENT INSTRUCTIONS

## 🚀 Production Deployment Steps

### 1. Upload Files
Upload all files from the deployment_package to your server at admin.chobighar.com

### 2. Set File Permissions (Linux/Unix servers)
```bash
chmod 644 *.py
chmod 755 */
chmod 644 .env
```

### 3. Install Dependencies
```bash
pip install -r requirements_production.txt
```

### 4. Environment Setup
The .env file is already configured for production with:
- DJANGO_DEBUG=False
- Secure SECRET_KEY
- CORS settings for chobighar.com and localhost:3000

### 5. Run Initial Setup Commands
```bash
python manage.py collectstatic --noinput
python manage.py migrate
python manage.py createsuperuser
```

### 6. Test Deployment
Visit these URLs to verify:
- https://admin.chobighar.com/admin/ (Admin panel)
- https://admin.chobighar.com/health/ (Health check)
- https://admin.chobighar.com/api/vendor/categories/ (API test)

### 7. Frontend Integration
Your APIs will be accessible from:
- https://chobighar.com (production frontend)
- http://localhost:3000 (development frontend)

## 📋 API Endpoints Available:
- /admin/ - Django admin panel
- /health/ - Health check endpoint
- /api/vendor/ - Vendor management APIs
- /api/portfolio/ - Portfolio APIs
- /api/inquiry/ - Contact inquiry APIs
- /api/header/ - Header/navigation data
- /api/footer/ - Footer data
- /api/homepage/ - Homepage content
- /api/contact/ - Contact page data

## 🔧 Troubleshooting:
1. If static files don't load: Run `python manage.py collectstatic --noinput`
2. If API calls fail: Check CORS settings in Django admin
3. If images don't show: Verify media file permissions
4. For 500 errors: Check server error logs

## ✅ Deployment Complete!
Your Chabighar backend is now live at admin.chobighar.com
"""
    
    with open('deployment_package/DEPLOYMENT_INSTRUCTIONS.md', 'w') as f:
        f.write(instructions)
    print("✅ Deployment instructions created")

def main():
    """Main deployment setup function"""
    print("🚀 CHABIGHAR BACKEND PRODUCTION SETUP")
    print("=" * 60)
    
    # Check if we're in the right directory
    if not Path('manage.py').exists():
        print("❌ Error: manage.py not found. Please run this script from the backend directory.")
        return False
    
    # Step 1: Create .env file
    env_exists = create_env_file()
    
    # Step 2: Check environment configuration
    if not check_environment():
        print("\n❌ Environment configuration issues found.")
        print("Please edit the .env file and run this script again.")
        return False
    
    # Step 3: Run deployment commands
    if not run_deployment_commands():
        print("❌ Deployment commands failed.")
        return False
    
    # Step 4: Create deployment package
    deployment_dir = create_deployment_package()
    
    # Step 5: Create instructions
    create_deployment_instructions()
    
    print("\n" + "=" * 60)
    print("🎉 DEPLOYMENT SETUP COMPLETE!")
    print("=" * 60)
    print(f"📦 Deployment package ready: {deployment_dir.absolute()}")
    print("📋 Read DEPLOYMENT_INSTRUCTIONS.md for next steps")
    print("\n✅ Ready to zip and upload to admin.chobighar.com!")
    
    return True

if __name__ == '__main__':
    success = main()
    if not success:
        print("\n❌ Setup failed. Please fix the issues above and try again.")
        sys.exit(1)
    else:
        print("\n🚀 You can now zip the deployment_package folder and upload to your server!")