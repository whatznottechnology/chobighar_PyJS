# Chabighar Backend API - Deployment Verification Checklist
# Server: admin.chobighar.com

## ✅ DEPLOYMENT VERIFICATION CHECKLIST

### 1. Health Check Endpoints
Test these first to ensure the server is responding:
- [ ] https://admin.chobighar.com/health/
- [ ] https://admin.chobighar.com/health/ready/
- [ ] https://admin.chobighar.com/health/live/

### 2. Admin Panel
- [ ] https://admin.chobighar.com/admin/
- [ ] https://admin.chobighar.com/admin/login/
- [ ] Can log in with superuser credentials
- [ ] All admin sections visible (Header, Footer, Homepage, etc.)

### 3. Header APIs
- [ ] https://admin.chobighar.com/api/header/
- [ ] https://admin.chobighar.com/api/header/social-media/
- [ ] https://admin.chobighar.com/api/header/contact-info/
- [ ] https://admin.chobighar.com/api/header/brand-info/
- [ ] Brand logo image accessible via returned URL

### 4. Footer APIs
- [ ] https://admin.chobighar.com/api/footer/

### 5. Contact APIs
- [ ] https://admin.chobighar.com/api/contact/

### 6. Homepage APIs
- [ ] https://admin.chobighar.com/api/homepage/
- [ ] https://admin.chobighar.com/api/homepage/hero-slides/
- [ ] https://admin.chobighar.com/api/homepage/video-testimonials/
- [ ] https://admin.chobighar.com/api/homepage/text-testimonials/
- [ ] https://admin.chobighar.com/api/homepage/faqs/
- [ ] https://admin.chobighar.com/api/homepage/achievements/
- [ ] Hero slide images accessible via returned URLs

### 7. About Page APIs
- [ ] https://admin.chobighar.com/api/aboutpage/

### 8. Photoshoot Page APIs
- [ ] https://admin.chobighar.com/api/photoshootpage/

### 9. Vendor APIs
- [ ] https://admin.chobighar.com/api/vendor/categories/
- [ ] https://admin.chobighar.com/api/vendor/subcategories/
- [ ] https://admin.chobighar.com/api/vendor/profiles/
- [ ] Vendor images accessible via returned URLs

### 10. Portfolio APIs
- [ ] https://admin.chobighar.com/api/portfolio/categories/
- [ ] https://admin.chobighar.com/api/portfolio/portfolios/
- [ ] Portfolio images accessible via returned URLs

### 11. Search APIs
- [ ] https://admin.chobighar.com/api/search/?q=wedding
- [ ] https://admin.chobighar.com/api/search/?q=photography

### 12. Inquiry APIs
- [ ] https://admin.chobighar.com/api/inquiry/categories/

### 13. Media Files (Images)
Test a few sample media URLs:
- [ ] https://admin.chobighar.com/media/brand/[your-logo-file]
- [ ] https://admin.chobighar.com/media/homepage/slider/[your-hero-image]
- [ ] https://admin.chobighar.com/media/vendor_images/[your-vendor-image]

### 14. CORS Configuration
Test from your frontend domain (chobighar.com):
- [ ] API calls work from https://chobighar.com
- [ ] API calls work from https://www.chobighar.com
- [ ] No CORS errors in browser console

### 15. Security Checks
- [ ] HTTPS is enabled and working
- [ ] SSL certificate is valid
- [ ] Admin panel requires authentication
- [ ] APIs return proper JSON responses
- [ ] Error responses are properly formatted

### 16. Performance Checks
- [ ] API response time < 1 second
- [ ] Images load quickly
- [ ] No timeout errors
- [ ] Database queries are optimized

---

## 🧪 QUICK TEST COMMANDS

### Test Health Check (should return JSON with status)
```bash
curl -X GET https://admin.chobighar.com/health/
```

### Test Header API (should return social media, contact, brand info)
```bash
curl -X GET https://admin.chobighar.com/api/header/
```

### Test Hero Slides (should return array of slides with images)
```bash
curl -X GET https://admin.chobighar.com/api/homepage/hero-slides/
```

### Test Vendor Categories (should return array of categories)
```bash
curl -X GET https://admin.chobighar.com/api/vendor/categories/
```

### Test Portfolio (should return array of portfolios)
```bash
curl -X GET https://admin.chobighar.com/api/portfolio/portfolios/
```

---

## 🔍 COMMON ISSUES TO CHECK

### If APIs return 500 errors:
- Check server error logs
- Verify database is accessible
- Ensure all migrations are run
- Check environment variables (.env file)

### If images don't load:
- Verify media files were uploaded to server
- Check MEDIA_ROOT and MEDIA_URL settings
- Ensure web server (Apache/Nginx) serves /media/ directory
- Check file permissions on media directory

### If CORS errors occur:
- Verify CORS_ALLOWED_ORIGINS in settings.py
- Check that chobighar.com is in allowed origins
- Ensure django-cors-headers is installed

### If admin panel doesn't work:
- Check static files are collected (collectstatic)
- Verify STATIC_ROOT and STATIC_URL
- Ensure superuser account is created

---

## ✅ EXPECTED RESPONSES

### Health Check Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-02T...",
  "database": "connected"
}
```

### Header API Response:
```json
{
  "social_media": [...],
  "contact_info": {...},
  "brand_info": {
    "logo_image": "/media/brand/logo.webp",
    "logo_image_url": "https://admin.chobighar.com/media/brand/logo.webp",
    "main_text": "Chobighar",
    "sub_text": "(Art Direction and Design Studio)"
  }
}
```

### Hero Slides Response:
```json
[
  {
    "id": 1,
    "title": "Wedding Photography",
    "image": "/media/homepage/slider/image.jpg",
    "image_url": "https://admin.chobighar.com/media/homepage/slider/image.jpg",
    "alt_text": "Wedding Photography",
    "order": 1
  }
]
```

---

## 🚀 DEPLOYMENT STATUS

**Server**: admin.chobighar.com  
**Status**: ✅ DEPLOYED  
**Backend Framework**: Django 5.2.6  
**Python Version**: 3.12  
**Debug Mode**: False (Production)  

**Frontend Integration**:
- Production: https://chobighar.com
- Development: http://localhost:3000

**CORS Allowed Origins**:
- https://chobighar.com
- https://www.chobighar.com
- https://admin.chobighar.com
- http://localhost:3000 (for development)

---

## 📞 SUPPORT

If any issues are found:
1. Check server error logs
2. Verify .env configuration
3. Ensure all dependencies are installed
4. Run migrations: `python manage.py migrate`
5. Collect static files: `python manage.py collectstatic`

---

**Last Updated**: October 2, 2025  
**Deployment**: Production Ready ✅