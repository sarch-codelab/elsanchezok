"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useState } from "react";
import { profile, projects } from "@/data/site";
import { ProjectCover } from "./project-cover";
import { SectionHeading } from "./section-heading";

export function Projects() {
  const [open, setOpen] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 320, damping: 32, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 320, damping: 32, mass: 0.6 });

  const hoveredProject = projects.find((p) => p.index === hovered);

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    rawX.set(event.clientX + 28);
    rawY.set(event.clientY - 170);
  }

  return (
    <section id="proyectos" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <SectionHeading
          index="03"
          title={
            <>
              Proyectos <span className="serif-italic lowercase">selectos</span>
            </>
          }
          description="Proyectos reales: prácticas profesionales y ferias de ciencias. Toca cualquiera para ver los detalles."
        />

        <div className="meta mt-10 flex items-center justify-between border-b border-line pb-3 text-muted">
          <span>Proyecto / categoría</span>
          <span className="hidden md:block">Año</span>
        </div>

        <div
          className="relative"
          onMouseMove={handleMove}
          onMouseLeave={() => setHovered(null)}
        >
          {projects.map((project) => {
            const isOpen = open === project.index;
            return (
              <article key={project.index} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : project.index)}
                    onMouseEnter={() => setHovered(project.index)}
                    onFocus={() => setHovered(project.index)}
                    aria-expanded={isOpen}
                    aria-controls={`proyecto-${project.index}`}
                    className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 py-6 text-left sm:gap-5 md:py-7"
                  >
                    <span className="meta text-muted">{project.index}</span>

                    <span className="flex min-w-0 flex-col gap-1 md:grid md:grid-cols-12 md:items-baseline md:gap-4">
                      <span className="display text-[clamp(1.9rem,5vw,3.6rem)] leading-none transition-transform duration-500 group-hover:translate-x-1.5 md:col-span-6">
                        {project.title}
                      </span>
                      <span className="truncate text-xs text-muted sm:text-sm md:col-span-6 md:pt-1">
                        {project.category}
                      </span>
                    </span>

                    <span className="flex items-center gap-3 sm:gap-6">
                      <span className="meta hidden text-muted md:block">
                        {project.year}
                      </span>
                      <span
                        aria-hidden
                        className={`grid size-9 shrink-0 place-items-center rounded-full border text-sm transition-colors duration-300 ${
                          isOpen
                            ? "border-accent bg-accent text-paper"
                            : "border-line group-hover:border-ink"
                        }`}
                      >
                        {isOpen ? "−" : "↗"}
                      </span>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`proyecto-${project.index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-8 md:grid-cols-2 md:gap-10 md:pl-14 lg:grid-cols-12">
                        <div className="md:col-span-2 lg:hidden">
                          <div className="aspect-[16/10] w-full max-w-sm border border-line">
                            <ProjectCover project={project} />
                          </div>
                        </div>

                        <div className="md:col-span-1 lg:col-span-5">
                          <p className="meta text-muted">Resumen</p>
                          <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                            {project.summary}
                          </p>
                        </div>

                        <div className="md:col-span-1 lg:col-span-4">
                          <p className="meta text-muted">Lo que resolví</p>
                          <ul className="mt-3 space-y-2">
                            {project.highlights.map((highlight) => (
                              <li
                                key={highlight}
                                className="flex gap-2 text-[0.9rem] leading-snug"
                              >
                                <span aria-hidden className="mt-[2px] text-muted">
                                  →
                                </span>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="md:col-span-2 lg:col-span-3">
                          <p className="meta text-muted">Stack</p>
                          <ul className="mt-3 flex flex-wrap gap-1.5">
                            {project.stack.map((tech) => (
                              <li
                                key={tech}
                                className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em]"
                              >
                                {tech}
                              </li>
                            ))}
                          </ul>
                          <p className="meta mt-5 text-muted">
                            Proyecto {project.year}
                          </p>
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link-line meta mt-2 inline-flex text-ink"
                            >
                              Ver proyecto en vivo <span aria-hidden>↗</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}

          {/* Vista previa flotante (solo escritorio) */}
          <motion.div
            aria-hidden
            style={{ x, y }}
            className={`pointer-events-none fixed left-0 top-0 z-30 hidden w-[260px] rotate-[-4deg] border border-ink/10 shadow-2xl lg:block ${
              hovered ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          >
            {hoveredProject && (
              <div className="aspect-[4/3]">
                <ProjectCover project={hoveredProject} />
              </div>
            )}
          </motion.div>
        </div>

        <p className="meta mt-8 flex flex-wrap items-center gap-2 text-muted">
          ¿Quieres ver el código?
          <a
            href={profile.socials[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line text-ink"
          >
            Sígueme en GitHub <span aria-hidden>↗</span>
          </a>
        </p>
      </div>
    </section>
  );
}
