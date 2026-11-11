type Props = { className?: string; size?: number };

function Svg({
  children,
  className,
  size = 16,
  viewBox = "0 0 16 16",
}: Props & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      aria-hidden
      viewBox={viewBox}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export function IconArrowUpRight({ className, size }: Props) {
  return (
    <Svg size={size} className={className}>
      <path d="M6 10L11 5" />
      <path d="M6 5H11V10" />
    </Svg>
  );
}

export function IconArrowDownRight({ className, size }: Props) {
  return (
    <Svg size={size} className={className}>
      <path d="M6 6L11 11" />
      <path d="M6 11H11V6" />
    </Svg>
  );
}

export function IconArrowUp({ className, size }: Props) {
  return (
    <Svg size={size} className={className}>
      <path d="M8 12V4" />
      <path d="M5 7L8 4L11 7" />
    </Svg>
  );
}

export function IconArrowRight({ className, size }: Props) {
  return (
    <Svg size={size} className={className}>
      <path d="M4 8H12" />
      <path d="M9 5L12 8L9 11" />
    </Svg>
  );
}

export function IconClose({ className, size }: Props) {
  return (
    <Svg size={size} className={className}>
      <path d="M5 5L11 11" />
      <path d="M11 5L5 11" />
    </Svg>
  );
}

export function IconSparkle({ className, size }: Props) {
  return (
    <Svg size={size} viewBox="0 0 16 16" className={className}>
      <path
        d="M8 0L9.2 6.2L16 8L9.2 9.8L8 16L6.8 9.8L0 8L6.8 6.2Z"
        fill="currentColor"
        stroke="none"
      />
    </Svg>
  );
}

export function IconCheck({ className, size }: Props) {
  return (
    <Svg size={size} className={className}>
      <path d="M4 8L7 11L12 5" />
    </Svg>
  );
}

export function IconMinus({ className, size }: Props) {
  return (
    <Svg size={size} className={className}>
      <path d="M4 8H12" />
    </Svg>
  );
}

export function IconPlus({ className, size }: Props) {
  return (
    <Svg size={size} className={className}>
      <path d="M8 4V12" />
      <path d="M4 8H12" />
    </Svg>
  );
}
