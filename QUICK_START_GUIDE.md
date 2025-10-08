# Quick Start Guide - Inquiry System Setup

## ⚡ 5-Minute Setup

### Step 1: Set WhatsApp Number (2 minutes)

1. Open browser: `http://localhost:8000/admin/` (or your admin URL)
2. Login with admin credentials
3. Click **"Header"** → **"Contact Information"**
4. Click on the existing record (or create new if none exists)
5. Fill in **"Whatsapp number"** field:
   ```
   Example: +919876543210
   Or: 9876543210
   ```
6. Check ✅ **"Is active"**
7. Click **"Save"** button
8. Done! ✅

### Step 2: Test Forms (3 minutes)

#### Test 1: Homepage Photography Form
1. Go to: `http://localhost:3000/`
2. Scroll to red section: "LET'S PLAN YOUR MARRIAGE PHOTOGRAPHY"
3. Fill form:
   - Type of Shoot: **Wedding Photography**
   - Preferred Date: **[Future date]**
   - Email: **test@example.com**
   - Phone: **9876543210**
   - Requirements: **Test inquiry**
4. Click **"SEND MESSAGE"**
5. ✅ Success message should appear
6. ✅ WhatsApp should open in new tab

#### Test 2: Contact Page Form
1. Go to: `http://localhost:3000/contact`
2. Scroll to form section
3. Fill form:
   - Name: **Test User**
   - Phone: **9876543210**
   - Email: **test@example.com**
   - Service: **Wedding Photography**
   - Message: **Test contact form**
4. Click **"Send Message & Get Quote"**
5. ✅ Success message should appear
6. ✅ WhatsApp should open in new tab

#### Test 3: Vendor Profile Form
1. Go to: `http://localhost:3000/vendors`
2. Click on any vendor card
3. Scroll to **"Get In Touch"** section
4. Fill form:
   - Name: **Test User**
   - Phone: **9876543210**
   - Email: **test@example.com**
   - Message: **Test vendor inquiry**
4. Click **"Send Message"**
5. ✅ Success alert should appear
6. ✅ WhatsApp should open in new tab

### Step 3: Verify in Admin (1 minute)

1. Go to: `http://localhost:8000/admin/inquiry/inquiry/`
2. You should see **3 new inquiries**:
   ```
   ✅ Photography Client (photoshoot) - from contact_form
   ✅ Test User (general) - from contact_page
   ✅ Test User (vendor) - from vendor_detail_page
   ```
3. Click on any inquiry to view full details
4. All data should be populated ✅

---

## 🎯 What Each Form Does

### Homepage Form → Database → WhatsApp
```
User fills "Photography Inquiry" form
     ↓
Saves to database (inquiry_type: photoshoot)
     ↓
Opens WhatsApp with photography inquiry message
```

### Contact Page → Database → WhatsApp
```
User fills "Contact Form"
     ↓
Saves to database (inquiry_type: general)
     ↓
Opens WhatsApp with contact form message
```

### Vendor Profile → Database → WhatsApp
```
User fills "Vendor Inquiry" form
     ↓
Saves to database (inquiry_type: vendor, with vendor_id)
     ↓
Opens WhatsApp with vendor-specific message
```

---

## 📍 Important URLs

### Frontend:
- **Homepage**: `http://localhost:3000/`
- **Contact Page**: `http://localhost:3000/contact`
- **Vendors Page**: `http://localhost:3000/vendors`
- **Vendor Profile**: `http://localhost:3000/[vendor-slug]`

### Backend Admin:
- **Admin Home**: `http://localhost:8000/admin/`
- **Inquiries List**: `http://localhost:8000/admin/inquiry/inquiry/`
- **Contact Info**: `http://localhost:8000/admin/header/contactinfo/`

### API Endpoints:
- **Create Inquiry**: `POST http://localhost:8000/api/inquiry/create/`
- **Get Contact Info**: `GET http://localhost:8000/api/header/contact-info/`

---

## 🐛 Troubleshooting Quick Fixes

### WhatsApp Not Opening?

**Fix 1**: Check WhatsApp number is set
```
Admin → Header → Contact Information → Whatsapp number field
Should have: +919876543210 or 9876543210
```

**Fix 2**: Check Contact Info is active
```
Admin → Header → Contact Information → "Is active" checkbox ✅
```

**Fix 3**: Test API endpoint
```
Visit: http://localhost:8000/api/header/contact-info/
Should return: {"phone": "...", "email": "...", "whatsapp_number": "..."}
```

### Form Not Submitting?

**Fix 1**: Check required fields are filled
```
- Name (for contact & vendor forms)
- Email (all forms)
- Phone (all forms)
- Date (homepage form)
- Type of Shoot (homepage form)
```

**Fix 2**: Check backend is running
```
Terminal should show: Django server running on port 8000
```

**Fix 3**: Check browser console
```
Press F12 → Console tab
Look for errors (red text)
```

### Data Not in Admin?

**Fix 1**: Refresh the admin page
```
Press Ctrl+R or F5 to reload
```

**Fix 2**: Clear filters
```
Click "Show all" or clear inquiry type filter
```

**Fix 3**: Check source filter
```
Filter by source: contact_form, contact_page, or vendor_detail_page
```

---

## ✅ Success Checklist

After setup, verify:

- [ ] ✅ WhatsApp number is set in admin
- [ ] ✅ Contact Info is marked as active
- [ ] ✅ Homepage form submits and opens WhatsApp
- [ ] ✅ Contact page form submits and opens WhatsApp
- [ ] ✅ Vendor profile form submits and opens WhatsApp
- [ ] ✅ All 3 inquiries appear in admin panel
- [ ] ✅ Each inquiry has correct data
- [ ] ✅ WhatsApp messages are properly formatted
- [ ] ✅ Forms reset after successful submission

---

## 📚 Documentation Files

For detailed guides, see:

1. **CONTACT_FORM_GUIDE.md** - Homepage & Contact page forms
2. **VENDOR_INQUIRY_FORM_GUIDE.md** - Vendor profile form
3. **COMPLETE_INQUIRY_SYSTEM_SUMMARY.md** - Full system overview
4. **ADMIN_SEO_GUIDE.md** - SEO metadata management

---

## 🎉 You're All Set!

Your inquiry system is ready to:
- ✅ Capture all customer inquiries
- ✅ Save data to database
- ✅ Open WhatsApp automatically
- ✅ Manage inquiries in admin panel

**Start testing and collecting inquiries!** 🚀
