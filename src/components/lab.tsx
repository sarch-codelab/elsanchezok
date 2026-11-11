"use client";

import { useState } from "react";
import { profile } from "@/data/site";
import { IconArrowUpRight } from "./icons";
import { Reveal } from "./reveal";
import { Scene3D, type SceneStatus } from "./scene-3d";
import { SectionHeading } from "./section-heading";

const specs = [
  { label: "Render", value: "WebGL en tiempo real" },
  { label: "Geometría", value: "Nudo toroidal (2, 3)" },
  { label: "Interacción", value: "Puntero + arrastre" },
  { label: "Motor", value: "Three.js bajo demanda" },
];

export function Lab() {
  const [status, setStatus] = useState<SceneStatus>("idle");

  return (
    <section
      id="laboratorio"
      className="dark-section relative scroll-mt-20 overflow-hidden py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <SectionHeading
          index="05"
          title={
            <>
              Laboratorio <span className="serif-italic lowercase">3d</span>
            </>
          }
          description="Una pieza renderizada en vivo, no una imagen. Arrástrala y mira cómo responde."
        />

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <div className="relative border border-line bg-[radial-gradient(circle_at_50%_45%,rgba(241,239,234,0.09),transparent_62%)]">
              <div className="relative aspect-square sm:aspect-[5/4]">
                <Scene3D onStatusChange={setStatus} />
              </div>

              <span className="meta pointer-events-none absolute left-4 top-4 text-muted">
                Objeto 001
              </span>
              <span className="meta pointer-events-none absolute right-4 top-4 flex items-center gap-2 text-muted">
                <span className="size-1.5 rounded-full bg-ink" />
                {status === "static"
                  ? "Estático"
                  : status === "live"
                    ? "En vivo"
                    : "Cargando"}
              </span>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3">
                <span className="meta text-muted">Nudo toroidal</span>
                <span className="meta text-muted">
                  {status === "static"
                    ? "Vista fija"
                    : "Arrastra para rotar"}
                </span>
              </div>

              <span
                aria-hidden
                className="pointer-events-none absolute -left-px -top-px size-4 border-l border-t border-ink/50"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-px -right-px size-4 border-b border-r border-ink/50"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-px -left-px size-4 border-b border-l border-ink/50"
              />
            </div>
          </Reveal>

          <div className="flex flex-col gap-10 lg:col-span-5">
            <Reveal delay={0.08}>
              <p className="font-serif text-[clamp(1.55rem,2.8vw,2.35rem)] leading-[1.16]">
                No todo es caja y texto. A veces el mejor argumento es un objeto
                que gira cuando lo tocas.
              </p>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">
                Esta pieza corre en tiempo real sobre WebGL: una malla de alambre
                alrededor de un nudo toroidal, con partículas que giran a otra
                velocidad. Se activa solo cuando entra en pantalla, reacciona al
                cursor y se puede arrastrar con el dedo.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="border-t border-line">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                  >
                    <dt className="meta text-muted">{spec.label}</dt>
                    <dd className="text-right text-sm">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={profile.socials[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta link-line inline-flex items-center gap-1"
                >
                  Más experimentos <IconArrowUpRight className="size-3" />
                </a>
                <span className="meta text-muted">01 / 01</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
