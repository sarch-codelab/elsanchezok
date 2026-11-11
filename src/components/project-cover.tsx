import type { Project } from "@/data/site";

/**
 * Portadas abstractas en blanco y negro, generadas con CSS.
 * Cámbialas por capturas reales cuando tengas imágenes de los proyectos.
 */
export function ProjectCover({ project }: { project: Project }) {
  return (
    <div className="relative size-full overflow-hidden bg-[#e7e5e0] text-[#0b0b0b]">
      <div aria-hidden className="absolute inset-0">
        {project.pattern === "grid" && (
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(to right, #0b0b0b 1px, transparent 1px), linear-gradient(to bottom, #0b0b0b 1px, transparent 1px)",
              backgroundSize: "14% 14%",
            }}
          />
        )}

        {project.pattern === "lines" && (
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "repeating-linear-gradient(115deg, #0b0b0b 0 1px, transparent 1px 14px)",
            }}
          />
        )}

        {project.pattern === "dots" && (
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(#0b0b0b 1.1px, transparent 1.3px)",
              backgroundSize: "12px 12px",
            }}
          />
        )}

        {project.pattern === "diagonal" && (
          <div
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #0b0b0b 0 24px, transparent 24px 48px)",
            }}
          />
        )}

        {project.pattern === "orbit" && (
          <div className="absolute inset-0 grid place-items-center">
            {[92, 70, 48, 26].map((size) => (
              <span
                key={size}
                className="absolute rounded-full border border-[#0b0b0b]/70"
                style={{ width: `${size}%`, height: `${size}%` }}
              />
            ))}
            <span className="size-2 rounded-full bg-[#0b0b0b]" />
          </div>
        )}

        {project.pattern === "type" && (
          <p className="display absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] whitespace-nowrap text-center text-[5.5rem] leading-none opacity-90">
            {project.title} {project.title}
          </p>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/85 via-transparent to-transparent" />

      <div className="relative flex h-full flex-col justify-between p-4">
        <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#0b0b0b] mix-blend-difference">
          <span className="text-white">{project.index}</span>
          <span className="text-white/60"> / {project.year}</span>
        </div>

        <div>
          <p className="display text-[1.6rem] leading-none text-white">
            {project.title}
          </p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/65">
            {project.category}
          </p>
        </div>
      </div>
    </div>
  );
}
