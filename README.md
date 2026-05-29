# Manzana40 - Proyecto Next.js

## Descripción

Manzana40 es un sitio web premium de una plaza empresarial ubicado en Bolivia. El proyecto es una migración desde WordPress/Elementor a Next.js, manteniendo la fidelidad visual del sitio original mientras se mejora el rendimiento y la arquitectura.

**Dominio actual:** manzana40.com
**Stack:** Next.js 14, Prisma, SQLite, React 18

---

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API Routes
│   │   │   ├── agenda-visita/  # Formulario de contacto
│   │   │   ├── auth/           # Autenticación admin
│   │   │   ├── content/        # CMS API (homepage, nosotros, etc.)
│   │   │   ├── media/          # Gestión de medios
│   │   │   └── upload/         # Subida de archivos
│   │   ├── admin/              # Panel de administración CMS
│   │   │   ├── homepage/       # Gestionar homepage
│   │   │   ├── nosotros/       # Gestionar página nosotros
│   │   │   ├── oficinas/       # Gestionar oficinas
│   │   │   └── login/          # Login admin
│   │   ├── agendar-tu-visita/  # Página formulario
│   │   ├── amenidades/         # Página amenities
│   │   ├── boca/               # Página BOCA MIXTURA
│   │   ├── centro-de-negocios/ # Página centro de negocios
│   │   ├── hub-40/             # Página HUB 40
│   │   ├── oficinas/           # Página de oficinas
│   │   ├── nosotros/           # Página nosotros
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Layout principal
│   │   └── globals.css         # Estilos globales
│   ├── components/             # Componentes React
│   │   ├── admin/              # Componentes del admin
│   │   │   ├── AdminSection.tsx
│   │   │   ├── AdminTextEditor.tsx
│   │   │   ├── AdminMediaPicker.tsx
│   │   │   └── MediaUploader.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── HomepageEditorials.tsx
│   │   ├── HomePhoneCTA.tsx
│   │   ├── PageHero.tsx
│   │   ├── DatabaseHero.tsx
│   │   ├── DatabaseServices.tsx
│   │   ├── DatabaseAmenities.tsx
│   │   ├── ContentWithImage.tsx
│   │   ├── ContentBlock.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── FeaturesSectionClient.tsx
│   │   ├── Modal.tsx
│   │   ├── EfficiencyModal.tsx
│   │   ├── MediaDisplay.tsx
│   │   └── ContentContext.tsx
│   ├── lib/                    # Utilidades
│   │   ├── prisma.ts           # Cliente Prisma
│   │   ├── content.ts          # Loader de contenido
│   │   ├── admin-auth.ts       # Auth admin
│   │   └── auth.ts             # Configuración NextAuth
│   ├── cms/                    # Lógica CMS
│   │   └── content.ts
│   ├── types/                  # Tipos TypeScript
│   │   └── next-auth.d.ts
│   └── app/                    # Archivos de estilos
│       ├── homepage-desktop.css # Estilos desktop
│       └── homepage-responsive.css # Estilos responsive
├── prisma/
│   ├── schema.prisma           # Esquema de base de datos
│   └── seed.ts                 # Datos iniciales
├── public/
│   ├── uploads/                # Medios subidos
│   │   ├── 2024/09/           # Assets de 2024
│   │   └── elementor/          # CSS de Elementor
│   └── wp-content/             # Assets de WordPress
├── scripts/                    # Scripts de utilidad
│   ├── seed-editorial.ts
│   └── register-editorial-media.ts
├── docs/                       # Documentación
│   ├── ARCHITECTURE.md
│   ├── STATUS.md
│   └── GIT_WORKFLOW.md
├── data/                       # Contenido estático (fallback)
├── package.json
├── next.config.js
├── tsconfig.json
└── .env                        # Variables de entorno
```

---

## Modelos de Base de Datos (Prisma)

### Modelos Principales

| Modelo | Descripción |
|--------|-------------|
| `AdminUser` | Usuarios administradores del CMS |
| `Hero` | Hero slides/videos por página |
| `Service` | Servicios (oficinas, hub-40, boca, etc.) |
| `Amenity` | Amenidades (LEED, seguridad, climatización, etc.) |
| `ContentBlock` | Bloques de contenido dinámicos |
| `Feature` | Características/íconos |
| `SiteMeta` | Metadatos del sitio |
| `FooterContent` | Contenido del footer |
| `Media` | Archivos multimedia subidos |
| `EfficiencyItem` | Items de eficiencia |
| `HomepageEditorial` | Secciones editoriales del homepage |

---

## Rutas de la Aplicación

### Páginas Públicas

| Ruta | Descripción |
|------|-------------|
| `/` | Homepage |
| `/nosotros` | Página nosotros |
| `/oficinas` | Listado de oficinas |
| `/hub-40` | Sección HUB 40 Co-Work |
| `/boca` | Boulevard Gastronómico |
| `/centro-de-negocios` | Centro de negocios |
| `/amenidades` | Amenidades del edificio |
| `/agenda-tu-visita` | Formulario de visita |

### Panel Admin

| Ruta | Descripción |
|------|-------------|
| `/admin` | Dashboard admin |
| `/admin/homepage` | Gestionar homepage |
| `/admin/nosotros` | Gestionar página nosotros |
| `/admin/oficinas` | Gestionar secciones oficinas |
| `/admin/login` | Login administrador |

### API Routes

| Ruta | Método | Descripción |
|------|--------|-------------|
| `/api/content` | GET, POST | Listar/crear contenido |
| `/api/content/homepage` | GET | Contenido homepage |
| `/api/content/homepage-editorial` | GET, POST, PUT, DELETE | Secciones editoriales |
| `/api/content/nosotros` | GET | Contenido nosotros |
| `/api/content/amenities` | GET | Amenidades |
| `/api/content/services` | GET | Servicios |
| `/api/content/efficiency` | GET | Items de eficiencia |
| `/api/content/[slug]` | GET | Contenido dinámico |
| `/api/media` | GET, POST | Gestión de medios |
| `/api/agenda-visita` | POST |提交 formulario de visita |
| `/api/auth/login` | POST | Login admin |
| `/api/upload` | POST | Subir archivos |

---

## Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo

# Build
npm run build        # Build de producción
npm run start        # Iniciar servidor de producción

# Base de datos
npm run db:push      # Push schema a DB
npm run db:seed      # Sembrar datos iniciales
npm run db:studio    # Abrir Prisma Studio

# Linting
npm run lint         # Verificar código
```

