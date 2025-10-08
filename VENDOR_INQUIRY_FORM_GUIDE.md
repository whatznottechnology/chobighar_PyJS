# Vendor Profile Inquiry Form - Complete Guide

## 📋 Overview

The vendor profile detail page (`/[vendorId]`) now has a **fully functional inquiry form** that:
1. ✅ **Saves data to the database** (Inquiry model)
2. ✅ **Opens WhatsApp** with pre-filled vendor-specific message
3. ✅ **Uses WhatsApp number from ContactInfo** (set in admin)

---

## 🎯 Form Location

**Page**: Vendor Profile Detail Page  
**URL Pattern**: `https://chobighar.com/[vendor-slug]`  
**Example**: `https://chobighar.com/raj-photography`

**Form Section**: "Get In Touch" (Contact Section)  
**Scroll ID**: `#contact`

---

## 📝 Form Fields

### Contact Form Includes:
- **Your Name** (required, text input)
- **Phone Number** (required, tel input)
- **Email Address** (required, email input)
- **Event Date** (optional, date input)
- **Message** (optional, textarea - tell us about your event requirements)

---

## 🔄 How It Works

### Complete Form Submission Flow:

```
User Fills Vendor Inquiry Form
     ↓
Clicks "Send Message"
     ↓
[STEP 1] Validate Form Data
     ↓
[STEP 2] POST to /api/inquiry/create/
     ↓
[STEP 3] Save to Database (Inquiry model)
     │        └─ inquiry_type: "vendor"
     │        └─ source: "vendor_detail_page"
     │        └─ service_name: Vendor Name
     │        └─ service_id: Vendor ID
     ↓
[STEP 4] Open WhatsApp with Pre-filled Message
     │        └─ Fetch WhatsApp number from ContactInfo
     │        └─ Format vendor-specific message
     │        └─ Open wa.me/[number]?text=[message]
     ↓
[STEP 5] Show Success Alert
     ↓
[STEP 6] Reset Form
```

---

## 💾 Database Storage

### Inquiry Record Saved:

```json
{
  "inquiry_type": "vendor",
  "name": "Customer Name",
  "email": "customer@email.com",
  "phone": "+91 9876543210",
  "subject": "Vendor Inquiry - Raj Photography",
  "message": "I am interested in your Wedding Photography services for my event.",
  "service_name": "Raj Photography",
  "service_id": "123",
  "event_date": "2025-12-25",
  "source": "vendor_detail_page",
  "status": "new",
  "priority": "medium",
  "created_at": "2025-10-08T10:30:00Z"
}
```

### View in Admin Panel:

1. **Login**: `https://yourdomain.com/admin/`
2. **Navigate**: Inquiry → Inquiries
3. **Filter by**: 
   - Inquiry Type = "Vendor"
   - Source = "vendor_detail_page"
4. **See Details**:
   - Customer info (name, email, phone)
   - Vendor details (service_name, service_id)
   - Event date
   - Message content
   - Status tracking

---

## 📱 WhatsApp Integration

### WhatsApp Message Format:

```
🏪 Vendor Profile Inquiry 🏪

👤 Client Name: John Doe
📧 Email: john@example.com
📱 Phone: +91 9876543210
🏪 Vendor: Raj Photography
🎯 Service: Wedding Photography
📅 Event Date: December 25, 2025
💰 Budget: To be discussed
📍 Location: To be discussed
💬 Requirements: I am interested in your Wedding Photography services for my event. We are planning a traditional Bengali wedding.

✨ Inquiry for vendor via chobighar.com ✨
```

### How WhatsApp Number Is Retrieved:

**Source**: `/api/header/contact-info/`  
**Model**: `ContactInfo` (in `backend/header/models.py`)  
**Field**: `whatsapp_number`

**Admin Location**: `/admin/header/contactinfo/`  
**How to Set**: 
1. Login to admin
2. Go to Header → Contact Information
3. Edit the contact info record
4. Fill **"Whatsapp number"** field (e.g., `+919876543210`)
5. Ensure **"Is active"** is checked
6. Save

