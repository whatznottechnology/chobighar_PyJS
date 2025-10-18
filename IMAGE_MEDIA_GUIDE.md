# Image & Media Configuration Guide

## How It Works

### Development Environment
- **Frontend**: Next.js runs on `http://localhost:3000`
- **Backend**: Django runs on `http://localhost:8000`
- **Media Files**: Next.js proxies `/media/*` requests to Django backend
- **Configuration**: `.env.local` file with `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000`

### Production Environment
- **Frontend**: Deployed to production server (e.g., `https://chobighar.com`)
- **Backend**: Django API server (e.g., `https://admin.chobighar.com`)
- **Media Files**: Next.js rewrites `/media/*` to backend URL automatically
- **Configuration**: Environment variable `NEXT_PUBLIC_API_URL=https://admin.chobighar.com`

## Image Lightbox Features

✅ **Responsive Frame**: Images open in full-screen lightbox
✅ **Next/Previous Navigation**: Arrow buttons and keyboard shortcuts
✅ **Touch/Swipe Support**: Mobile-friendly navigation
✅ **Loading States**: Smooth transitions with loading indicators
✅ **Image Counter**: Shows current image position (e.g., "3 / 10")
✅ **Keyboard Support**: 
   - Arrow Left/Right: Navigate images
   - ESC: Close lightbox
✅ **Touch Gestures**: Swipe left/right on mobile

## Production Deployment Steps

### Step 1: Configure Environment Variables

Create `.env.production` file:
```bash
NEXT_PUBLIC_API_URL=https://admin.chobighar.com
NEXT_PUBLIC_FRONTEND_URL=https://chobighar.com
```

### Step 2: Verify Django Backend

Ensure Django is configured to serve media files in production:

**settings.py**:
```python
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Add to ALLOWED_HOSTS
ALLOWED_HOSTS = ['admin.chobighar.com', 'chobighar.com']

# CORS settings
CORS_ALLOWED_ORIGINS = [
    'https://chobighar.com',
]
```

**urls.py** (for development/testing):
```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # ... your urls
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### Step 3: Build Next.js for Production

```bash
npm run build
npm run start
```

### Step 4: Test Production Build Locally

1. Set environment variable:
   ```bash
   $env:NEXT_PUBLIC_API_URL="http://localhost:8000"
   npm run build
   npm run start
   ```

2. Test:
   - Visit `http://localhost:3000/portfolio`
   - Click on portfolio cards
   - Verify images load
   - Click on images to open lightbox
   - Test next/previous navigation

### Step 5: Deploy to Production Server

#### Option A: Vercel Deployment
1. Connect GitHub repository to Vercel
2. Add environment variable in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL` = `https://admin.chobighar.com`
3. Deploy

#### Option B: Manual Server Deployment
1. Upload built files to server
2. Configure environment variables on server
3. Start Next.js with PM2 or similar process manager

## Troubleshooting

### Images Not Loading in Production

**Problem**: Images show 404 errors
**Solution**: 
1. Check `NEXT_PUBLIC_API_URL` environment variable
2. Verify Django backend is accessible
3. Check Django CORS settings
4. Verify media files exist in Django media directory

### Lightbox Not Opening

**Problem**: Click on image but lightbox doesn't open
**Solution**:
1. Check browser console for errors
2. Verify `ImageLightbox` component is imported
3. Check if `portfolio.images` array has data
4. Review click handler implementation

### Media Proxy Not Working

**Problem**: Media requests not proxied to backend
**Solution**:
1. Restart Next.js dev server after changing `next.config.ts`
2. Verify `rewrites()` function in `next.config.ts`
3. Check environment variable is loaded: `console.log(process.env.NEXT_PUBLIC_API_URL)`

## File Structure

```
chobighar/
├── next.config.ts          # Next.js configuration with media proxy
├── .env.local              # Development environment variables
├── .env.production         # Production environment variables
├── src/
│   ├── config/
│   │   └── api.ts         # API configuration with getMediaUrl()
│   ├── components/
│   │   └── ImageLightbox.tsx  # Reusable lightbox component
│   └── app/
│       └── portfolio/
│           ├── page.tsx    # Portfolio listing with lightbox
│           └── [id]/
│               └── page.tsx  # Portfolio detail with lightbox
└── backend/
    ├── media/              # Django media files directory
    └── chobighar_backend/
        └── settings.py     # Django settings
```

## Important Notes

1. **Next.js Rewrites**: The `rewrites()` function in `next.config.ts` automatically proxies `/media/*` requests to the Django backend URL specified in `NEXT_PUBLIC_API_URL`

2. **Environment Variables**: Must start with `NEXT_PUBLIC_` to be available in the browser

3. **Image Optimization**: Next.js automatically optimizes images. Configure `remotePatterns` in `next.config.ts` for external image sources

4. **Production**: Ensure Django backend is configured with proper CORS headers and serves media files correctly

5. **CDN (Optional)**: For better performance, consider using a CDN for media files in production
