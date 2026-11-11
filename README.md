# Portafolio de Joseph

Portafolio personal en blanco y negro, construido con Next.js 16 (App Router), TypeScript, Tailwind CSS v4 y Motion. Pensado para un estudiante de tercero de bachillerato en Informática con orientación en Programación.

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Compilar

```bash
npm run build
npm start
```

## Qué editar

Casi todo el contenido vive en un solo archivo: [`src/data/site.ts`](src/data/site.ts).

| Qué | Dónde |
| --- | --- |
| Nombre, rol, frase, correo, disponibilidad | `profile` |
| Cifras del hero | `stats` |
| Texto y datos de "Sobre mí" | `about` |
| Tecnologías por categoría | `stackGroups` |
| Proyectos (título, resumen, logros, stack) | `projects` |
| Línea de tiempo | `timeline` |
| Redes (Instagram ya apunta a @elsanchezok) | `profile.socials` |
| Método de trabajo | `process` |

### Cambios obligatorios antes de publicar

- `profile.email` — hoy es `hola@joseph.dev`, un marcador de posición.
- `profile.socials` — Instagram ya está configurado; GitHub y LinkedIn siguen siendo marcadores de posición.
- Las cifras y fechas de `stats` y `timeline` deben reflejar la realidad.

### Imágenes

- **Fondo del hero:** `public/hero-bg.webp`. Es la primera imagen que carga la página: el preloader espera a que esté lista antes de mostrar las animaciones.
- **Retrato:** `public/joseph.webp` (blanco y negro). Para cambiarlo, guarda otra imagen con el mismo nombre; el encuadre es `4/5` y usa escala de grises desde CSS.
- **Firma:** dos versiones de la misma firma (Joseph Sánchez). `public/firma.webp` es la cromada para fondos oscuros y aparece en el preloader y al cierre de Contacto; `public/firma-tinta.webp` es la invertida para papel y firma el final de "Sobre mí". Ambas salen del archivo original con el fondo transparente recortado.

### Portadas de proyectos

No hay capturas reales: las portadas son patrones abstractos generados con CSS en [`project-cover.tsx`](src/components/project-cover.tsx). Cada proyecto tiene un `pattern` (`grid`, `type`, `dots`, `lines`, `diagonal`, `orbit`). Cuando tengas imágenes reales, reemplaza ese componente por `<Image />`.

## Detalles técnicos

- **Tema:** blanco y negro puro con un botón que invierte toda la paleta (`Oscuro` / `Claro`). Se guarda en `localStorage`.
- **Fondo del hero:** imagen a sangre completa con veladuras; el bloque es siempre oscuro y la navegación se aclara mientras está encima.
- **Laboratorio 3D:** escultura WebGL en blanco y negro (Three.js) con nudo toroidal, malla exterior y partículas. Se importa bajo demanda cuando la sección se acerca al viewport, se pausa fuera de pantalla y se puede arrastrar con el puntero o el dedo. Antes de cargar Three.js comprueba si hay WebGL: si el navegador no lo expone, muestra una vista estática en malla (y el distintivo pasa a "Estático") en lugar de dejar un hueco o un error en consola.
- **Tipografía:** Anton (display), Instrument Serif (acentos), Archivo (texto) y JetBrains Mono (etiquetas), vía `next/font`.
- **Animaciones:** reveals al hacer scroll, marquesinas CSS, acordeones y vista previa flotante de proyectos. Se ejecutan siempre, incluso con la opción de sistema "reducir movimiento" activada (decisión explícita del proyecto).
- **Scroll suave:** Lenis con inercia (`lerp: 0.085`, rueda suave y enlaces internos animados). También funciona con "reducir movimiento" activado (`respectReducedMotion: false`). El menú móvil y el preloader detienen la inercia mientras están abiertos.
- **Accesibilidad:** secciones semánticas, `aria-expanded` en acordeones, foco visible y formulario con etiquetas.
- **Contacto:** el formulario arma un `mailto:`; no requiere backend. El botón "Copiar correo" usa el portapapeles.
- **Grano y rejilla:** superposiciones decorativas en CSS, sin imágenes.

## Estructura

```
src/
  app/            layout, página y estilos globales
  components/     secciones, scroll suave y piezas de interfaz
  data/site.ts    contenido editable
public/
  joseph.webp     retrato
  hero-bg.webp    fondo del hero
  firma.webp      firma cromada (fondos oscuros)
  firma-tinta.webp firma invertida (papel)
```
