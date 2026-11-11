/**
 * Todo el contenido editable del portafolio vive aquí.
 * Cambia estos datos y la página se actualiza sola.
 */

export const basePath = "/elsanchezok";

export const profile = {
  firstName: "Joseph",
  lastName: "Sánchez",
  role: "Programador en formación",
  headlineTop: "JOSEPH",
  headlineMiddle: "PROGRAMADOR",
  headlineAccent: "en formación",
  tagline:
    "Tercero de bachillerato en Informática con orientación en Programación. Diseño y construyo interfaces que se sienten simples, rápidas y bien acabadas — y cada vez más, sistemas que aprenden.",
  location: "San Pedro Sula, Honduras · Disponible en remoto",
  email: "joseph.sanchez@iteesa.edu.hn",
  availability: "Abierto a proyectos y prácticas",
  year: "2026",
  education: "3ro de bachillerato · Informática",
  orientation: "Orientación en Programación",
  socials: [
    { label: "GitHub", handle: "@elSanchezok", href: "https://github.com/elSanchezok" },
    {
      label: "Instagram",
      handle: "@elsanchezok",
      href: "https://www.instagram.com/elsanchezok",
    },
  ],
};

export const stats = [
  { value: "3+", label: "Años escribiendo código" },
  { value: "03", label: "Proyectos construidos" },
  { value: "3ro", label: "Bachillerato en Informática" },
  { value: "100%", label: "Ganas de seguir aprendiendo" },
];

export const about = {
  lead: "Aprendo construyendo. Cada proyecto es una excusa para escribir mejor código y entender un problema nuevo.",
  paragraphs: [
    "Empecé con una página estática en HTML y hoy trabajo con componentes, estado, rutas, APIs y bases de datos. Ese salto no vino de un curso, vino de romper cosas, leer errores y volver a intentarlo.",
    "Estudio tercero de bachillerato en Informática con orientación en Programación. Ahí aprendí la base: lógica, estructuras de datos, redes y bases de datos. Fuera del aula aprendo lo que el mercado pide hoy: React, Next.js, TypeScript y desarrollo web moderno.",
    "Me interesa el detalle: la jerarquía de una tipografía, la duración de una transición, el nombre de una variable. Un buen producto se nota en lo que no se ve.",
    "También la inteligencia artificial: en Portal Pilot integré asistentes con Groq API y cada proyecto me da una excusa para experimentar con LLMs, agentes y automatización.",
  ],
  facts: [
    { label: "Formación", value: "3ro de bachillerato técnico en Informática, mención Programación" },
    { label: "Enfoque", value: "Frontend con React y Next.js · Backend con Node.js · IA aplicada" },
    { label: "Herramientas", value: "TypeScript, Tailwind CSS, Git, SQL" },
    { label: "Idiomas", value: "Español nativo · Inglés técnico" },
    { label: "Gustos", value: "Evangelion · Música · Café" },
  ],
};

export const stackGroups = [
  {
    id: "frontend",
    title: "Frontend",
    description:
      "Interfaces accesibles y responsivas, escritas con componentes reutilizables y CSS moderno.",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Motion"],
  },
  {
    id: "backend",
    title: "Backend",
    description:
      "APIs REST, autenticación y lógica de servidor. Código ordenado, validado y fácil de leer.",
    items: ["Node.js", "Express", "Python", "Supabase", "APIs REST", "JWT"],
  },
  {
    id: "ia",
    title: "Inteligencia Artificial",
    description:
      "Integración de modelos de lenguaje y automatización inteligente en productos reales, no solo demos.",
    items: ["Groq API", "LLMs", "Prompt Engineering", "Telegram Bot API"],
  },
  {
    id: "datos",
    title: "Datos",
    description:
      "Modelado relacional, consultas SQL y persistencia. Datos limpios antes que pantallas bonitas.",
    items: ["SQLite", "PostgreSQL", "Prisma", "pyzbar"],
  },
  {
    id: "herramientas",
    title: "Herramientas",
    description:
      "El flujo diario: versionar, depurar, diseñar y publicar sin fricción.",
    items: ["Git", "GitHub", "VS Code", "Vercel", "Linux"],
  },
];

