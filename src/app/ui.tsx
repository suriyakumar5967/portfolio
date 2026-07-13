import type { ReactNode } from "react";

/** Mono eyebrow with a leading rule — the portfolio's section label motif. */
export function SectionLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="w-8 h-px bg-primary" />
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {children}
      </span>
    </div>
  );
}

/** Max-width page container. */
export function Container({ children, className = "", wide = false }: { children: ReactNode; className?: string; wide?: boolean }) {
  return <div className={`${wide ? "max-w-7xl" : "max-w-6xl"} mx-auto px-6 ${className}`}>{children}</div>;
}

/** Shared primary CTA button style — used for "View Work" and "Download Resume"
 *  so the two match exactly (height, padding, radius, hover, transition). */
export const ctaButtonClass =
  "group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-soft-md ring-1 ring-inset ring-white/10 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-0.5 hover:shadow-soft-xl active:translate-y-0";

export function Pill({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "primary" | "outline" }) {
  const cls =
    tone === "primary" ? "bg-primary/10 text-primary"
    : tone === "outline" ? "border border-border text-muted-foreground"
    : "bg-muted text-muted-foreground";
  return <span className={`px-3 py-1 text-xs font-medium rounded-full ${cls}`}>{children}</span>;
}
