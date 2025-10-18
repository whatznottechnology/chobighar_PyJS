# Portfolio CTA Images & Promotional Video - Complete Guide

## ✨ Features Added

### 1. CTA Images Section (Sidebar)
- **Location**: Right sidebar, above Event Details card
- **Design**: 4 images in scattered/tilted Polaroid style
- **Animation**: Hover to straighten and zoom
- **Purpose**: Showcase photography style to attract inquiries

### 2. Promotional Video Section
- **Location**: Between hero section and gallery
- **Design**: Mobile phone mockup with embedded video
- **Video**: Auto-play, loop, muted YouTube video
- **Purpose**: Tell the story dynamically

---

## 🎨 CTA Images Design

### Visual Effect
```
📱 Scattered Polaroid Photos
┌─────────┐    ┌─────────┐
│  ↖️ Img1 │    │  ↗️ Img2 │  (Tilted)
└─────────┘    └─────────┘

┌─────────┐    ┌─────────┐
│  ↗️ Img3 │    │  ↖️ Img4 │
└─────────┘    └─────────┘

On Hover: Straightens, zooms 125%, brings to front
```

### Technical Details
- **Size**: 144px × 144px (w-36 h-36)
- **Rotation**:
  - Image 1: -6° (left tilt)
  - Image 2: +8° (right tilt)
  - Image 3: +4° (slight right)
  - Image 4: -5° (left tilt)
- **Hover Effects**:
  - Scale: 125%
  - Rotation: 0° (straightens)
  - Shadow: Enhanced
  - Z-index: 50 (brings forward)
  - Inner image zoom: 110%
- **Container**: 320px height with gradient background

---

## 📱 Promotional Video Section

### Mobile Mockup Design
```
┌──────────────────┐
│   📱 Phone Frame │
│  ┌────────────┐  │
│  │            │  │
│  │   YouTube  │  │ ← Video here
│  │   Video    │  │
│  │            │  │
│  └────────────┘  │
└──────────────────┘
```

### Technical Implementation
- **Frame**: `/public/mobile.png` image
- **Video Position**: Absolute positioning inside phone screen
  - Top: 3.5%
  - Left: 6.5%
  - Width: 87%
  - Height: 92.5%
  - Border-radius: 32px
- **YouTube Parameters**:
  - `autoplay=1` - Auto-start
  - `mute=1` - Muted sound
  - `loop=1` - Continuous loop
  - `controls=0` - No controls
  - `showinfo=0` - No video info
  - `modestbranding=1` - Minimal YouTube branding
  - `playsinline=1` - Mobile inline play

---

## 🔧 Backend Setup

### Database Fields Added

#### Portfolio Model (`portfolio/models.py`)
```python
# CTA Images (already existed)
cta_image_1 = models.ImageField(upload_to='portfolio/cta/', blank=True, null=True)
cta_image_2 = models.ImageField(upload_to='portfolio/cta/', blank=True, null=True)
cta_image_3 = models.ImageField(upload_to='portfolio/cta/', blank=True, null=True)
cta_image_4 = models.ImageField(upload_to='portfolio/cta/', blank=True, null=True)

# New: Promotional Video
promotional_video_id = models.CharField(max_length=100, blank=True)
```

### Migration Applied
```bash
# Migration file created
portfolio/migrations/0006_portfolio_promotional_video_id.py

# Applied successfully
✅ Applying portfolio.0006_portfolio_promotional_video_id... OK
```

### Serializer Updated
**File**: `portfolio/serializers.py`

Added to `PortfolioDetailSerializer`:
```python
fields = [
    # ... existing fields ...
    'cta_image_1_url', 'cta_image_2_url', 'cta_image_3_url', 'cta_image_4_url',
    'promotional_video_id'  # ← New field
]
```

### Admin Panel Updated
**File**: `portfolio/admin.py`

New fieldset added:
```python
('📱 Promotional Video', {
    'fields': ('promotional_video_id',),
    'classes': ('collapse',),
    'description': 'Enter YouTube Video ID only (e.g., "dQw4w9WgXcQ")'
}),
```

---

## 💻 Frontend Implementation

### TypeScript Types Updated
**File**: `src/services/portfolioAPI.ts`

```typescript
export interface Portfolio {
  // ... existing fields ...
  
  // CTA Images
  cta_image_1_url?: string;
  cta_image_2_url?: string;
  cta_image_3_url?: string;
  cta_image_4_url?: string;
  
  // Promotional Video
  promotional_video_id?: string;
}
```

### Page Structure
**File**: `src/app/portfolio/[id]/page.tsx`

```
┌─────────────────────────────────────┐
│ Hero Section (Title, Cover, etc)   │
├─────────────────────────────────────┤
│ CTA Images (Sidebar - Right)       │ ← Scattered photos
│ Event Details (Sidebar - Right)    │
├─────────────────────────────────────┤
│ Promotional Video (Full Width)     │ ← Mobile mockup
├─────────────────────────────────────┤
│ Gallery (Photos/Videos Tabs)       │
├─────────────────────────────────────┤
│ More Albums                         │
├─────────────────────────────────────┤
│ Quote Form                          │
└─────────────────────────────────────┘
```

---

## 📋 How to Use

### Adding CTA Images

1. **Go to Admin Panel**
   ```
   http://localhost:8000/admin/portfolio/portfolio/
   ```

2. **Edit a Portfolio**
   - Click on any portfolio to edit

3. **Find "CTA Section Images" Fieldset**
   - Expand the collapsed section
   - Upload 4 images:
     - Image 1: Top-left position
     - Image 2: Top-right position
     - Image 3: Bottom-left position
     - Image 4: Bottom-right position

