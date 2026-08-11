import { useRef, type ComponentType } from "react";
import {
  Download, Sparkles, Layers, PenTool, MousePointer2, Component, PencilRuler,
  MousePointerClick, Accessibility, Search, ClipboardCheck, Network, Route,
  Shapes, Palette, FlaskConical, StickyNote, Eye, Target, Microscope, Blocks,
} from "lucide-react";
import { PROFILE, EXPERIENCE, SKILL_GROUPS, AI_LOGOS, DESIGN_PRINCIPLES } from "../lib/content";
import { Reveal, useReducedMotion } from "../lib/motion";
import { SectionLabel, Container } from "../ui";
import { Contact } from "../sections/Contact";

type IconType = ComponentType<{ size?: number; className?: string }>;

const SKILL_ICON: Record<string, IconType> = {
  "UX Design": Layers, "UI Design": PenTool, "Interaction Design": MousePointer2,
  "Design Systems": Component, "Wireframing": PencilRuler, "Prototyping": MousePointerClick,
  "Accessibility": Accessibility, "User Research": Search, "Usability Testing": ClipboardCheck,
  "Information Architecture": Network, "Journey Mapping": Route,
  "Figma": PenTool, "FigJam": Shapes, "Adobe CC": Palette, "Maze": FlaskConical, "Miro": StickyNote,
};
const GROUP_ICON: Record<string, IconType> = { "Product Design": Layers, "Research": Microscope, "Tools": Palette };
const PRINCIPLE_ICON: Record<string, IconType> = { "01": Eye, "02": Target, "03": Microscope, "04": Blocks };

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

  return (
    <header onMouseMove={onHeroMove} className="relative flex items-center min-h-[100svh] pt-28 pb-14 md:pt-24 md:pb-16 overflow-hidden">
      {/* Dotted field — the calm, editorial backdrop from the reference. Theme-aware. */}
      <div aria-hidden className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "radial-gradient(color-mix(in srgb, var(--foreground) 13%, transparent) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 90% 80% at 25% 15%, black 35%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 25% 15%, black 35%, transparent 85%)",
        }} />
      {/* Soft accent glow behind the portrait side. */}
      <div aria-hidden className="absolute -z-10 top-0 right-0 w-[46vw] h-[70vh] rounded-full blur-[130px] opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 70%)" }} />
      <div ref={glowRef} aria-hidden className="absolute inset-0 -z-10 pointer-events-none"
        style={{ background: "radial-gradient(460px circle at var(--mx, 75%) var(--my, 25%), var(--accent-soft), transparent 70%)" }} />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-stretch w-full py-6 md:py-8">
          {/* Copy */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <Reveal delay={40}>
              <h1 className="font-serif font-bold text-foreground leading-[1.06] tracking-tight" style={{ fontSize: "clamp(1.85rem, 3.6vw, 2.85rem)" }}>
                Hello, I&apos;m <span className="text-primary">Suriya Kumar J</span>.
                <br className="hidden sm:block" /> I design products for
                <br className="hidden sm:block" /> complex problems.
              </h1>
            </Reveal>

            {/* Vertical label + intro copy — mirrors the reference structure. */}
            <div className="mt-7 flex gap-5 md:gap-7">
              {/* Rotated "ABOUT" label with a descending rule */}
              <Reveal delay={120} className="hidden sm:flex flex-col items-center shrink-0 pt-1">
                <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  About me
                </span>
                <span aria-hidden className="mt-4 w-px flex-1 bg-gradient-to-b from-border to-transparent" />
              </Reveal>

              <div className="flex flex-col gap-3.5">
                <Reveal delay={160}>
                  <p className="text-[15px] md:text-base leading-relaxed text-foreground/90 text-pretty max-w-xl">
                    I&apos;m a Senior Product Designer with 5+ years of experience across fintech, enterprise SaaS, and capital markets.
                  </p>
                </Reveal>
                <Reveal delay={220}>
                  <p className="text-sm md:text-[15px] leading-relaxed text-muted-foreground text-pretty max-w-xl">
                    I&apos;ve designed everything from trading and reporting workflows to reconciliation, collections, and AI-powered operational tools — often taking products from 0→1 and simplifying complex, data-heavy systems.
                  </p>
                </Reveal>
                <Reveal delay={280}>
                  <p className="text-sm md:text-[15px] leading-relaxed text-muted-foreground text-pretty max-w-xl">
                    Beyond the interface, I work closely with product to shape requirements, define scope, and turn messy problems into products that make sense.
                  </p>
                </Reveal>

                <Reveal delay={340}>
                  <div className="pt-3">
                    <ResumeButton />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Portrait — responsive panel: fixed ratio on small screens, fills the
              column height on desktop. Branded overlay works in both themes. */}
          <div className="order-1 lg:order-2">
            <Reveal variant="scale" delay={80} className="h-full">
              <div className="group relative w-full h-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[280px] lg:min-h-[460px] rounded-[2rem] overflow-hidden border border-border shadow-soft-xl bg-gradient-to-br from-primary/20 via-muted to-accent/10">
                <img
                  src="/portrait.jpg"
                  alt={`${PROFILE.name} — ${PROFILE.role}`}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                  className="absolute inset-0 w-full h-full object-cover object-center sm:object-[center_18%] transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
                {/* Brand tint + legibility scrim — keeps the badge readable in both themes. */}
                <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-primary/25 via-transparent to-accent/10 mix-blend-soft-light" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                {/* Status badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-auto p-4 rounded-2xl bg-background/85 backdrop-blur-md border border-border/60 transition-transform duration-500 group-hover:-translate-y-0.5">
                  <div className="font-serif text-base font-bold text-foreground leading-none">{PROFILE.name}</div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" style={{ animation: reduced ? undefined : "pulse-ring 2s cubic-bezier(0,0,0.2,1) infinite" }} />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    {PROFILE.available ? "Available for new projects" : PROFILE.location}
                  </div>
                </div>
              </div>
            </Reveal>
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
  // Desktop corner positions for the orbital layout (mobile falls back to a grid).
  const cornerPos = [
    "lg:top-0 lg:left-0",
    "lg:top-0 lg:right-0",
    "lg:bottom-0 lg:left-0",
    "lg:bottom-0 lg:right-0",
  ];
  return (
    <section className="relative py-28 border-t border-border bg-muted/20 overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52vw] h-[42vh] rounded-full blur-[140px] opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 70%)" }} />

      <Container>
        <Reveal className="text-center"><SectionLabel>Design principles</SectionLabel></Reveal>

        {/* Orbital field — dashed rings + central statement + four corner cards */}
        <div className="relative mt-10 lg:mt-6 lg:h-[720px]">
          {/* Concentric dashed rings (desktop only) */}
          <div aria-hidden className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {[360, 540, 720].map((d, i) => (
              <div
                key={d}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
                style={{ width: d, height: d, borderColor: `color-mix(in srgb, var(--foreground) ${18 - i * 5}%, transparent)` }}
              />
            ))}
          </div>

          {/* Central statement */}
          <Reveal variant="fade" className="relative z-10 mb-10 text-center lg:mb-0 lg:absolute lg:inset-0 lg:grid lg:place-items-center">
            <div className="mx-auto max-w-[220px] sm:max-w-sm lg:max-w-[360px] px-2">
              <h2 className="font-serif text-2xl md:text-3xl font-bold leading-[1.2] tracking-tight text-balance">
                What guides every decision.
              </h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed mt-4 text-pretty">
                Four checks I keep coming back to — the ones that keep the work honest, focused, and easy to trust.
              </p>
            </div>
          </Reveal>

          {/* Cards — grid on mobile, absolute corners on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:block">
            {DESIGN_PRINCIPLES.map((p, i) => (
              <Reveal key={p.n} variant="fade-up" delay={i * 90} className={`lg:absolute lg:w-[358px] ${cornerPos[i]}`}>
                <div className="group relative h-full rounded-3xl border border-border bg-card p-7 md:p-8 shadow-soft-lg transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-foreground/20 hover:shadow-soft-xl">
                  {/* numbered badge — inverts with theme */}
                  <span className="absolute top-6 right-6 grid place-items-center w-11 h-11 rounded-full bg-foreground text-background text-[13px] font-bold font-mono">
                    {p.n}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-foreground leading-snug pr-14">{p.title}</h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed mt-7 md:mt-9">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
