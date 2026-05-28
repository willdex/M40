# MANZANA40 - DEPLOYMENT GUIDE
Last Updated: 2026-05-26

## GODADDY DEPLOYMENT INSTRUCTIONS

### Prerequisites
- GoDaddy Hosting Account with Node.js support
- SSH Access to your hosting (for cPanel or CLI)
- Domain: manzana40.com (or custom)

---

## STEP 1: BUILD LOCAL (On your machine)

```bash
cd frontend
npm install
npm run build
```

### Build Output
- Next.js compiles to `.next/` folder
- For GoDaddy standard hosting, copy the entire `frontend/` folder

### For Standalone Output (Alternative)
If using GoDaddy VPS/dedicated with more resources:
```bash
# In next.config.js, use output: 'standalone'
npm run build
# Then copy only `.next/standalone/` folder
```

---

## STEP 2: UPLOAD TO GODADDY

### Method A: cPanel File Manager
1. Log into GoDaddy cPanel
2. Open File Manager
3. Navigate to `public_html/` or your domain root
4. Upload the `frontend/` folder contents
5. Ensure `.next/` and `public/` folders are included

### Method B: FTP/SFTP
1. Connect using FileZilla or similar FTP client
2. Upload entire `frontend/` folder structure
3. Maintain folder hierarchy

---

## STEP 3: INSTALL DEPENDENCIES ON SERVER

SSH into your GoDaddy server and run:

```bash
cd /path/to/your/domain/frontend
npm install --production
npm run build
```

Or if using pre-built:

```bash
npm install --production
```

---

## STEP 4: START THE APPLICATION

### Standard Node.js Start
```bash
cd frontend
npm start
```

### With PM2 (Process Manager - Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Start the app
cd frontend
pm2 start npm --name "manzana40" -- start

# Auto-start on reboot
pm2 save
pm2 startup
```

### With systemd (VPS/Dedicated)
Create service file at `/etc/systemd/system/manzana40.service`:
```ini
[Unit]
Description=Manzana40 Next.js App
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/path/to/frontend
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl enable manzana40
sudo systemctl start manzana40
```

---

## STEP 5: CONFIGURE DOMAIN

### In cPanel
1. Go to Domains > Subdomains or Domains > Aliases
2. Point your domain to the frontend folder
3. Or use .htaccess for proxy

### Alternative: .htaccess Proxy
If using Apache (not recommended for production):
```apache
RewriteEngine On
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

---

## STEP 6: SSL/HTTPS

GoDaddy automatically provides SSL through AutoSSL or Let's Encrypt.

After setup, force HTTPS in next.config.js:
```javascript
const nextConfig = {
  // ... other config
  async rewrites() {
    return [
      {
        source: '/(.*)',
        destination: '/(.*)',
      },
    ]
  },
}
```

---

## ENVIRONMENT VARIABLES

Set these in your GoDaddy environment or .env file:

```env
NODE_ENV=production
PORT=3000
HOST="0.0.0.0"
```

---

## PORT CONFIGURATION

GoDaddy shared hosting typically uses port 3000. If blocked, use:

```bash
# Find available port
PORT=3001 npm start
```

---

## TROUBLESHOOTING

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# Kill it
kill -9 <PID>
```

### Memory Issues
```bash
# Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=2048" npm start
```

### Build Errors
Ensure Node.js version is 18+:
```bash
node --version
# Should be v18.x or higher
```

---

## FILE PERMISSIONS

```bash
# Set correct permissions
chmod -R 755 frontend/
chmod -R 755 frontend/node_modules  # if needed
```

---

## QUICK START CHECKLIST

- [ ] Node.js 18+ installed on GoDaddy server
- [ ] Uploaded frontend/ folder to hosting
- [ ] Ran npm install --production
- [ ] Started app with npm start or PM2
- [ ] Configured domain pointing
- [ ] Enabled SSL certificate
- [ ] Tested at https://manzana40.com

---

## ROLLBACK PROCEDURE

1. Stop current app: `pm2 stop manzana40` or `Ctrl+C`
2. Restore previous build from backup
3. Restart: `pm2 start manzana40` or `npm start`
