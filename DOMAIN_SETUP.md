# 🌐 Connect chobighar.com to Vercel

## ✅ Your Site is Deployed on Vercel!

**Vercel URL:** https://chobighar.vercel.app

Now let's connect your custom domain: **chobighar.com**

---

## 🎯 DNS Configuration for Namecheap

### Step 1: Login to Namecheap

1. Go to: https://www.namecheap.com
2. Sign in to your account
3. Go to **Domain List**
4. Click **Manage** next to `chobighar.com`

---

### Step 2: Configure DNS Records

Click on **Advanced DNS** tab and add these records:

#### For Root Domain (chobighar.com)

```
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic
```

#### For WWW Subdomain (www.chobighar.com)

```
Type: CNAME Record
Host: www
Value: cname.vercel-dns.com.
TTL: Automatic
```

#### Remove Conflicting Records (If Any)

Make sure to **DELETE** these if they exist:
- Any existing A record for `@`
- Any existing CNAME for `www`
- Any ALIAS records
- Any URL Redirect records for the root domain

---

### Step 3: Visual Guide

Your DNS settings should look like this:

```
┌─────────────────────────────────────────────────┐
│ Type    │ Host  │ Value                         │
├─────────────────────────────────────────────────┤
│ A       │ @     │ 76.76.21.21                   │
│ CNAME   │ www   │ cname.vercel-dns.com.         │
└─────────────────────────────────────────────────┘
```

---

### Step 4: Add Domain in Vercel Dashboard

1. **Go to:** https://vercel.com/whatznottechnologys-projects/chobighar
2. **Click:** Settings → Domains
3. **Add Domain:** `chobighar.com`
4. **Add Domain:** `www.chobighar.com`
5. Vercel will verify DNS configuration

---

## ⏱️ DNS Propagation

### Timeline:
- **Namecheap TTL:** Usually updates in 5-30 minutes
- **Global DNS:** May take up to 24-48 hours (usually much faster)
- **Vercel Verification:** Instant once DNS propagates

### Check DNS Propagation:
Visit: https://dnschecker.org/#A/chobighar.com

---

## 🔒 SSL Certificate (HTTPS)

Vercel automatically:
- ✅ Generates SSL certificate
- ✅ Enables HTTPS
- ✅ Redirects HTTP to HTTPS
- ✅ No configuration needed!

**Your site will be secure:** `https://chobighar.com`

---

## ✅ Verification Steps

### 1. Check DNS Configuration

```powershell
# Check A record
nslookup chobighar.com

# Should show: 76.76.21.21

# Check CNAME record
nslookup www.chobighar.com

# Should show: cname.vercel-dns.com
```

### 2. Wait for Propagation

Visit: https://dnschecker.org
- Enter: `chobighar.com`
- Type: `A`
- Should show: `76.76.21.21` globally

### 3. Test Your Site

Try accessing:
- ✅ https://chobighar.com
- ✅ https://www.chobighar.com
- ✅ http://chobighar.com (redirects to HTTPS)
- ✅ https://chobighar.vercel.app (still works)

---

## 🎯 Complete Setup Checklist

- [x] Code pushed to GitHub
- [x] Deployed on Vercel
- [x] Environment variables configured
- [ ] DNS A record added (76.76.21.21)
- [ ] DNS CNAME record added (cname.vercel-dns.com)
- [ ] Wait for DNS propagation (5-30 min)
- [ ] Verify domain in Vercel dashboard
- [ ] Test site at chobighar.com
- [ ] Verify HTTPS is working
- [ ] Update Django CORS settings

---

## 🔧 Update Django Backend CORS

Once domain is live, update your Django `settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    'https://chobighar.com',
    'https://www.chobighar.com',
    'https://chobighar.vercel.app',
    'http://localhost:3000',  # For development
]

# Optional: Allow all Vercel preview deployments
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https://chobighar-.*\.vercel\.app$",
]
```

Then restart your Django server.

---

## 🐛 Troubleshooting

### Issue: Domain not resolving
**Solution:**
- Wait 30 minutes for DNS propagation
- Check DNS records are correct
- Use incognito browser (clear cache)

### Issue: Certificate error
**Solution:**
- Wait for Vercel to generate SSL (automatic)
- Usually takes 5-10 minutes after DNS propagates

### Issue: Site shows 404
**Solution:**
- Verify domain is added in Vercel dashboard
- Check DNS records point to correct values
- Wait for DNS propagation

### Issue: CORS errors
**Solution:**
- Add domain to Django CORS_ALLOWED_ORIGINS
- Restart Django server

---

## 📊 Current Status

### ✅ Completed:
- Frontend code optimized
- Vercel deployment configured
- Environment variables set
- Code pushed to GitHub
- Site deployed on Vercel

### ⏳ Pending:
- DNS configuration (you need to do this)
- Wait for DNS propagation
- Verify domain in Vercel

### 🎯 Next Steps:
1. **Configure DNS in Namecheap** (follow Step 2 above)
2. **Wait 15-30 minutes** for DNS propagation
3. **Verify in Vercel dashboard** that domain is connected
4. **Test your site** at chobighar.com
5. **Update Django CORS** settings

---

## 🚀 Quick Commands

### Check if DNS is propagated:
```powershell
nslookup chobighar.com
```

### Open Vercel dashboard:
```powershell
vercel ls
```

### View project logs:
```powershell
vercel logs
```

---

## 📞 Resources

- **Vercel Dashboard:** https://vercel.com/dashboard
- **DNS Checker:** https://dnschecker.org
- **Namecheap DNS:** https://www.namecheap.com/support/knowledgebase/article.aspx/319/2237/how-can-i-set-up-an-a-address-record-for-my-domain/
- **Vercel Domains Docs:** https://vercel.com/docs/concepts/projects/domains

---

## 🎉 Final Result

Once DNS propagates, you'll have:

✅ **chobighar.com** - Your main domain
✅ **www.chobighar.com** - WWW subdomain
✅ **chobighar.vercel.app** - Vercel URL (still works)
✅ **HTTPS enabled** - Automatic SSL
✅ **Global CDN** - Fast worldwide
✅ **Auto deployments** - Push to Git = Auto deploy
✅ **Production ready** - All features working

---

## 💡 Remember

- DNS changes take **5-30 minutes** to propagate
- Vercel SSL is **automatic** - no setup needed
- Site will work at both **chobighar.com** and **chobighar.vercel.app**
- Every Git push will **auto-deploy** to production

---

## 🎬 Start DNS Configuration Now!

1. **Login to Namecheap**
2. **Go to Advanced DNS**
3. **Add the two records** (A and CNAME)
4. **Wait 15-30 minutes**
5. **Test your site!**

Your site will be live at **chobighar.com** very soon! 🚀
