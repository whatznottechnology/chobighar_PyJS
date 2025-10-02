# DNS Configuration for chobighar.com → Vercel

## 🎯 QUICK SETUP (5 Minutes)

### Step 1: Login to Namecheap
- Go to: https://ap.www.namecheap.com/
- Login with your credentials

### Step 2: Access DNS Settings
1. Click "Domain List" in sidebar
2. Find `chobighar.com`
3. Click "Manage" button
4. Click "Advanced DNS" tab

### Step 3: Add These Records

#### Record 1 - Root Domain
```
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic
```

#### Record 2 - WWW Subdomain
```
Type: CNAME Record
Host: www
Value: cname.vercel-dns.com.
TTL: Automatic
```

### Step 4: Remove Conflicting Records

Delete any existing records for:
- A record for `@`
- CNAME for `www`
- URL Redirect/Forwarding

### Step 5: Save Changes

Click "Save All Changes" button

---

## ⏰ Wait Time

- **Minimum:** 5-10 minutes
- **Average:** 15-30 minutes  
- **Maximum:** 48 hours

---

## ✅ Verify Configuration

### Check DNS Propagation:
1. Go to: https://dnschecker.org
2. Enter: `chobighar.com`
3. Select: `A` record type
4. Should show: `76.76.21.21`

### Test Your Domain:
1. Wait 15-30 minutes
2. Visit: https://chobighar.com
3. Should show your website!

---

## 📋 Visual Guide

```
Namecheap → Domain List → chobighar.com → Manage → Advanced DNS

Current Records (DELETE THESE):
╔═══════╦══════╦═══════════════════╦═════╗
║ Type  ║ Host ║ Value             ║ TTL ║
╠═══════╬══════╬═══════════════════╬═════╣
║ A     ║ @    ║ (old IP)          ║ Auto║ ← DELETE
║ CNAME ║ www  ║ (old value)       ║ Auto║ ← DELETE
╚═══════╩══════╩═══════════════════╩═════╝

New Records (ADD THESE):
╔═══════╦══════╦═══════════════════════╦═════╗
║ Type  ║ Host ║ Value                 ║ TTL ║
╠═══════╬══════╬═══════════════════════╬═════╣
║ A     ║ @    ║ 76.76.21.21          ║ Auto║ ← ADD
║ CNAME ║ www  ║ cname.vercel-dns.com.║ Auto║ ← ADD
╚═══════╩══════╩═══════════════════════╩═════╝
```

---

## 🔍 Check Your Current DNS

### Windows Command (Run in PowerShell):
```powershell
nslookup chobighar.com
```

### Expected Result After Configuration:
```
Name:    chobighar.com
Address: 76.76.21.21
```

---

## ⚠️ Important Notes

1. **Don't use "URL Redirect"** - Use proper DNS records
2. **Vercel handles SSL automatically** - No extra setup needed
3. **Both HTTP and HTTPS will work** - Auto-redirects to HTTPS
4. **www.chobighar.com redirects to chobighar.com** - Automatic

---

## 🎯 After DNS is Configured

Your domain will:
✅ Point to Vercel servers
✅ Get automatic HTTPS/SSL
✅ Show your website
✅ Load super fast (Global CDN)
✅ Work on all devices

---

## 📞 If Something Goes Wrong

### Domain not resolving after 1 hour?

1. **Check nameservers:**
   - Go to Namecheap → Domain → Nameservers
   - Should be: Namecheap BasicDNS
   - If using custom nameservers, add records there instead

2. **Flush DNS cache (your computer):**
   ```powershell
   ipconfig /flushdns
   ```

3. **Try different browser/incognito mode**

4. **Wait up to 48 hours** for full global propagation

### SSL Certificate issues?

- Wait 5 minutes after DNS propagates
- Vercel auto-issues certificate
- Check: https://vercel.com/whatznots-projects/chobighar/settings/domains

---

## 🚀 You're Almost Done!

1. Configure DNS (5 minutes)
2. Wait 15-30 minutes
3. Visit https://chobighar.com
4. Done! 🎉
