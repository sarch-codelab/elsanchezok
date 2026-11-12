"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = " ·:;+*?%#WM@█";
// rampa de luminancia: de vacío a denso. Profesional y legible en monoespaciado.
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const gridRef = useRef<{ cols: number; rows: number; cells: Cell[]; imgW: number; imgH: number } | null>(null);
  const [hovered, setHovered] = useState(false);
  const [ready, setReady] = useState(false);
  const [touched, setTouched] = useState(false);
  // para luz del cursor
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });

  const isActive = hovered || touched;

  const buildGrid = useCallback(() => {
    const img = imgRef.current;
    const wrap = wrapRef.current;
    if (!img || !wrap || !img.complete || img.naturalWidth === 0) return;

    // Resolución ASCII: 72 cols móviles / 88 cols desktop - balance nitidez vs performance
    const w = wrap.clientWidth;
    const cols = w < 400 ? 64 : w < 520 ? 72 : 84;
    // aspecto 4/5 del contenedor, corrección de celda monoespaciada (~0.58 ancho/alto)
    const containerAspect = 4 / 5;
    const charAspect = 0.58;
    const rows = Math.round(cols * containerAspect / charAspect);

    const tmp = document.createElement("canvas");
    tmp.width = cols;
    tmp.height = rows;
    const tctx = tmp.getContext("2d", { willReadFrequently: true });
    if (!tctx) return;

    // draw con object-cover: recorta centrado
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
    gridRef.current = { cols, rows, cells, imgW: cols, imgH: rows };
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

    // fondo
    ctx.fillStyle = "#0d0a14";
    ctx.fillRect(0, 0, W, H);

    // leve viñeta
    const grad = ctx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.45, W * 0.9);
    grad.addColorStop(0, "rgba(185,166,232,0.06)");
    grad.addColorStop(0.55, "rgba(0,0,0,0)");
    grad.addColorStop(1, "rgba(2,0,8,0.55)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    ctx.font = `${Math.round(cellH * 0.78)}px ${FONT_FAMILY}`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    const px = pointerRef.current.x;
    const py = pointerRef.current.y;
    const hasPointer = pointerRef.current.active && isActive;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x;
        const c = cells[i];
        if (c.ch === " " || c.lum < 8) continue;

        // silueta limpia: oscurece fondo, deja silueta en acentos claros
        // mapea color original a paleta del sitio para que se vea premium
        const cx = (x + 0.5) * cellW;
        const cy = (y + 0.5) * cellH;

        // luz de cursor: realza caracteres cerca del puntero
        let boost = 0;
        let glow = 0;
        if (hasPointer) {
          const dx = (x / cols - px);
          const dy = (y / rows - py) * 0.85; // corrige aspecto
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 0.14) {
            boost = (0.14 - d) / 0.14; // 0..1
            glow = boost;
          }
        }

        // paleta: mezcla color original hacia acento #b9a6e8 / #f1efea según luminancia
        // sombras -> violeta profundo, luces -> crema
        const t = c.lum / 255;
        // base: acento frío para que se lea como silueta ASCII elegante
        let r = Math.round(c.r * 0.42 + 185 * 0.58 * t + 241 * 0.12);
        let g = Math.round(c.g * 0.42 + 166 * 0.58 * t + 239 * 0.12);
        let b = Math.round(c.b * 0.42 + 232 * 0.58 * t + 234 * 0.12);

        if (boost > 0) {
          r = Math.min(255, Math.round(r + (255 - r) * boost * 0.55));
          g = Math.min(255, Math.round(g + (255 - g) * boost * 0.55));
          b = Math.min(255, Math.round(b + (255 - b) * boost * 0.55));
        }

        // caracteres muy oscuros -> más translúcidos para dar aire de silueta
        const alpha = 0.68 + t * 0.32 + glow * 0.18;

        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;

        if (glow > 0.15) {
          ctx.shadowColor = `rgba(${r},${g},${b},${0.35 * glow})`;
          ctx.shadowBlur = cellH * 0.9 * glow;
        } else {
          ctx.shadowBlur = 0;
        }

        // jitter sutil profesional cuando está activo: 1% de celdas tiembla
        let ch = c.ch;
        if (isActive && Math.random() < 0.004 && t > 0.3 && t < 0.85) {
          const n = CHARS[Math.floor(Math.random() * CHARS.length)];
          if (n.trim()) ch = n;
        }

        ctx.fillText(ch, cx, cy);
      }
    }
    ctx.shadowBlur = 0;

    // líneas de escaneo sutiles
    ctx.fillStyle = "rgba(241,239,234,0.035)";
    for (let y = 0; y < H; y += Math.round(cellH * 2 * dpr * 0.5)) {
      ctx.fillRect(0, y, W, 1 * dpr);
    }

    // borde interior
    ctx.strokeStyle = "rgba(241,239,234,0.12)";
    ctx.lineWidth = 1 * dpr;
    ctx.strokeRect(0.5 * dpr, 0.5 * dpr, W - 1 * dpr, H - 1 * dpr);
  }, [isActive]);

  // loop suave solo cuando está activo
  useEffect(() => {
    if (!ready || !isActive) return;
    let id = 0;
    const tick = () => {
      render();
      id = window.setTimeout(tick, 78) as unknown as number;
    };
    tick();
    return () => clearTimeout(id);
  }, [ready, isActive, render]);

  // primer render estático
  useEffect(() => {
    if (ready && !isActive) render();
  }, [ready, isActive, render]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) buildGrid();
    else img.addEventListener("load", buildGrid, { once: true });
    const onResize = () => buildGrid();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(buildGrid);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
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

  return (
    <div
      ref={wrapRef}
      className="group/ascii relative aspect-[4/5] w-full overflow-hidden bg-[#0d0a14]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        pointerRef.current.active = false;
      }}
      onMouseMove={onPointerMove}
      onTouchStart={(e) => {
        setTouched((v) => !v);
        onPointerMove(e);
      }}
      onTouchMove={onPointerMove}
    >
      {/* Imagen real: SEO + fallback + base para extraer luminancia */}
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
        className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/ascii:scale-[1.02] group-hover/ascii:opacity-0"
        fetchPriority={priority ? "high" : "auto"}
      />

      {/* Canvas ASCII */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 h-full w-full transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ opacity: isActive && ready ? 1 : 0 }}
      />

      {/* UI overlay */}
      <div
        ref={overlayRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 flex flex-col justify-between p-0 transition-opacity duration-500"
        style={{ opacity: isActive && ready ? 1 : 0 }}
      >
        <div className="flex items-center justify-between px-3 py-2">
          <span className="meta rounded bg-[#f1efea]/95 px-2 py-1 text-[10px] tracking-[0.14em] text-[#0b0b0b]">ASCII · SILUETA</span>
          <span className="meta flex items-center gap-1.5 bg-[#160b28]/80 px-2 py-1 text-[#f1efea] backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-[#b9a6e8]" /> {ready ? "EN VIVO" : "CARGANDO"}
          </span>
        </div>
        <div className="flex items-center justify-between bg-gradient-to-t from-[#0d0a14]/80 to-transparent px-3 py-2">
          <span className="meta text-[#f1efea]/70">Mueve el cursor · toca en móvil</span>
          <span className="meta hidden text-[#f1efea]/50 sm:inline">72×90 GLIFOS</span>
        </div>
      </div>

      {/* Borde sutil siempre visible */}
      <span aria-hidden className="pointer-events-none absolute inset-0 border border-white/10" />
    </div>
  );
}
