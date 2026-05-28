# ASSET_DEPENDENCY_GRAPH.md

## Overview

This document maps the complete asset dependency chain from the original HTTrack WordPress site to the Next.js frontend implementation.

---

## ASSET DEPENDENCY CHAIN

```
ORIGINAL WORDPRESS SITE
│
├── WordPress Core
│   ├── wp-includes/js/jquery/ (jQuery)
│   └── wp-includes/css/ (WordPress core styles)
│
├── PLUGINS
│   │
│   ├── ELEMENTOR (Page Builder)
│   │   ├── elementor/assets/lib/eicons/ (Icon font)
│   │   │   └── elementor-icons.mindff9.css
│   │   ├── elementor/assets/lib/font-awesome/ (Font Awesome 5)
│   │   │   ├── all.minfb3d.css
│   │   │   ├── brands.min52d5.css
│   │   │   ├── fontawesome.min52d5.css
│   │   │   ├── regular.min52d5.css
│   │   │   ├── solid.min52d5.css
│   │   │   └── v4-shims.minfb3d.css
│   │   ├── elementor/assets/lib/swiper/ (Swiper carousel)
│   │   │   └── swiper.min94a4.css
│   │   ├── elementor/assets/css/
│   │   │   ├── frontend.minfb3d.css (CORE)
│   │   │   ├── widget-image.minfb3d.css
│   │   │   ├── widget-heading.minfb3d.css
│   │   │   ├── widget-video.minfb3d.css
│   │   │   ├── widget-image-box.minfb3d.css
│   │   │   ├── widget-icon-list.minfb3d.css
│   │   │   ├── widget-social-icons.minfb3d.css
│   │   │   └── conditionals/apple-webkit.minfb3d.css
│   │   └── elementor/assets/js/ (Frontend JS)
│   │       ├── webpack.runtime.minfb3d.js
│   │       ├── frontend-modules.minfb3d.js
│   │       └── frontend.minfb3d.js
│   │
│   ├── ELEMENTOR PRO
│   │   ├── elementor-pro/assets/css/
│   │   │   ├── widget-call-to-action.mine92f.css
│   │   │   ├── widget-blockquote.min503b.css
│   │   │   ├── widget-mega-menu.min9e35.css
│   │   │   ├── widget-nav-menu.min42e3.css
│   │   │   └── conditionals/transitions.mine92f.css
│   │   └── elementor-pro/assets/js/
│   │       ├── webpack-pro.runtime.mine92f.js
│   │       ├── frontend.mine92f.js
│   │       └── elements-handlers.mine92f.js
│   │
│   ├── HEADER FOOTER ELEMENTOR (HFE)
│   │   ├── header-footer-elementor/assets/css/
│   │   │   └── header-footer-elementora489.css
│   │   ├── header-footer-elementor/inc/widgets-css/
│   │   │   └── frontenda489.css
│   │   └── header-footer-elementor/inc/js/
│   │       └── frontenda489.js
│   │
│   ├── SLIDER REVOLUTION
│   │   ├── revslider/public/css/
│   │   │   └── sr7efd5.css
│   │   ├── revslider/public/js/
│   │   │   ├── libs/tptoolsefd5.js
│   │   │   └── sr7efd5.js
│   │   └── SR7 configuration object (inline)
│   │
│   └── SKT TEMPLATES
│       └── skt-templates/css/
│           └── templaters8717.css
│
├── THEME (Posterity)
│   ├── posterity/style5152.css (Main theme)
│   ├── posterity/css/icomoon5152.css (Icon font)
│   └── posterity/js/ (jQuery plugins)
│       ├── helpers.min5152.js (SKTParams)
│       ├── jquery.fitvids.min4963.js
│       ├── jquery.fittext.min62ea.js
│       ├── jquery.slides.min459e.js
│       ├── jquery.sticky-kit.mincfa9.js
│       ├── jquery.mousewheel.mina9d5.js
│       ├── jquery.typed.min8daf.js
│       ├── isotope.pkgd.min7c45.js
│       ├── light-gallery/
│       │   ├── css/lightgallery.min544c.css
│       │   ├── css/lg-transitions.min544c.css
│       │   └── js/lightgallery-all.min544c.js
│       └── script.min5152.js
│
└── GOOGLE FONTS (Local copies)
    ├── uploads/elementor/google-fonts/css/
    │   ├── robotoc199.css (Roboto)
    │   ├── robotoslab3a4c.css (Roboto Slab)
    │   └── poppins8c72.css (Poppins)
    └── fonts.googleapis.com (CDN fallback)
```

---

## NEXT.JS FRONTEND MAPPING

