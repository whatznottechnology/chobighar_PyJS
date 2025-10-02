# 🚀 chobighar BACKEND - PRODUCTION DEPLOYMENT GUIDE

## 📋 **PRODUCTION SETUP FOR admin.chobighar.com**

Your Django backend is now ready for production deployment with the following configurations:

### 🔧 **Current Settings Configuration**

The main `settings.py` file is already configured with:

- ✅ **Environment-aware DEBUG mode**: Uses `DJANGO_DEBUG` environment variable
- ✅ **Secure SECRET_KEY**: Uses `DJANGO_SECRET_KEY` environment variable
- ✅ **Production hosts**: Includes `admin.chobighar.com`, `chobighar.com`
- ✅ **CORS configuration**: Supports both production and development domains
- ✅ **Static files**: Configured with WhiteNoise for production serving
- ✅ **Security headers**: XSS protection, content type sniffing prevention
- ✅ **Logging**: File and console logging configured
- ✅ **Admin theme**: Jazzmin with chobighar branding

### 🌐 **CORS Configuration**

The backend will accept requests from:
- `https://chobighar.com` (Production frontend)
- `https://www.chobighar.com`
- `https://admin.chobighar.com`
- `https://www.admin.chobighar.com`
- `http://localhost:3000` (Development)
- `http://127.0.0.1:3000` (Development)

### 🚀 **Deployment Steps**

#### 1. **Set Environment Variables**
On your production server, set these environment variables:

```bash
export DJANGO_DEBUG=False
export DJANGO_SECRET_KEY="your-super-secret-production-key-here"
export DJANGO_SETTINGS_MODULE="chobighar_backend.settings"
```

#### 2. **Install Dependencies**
```bash
pip install -r requirements_production.txt
```

#### 3. **Collect Static Files**
```bash
python manage.py collectstatic --noinput
```

#### 4. **Run Database Migrations**
```bash
python manage.py migrate
```

#### 5. **Create Superuser**
```bash
python manage.py createsuperuser
```

#### 6. **Test Health Check**
```bash
curl https://admin.chobighar.com/health/
```

### 📁 **File Structure for Production**
```
/home/youruser/admin.chobighar.com/
├── manage.py
├── requirements_production.txt
├── db.sqlite3
├── chobighar_backend/
│   ├── settings.py
│   ├── urls.py
│   └── ...
├── staticfiles/          # Collected static files
├── media/               # User uploaded files
├── logs/                # Application logs
└── all Django apps...
```

### 🔐 **Security Checklist**

- ✅ DEBUG = False in production
- ✅ Strong SECRET_KEY set via environment variable
- ✅ ALLOWED_HOSTS configured
- ✅ CORS properly configured
- ✅ Security headers enabled
- ⚠️  SSL/HTTPS (configure when domain is ready)
- ⚠️  Secure cookies (enable when SSL is active)

### 🎯 **API Endpoints Available**

Once deployed at `admin.chobighar.com`, these endpoints will be available:

**Main URLs:**
- `https://admin.chobighar.com/admin/` - Admin panel
- `https://admin.chobighar.com/health/` - Health check
- `https://admin.chobighar.com/api/` - API root

**API Endpoints:**
- `https://admin.chobighar.com/api/header/` - Header data
- `https://admin.chobighar.com/api/footer/` - Footer data
- `https://admin.chobighar.com/api/homepage/` - Homepage data
- `https://admin.chobighar.com/api/vendor/` - Vendor APIs
- `https://admin.chobighar.com/api/portfolio/` - Portfolio APIs
- `https://admin.chobighar.com/api/inquiry/` - Inquiry submission
- `https://admin.chobighar.com/api/contact/` - Contact form
- `https://admin.chobighar.com/api/search/` - Search functionality

### 🔧 **Frontend Integration**

Update your Next.js environment variables:

**For Production:**
```env
NEXT_PUBLIC_API_BASE_URL=https://admin.chobighar.com
```

**For Development:**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### 🐞 **Troubleshooting**

**Common Issues:**

1. **CORS Errors**
   - Ensure the frontend domain is in `CORS_ALLOWED_ORIGINS`
   - Check protocol (http vs https)

2. **Static Files Not Loading**
   - Run `python manage.py collectstatic --noinput`
   - Check `STATIC_ROOT` and `STATIC_URL` settings

3. **500 Internal Server Error**
   - Check logs in `/logs/django.log`
   - Verify environment variables are set
   - Ensure database migrations are applied

4. **Admin Panel Not Accessible**
   - Create superuser: `python manage.py createsuperuser`
   - Check `ALLOWED_HOSTS` includes your domain

### 📊 **Monitoring**

**Health Check Endpoints:**
- `/health/` - Overall application health
- `/health/ready/` - Readiness probe
- `/health/live/` - Liveness probe

**Log Files:**
- Application logs: `logs/django.log`
- Server logs: Check your hosting provider's logs

### 🎉 **Success Indicators**

Your deployment is successful when:
- ✅ `https://admin.chobighar.com/admin/` shows login page
- ✅ `https://admin.chobighar.com/health/` returns JSON health status
- ✅ API endpoints return proper JSON responses
- ✅ CORS requests work from `chobighar.com`
- ✅ Static files load properly (CSS, JS, images)

### 🆘 **Support**

If you encounter issues:
1. Check the Django logs in `logs/django.log`
2. Verify all environment variables are set
3. Test health endpoints
4. Check CORS configuration
5. Verify static files are collected

Your backend is now production-ready for `admin.chobighar.com`! 🌟