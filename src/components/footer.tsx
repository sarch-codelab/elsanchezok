import { profile } from "@/data/site";
import { LocalTime } from "./local-time";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 py-10">
          <div>
            <p className="meta text-muted">¿Construimos algo juntos?</p>
            <a
              href={`mailto:${profile.email}`}
              className="serif-italic link-line mt-2 inline-flex text-[clamp(1.5rem,4vw,2.75rem)] leading-none"
            >
              {profile.email} <span aria-hidden className="ml-3 text-[0.6em]">↗</span>
            </a>
          </div>

          <a
            href="#inicio"
            className="meta group flex items-center gap-2 border border-line px-4 py-2.5 transition-colors hover:border-ink"
          >
            Volver arriba
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:-translate-y-1"
            >
              ↑
            </span>
          </a>
        </div>

        <div className="-mx-1 select-none pb-4 pt-2" aria-hidden>
          <p className="display text-outline whitespace-nowrap text-[clamp(4rem,29vw,26rem)] leading-[0.72]">
            Joseph
          </p>
        </div>

        <div className="meta flex flex-col gap-3 border-t border-line py-6 text-muted md:flex-row md:items-center md:justify-between">
          <span>
            © {profile.year} {profile.firstName} — Todos los derechos reservados
          </span>
          <span className="flex items-center gap-2">
            Hora local <span className="text-ink"><LocalTime /></span>
          </span>
          <span>Next.js · TypeScript · Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
