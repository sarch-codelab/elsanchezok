"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/site";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // No pisar el bloqueo del preloader.
    if (document.body.dataset.preloader === "active") return;
    document.body.style.overflow = open ? "hidden" : "";
    if (lenis) {
      if (open) lenis.stop();
      else lenis.start();
    }
    return () => {
      if (document.body.dataset.preloader === "active") return;
      document.body.style.overflow = "";
    };
  }, [open, lenis]);

  // Cerrar menú móvil con Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-paper/85 backdrop-blur-md"
            : "nav-light border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1500px] items-center justify-between gap-4 px-5 sm:px-8">
          <a
            href="#inicio"
            className="group flex items-baseline gap-2"
            aria-label="Ir al inicio"
          >
            <span className="display text-2xl leading-none tracking-tight">
              Joseph
            </span>
            <span className="meta text-muted transition-colors group-hover:text-ink">
              ®
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Secciones">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`meta link-line transition-colors ${
                  active === link.href ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a href="#contacto" className="btn btn-filled hidden !py-2.5 sm:inline-flex">
              Hablemos
              <span aria-hidden>↗</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="meta flex items-center gap-2 border border-line px-3 py-2 lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
            >
              Menú
              <span aria-hidden className="flex flex-col gap-[3px]">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="fixed inset-0 z-[80] flex flex-col bg-paper px-5 pb-8 pt-5 sm:px-8"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="display text-2xl">Joseph</span>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="meta flex items-center gap-2 border border-line px-3 py-2"
                >
                  Cerrar <span aria-hidden>✕</span>
                </button>
              </div>
            </div>

            <nav
              className="mt-12 flex flex-1 flex-col justify-center gap-2"
              aria-label="Menú móvil"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline justify-between border-b border-line py-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                >
                  <span className="display text-[clamp(2.4rem,11vw,4rem)]">
                    {link.label}
                  </span>
                  <span className="meta text-muted">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>

            <div className="meta flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 text-muted">
              <a href={`mailto:${profile.email}`} className="link-line text-ink">
                {profile.email}
              </a>
              <span>{profile.availability}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
