# Contact Form Complete Guide

## 📋 Overview

The chobighar website has **TWO contact forms** that both:
1. ✅ **Save data to the database** (Inquiry model)
2. ✅ **Open WhatsApp** with pre-filled message for immediate communication

---

## 🎯 Contact Forms Location

### 1. **Photography Inquiry Form** (Homepage)
- **Component**: `components/ContactForm.tsx`
- **Used On**: Homepage
- **Purpose**: Quick photography service inquiries
- **Fields**:
  - Type of Shoot (dropdown)
  - Preferred Date
  - Email Address
  - Phone Number
  - Your Requirements (textarea)

### 2. **General Contact Form** (Contact Page)
- **Component**: `src/app/contact/page.tsx`
- **Used On**: `/contact` page
- **Purpose**: Detailed contact and inquiries
- **Fields**:
  - Your Name
  - Phone Number
  - Email Address
  - Service Interested In (dropdown)
  - Event Date
  - Tell Us About Your Vision (textarea)

---

## 🔄 How It Works

### Form Submission Flow:

```
User Fills Form
     ↓
Clicks "Submit"
     ↓
[STEP 1] Data Saved to Database (Inquiry model)
     ↓
[STEP 2] WhatsApp Opens with Pre-filled Message
     ↓
User Can Send WhatsApp Message Immediately
     ↓
Success Message Shown
     ↓
Form Resets After 3 Seconds
```

---

## 💾 Database Storage

### Where Data Is Stored:
- **Model**: `Inquiry` (in `backend/inquiry/models.py`)
- **Admin Panel**: `/admin/inquiry/inquiry/`

### Data Fields Saved:
```python
{
    "inquiry_type": "photoshoot" or "general",
    "name": "Customer Name",
    "email": "customer@email.com",
    "phone": "+91 9876543210",
    "subject": "Wedding Photography - Photography Inquiry",
    "message": "Detailed message with requirements",
    "service_name": "Wedding Photography",
    "event_date": "2025-12-25",
    "source": "contact_form" or "contact_page",
    "status": "new",  # Auto-set
    "priority": "medium",  # Auto-set
    "created_at": "2025-10-08T...",
}
```

### View Inquiries in Admin:
1. Go to: `https://yourdomain.com/admin/`
2. Login with admin credentials
3. Click **"Inquiry"** → **"Inquiries"**
4. See all form submissions with:
   - Customer info (name, email, phone)
   - Inquiry type badge
   - Status (New, Contacted, In Progress, Completed)
   - Priority (Low, Medium, High, Urgent)
   - Service details
   - Event information
   - Timestamps

---

## 📱 WhatsApp Integration

### How WhatsApp Integration Works:

1. **WhatsApp Number Source**: 
   - Fetched from: `/api/header/contact-info/`
   - Model: `ContactInfo` (in `backend/header/models.py`)
   - Field: `whatsapp_number`

2. **Where to Set WhatsApp Number**:
   - Go to: `/admin/header/contactinfo/`
   - Edit the contact info record
   - Set the **"Whatsapp number"** field
   - Format: `+91 9876543210` or `9876543210`

3. **Message Format**:

**For Photography Inquiry (Homepage Form)**:
```
📞 Contact Form Submission 📞

👤 Name: Photography Client
📧 Email: customer@email.com
📱 Phone: +91 9876543210
🎯 Subject: Wedding Photography
💬 Message:
We need a wedding photographer for December 25th.
Budget: 50,000 INR
Location: Park Street, Kolkata

✨ Sent via chobighar.com Contact Form ✨
```

**For General Contact (Contact Page Form)**:
```
📞 Contact Form Submission 📞

👤 Name: John Doe
📧 Email: john@email.com
📱 Phone: +91 9876543210
🎯 Subject: General Inquiry
💬 Message:
I'm interested in pre-wedding photography services.

✨ Sent via chobighar.com Contact Form ✨
```

---

## ⚙️ Admin Panel Configuration

### 1. Set WhatsApp Number

**Location**: `/admin/header/contactinfo/`

**Steps**:
1. Login to Django Admin
2. Go to **Header** → **Contact Information**
3. Click on the existing contact info (or add new)
4. Fill in **"Whatsapp number"** field
5. Example: `+919876543210` or `9876543210`
6. Click **Save**

