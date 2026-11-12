"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = " ·:;+*?%#WM@█";
const FONT_FAMILY = "var(--font-jb), ui-monospace, SFMono-Regular, Menlo, monospace";

type Cell = { ch: string; r: number; g: number; b: number; lum: number };

export function AsciiPortrait({
  src,
  alt,
  sizes,
  priority = true,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const gridRef = useRef<{ cols: number; rows: number; cells: Cell[] } | null>(null);
  const [hovered, setHovered] = useState(false);
  const [ready, setReady] = useState(false);
  const [touched, setTouched] = useState(false);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });
  const rafIdRef = useRef<number | null>(null);

  const isActive = hovered || touched;

  const buildGrid = useCallback(() => {
    const img = imgRef.current;
    const wrap = wrapRef.current;
    if (!img || !wrap || !img.complete || img.naturalWidth === 0) return;

    const w = wrap.clientWidth;
    const cols = w < 400 ? 64 : w < 520 ? 72 : 88;
    const containerAspect = 4 / 5;
    const charAspect = 0.58;
    const rows = Math.round((cols * containerAspect) / charAspect);

    const tmp = document.createElement("canvas");
    tmp.width = cols;
    tmp.height = rows;
    const tctx = tmp.getContext("2d", { willReadFrequently: true });
    if (!tctx) return;

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cols / iw, rows / ih);
    const sw = cols / scale;
    const sh = rows / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;
    tctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);

    const data = tctx.getImageData(0, 0, cols, rows).data;
    const cells: Cell[] = [];
    for (let i = 0; i < cols * rows; i++) {
      const r = data[i * 4];
      const g = data[i * 4 + 1];
      const b = data[i * 4 + 2];
      const a = data[i * 4 + 3];
      if (a < 10) {
        cells.push({ ch: " ", r: 0, g: 0, b: 0, lum: 0 });
        continue;
      }
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const idx = Math.min(CHARS.length - 1, Math.floor((lum / 255) * (CHARS.length - 1)));
      cells.push({ ch: CHARS[idx], r, g, b, lum });
    }
    gridRef.current = { cols, rows, cells };
    setReady(true);
  }, []);

  const render = useCallback(() => {
    const grid = gridRef.current;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!grid || !canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = Math.round(rect.width * dpr);
    const H = Math.round(rect.height * dpr);
    if (canvas.width !== W || canvas.height !== H) {
      canvas.width = W;
      canvas.height = H;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { cols, rows, cells } = grid;
    const cellW = W / cols;
    const cellH = H / rows;

    // Fondo TRANSPARENTE — no tapa la foto. Solo la lupa ASCII se dibuja.
    ctx.clearRect(0, 0, W, H);

    if (!isActive || !pointerRef.current.active) return;

    const px = pointerRef.current.x;
    const py = pointerRef.current.y;

    // Radios de la lupa (en coordenadas normalizadas 0..1)
    const inner = 0.15; // núcleo nítido
    const outer = 0.26; // borde difuminado
    // compensación de aspecto para que el círculo no salga ovalado
    const aspectK = rect.width / rect.height;

    ctx.font = `${Math.round(cellH * 0.82)}px ${FONT_FAMILY}`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    // 1) velo oscuro solo dentro de la lupa para que el ASCII se lea sobre la foto
    // lo dibujamos como rects por celda con degradado radial suave
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const nx = x / cols;
        const ny = y / rows;
        const dx = (nx - px) * aspectK;
        const dy = ny - py;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > outer) continue;
        // falloff suave
        const t = d <= inner ? 1 : 1 - (d - inner) / (outer - inner);
        const eased = t * t * (3 - 2 * t); // smoothstep
        if (eased < 0.02) continue;
        // velo: oscuro pero no negro puro, deja ver silueta
        ctx.fillStyle = `rgba(13,10,20,${0.72 * eased})`;
        ctx.fillRect(Math.floor(x * cellW), Math.floor(y * cellH), Math.ceil(cellW + 0.5), Math.ceil(cellH + 0.5));
      }
    }

    // 2) caracteres ASCII solo dentro de la lupa
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x;
        const c = cells[i];
        if (c.ch === " " || c.lum < 6) continue;

        const nx = x / cols;
        const ny = y / rows;
        const dx = (nx - px) * aspectK;
        const dy = ny - py;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > outer) continue;

        const t = d <= inner ? 1 : 1 - (d - inner) / (outer - inner);
        const eased = t * t * (3 - 2 * t);
        if (eased < 0.05) continue;

        const cx = (x + 0.5) * cellW;
        const cy = (y + 0.5) * cellH;

        // color: mezcla tono original hacia paleta clara para legibilidad sobre velo
        const lumT = c.lum / 255;
        let r = Math.round(c.r * 0.28 + 241 * 0.72 * (0.35 + 0.65 * lumT));
        let g = Math.round(c.g * 0.28 + 239 * 0.72 * (0.35 + 0.65 * lumT));
        let b = Math.round(c.b * 0.28 + 245 * 0.72 * (0.35 + 0.65 * lumT));

        // realce en el centro de la lupa
        if (eased > 0.75) {
          const boost = (eased - 0.75) / 0.25;
          r = Math.min(255, Math.round(r + (255 - r) * boost * 0.35));
          g = Math.min(255, Math.round(g + (255 - g) * boost * 0.35));
          b = Math.min(255, Math.round(b + (255 - b) * boost * 0.35));
        }

        const alpha = eased * (0.78 + lumT * 0.22);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;

        // brillo sutil en núcleo
        if (eased > 0.85 && lumT > 0.4) {
          ctx.shadowColor = `rgba(${r},${g},${b},${0.28 * eased})`;
          ctx.shadowBlur = cellH * 0.6;
        } else {
          ctx.shadowBlur = 0;
        }

        let ch = c.ch;
        // flicker muy sutil solo dentro de la lupa
        if (Math.random() < 0.003 * eased && lumT > 0.25 && lumT < 0.85) {
          const n = CHARS[Math.floor(Math.random() * CHARS.length)];
          if (n.trim()) ch = n;
        }

        ctx.fillText(ch, cx, cy);
      }
    }
    ctx.shadowBlur = 0;

    // 3) anillo de la lupa
    const cxPix = px * W;
    const cyPix = py * H;
    // radio en píxeles (promedio de inner/outer)
    const rInner = inner * Math.min(W, H * aspectK) * 1.55;
    const rOuter = outer * Math.min(W, H * aspectK) * 1.55;

    ctx.strokeStyle = "rgba(241,239,234,0.9)";
    ctx.lineWidth = 1.2 * dpr;
    ctx.beginPath();
    ctx.arc(cxPix, cyPix, rInner, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(185,166,232,0.55)";
    ctx.lineWidth = 1 * dpr;
    ctx.setLineDash([6 * dpr, 6 * dpr]);
    ctx.beginPath();
    ctx.arc(cxPix, cyPix, rOuter, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // puntito central
    ctx.fillStyle = "rgba(241,239,234,0.95)";
    ctx.beginPath();
    ctx.arc(cxPix, cyPix, 2 * dpr, 0, Math.PI * 2);
    ctx.fill();
  }, [isActive]);

  // loop solo activo — 60fps suave pero limitado
  useEffect(() => {
    if (!ready || !isActive) {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      // limpia cuando sale
      const canvas = canvasRef.current;
      const ctxNow = canvas?.getContext("2d");
      if (canvas && ctxNow) ctxNow.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    let running = true;
    const tick = () => {
      if (!running) return;
      render();
      rafIdRef.current = window.requestAnimationFrame(tick);
    };
    rafIdRef.current = window.requestAnimationFrame(tick);
    return () => {
      running = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [ready, isActive, render]);

  // primera medida
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const onLoad = () => buildGrid();
    if (img.complete) buildGrid();
    else img.addEventListener("load", onLoad, { once: true });
    const onResize = () => buildGrid();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(buildGrid);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      img.removeEventListener("load", onLoad);
    };
  }, [buildGrid]);

  const onPointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    pointerRef.current = {
      x: Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (clientY - rect.top) / rect.height)),
      active: true,
    };
  };

  const handleEnter = (e: React.MouseEvent) => {
    setHovered(true);
    onPointerMove(e);
  };

  return (
    <div
      ref={wrapRef}
      className="group/ascii relative aspect-[4/5] w-full overflow-hidden bg-transparent"
      onMouseEnter={handleEnter}
      onMouseLeave={() => {
        setHovered(false);
        pointerRef.current.active = false;
        const c = canvasRef.current;
        if (c) c.getContext("2d")?.clearRect(0, 0, c.width, c.height);
      }}
      onMouseMove={onPointerMove}
      onTouchStart={(e) => {
        setTouched((v) => !v);
        onPointerMove(e);
      }}
      onTouchMove={onPointerMove}
    >
      {/* Imagen real siempre visible — es la base */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={1100}
        height={1100}
        sizes={sizes}
        crossOrigin="anonymous"
        onLoad={buildGrid}
        className="absolute inset-0 h-full w-full object-cover object-center"
        fetchPriority={priority ? "high" : "auto"}
      />

      {/* Canvas transparente: solo la lupa ASCII */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: isActive && ready ? 1 : 0, transition: "opacity 220ms ease" }}
      />

      {/* Hint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/45 to-transparent px-2.5 py-2 opacity-0 transition-opacity duration-300 group-hover/ascii:opacity-100"
        style={{ opacity: isActive && ready ? 1 : undefined }}
      >
        <span className="meta hidden text-white/80 sm:inline">Mueve el cursor — lupa ASCII</span>
        <span className="meta text-white/70 sm:hidden">Toca y arrastra</span>
        <span className="meta hidden items-center gap-1.5 text-white/60 sm:flex">
          <span className="size-1.5 animate-pulse rounded-full bg-[#b9a6e8]" /> LUPA ACTIVA
        </span>
      </div>

      <span aria-hidden className="pointer-events-none absolute inset-0 border border-white/10" />
    </div>
  );
}
