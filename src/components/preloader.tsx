"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { basePath } from "@/data/site";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    let timer = 0;
    // Red de seguridad: nunca dejar la portada bloqueada por la intro.
    timer = window.setTimeout(() => setDone(true), 5000);

    // El fondo del hero se precarga antes de cerrar la intro.
    const image = new window.Image();
    const imageReady = new Promise<void>((resolve) => {
      image.onload = () => resolve();
      image.onerror = () => resolve();
      image.src = `${basePath}/hero-bg.webp`;
      if (image.complete) resolve();
    });

    const start = performance.now();
    const duration = 1100;

    const tick = (now: number) => {
      if (cancelled) return;
      const ratio = Math.min((now - start) / duration, 1);
      setProgress(Math.round(ratio * 100));

      if (ratio < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      imageReady.then(() => {
        if (cancelled) return;
        window.clearTimeout(timer);
        timer = window.setTimeout(() => setDone(true), 200);
      });
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    if (lenis) {
      if (done) lenis.start();
      else lenis.stop();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [done, lenis]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-5 text-paper sm:p-8"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="meta flex items-center justify-between opacity-70">
            <span>Joseph — Portafolio</span>
            <span>{new Date().getFullYear()}</span>
          </div>

          {/* La firma es lo primero que se ve: aparece desde el negro mientras
              el contador avanza por debajo. */}
          <motion.div
            className="flex flex-1 items-center justify-center"
            initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={`${basePath}/firma.webp`}
              alt="Firma de Joseph"
              width={1400}
              height={519}
              priority
              sizes="(max-width: 640px) 58vw, 30rem"
              className="pointer-events-none h-auto w-[clamp(14rem,52vw,30rem)] select-none"
            />
          </motion.div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="meta mb-3 opacity-60">Cargando</p>
              <p className="display text-[clamp(4rem,18vw,13rem)] leading-[0.8]">
                {String(progress).padStart(3, "0")}
              </p>
            </div>
            <p className="serif-italic hidden pb-4 text-2xl opacity-70 sm:block">
              blanco y negro
            </p>
          </div>

          <div className="h-px w-full bg-paper/20">
            <motion.div
              className="h-px bg-paper"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.15, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
