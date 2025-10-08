# Popup Configuration Guide

## Problem
After deploying to Vercel, the popup is not showing on the homepage after 5 seconds.

## Root Cause
The popup requires **PopupSettings** to be created in the **production database**. The local database has this configuration, but production doesn't.

## Solution

### Option 1: Using Django Admin (Recommended)
1. Login to your production Django admin: `https://your-backend-domain.com/admin/`
2. Go to **Blog** → **Popup Settings**
3. Click **"Add Popup Settings"**
4. Fill in:
   - ✅ **Is Active**: Checked
   - **Popup Title**: "Book Your Dream Photography Session!"
   - **Popup Subtitle**: "Fill out the form below and we will contact you soon"
   - **Show Delay**: 5000 (milliseconds = 5 seconds)
   - **Cookie Duration Days**: 7
   - **Popup Image**: (optional) Upload an image
5. Click **Save**

### Option 2: Using Management Command
SSH into your production server and run:
```bash
cd /path/to/backend
python manage.py create_popup_settings
```

### Option 3: Using Setup Script
SSH into your production server and run:
```bash
cd /path/to/backend
python setup_popup.py
```

### Option 4: Using Django Shell
SSH into your production server and run:
```bash
cd /path/to/backend
python manage.py shell
```

Then in the shell:
```python
from blog.models import PopupSettings

PopupSettings.objects.create(
    is_active=True,
    popup_title='Book Your Dream Photography Session!',
    popup_subtitle='Fill out the form below and we will contact you soon',
    show_delay=5000,
    cookie_duration_days=7
)
```

## Verification

### 1. Check API Response
Visit: `https://your-backend-domain.com/api/blog/popup-settings/active/`

You should see:
```json
{
  "id": 1,
  "is_active": true,
  "popup_title": "Book Your Dream Photography Session!",
  "popup_subtitle": "Fill out the form below and we will contact you soon",
  "show_delay": 5000,
  "cookie_duration_days": 7,
  "popup_image": null
}
```

### 2. Check Frontend Console
1. Open your homepage: `https://your-vercel-domain.com/`
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. You should see:
   ```
   🎨 Popup Settings: {isHomepage: true, pathname: '/', loading: false, isActive: true, showDelay: 5000}
   ⏰ Popup will show in 5000ms (5 seconds)
   ✅ Showing popup now!
   ```

### 3. Visual Check
- Visit homepage
- Wait 5 seconds
- Popup should appear automatically
- Popup only shows on homepage (not on /about, /vendors, etc.)

## How It Works

### Frontend (`components/FirstTimePopup.tsx`)
```typescript
useEffect(() => {
  // Only show on homepage
  const isHomepage = pathname === '/';
  
  if (isHomepage && !loading && settings?.is_active) {
    // Always show popup after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }
}, [pathname, loading, settings]);
```

### Backend API (`/api/blog/popup-settings/active/`)
Returns active popup settings from database.

### Key Features
- ✅ Shows **ONLY on homepage** (`/` route)
- ✅ Appears after **exactly 5 seconds**
- ✅ Shows **every time** (no cookie tracking)
- ✅ Debug logs in browser console
- ✅ Responsive design with red CTA button

## Troubleshooting

### Popup still not showing?

1. **Check API is responding:**
   ```bash
   curl https://your-backend-domain.com/api/blog/popup-settings/active/
   ```

2. **Check database:**
   ```bash
   python manage.py shell -c "from blog.models import PopupSettings; ps = PopupSettings.objects.first(); print(f'Active: {ps.is_active if ps else None}')"
   ```

3. **Check browser console** for errors or logs

4. **Clear browser cache** or try incognito mode

5. **Verify you're on homepage** (not a subpage)

6. **Wait the full 5 seconds** - don't refresh too quickly

## Environment Variables
Make sure your Vercel frontend has:
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

## Files Modified
- ✅ `components/FirstTimePopup.tsx` - Homepage-only popup with 5s delay
- ✅ `backend/blog/models.py` - PopupSettings model
- ✅ `backend/blog/views.py` - PopupSettingsViewSet API
- ✅ `backend/blog/management/commands/create_popup_settings.py` - Setup command
- ✅ `backend/setup_popup.py` - Setup script

## Support
If popup still doesn't show after following these steps:
1. Check all verification steps above
2. Share browser console logs
3. Share API response from `/api/blog/popup-settings/active/`
