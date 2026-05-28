# MANZANA40 - BROKEN LINKS REPORT
Generated: 2026-05-26

## METHODOLOGY
- Scanned all HTML files in `Manzana40\manzana40.com\`
- Extracted all external href/src URLs
- Categorized by reliability

---

## EXTERNAL LINKS STATUS

### SOCIAL MEDIA (Require Validation)
| URL | Status | Action Required |
|-----|--------|-----------------|
| `https://www.facebook.com/M40PlazaEmpresarial` | Manual verify | Confirm page exists |
| `https://www.instagram.com/manzana40.bo/` | Manual verify | Confirm page exists |

### WHATSAPP LINKS (Functional)
| URL | Status |
|-----|--------|
| `https://api.whatsapp.com/send?phone=59171369822&text=...` | Direct API link - should work |
| `https://api.whatsapp.com/send?phone=59171369822&text=Quiero%20m%C3%A1s%20informaci%C3%B3n` | Direct API link - should work |

### SHORT LINKS (Require Validation)
| URL | Status |
|-----|--------|
| `https://bit.ly/oficinasm40` | Short link - expand to confirm target |

### EMAIL LINKS (Functional)
| URL | Status |
|-----|--------|
| `mailto:info@manzana40.com` | Standard mailto - should work |

### FONT CDN (Functional)
| URL | Status |
|-----|--------|
| `https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700` | Google Fonts - always accessible |
| `https://fonts.gstatic.com/` | Google Fonts CDN - always accessible |

### WORDPRESS CORE (Not Applicable post-migration)
| URL | Status |
|-----|--------|
| `https://manzana40.com/wp-admin/*` | WordPress admin - no longer needed |
| `https://manzana40.com/wp-login.php` | WordPress login - no longer needed |
| `https://manzana40.com/xmlrpc.php` | WordPress RPC - no longer needed |

---

## INTERNAL LINKS (Within HTTrack mirror)
These use relative paths and should work in Next.js build:
- `nosotros/index.html` → `/nosotros` route
- `oficinas/index.html` → `/oficinas` route  
- `centro-de-negocios/index.html` → `/centro-de-negocios` route
- `hub-40/index.html` → `/hub-40` route
- `boca/index.html` → `/boca` route
- `amenidades/index.html` → `/amenidades` route

---

## CRITICAL: LINK UPDATES NEEDED FOR NEXT.JS

### Navigation Links
Original: `<a href="nosotros/index.html">`
Next.js: `<Link href="/nosotros">`

### Asset Paths  
Original: `wp-content/uploads/2024/09/image.jpg`
Next.js: `/uploads/2024/09/image.jpg`

### Video References
Original: `wp-content/uploads/2024/09/video.mp4`
Next.js: `/uploads/2024/09/video.mp4`

---

## LINKS TO DEEP LINK VERIFICATION
After deployment to GoDaddy, verify these routes work:
1. `/` (Homepage)
2. `/nosotros` 
3. `/oficinas`
4. `/centro-de-negocios`
5. `/hub-40`
6. `/boca`
7. `/amenidades`
8. `/uploads/*` (all media assets)

---

## BROKEN LINK SUMMARY
| Category | Count | Status |
|----------|-------|--------|
| Social Media | 2 | Need manual verification |
| Short URLs | 1 | Need manual verification |
| WhatsApp | 3 | Should work (direct API) |
| Email | 1 | Should work |
| Fonts | 2 | Should work |
| Internal | 6 | Need routing verification |
