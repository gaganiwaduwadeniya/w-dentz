# Admin Dashboard Setup Checklist

Complete this checklist to get your admin dashboard working!

## ✅ Prerequisites
- [ ] Node.js installed
- [ ] Firebase project created (wdentz or similar)
- [ ] Firebase Console access
- [ ] Text editor open (VS Code recommended)

---

## 📦 Phase 1: Install Dependencies

- [ ] Open terminal in `client` folder
- [ ] Run: `npm install firebase`
- [ ] Wait for installation to complete

**Command:**
```bash
cd client
npm install firebase
```

---

## 🔐 Phase 2: Firebase Configuration

### 2.1 Get Firebase Credentials
- [ ] Open Firebase Console
- [ ] Select W Dentz project
- [ ] Click Settings (⚙️ gear icon)
- [ ] Go to "Project settings"
- [ ] Scroll to "Your apps" → Find Web app
- [ ] Copy the Config object

### 2.2 Create Environment File
- [ ] In `client/` folder, create file: `.env.local`
- [ ] Copy this template:
```
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
```
- [ ] Fill in values from Firebase Console
- [ ] Save file
- [ ] **NEVER commit this file!**

---

## 🔑 Phase 3: Firebase Authentication Setup

### 3.1 Enable Email/Password Auth
- [ ] Go to Firebase Console
- [ ] Click "Authentication" in sidebar
- [ ] Click "Get Started"
- [ ] Select "Email/Password"
- [ ] Toggle "Enable"
- [ ] Click "Save"

### 3.2 Create Staff Accounts
- [ ] Click "Users" tab
- [ ] Click "Add user"
- [ ] Enter: `staff@wdentz.com`
- [ ] Password: Create strong password (write it down!)
- [ ] Click "Add user"
- [ ] Repeat for more staff:
  - [ ] `manager@wdentz.com`
  - [ ] `reception@wdentz.com`
  - [ ] Additional staff emails as needed

---

## 🗄️ Phase 4: Firestore Database Rules

### 4.1 Set Security Rules
- [ ] Go to Firebase Console
- [ ] Click "Firestore Database" 
- [ ] Click "Rules" tab
- [ ] Replace ALL text with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /health/{document=**} {
      allow write: if request.auth != null;
    }
  }
}
```

- [ ] Click "Publish"
- [ ] Confirm changes

---

## 💻 Phase 5: Add Routes to App.jsx

### 5.1 Add Imports
At the top of `client/src/App.jsx`, add:
```jsx
import AdminLogin from './sections/Admin/AdminLogin';
import AdminDashboard from './sections/Admin/AdminDashboard';
import ProtectedRoute from './sections/Admin/ProtectedRoute';
```

### 5.2 Add Routes
In your router/Routes section, add:
```jsx
<Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/dashboard" element={<ProtectedRoute component={AdminDashboard} />} />
```

- [ ] Confirm imports added
- [ ] Confirm routes added
- [ ] Save file
- [ ] No red errors in console

---

## 🚀 Phase 6: Test the System

### 6.1 Start Frontend
- [ ] Open terminal
- [ ] Navigate to `client` folder
- [ ] Run: `npm run dev`
- [ ] Wait for "Local: http://localhost:5173"

### 6.2 Start Backend (in new terminal)
- [ ] Open new terminal
- [ ] Navigate to `server` folder
- [ ] Run: `npm start`
- [ ] Wait for "🚀 Server running on http://localhost:5000"

### 6.3 Test Login Page
- [ ] Open browser
- [ ] Go to: `http://localhost:5173/admin/login`
- [ ] Should see login form with W Dentz branding
- [ ] Try logging in with staff email/password created earlier
- [ ] Should redirect to dashboard

### 6.4 Test Dashboard
- [ ] Should see "Contact Inquiries Dashboard"
- [ ] Should see stats and search box
- [ ] Test features:
  - [ ] Search by name
  - [ ] Filter by service
  - [ ] Sort by date
  - [ ] Export to CSV (if contacts exist)
- [ ] Click "Logout" button
- [ ] Should redirect to login page

---

## 📋 Phase 7: Test Contact Form

### 7.1 Submit Test Contact
- [ ] Go to: `http://localhost:5173/` (main page)
- [ ] Fill out contact form:
  - [ ] Name: Test Name
  - [ ] Email: test@example.com
  - [ ] Phone: 555-1234
  - [ ] Service: Pick one
  - [ ] Message: Test message
- [ ] Click "Send Message" or submit
- [ ] Should see success message

### 7.2 Verify in Dashboard
- [ ] Go back to admin dashboard
- [ ] Refresh page
- [ ] Should see your test contact in the table
- [ ] Verify details match what you entered

---

## ✨ Phase 8: Verify All Features

- [ ] [ ] Login works
- [ ] [ ] Dashboard loads
- [ ] [ ] Can see contacts in table
- [ ] [ ] Search function works
- [ ] [ ] Filter by service works
- [ ] [ ] Sort works
- [ ] [ ] Export to CSV works
- [ ] [ ] Delete contact works
- [ ] [ ] Logout works
- [ ] [ ] Logging back in works

---

## 📱 Phase 9: Prepare for Deployment

### For Production:
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Create admin user accounts for each staff member
- [ ] Set up backup procedure
- [ ] Document passwords securely (password manager)
- [ ] Brief staff on how to use dashboard

---

## 🎓 Staff Training

Provide staff with:
- [ ] Admin login URL
- [ ] Username (email)
- [ ] Password (securely)
- [ ] Quick guide on dashboard features
- [ ] Contact for support/issues

---

## 📞 Quick Access

Once everything is working:

**For You (Developer):**
- Admin Login: http://localhost:5173/admin/login
- Dashboard: http://localhost:5173/admin/dashboard

**For Staff:**
- Admin Login: http://yourdomain.com/admin/login
- Dashboard: http://yourdomain.com/admin/dashboard

---

## ❓ Troubleshooting

**Problem: "Not found" at /admin/login**
- [ ] Check routes added to App.jsx
- [ ] Make sure imports are correct
- [ ] Restart frontend (`npm run dev`)

**Problem: Can't login**
- [ ] Verify user exists in Firebase
- [ ] Check email spelling
- [ ] Verify password is correct
- [ ] Check .env.local has firebase credentials

**Problem: No contacts showing**
- [ ] Make sure backend is running
- [ ] Submit test contact form first
- [ ] Check Firestore in Firebase Console for data
- [ ] Verify security rules are correct

**Problem: Firebase errors in console**
- [ ] Check .env.local exists in client folder
- [ ] Verify all Firebase keys are filled in
- [ ] Reload page
- [ ] Check Firebase project settings

---

## 🎉 Completion

Once all checkboxes are checked:

✅ **Admin Dashboard is LIVE!**

Your dental clinic staff can now:
- Access inquiries anytime from anywhere
- Search and organize data
- Export reports
- Manage old inquiries

---

## 📝 Next Steps

1. Share dashboard with first staff member
2. Get their feedback
3. Fix any issues
4. Onboard remaining staff
5. Set update schedule (weekly review)
6. Monitor Firebase usage

---

**Need Help?**
- Check ADMIN_SETUP_GUIDE.md for detailed instructions
- Check ADMIN_SYSTEM_README.md for technical details
- Review error messages carefully
- Check Firebase Console for logs

---

**Date Completed:** ____________
**Completed By:** ____________
**Staff Trained:** ____________

**All systems GO! 🚀**
