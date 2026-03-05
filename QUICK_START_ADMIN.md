# Admin Dashboard - Quick Setup Guide

## What Was Created?

✅ **Admin Login Page** - Secure login for staff  
✅ **Admin Dashboard** - View, search, filter, export contact inquiries  
✅ **User Authentication** - Firebase-based security  
✅ **Protected Routes** - Only authenticated users can access  
✅ **CSV Export** - Download inquiries as spreadsheet  

---

## Installation (5 minutes)

### 1. Install Firebase
```bash
cd client
npm install firebase
```

### 2. Create `.env.local` File
In the `client/` folder, create a file named `.env.local`:

```
REACT_APP_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_FIREBASE_AUTH_DOMAIN=wdentz-xxxxx.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=wdentz-xxxxx
REACT_APP_FIREBASE_STORAGE_BUCKET=wdentz-xxxxx.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcd
```

**Get these values from:**

**Step-by-step to find Firebase Config:**
1. Open https://console.firebase.google.com
2. Click on your **W Dentz project**
3. Look for the **⚙️ gear icon** at the top next to "Project Overview"
4. Click it → Select **"Project settings"**
5. You'll see tabs at the top - click **"General"** tab
6. Scroll DOWN to find **"Your apps"** section
7. You should see your **Web app** entry (has a `</>` icon)
8. Click on it or the **"Config"** button next to it
9. A code snippet will appear - it looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "wdentz-xxx.firebaseapp.com",
  projectId: "wdentz-xxx",
  storageBucket: "wdentz-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

10. Copy each value into your `.env.local` file

**If you don't see a Web app:**
- Click "Add app" (or "Create web app")
- Give it a name like "W Dentz Website"
- Click "Register app"
- Then you'll see the config snippet

### 3. Firebase Setup - Authentication in Console

**Find Authentication Section:**
1. Go to https://console.firebase.google.com
2. Click on your **W Dentz project**
3. On the LEFT SIDEBAR, scroll DOWN to find **"Build"** section
4. Under "Build", click **"Authentication"**
5. You'll see a welcome screen with "Get started" button
6. **Click the blue "Get started" button**
7. Now you'll see tabs at the top: "Users", "Providers", "Settings"

**Enable Email/Password:**
1. Click on the **"Providers"** tab
2. You'll see a list of sign-in methods (Google, Facebook, Email/Password, etc.)
3. Find **"Email/Password"** in the list
4. Click on it (or the "Edit" pencil icon next to it)
5. A popup will appear - toggle **"Enable"** (the switch should turn blue)
6. Make sure **"Email/password"** is selected (NOT "Email link")
7. Click **"Save"** button

**Now Create Staff User Accounts:**
1. Click the **"Users"** tab (at the top)
2. Click the blue **"Add user"** button (top right)
3. A popup appears - enter:
   - Email: `staff@wdentz.com`
   - Password: `SecurePass123`
4. Click **"Add user"** button
5. The user will appear in the list ✓
6. Repeat to create second account:
   - Email: `manager@wdentz.com`
   - Password: `SecurePass456`

4. **Firestore Database - Security Rules:**
   - On the LEFT SIDEBAR, under "Build", click **"Firestore Database"**
   - Click the **"Rules"** tab (at the top)
   - Delete all existing text
   - Paste this code:
   ```
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
   - Click **"Publish"** button (blue button, top right)

---

## Access URLs

Once setup is complete:

- **Main Website:** `http://localhost:5173`
- **Admin Login:** `http://localhost:5173/admin/login`
- **Admin Dashboard:** `http://localhost:5173/admin/dashboard` (after login)

---

## Login Credentials

Use the staff accounts you created in Firebase:

```
Email: staff@wdentz.com
Password: SecurePass123
```

---

## File Structure

All new files are in `client/src/sections/Admin/`:

```
client/src/
├── firebaseConfig.js                    (Firebase setup)
├── sections/Admin/
│   ├── AdminLogin.jsx                   (Login page)
│   ├── AdminLogin.css                   (Login styling)
│   ├── AdminDashboard.jsx               (Dashboard page)
│   ├── AdminDashboard.css               (Dashboard styling)
│   └── ProtectedRoute.jsx               (Route protection)
└── .env.local                           (Environment variables)
```

---

## Dashboard Features

✅ View all contact inquiries  
✅ Search by name/email/phone  
✅ Filter by service type  
✅ Sort by date  
✅ Export to CSV  
✅ Delete inquiries  
✅ Responsive design  

---

## IMPORTANT: Add Routes to App.jsx

You need to add the admin routes to your `App.jsx` file:

```jsx
import AdminLogin from './sections/Admin/AdminLogin';
import AdminDashboard from './sections/Admin/AdminDashboard';
import ProtectedRoute from './sections/Admin/ProtectedRoute';
```

Then add to your router:
```jsx
<Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/dashboard" element={<ProtectedRoute component={AdminDashboard} />} />
```

---

## Testing

**IMPORTANT: Use TWO separate terminal windows**

### Terminal 1 - Frontend:
```bash
cd client
npm install
npm run dev
```

You should see: `Local:   http://localhost:5173/`

### Terminal 2 - Backend:
```bash
cd server
npm install
npm start
```

You should see: `Server running on port 5000`

### Then visit in browser:
3. Open `http://localhost:5173/admin/login`
4. Login with:
   - Email: `staff@wdentz.com`
   - Password: `SecurePass123`
5. You should see the dashboard!

**Before testing, confirm you have completed:**
- ✅ Created `.env.local` file in `client/` folder with all 6 Firebase values
- ✅ Created staff accounts in Firebase Authentication
- ✅ Enable Email/Password in Firebase Authentication
- ✅ Set Firestore security rules

---

## Troubleshooting

**"Can't login"** → Check Firebase auth is enabled and user exists  
**"No data showing"** → Check backend is running on port 5000  
**"Firestore error"** → Check Firebase security rules are set correctly  
**"Env vars missing"** → Make sure `.env.local` file exists in `client/` folder  

---

## Next Steps

1. ✅ Customize with your dental clinic branding
2. ✅ Add staff members in Firebase
3. ✅ Give them login credentials
4. ✅ They can now access inquiries anytime!

---

**Questions?** Check the detailed setup guide in `ADMIN_SETUP_GUIDE.md`
