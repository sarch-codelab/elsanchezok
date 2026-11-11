"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { SmoothScroll } from "./smooth-scroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    // "never": la página anima siempre, aunque el sistema pida reducir movimiento.
    <MotionConfig reducedMotion="never">
      <SmoothScroll>{children}</SmoothScroll>
    </MotionConfig>
  );
}
