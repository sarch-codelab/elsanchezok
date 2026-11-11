import { IconSparkle } from "./icons";

export function Marquee({
  items,
  reverse = false,
  fast = false,
  className = "",
}: {
  items: string[];
  reverse?: boolean;
  fast?: boolean;
  className?: string;
}) {
  // Se repite lo suficiente para que en pantallas anchas (1920+) no quede hueco.
  const repeated = [...items, ...items, ...items];
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {repeated.map((item, i) => (
        <span key={`${key}-${item}-${i}`} className="flex items-center">
          <span className="display px-6 text-[clamp(1.5rem,3.6vw,3rem)] leading-none">
            {item}
          </span>
          <span className="inline-flex items-center" aria-hidden>
            <IconSparkle className="size-[0.7em]" />
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div
        className={`marquee-track ${fast ? "fast" : ""} ${reverse ? "marquee-reverse" : ""}`}
      >
        {row("a")}
        {row("b")}
        {row("c")}
        {row("d")}
      </div>
    </div>
  );
}