---

## 🧪 Testing the Vendor Inquiry Form

### Test Steps:

1. **Navigate to Vendor Profile**:
   - Go to `/vendors` page
   - Click on any vendor card
   - Or directly visit `/[vendor-slug]`

2. **Scroll to Contact Section**:
   - Scroll down to "Get In Touch" section
   - Or click "Get Quote" button in hero
   - Or click "Contact" in sticky navigation

3. **Fill the Form**:
   ```
   Your Name: Test Customer
   Phone Number: +91 9876543210
   Email Address: test@example.com
   Event Date: [Select future date]
   Message: I'm interested in booking your services for my wedding in Kolkata.
   ```

4. **Submit**:
   - Click **"Send Message"** button
   - Wait for processing

5. **Expected Results**:
   - ✅ Success alert appears: "Thank you for your inquiry! WhatsApp is opening..."
   - ✅ WhatsApp opens in new tab with pre-filled message
   - ✅ Form fields reset
   - ✅ Data saved in admin panel

6. **Verify in Admin**:
   - Go to `/admin/inquiry/inquiry/`
   - Find latest inquiry with:
     - Inquiry Type: "Vendor" 🛍️
     - Source: "vendor_detail_page"
     - Service Name: [Vendor's name]
     - Status: "New" 🆕
     - All form data populated

---

## 🎨 UI/UX Features

### Contact Section Highlights:

**Left Column - Contact Form**:
- Clean, modern form design
- Rounded input fields with focus states
- Grid layout (2 columns on desktop)
- Full-width submit button
- Red accent color matching brand
- Validation on required fields

**Right Column - Contact Info**:
- **Contact Information Card** (gray background):
  - Phone number (clickable to call)
  - Email address (clickable to email)
  - Location address
  - Icons for each contact method

- **Why Choose Us Card** (red gradient background):
  - Response Time: Within 2 hours
  - Free Consultation: Yes
  - Price Range: Dynamic from vendor data

### Visual Design:
- White background with rounded corners
- Icon-based section headers
- Hover effects on inputs
- Focus ring on active field
- Responsive grid (stacks on mobile)

---

## 📊 Admin Panel Features

### Inquiry List View Shows:

```
👤 Customer Info          | 📝 Type  | Subject Preview                | Status | Priority | Service     | Event Info          | Created
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Test Customer            | 🛍️ Vendor | Vendor Inquiry - Raj Photo... | 🆕 New | 🟡 Medium | Raj Photo... | 📅 Dec 25, 2025    | Oct 8, 2025
📞 +91 9876543210        |          |                                |        |          |             | 📍 Kolkata          |
✉️ test@example.com      |          |                                |        |          |             |                     |
```

### Inquiry Detail View Shows:

```
👤 Customer Information
   Name: Test Customer
   Email: test@example.com
   Phone: +91 9876543210

📝 Inquiry Details
   Inquiry Type: Vendor
   Subject: Vendor Inquiry - Raj Photography
   Message: I'm interested in booking your services...
   Source: vendor_detail_page

🛍️ Service Information
   Service Name: Raj Photography
   Service ID: 123

🎉 Event Details
   Event Date: 2025-12-25
   Event Location: (optional)
   Budget Range: (optional)

⚙️ Management
   Status: New (dropdown)
   Priority: Medium (dropdown)
   Assigned To: (optional)
   Notes: (internal admin notes)

🕒 Timeline
   ID: abc-123-uuid
   Created At: 2025-10-08 10:30:00
   Updated At: 2025-10-08 10:30:00
   Responded At: (when first responded)
   Response Time: (calculated)
```

---

## 🔧 Technical Implementation

### Code Location:
**File**: `src/app/[vendorId]/page.tsx`

### Hooks Used:

```typescript
// Fetch vendor data
const { vendor, loading, error } = useVendorProfile(vendorSlug);

// Fetch header data (for WhatsApp number)
const { headerData } = useHeaderData();

// WhatsApp integration
const { sendVendorInquiryToWhatsApp } = useWhatsAppIntegration();
```

### Form State:

```typescript
const [formData, setFormData] = useState({
  name: '',
  phone: '',
  email: '',
  eventDate: '',
  message: ''
});
```

### Submit Handler:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Step 1: Save to database
  const response = await fetch(API_ENDPOINTS.INQUIRY_CREATE, {
    method: 'POST',
    body: JSON.stringify({
      inquiry_type: 'vendor',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: `Vendor Inquiry - ${vendor.name}`,
      message: formData.message,
      service_name: vendor.name,
      service_id: vendor.id,
      event_date: formData.eventDate,
      source: 'vendor_detail_page'
    })
  });

  // Step 2: Open WhatsApp
  if (response.ok) {
    sendVendorInquiryToWhatsApp({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      vendorName: vendor.name,
      service: vendor.subcategory_name,
      eventDate: formData.eventDate,
      message: formData.message
    });
    
    // Step 3: Success feedback
    alert('Thank you! WhatsApp is opening...');
    
    // Step 4: Reset form
    setFormData({ name: '', phone: '', email: '', eventDate: '', message: '' });
  }
};
```

---

## 🚀 Comparison with Other Forms

### Three Inquiry Forms on chobighar:

| Feature | Homepage Form | Contact Page | Vendor Profile |
|---------|--------------|--------------|----------------|
| **Component** | `ContactForm.tsx` | `contact/page.tsx` | `[vendorId]/page.tsx` |
| **Purpose** | Photography inquiries | General contact | Vendor-specific inquiry |
| **Inquiry Type** | `photoshoot` | `general` | `vendor` |
| **Source** | `contact_form` | `contact_page` | `vendor_detail_page` |
| **Name Field** | ❌ (uses placeholder) | ✅ Required | ✅ Required |
| **Service Field** | Dropdown (shoot types) | Dropdown (services) | Auto (vendor name) |
| **Event Date** | ✅ Required | ✅ Optional | ✅ Optional |
| **Vendor Info** | ❌ N/A | ❌ N/A | ✅ Vendor name & ID |
| **WhatsApp** | ✅ Opens after submit | ✅ Opens after submit | ✅ Opens after submit |
| **Database** | ✅ Saves to Inquiry | ✅ Saves to Inquiry | ✅ Saves to Inquiry |

---

## 📋 Admin Actions Available

### Bulk Actions (Select Multiple):
- ✅ Mark selected inquiries as contacted
- ✅ Mark selected inquiries as in progress
- ✅ Mark selected inquiries as completed

### Individual Actions:
- View full inquiry details
- Edit inquiry information
- Add internal notes
- Assign to staff member
- Update status (New → Contacted → In Progress → Completed)
- Update priority (Low → Medium → High → Urgent)
- Add follow-ups (with date, method, notes)
- View response time

### Filters Available:
- Filter by inquiry type (Vendor/Photoshoot/General/etc)
- Filter by status (New/Contacted/In Progress/Completed/Cancelled)
- Filter by priority (Low/Medium/High/Urgent)
- Filter by source (vendor_detail_page/contact_form/contact_page)
- Filter by date created
- Filter by event date

### Search:
- Search by customer name
- Search by email
- Search by phone
- Search by subject
- Search by message content
- Search by service name
- Search by event location

---

## ✅ Complete Setup Checklist

### Backend Setup:
- [x] Django server running
- [x] Inquiry model migrated
- [x] API endpoint `/api/inquiry/create/` working
- [x] ContactInfo model has `whatsapp_number` field
- [x] API endpoint `/api/header/contact-info/` working

### Admin Configuration:
- [ ] Login to `/admin/`
- [ ] Set WhatsApp number in Header → Contact Information
- [ ] Mark Contact Information as "Is active"
- [ ] Test inquiry creation in admin

### Frontend Setup:
- [x] Vendor profile page has inquiry form
- [x] Form uses `useWhatsAppIntegration` hook
- [x] Form submits to `/api/inquiry/create/`
- [x] WhatsApp opens after successful submission
- [x] Form validation working
- [x] Success/error messages showing

### Testing:
- [ ] Visit any vendor profile page
- [ ] Fill and submit inquiry form
- [ ] Verify data in admin panel
- [ ] Verify WhatsApp opens with correct message
- [ ] Test form validation (required fields)
- [ ] Test error handling (network errors)

---

## 🐛 Troubleshooting

### Issue: WhatsApp Doesn't Open

**Check**:
1. ❓ Is WhatsApp number set in admin?
   - Go to `/admin/header/contactinfo/`
   - Verify `whatsapp_number` field has value
   - Ensure format: `+919876543210` or `9876543210`

2. ❓ Is ContactInfo active?
   - Check "Is active" checkbox is checked
   - Save the record

3. ❓ Is API endpoint working?
   - Visit: `http://localhost:8000/api/header/contact-info/`
   - Should return: `{"phone": "...", "email": "...", "whatsapp_number": "..."}`