**Important**: 
- ✅ Use country code (+91 for India)
- ✅ No spaces or dashes (they'll be removed automatically)
- ✅ This number will be used for ALL WhatsApp integrations

### 2. View Inquiry Submissions

**Location**: `/admin/inquiry/inquiry/`

**Admin Interface Shows**:
- 📊 **List View**:
  - Customer Info (name, email, phone with icons)
  - Inquiry Type Badge (with emoji)
  - Subject Preview
  - Status Badge (color-coded: 🆕 New, 📞 Contacted, ⏳ In Progress, ✅ Completed)
  - Priority Badge (🟢 Low, 🟡 Medium, 🔴 High, 🚨 Urgent)
  - Service Name
  - Event Info (date + location)
  - Created Date
  - Assigned To

- 📝 **Detail View** (Click on any inquiry):
  ```
  👤 Customer Information
      ├── Name
      ├── Email
      └── Phone

  📝 Inquiry Details
      ├── Inquiry Type
      ├── Subject
      ├── Message
      └── Source

  🛍️ Service Information
      ├── Service Name
      └── Service ID

  🎉 Event Details
      ├── Event Date
      ├── Event Location
      └── Budget Range

  ⚙️ Management
      ├── Status (dropdown: New/Contacted/In Progress/Completed/Cancelled)
      ├── Priority (dropdown: Low/Medium/High/Urgent)
      ├── Assigned To
      └── Notes (internal notes)

  🕒 Timeline
      ├── ID (UUID)
      ├── Created At
      ├── Updated At
      ├── Responded At
      └── Response Time (calculated)
  ```

### 3. Manage Inquiries

**Bulk Actions**:
- ✅ Mark selected inquiries as contacted
- ✅ Mark selected inquiries as in progress
- ✅ Mark selected inquiries as completed

**Individual Actions**:
- View full details
- Edit inquiry information
- Add internal notes
- Assign to staff member
- Update status and priority
- Add follow-ups

---

## 🧪 Testing the Contact Forms

### Test Form Submission:

**Test Case 1: Photography Inquiry Form (Homepage)**
1. Go to homepage
2. Scroll to "LET'S PLAN YOUR MARRIAGE PHOTOGRAPHY" section
3. Fill in:
   - Type of Shoot: "Wedding Photography"
   - Preferred Date: Select future date
   - Email: test@example.com
   - Phone: +91 9876543210
   - Requirements: "Test inquiry for wedding"
4. Click **"SEND MESSAGE"**
5. **Expected Result**:
   - ✅ Form shows loading state
   - ✅ Data saved to database
   - ✅ WhatsApp opens in new tab with pre-filled message
   - ✅ Success message appears
   - ✅ Form resets after 3 seconds

**Test Case 2: General Contact Form (Contact Page)**
1. Go to `/contact` page
2. Scroll to contact form
3. Fill in:
   - Your Name: "John Doe"
   - Phone Number: +91 9876543210
   - Email Address: test@example.com
   - Service: "Wedding Photography"
   - Event Date: Select future date
   - Message: "Test contact form"
4. Click **"Send Message & Get Quote"**
5. **Expected Result**:
   - ✅ Data saved to database
   - ✅ WhatsApp opens with pre-filled message
   - ✅ Success message appears
   - ✅ Form resets after 3 seconds

### Verify in Admin Panel:

1. Login to `/admin/`
2. Go to **Inquiry** → **Inquiries**
3. You should see your test submission with:
   - 🆕 **Status**: New
   - 🟡 **Priority**: Medium
   - **Inquiry Type**: "photoshoot" or "general"
   - **Source**: "contact_form" or "contact_page"
   - All form data populated

---

## 🔧 Technical Details

### API Endpoints Used:

**1. Create Inquiry**:
```
POST /api/inquiry/create/
Content-Type: application/json

Body:
{
  "inquiry_type": "photoshoot",
  "name": "Customer Name",
  "email": "customer@email.com",
  "phone": "+91 9876543210",
  "subject": "Wedding Photography - Photography Inquiry",
  "message": "Detailed requirements...",
  "service_name": "Wedding Photography",
  "event_date": "2025-12-25",
  "source": "contact_form"
}

Response: 201 Created
{
  "id": "uuid",
  "status": "new",
  "created_at": "..."
}
```

**2. Get WhatsApp Number**:
```
GET /api/header/contact-info/

Response: 200 OK
{
  "phone": "+91 9876543210",
  "email": "info@chobighar.com",
  "whatsapp_number": "+91 9876543210"
}
```

### Hook Used:

**`useWhatsAppIntegration()`** (in `hooks/useWhatsAppIntegration.ts`)

**Functions**:
- `sendContactFormToWhatsApp(data)` - Opens WhatsApp with contact form data
- `sendInquiryToWhatsApp(data)` - Opens WhatsApp with inquiry data
- `sendVendorInquiryToWhatsApp(data)` - Opens WhatsApp with vendor inquiry
- `sendToWhatsApp(data, customMessage)` - Generic WhatsApp sender

**Auto-fetches WhatsApp number from**:
```typescript
fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/header/contact-info/`)
```

---

## 🐛 Troubleshooting

### Issue: WhatsApp Doesn't Open

**Possible Causes**:
1. ❌ WhatsApp number not set in admin
2. ❌ ContactInfo not active
3. ❌ API endpoint `/api/header/contact-info/` not working

**Solution**:
1. Check `/admin/header/contactinfo/`
2. Verify **"Whatsapp number"** field is filled
3. Ensure **"Is active"** is checked
4. Test API: Visit `http://localhost:8000/api/header/contact-info/`
5. Should return: `{"phone": "...", "email": "...", "whatsapp_number": "..."}`

