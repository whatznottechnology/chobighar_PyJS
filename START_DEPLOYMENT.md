# 🎯 Deploy chobighar to Vercel - Step by Step

## Current Status:
- ✅ Code is ready
- ✅ Vercel CLI installed (v48.0.2)
- ✅ Configuration files created
- ✅ Git repository connected

---

## 🚀 DEPLOY NOW - Two Simple Options:

---

## Option 1: Vercel Dashboard (5 minutes - Recommended)

### Step 1: Open Vercel
Go to: **https://vercel.com/new**

### Step 2: Sign In
- Click "Continue with GitHub"
- Authorize Vercel

### Step 3: Import Repository
- Search for: `chobighar_PyJS`
- Or paste: `https://github.com/whatznottechnology/chobighar_PyJS`
- Click "Import"

### Step 4: Configure Project
```
Project Name: chobighar
Framework: Next.js (auto-detected)
Root Directory: ./
Build Command: npm run build (auto-detected)
Output Directory: .next (auto-detected)
Install Command: npm install (auto-detected)
```

### Step 5: Add Environment Variables
Click "Environment Variables" and add:

```
Variable 1:
Name: NEXT_PUBLIC_API_URL
Value: https://admin.chobighar.com

Variable 2:
Name: NEXT_PUBLIC_FRONTEND_URL
Value: https://chobighar.vercel.app
```

### Step 6: Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Done! 🎉

**Your site will be live at:** `https://chobighar.vercel.app`

---

## Option 2: CLI Deployment (2 minutes - Automated)

### Run this command:

```powershell
.\deploy-to-vercel.ps1
```

**Or step by step:**

```powershell
# Step 1: Login to Vercel
vercel login

# Step 2: Deploy
vercel --prod

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (Select your account)
# - Link to existing project? N
# - What's your project's name? chobighar
# - In which directory is your code located? ./ (press Enter)
# - Want to modify settings? N
```

### After deployment, add environment variables:

```powershell
# Add API URL
vercel env add NEXT_PUBLIC_API_URL
# Enter: https://admin.chobighar.com
# Select: Production

# Add Frontend URL
vercel env add NEXT_PUBLIC_FRONTEND_URL
# Enter: https://chobighar.vercel.app
# Select: Production

# Redeploy with variables
vercel --prod
```

---

## 📊 What Happens During Deployment:

```
1. Vercel receives your code
2. Installs dependencies (npm install)
3. Builds Next.js app (npm run build)
4. Deploys to global CDN
5. Assigns URL: chobighar.vercel.app
6. Generates SSL certificate (HTTPS)
7. Site is LIVE! ✨
```

**Total time: 2-3 minutes**

---

## ✅ After Deployment:

### 1. Test Your Site
Visit: `https://chobighar.vercel.app`

Check:
- [ ] Homepage loads
- [ ] Images appear
- [ ] Dynamic content from backend shows
- [ ] Search works
- [ ] Forms submit
- [ ] All pages accessible

### 2. Update Backend CORS
Add Vercel domain to Django `settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    'https://chobighar.vercel.app',
    'https://chobighar.com',
    'http://localhost:3000',
]
```

### 3. Add Custom Domain (Optional)
In Vercel Dashboard:
- Settings → Domains
- Add: `chobighar.com`
- Update DNS records in Namecheap

---

## 🎯 Which Method Should You Use?

### Use Dashboard (Option 1) if:
- ✅ First time using Vercel
- ✅ Want visual interface
- ✅ Want to see all settings

### Use CLI (Option 2) if:
- ✅ Comfortable with terminal
- ✅ Want fastest deployment
- ✅ Future quick updates

**Recommendation:** Start with Dashboard, then use CLI for updates

---

## 🚀 Ready to Deploy?

### Choose your method:

**Dashboard:** https://vercel.com/new

**CLI:** Run `.\deploy-to-vercel.ps1`

---

## ⏱️ Deployment Timeline:

- **0:00** - Start deployment
- **0:30** - Installing dependencies
- **1:00** - Building application
- **1:30** - Uploading to CDN
- **2:00** - Configuring domains
- **2:30** - SSL certificate
- **3:00** - ✅ LIVE!

---

## 🎉 After Going Live:

Your site will:
- ✅ Load super fast (Global CDN)
- ✅ Auto-deploy on git push
- ✅ Have HTTPS enabled
- ✅ Connect to Django backend
- ✅ Work on all devices
- ✅ Be production-ready

---

## 💡 Pro Tips:

1. **Auto Deployment:** After first deployment, just push to GitHub - Vercel auto-deploys!
2. **Preview Deployments:** Every branch gets a preview URL
3. **Rollback:** One-click rollback in dashboard
4. **Analytics:** Built-in analytics available
5. **Free SSL:** Automatic HTTPS - no setup needed

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Support:** Dashboard → Help
- **Status:** https://vercel.com/status

---

## 🎬 Start Deployment Now!

Pick your method and go! Your site will be live in minutes! 🚀

**Dashboard:** https://vercel.com/new
**CLI:** `.\deploy-to-vercel.ps1`
