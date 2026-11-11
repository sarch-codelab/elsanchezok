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
  authors: [{ name: "Joseph" }],
  openGraph: {
    title: "Joseph — Programador en formación",
    description:
      "Diseño y construyo interfaces que se sienten simples, rápidas y bien acabadas.",
    type: "website",
    locale: "es_ES",
  },
};

export const viewport: Viewport = {
  themeColor: "#f1efea",
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
      <body className="grain bg-paper text-ink antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
