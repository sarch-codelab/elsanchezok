"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { stackGroups } from "@/data/site";
import { SectionHeading } from "./section-heading";

export function Stack() {
  const [open, setOpen] = useState<string | null>(stackGroups[0].id);

  return (
    <section
      id="stack"
      className="on-dark scroll-mt-20 bg-ink py-20 text-paper md:py-28"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <SectionHeading
          index="02"
          title={
            <>
              Stack <span className="serif-italic lowercase">técnico</span>
            </>
          }
          description="Las herramientas con las que trabajo hoy. Sin rellenar la lista: todo lo que aparece aquí lo he usado en un proyecto."
        />

        <div className="mt-12 border-t border-paper/20 md:mt-16">
          {stackGroups.map((group, i) => {
            const isOpen = open === group.id;
            return (
              <div key={group.id} className="border-b border-paper/20">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : group.id)}
                    aria-expanded={isOpen}
                    aria-controls={`panel-${group.id}`}
                    className="group flex w-full items-center justify-between gap-4 py-6 text-left md:py-7"
                  >
                    <span className="flex items-start gap-4 sm:gap-6">
                      <span className="meta mt-2 text-paper/40">0{i + 1}</span>
                      <span
                        className={`display text-[clamp(2rem,5.5vw,4rem)] leading-none transition-transform duration-500 group-hover:translate-x-2 ${
                          isOpen ? "" : "text-paper/70 group-hover:text-paper"
                        }`}
                      >
                        {group.title}
                      </span>
                    </span>
                    <span className="flex items-center gap-4 sm:gap-8">
                      <span className="meta hidden text-paper/40 sm:block">
                        {group.items.length} herramientas
                      </span>
                      <span
                        aria-hidden
                        className={`grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                          isOpen
                            ? "border-paper bg-paper text-ink"
                            : "border-paper/30 group-hover:border-paper"
                        }`}
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`panel-${group.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-8 md:grid-cols-12 md:pl-14">
                        <p className="max-w-sm text-sm leading-relaxed text-paper/55 md:col-span-4">
                          {group.description}
                        </p>
                        <ul className="flex flex-wrap gap-2 md:col-span-8">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="cursor-default border border-paper/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <p className="meta mt-8 text-paper/40">
          Siempre aprendiendo algo nuevo · Actualmente: testing y arquitectura de
          software
        </p>
      </div>
    </section>
  );
}
