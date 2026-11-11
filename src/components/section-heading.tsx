import type { ReactNode } from "react";

export function SectionHeading({
  index,
  title,
  description,
  children,
}: {
  index: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-t border-line pt-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4 sm:gap-6">
          <span className="meta mt-2 shrink-0 text-muted">({index})</span>
          <h2 className="display text-[clamp(2.6rem,7vw,5.5rem)]">{title}</h2>
        </div>
        {description && (
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-muted md:pt-3 md:text-right">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
