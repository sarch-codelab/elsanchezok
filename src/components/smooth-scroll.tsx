"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import type { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        autoRaf: true,
        // Igual que las animaciones: el scroll suave se mantiene aunque el
        // sistema tenga activada la opción de reducir movimiento.
        respectReducedMotion: false,
        // Los enlaces internos se desplazan con la misma inercia. El margen
        // de las secciones (scroll-mt-20) ya compensa el nav fijo.
        anchors: true,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