export type Project = {
  index: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  highlights: string[];
  stack: string[];
  pattern: "grid" | "type" | "dots" | "lines" | "diagonal" | "orbit";
  url?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Arconet",
    category: "Práctica profesional · Sitio corporativo + tienda",
    year: "2026",
    summary:
      "Proyecto de práctica escolar en Arconet, S.A., distribuidora hondureña de equipos de telecomunicaciones: sitio web corporativo y tienda en línea hechos desde cero, con catálogo de fibra óptica, CATV y satélite, portal de clientes y panel administrativo.",
    highlights: [
      "Catálogo de productos organizado por líneas de solución con carrito de compras.",
      "Portal de clientes y panel administrativo con accesos diferenciados.",
      "Secciones de empresa, soluciones por sector y formulario de contacto directo.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
    pattern: "diagonal",
    url: "https://arconethn.com",
  },
  {
    index: "02",
    title: "Portal Pilot",
    category: "SaaS · ERP + POS + IA",
    year: "2026",
    summary:
      "Plataforma web multi-empresa para negocios en Honduras: centraliza facturación electrónica SAR, inventario, contabilidad, RRHH, CRM y punto de venta en un solo portal, con asistentes de IA en la nube.",
    highlights: [
      "Más de 20 módulos de negocio adaptados a pulperías, retail, clubes de membresía y más.",
      "IA en la nube con Groq API para análisis inteligente y automatización por módulo.",
      "Control de acceso empresarial con roles granulares y verificación en dos pasos (2FA).",
      "Arquitectura multi-empresa con registro de actividad auditado por tenant.",
    ],
    stack: ["React", "Node.js", "Express", "Supabase", "Groq API", "Vercel"],
    pattern: "orbit",
    url: "https://portal-pilot.vercel.app",
  },
  {
    index: "03",
    title: "Stars System",
    category: "Control de asistencia escolar",
    year: "2025",
    summary:
      "Sistema escolar para el control de entradas y salidas de estudiantes: lectura de códigos de barras y notificaciones automáticas por Telegram cada vez que se registra un movimiento.",
    highlights: [
      "Registro de ingresos y salidas mediante escaneo de códigos de barras.",
      "Notificaciones en tiempo real al grupo de Telegram del colegio.",
      "Historial de asistencia por estudiante y por fecha.",
    ],
    stack: ["Python", "pyzbar", "Telegram Bot API", "SQLite"],
    pattern: "grid",
  },
];

export const timeline = [
  {
    year: "2023",
    title: "La primera línea",
    description:
      "Mi primer contacto real con código: HTML y CSS, una página personal y muchas dudas. Descubrí que podía crear algo desde cero.",
  },
  {
    year: "2024",
    title: "JavaScript y lógica",
    description:
      "Pasé de maquetar a programar. Funciones, arreglos, objetos, DOM y los primeros proyectos que resolvían problemas reales de mi entorno.",
  },
  {
    year: "2025",
    title: "React, Node y datos",
    description:
      "Empecé a construir aplicaciones completas: componentes, estado, APIs y bases de datos. Aprendí Git, trabajo en ramas y despliegue.",
  },
  {
    year: "2026",
    title: "Especialización y portafolio",
    description:
      "Tercero de bachillerato en Informática con orientación en Programación. Este portafolio reúne lo que sé hacer hoy y lo que quiero seguir construyendo.",
  },
  {
    year: "Próximo",
    title: "Software · Inteligencia Artificial",
    description:
      "Mi meta es estudiar Ingeniería de Software, con la Ingeniería en Inteligencia Artificial como segunda opción que me entusiasma igual. Quiero seguir construyendo productos reales y trabajar en un equipo donde se aprenda todos los días.",
  },
];

export const process = [
  {
    step: "01",
    title: "Entender",
    description:
      "Antes de escribir código hago preguntas: quién lo usa, qué necesita resolver y qué es lo mínimo que ya funciona.",
  },
  {
    step: "02",
    title: "Diseñar",
    description:
      "Defino jerarquía, flujo y sistema visual. Bocetos rápidos, decisiones simples y tipografía con intención.",
  },
  {
    step: "03",
    title: "Construir",
    description:
      "Código tipado, componentes chicos y commits claros. Si algo se rompe, el error se lee antes de buscar la solución.",
  },
  {
    step: "04",
    title: "Entregar",
    description:
      "Pruebo en distintos tamaños de pantalla, optimizo, documento y dejo el proyecto listo para que otra persona lo mantenga.",
  },
];

export const navLinks = [
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Stack", href: "#stack" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Trayectoria", href: "#trayectoria" },
  { label: "Lab 3D", href: "#laboratorio" },
  { label: "Contacto", href: "#contacto" },
];
