# MANZANA40 - ENVIRONMENT REQUIREMENTS
Last Updated: 2026-05-26

## MINIMUM REQUIREMENTS

### Node.js
| Requirement | Value | Notes |
|-------------|-------|-------|
| Version | 18.0.0+ | LTS recommended |
| Package Manager | npm 9.0+ | Comes with Node.js |
| Architecture | x64 | Standard server |

### Operating System
| OS | Status | Notes |
|----|--------|-------|
| Linux (Ubuntu 20.04+) | ✓ Recommended | Best compatibility |
| macOS | ✓ Supported | For local dev/build |
| Windows Server | ✓ Supported | For GoDaddy IIS proxy |
| FreeBSD | ⚠️ Use with caution | May need adjustments |

### Hardware (GoDaddy Standard)
| Resource | Minimum | Recommended |
|----------|---------|--------------|
| RAM | 512MB | 1GB+ |
| Disk Space | 1GB | 2GB+ for builds |
| CPU | 1 core | 2+ cores |

---

## RUNTIME DEPENDENCIES

### Production Dependencies (Installed via npm)
```
next: ^14.2.0
react: ^18.2.0
react-dom: ^18.2.0
```

### Development Dependencies (NOT needed on production)
```
typescript: ^5.0.0
@types/node: ^20.0.0
@types/react: ^18.2.0
@types/react-dom: ^18.2.0
```

---

## DISABLED FEATURES (For GoDaddy Compatibility)

The following Next.js features are DISABLED to ensure GoDaddy compatibility:

| Feature | Reason | Re-enable on VPS |
|---------|--------|-----------------|
| `output: 'standalone'` | Requires Docker/container support | ✓ On VPS |
| `serverActions` | Edge runtime dependency | ✓ Standard |
| `sharp` (image optimization) | Native compilation issues | ✓ If needed |
| Edge Functions | Not supported on shared hosting | ✓ On VPS |
| ISR (Incremental Static Regeneration) | Requires server runtime | Use full rebuilds |

---

## ENVIRONMENT VARIABLES (Production)

### Required
| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Enables optimizations |
| `PORT` | `3000` (default) | Server port |
| `HOST` | `0.0.0.0` | Bind to all interfaces |

### Optional
| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://manzana40.com` | Canonical URL |
| `NEXT_PUBLIC_GA_ID` | (if using Google Analytics) | Tracking ID |

### Local Development
Create `.env.local` in frontend/:
```env
NODE_ENV=development
PORT=3000
```

---

## FILE STRUCTURE REQUIREMENTS

The following files/folders MUST be uploaded to production:

```
frontend/
├── .next/                    # Build output (generated)
├── data/                     # CMS content JSON
├── public/                    # Static assets
│   ├── css/                  # Theme CSS
│   ├── plugins/              # Elementor CSS/JS
│   └── uploads/              # All images/videos
├── src/
│   ├── app/                 # Next.js app router
│   └── components/           # React components
├── package.json              # Dependencies
├── package-lock.json         # Locked versions
├── next.config.js             # Build config
└── tsconfig.json             # TypeScript config
```

---

## COMPATIBILITY MATRIX

| Hosting Type | Compatible | Setup Notes |
|-------------|------------|------------|
| GoDaddy Shared (Basic) | ⚠️ Partial | Use standard Node.js, not standalone |
| GoDaddy Deluxe Hosting | ⚠️ Partial | May have port restrictions |
| GoDaddy VPS | ✓ Full | Can use standalone |
| GoDaddy Dedicated | ✓ Full | Full features |
| Standard Linux VPS | ✓ Full | Any provider |
| Local dev machine | ✓ Full | npm install/dev |

---

## FORBIDDEN ON SHARED HOSTING

The following are NOT supported on GoDaddy shared plans:

1. Custom port numbers below 3000
2. Long-running processes (use PM2 carefully)
3. Native compilation (sharp, bcrypt-native)
4. WebSocket servers without specific config
5. Certain API rate limits

---

## BUILD ASSETS SUMMARY

| Asset Type | Count | Size | Location |
|------------|-------|------|----------|
| Images | ~90 | ~200MB | public/uploads/ |
| Videos | 2 | ~15MB | public/uploads/2024/09/ |
| CSS files | 25+ | ~1MB | public/uploads/elementor/css/ |
| JS files | 50+ | ~5MB | public/uploads/plugins/ |
| Fonts | ~30 | ~5MB | public/uploads/elementor/google-fonts/ |

Total: ~225MB assets
Build output: ~50MB (.next folder)

---

## SSL CERTIFICATE

GoDaddy provides free SSL via AutoSSL. Verify status:
1. cPanel > Security > SSL/TLS
2. Check "AutoSSL" tab
3. Ensure域名 is covered

---

## VERIFICATION COMMANDS

Test on production server:

```bash
# Check Node version
node --version  # Should be 18+

# Check npm version
npm --version   # Should be 9+

# Test the app starts
cd frontend
npm start &
curl localhost:3000

# Should return HTML
```