```
NEXT.JS FRONTEND (/public/)
│
├── /plugins/elementor/ (Elementor assets)
│   ├── assets/css/frontend.minfb3d.css
│   ├── assets/css/widget-*.minfb3d.css
│   ├── assets/lib/eicons/css/elementor-icons.mindff9.css
│   └── assets/lib/font-awesome/css/*.css
│
├── /plugins/elementor-pro/ (Elementor Pro assets)
│   └── assets/css/widget-*.mine92f.css
│
├── /wp-content/plugins/header-footer-elementor/
│   ├── assets/css/header-footer-elementora489.css
│   └── inc/widgets-css/frontenda489.css
│
├── /wp-content/plugins/revslider/
│   ├── public/css/sr7efd5.css
│   └── public/js/tptoolsefd5.js, sr7efd5.js
│
├── /wp-content/plugins/skt-templates/
│   └── css/templaters8717.css
│
├── /wp-content/themes/posterity/
│   ├── style5152.css
│   ├── css/icomoon5152.css
│   └── js/light-gallery/css/*.css
│
└── /uploads/elementor/
    ├── css/post-54a1d3.css (Homepage styles)
    ├── css/post-554649.css (Global kit)
    ├── css/post-634649.css (Header)
    ├── css/post-2314649.css (Footer)
    └── google-fonts/css/robotoc199.css, etc.
```

---

## CSS LOAD ORDER (Original → Next.js)

### Original WordPress Head Order:

```
1.  hfe-widgets-style-css (header-footer-elementor)
2.  sr7css-css (revslider)
3.  templaters-css (skt-templates)
4.  hfe-style-css (header-footer-elementor)
5.  elementor-icons-css (eicons)
6.  elementor-frontend-css (elementor core)
7.  elementor-post-55-css (post-554649 global kit)
8.  widget-image-css
9.  widget-heading-css
10. widget-video-css
11. widget-image-box-css
12. widget-call-to-action-css (elementor-pro)
13. e-transitions-css (elementor-pro)
14. elementor-post-54-css (post-54a1d3 homepage)
15. elementor-post-63-css (post-634649 header)
16. elementor-post-231-css (post-2314649 footer)
17. hfe-elementor-icons-css
18. hfe-icons-list-css
19. hfe-social-icons-css
20. hfe-social-share-icons-brands-css
21. hfe-social-share-icons-fontawesome-css
22. hfe-nav-menu-icons-css
23. hfe-widget-blockquote-css
24. hfe-mega-menu-css
25. hfe-nav-menu-widget-css
26. jquery-lightgallery-transitions-css
27. jquery-lightgallery-css
28. font-awesome-css (4.7)
29. a13-icomoon-css
30. posterity-a13-main-style-css
31. [inline user css]
32. font-awesome-5-all-css
33. font-awesome-4-shim-css
34. elementor-gf-local-roboto-css
35. elementor-gf-local-robotoslab-css
36. elementor-gf-local-poppins-css
37. elementor-icons-shared-0-css
38. elementor-icons-fa-solid-css
39. elementor-icons-fa-regular-css
40. elementor-icons-fa-brands-css
```

### Next.js Implementation (layout.tsx):

