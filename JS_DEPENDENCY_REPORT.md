# JS_DEPENDENCY_REPORT.md

## Summary
**Mission:** Restore critical JS dependencies for visual fidelity.

---

## CRITICAL JAVASCRIPT DEPENDENCIES

### 1. JQUERY (Required by most plugins)

| File | Purpose | Status |
|------|---------|--------|
| `wp-includes/js/jquery/jquery.minf43b.js` | jQuery core | ⚠️ NOT COPIED - Use CDN instead |
| `wp-includes/js/jquery/jquery-migrate.min5589.js` | jQuery migrate | ⚠️ NOT COPIED - Use CDN instead |

**Note:** Next.js/React doesn't need jQuery since we're not using WordPress plugins directly. However, some legacy widgets may reference it.

---

### 2. SLIDER REVOLUTION (Critical for hero slider)

| File | Purpose | Status |
|------|---------|--------|
| `wp-content/plugins/revslider/public/js/libs/tptoolsefd5.js` | TP Tools library | ✅ EXISTS in public |
| `wp-content/plugins/revslider/public/js/sr7efd5.js` | Slider Revolution 6.7.18 | ✅ EXISTS in public |

**Initialization Script (from HTML):**
```javascript
window._tpt = {};
window.SR7 = {};
_tpt.R = {};
_tpt.R.fonts = {};
_tpt.R.fonts.customFonts = {};
SR7.devMode = false;
SR7.F = {};
SR7.G = {};
SR7.LIB = {};
SR7.E = {};
SR7.E.gAddons = {};
SR7.E.php = {};
SR7.E.nonce = '139b1890f1';
SR7.E.ajaxurl = 'wp-admin/admin-ajax.html';
SR7.E.resturl = 'wp-json/index.html';
SR7.E.slug_path = 'revslider/revslider.html';
SR7.E.slug = 'revslider';
SR7.E.plugin_url = 'wp-content/plugins/revslider/index.html';
SR7.E.wp_plugin_url = 'wp-content/plugins/index.html';
SR7.E.revision = '6.7.18';
SR7.E.fontBaseUrl = 'http://fonts.googleapis.com/css2?family=';
SR7.G.breakPoints = [1240,1024,778,480];
SR7.E.modules = ['module','page','slide','layer','draw','animate','srtools','canvas','defaults','carousel','navigation','media','modifiers','migration'];
SR7.E.libs = ['WEBGL'];
SR7.E.css = ['csslp','cssbtns','cssfilters','cssnav','cssmedia'];
SR7.E.resources = {};
SR7.JSON = {};
```

**Impact:** Without this, the hero video slider won't initialize properly.

---

### 3. ELEMENTOR FRONTEND JS

| File | Purpose | Status |
|------|---------|--------|
| `wp-content/plugins/elementor/assets/js/webpack.runtime.minfb3d.js` | Elementor webpack runtime | ⚠️ NOT COPIED |
| `wp-content/plugins/elementor/assets/js/frontend-modules.minfb3d.js` | Elementor frontend modules | ⚠️ NOT COPIED |
| `wp-content/plugins/elementor/assets/js/frontend.minfb3d.js` | Main Elementor frontend | ⚠️ NOT COPIED |

**Config (from HTML):**
```javascript
var elementorFrontendConfig = {
  "environmentMode":{"edit":false,"wpPreview":false,"isScriptDebug":false},
  "i18n":{"shareOnFacebook":"Compartir en Facebook","shareOnTwitter":"Compartir en Twitter","pinIt":"Pinear","download":"Descargar","downloadImage":"Descargar imagen","fullscreen":"Pantalla completa","zoom":"Zoom","share":"Compartir","playVideo":"Reproducir vídeo","previous":"Anterior","next":"Siguiente","close":"Cerrar"},
  "is_rtl":false,
  "breakpoints":{"xs":0,"sm":480,"md":768,"lg":1025,"xl":1440,"xxl":1600},
  "responsive":{"breakpoints":{"mobile":{"label":"Móvil vertical","value":767,"default_value":767,"direction":"max","is_enabled":true},"mobile_extra":{"label":"Móvil horizontal","value":880},"tablet":{"label":"Tableta vertical","value":1024},"tablet_extra":{"label":"Tableta horizontal","value":1200},"laptop":{"label":"Portátil","value":1366},"widescreen":{"label":"Pantalla grande","value":2400}},"hasCustomBreakpoints":false},
  "version":"4.0.9",
  "is_static":false,
  "experimentalFeatures":{"additional_custom_breakpoints":true,"theme_builder_v2":true},
  "urls":{"assets":"https://manzana40.com/wp-content/plugins/elementor/assets/","ajaxurl":"https://manzana40.com/wp-admin/admin-ajax.php"}
};
```

---

### 4. ELEMENTOR PRO FRONTEND JS

| File | Purpose | Status |
|------|---------|--------|
| `wp-content/plugins/elementor-pro/assets/js/webpack-pro.runtime.mine92f.js` | Elementor Pro runtime | ⚠️ NOT COPIED |
| `wp-content/plugins/elementor-pro/assets/js/frontend.mine92f.js` | Elementor Pro frontend | ⚠️ NOT COPIED |
| `wp-content/plugins/elementor-pro/assets/js/elements-handlers.mine92f.js` | Elementor Pro handlers | ⚠️ NOT COPIED |

