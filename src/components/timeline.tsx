import { timeline } from "@/data/site";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Timeline() {
  return (
    <section id="trayectoria" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <SectionHeading
          index="04"
          title={
            <>
              Trayectoria <span className="serif-italic lowercase">& meta</span>
            </>
          }
          description="De una página estática a aplicaciones con base de datos. La línea de tiempo corta, sin adornos."
        />

        <ol className="mt-12 md:mt-16">
          {timeline.map((item, i) => (
            <Reveal key={item.year} delay={i * 0.04}>
              <li className="group grid grid-cols-1 gap-3 border-t border-line py-7 md:grid-cols-12 md:gap-6 md:py-9">
                <div className="flex items-center gap-3 md:col-span-3">
                  <span
                    aria-hidden
                    className="size-1.5 shrink-0 rounded-full bg-ink transition-transform duration-300 group-hover:scale-150"
                  />
                  <span className="display text-2xl leading-none md:text-3xl">
                    {item.year}
                  </span>
                </div>

                <div className="md:col-span-4">
                  <h3 className="text-lg font-medium tracking-tight md:text-xl">
                    {item.title}
                  </h3>
                </div>

                <div className="md:col-span-5">
                  <p className="text-[0.93rem] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
