# MBPSS Property Solutions — Complete Website

Full-stack property services website for MBPSS, London.

## Quick Start

### Step 1 — Backend
```bash
cd backend
npm install
node src/index.js
```
On first run: MongoDB database + admin account created automatically.

### Step 2 — Frontend (in a new terminal)
```bash
cd frontend
npm install
npm start
```

That's it. Everything runs from these two commands.

| URL | Description |
|---|---|
| http://localhost:3000 | Public website |
| http://localhost:3000/admin | Admin panel |
| http://localhost:3000/admin/login | Admin login |
| http://localhost:5000/api/health | Backend health check |

### Default Admin Credentials
- Email: `admin@mbpss.co.uk`
- Password: `Admin@MBPSS2025`
- ⚠️ Change password after first login at `/admin/settings`

---

## Environment Variables

### backend/.env (already configured)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mbpss
JWT_SECRET=<generated>
ADMIN_EMAIL=admin@mbpss.co.uk
ADMIN_PASSWORD=Admin@MBPSS2025
SMTP_USER=your-gmail@gmail.com   ← Fill this in
SMTP_PASS=your-app-password      ← Fill this in
NOTIFY_EMAIL=info@mbpss.co.uk
```

SMTP is optional — website works without email notifications.

---

## MongoDB Setup

**Option A — Local (free):**
Download from https://www.mongodb.com/try/download/community and install.

**Option B — Cloud Atlas (free, recommended for production):**
1. Create free account at mongodb.com/atlas
2. Create free M0 cluster
3. Get connection string, put in `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mbpss
   ```

---

## Production Deployment (mbpss.co.uk)

```bash
# Build frontend
cd frontend && npm run build

# Serve with Nginx — point to frontend/build/ for public
# Point /admin/* to same build folder
# Reverse proxy /api/* to localhost:5000

# Run backend with PM2
cd backend && pm2 start src/index.js --name mbpss-api
```

Update `.env` for production:
```
NODE_ENV=production
FRONTEND_URL=https://www.mbpss.co.uk
MONGODB_URI=mongodb+srv://...  (Atlas connection string)
```

---

## Features

### Public Website (localhost:3000)
- 10 property services with dedicated pages
- 17 client company logos  
- Real reviews from database (admin approved)
- 3-step quote request form
- Contact form
- FAQ chat widget
- Scroll animations
- Fully responsive
- Terms, Privacy Policy, Cookie Policy

### Admin Panel (localhost:3000/admin)
- Dashboard with charts and KPIs
- Quotes inbox with status tracking
- Messages inbox
- Reviews — approve/reject + sentiment analysis
- Services CRUD management
- Settings + password change

### Backend API (localhost:5000/api)
- MongoDB + Mongoose
- JWT authentication
- Email notifications (Nodemailer)
- Sentiment analysis on reviews
- Auto-seeds admin on first run

---

## Contact
MBPSS · 340 West End Lane · London NW6 1LN · +44 7540 387542
