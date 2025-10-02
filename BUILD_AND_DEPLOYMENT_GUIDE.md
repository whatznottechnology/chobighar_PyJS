# Build and Deployment Guide for Chabighar Website

## 🎯 Overview

Your Next.js application **CANNOT be simply zipped as static HTML files** because it's a **dynamic application** that needs:
1. **Node.js server** to run (SSR - Server Side Rendering)
2. **Dynamic API calls** to your Django backend
3. **Client-side data fetching** with React hooks
4. **Image optimization** on-the-fly
5. **Dynamic routing** for vendors and portfolios

## ✅ What You HAVE (Current Setup)

### Architecture Type: **Hybrid (SSR + Client-Side Rendering)**

```
┌─────────────────────────────────────────────────┐
│  Frontend (Next.js 15 - Node.js Required)      │
│  - Server-Side Rendering (SSR)                  │
│  - Client-Side Data Fetching                    │
│  - Dynamic Routes                               │
│  - Image Optimization                           │
└─────────────────┬───────────────────────────────┘
                  │
                  │ API Calls (fetch)
                  │
┌─────────────────▼───────────────────────────────┐
│  Backend (Django REST API)                      │
│  - admin.chobighar.com                          │
│  - Provides all content dynamically             │
└─────────────────────────────────────────────────┘
```

### How Data Flows:

1. **User visits page** → Next.js server responds
2. **Client browser loads** → JavaScript executes
3. **useEffect hooks trigger** → Fetch data from Django API
4. **Data received** → Components render with real data
5. **Images load** → Next.js optimizes them on-the-fly

### Dynamic Components Using Backend:

- ✅ `HeroSlider` - Fetches slides from `/api/homepage/hero-slides/`
- ✅ `AlbumsShowcase` - Fetches images from `/api/homepage/showcase-images/`
- ✅ `VideoShowcase` - Fetches videos from `/api/homepage/video-showcase/`
- ✅ `VendorSection` - Fetches vendors from `/api/vendor/featured/`
- ✅ `TestimonialsSection` - Fetches testimonials
- ✅ `ContactForm` - Submits to `/api/contact/`
- ✅ `FAQSection` - Fetches FAQs from backend
- ✅ `CounterSection` - Fetches achievements data
- ✅ `Navbar` - Dynamic search with backend API
- ✅ `Footer` - Fetches footer data

**ALL PAGES** (About, Contact, Photoshoot, Portfolio, Vendors) fetch data dynamically from your Django backend.

## ❌ What You CANNOT Do

### ❌ Static Export (Won't Work)

```bash
# This would break your site
npm run build
npm run export  # Not available - would lose all functionality
```

**Why it won't work:**
- No server-side rendering
- No dynamic API calls
- No image optimization
- No dynamic routes
- Just dead HTML files with no data

## ✅ What You CAN Do

### Option 1: Deploy as Node.js Application (RECOMMENDED)

**Best for:** Your current cPanel hosting with Node.js support

**Steps:**

1. **Build the project:**
```bash
npm run build
```

2. **Files needed for deployment:**
```
.next/                    # Build output (required)
node_modules/            # Dependencies (required) OR use npm install on server
public/                  # Static assets
package.json            # Dependencies list
package-lock.json       # Lock file
next.config.ts          # Configuration
server.js               # Custom server
.env.production.local   # Environment variables
```

3. **On your server (cPanel):**
```bash
# Upload all files
# Or use Git to clone

# Install dependencies
npm install --production

# Start the application
npm run start:prod
# OR
node server.js
```

4. **Environment Variables on Server:**
```bash
NEXT_PUBLIC_API_URL=https://admin.chobighar.com
NEXT_PUBLIC_FRONTEND_URL=https://chobighar.com
NODE_ENV=production
PORT=3000
```

### Option 2: Use Deployment Script (Already Configured)

Your project has a custom `server.js` that's optimized for cPanel hosting.

**To deploy:**

1. **Build locally:**
```bash
npm run build
```

2. **Upload these folders/files to cPanel:**
   - `.next/` folder (entire build output)
   - `node_modules/` (or run `npm install` on server)
   - `public/` folder
   - `package.json`
   - `package-lock.json`
   - `next.config.ts`
   - `server.js`
   - `.env.production.local`

3. **Configure Node.js app in cPanel:**
   - Application Root: `/home/username/public_html` (or your path)
   - Application URL: `https://chobighar.com`
   - Application Startup File: `server.js`
   - Environment Variables: Add your NEXT_PUBLIC_API_URL

