import { useRef, useMemo, type ComponentType } from "react";
import {
  Download, Sparkles, Layers, PenTool, MousePointer2, Component, PencilRuler,
  MousePointerClick, Accessibility, Search, ClipboardCheck, Network, Route,
  Shapes, Palette, FlaskConical, StickyNote, Eye, Target, Microscope, Blocks,
} from "lucide-react";
import { PROFILE, ABOUT_INTRO, EXPERIENCE, SKILL_GROUPS, AI_LOGOS, DESIGN_PRINCIPLES } from "../lib/content";
import { Reveal, useReducedMotion } from "../lib/motion";
import { SectionLabel, Container } from "../ui";
import { Contact } from "../sections/Contact";

type IconType = ComponentType<{ size?: number; className?: string }>;

const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const SKILL_ICON: Record<string, IconType> = {
  "UX Design": Layers, "UI Design": PenTool, "Interaction Design": MousePointer2,
  "Design Systems": Component, "Wireframing": PencilRuler, "Prototyping": MousePointerClick,
  "Accessibility": Accessibility, "User Research": Search, "Usability Testing": ClipboardCheck,
  "Information Architecture": Network, "Journey Mapping": Route,
  "Figma": PenTool, "FigJam": Shapes, "Adobe CC": Palette, "Maze": FlaskConical, "Miro": StickyNote,
};
const GROUP_ICON: Record<string, IconType> = { "Product Design": Layers, "Research": Microscope, "Tools": Palette };
const PRINCIPLE_ICON: Record<string, IconType> = { "01": Eye, "02": Target, "03": Microscope, "04": Blocks };

// ── Ambient background primitives ────────────────────────────────────────────