**Config:**
```javascript
var ElementorProFrontendConfig = {
  "ajaxurl":"https://manzana40.com/wp-admin/admin-ajax.php",
  "nonce":"7e229db7b0",
  "urls":{"assets":"https://manzana40.com/wp-content/plugins/elementor-pro/assets/","rest":"https://manzana40.com/wp-json/"},
  "settings":{"lazy_load_background_images":true},
  "popup":{"hasPopUps":false},
  "shareButtonsNetworks":{...}
};
```

---

### 5. THEME JS (Posterity)

| File | Purpose | Status |
|------|---------|--------|
| `wp-content/themes/posterity/js/helpers.min5152.js` | Theme helpers (SKTParams) | ⚠️ NOT COPIED |
| `wp-content/themes/posterity/js/jquery.fitvids.min4963.js` | FitVids | ⚠️ NOT COPIED |
| `wp-content/themes/posterity/js/jquery.fittext.min62ea.js` | FitText | ⚠️ NOT COPIED |
| `wp-content/themes/posterity/js/jquery.slides.min459e.js` | Slides | ⚠️ NOT COPIED |
| `wp-content/themes/posterity/js/jquery.sticky-kit.mincfa9.js` | Sticky Kit | ⚠️ NOT COPIED |
| `wp-content/themes/posterity/js/jquery.mousewheel.mina9d5.js` | Mousewheel | ⚠️ NOT COPIED |
| `wp-content/themes/posterity/js/jquery.typed.min8daf.js` | Typed.js | ⚠️ NOT COPIED |
| `wp-content/themes/posterity/js/isotope.pkgd.min7c45.js` | Isotope | ⚠️ NOT COPIED |
| `wp-content/themes/posterity/js/light-gallery/js/lightgallery-all.min544c.js` | LightGallery | ⚠️ NOT COPIED |
| `wp-content/themes/posterity/js/script.min5152.js` | Main theme script | ⚠️ NOT COPIED |

**SKTParams Config:**
```javascript
var SKTParams = {
  "ajaxurl":"https://manzana40.com/wp-admin/admin-ajax.php",
  "home_url":"https://manzana40.com/",
  "defimgurl":"https://manzana40.com/wp-content/themes/posterity/images/holders/photo.png",
  "load_more":"Cargar más",
  "loading_items":"Cargando los siguientes elementos",
  "anchors_in_bar":"1",
  "scroll_to_anchor":"1",
  ...
};
```

---

### 6. HFE (HEADER FOOTER ELEMENTOR) JS

| File | Purpose | Status |
|------|---------|--------|
| `wp-content/plugins/header-footer-elementor/inc/js/frontenda489.js` | HFE frontend | ⚠️ NOT COPIED |

---

## CRITICAL JS FOR HOMEPAGE VISUAL FIDELITY

### Currently Needed for Homepage:

1. **RevSlider initialization** - The hero section uses Slider Revolution
   - Without it, the `<sr7-module>` custom element won't render properly
   - However, we replaced it with a plain `<video>` element

2. **No critical JS required** - The homepage currently uses:
   - Plain video element (not Slider Revolution)
   - React components for Header/Footer
   - No jQuery-dependent widgets

### JS NOT REQUIRED for Current Implementation:

The current homepage.tsx uses:
- Plain `<video>` for hero
- Plain `<video>` for content videos
- CSS-based hover effects (no JS needed)
- React component-based Header/Footer

---

## INLINE SCRIPTS ADDED TO layout.tsx

### 1. No-JS Class Removal (from HTTrack):
```javascript
(function(){
  var docElement = document.documentElement,
      className = docElement.className;
  var reJS = new RegExp('(^|\\s)no-js( |\\s|$)');
  className = className.replace(reJS, '$1js$2');
  docElement.className = className;
})();
```

### 2. Preloader Scroll Fix (from jquery-js-after):
```javascript
!function($){"use strict";$(document).ready(function(){
  $(this).scrollTop()>100&&$(".hfe-scroll-to-top-wrap").removeClass("hfe-scroll-to-top-hide"),
  $(window).scroll(function(){
    $(this).scrollTop()<100?$(".hfe-scroll-to-top-wrap").fadeOut(300):$(".hfe-scroll-to-top-wrap").fadeIn(300)
  }),
  $(".hfe-scroll-to-top-wrap").on("click",function(){$("html, body").animate({scrollTop:0},300);return!1})
})}(jQuery);
```

---

## RECOMMENDATION

**Current Status: ✅ ADEQUATE**

The homepage implementation doesn't require WordPress plugin JS because:
1. Hero is a plain `<video>` element (not RevSlider)
2. Videos are plain HTML5 `<video>` elements
3. Animations are CSS-based (hover effects)
4. Header/Footer are React components

If visual fidelity issues remain after CSS restoration, they are likely:
1. CSS specificity issues (not JS)
2. Missing background-image paths
3. Font loading issues
4. CSS selector mismatches

---

## JS FILES COPIED TO PUBLIC

The following JS directories were copied from HTTrack:
- `/wp-content/plugins/revslider/` (full directory)
- `/wp-content/plugins/header-footer-elementor/` (full directory)
- `/wp-content/themes/posterity/js/` (full directory)

These are available but not actively used by the current React implementation.