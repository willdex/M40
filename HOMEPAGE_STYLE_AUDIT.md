# HOMEPAGE_STYLE_AUDIT.md

## Summary
The homepage has **significant CSS loading gaps** causing visual fidelity issues. The original WordPress/Elementor site loads ~40 CSS files; the Next.js implementation loads only 2 custom CSS files.

---

## MISSING CSS FILES FROM HTTrack

### Elementor Core CSS (Not Loaded)
| File | Purpose | Status |
|------|---------|--------|
| `elementor/assets/css/frontend.minfb3d.css` | Elementor frontend base styles | ❌ MISSING |
| `elementor/assets/css/widget-image.minfb3d.css` | Image widget styles | ❌ MISSING |
| `elementor/assets/css/widget-heading.minfb3d.css` | Heading widget styles | ❌ MISSING |
| `elementor/assets/css/widget-video.minfb3d.css` | Video widget styles | ❌ MISSING |
| `elementor/assets/css/widget-image-box.minfb3d.css` | Image box widget styles | ❌ MISSING |
| `elementor/assets/css/widget-icon-list.minfb3d.css` | Icon list widget styles | ❌ MISSING |
| `elementor/assets/css/widget-social-icons.minfb3d.css` | Social icons widget styles | ❌ MISSING |
| `elementor/assets/lib/eicons/css/elementor-icons.mindff9.css` | Elementor icon font | ❌ MISSING |
| `elementor/assets/lib/font-awesome/css/font-awesome.min1849.css` | Font Awesome 4.7 | ❌ MISSING |
| `elementor/assets/lib/font-awesome/css/all.minfb3d.css` | Font Awesome 5 all | ❌ MISSING |
| `elementor/assets/lib/font-awesome/css/v4-shims.minfb3d.css` | Font Awesome 4 shim | ❌ MISSING |

### Elementor Pro CSS (Not Loaded)
| File | Purpose | Status |
|------|---------|--------|
| `elementor-pro/assets/css/widget-call-to-action.mine92f.css` | CTA widget | ❌ MISSING |
| `elementor-pro/assets/css/conditionals/transitions.mine92f.css` | Transitions | ❌ MISSING |
| `elementor-pro/assets/css/conditionals/apple-webkit.minfb3d.css` | Apple webkit fixes | ❌ MISSING |

### Page-Specific CSS (Not Loaded)
| File | Purpose | Status |
|------|---------|--------|
| `uploads/elementor/css/post-554649.css` | Global elementor kit (colors, typography) | ❌ MISSING |
| `uploads/elementor/css/post-54a1d3.css` | Homepage specific styles (MINIFIED) | ❌ MISSING |
| `uploads/elementor/css/post-634649.css` | Header elementor-hf styles | ❌ MISSING |
| `uploads/elementor/css/post-2314649.css` | Footer elementor-hf styles | ❌ MISSING |

### Theme CSS (Not Loaded)
| File | Purpose | Status |
|------|---------|--------|
| `themes/posterity/style5152.css` | Posterity theme main styles | ❌ MISSING |
| `themes/posterity/css/icomoon5152.css` | Icomoon icon font | ❌ MISSING |

### Google Fonts CSS (Not Loaded)
| File | Purpose | Status |
|------|---------|--------|
| `uploads/elementor/google-fonts/css/robotoc199.css` | Roboto font | ❌ MISSING |
| `uploads/elementor/google-fonts/css/robotoslab3a4c.css` | Roboto Slab font | ❌ MISSING |
| `uploads/elementor/google-fonts/css/poppins8c72.css` | Poppins font | ❌ MISSING |

### Other CSS (Not Loaded)
| File | Purpose | Status |
|------|---------|--------|
| `plugins/header-footer-elementor/assets/css/header-footer-elementora489.css` | HFE plugin | ❌ MISSING |
| `plugins/header-footer-elementor/inc/widgets-css/frontenda489.css` | HFE widgets | ❌ MISSING |
| `plugins/skt-templates/css/templaters8717.css` | SKT templates | ❌ MISSING |
| `plugins/revslider/public/css/sr7efd5.css` | Slider Revolution | ❌ MISSING |

---

## LOADED CSS FILES (Current)

1. `src/app/homepage-desktop.css` - Custom desktop styles
2. `src/app/homepage-responsive.css` - Custom responsive styles

---

## VISUAL ISSUES CAUSED BY MISSING CSS

### 1. Hero Section (`#51986d34`)
- Background overlay not properly styled (opacity:0 shows white)
- Section margins not applied

### 2. Main Content Section (`#3f049f0a`)
- Dark background `#1B191A` applied via CSS but container max-width not working
- Padding `80px 0px` may not be applied

### 3. Services Grid Section (`#64d9d144`)
- Dark background correct
- Title `de1818e` with `Roboto` font, `30px`, `uppercase`, color `#A4BDC1`
- Min-height `400px` on inner container not applied

### 4. Yellow Banner Section (`#471822f6`)
- **BACKGROUND IMAGE NOT LOADING**: `url("../../2024/09/backi.jpg")`
- Should have `background-color: #FFCD00` and background-image with `top right` position

### 5. Call-to-Action Cards (CTA Widget)
- Hover effects not working (transform: scale 1.05 on hover)
- Overlay `rgba(0,0,0,0.4)` not applied
- Typography not matching original (Poppins font families)

### 6. Image Box Widgets
- Icon width `30%` not applied
- Title color `#A4BDC1` may not be applied
- Description color `#D3D3D3` may not be applied

### 7. Phone Section (`#bed5b32`)
- Margin `0px 100px 0px 100px` not applied
- Title `Poppins` `17px` `600` weight
- Description `Poppins` `35px` `600` weight color `#A4BDC1`

### 8. Video Play Button
- Circular play button with `rgba(255,255,255,0.9)` background not styled

### 9. Buttons
- Blue background `#4E82F1` with border-radius `20px`
- Hover state `#4E6BD6`

---

## FONTS NOT LOADING

| Font | Usage | Status |
|------|-------|--------|
| Poppins | Phone section, CTA descriptions, image boxes | ❌ MISSING |
| Roboto | Services title, global text | ❌ MISSING |
| Roboto Slab | (not heavily used on homepage) | ❌ MISSING |

---

## RECOMMENDATIONS

1. **Copy ALL Elementor CSS** from `public/plugins/elementor/assets/css/` to be served
2. **Copy ALL Elementor Pro CSS** from `public/plugins/elementor-pro/assets/css/`
3. **Copy ALL Google Fonts CSS** from `public/uploads/elementor/google-fonts/css/`
4. **Copy post-54a1d3.css** (homepage styles) - it's minified into 9 lines
5. **Copy post-554649.css** (elementor-kit-55 global styles)
6. **Fix background image paths** for yellow banner section
7. **Import missing fonts** via Google Fonts API or copy font files

---

## PRIORITY FIXES

1. **HIGH**: Load `post-54a1d3.css` - contains all homepage-specific styles
2. **HIGH**: Load `post-554649.css` - contains global Elementor kit settings
3. **HIGH**: Fix yellow banner background image path
4. **MEDIUM**: Load all widget CSS files
5. **LOW**: Load theme CSS files