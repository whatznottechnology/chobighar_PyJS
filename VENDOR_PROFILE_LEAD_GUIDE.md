# Vendor Profile Lead Form - Complete Guide

## 📋 Overview

The **Vendor Profile Detail Page** has a **Quick Inquiry Modal** that:
1. ✅ **Saves lead data to the database** (Inquiry model)
2. ✅ **Opens WhatsApp** with pre-filled vendor-specific message
3. ✅ **Auto-fills** vendor name and service details
4. ✅ **Validates** all form fields
5. ✅ **Shows success message** after submission

---

## 🎯 Where Is It Used?

### Vendor Profile Page
- **URL Pattern**: `/{vendorSlug}` (e.g., `/raj-photography`)
- **Component**: `src/app/[vendorId]/page.tsx`
- **Modal Component**: `components/InquiryModal.tsx`

### How Users Access It:
1. Browse vendor profiles at `/vendors`
2. Click on any vendor card
3. View vendor profile page
4. Click **"SEND INQUIRY"** button
5. Modal opens with inquiry form

---

## 📝 Form Fields

The inquiry modal includes:

### Required Fields:
- **Your Name** * (text input)
- **Phone Number** * (tel input)
- **Email Address** * (email input)
- **Your message or requirements** * (textarea)

### Optional Fields:
- **Event Date** (date picker - shows for vendor/photoshoot services)

### Auto-filled Fields (Hidden):
- `inquiry_type`: "vendor"
- `service_name`: Vendor's business name (e.g., "Raj Photography")
- `service_id`: Vendor's unique ID
- `subject`: "Inquiry about [Vendor Name]"
- `message`: Pre-filled with vendor-specific message
- `source`: "website"

---

## 🔄 Form Submission Flow

```
User Opens Vendor Profile
     ↓
Clicks "SEND INQUIRY" Button
     ↓
Modal Opens with Pre-filled Data
     ↓
User Fills: Name, Phone, Email, Message
     ↓
Clicks "Send Inquiry"
     ↓
[STEP 1] Validates Form Fields
     ↓
[STEP 2] Saves Data to Database (Inquiry model)
     ↓
[STEP 3] WhatsApp Opens with Vendor-Specific Message
     ↓
[STEP 4] Success Message Shown
     ↓
[STEP 5] Modal Auto-Closes After 3 Seconds
```

---

## 💾 Database Storage

### Where Data Is Saved:
- **Model**: `Inquiry` (backend/inquiry/models.py)
- **Admin Panel**: `/admin/inquiry/inquiry/`

### Data Structure Saved:
```python
{
    # Auto-filled from vendor profile
    "inquiry_type": "vendor",
    "service_name": "Raj Photography",
    "service_id": "123",
    "subject": "Inquiry about Raj Photography",
    "source": "website",
    
    # User-provided data
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "message": "Hi, I'm interested in your Wedding Photography services...",
    "event_date": "2025-12-25",  # Optional
    
    # System-generated
    "status": "new",
    "priority": "medium",
    "created_at": "2025-10-08T...",
}
```

---

## 📱 WhatsApp Integration

### Message Format:

When a user submits the vendor inquiry form, WhatsApp opens with:

```
🎉 New Service Inquiry 🎉

👤 Name: John Doe
📧 Email: john@example.com
📱 Phone: +91 9876543210
🎯 Service Interested: Raj Photography
📅 Event Date: 2025-12-25
💰 Budget Range: Not specified
📍 Event Location: Not specified
💬 Message: Hi, I'm interested in your Wedding Photography services for my upcoming event. Please provide more details about availability and pricing.

✨ Inquiry submitted via chobighar.com ✨
```

### WhatsApp Number Source:
- Fetched from: `/api/header/contact-info/`
- Model: `ContactInfo` (backend/header/models.py)
- Field: `whatsapp_number`

**To Set WhatsApp Number**:
1. Go to: `/admin/header/contactinfo/`
2. Edit contact info
3. Fill **"Whatsapp number"** field: `+919876543210`
4. Save

---

## 🎨 UI/UX Features

### Modal Design:
- ✅ **Blur backdrop** - Focuses attention on form
- ✅ **Smooth animations** - Fade in/zoom effect
- ✅ **Close on backdrop click** - User-friendly
- ✅ **Auto-scroll lock** - Prevents page scrolling when modal open
- ✅ **Mobile responsive** - Works on all screen sizes
- ✅ **Accessible** - Keyboard navigation support

### Validation:
- ✅ **Real-time field validation**
- ✅ **Error messages** shown below each field
- ✅ **Email format validation**
- ✅ **Required field indicators**
- ✅ **Submit button disabled** when submitting

### User Feedback:
- ✅ **Loading state** - "Sending..." text during submission
- ✅ **Success state** - Green checkmark + "Thank You!" message
- ✅ **Error state** - Red error message if submission fails
- ✅ **Auto-close** - Modal closes 3 seconds after success

---

## 📊 Admin Panel - View Vendor Leads