4. ❓ Check browser console for errors
   - Press F12 → Console tab
   - Look for WhatsApp-related errors

### Issue: Form Not Submitting

**Check**:
1. ❓ Are required fields filled?
   - Name (required)
   - Phone (required)
   - Email (required)

2. ❓ Is backend running?
   - Django server should be on port 8000
   - Check terminal for Django logs

3. ❓ Check network tab
   - F12 → Network tab
   - Submit form
   - Look for POST to `/api/inquiry/create/`
   - Check response status (should be 201 Created)

4. ❓ Check CORS settings
   - Ensure frontend URL is allowed in Django CORS settings

### Issue: Data Not Appearing in Admin

**Check**:
1. ❓ Was submission successful?
   - Check for success alert
   - Check network response (201 status)

2. ❓ Refresh admin page
   - Inquiries list updates after page refresh

3. ❓ Check filters
   - Inquiry Type filter might be hiding results
   - Clear all filters to see all inquiries

4. ❓ Check database directly
   - Django shell: `Inquiry.objects.filter(source='vendor_detail_page')`

---

## 📈 Benefits

### For Customers:
✅ Easy inquiry submission  
✅ Instant WhatsApp communication  
✅ No app switching needed  
✅ Pre-filled vendor details  
✅ Quick response expected  

