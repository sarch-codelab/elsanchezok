import Image from "next/image";
import { basePath, profile, stats } from "@/data/site";
import { Reveal } from "./reveal";

/** La intro arranca cuando el preloader empieza a retirarse. */
const INTRO = 1.4;

export function Hero() {
  return (
    <section id="inicio" className="dark-section relative overflow-hidden pt-[68px]">
      {/* Fondo: imagen + veladuras para que el texto siga legible */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src={`${basePath}/hero-bg.webp`}
          alt=""
          fill
          priority
          unoptimized
          fetchPriority="high"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0b0b0b_0%,rgba(11,11,11,0.9)_26%,rgba(11,11,11,0.48)_54%,rgba(11,11,11,0.16)_78%,rgba(11,11,11,0.4)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.88)_0%,rgba(11,11,11,0.14)_32%,rgba(11,11,11,0.28)_64%,#0b0b0b_100%)]" />
        <div className="grid-lines absolute inset-0 hidden opacity-25 md:block" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="meta flex flex-wrap items-center justify-between gap-3 border-b border-white/15 py-4 text-muted">
          <span>Portafolio {profile.year} — Ed. 01</span>
          <span className="hidden sm:inline">
            Informática · {profile.orientation}
          </span>
          <span className="flex items-center gap-2 text-ink">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ink opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-ink" />
            </span>
            {profile.availability}
          </span>
        </div>

        <div className="grid items-center gap-10 pb-10 pt-8 lg:grid-cols-12 lg:gap-10 lg:pb-14 lg:pt-12">
          <div className="order-1 flex flex-col lg:col-span-7">
            <Reveal>
              <p className="meta text-muted">
                Hola, soy {profile.firstName} — {profile.role}
              </p>
            </Reveal>

            <h1 className="mt-4 select-none">
              <Reveal as="span" delay={INTRO + 0.05} className="block">
                <span className="display block text-[clamp(3.4rem,10vw,8.2rem)]">
                  {profile.headlineTop}
                </span>
              </Reveal>
              <Reveal as="span" delay={INTRO + 0.12} className="block">
                <span className="display text-outline block text-[clamp(2.1rem,7.1vw,5.9rem)]">
                  {profile.headlineMiddle}
                </span>
              </Reveal>
              <Reveal as="span" delay={INTRO + 0.2} className="block">
                <span className="serif-italic mt-2 block text-[clamp(1.9rem,6.2vw,5rem)] leading-[0.95]">
                  {profile.headlineAccent}
                  <span className="blink" aria-hidden>
                    _
                  </span>
                </span>
              </Reveal>
            </h1>

            <Reveal delay={INTRO + 0.28}>
              <p className="mt-8 max-w-lg text-[0.98rem] leading-relaxed text-muted sm:text-base">
                {profile.tagline}
              </p>
            </Reveal>

            <Reveal delay={INTRO + 0.34}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#proyectos" className="btn btn-filled">
                  Ver proyectos <span aria-hidden>↘</span>
                </a>
                <a href="#contacto" className="btn">
                  Hablemos <span aria-hidden>↗</span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={INTRO + 0.42}>
              <div className="meta mt-10 flex items-center gap-3 text-muted">
                <span className="inline-block h-8 w-px overflow-hidden bg-line">
                  <span className="block h-full w-px animate-pulse bg-ink" />
                </span>
                Desliza para explorar
              </div>
            </Reveal>
          </div>

          <div className="order-2 lg:col-span-5">
            <Reveal delay={INTRO + 0.18} y={40}>
              <figure className="relative mx-auto w-full max-w-[460px] lg:ml-auto">
                <div className="relative overflow-hidden border border-ink/25 bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]">
                  <Image
                    src={`${basePath}/joseph.webp`}
                    alt={`Retrato de ${profile.firstName}`}
                    width={1100}
                    height={1100}
                    loading="eager"
                    sizes="(max-width: 1024px) 90vw, 38vw"
                    className="aspect-[4/5] w-full object-cover object-center grayscale contrast-[1.04] transition-transform duration-[1.2s] ease-out hover:scale-[1.03]"
                  />

                  <span className="meta absolute left-0 top-0 bg-[#0b0b0b]/85 px-3 py-1.5 text-[#f1efea] backdrop-blur-sm">
                    Retrato / 01
                  </span>
                  <span className="meta absolute bottom-0 right-0 bg-[#f1efea]/90 px-3 py-1.5 text-[#0b0b0b] backdrop-blur">
                    {profile.year}
                  </span>

                  <span
                    aria-hidden
                    className="absolute left-3 top-1/2 hidden h-6 w-px bg-white/30 sm:block"
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-3 left-1/2 hidden h-px w-6 bg-white/30 sm:block"
                  />
                </div>

                <div className="absolute -left-4 -top-4 hidden size-8 border-l border-t border-white/50 sm:block" />
                <div className="absolute -bottom-4 -right-4 hidden size-8 border-b border-r border-white/50 sm:block" />

                <div className="absolute bottom-12 -left-7 hidden size-28 place-items-center rounded-full border border-white/40 bg-[#0b0b0b]/85 backdrop-blur-sm md:grid">
                  <svg
                    viewBox="0 0 100 100"
                    className="spin-slow absolute inset-0 size-full p-1.5 text-[#f1efea]"
                    aria-hidden
                  >
                    <defs>
                      <path
                        id="hero-badge"
                        d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="none"
                      />
                    </defs>
                    <text className="fill-current font-mono text-[7.5px] uppercase tracking-[0.16em]">
                      <textPath href="#hero-badge">
                        Disponible · Proyectos · 2026 ·
                      </textPath>
                    </text>
                  </svg>
                  <span className="text-xl" aria-hidden>
                    ✳
                  </span>
                </div>

                <figcaption className="meta mt-3 flex items-center justify-between text-muted">
                  <span>{profile.education}</span>
                  <span>FIG. 01</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        <Reveal delay={INTRO + 0.5}>
          <div className="mb-14 grid grid-cols-2 gap-px border-y border-white/15 bg-white/15 md:mb-20 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#0b0b0b]/80 px-4 py-6 backdrop-blur-sm sm:px-5 md:py-8 md:first:pl-0 md:last:pr-0"
              >
                <p className="display text-[clamp(2rem,4vw,3.4rem)] leading-none">
                  {stat.value}
                </p>
                <p className="meta mt-3 text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