### Access Vendor Inquiries:
1. Go to: `/admin/inquiry/inquiry/`
2. Look for inquiries with:
   - **Inquiry Type**: "Vendor Service" badge
   - **Service Name**: Shows vendor name
   - **Status**: New (🆕)

### Filter Vendor Leads:
1. In admin panel, use filters:
   - **Inquiry type**: Select "Vendor Service"
   - **Status**: Select "New" to see uncontacted leads
   - **Date**: Filter by date range
   - **Priority**: High priority leads first

### View Lead Details:
Click on any inquiry to see:

```
👤 Customer Information
    Name: John Doe
    Email: john@example.com
    Phone: +91 9876543210

📝 Inquiry Details
    Inquiry Type: Vendor Service
    Subject: Inquiry about Raj Photography
    Message: [Full message from customer]
    Source: website

🛍️ Service Information
    Service Name: Raj Photography
    Service ID: 123

🎉 Event Details
    Event Date: 2025-12-25
    Event Location: [If provided]
    Budget Range: [If provided]

⚙️ Management
    Status: New → Change to "Contacted" after follow-up
    Priority: Medium → Can change to High/Urgent
    Assigned To: [Assign to staff member]
    Notes: [Add internal notes about this lead]
```

### Manage Vendor Leads:

**Bulk Actions**:
- Select multiple inquiries
- Choose action:
  - "Mark selected inquiries as contacted"
  - "Mark selected inquiries as in progress"
  - "Mark selected inquiries as completed"
- Click "Go"

**Individual Management**:
1. **Update Status**:
   - New → Contacted (after first contact)
   - Contacted → In Progress (actively working on quote)
   - In Progress → Completed (deal closed)
   - Any → Cancelled (if customer not interested)

2. **Add Follow-ups**:
   - Scroll to "Follow-ups" section
   - Click "Add another Follow-up"
   - Fill:
     - Follow-up date
     - Method (Phone/Email/WhatsApp/Meeting)
     - Notes
     - Staff member name
   - Save

3. **Assign to Staff**:
   - Set "Assigned to" field
   - Add notes about assignment

---

## 🧪 Testing Vendor Lead Form

### Test Scenario 1: Basic Vendor Inquiry

**Steps**:
1. Go to any vendor profile (e.g., `/raj-photography`)
2. Click **"SEND INQUIRY"** button
3. Fill the form:
   ```
   Name: Test Customer
   Phone: +91 9876543210
   Email: test@example.com
   Event Date: [Select future date]
   Message: Test inquiry for wedding photography
   ```
4. Click **"Send Inquiry"**

**Expected Results**:
- ✅ Loading spinner appears
- ✅ Form validates all fields
- ✅ Data saves to database
- ✅ WhatsApp opens with pre-filled message
- ✅ Success message shows: "Thank You! We'll get back to you within 24 hours."
- ✅ Modal closes after 3 seconds
- ✅ Form resets

**Verify in Admin**:
1. Login to `/admin/inquiry/inquiry/`
2. See new inquiry with:
   - Type: "Vendor Service"
   - Service Name: "Raj Photography" (or vendor you tested)
   - Status: New (🆕)
   - Priority: Medium (🟡)
   - All customer data populated

---

### Test Scenario 2: Validation Error

**Steps**:
1. Open vendor profile
2. Click "SEND INQUIRY"
3. Leave all fields empty
4. Click "Send Inquiry"

**Expected Results**:
- ✅ Form shows error messages:
  - "Name is required"
  - "Email is required"
  - "Phone number is required"
  - "Message is required"
- ✅ Form does NOT submit
- ✅ No WhatsApp opens
- ✅ No data saved to database

---

### Test Scenario 3: Invalid Email

**Steps**:
1. Open vendor profile
2. Click "SEND INQUIRY"
3. Fill form with:
   ```
   Name: Test
   Phone: 9876543210
   Email: invalidemail    (no @ or domain)
   Message: Test
   ```
4. Click "Send Inquiry"

**Expected Results**:
- ✅ Email field shows error: "Please enter a valid email"
- ✅ Form does NOT submit
- ✅ Other fields remain valid

---

## 🔧 Technical Implementation

### Components Involved:

1. **Vendor Profile Page** (`src/app/[vendorId]/page.tsx`):
   ```tsx
   <InquiryModal
     isOpen={isModalOpen}
     onClose={() => setIsModalOpen(false)}
     inquiryType="vendor"
     serviceName={vendor?.name || ''}
     serviceId={vendor?.id?.toString() || ''}
     prefilledData={{
       subject: `Inquiry about ${vendor.name}`,
       message: `Hi, I'm interested in your ${vendor.subcategory_name} services...`
     }}
   />
   ```

2. **Inquiry Modal** (`components/InquiryModal.tsx`):
   - Handles form state
   - Validates inputs
   - Submits to API
   - Opens WhatsApp
   - Shows success/error states

3. **WhatsApp Hook** (`hooks/useWhatsAppIntegration.ts`):
   ```typescript
   const { sendInquiryToWhatsApp } = useWhatsAppIntegration();
   
   sendInquiryToWhatsApp({
     name: formData.name,
     email: formData.email,
     phone: formData.phone,
     service: formData.service_name,
     message: formData.message,
     eventDate: formData.event_date,
     location: formData.event_location,
     budget: formData.budget_range
   });
   ```

### API Endpoint:
```
POST /api/inquiry/create/
Content-Type: application/json

