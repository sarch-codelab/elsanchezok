"use client";

import { infinihon } from "@/data/site";
import { IconArrowUpRight } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Lab() {
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
              <span className="tracking-[-0.04em]">Infinihon</span>{" "}
              <span className="serif-italic lowercase">— mi marca</span>
            </>
          }
          description="Infraestructura que mueve el futuro. Mi proyecto de marca personal para diseñar infraestructura desde Honduras."
        />

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-12">
          {/* Visual / Brand block */}
          <Reveal className="lg:col-span-7">
            <div className="relative overflow-hidden border border-line bg-[radial-gradient(circle_at_30%_30%,rgba(185,166,232,0.12),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(241,239,234,0.06),transparent_40%)]">
              <div className="relative p-7 sm:p-10">
                <div className="flex items-start justify-between gap-4">
                  <p className="meta text-muted">
                    14.0818° N · 87.2068° W <br />
                    Tegucigalpa · HN
                  </p>
                  <span className="meta rounded-full border border-paper/20 px-3 py-1 text-paper/70">
                    Tecnología & Infraestructura
                  </span>
                </div>

                <div className="mt-10">
                  <h3 className="display leading-[0.82] tracking-[-0.04em]">
                    <span className="block text-[clamp(2.8rem,6vw,5rem)]">INF</span>
                    <span className="block text-[clamp(2.8rem,6vw,5rem)]">INIHON</span>
                  </h3>
                  <p className="meta mt-4 max-w-sm text-paper/60">
                    INF INIHON / Technology & Infrastructure — arquitectura en capas: Network → Servers → Cloud → Applications → Monitoring.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3 border-t border-paper/15 pt-6">
                  {[
                    { k: "L1", v: "Network" },
                    { k: "L2", v: "Servers" },
                    { k: "L3", v: "Cloud" },
                    { k: "L4", v: "Apps" },
                    { k: "L5", v: "Monitoring" },
                    { k: "Lx", v: "HN → Mundo" },
                  ].map((l) => (
                    <div key={l.k} className="border border-paper/10 px-3 py-3">
                      <p className="meta text-paper/40">{l.k}</p>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em]">{l.v}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-line bg-paper/[0.03] px-4 py-3">
                <span className="meta text-muted">infinihon.vercel.app</span>
                <span className="meta flex items-center gap-2 text-muted">
                  <span className="size-1.5 rounded-full bg-ink animate-pulse" />
                  Hecho en Honduras
                </span>
              </div>

              <span aria-hidden className="pointer-events-none absolute -left-px -top-px size-4 border-l border-t border-ink/40" />
              <span aria-hidden className="pointer-events-none absolute -bottom-px -right-px size-4 border-b border-r border-ink/40" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {infinihon.services.slice(0, 6).map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-line p-3 transition-colors hover:border-paper/30 hover:bg-paper/[0.04]"
                >
                  <p className="meta text-paper/40">{s.id}</p>
                  <p className="mt-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em]">{s.title}</p>
                  <p className="mt-1 text-[11px] leading-snug text-paper/50">{s.desc}</p>
                </a>
              ))}
            </div>
          </Reveal>

          <div className="flex flex-col gap-10 lg:col-span-5">
            <Reveal delay={0.08}>
              <p className="font-serif text-[clamp(1.55rem,2.8vw,2.35rem)] leading-[1.16]">
                No solo instalo tecnología.
                <br />
                Construyo sistemas.
              </p>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">
                {infinihon.intro} De una oficina a múltiples sedes interconectadas, con documentación, automatización y observabilidad real.
              </p>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">
                Stack actual: MikroTik, AWS/Azure/GCP, Docker/Kubernetes, Terraform/Ansible, Prometheus/Grafana, Node.js/React/Next.js — operando desde {infinihon.location} con estándares globales.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="border-t border-line">
                <div className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                  <dt className="meta text-muted">Marca</dt>
                  <dd className="text-right text-sm">{infinihon.name} · {infinihon.claim}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                  <dt className="meta text-muted">Sede</dt>
                  <dd className="text-right text-sm">{infinihon.location}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                  <dt className="meta text-muted">Método</dt>
                  <dd className="text-right text-sm">{infinihon.process.join(" → ")}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                  <dt className="meta text-muted">Enfoque</dt>
                  <dd className="text-right text-sm">Redes · Cloud · DevOps · Seguridad</dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={infinihon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-filled inline-flex items-center gap-1.5"
                >
                  Visitar Infinihon <IconArrowUpRight className="size-3.5" />
                </a>
                <a
                  href={`${infinihon.url}#contacto`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta link-line inline-flex items-center gap-1"
                >
                  Construir mi infraestructura <IconArrowUpRight className="size-3" />
                </a>
              </div>
              <p className="meta mt-4 text-paper/40">
                6 disciplinas · 1 equipo · una sola arquitectura coherente
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