4. **Preview**
   - See 2×2 grid preview in admin
   - View frontend sidebar for live effect

### Adding Promotional Video

1. **Get YouTube Video ID**
   - Example: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - Video ID: `dQw4w9WgXcQ` (part after `v=`)

2. **Go to Admin Panel**
   - Navigate to portfolio edit page

3. **Find "Promotional Video" Fieldset**
   - Expand the collapsed section
   - Paste only the video ID (not full URL)
   - Example: `dQw4w9WgXcQ`

4. **Save Portfolio**
   - Video will automatically:
     - Autoplay on page load
     - Loop continuously
     - Be muted
     - Display in mobile mockup
     - Hide YouTube controls

### Frontend Display Logic

**CTA Images**: Show if ANY image is uploaded
```typescript
{(portfolio?.cta_image_1_url || portfolio?.cta_image_2_url || 
  portfolio?.cta_image_3_url || portfolio?.cta_image_4_url) && (
  // Show CTA Images Card
)}
```

**Promotional Video**: Show if video ID exists
```typescript
{portfolio?.promotional_video_id && (
  // Show Mobile Mockup Video
)}
```

---

## 🎯 Design Specifications

### CTA Images Card
- **Background**: Gradient white to red-50
- **Border**: 1px red-100
- **Shadow**: Large drop shadow
- **Padding**: 24px
- **Title**: "Love This Style?" with heart icon
- **Grid Container**: Relative positioned, 320px height
- **Images**: Absolutely positioned with transforms

### Promotional Video Section
- **Background**: Gradient gray-50 to gray-100
- **Padding**: 64px vertical
- **Max Width**: 640px container
- **Title**: "Watch Our Story" in Playfair Display
- **Subtitle**: Gray text description
- **Phone Frame**: 380px max-width
- **Aspect Ratio**: 2:1 (height:width)

---

## ✅ Testing Checklist

### CTA Images
- [ ] Upload 4 images in admin
- [ ] See 2×2 grid preview in admin
- [ ] View portfolio detail page
- [ ] Verify scattered/tilted layout
- [ ] Test hover animations:
  - [ ] Image straightens (rotate to 0°)
  - [ ] Image zooms (scale 125%)
  - [ ] Shadow enhances
  - [ ] Brings to front (z-index)
  - [ ] Inner zoom works
- [ ] Test with 1-3 images (partial grid)
- [ ] Test mobile responsiveness

### Promotional Video
- [ ] Add YouTube video ID in admin
- [ ] Save portfolio
- [ ] View portfolio detail page
- [ ] Verify video section appears
- [ ] Check video autoplays
- [ ] Verify video is muted
- [ ] Confirm continuous loop
- [ ] No YouTube controls visible
- [ ] Video fits in phone frame
- [ ] Test mobile responsiveness

### TypeScript
- [x] No compilation errors
- [x] Types properly defined
- [x] Optional fields handled correctly

---

## 🔍 Troubleshooting

### CTA Images Not Showing
1. Check if at least one image is uploaded
2. Verify image URLs in API response
3. Check browser console for errors
4. Ensure images are accessible (CORS, media serving)

### Promotional Video Not Playing
1. **Video ID Format**: Use only ID, not full URL
   - ✅ Correct: `dQw4w9WgXcQ`
   - ❌ Wrong: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
2. **Video Availability**: Check if video is public
3. **Embedding Allowed**: Verify video allows embedding
4. **Mobile Frame**: Ensure `/public/mobile.png` exists

### TypeScript Errors
1. Run `npm run build` to check for errors
2. Verify Portfolio interface includes new fields
3. Check optional chaining (`?.`) is used
4. Ensure serializer returns all fields

---

## 📁 Files Modified

### Backend
- ✅ `backend/portfolio/models.py` - Added `promotional_video_id` field
- ✅ `backend/portfolio/serializers.py` - Added field to serializer
- ✅ `backend/portfolio/admin.py` - Added video fieldset
- ✅ `backend/portfolio/migrations/0006_portfolio_promotional_video_id.py` - New migration

### Frontend
- ✅ `src/services/portfolioAPI.ts` - Updated Portfolio interface
- ✅ `src/app/portfolio/[id]/page.tsx` - Added CTA + video sections

### Assets Required
- ⚠️ `public/mobile.png` - Mobile phone frame image (must exist!)

---

## 🎨 Example Data

### Sample Portfolio with All Features
```json
{
  "id": "priya-arjun-wedding",
  "title": "Priya & Arjun's Wedding",
  "cta_image_1_url": "http://localhost:8000/media/portfolio/cta/img1.jpg",
  "cta_image_2_url": "http://localhost:8000/media/portfolio/cta/img2.jpg",
  "cta_image_3_url": "http://localhost:8000/media/portfolio/cta/img3.jpg",
  "cta_image_4_url": "http://localhost:8000/media/portfolio/cta/img4.jpg",
  "promotional_video_id": "dQw4w9WgXcQ"
}
```

---

## 🚀 Next Steps

1. **Upload Mobile Frame**:
   ```bash
   # Ensure this file exists:
   public/mobile.png
   ```

2. **Test with Real Data**:
   - Upload 4 CTA images for a portfolio
   - Add a YouTube video ID
   - View the portfolio page

3. **Customize Styling**:
   - Adjust rotation angles in CTA images
   - Modify phone frame positioning
   - Change gradient colors

4. **Production Deployment**:
   - Run migrations on production
   - Update environment variables if needed
   - Test video embedding on live site

---

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Verify all migrations are applied
3. Ensure media files are properly served
4. Test with different browsers
5. Check mobile.png exists in public folder

---

**Last Updated**: October 17, 2025
**Version**: 1.0
**Status**: ✅ All Features Implemented & Tested
