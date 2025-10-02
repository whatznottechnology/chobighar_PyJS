# 🚀 Deploy chobighar to Vercel

## Why Vercel is Perfect for This Project

✅ **Automatic Next.js optimization** - Built specifically for Next.js
✅ **Serverless functions** - No server management needed
✅ **Global CDN** - Fast loading worldwide
✅ **Automatic HTTPS** - Free SSL certificate
✅ **Easy environment variables** - Simple configuration
✅ **Git integration** - Deploy on every push
✅ **Zero configuration** - Works out of the box
✅ **Free hosting** - Perfect for your needs

---

## 📋 Pre-Deployment Checklist

- [ ] You have a GitHub account
- [ ] Code is pushed to GitHub repository
- [ ] You have a Vercel account (or will create one)
- [ ] Backend API is running at `https://admin.chobighar.com`
- [ ] Backend CORS is configured for Vercel domain

---

## 🎯 Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Easiest - Recommended)

#### Step 1: Push Code to GitHub

```powershell
# If not already initialized
git init
git add .
git commit -m "Ready for Vercel deployment"

# Push to GitHub
git remote add origin https://github.com/whatznottechnology/chobighar_PyJS.git
git push -u origin master
```

#### Step 2: Deploy on Vercel

1. **Go to:** https://vercel.com
2. **Sign up/Login** with GitHub
3. **Click:** "Add New..." → "Project"
4. **Import** your GitHub repository: `whatznottechnology/chobighar_PyJS`
5. **Configure Project:**
   - **Project Name:** `chobighar`
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

6. **Environment Variables** (Click "Environment Variables"):
   ```
   Key: NEXT_PUBLIC_API_URL
   Value: https://admin.chobighar.com
   
   Key: NEXT_PUBLIC_FRONTEND_URL
   Value: https://chobighar.vercel.app
   
   Key: NODE_ENV
   Value: production
   ```

7. **Click:** "Deploy"

8. **Wait** (~2-3 minutes for first deployment)

9. **Done!** Your site will be live at:
   - `https://chobighar.vercel.app`
   - Or your custom domain

---

### Method 2: Deploy via Vercel CLI (Advanced)

#### Step 1: Install Vercel CLI

```powershell
npm install -g vercel
```

#### Step 2: Login to Vercel

```powershell
vercel login
```

#### Step 3: Deploy

```powershell
# Navigate to project directory
cd C:\Users\pmihu\OneDrive\Desktop\chobi

# Deploy to production
vercel --prod

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? chobighar
# - Directory? ./ (press Enter)
# - Override settings? No
```

#### Step 4: Set Environment Variables

```powershell
# Add environment variables
vercel env add NEXT_PUBLIC_API_URL
# Enter value: https://admin.chobighar.com

vercel env add NEXT_PUBLIC_FRONTEND_URL
# Enter value: https://chobighar.vercel.app

# Redeploy with new variables
vercel --prod
```

---

## 🔧 Configuration Files Created

### ✅ `vercel.json`
Configures deployment settings:
- Build command
- Framework detection
- Environment variables
- Server region (Singapore - closest to you)

### ✅ `.vercelignore`
Excludes unnecessary files from deployment:
- Backend folder (Django - not needed)
- Development files
- Cache and build artifacts

---

## 🌐 Custom Domain Setup

### Using Your Own Domain: `chobighar.com`

1. **In Vercel Dashboard:**
   - Go to your project
   - Settings → Domains
   - Add Domain: `chobighar.com`

2. **In Your Domain DNS (Namecheap):**
   
   **For Root Domain (chobighar.com):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for DNS propagation** (5-30 minutes)

4. **Automatic SSL** - Vercel handles it!

---

## ⚙️ Environment Variables on Vercel

After deployment, verify/update environment variables:

1. **Go to:** Vercel Dashboard → Your Project → Settings → Environment Variables

2. **Add/Verify:**
   ```
   NEXT_PUBLIC_API_URL = https://admin.chobighar.com
   NEXT_PUBLIC_FRONTEND_URL = https://chobighar.com (or .vercel.app)
   NODE_ENV = production
   ```

3. **Important:** After adding variables, redeploy:
   - Go to Deployments
   - Click "..." on latest deployment
   - Click "Redeploy"

---

## 🔒 Backend CORS Configuration

Update your Django backend `settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    'https://chobighar.vercel.app',
    'https://chobighar.com',
    'https://www.chobighar.com',
    'http://localhost:3000',  # For local development
]

# Or for Vercel preview deployments:
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https://.*\.vercel\.app$",
]
```

---

## 📊 Deployment Workflow

```
Code Change
    ↓
Git Commit
    ↓
Git Push to GitHub
    ↓
Vercel Auto-Detects Change
    ↓
Automatic Build & Deploy
    ↓
Live in 2-3 minutes!
```

### Automatic Deployments:

- **Production:** Pushes to `master` branch → `chobighar.vercel.app`
- **Preview:** Pushes to other branches → Preview URLs
- **PR Previews:** Each pull request gets its own URL

---

## 🧪 Testing Deployment

After deployment, test these:

### 1. Homepage
- [ ] Hero slider loads with images from backend
- [ ] Albums showcase displays correctly
- [ ] Video showcase works
- [ ] Vendors section shows real data

### 2. Dynamic Features
- [ ] Search functionality works
- [ ] Contact form submits successfully
- [ ] All API calls return data
- [ ] Images load from backend

### 3. Pages
- [ ] About page - `/about`
- [ ] Contact page - `/contact`
- [ ] Photoshoot page - `/photoshoot`
- [ ] Portfolio page - `/portfolio`
- [ ] Vendors page - `/vendors`

