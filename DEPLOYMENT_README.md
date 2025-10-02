# Quick Deployment Guide

## 🎯 Can I Deploy This as Static Files?

**NO** ❌ - Your site is **dynamic** and requires:
- Node.js server running
- Live connection to Django backend API
- Real-time data fetching
- Image optimization
- Server-side rendering

## ✅ How to Deploy (The Right Way)

### Option 1: Quick Deploy with Script (Recommended)

```powershell
# Run this in PowerShell from project root
.\create-deployment-package.ps1
```

This will:
1. Build your production app
2. Create `chabighar-deployment.zip`
3. Show you deployment instructions

### Option 2: Manual Deploy

```bash
# 1. Build
npm run build

# 2. Upload to server:
- .next/ folder
- public/ folder
- package.json
- server.js
- next.config.ts
- .env.production.local

# 3. On server
npm install --production
node server.js
```

## 🔧 Server Requirements

- ✅ Node.js 18+ installed
- ✅ npm 9+ installed
- ✅ cPanel with Node.js support
- ✅ Backend API accessible at https://admin.chobighar.com

## 📝 Environment Variables on Server

```bash
NEXT_PUBLIC_API_URL=https://admin.chobighar.com
NODE_ENV=production
PORT=3000
```

## 🧪 Testing Locally First

```bash
# 1. Build
npm run build

# 2. Test production build locally
npm run start

# 3. Visit http://localhost:3000
# Verify everything works before deploying
```

## ⚡ What Makes This Dynamic?

Your site fetches data from backend in real-time:

- **Hero Slider** → `/api/homepage/hero-slides/`
- **Albums** → `/api/homepage/showcase-images/`
- **Videos** → `/api/homepage/video-showcase/`
- **Vendors** → `/api/vendor/featured/`
- **Testimonials** → `/api/homepage/video-testimonials/`
- **FAQs** → `/api/homepage/faqs/`
- **Contact Form** → `/api/contact/` (POST)
- **Search** → `/api/search/`

**All content is managed through your Django admin panel!**

## 🚀 Deploy to cPanel (Step-by-Step)

1. **Build Package**
   ```powershell
   .\create-deployment-package.ps1
   ```

2. **Upload to cPanel**
   - Upload `chabighar-deployment.zip`
   - Extract in your app directory

3. **Setup Node.js App in cPanel**
   - Application Root: `/home/username/chobighar`
   - Startup File: `server.js`
   - Add environment variables

4. **Install Dependencies**
   ```bash
   npm install --production
   ```

5. **Start Application**
   - Click "Start" in cPanel Node.js interface
   - Or run: `node server.js`

## ✅ Verification Checklist

After deployment, verify:

- [ ] Homepage loads with real data from backend
- [ ] Images display correctly
- [ ] Search works
- [ ] Contact form submits
- [ ] All pages accessible
- [ ] Dynamic content from backend shows
- [ ] Mobile responsive

## 🐛 Common Issues

### "Module not found"
→ Run `npm install` on server

### "API calls failing"  
→ Check environment variables

### "Images not loading"
→ Verify backend CORS settings

### "Site shows old data"
→ Update content in Django admin

## 📖 Full Documentation

See **BUILD_AND_DEPLOYMENT_GUIDE.md** for complete details.

## 💡 Key Takeaway

Your site is:
- ✅ **Dynamic** - Connects to backend API
- ✅ **Needs Node.js** - Cannot be static HTML
- ✅ **Fully functional** - All features work
- ✅ **Admin managed** - Content via Django admin

**You cannot just unzip HTML files!** The site needs to run as a Node.js application that talks to your Django backend in real-time.
