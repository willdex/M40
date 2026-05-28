# CMS Integration Guide

## Manzana40 Content Management Architecture

Date: 2026-05-27

---

## Overview

This document describes the JSON-based content management architecture implemented for Manzana40. The system separates content from presentation, allowing non-technical users to edit website content without modifying code.

---

## Architecture

```
frontend/
├── data/
│   └── site-content.json       # Centralized content file
├── src/
│   ├── lib/
│   │   └── content.ts          # Content loading utilities
│   └── app/
│       └── page.tsx            # Uses content from lib
└── public/
    └── uploads/               # Media assets (images, videos)
```

---

## Content Structure (site-content.json)

```json
{
  "sliders": [
    {
      "id": "slider-1",
      "type": "video" | "image",
      "src": "/uploads/path/media.mp4",
      "poster": "/uploads/path/poster.jpg",
      "alt": "Description"
    }
  ],
  "homepage": {
    "heroTitle": "Main heading text",
    "heroSubtitle": "Description text",
    "mainVideo": {
      "src": "/uploads/path/video.mp4",
      "poster": "/uploads/path/poster.jpg"
    },
    "contactPhone": "+591 XXXXXXXXX",
    "featuresTitle": "Section title",
    "amenitiesTitle": "Section title"
  },
  "services": [
    {
      "id": "unique-id",
      "title": "Service Name",
      "description": "Short description",
      "image": "/uploads/path/image.jpg",
      "href": "/page-route"
    }
  ],
  "amenities": [
    {
      "id": "unique-id",
      "icon": "/uploads/path/icon.png",
      "title": "Amenity Name",
      "description": "Description text"
    }
  ],
  "footer": {
    "aboutTitle": "Title",
    "aboutText": "Description text",
    "servicesTitle": "Title",
    "contactTitle": "Title",
    "address": "Physical address",
    "phone": "Phone number",
    "email": "email@example.com",
    "facebook": "https://facebook.com/...",
    "instagram": "https://instagram.com/..."
  },
  "meta": {
    "siteName": "Site Name",
    "description": "SEO description",
    "phone": "+591 XXXXXXXXX"
  }
}
```

---

## Content Loader API (src/lib/content.ts)

### Functions

| Function | Description |
|----------|-------------|
| `getContent()` | Async - loads full site content |
| `getContentSync()` | Sync - loads full site content (cached) |
| `getDefaultContent()` | Returns fallback content if load fails |
| `clearContentCache()` | Clears cached content |
| `getServiceById(id)` | Get single service by ID |
| `getAmenityById(id)` | Get single amenity by ID |
| `getAllServiceIds()` | Get array of all service IDs |
| `getAllAmenityIds()` | Get array of all amenity IDs |

### Usage Example

```typescript
import { getContent, getServiceById } from '@/lib/content'

// Load all content
const content = await getContent()
console.log(content.homepage.heroTitle)

// Or use sync version (cached)
import { getContentSync } from '@/lib/content'
const content = getContentSync()
const service = getServiceById('oficinas')
```

---

## Types (src/lib/content.ts)

```typescript
export interface Slider {
  id: string
  type: 'video' | 'image'
  src: string
  poster?: string
  alt?: string
}

export interface Service {
  id: string
  title: string
  description: string
  image: string
  href: string
}

export interface Amenity {
  id: string
  icon: string
  title: string
  description: string
}

export interface HomePageContent {
  heroTitle: string
  heroSubtitle: string
  mainVideo: { src: string; poster?: string }
  contactPhone: string
  featuresTitle: string
  amenitiesTitle: string
}

export interface SiteContent {
  sliders?: Slider[]
  homepage: HomePageContent
  services: Service[]
  amenities: Amenity[]
  footer: FooterContent
  meta: MetaContent
}
```

---

## Media Paths

All media paths in `site-content.json` should point to `/public/uploads/`:

```
Correct:   "/uploads/2024/09/image.jpg"
Incorrect:  "./uploads/2024/09/image.jpg"
Incorrect:  "uploads/2024/09/image.jpg"
```

In Next.js, files in `public/` are served at the root, so `/uploads/...` resolves correctly.

---

## Editing Content

### Text Edits

Edit text directly in `data/site-content.json`:

```json
"homepage": {
  "heroTitle": "NEW TITLE TEXT HERE"
}
```

### Image/Video Replacement

1. Upload new media to `public/uploads/YYYY/MM/`
2. Update path in `site-content.json`:

```json
"services": [
  {
    "image": "/uploads/2024/09/new-image-name.jpg"
  }
]
```

### Adding New Services

```json
"services": [
  {
    "id": "new-service-id",
    "title": "NEW SERVICE",
    "description": "Service description",
    "image": "/uploads/2024/09/new-service-image.jpg",
    "href": "/new-service-page"
  }
]
```

---

## Future CMS Integration

This architecture is designed for easy migration to a headless CMS:

1. **Current**: JSON file + fs.readFileSync
2. **Next Step**: Replace `getContent()` with API calls to headless CMS (Strapi, WordPress REST, Contentful, Sanity)
3. **Admin UI**: JSON structure maps easily to form-based editors

### Migration Path

```
site-content.json → Strapi/WordPress REST API → Admin UI
```

The content structure and types are CMS-agnostic, making future migration straightforward.

---

## Caching

- Content is cached in memory after first load
- Use `clearContentCache()` if content is updated at runtime
- For production, consider ISR (Incremental Static Regeneration) with Next.js

---

## Notes

- All existing Elementor wrappers and class names are preserved
- Visual fidelity is maintained - this is content externalization only
- No frontend components were redesigned during integration
- TypeScript interfaces ensure type safety for content access