### 4. Performance
- [ ] Fast loading times
- [ ] Images optimized
- [ ] Responsive on mobile
- [ ] No console errors

---

## 🎨 Vercel Dashboard Features

### Analytics (Available in Dashboard)
- Page views
- Unique visitors
- Top pages
- Performance metrics

### Logs (Real-time)
- Function logs
- Build logs
- Error tracking

### Deployments History
- All deployments tracked
- Easy rollback to previous versions
- Preview any deployment

---

## 🚀 Quick Deploy Script

I'll create a script to automate the process:

```powershell
# File: deploy-vercel.ps1

# Ensure you're on master branch
git checkout master

# Pull latest changes
git pull

# Add all changes
git add .

# Commit
$commitMessage = Read-Host "Enter commit message"
git commit -m "$commitMessage"

# Push to GitHub (triggers auto-deploy on Vercel)
git push origin master

Write-Host "✅ Pushed to GitHub!" -ForegroundColor Green
Write-Host "🚀 Vercel will auto-deploy in 2-3 minutes" -ForegroundColor Cyan
Write-Host "📊 Check status: https://vercel.com/dashboard" -ForegroundColor Yellow
```

---

## 💡 Advantages Over cPanel

| Feature | Vercel | cPanel |
|---------|--------|--------|
| **Setup Time** | 5 minutes | 30+ minutes |
| **Deployment** | Automatic on push | Manual upload |
| **Scaling** | Automatic | Manual |
| **CDN** | Global, free | Need to configure |
| **HTTPS** | Automatic | Manual setup |
| **Build Process** | Handled by Vercel | Manual |
| **Rollback** | One click | Manual |
| **Preview Deploys** | Automatic | Not available |
| **Cost** | Free (Hobby) | Paid hosting |

---

## 📈 Vercel Plans

### Hobby (Free) - Perfect for You!
- ✅ Unlimited projects
- ✅ Unlimited bandwidth
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ 100GB bandwidth/month
- ✅ Serverless functions
- ✅ Preview deployments

### Pro ($20/month) - If You Need More
- Everything in Hobby +
- Advanced analytics
- More bandwidth
- Team collaboration
- Priority support

**Your site will work perfectly on the FREE Hobby plan!**

---

## 🐛 Troubleshooting

### Issue: "Build failed"
**Solution:** Check build logs in Vercel dashboard
- Verify all dependencies in `package.json`
- Ensure no TypeScript errors (currently ignored)

### Issue: "API calls failing"
**Solution:** Check environment variables
- Verify `NEXT_PUBLIC_API_URL` is set
- Check Vercel deployment logs

### Issue: "Images not loading"
**Solution:** Check backend CORS
- Add Vercel domain to Django CORS settings
- Verify image URLs in backend responses

### Issue: "Custom domain not working"
**Solution:** Check DNS settings
- Wait 30 minutes for propagation
- Verify DNS records are correct
- Check domain status in Vercel

---

## 🎯 Step-by-Step Video Guide

### Creating New Vercel Project:

1. **Go to:** https://vercel.com/new
2. **Import Git Repository**
3. **Select:** `whatznottechnology/chobighar_PyJS`
4. **Project Settings:**
   - Name: `chobighar`
   - Framework: Next.js (auto-detected)
5. **Environment Variables:**
   - Add `NEXT_PUBLIC_API_URL`
   - Add `NEXT_PUBLIC_FRONTEND_URL`
6. **Click Deploy**
7. **Wait 2-3 minutes**
8. **Done!** 🎉

---

## ✅ Post-Deployment Checklist

- [ ] Site is live and accessible
- [ ] All pages load correctly
- [ ] Dynamic content from backend displays
- [ ] Search functionality works
- [ ] Contact form submits successfully
- [ ] Images load from backend
- [ ] Mobile responsive
- [ ] No console errors
- [ ] SSL certificate active (HTTPS)
- [ ] Custom domain configured (if using)
- [ ] Backend CORS updated
- [ ] Environment variables set
- [ ] Automatic deployments working

---

## 🔄 Continuous Deployment

Once set up, your workflow is:

```powershell
# Make changes to your code
# ...

# Commit and push
git add .
git commit -m "Updated feature X"
git push origin master

# Vercel automatically:
# 1. Detects the push
# 2. Runs build
# 3. Deploys to production
# 4. Live in 2-3 minutes!
```

**No manual deployment needed ever again!** 🎉

---

## 📞 Support

### Vercel Documentation
- https://vercel.com/docs

### Vercel Community
- https://github.com/vercel/vercel/discussions

### Your Project Status
- After deployment: https://vercel.com/dashboard

---

## 🎉 Summary

### What Vercel Gives You:

✅ **Automatic deployments** - Push to Git, auto-deploy
✅ **Global CDN** - Fast worldwide
✅ **Free HTTPS** - Secure by default
✅ **Zero config** - Works out of the box
✅ **Serverless** - No server management
✅ **Preview deploys** - Test before production
✅ **Easy rollback** - One-click revert
✅ **Analytics** - Built-in metrics
✅ **Custom domain** - Use chobighar.com
✅ **100% FREE** - For your use case

### What You Do:

1. Push code to GitHub
2. Import to Vercel
3. Set environment variables
4. Deploy!

**That's it! Your site is live and auto-updates on every push! 🚀**

---

## 🚀 Ready to Deploy?

Run this to deploy now:

```powershell
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Or use the Vercel Dashboard (easier): https://vercel.com/new