function Particles({ count = 9 }: { count?: number }) {
  const reduced = useReducedMotion();
  const dots = useMemo(
    () => Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 3 + Math.random() * 4,
      delay: Math.random() * 6,
      dur: 6 + Math.random() * 6,
    })),
    [count]
  );
  if (reduced) return null;
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary/40 blur-[1px]"
          style={{
            left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size,
            animation: `twinkle ${d.dur}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Layered radial mesh + grid + grain + floating blobs. Reduced-motion aware. */
function Ambient({ reduced }: { reduced: boolean }) {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* blobs */}
      <div className="absolute -top-24 -left-24 w-[42vw] h-[42vw] rounded-full blur-[120px] opacity-40"
        style={{ background: "radial-gradient(circle, var(--primary), transparent 62%)", animation: reduced ? undefined : "aurora 20s ease-in-out infinite" }} />
      <div className="absolute top-1/3 -right-24 w-[38vw] h-[38vw] rounded-full blur-[130px] opacity-30"
        style={{ background: "radial-gradient(circle, #9186F2, transparent 62%)", animation: reduced ? undefined : "aurora 26s ease-in-out infinite reverse" }} />
      {/* gradient mesh */}
      <div className="absolute inset-0 opacity-[0.5]"
        style={{ background: "radial-gradient(60% 50% at 20% 10%, var(--accent-soft), transparent 60%), radial-gradient(50% 40% at 85% 30%, var(--accent-soft), transparent 60%)" }} />
      {/* animated grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          animation: reduced ? undefined : "grid-pan 30s linear infinite",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 40%, transparent 80%)",
        }} />
      {/* grain */}
      <div className="absolute inset-0 opacity-[0.3] mix-blend-soft-light" style={{ backgroundImage: `url("${GRAIN}")`, backgroundSize: "180px" }} />
      <Particles />
    </div>
  );
}

// A large faded word behind a section heading, for editorial depth.
function GhostWord({ children }: { children: string }) {
  return (
    <span aria-hidden className="pointer-events-none select-none absolute -top-8 md:-top-10 left-0 font-serif font-bold text-foreground/[0.03] leading-none"
      style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}>
      {children}
    </span>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────

// Outline CTA — transparent, not filled (matches the "View Work" style on the hero).
const resumeOutlineClass =
  "group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border bg-transparent text-foreground text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-muted/40 active:translate-y-0";

function ResumeButton() {
  const url = PROFILE.resumeUrl;
  const inner = (
    <>
      <Download size={15} className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0.5" />
      Download Resume
    </>
  );
  if (!url) {
    return (
      <button title="Resume — coming soon" aria-disabled="true" className={`${resumeOutlineClass} cursor-default`}>
        {inner}
      </button>
    );
  }
  return (
    <a href={url} download className={resumeOutlineClass}>
      {inner}
    </a>
  );
}

function AboutHero() {
  const reduced = useReducedMotion();
  const glowRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  // Mouse-reactive glow across the hero.
  const onHeroMove = (e: React.MouseEvent) => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const g = glowRef.current;
    if (!g || raf.current) return;
    const x = e.clientX, y = e.clientY;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const r = g.getBoundingClientRect();
      g.style.setProperty("--mx", `${x - r.left}px`);
      g.style.setProperty("--my", `${y - r.top}px`);
    });
  };

  // Portrait cursor tilt + parallax.
  const onPortraitMove = (e: React.MouseEvent) => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    el.style.transform = `perspective(900px) rotateY(${(px * 6).toFixed(2)}deg) rotateX(${(-py * 6).toFixed(2)}deg) translate3d(${(px * 6).toFixed(1)}px, ${(py * 6).toFixed(1)}px, 0) scale(1.04)`;
  };
  const onPortraitLeave = () => {
    const el = tiltRef.current;
    if (el) el.style.transform = "perspective(900px) rotateY(0) rotateX(0) translate3d(0,0,0) scale(1)";
  };

  return (
    <header onMouseMove={onHeroMove} className="relative pt-32 pb-24 md:pt-40 md:pb-28 overflow-hidden">
      <Ambient reduced={reduced} />
      <div ref={glowRef} aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(480px circle at var(--mx, 70%) var(--my, 30%), var(--accent-soft), transparent 70%)" }} />

      <Container>
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.82fr] gap-14 lg:gap-16 items-center">
          {/* Copy */}
          <div className="flex flex-col gap-7 order-2 lg:order-1">
            <Reveal><SectionLabel>About</SectionLabel></Reveal>
            <Reveal delay={60}>
              <h1 className="font-serif font-bold text-foreground leading-[1.0] tracking-tight" style={{ fontSize: "clamp(3rem, 6.5vw, 5.25rem)" }}>
                {PROFILE.role}
              </h1>
            </Reveal>
            {ABOUT_INTRO.map((p, i) => (
              <Reveal key={i} delay={120 + i * 70}>
                <p className={`leading-relaxed text-pretty max-w-xl ${i === 0 ? "text-lg md:text-xl text-foreground/90" : "text-muted-foreground"}`}>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={340}>
              <div className="pt-2"><ResumeButton /></div>
            </Reveal>
          </div>

          {/* Portrait */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div
              onMouseMove={onPortraitMove}
              onMouseLeave={onPortraitLeave}
              className="group relative"
              style={{ perspective: "900px" }}
            >
              {/* blurred gradient glow behind */}
              <div aria-hidden className="absolute -inset-8 rounded-[3rem] blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-90"
                style={{ background: "radial-gradient(circle at 50% 35%, var(--primary), transparent 62%)" }} />
              {/* floating blobs behind portrait */}
              <div aria-hidden className="absolute -top-10 -right-8 w-32 h-32 rounded-full blur-2xl opacity-50"
                style={{ background: "radial-gradient(circle, var(--accent), transparent 65%)", animation: reduced ? undefined : "float 9s ease-in-out infinite" }} />
              <div aria-hidden className="absolute -bottom-10 -left-8 w-36 h-36 rounded-full blur-2xl opacity-40"
                style={{ background: "radial-gradient(circle, #9186F2, transparent 65%)", animation: reduced ? undefined : "float 12s ease-in-out infinite reverse" }} />
              {/* rotating ring */}
              <div aria-hidden className="absolute -inset-5 rounded-[2.6rem] border border-border/50"
                style={{ animation: reduced ? undefined : "spin-slow 70s linear infinite" }} />

              {/* Tilting frame */}
              <div ref={tiltRef} className="relative transition-transform duration-500 ease-out will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                {/* subtle soft border glow */}
                <div aria-hidden className="absolute -inset-px rounded-[2.2rem] opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                  style={{ background: "radial-gradient(circle at 50% 0%, var(--primary), transparent 60%)", filter: "blur(12px)" }} />
                <div className="relative w-[280px] sm:w-[340px] lg:w-[380px] aspect-[4/5] rounded-[2.2rem] overflow-hidden border border-border shadow-soft-lg bg-gradient-to-br from-primary/20 via-muted to-accent/5 transition-shadow duration-500 group-hover:shadow-[0_24px_60px_-24px_rgba(91,63,232,0.25)]">
                  <img
                    src="/portrait.jpg"
                    alt={`${PROFILE.name} — ${PROFILE.role}`}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 group-hover:brightness-110 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-background/85 backdrop-blur-md border border-border/60 transition-transform duration-500 group-hover:-translate-y-0.5">
                    <div className="font-serif text-base font-bold text-foreground leading-none">{PROFILE.name}</div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" style={{ animation: "pulse-ring 2s cubic-bezier(0,0,0.2,1) infinite" }} />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                      </span>
                      Available for new projects
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

// ── Experience timeline ──────────────────────────────────────────────────────

function Experience() {
  return (
    <section className="relative py-28 border-t border-border bg-muted/20 overflow-hidden">
      <Container>
        <div className="relative">
          <GhostWord>Journey</GhostWord>
          <Reveal><SectionLabel>Experience</SectionLabel></Reveal>
          <Reveal delay={60}>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-4 mb-14 tracking-tight">Where I&apos;ve made an impact.</h2>
          </Reveal>
        </div>

        <div className="relative">
          {/* Soft connector line */}
          <div aria-hidden className="absolute left-[7px] top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

          <div className="flex flex-col gap-5">
            {EXPERIENCE.map((item, i) => (
              <Reveal key={item.company} variant="fade-up" delay={i * 90}>
                <div className="group relative pl-10">
                  {/* Node */}
                  <span aria-hidden className="absolute left-0 top-8 grid place-items-center w-[15px] h-[15px] rounded-full bg-background ring-1 ring-border">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70 transition-transform duration-300 group-hover:scale-150" />
                  </span>
                  {/* Card */}
                  <div className="rounded-3xl border border-border bg-card p-6 md:p-7 shadow-soft-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg hover:border-foreground/15">
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                      {/* Fixed-height box + object-contain: every logo lands on the same
                          baseline at the same cap-height, whatever its native ratio.
                          Brand colours in light; inverted to white in dark (as the AI wall). */}
                      <span className="inline-flex items-center h-7">
                        <img
                          src={item.logo}
                          alt={item.company}
                          loading="lazy"
                          className="h-[17px] sm:h-[19px] w-auto max-w-[136px] object-contain object-left opacity-90 dark:brightness-0 dark:invert dark:opacity-90"
                        />
                      </span>
                      <span className="font-mono text-xs text-muted-foreground tracking-wide">{item.period}</span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground mt-4">{item.role}</h3>
                    <p className="text-[15px] text-muted-foreground leading-relaxed max-w-2xl mt-2">{item.impact}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ── Skills ───────────────────────────────────────────────────────────────────

function SkillCard({ title, items, index }: { title: string; items: string[]; index: number }) {
  const GroupIcon = GROUP_ICON[title] ?? Sparkles;
  return (
    <Reveal variant="fade-up" delay={index * 90}>
      <div className="group h-full rounded-3xl border border-border bg-card p-6 flex flex-col gap-5 shadow-soft-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-md hover:border-foreground/15 hover:bg-muted/20">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
            <GroupIcon size={16} />
          </span>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => {
            const Icon = SKILL_ICON[item] ?? Sparkles;
            return (
              <span key={item} className="group/chip inline-flex items-center gap-1.5 pl-2 pr-3 py-1.5 text-xs font-medium rounded-full bg-background border border-border text-foreground/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:text-foreground">
                <Icon size={12} className="text-muted-foreground transition-transform duration-200 group-hover/chip:scale-110" />
                {item}
              </span>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

function Skills() {
  return (
    <section className="relative py-28 border-t border-border overflow-hidden">
      <Container>
        <div className="relative">
          <GhostWord>Craft</GhostWord>
          <Reveal><SectionLabel>Skills</SectionLabel></Reveal>
          <Reveal delay={60}>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-4 mb-12 tracking-tight">Craft &amp; toolkit.</h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((group, gi) => (
            <SkillCard key={group.title} title={group.title} items={group.items} index={gi} />
          ))}
        </div>

        {/* AI Workflow — brand logo wall (original colours in light, solid white in dark) */}
        <Reveal variant="fade-up" delay={120}>
          <div className="mt-5 rounded-3xl border border-border bg-card shadow-soft-sm overflow-hidden">
            <div className="flex items-center gap-2.5 px-6 md:px-8 pt-6 md:pt-8 pb-5">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-primary/10 text-primary"><Sparkles size={16} /></span>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">AI Workflow</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-border">
              {AI_LOGOS.map((logo, i) => (
                <div
                  key={logo.name}
                  title={logo.name}
                  className={`group grid place-items-center min-h-[104px] px-6 py-8 border-border transition-colors duration-300 hover:bg-muted/40
                    border-b [&:nth-last-child(-n+2)]:sm:border-b-0 sm:[&:nth-child(7)]:border-b-0 sm:[&:nth-child(8)]:border-b-0
                    ${i % 2 === 0 ? "border-r" : ""} sm:border-r sm:[&:nth-child(4n)]:border-r-0`}
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    loading="lazy"
                    className="max-h-7 w-auto max-w-[68%] object-contain opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-[1.06] dark:brightness-0 dark:invert dark:opacity-85 dark:group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// ── Design principles ────────────────────────────────────────────────────────

function Principles() {
  return (
    <section className="relative py-28 border-t border-border bg-muted/20 overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div aria-hidden className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[62vw] h-[42vh] rounded-full blur-[130px] opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 70%)" }} />
      <Container>
        <div className="relative">
          <GhostWord>Beliefs</GhostWord>
          <Reveal><SectionLabel>Design principles</SectionLabel></Reveal>
          <Reveal delay={60}>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-4 tracking-tight">What guides every decision.</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed text-pretty">
              Four checks I keep coming back to — the ones that keep the work honest, focused, and easy to trust.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {DESIGN_PRINCIPLES.map((p, i) => {
            const Icon = PRINCIPLE_ICON[p.n] ?? Sparkles;
            return (
              <Reveal key={p.n} variant="fade-up" delay={i * 90}>
                <div
                  className="group relative h-full rounded-[1.75rem] border border-border overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-soft-xl"
                  style={{ background: "linear-gradient(157deg, color-mix(in srgb, var(--card) 100%, transparent), color-mix(in srgb, var(--card) 78%, transparent))" }}
                >
                  {/* top gloss highlight */}
                  <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.07] to-transparent pointer-events-none" />
                  {/* hover glow */}
                  <div aria-hidden className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 70%)" }} />
                  {/* sheen sweep on hover */}
                  <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -inset-y-4 -left-1/3 w-1/4 bg-gradient-to-r from-transparent via-white/[0.10] to-transparent opacity-0 group-hover:opacity-100 group-hover:[animation:sheen_1s_ease]" />
                  </div>

                  <div className="relative p-7 md:p-8 flex flex-col gap-5">
                    <div className="flex items-start justify-between">
                      {/* glossy icon medallion */}
                      <span
                        className="relative grid place-items-center w-14 h-14 rounded-2xl text-primary shadow-soft-md transition-transform duration-500 group-hover:scale-105"
                        style={{ background: "linear-gradient(145deg, color-mix(in srgb, var(--primary) 24%, transparent), color-mix(in srgb, var(--primary) 6%, transparent))" }}
                      >
                        <span aria-hidden className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/15" />
                        <span aria-hidden className="absolute inset-x-2.5 top-1.5 h-3 rounded-full bg-white/25 blur-[3px]" />
                        <Icon size={24} className="relative" />
                      </span>
                      {/* large glossy number */}
                      <span
                        className="font-serif text-5xl md:text-6xl font-bold leading-none bg-clip-text text-transparent select-none"
                        style={{ backgroundImage: "linear-gradient(180deg, color-mix(in srgb, var(--primary) 38%, transparent), color-mix(in srgb, var(--primary) 7%, transparent))" }}
                      >
                        {p.n}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug">{p.title}</h3>
                      <p className="text-[15px] text-muted-foreground leading-relaxed mt-2.5">{p.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function AboutPage() {
  return (
    <div>
      <AboutHero />
      <Experience />
      <Skills />
      <Principles />
      <Contact />
    </div>
  );
}
