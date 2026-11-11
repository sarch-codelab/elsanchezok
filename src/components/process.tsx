import { process } from "@/data/site";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Process() {
  return (
    <section id="metodo" className="scroll-mt-20 pb-20 md:pb-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <SectionHeading
          index="06"
          title={
            <>
              Cómo <span className="serif-italic lowercase">trabajo</span>
            </>
          }
          description="Un método simple para no perderse: entender, diseñar, construir y entregar."
        />

        <div className="mt-12 grid gap-px border-y border-line bg-line md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.05}>
              <div className="group relative flex h-full flex-col justify-between gap-10 bg-paper p-6 transition-colors duration-500 hover:bg-accent hover:text-paper md:p-7">
                <div className="flex items-start justify-between">
                  <span className="meta text-muted transition-colors group-hover:text-paper/50">
                    Paso {step.step}
                  </span>
                  <span
                    aria-hidden
                    className="text-lg transition-transform duration-500 group-hover:rotate-90"
                  >
                    ✳
                  </span>
                </div>
                <div>
                  <h3 className="display text-[clamp(2rem,3.6vw,2.8rem)] leading-none">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted transition-colors group-hover:text-paper/60">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
