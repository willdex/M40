# Manzana40 - Deployment Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     DOMAIN (manzana40.com)                   │
│                        GoDaddy DNS                          │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                     VERCEL (Frontend)                       │
│                   Next.js 14 App Router                     │
│                   - Homepage                                 │
│                   - CMS Admin                                │
│                   - API Routes                              │
│                   - Static pages                            │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          │ PostgreSQL Connection
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   SUPABASE (Database)                       │
│                   PostgreSQL                                 │
│                   - CMS Content                             │
│                   - Admin Users                             │
│                   - Media metadata                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

1. GitHub account with repository access
2. Vercel account (free tier works)
3. Supabase account (free tier works)

---

## Step 1: Create Supabase Database

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Choose region closest to your users (Miami for Bolivia)
4. Save the password securely
5. Wait for project to be ready

### Get Connection String

In Supabase dashboard:
1. Go to Settings → Database
2. Find "Connection string" section
3. Copy "URI" format:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@[HOST]:5432/postgres
   ```

---

## Step 2: Update Environment Variables

Edit `.env` file:
```env
DATABASE_URL="postgresql://postgres:YOUR-PASSWORD@db.YOUR-PROJECT.supabase.co:5432/postgres"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="https://manzana40.vercel.app"
NEXT_PUBLIC_BASE_URL="https://manzana40.vercel.app"
NEXT_PUBLIC_SITE_URL="https://manzana40.com"
ADMIN_EMAIL="admin@manzana40.com"
ADMIN_PASSWORD="your-secure-password"
```

---

## Step 3: Push Schema to Supabase

```bash
# Install dependencies (if not done)
npm install

# Push schema to Supabase
npm run db:push
```

---

## Step 4: Seed Initial Data

```bash
npm run db:seed
```

---

## Step 5: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import "willdex/M40" repository
4. Select "main" branch
5. Click "Deploy"

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

---

## Step 6: Configure Environment Variables in Vercel

In Vercel dashboard:
1. Select your project
2. Go to Settings → Environment Variables
3. Add each variable from `.env`:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - `NEXT_PUBLIC_BASE_URL`
   - `NEXT_PUBLIC_SITE_URL`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`

---

## Step 7: Connect Custom Domain

### In Vercel:
1. Go to Settings → Domains
2. Add `manzana40.com`
3. Click "Add"

### In GoDaddy:
1. Log into GoDaddy DNS
2. Remove existing A records for @ (if pointing to old hosting)
3. Add CNAME:
   - Name: `www` or `@`
   - Value: `cname.vercel-dns.com`
4. Or add records Vercel provides

---

## Step 8: Configure SSL

Vercel provides automatic SSL. If issues:
1. In Vercel → Domains → Refresh Certificate
2. Wait 24-48 hours for DNS propagation

---

## Important Notes

### Uploads

Current setup uses local filesystem (`public/uploads`). This will NOT persist on Vercel.

**Temporary solution for launch:**
- Keep uploads local initially
- Accept limitation for MVP

**Later migrate to:**
- Supabase Storage (recommended)
- Cloudinary
- AWS S3

### Admin Login

After deployment:
1. Go to `/admin/login`
2. Use credentials from `ADMIN_EMAIL` and `ADMIN_PASSWORD`

### Database Backups

Supabase provides automatic backups. Verify in:
Settings → Database → Backups

---

## Troubleshooting

### "Prisma Client could not find"

```bash
npx prisma generate
```

### "Connection refused" errors

1. Check DATABASE_URL is correct
2. Verify Supabase IP allowlist includes Vercel
3. Check connection pooling settings

### Build fails

1. Check all environment variables are set in Vercel
2. Run `npm run build` locally first
3. Check for TypeScript errors

---

## Rollback Plan

If deployment fails:

1. Keep GoDaddy hosting active with old WordPress site
2. Revert DNS to point to GoDaddy
3. Fix issues locally
4. Redeploy

---

## Post-Launch Checklist

- [ ] Admin login works
- [ ] CMS content saves correctly
- [ ] Homepage loads properly
- [ ] Responsive works on mobile
- [ ] Uploads function (with Supabase Storage)
- [ ] SSL certificate active
- [ ] DNS properly configured
- [ ] 404 page works
- [ ] Forms submit correctly
