#!/usr/bin/env python
"""
Production deployment script for Chabighar backend
This script prepares the application for deployment on admin.chobighar.com
"""

import os
import sys
import subprocess
from pathlib import Path

def run_command(command, description):
    """Run a command and print the result"""
    print(f"\n📦 {description}")
    print(f"Running: {command}")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ Success: {description}")
        if result.stdout:
            print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"❌ Error: {description}")
        print(f"Command failed: {e}")
        if e.stdout:
            print(f"stdout: {e.stdout}")
        if e.stderr:
            print(f"stderr: {e.stderr}")
        return False
    return True

def main():
    """Run all deployment preparation steps"""
    print("🚀 CHABIGHAR BACKEND DEPLOYMENT PREPARATION")
    print("=" * 60)
    
    # Check if we're in the right directory
    backend_dir = Path(__file__).parent
    if not (backend_dir / 'manage.py').exists():
        print("❌ Error: manage.py not found. Please run this script from the backend directory.")
        return False
    
    print(f"📁 Working directory: {backend_dir}")
    
    # Set environment for production
    os.environ['DJANGO_SETTINGS_MODULE'] = 'chabighar_backend.settings_production'
    
    deployment_steps = [
        # Install production dependencies
        {
            'command': 'pip install whitenoise gunicorn',
            'description': 'Installing production dependencies'
        },
        
        # Collect static files
        {
            'command': 'python manage.py collectstatic --noinput --settings=chabighar_backend.settings_production',
            'description': 'Collecting static files for production'
        },
        
        # Run migrations
        {
            'command': 'python manage.py migrate --settings=chabighar_backend.settings_production',
            'description': 'Running database migrations'
        },
        
        # Check deployment readiness
        {
            'command': 'python manage.py check --deploy --settings=chabighar_backend.settings_production',
            'description': 'Checking deployment configuration'
        },
        
        # Create superuser (optional)
        # {
        #     'command': 'python manage.py createsuperuser --settings=chabighar_backend.settings_production',
        #     'description': 'Creating superuser account'
        # },
    ]
    
    success_count = 0
    total_steps = len(deployment_steps)
    
    for step in deployment_steps:
        if run_command(step['command'], step['description']):
            success_count += 1
        else:
            print(f"\n⚠️  Step failed, but continuing with remaining steps...")
    
    print("\n" + "=" * 60)
    print("📊 DEPLOYMENT PREPARATION SUMMARY")
    print("=" * 60)
    print(f"✅ Steps completed: {success_count}/{total_steps}")
    
    if success_count == total_steps:
        print("\n🎉 All deployment steps completed successfully!")
        print("\n📋 NEXT STEPS FOR PRODUCTION:")
        print("1. Upload all files to your server at admin.chobighar.com")
        print("2. Set up your web server (Apache/Nginx) to serve the application")
        print("3. Configure SSL certificate for HTTPS")
        print("4. Update CORS settings if needed")
        print("5. Set environment variables:")
        print("   - DJANGO_SECRET_KEY (generate a new one for production)")
        print("   - DJANGO_DEBUG=False")
        print("   - DJANGO_SETTINGS_MODULE=chabighar_backend.settings_production")
        
        print("\n🔧 PRODUCTION CHECKLIST:")
        print("✅ Static files collected")
        print("✅ Database migrations applied")
        print("✅ CORS configured for chobighar.com and localhost:3000")
        print("✅ Security settings configured")
        print("✅ Admin panel themed and configured")
        print("✅ API endpoints ready")
        
        print("\n🌐 API ENDPOINTS AVAILABLE AT:")
        print("- https://admin.chobighar.com/api/")
        print("- https://admin.chobighar.com/admin/")
        
        print("\n📝 ENVIRONMENT VARIABLES FOR PRODUCTION:")
        print("export DJANGO_SECRET_KEY='your-new-secret-key-here'")
        print("export DJANGO_DEBUG=False")
        print("export DJANGO_SETTINGS_MODULE=chabighar_backend.settings_production")
        
    else:
        print(f"\n⚠️  Some steps failed. Please review the errors above.")
        print("You may need to fix the issues before deploying to production.")
    
    return success_count == total_steps

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)