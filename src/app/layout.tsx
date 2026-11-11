import type { Metadata, Viewport } from "next";
import { Anton, Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sarch-codelab.github.io/elsanchezok"),
  title: "Joseph — Programador en formación",
  description:
    "Portafolio de Joseph, estudiante de tercero de bachillerato en Informática con orientación en Programación. Desarrollo web, interfaces y APIs.",
  keywords: [
    "Joseph",
    "portafolio",
    "desarrollador web",
    "programador",
    "bachillerato en informática",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Joseph Sánchez" }],
  openGraph: {
    title: "Joseph — Programador en formación",
    description:
      "Diseño y construyo interfaces que se sienten simples, rápidas y bien acabadas.",
    type: "website",
    locale: "es_ES",
    url: "https://sarch-codelab.github.io/elsanchezok/",
    images: [
      {
        url: "/elsanchezok/og.png",
        width: 1200,
        height: 630,
        alt: "Joseph — Programador en formación",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph — Programador en formación",
    description:
      "Diseño y construyo interfaces que se sienten simples, rápidas y bien acabadas.",
    images: ["/elsanchezok/og.png"],
  },
  alternates: {
    canonical: "https://sarch-codelab.github.io/elsanchezok/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1efea" },
    { media: "(prefers-color-scheme: dark)", color: "#160b28" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${anton.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* Sin JS: ocultar preloader y mostrar contenido que depende de Reveal */}
        <noscript>
          <style>{`[data-preloader-active]{display:none !important} [style*="opacity: 0"]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        {/* Evitar flash de tema: aplicar guardado antes del primer paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=localStorage.getItem('joseph-theme');if(s==='invert')document.documentElement.classList.add('inverted')}catch(e){}`,
          }}
        />
      </head>
      <body className="grain bg-paper text-ink antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
