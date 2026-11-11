import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Lab } from "@/components/lab";
import { Marquee } from "@/components/marquee";
import { Nav } from "@/components/nav";
import { Preloader } from "@/components/preloader";
import { Process } from "@/components/process";
import { Projects } from "@/components/projects";
import { Stack } from "@/components/stack";
import { Timeline } from "@/components/timeline";

const keywords = [
  "Desarrollo web",
  "Interfaces",
  "APIs",
  "Bases de datos",
  "Diseño",
  "Código limpio",
];

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <main>
        <Hero />

        <div className="border-y border-white/10 bg-[#0b0b0b] py-4 text-[#f1efea] md:py-5">
          <Marquee items={keywords} />
        </div>

        <About />
        <Stack />

        <div className="border-y border-line py-4">
          <Marquee
            items={["Disponible para proyectos", "Prácticas", "Freelance", "2026"]}
            reverse
            fast
          />
        </div>

        <Projects />
        <Timeline />
        <Lab />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