### Option 3: Docker Deployment (Advanced)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

## 📦 Creating Deployment Package

**Script to create deployment zip:**

```bash
# PowerShell (Windows)
# Run from project root

# Remove old build
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Build fresh
npm run build

# Create deployment package
$files = @(
    '.next',
    'public',
    'package.json',
    'package-lock.json',
    'next.config.ts',
    'server.js',
    '.env.production.local'
)

Compress-Archive -Path $files -DestinationPath 'chabighar-deployment.zip' -Force

Write-Host "✅ Deployment package created: chabighar-deployment.zip"
```

**What's inside the zip:**
- `.next/` - Pre-built application (no source code needed)
- `public/` - Static assets (images, favicon)
- `package.json` - Dependencies list
- `server.js` - Production server
- `.env.production.local` - Production config

**On server:**
1. Extract zip
2. Run `npm install --production`
3. Run `node server.js`

## 🔧 Build Configuration

Your `next.config.ts` is already optimized:

```typescript
✅ compress: true                    // Gzip compression
✅ poweredByHeader: false            // Hide Next.js header
✅ productionBrowserSourceMaps: false // Smaller build
✅ reactStrictMode: true             // React best practices
✅ swcMinify: true                   // Fast minification (deprecated warning)
✅ Image optimization configured     // For backend images
```

## 🌐 Current Build Status

**Last build result:**
```
Route (app)                         Size    First Load JS
┌ ○ /                            20.4 kB    131 kB
├ ƒ /[vendorId]                   8.02 kB    119 kB
├ ○ /about                         4.3 kB    112 kB
├ ○ /contact                      6.33 kB    108 kB
├ ○ /photoshoot                   5.08 kB    116 kB
├ ○ /portfolio                    8.01 kB    115 kB
└ ○ /vendors                      5.88 kB    117 kB

○ (Static)   - Pre-rendered
ƒ (Dynamic)  - Server-rendered on demand
```

**Build successful!** ✅

## 🔍 Key Points

### ✅ Your Site WILL Work Because:

1. **Dynamic data fetching** - Uses `useEffect` hooks
2. **Environment variables** - API URL is configurable
3. **Backend connectivity** - Calls Django API at runtime
4. **Image optimization** - Next.js Image component
5. **Node.js server** - Required for SSR and API routes

### ❌ Your Site WON'T Work If:

1. You try to use static HTML export
2. Backend API is not accessible
3. Node.js is not available on server
4. Environment variables are not set
5. CORS is not configured on Django backend

## 📋 Deployment Checklist

### Before Building:
- [ ] Backend API is live and accessible
- [ ] CORS configured on Django for your domain
- [ ] All environment variables set correctly
- [ ] Dependencies installed (`npm install`)

### Build Process:
- [ ] Run `npm run build` successfully
- [ ] Check build output for errors
- [ ] Verify `.next` folder created
- [ ] Test locally with `npm run start`

### Deployment:
- [ ] Upload/copy all necessary files
- [ ] Set environment variables on server
- [ ] Run `npm install --production` on server
- [ ] Start Node.js application
- [ ] Configure cPanel Node.js app settings
- [ ] Set up domain/subdomain routing

### Post-Deployment:
- [ ] Test homepage loads
- [ ] Verify API calls work
- [ ] Check image loading
- [ ] Test all pages
- [ ] Verify forms submit correctly
- [ ] Check mobile responsiveness
- [ ] Test search functionality

## 🐛 Troubleshooting

### Issue: "Cannot find module 'next'"
**Solution:** Run `npm install` on the server

### Issue: "API calls failing"
**Solution:** Check `NEXT_PUBLIC_API_URL` environment variable

### Issue: "Images not loading"
**Solution:** Verify Next.js image optimization is configured correctly in `next.config.ts`

### Issue: "Build warnings about swcMinify"
**Solution:** Remove `swcMinify: true` from `next.config.ts` (it's default in Next.js 15)

## 📞 Summary

**Your application:**
- ✅ **IS dynamic** - Connects to backend in real-time
- ✅ **REQUIRES Node.js** - Cannot be static HTML
- ✅ **CAN be built and deployed** - As Node.js app
- ✅ **WORKS with backend** - All functionality preserved
- ✅ **READY for production** - Build succeeds

**To deploy:**
1. Build with `npm run build`
2. Upload build + dependencies
3. Run `node server.js` on server
4. All features work perfectly!

**Note:** You cannot unzip and just upload HTML files. You need a Node.js server running your application that connects to your Django backend at runtime.
