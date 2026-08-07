import { useRef } from "react";
import { PROFILE } from "../lib/content";
import { Reveal, useReducedMotion } from "../lib/motion";

// Subtle film grain (inline SVG noise).
const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function Hero({ onNav }: { onNav: (id: string) => void }) {
  const reduced = useReducedMotion();
  const spotRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const el = spotRef.current;
    if (!el) return;
    const x = e.clientX, y = e.clientY;
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${x - r.left}px`);
      el.style.setProperty("--my", `${y - r.top}px`);
    });
  };

  return (
    <section
      id="hero"
      onMouseMove={onMove}
      className="relative min-h-screen pt-[64px] flex items-center justify-center overflow-hidden"
    >
      {/* ── Ambient graphics ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {/* Aurora blobs */}
        <div
          className="absolute -top-[10%] left-[8%] w-[46vw] h-[46vw] rounded-full blur-[110px] opacity-40"
          style={{ background: "radial-gradient(circle, var(--primary), transparent 62%)", animation: reduced ? undefined : "aurora 18s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-[15%] right-[4%] w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-35"
          style={{ background: "radial-gradient(circle, #9186F2, transparent 62%)", animation: reduced ? undefined : "aurora 24s ease-in-out infinite reverse" }}
        />
        <div
          className="absolute top-[28%] right-[26%] w-[26vw] h-[26vw] rounded-full blur-[100px] opacity-25"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 60%)", animation: reduced ? undefined : "float 14s ease-in-out infinite" }}
        />
      </div>

      {/* Dot grid */}
      <div aria-hidden className="absolute inset-0 bg-dot-grid opacity-[0.05] pointer-events-none" />

      {/* Cursor spotlight */}
      <div
        ref={spotRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{ background: "radial-gradient(460px circle at var(--mx, 50%) var(--my, 32%), var(--accent-soft), transparent 70%)" }}
      />

      {/* Film grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.35] mix-blend-soft-light"
        style={{ backgroundImage: `url("${GRAIN}")`, backgroundSize: "180px" }}
      />

      {/* Vignette fade to background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 90% 80% at 50% 40%, transparent 50%, var(--background) 100%)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[56rem] mx-auto px-6 py-24 md:py-28 flex flex-col items-center text-center gap-8 md:gap-9">
        <Reveal variant="fade" duration={600}>
          <span className="inline-flex items-center gap-2.5 pl-3.5 pr-4 py-2 rounded-full border border-border bg-card/40 backdrop-blur-md font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground shadow-soft-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-[pulse-ring_2.4s_ease-out_infinite]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            {PROFILE.role}
          </span>
        </Reveal>

        <h1 className="font-serif font-bold text-foreground leading-[1.08] tracking-[-0.028em]"
          style={{ fontSize: "clamp(2.25rem, 5vw, 4.25rem)" }}>
          <Reveal as="span" variant="blur" delay={140} duration={850} className="block">
            Making complexity
          </Reveal>
          <Reveal as="span" variant="blur" delay={270} duration={850} className="block">
            feel{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(100deg, var(--primary), #b7abff, var(--primary))",
                backgroundSize: "200% auto",
                animation: reduced ? undefined : "gradient-pan 6s linear infinite",
              }}
            >
              effortless
            </span>
          </Reveal>
        </h1>

        <Reveal variant="fade-up" delay={520}>
          <p className="text-lg md:text-xl text-muted-foreground leading-[1.65] max-w-[46ch] text-pretty">
            I&apos;m <strong className="text-foreground font-semibold">{PROFILE.name}</strong> — I turn dense, high-stakes workflows into calm, usable products, end-to-end from problem framing to developer handoff.
          </p>
        </Reveal>

        <Reveal variant="fade-up" delay={620}>
          <div className="flex items-center justify-center pt-2">
            <button onClick={() => onNav("work")} className="splat-btn" aria-label="View Work">
              <span>View Work</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
