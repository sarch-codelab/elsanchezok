# Portafolio de Joseph

Portafolio de Joseph Sánchez — estudiante de 3ro de bachillerato en Informática con orientación en Programación, San Pedro Sula, Honduras. Construido con **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Motion** y **Three.js**. Tema oscuro morado (`#160b28`) con acento lila.

Vive en: **https://sarch-codelab.github.io/elsanchezok/**

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000/elsanchezok

## Compilar (export estático para GitHub Pages)

```bash
npm run build   # genera ./out
npm start       # sirve el export (no next start con output:export)
```

> Nota: `next/font/google` necesita internet. En CI funciona; en sandbox sin Google Fonts usa `NEXT_FONT_GOOGLE_MOCKED_RESPONSES` o cambia a `next/font/local` temporalmente.

## Qué editar

Todo el contenido editable está en **[`src/data/site.ts`](src/data/site.ts)**:

| Qué | Dónde |
| --- | --- |
| Nombre, apellido, rol, tagline, correo (`joseph.sanchez@iteesa.edu.hn`), ubicación (San Pedro Sula), disponibilidad | `profile` |
| Cifras del hero | `stats` |
| Texto y datos de “Sobre mí” | `about` (lead, paragraphs, facts) |
| Tecnologías por categoría | `stackGroups` |
| Proyectos (título, resumen, logros, stack, url) | `projects` |
| Línea de tiempo | `timeline` |
| Redes — GitHub: `@elSanchezok`, Instagram: `@elsanchezok` (LinkedIn no disponible) | `profile.socials` |
| Método de trabajo | `process` |

### Imágenes

- **Fondo del hero:** `public/hero-bg.webp` — el preloader espera a que cargue.
- **Retrato:** `public/joseph.webp` — ahora a **color** (se quitó el filtro `grayscale`). 920×920 WebP real (31 KB). Cambia el archivo por otro con el mismo nombre; encuadre `4/5`.
- **Firma:** `public/firma.webp` + `public/firma-tinta.webp` — versiones para fondo oscuro / claro (Joseph Sánchez).
- **EVA-01:** `public/eva-01.webp` — 524×403, WebP real. Si no te gusta la referencia, reemplázalo por otra ilustración/foto (respeta licencias).
- **OG (Open Graph):** `public/og.png` — imagen 1200×630 que aparece cuando compartes el link en WhatsApp / X / LinkedIn. Es la vista previa del sitio; actualízala si cambias nombre o tagline.

### Portadas de proyectos

`src/components/project-cover.tsx` genera patrones abstractos según `pattern` (`diagonal`, `orbit`, `grid`...). Cuando tengas capturas reales, reemplaza ese componente por `<Image />` con tus screenshots.

## Detalles técnicos

- **Tema:** morado oscuro `#160b28` + acento `#b9a6e8`. Botón `Oscuro/Claro` invierte paleta y guarda en `localStorage` (`joseph-theme`), con script anti-flash en `layout.tsx`.
- **Hero:** texto gigante “PORTAFOLIO” en lila detrás del retrato (`text-stroke-accent`, `clamp(6rem,34vw,62rem)`), veladuras y `grid-lines` sobre `hero-bg.webp`.
- **Laboratorio 3D:** nudo toroidal + malla + partículas con **Three.js** (lazy, pausa fuera de viewport, fallback estático si no hay WebGL).
- **Tipografía:** Anton (display), Instrument Serif (acentos), Archivo (texto), JetBrains Mono (meta) vía `next/font/google`.
- **Animaciones:** `Reveal` on-scroll, marquesinas CSS continuas (triplicadas para 1920+), acordeones y preview flotante. Respetan `prefers-reduced-motion`.
- **Scroll:** **Lenis** (`lerp: 0.085`) con `respectReducedMotion: true`. Preloader y menú detienen inercia (`lenis.stop()`).
- **Iconografía:** SVG propio en `src/components/icons.tsx` (sin emojis unicode).
- **Contacto:** formulario → `mailto:` a `joseph.sanchez@iteesa.edu.hn` + “Copiar correo”.
- **SEO:** `metadataBase`, OG `summary_large_image`, `canonical`, `robots`, `themeColor` adaptativo. `sitemap`/`robots.txt` vía `next-sitemap` si se añade.

## Estructura

```
src/
  app/            layout.tsx, page.tsx, globals.css
  components/     hero, about, stack, projects, timeline, lab, scene-3d, etc.
  data/site.ts    todo lo editable
public/
  joseph.webp     retrato a color
  hero-bg.webp    fondo hero
  firma*.webp     firmas
  og.png          Open Graph 1200×630
```

## Deploy

`next.config.ts` usa `output: "export"`, `basePath: "/elsanchezok"`, `images.unoptimized`. GitHub Pages está en `legacy` (branch `gh-pages`) + workflow `.github/workflows/deploy.yml` con `upload-pages-artifact`/`deploy-pages`. Cambia a `Build and deployment → GitHub Actions` en Settings para unificar.