### For Admins:
✅ All inquiries in one place  
✅ Track inquiry source (vendor profile)  
✅ Know which vendor customer is interested in  
✅ Manage status and priority  
✅ Add internal notes  
✅ Assign to team members  

### For Business:
✅ Capture all leads  
✅ Immediate customer engagement via WhatsApp  
✅ Better conversion rate  
✅ Organized lead management  
✅ Performance tracking per vendor  

---

## 🎯 Summary

### Vendor Profile Inquiry Form:
- **Location**: `/[vendorId]` → Contact Section
- **Purpose**: Vendor-specific inquiries
- **Saves**: To Inquiry model with vendor details
- **Opens**: WhatsApp with vendor-specific message
- **Admin**: Full inquiry management in `/admin/inquiry/inquiry/`
- **WhatsApp Number**: From `/admin/header/contactinfo/`

### Complete Flow:
```
Customer visits Vendor Profile
     ↓
Scrolls to "Get In Touch" section
     ↓
Fills inquiry form (Name, Email, Phone, Date, Message)
     ↓
Clicks "Send Message"
     ↓
Data saved to Database (inquiry_type: vendor, source: vendor_detail_page)
     ↓
WhatsApp opens with vendor-specific message
     ↓
Customer can send WhatsApp immediately
     ↓
Admin receives inquiry in admin panel
     ↓
Admin can manage, respond, and track inquiry
```

**All vendor profile inquiries are now captured and integrated with WhatsApp!** 🚀
