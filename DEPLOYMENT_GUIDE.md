# W Dentz Website - Public Deployment Guide

## Overview

We'll deploy:
- **Frontend** → Vercel (free, easy for React/Vite)
- **Backend** → Railway (free tier available)
- **Database** → Firebase (already configured)

---

## Step 1: Prepare Your Project for Deployment

### 1.1 Update Backend API URL

First, update your backend configuration to work with hosted API.

In **`client/src/sections/Admin/AdminDashboard.jsx`**, find the API calls and make sure they use environment variable for the API URL:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Then use:
const response = await fetch(`${API_URL}/api/contact`);
```

### 1.2 Add API URL to `.env.local`

Update **`client/.env.local`**:

```
VITE_FIREBASE_API_KEY=AIzaSyBEZSQCscIy-MgW0UkGDE58bE-90Z8BEec
VITE_FIREBASE_AUTH_DOMAIN=w-dentz.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=w-dentz
VITE_FIREBASE_STORAGE_BUCKET=w-dentz.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=726681390338
VITE_FIREBASE_APP_ID=1:726681390338:web:de4e9d3d4d301fd72b061b
VITE_API_URL=http://localhost:5000
```

---

## Step 2: Deploy Backend to Railway

### 2.1 Create Railway Account

1. Go to: https://railway.app
2. Click **"Start Project"**
3. Sign up with GitHub / Email
4. Authorize Railway to access your GitHub

### 2.2 Deploy Backend from GitHub

1. In Railway dashboard, click **"New Project"**
2. Choose **"Deploy from GitHub"**
3. Select your repository (W dentz repo)
4. Select the **`server`** directory (important!)
5. Click **"Deploy"**

### 2.3 Set Environment Variables

1. Go to **"Variables"** tab in Railway
2. Add these environment variables:
   ```
   PORT=5000
   NODE_ENV=production
   ```
3. Firebase credentials are already in your code, so no need to add them here

### 2.4 Get Your Backend URL

1. In Railway, go to **"Deployments"**
2. Your URL will look like: `https://wdentz-api-prod-up.railway.app`
3. **Copy this URL** - you'll need it next

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account

1. Go to: https://vercel.com
2. Click **"Sign Up"**
3. Sign up with GitHub / Email
4. Authorize Vercel to access GitHub

### 3.2 Deploy Frontend from GitHub

1. Click **"New Project"**
2. Select your W dentz repository
3. Choose **Framework**: React (Vite)
4. In **"Root Directory"**, set to: `client`
5. Click **"Deploy"**

### 3.3 Add Environment Variables

1. After selecting repository, go to **"Environment Variables"**
2. Add all 6 Firebase variables:

```
VITE_FIREBASE_API_KEY = AIzaSyBEZSQCscIy-MgW0UkGDE58bE-90Z8BEec
VITE_FIREBASE_AUTH_DOMAIN = w-dentz.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = w-dentz
VITE_FIREBASE_STORAGE_BUCKET = w-dentz.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID = 726681390338
VITE_FIREBASE_APP_ID = 1:726681390338:web:de4e9d3d4d301fd72b061b
VITE_API_URL = https://wdentz-api-prod-up.railway.app
```

**Replace the Railway URL with your actual backend URL from Step 2.4**

3. Click **"Deploy"**

### 3.4 Wait for Deployment

- Vercel will build and deploy automatically
- Takes about 2-3 minutes
- Your URL will be: `https://wdentz.vercel.app` (or custom domain)

---

## Step 4: Update Backend CORS Settings

Your backend needs to accept requests from your frontend URL.

In **`server/server.js`**, update CORS:

```javascript
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://wdentz.vercel.app', // Add your Vercel URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
```

Then redeploy backend on Railway (push to GitHub, Railway auto-redeploys).

---

## Step 5: Setup Custom Domain (Optional)

### 5.1 Get a Domain

- Use: GoDaddy, Namecheap, Google Domains, or any registrar
- Purchase domain: `wdentz.com` or similar
- Cost: $10-15/year

### 5.2 Connect to Vercel (Frontend)

1. In Vercel, go to **"Settings"** → **"Domains"**
2. Add your domain: `wdentz.com`
3. Copy the nameservers Vercel provides
4. Go to your domain registrar (GoDaddy, etc.)
5. Update nameservers to Vercel's nameservers
6. Wait 24-48 hours for DNS to update

### 5.3 Connect to Railway (Backend API)

1. In Railway, go to **"Settings"** → **"Domains"**
2. Add custom domain: `api.wdentz.com`
3. Follow Railway's instructions to add DNS record
4. Update `VITE_API_URL` in Vercel to: `https://api.wdentz.com`

---

## Step 6: Test Everything

### 6.1 Test Public Website

1. Visit: `https://wdentz.vercel.app` (or your custom domain)
2. Check all pages load correctly:
   - ✅ Home
   - ✅ About
   - ✅ Services
   - ✅ Contact
3. Try submitting a contact form
4. Check Firebase to see if inquiry saved

### 6.2 Test Admin Dashboard

1. Visit: `https://wdentz.vercel.app/admin/login`
2. Login with:
   - Email: `staff@wdentz.com`
   - Password: `SecurePass123`
3. Check if dashboard loads
4. Verify contact inquiries appear
5. Test search, filter, export features

---

## Final URLs After Deployment

```
Public Website:     https://wdentz.com (or .vercel.app)
Admin Login:        https://wdentz.com/admin/login
Admin Dashboard:    https://wdentz.com/admin/dashboard
API Backend:        https://api.wdentz.com
```

---

## Troubleshooting

**"CORS error when submitting form"**
- Update `server.js` CORS settings
- Add your Vercel URL to `allowedOrigins`
- Redeploy backend

**"Admin dashboard blank"**
- Check if API_URL environment variable is set correctly
- Check browser console for errors (F12)
- Verify backend is running and accessible

**"Contact form not saving"**
- Check Firebase rules are correct
- Verify backend has Firebase credentials
- Check backend logs in Railway

**"Custom domain not working"**
- DNS can take 24-48 hours to update
- Check nameservers are correct
- Clear browser cache using Ctrl+Shift+Delete

---

## Quick Deployment Summary

```
1. ✅ Create Railway account
2. ✅ Deploy backend from GitHub to Railway
3. ✅ Get Railway backend URL
4. ✅ Create Vercel account
5. ✅ Deploy frontend from GitHub to Vercel
6. ✅ Add environment variables to Vercel
7. ✅ Update CORS in backend server.js
8. ✅ Test website and admin dashboard
9. ✅ (Optional) Setup custom domain
10. ✅ Share with clinic staff!
```

---

## After Going Live

- Keep both servers running in Railway
- Backend auto-scales on Railway's free tier
- Monitor Firebase usage
- Add more staff accounts as needed
- Backup inquiries regularly (export CSV)

You're done! 🎉

