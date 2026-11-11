import Image from "next/image";
import { about, basePath, profile } from "@/data/site";
import { IconArrowUpRight } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function About() {
  return (
    <section id="sobre-mi" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <SectionHeading
          index="01"
          title={
            <>
              Sobre <span className="serif-italic lowercase">mí</span>
            </>
          }
          description="Estudiante, autodidacta y obsesionado con que las cosas funcionen bien."
        />

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-serif text-[clamp(1.65rem,3.2vw,2.75rem)] leading-[1.14] tracking-[-0.01em]">
                {about.lead.split("construyendo")[0]}
                <span className="italic">construyendo</span>
                {about.lead.split("construyendo")[1]}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {about.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={0.08 * i}>
                  <p className="text-[0.95rem] leading-relaxed text-muted">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
                <Image
                  src={`${basePath}/firma-tinta.webp`}
                  alt={`Firma de ${profile.firstName} Sánchez`}
                  width={1400}
                  height={519}
                  sizes="220px"
                  className="firma-adaptive h-14 w-auto opacity-90"
                />
                <span className="meta text-muted">
                  {profile.education} · {profile.orientation}
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <dl className="border-t border-line">
                {about.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="group grid grid-cols-3 gap-4 border-b border-line py-4 transition-colors hover:bg-ink/[0.03]"
                  >
                    <dt className="meta pt-1 text-muted">{fact.label}</dt>
                    <dd className="col-span-2 text-sm leading-relaxed">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 border border-line">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={`${basePath}/eva-01.webp`}
                    alt="EVA-01, el mecha de Neon Genesis Evangelion"
                    fill
                    sizes="(max-width: 1024px) 90vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <p className="meta text-muted">Fuera del código</p>
                  <p className="meta text-muted">EVA-01 · Evangelion</p>
                </div>
              </div>

              <div className="mt-6 border border-line p-5">
                <p className="meta text-muted">Actualmente</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed">
                  Cursando el último año del bachillerato técnico en Informática,
                  construyendo proyectos propios y buscando mi primera experiencia
                  profesional en desarrollo web.
                </p>
                <a
                  href="#contacto"
                  className="meta link-line mt-4 inline-flex items-center gap-1.5 text-ink"
                >
                  Trabajemos juntos <IconArrowUpRight className="size-3" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
