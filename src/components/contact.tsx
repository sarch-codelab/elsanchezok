"use client";

import Image from "next/image";
import { useState } from "react";
import { basePath, profile } from "@/data/site";
import { IconArrowUpRight, IconCheck } from "./icons";
import { Reveal } from "./reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("nombre") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("mensaje") ?? "");

    const subject = encodeURIComponent(`Nuevo proyecto — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
  }

  return (
    <section
      id="contacto"
      className="dark-section relative scroll-mt-20 overflow-hidden py-20 md:py-28"
    >
      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="meta flex flex-wrap items-center justify-between gap-3 border-b border-paper/20 pb-4 text-paper/50">
          <span>(07) — Contacto</span>
          <span className="flex items-center gap-2 text-paper">
            <span className="size-1.5 rounded-full bg-paper" />
            {profile.availability}
          </span>
        </div>

        <Reveal>
          <h2 className="mt-10 display text-[clamp(3.2rem,11vw,9rem)] leading-[0.82]">
            Hablemos
          </h2>
          <p className="serif-italic mt-2 text-[clamp(1.6rem,4.4vw,3.4rem)] leading-tight text-paper/70">
            de tu próximo proyecto.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-4 border-y border-paper/20 py-7 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={`mailto:${profile.email}`}
              className="display break-all text-[clamp(1.35rem,4vw,3rem)] leading-none underline decoration-paper/30 decoration-2 underline-offset-[10px] transition-colors hover:decoration-paper"
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="btn inline-flex shrink-0 items-center gap-1.5 border-paper/40 text-paper before:bg-paper hover:text-[#0b0b0b]"
            >
              {copied ? (
                <>
                  Copiado <IconCheck className="size-3.5" />
                </>
              ) : (
                "Copiar correo"
              )}
            </button>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="meta text-paper/50">Escríbeme directo</p>
            <h3 className="mt-3 text-xl tracking-tight sm:text-2xl">
              Cuéntame qué tienes en mente.
            </h3>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="nombre" className="meta block text-paper/50">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Tu nombre"
                    className="mt-2 w-full border-b border-paper/25 bg-transparent py-2.5 text-[0.95rem] text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-paper"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="meta block text-paper/50">
                    Correo
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    className="mt-2 w-full border-b border-paper/25 bg-transparent py-2.5 text-[0.95rem] text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-paper"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mensaje" className="meta block text-paper/50">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={4}
                  placeholder="Idea, plazo y qué necesitas resolver…"
                  className="mt-2 w-full resize-none border-b border-paper/25 bg-transparent py-2.5 text-[0.95rem] text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-paper"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="btn btn-filled inline-flex items-center gap-1.5 !border-paper !bg-paper !text-[#0b0b0b] before:!bg-[#160b28] hover:!text-paper"
                >
                  Enviar mensaje <IconArrowUpRight className="size-3.5" />
                </button>
                <p className="meta text-paper/60" aria-live="polite">
                  {sent
                    ? "Abriendo tu app de correo…"
                    : "Se abrirá tu app de correo"}
                </p>
              </div>
            </form>
          </div>

          <div className="lg:col-span-5" id="contacto-info">
            <p className="meta text-paper/50">En otros lugares</p>
            <ul className="mt-4 border-t border-paper/20">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-paper/20 py-4 transition-colors hover:text-paper/70"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="text-base">{social.label}</span>
                      <span className="meta text-paper/60">{social.handle}</span>
                    </span>
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    >
                      <IconArrowUpRight className="size-3.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <dl className="mt-8 space-y-4">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="meta text-paper/50">Ubicación</dt>
                <dd className="text-sm">{profile.location}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="meta text-paper/50">Formación</dt>
                <dd className="text-right text-sm">{profile.education}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="meta text-paper/50">Respuesta</dt>
                <dd className="text-sm">En menos de 24 h</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-paper/20 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="meta max-w-xs leading-relaxed text-paper/60">
            Del otro lado de la pantalla hay una persona.
            <br />
            Gracias por llegar hasta aquí.
          </p>
          <Image
            src={`${basePath}/firma.webp`}
            alt={`Firma de ${profile.firstName} Sánchez`}
            width={1400}
            height={519}
            sizes="280px"
            className="h-20 w-auto opacity-90 sm:h-24"
          />
        </div>
      </div>
    </section>
  );
}
