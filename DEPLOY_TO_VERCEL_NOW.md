# 🚀 QUICK VERCEL DEPLOYMENT - 3 SIMPLE STEPS

## ⚡ FASTEST METHOD: Vercel Dashboard (5 Minutes)

### Step 1: Go to Vercel
**Open:** https://vercel.com/new

### Step 2: Login with GitHub
- Click "Continue with GitHub"
- Authorize Vercel

### Step 3: Import Your Repository
1. You'll see your repositories
2. Find **chobighar_PyJS**
3. Click **"Import"**

### Step 4: Configure (Auto-detected!)
Vercel will automatically detect:
- ✅ Framework: Next.js
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`

**Just click "Deploy"!**

### Step 5: Add Environment Variables (IMPORTANT!)
Before or after deployment, add these:

**Go to:** Settings → Environment Variables

Add:
```
NEXT_PUBLIC_API_URL = https://admin.chobighar.com
```
or
```
NEXT_PUBLIC_API_URL = http://your-backend-url.com
```

Then click **"Redeploy"** to apply the environment variable.

---

## 🎯 Your Site Will Be Live At:

**Auto-generated URL:**
```
https://chobighar-pyjs.vercel.app
```

**Or you can add custom domain:**
```
https://chobighar.com
```

---

## 📋 POST-DEPLOYMENT CHECKLIST

### 1. Update Backend CORS (CRITICAL!)

In your Django backend `backend/chobighar_backend/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # Development
    'https://chobighar-pyjs.vercel.app',  # Production
    'https://chobighar.vercel.app',  # If different
    # Add your custom domain if you have one:
    # 'https://chobighar.com',
    # 'https://www.chobighar.com',
]

# For all Vercel preview deployments:
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https://.*\.vercel\.app$",
]

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
    'https://chobighar-pyjs.vercel.app',
    'https://chobighar.vercel.app',
    # Add your custom domain:
    # 'https://chobighar.com',
]
```

### 2. Test Your Deployment
- [ ] Homepage loads ✅
- [ ] Images display from backend ✅
- [ ] Contact form works ✅
- [ ] WhatsApp integration works ✅
- [ ] Popup modal appears ✅
- [ ] Blog pages load ✅
- [ ] Vendor pages work ✅
- [ ] Portfolio displays ✅

---

## 🔧 ALTERNATIVE: Vercel CLI

If you prefer command line:

```powershell
# Step 1: Install Vercel CLI
npm install -g vercel

# Step 2: Login
vercel login

# Step 3: Deploy
cd C:\Users\pmihu\OneDrive\Desktop\chobi
vercel --prod

# Follow prompts:
# - Link to existing project? No (first time)
# - Project name? chobighar
# - Directory? ./ (press Enter)
```

After deployment, set environment variables:
```powershell
vercel env add NEXT_PUBLIC_API_URL
# Enter: https://admin.chobighar.com

# Redeploy to apply
vercel --prod
```

---

## ⚙️ Configuration Files (Already Set!)

### ✅ vercel.json
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["sin1"],
  "env": {
    "NEXT_PUBLIC_API_URL": "https://admin.chobighar.com",
    "NEXT_PUBLIC_FRONTEND_URL": "https://chobighar.vercel.app"
  }
}
```

### ✅ package.json
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

---

## 🌍 CUSTOM DOMAIN (Optional)

### If you own chobighar.com:

1. **In Vercel Dashboard:**
   - Go to your project
   - Settings → Domains
   - Click "Add"
   - Enter: `chobighar.com`

2. **In Your Domain Provider (Namecheap/GoDaddy):**
   
   Add these DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait 5-30 minutes** for DNS propagation

4. **SSL Certificate** - Automatic! ✅

---

## 🚨 COMMON ISSUES & FIXES

### Issue 1: Build Fails
**Error:** "Module not found"

**Fix:**
```powershell
# Clear and rebuild locally first
rm -r node_modules
rm -r .next
npm install
npm run build
```

If local build works, push to Git and redeploy.

### Issue 2: API Not Working
**Error:** "Failed to fetch" or CORS errors

**Fix:**
1. Check environment variable `NEXT_PUBLIC_API_URL` is set
2. Update backend CORS settings (see above)
3. Verify backend is accessible from internet

### Issue 3: Images Not Loading
**Error:** Images show broken

**Fix:**
1. Check backend CORS allows Vercel domain
2. Verify image URLs are correct (check Network tab)
3. Ensure `NEXT_PUBLIC_API_URL` is correct

### Issue 4: Environment Variables Not Working
**Solution:**
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Make sure variables are set for "Production"
3. Click "Redeploy" after adding variables

---

## 📊 DEPLOYMENT STATUS

### Check Deployment:
**Dashboard:** https://vercel.com/dashboard

### View Logs:
```powershell
vercel logs
```

### Rollback if Needed:
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

---

## ⏱️ DEPLOYMENT TIME

- **First Deploy:** 2-3 minutes
- **Subsequent Deploys:** 1-2 minutes
- **Auto Deploys:** On every Git push!

---

## 🎯 CONTINUOUS DEPLOYMENT

Once set up, Vercel automatically deploys when you push to GitHub:

```powershell
# Make changes
git add .
git commit -m "Updated homepage"
git push origin master

# Vercel automatically deploys! 🚀
```

---

## 💰 PRICING

**Hobby Plan (FREE)** ✅
- Perfect for your needs!
- Unlimited deployments
- 100GB bandwidth/month
- Automatic HTTPS
- Global CDN
- Custom domains

**No credit card needed!**

---

## 📞 SUPPORT

**Vercel Docs:** https://vercel.com/docs
**Status:** https://vercel-status.com
**Dashboard:** https://vercel.com/dashboard

---

## ✅ READY TO DEPLOY!

### Quick Start:
1. Go to: **https://vercel.com/new**
2. Login with GitHub
3. Import **chobighar_PyJS**
4. Click **Deploy**
5. Add environment variable
6. Update backend CORS
7. **Done!** 🎉

**Your site will be live in 3 minutes!**
