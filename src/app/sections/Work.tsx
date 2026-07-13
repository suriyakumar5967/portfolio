import { useState } from "react";
import { ArrowUpRight, Clock, Users, Briefcase } from "lucide-react";
import { CASE_STUDIES, type CaseStudySummary } from "../case-studies";
import { Reveal } from "../lib/motion";
import { SectionLabel, Container } from "../ui";

function WorkCard({ cs, index, onOpen }: { cs: CaseStudySummary; index: number; onOpen: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <Reveal variant="fade-up" delay={index * 90} duration={800}>
      <article
        role="button"
        tabIndex={0}
        aria-label={`View ${cs.title} case study`}
        onClick={onOpen}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group relative flex flex-col h-full bg-card border border-border rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft-xl hover:border-primary/30"
      >
        {/* Cover */}
        <div className="relative h-56 overflow-hidden bg-muted flex-shrink-0">
          <img
            src={cs.image}
            alt={`${cs.title} — ${cs.subtitle}`}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-[900ms] ease-out ${hover ? "scale-105" : "scale-100"}`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent transition-opacity duration-300 ${hover ? "opacity-100" : "opacity-70"}`} />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-semibold border border-border/50">{cs.industry}</span>
          </div>
          <div className={`absolute bottom-4 right-4 flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-full text-xs font-semibold shadow-lg transition-all duration-300 ${hover ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            View case study <ArrowUpRight size={13} />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 p-6 flex-1">
          <div>
            <h3 className="font-serif text-2xl font-bold text-foreground leading-tight">{cs.title}</h3>
            <p className="text-sm text-primary font-medium mt-0.5">{cs.subtitle}</p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{cs.summary}</p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Briefcase size={11} /> {cs.role}</span>
            <span className="inline-flex items-center gap-1.5"><Clock size={11} /> {cs.timeline}</span>
            {cs.team && <span className="inline-flex items-center gap-1.5"><Users size={11} /> {cs.team}</span>}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border mt-auto">
            {cs.skills.map((s) => (
              <span key={s} className="px-2.5 py-1 text-xs text-muted-foreground bg-muted rounded-lg">{s}</span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Work({ onOpenCase }: { onOpenCase: (slug: string) => void }) {
  return (
    <section id="work" className="py-28 border-t border-border">
      <Container wide>
        <div className="mb-14">
          <Reveal><SectionLabel>Selected work</SectionLabel></Reveal>
          <Reveal delay={60}>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold leading-tight mt-4">Case studies</h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CASE_STUDIES.map((cs, i) => (
            <WorkCard key={cs.id} cs={cs} index={i} onOpen={() => onOpenCase(cs.slug)} />
          ))}
        </div>
      </Container>
    </section>
  );
}
