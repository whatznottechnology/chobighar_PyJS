#!/usr/bin/env python3
"""
Passenger WSGI file for Namecheap shared hosting
This file is required for deploying Django applications on Namecheap shared hosting
"""

import os
import sys
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add your project directory to the Python path
# Update this path to match your actual directory structure on Namecheap
project_home = '/home/chobtclq/public_html/admin'  # Correct path for Namecheap shared hosting
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# The backend files are directly in the admin directory on shared hosting
# No separate backend subdirectory needed

# Set environment variables for Namecheap production
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chabighar_backend.settings_namecheap')
os.environ.setdefault('DJANGO_ENV', 'production')

try:
    # Import Django WSGI application
    from django.core.wsgi import get_wsgi_application
    from django.conf import settings
    
    # Log successful import
    logger.info("Django WSGI application imported successfully")
    logger.info(f"Using settings: {os.environ.get('DJANGO_SETTINGS_MODULE')}")
    
    # Create WSGI application
    application = get_wsgi_application()
    
    # Log successful application creation
    logger.info("WSGI application created successfully")
    
except ImportError as e:
    logger.error(f"ImportError: {e}")
    logger.error("Make sure Django is installed and the project path is correct")
    raise
except Exception as e:
    logger.error(f"Error creating WSGI application: {e}")
    raise

# For debugging purposes (remove in production)
if __name__ == "__main__":
    logger.info("Passenger WSGI file loaded successfully")
    logger.info(f"Python path: {sys.path}")
    logger.info(f"Project home: {project_home}")
    logger.info(f"Django settings: {os.environ.get('DJANGO_SETTINGS_MODULE')}")