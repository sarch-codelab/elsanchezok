"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { basePath } from "@/data/site";

export function CapCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!finePointer) return;
    setEnabled(true);

    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY }}
      className={`pointer-events-none fixed left-0 top-0 z-[80] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="-translate-x-1/2 -translate-y-[108%] rotate-[-14deg] drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)]">
        <Image
          src={`${basePath}/gorro-graduacion.webp`}
          alt=""
          width={96}
          height={96}
          className="h-16 w-16 object-contain sm:h-20 sm:w-20"
        />
      </div>
    </motion.div>
  );
}