Request Body:
{
  "inquiry_type": "vendor",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "subject": "Inquiry about Raj Photography",
  "message": "I'm interested in your services...",
  "service_name": "Raj Photography",
  "service_id": "123",
  "event_date": "2025-12-25",
  "event_location": "",
  "budget_range": "",
  "source": "website"
}

Response (201 Created):
{
  "id": "uuid-here",
  "status": "new",
  "created_at": "2025-10-08T..."
}
```

---

## 📈 Lead Management Best Practices

### 1. Response Time Goals:
- **New Leads**: Respond within 1 hour
- **Hot Leads** (urgent priority): Respond within 15 minutes
- **Follow-ups**: Every 2-3 days until response

### 2. Lead Qualification:
When reviewing leads in admin:
1. Check if event date is realistic (not too far/too close)
2. Verify phone and email are valid
3. Read full message for serious intent
4. Assign priority:
   - **Urgent**: Event within 1 month, high budget
   - **High**: Event within 3 months, clear requirements
   - **Medium**: Event 3-6 months away
   - **Low**: Just browsing, no specific date

### 3. Status Workflow:
```
New (🆕)
  ↓ [First contact made]
Contacted (📞)
  ↓ [Quote sent, negotiating]
In Progress (⏳)
  ↓ [Deal closed, contract signed]
Completed (✅)

OR

Cancelled (❌) [If customer not interested]
```

### 4. WhatsApp Follow-up Tips:
- Use WhatsApp for quick responses
- Send portfolio links via WhatsApp
- Share package details with images
- Set up WhatsApp Business account for better management

---

## 🐛 Troubleshooting

### Issue: Modal Doesn't Open

**Possible Causes**:
1. JavaScript error
2. Modal state not updating

**Solution**:
1. Check browser console (F12 → Console)
2. Look for errors
3. Verify `isModalOpen` state is updating
4. Check "SEND INQUIRY" button onClick handler

---

### Issue: WhatsApp Doesn't Open

**Possible Causes**:
1. WhatsApp number not set in admin
2. WhatsApp hook not fetching number
3. Popup blocked by browser

**Solution**:
1. Verify `/admin/header/contactinfo/` has whatsapp_number
2. Test API: `http://localhost:8000/api/header/contact-info/`
3. Check browser console for errors
4. Disable popup blocker
5. Try different browser

---

### Issue: Data Not Saving to Database

**Possible Causes**:
1. Backend server not running
2. CORS issues
3. Validation errors

**Solution**:
1. Ensure Django server running: `python manage.py runserver`
2. Check Django logs for errors
3. Test API manually with Postman/cURL
4. Check all required fields are provided
5. Verify `API_ENDPOINTS.INQUIRY_CREATE` is correct

---

### Issue: Success Message Not Showing

**Possible Causes**:
1. API response not OK
2. State not updating

**Solution**:
1. Check network tab (F12 → Network)
2. Verify API returns 201 Created
3. Check `submitStatus` state
4. Look for JavaScript errors

---

## ✅ Complete Setup Checklist

### Backend Configuration:
- [ ] Django server running
- [ ] Inquiry app installed and migrated
- [ ] Inquiry model has all required fields
- [ ] API endpoint `/api/inquiry/create/` working
- [ ] CORS configured for frontend domain

### Admin Setup:
- [ ] Admin user created
- [ ] Login to `/admin/`
- [ ] Contact Info has WhatsApp number set
- [ ] Test inquiry creation in admin panel

### Frontend Setup:
- [ ] InquiryModal component updated
- [ ] useWhatsAppIntegration hook configured
- [ ] API_ENDPOINTS.INQUIRY_CREATE set correctly
- [ ] NEXT_PUBLIC_API_URL environment variable set

### Testing:
- [ ] Test vendor profile page loads
- [ ] Click "SEND INQUIRY" - modal opens
- [ ] Submit form - data saves to database
- [ ] WhatsApp opens with message
- [ ] Success message shows
- [ ] Modal closes automatically
- [ ] Check admin panel - inquiry appears
- [ ] Test validation errors
- [ ] Test on mobile device

---

## 📊 Summary

### Vendor Lead Form Features:

✅ **Pre-filled with vendor information**
- Vendor name auto-filled
- Service type auto-filled
- Custom message template

✅ **Database Integration**
- Saves to Inquiry model
- Viewable in admin panel
- Filterable by vendor, status, date

✅ **WhatsApp Integration**
- Opens WhatsApp automatically
- Pre-filled message with lead details
- Uses admin-configured number

✅ **User Experience**
- Smooth animations
- Real-time validation
- Clear error messages
- Success feedback

✅ **Admin Management**
- View all vendor leads
- Update status & priority
- Add follow-up notes
- Assign to staff

**Your vendor profile lead form is now fully functional with database storage, WhatsApp integration, and admin management!** 🚀