```
1.  Google Fonts preconnect (fonts.googleapis.com)
2.  Google Fonts Poppins (CDN fallback)
3.  Favicon
4.  /wp-content/plugins/header-footer-elementor/inc/widgets-css/frontenda489.css
5.  /wp-content/plugins/revslider/public/css/sr7efd5.css
6.  /wp-content/plugins/skt-templates/css/templaters8717.css
7.  /wp-content/plugins/header-footer-elementor/assets/css/header-footer-elementora489.css
8.  /plugins/elementor/assets/lib/eicons/css/elementor-icons.mindff9.css
9.  /plugins/elementor/assets/css/frontend.minfb3d.css
10. /uploads/elementor/css/post-554649.css
11. /plugins/elementor/assets/css/widget-image.minfb3d.css
12. /plugins/elementor/assets/css/widget-heading.minfb3d.css
13. /plugins/elementor/assets/css/widget-video.minfb3d.css
14. /plugins/elementor/assets/css/widget-image-box.minfb3d.css
15. /plugins/elementor-pro/assets/css/widget-call-to-action.mine92f.css
16. /plugins/elementor-pro/assets/css/conditionals/transitions.mine92f.css
17. /uploads/elementor/css/post-54a1d3.css (Homepage)
18. /uploads/elementor/css/post-634649.css (Header)
19. /uploads/elementor/css/post-2314649.css (Footer)
20. /plugins/elementor/assets/lib/eicons/css/elementor-icons.min705c.css
21. /plugins/elementor/assets/css/widget-icon-list.min44b4.css
22. /plugins/elementor/assets/css/widget-social-icons.min2401.css
23. /plugins/elementor/assets/lib/font-awesome/css/brands52d5.css
24. /plugins/elementor/assets/lib/font-awesome/css/fontawesome52d5.css
25. /plugins/elementor/assets/lib/font-awesome/css/solid52d5.css
26. /wp-content/themes/posterity/js/light-gallery/css/lg-transitions.min544c.css
27. /wp-content/themes/posterity/js/light-gallery/css/lightgallery.min544c.css
28. /plugins/elementor/assets/lib/font-awesome/css/font-awesome.min1849.css
29. /wp-content/themes/posterity/css/icomoon5152.css
30. /wp-content/themes/posterity/style5152.css
31. [INLINE: posterity-a13-user-css-inline-css]
32. /plugins/elementor/assets/lib/font-awesome/css/all.minfb3d.css
33. /plugins/elementor/assets/lib/font-awesome/css/v4-shims.minfb3d.css
34. /uploads/elementor/google-fonts/css/robotoc199.css
35. /uploads/elementor/google-fonts/css/robotoslab3a4c.css
36. /uploads/elementor/google-fonts/css/poppins8c72.css
37. /plugins/elementor/assets/lib/font-awesome/css/fontawesome.min52d5.css
38. /plugins/elementor/assets/lib/font-awesome/css/solid.min52d5.css
39. /plugins/elementor/assets/lib/font-awesome/css/regular.min52d5.css
40. /plugins/elementor/assets/lib/font-awesome/css/brands.min52d5.css
41. /plugins/elementor/assets/css/conditionals/apple-webkit.minfb3d.css
42. /plugins/elementor-pro/assets/css/widget-blockquote.min503b.css
43. /plugins/elementor-pro/assets/css/widget-mega-menu.min9e35.css
44. /plugins/elementor-pro/assets/css/widget-nav-menu.min42e3.css
```

---

## ASSET FILE LOCATIONS

### Critical CSS Files:

| Asset | Original Path | Next.js Public Path |
|-------|---------------|---------------------|
| Elementor Frontend | `wp-content/plugins/elementor/assets/css/frontend.minfb3d.css` | `/plugins/elementor/assets/css/frontend.minfb3d.css` |
| Homepage Styles | `wp-content/uploads/elementor/css/post-54a1d3.css` | `/uploads/elementor/css/post-54a1d3.css` |
| Global Kit | `wp-content/uploads/elementor/css/post-554649.css` | `/uploads/elementor/css/post-554649.css` |
| Header Styles | `wp-content/uploads/elementor/css/post-634649.css` | `/uploads/elementor/css/post-634649.css` |
| Footer Styles | `wp-content/uploads/elementor/css/post-2314649.css` | `/uploads/elementor/css/post-2314649.css` |
| Theme Main | `wp-content/themes/posterity/style5152.css` | `/wp-content/themes/posterity/style5152.css` |
| RevSlider | `wp-content/plugins/revslider/public/css/sr7efd5.css` | `/wp-content/plugins/revslider/public/css/sr7efd5.css` |

### Critical JS Files (Not actively used but available):

| Asset | Path |
|-------|------|
| RevSlider Core | `/wp-content/plugins/revslider/public/js/sr7efd5.js` |
| HFE Frontend | `/wp-content/plugins/header-footer-elementor/inc/js/frontenda489.js` |
| Theme Helpers | `/wp-content/themes/posterity/js/helpers.min5152.js` |

---

## DEPENDENCY RESOLUTION STATUS

| Category | Total Files | Restored | Status |
|----------|-------------|----------|--------|
| CSS Files | 42 | 42 | ✅ COMPLETE |
| JS Core Libraries | 12 | 12 | ✅ AVAILABLE |
| Font Files | 8 | 8 | ✅ AVAILABLE |
| Image Assets | ~50 | ~50 | ✅ AVAILABLE |

---

## VISUAL FIDELITY CHECKLIST

After CSS restoration, verify:

- [ ] Hero overlay: White background with opacity:0
- [ ] Dark sections: Background #1B191A applied
- [ ] Phone section: Poppins font, 35px description, #A4BDC1 color
- [ ] Services title: Roboto font, 30px, uppercase, #A4BDC1
- [ ] CTA cards: Hover zoom effect (scale 1.05)
- [ ] CTA overlay: rgba(0,0,0,0.4) dark overlay
- [ ] Image boxes: 30% icon width, centered
- [ ] Social icons: 40px circular, fab fa-facebook/instagram
- [ ] Icon fonts: fab, fas, eicon fonts loading
- [ ] Yellow banner: #FFCD00 background + backi.jpg image
- [ ] Preloader: Animated spinner with pace-rotation
- [ ] Typography: Poppins/Roboto fonts loading correctly