"use client";

import { useEffect, useState } from "react";

const THEME_EVENT = "joseph-theme-change";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [inverted, setInverted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const sync = () =>
      setInverted(document.documentElement.classList.contains("inverted"));

    const saved = window.localStorage.getItem("joseph-theme");
    const next = saved === "invert";
    document.documentElement.classList.toggle("inverted", next);
    sync();
    setMounted(true);

    window.addEventListener(THEME_EVENT, sync);
    return () => window.removeEventListener(THEME_EVENT, sync);
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("inverted");
    document.documentElement.classList.toggle("inverted", next);
    window.localStorage.setItem("joseph-theme", next ? "invert" : "paper");
    setInverted(next);
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={inverted}
      aria-label={inverted ? "Cambiar a fondo claro" : "Cambiar a fondo oscuro"}
      title={inverted ? "Cambiar a fondo claro" : "Cambiar a fondo oscuro"}
      className={`group flex items-center gap-2 border border-line px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:border-ink ${className}`}
    >
      <span
        aria-hidden
        className="relative grid size-4 place-items-center rounded-full border border-ink"
      >
        <span
          className={`absolute inset-[2px] rounded-full bg-ink transition-transform duration-500 ${
            mounted && inverted ? "translate-x-[3px]" : "-translate-x-[3px]"
          }`}
        />
      </span>
      <span className="hidden sm:inline">{inverted ? "Claro" : "Oscuro"}</span>
    </button>
  );
}
