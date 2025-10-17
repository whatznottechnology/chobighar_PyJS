# Promotional Video Troubleshooting Guide

## ✅ Backend Verification - PASSED

### Database Check
```bash
# Run this command to verify:
python -c "import os; os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chobighar_backend.settings'); import django; django.setup(); from portfolio.models import Portfolio; p = Portfolio.objects.first(); print(f'Video ID: {p.promotional_video_id}')"
```

**Result**: ✅ Video ID exists: `4A_90U2LjUA`

### API Check
```bash
# Test API endpoint:
curl http://localhost:8000/api/portfolio/portfolios/priya-arjun-wedding/
```

**Result**: ✅ API returns `promotional_video_id: "4A_90U2LjUA"`

---

## 🔍 Frontend Debugging Steps

### Step 1: Open Browser Console
1. Go to portfolio page: `http://localhost:3000/portfolio/priya-arjun-wedding`
2. Open Developer Tools (F12)
3. Check Console tab

### Step 2: Look for Debug Logs
You should see:
```
Portfolio Data: { id: "priya-arjun-wedding", ... promotional_video_id: "4A_90U2LjUA" }
Promotional Video ID: 4A_90U2LjUA
```

### Step 3: Check if Section Appears
The section will show if `portfolio?.promotional_video_id` has a value.

Look for this text on the page:
- "Watch Our Story"
- "Video ID: 4A_90U2LjUA" (small gray text)

---

## 🐛 Common Issues & Solutions

### Issue 1: Page Not Refreshing
**Solution**: Hard refresh the page
- Windows: `Ctrl + Shift + R` or `Ctrl + F5`
- Mac: `Cmd + Shift + R`

### Issue 2: Next.js Cache
**Solution**: Clear Next.js cache
```bash
cd C:\Users\pmihu\OneDrive\Desktop\chobi
rm -r .next
npm run dev
```

### Issue 3: Video Not Showing
**Possible Causes**:
1. Conditional rendering failed (check console logs)
2. YouTube embed blocked (check browser console for errors)
3. Video ID incorrect format

**Solution**: Check browser console for errors

### Issue 4: Section Not Rendering
**Debug**: Add this temporary code to force show section
```tsx
{/* Always show for testing */}
{true && (
  <section>
    <p>Video ID from backend: {portfolio?.promotional_video_id || 'NOT FOUND'}</p>
  </section>
)}
```

---

## ✅ Verification Checklist

- [x] Migration applied: `0006_portfolio_promotional_video_id.py`
- [x] Model has field: `promotional_video_id`
- [x] Serializer includes field in response
- [x] Database has data: `4A_90U2LjUA`
- [x] API returns field in JSON
- [ ] Frontend receives data (check browser console)
- [ ] Section renders on page
- [ ] Video plays in mobile frame

---

## 🎯 Expected Behavior

When visiting: `http://localhost:3000/portfolio/priya-arjun-wedding`

You should see:
1. **Hero Section** (title, cover image)
2. **CTA Images** (scattered photos in sidebar)
3. **Event Details** (sidebar card)
4. **"Watch Our Story" Section** ← THIS IS THE VIDEO
   - Dark mobile phone SVG frame
   - YouTube video playing inside
   - Autoplay, muted, looping
5. **Gallery Section** (photos/videos tabs)
6. **More Albums**
7. **Quote Form**

---

## 🔧 Quick Fix Commands

### Restart Frontend
```bash
# Stop current dev server (Ctrl+C)
npm run dev
```

### Restart Backend
```bash
cd backend
python manage.py runserver
```

### Clear All Caches
```bash
# Frontend
rm -r .next
npm run dev

# Backend (if needed)
cd backend
python manage.py clear_cache  # if you have cache
```

---

## 📞 Still Not Working?

### Check These:

1. **Is Django server running?**
   ```bash
   # Should show running on http://127.0.0.1:8000
   ```

2. **Is Next.js dev server running?**
   ```bash
   # Should show running on http://localhost:3000
   ```

3. **Check Network Tab in Browser**
   - Go to Network tab
   - Reload page
   - Look for API call to `/api/portfolio/portfolios/priya-arjun-wedding/`
   - Check if response includes `promotional_video_id`

4. **YouTube Embed Working?**
   - Test this URL directly in browser:
   ```
   https://www.youtube.com/embed/4A_90U2LjUA?autoplay=1&mute=1&loop=1
   ```
   - If it doesn't work, video might be private or embed disabled

---

## 🎥 Test Video IDs

If the current video doesn't work, try these public test videos:

- `dQw4w9WgXcQ` - Never Gonna Give You Up (Rick Roll)
- `jNQXAC9IVRw` - Me at the zoo (First YouTube video)
- `9bZkp7q19f0` - Gangnam Style

Update in admin panel and test.

---

## 📋 Current Status

**Backend**: ✅ Working perfectly
- Migration: Applied
- Model: Has field
- Admin: Field visible
- Serializer: Returns data
- API: Sends correct JSON

**Frontend**: ⚠️ Needs verification
- TypeScript: Types updated
- Component: Code added
- Rendering: Conditional on `promotional_video_id`

**Next Step**: Check browser console logs and verify frontend receives the data.

---

**Last Updated**: October 17, 2025
**Video ID in DB**: 4A_90U2LjUA
**Status**: Backend ✅ | Frontend ⚠️ (needs browser verification)
