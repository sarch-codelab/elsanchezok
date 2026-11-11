/**
 * Todo el contenido editable del portafolio vive aquí.
 * Cambia estos datos y la página se actualiza sola.
 */

export const profile = {
  firstName: "Joseph",
  lastName: "",
  role: "Programador en formación",
  headlineTop: "JOSEPH",
  headlineMiddle: "PROGRAMADOR",
  headlineAccent: "en formación",
  tagline:
    "Tercero de bachillerato en Informática con orientación en Programación. Diseño y construyo interfaces que se sienten simples, rápidas y bien acabadas.",
  location: "Disponible en remoto",
  email: "hola@joseph.dev",
  availability: "Abierto a proyectos y prácticas",
  year: "2026",
  education: "3ro de bachillerato · Informática",
  orientation: "Orientación en Programación",
  socials: [
    { label: "GitHub", handle: "@joseph", href: "https://github.com/" },
    { label: "LinkedIn", handle: "/in/joseph", href: "https://www.linkedin.com/" },
    {
      label: "Instagram",
      handle: "@elsanchezok",
      href: "https://www.instagram.com/elsanchezok",
    },
  ],
};

export const stats = [
  { value: "3+", label: "Años escribiendo código" },
  { value: "06", label: "Proyectos construidos" },
  { value: "3ro", label: "Bachillerato en Informática" },
  { value: "100%", label: "Ganas de seguir aprendiendo" },
];

export const about = {
  lead: "Aprendo construyendo. Cada proyecto es una excusa para escribir mejor código y entender un problema nuevo.",
  paragraphs: [
    "Empecé con una página estática en HTML y hoy trabajo con componentes, estado, rutas, APIs y bases de datos. Ese salto no vino de un curso, vino de romper cosas, leer errores y volver a intentarlo.",
    "Estudio tercero de bachillerato en Informática con orientación en Programación. Ahí aprendí la base: lógica, estructuras de datos, redes y bases de datos. Fuera del aula aprendo lo que el mercado pide hoy: React, Next.js, TypeScript y desarrollo web moderno.",
    "Me interesa el detalle: la jerarquía de una tipografía, la duración de una transición, el nombre de una variable. Un buen producto se nota en lo que no se ve.",
  ],
  facts: [
    { label: "Formación", value: "3ro de bachillerato técnico en Informática, mención Programación" },
    { label: "Enfoque", value: "Frontend con React y Next.js · Backend con Node.js" },
    { label: "Herramientas", value: "TypeScript, Tailwind CSS, Git, SQL" },
    { label: "Idiomas", value: "Español nativo · Inglés técnico" },
  ],
};

export const stackGroups = [
  {
    id: "frontend",
    title: "Frontend",
    description:
      "Interfaces accesibles y responsivas, escritas con componentes reutilizables y CSS moderno.",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "backend",
    title: "Backend",
    description:
      "APIs REST, autenticación y lógica de servidor. Código ordenado, validado y fácil de leer.",
    items: ["Node.js", "Express", "Python", "Java", "APIs REST", "JWT"],
  },
  {
    id: "datos",
    title: "Datos",
    description:
      "Modelado relacional, consultas SQL y persistencia. Datos limpios antes que pantallas bonitas.",
    items: ["MySQL", "PostgreSQL", "SQL", "MongoDB", "Prisma"],
  },
  {
    id: "herramientas",
    title: "Herramientas",
    description:
      "El flujo diario: versionar, depurar, diseñar y publicar sin fricción.",
    items: ["Git", "GitHub", "VS Code", "Figma", "Linux", "Vercel", "Postman"],
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
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Nexo",
    category: "Sistema de gestión escolar",
    year: "2026",
    summary:
      "Plataforma para que un centro educativo administre estudiantes, calificaciones y asistencia desde un solo panel, con roles de profesor y administrador.",
    highlights: [
      "Autenticación con sesiones y permisos por rol.",
      "Reportes de calificaciones exportables y vista de asistencia por curso.",
      "Interfaz responsive pensada para usarse desde el teléfono.",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    pattern: "grid",
  },
  {
    index: "02",
    title: "Pulso",
    category: "Panel de finanzas personales",
    year: "2025",
    summary:
      "Aplicación para registrar ingresos y gastos, visualizar categorías y entender en qué se va el dinero cada mes.",
    highlights: [
      "Gráficos interactivos de flujo mensual y categorías.",
      "Filtros por rango de fechas con estado sincronizado en la URL.",
      "Persistencia local y exportación a CSV.",
    ],
    stack: ["React", "Chart.js", "Vite", "CSS Modules"],
    pattern: "lines",
  },
  {
    index: "03",
    title: "Atlas",
    category: "API REST de biblioteca",
    year: "2025",
    summary:
      "Backend para gestionar libros, socios y préstamos, con validaciones, documentación y pruebas de los endpoints principales.",
    highlights: [
      "CRUD completo con validación de datos en el servidor.",
      "Modelo relacional con préstamos, devoluciones y stock.",
      "Documentación de endpoints lista para consumir.",
    ],
    stack: ["Node.js", "Express", "MySQL", "JWT"],
    pattern: "dots",
  },
  {
    index: "04",
    title: "Marea",
    category: "Tienda online de streetwear",
    year: "2025",
    summary:
      "Catálogo de ropa con carrito persistente, filtros por talla y un checkout simple, todo con una identidad visual fuerte.",
    highlights: [
      "Carrito con persistencia y cálculo de totales.",
      "Filtros por categoría y talla sin recargar la página.",
      "Animaciones de transición entre vistas.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
    pattern: "diagonal",
  },
  {
    index: "05",
    title: "Byte",
    category: "Bot para la comunidad del colegio",
    year: "2024",
    summary:
      "Bot de Discord que organiza recordatorios de tareas, avisos de exámenes y comandos de utilidad para compañeros de clase.",
    highlights: [
      "Sistema de recordatorios programados por fecha.",
      "Comandos slash con respuestas embebidas.",
      "Desplegado y usado por más de 80 estudiantes.",
    ],
    stack: ["Python", "discord.py", "SQLite"],
    pattern: "orbit",
  },
  {
    index: "06",
    title: "Sombra",
    category: "Estudio de interfaz musical",
    year: "2024",
    summary:
      "Ejercicio de diseño y código: reconstruir un reproductor de música cuidando tipografía, espaciado y microinteracciones.",
    highlights: [
      "Reproductor funcional con barra de progreso y cola.",
      "Animaciones fluidas con respeto a prefers-reduced-motion.",
      "Sistema de diseño en variables CSS.",
    ],
    stack: ["React", "Framer Motion", "CSS"],
    pattern: "type",
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
    title: "Ingeniería de Software",
    description:
      "Mi meta es estudiar Ingeniería de Software, seguir construyendo productos reales y trabajar en un equipo donde se aprenda todos los días.",
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