### Issue: Data Not Saving to Database

**Possible Causes**:
1. ❌ Backend server not running
2. ❌ API endpoint `/api/inquiry/create/` not working
3. ❌ CORS issues
4. ❌ Missing required fields

**Solution**:
1. Check backend is running: `python manage.py runserver`
2. Test API manually:
```bash
# PowerShell
$body = @{
  inquiry_type='general'
  name='Test'
  email='test@test.com'
  phone='9876543210'
  subject='Test'
  message='Test'
  service_name='Test'
  source='test'
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:8000/api/inquiry/create/ -Method POST -Body $body -ContentType 'application/json'
```
3. Check Django logs for errors
4. Verify all required model fields are provided

### Issue: Form Doesn't Reset After Submission

**Possible Causes**:
1. ❌ JavaScript error preventing timeout
2. ❌ State not updating properly

**Solution**:
1. Check browser console for errors (F12 → Console)
2. Verify `setFormData()` is called in success callback
3. Check timeout is set correctly (3000ms = 3 seconds)

---

## ✅ Checklist for Complete Setup

- [ ] **Backend Setup**:
  - [ ] Django server running (`python manage.py runserver`)
  - [ ] Migrations applied (`python manage.py migrate`)
  - [ ] Admin user created (`python manage.py createsuperuser`)
  
- [ ] **Admin Configuration**:
  - [ ] Login to `/admin/`
  - [ ] Go to **Header** → **Contact Information**
  - [ ] Set **WhatsApp number** field
  - [ ] Mark as **Is active**
  - [ ] Save changes
  
- [ ] **Test Submission**:
  - [ ] Fill out homepage contact form
  - [ ] Click submit
  - [ ] Verify data saved in `/admin/inquiry/inquiry/`
  - [ ] Verify WhatsApp opens with message
  - [ ] Test contact page form
  - [ ] Verify both forms work correctly
  
- [ ] **Production Setup**:
  - [ ] Update `NEXT_PUBLIC_API_URL` in `.env`
  - [ ] Set correct WhatsApp number for production
  - [ ] Test forms on production domain
  - [ ] Monitor inquiries in admin panel

---

## 📊 Summary

### What Happens on Form Submit:

1. **User Action**: Fills form and clicks submit
2. **Frontend**: Validates form data
3. **API Call**: POST to `/api/inquiry/create/`
4. **Database**: Saves inquiry with status "New"
5. **WhatsApp**: Opens with pre-filled message
6. **UI**: Shows success message
7. **Admin**: Can view/manage in admin panel
8. **Reset**: Form clears after 3 seconds

### Data Flow:

```
Form Input
    ↓
React State (formData)
    ↓
API Request (fetch)
    ↓
Django Backend (inquiry/views.py)
    ↓
Database (Inquiry model)
    ↓
Admin Panel (viewable/manageable)
    
Parallel:
    ↓
WhatsApp Hook (useWhatsAppIntegration)
    ↓
Fetch WhatsApp Number (from ContactInfo)
    ↓
Open WhatsApp (wa.me link)
```

**All set! Your contact forms are now fully functional with database storage and WhatsApp integration!** 🚀