---

## Variables de Entorno (.env)

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="tu-secret-aqui"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

---

## Estructura de Contenido CMS

### Homepage Editorial Sections

El homepage tiene dos secciones editoriales CMS:

1. **Lifestyle** (`type: "lifestyle"`)
   - `title`: Título principal
   - `paragraph`: Texto descriptivo
   - `image`: Imagen principal
   - `active`: Visibilidad

2. **Community** (`type: "community"`)
   - `title`: Título
   - `paragraph`: Descripción
   - `images`: Array JSON de imágenes (3 imágenes)

---

## Deployment

### Opción 1: Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Deploy producción
vercel --prod
```

### Opción 2: Railway + Vercel

- **Backend (DB + API):** Railway
- **Frontend:** Vercel

### Opción 3: GoDaddy con Node.js

1. Build local: `npm run build`
2. Subir `.next/` y `node_modules/`
3. En cPanel → Setup Node.js App
4. Apuntar a `server.js` o usar `npm start`

### Dominio Personalizado

Para usar `manzana40.com`:

1. **Vercel:**
   - Conectar repo de GitHub
   - Añadir dominio en Settings → Domains
   - Actualizar DNS en GoDaddy:
     - CNAME: `www` → `cname.vercel-dns.com`
     - A record: `@` → IP de Vercel (o usar Alias)

2. **GoDaddy DNS:**
   ```
   Type    Name    Value
   CNAME   www     cname.vercel-dns.com
   CNAME   @       cname.vercel-dns.com
   ```

---

## Diseño Visual

### Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Negro | `#1B191A` | Fondo principal |
| Gris claro | `#D3D3CD` | Texto secundario |
| Azul grisáceo | `#A4BDC1` | Acentos, títulos |
| Amarillo | `#FFCD00` | Banner amarillo |
| Blanco | `#FFFFFF` | Texto sobre oscuro |

### Tipografía

- **Poppins** - Títulos y cuerpo
- **Roboto** - Headings específicos

### Breakpoints Responsive

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px
- Mobile pequeño: < 480px

---

## Flujo de Trabajo Git

```bash
# Crear branch para feature
git checkout -b feat/nueva-funcionalidad

# Hacer cambios y commit
git add .
git commit -m "descripción del cambio"

# Push
git push origin feat/nueva-funcionalidad

# Merge a main (via PR en GitHub)
```

Ramas principales:
- `main` - Producción (protegida)
- `feat/admin-cms-system` - Feature actual de CMS admin

---

## Características Técnicas

### Server Components vs Client Components

- **Server Components:** Pages principales (homepage, nosotros, etc.)
- **Client Components:** Componentes interactivos (Header, Footer, modales)

### Static Fallback

El sitio usa fallback estático cuando la API no está disponible:
- Contenido definido en `STATIC_FALLBACK` en `page.tsx`
- Media queries en CSS respetan diseño desktop primero

### Estructura CSS

1. `globals.css` - Estilos base + componentes nuevos
2. `homepage-desktop.css` - Estilos desktop preserved
3. `homepage-responsive.css` - Overrides responsive SOLO para homepage

---

## Estado del Proyecto

### Completado ✅
- Migración completa de Elementor a React
- CMS admin funcional
- Homepage editorial sections
- Agenda tu Visita con validación
- Formulario de contacto con honeypot anti-spam
- Responsive mobile/tablet

### En Progreso 🔄
- Testing de responsive en todas las páginas
- Ajuste fino de espaciados

### Pendiente 📋
- Deployment a producción
- Configurar dominio personalizado
- SSL certificate
- Backup de base de datos

---

## Contacto

- **Sitio:** https://manzana40.com
- **Desarrollo actual:** Feature branch `feat/admin-cms-system`

---

## Notas Importantes

1. **No modificar CSS global** sin entender el impacto en desktop
2. **Responsive SOLO** en `homepage-responsive.css`
3. **Fallback estático** siempre disponible para resiliencia
4. **Build debe pasar** antes de cada commit
5. **Git push** después de cada sesión de trabajo
