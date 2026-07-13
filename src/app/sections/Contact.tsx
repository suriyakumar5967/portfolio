import { Mail, Linkedin, Github, Twitter, ArrowUpRight } from "lucide-react";
import type { ComponentType } from "react";
import { PROFILE } from "../lib/content";
import { Reveal } from "../lib/motion";
import { SectionLabel } from "../ui";

function Social({ href, label, Icon }: { href: string; label: string; Icon: ComponentType<{ size?: number }> }) {
  const active = !!href;
  const base = "group w-12 h-12 rounded-full border border-border flex items-center justify-center transition-all duration-300";
  if (!active) {
    return (
      <span
        title={`${label} — coming soon`}
        aria-label={`${label}, coming soon`}
        className={`${base} text-muted-foreground/40 cursor-default`}
      >
        <Icon size={18} />
      </span>
    );
  }
  const external = label !== "Email";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={label}
      className={`${base} text-muted-foreground hover:text-primary-foreground hover:bg-primary hover:border-primary hover:-translate-y-1 hover:shadow-soft-md`}
    >
      <Icon size={18} />
    </a>
  );
}

export function Contact() {
  const { email, socials } = PROFILE;
  const links = [
    { label: "Email", href: `mailto:${email}`, Icon: Mail },
    { label: "LinkedIn", href: socials.linkedin, Icon: Linkedin },
    { label: "GitHub", href: socials.github, Icon: Github },
    { label: "X", href: socials.x, Icon: Twitter },
  ];

  return (
    <section id="contact" className="relative py-32 border-t border-border overflow-hidden">
      {/* Soft accent glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[70vw] h-[40vh] rounded-full blur-[120px] opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 70%)" }}
      />

      <div className="relative max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-8">
        <Reveal variant="fade">
          <SectionLabel>Contact</SectionLabel>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="font-serif text-4xl md:text-6xl font-bold leading-[1.05] text-balance">
            Let&apos;s build something{" "}
            <em
              className="italic font-normal bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(100deg, var(--primary), #b7abff, var(--primary))" }}
            >
              clear
            </em>{" "}
            together.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg text-pretty">
            Have a complex product problem, or just want to talk design? My inbox is open — I usually reply within a day.
          </p>
        </Reveal>

        {/* Email */}
        <Reveal delay={180}>
          <a
            href={`mailto:${email}`}
            className="group inline-flex items-center gap-2 text-foreground"
          >
            <span className="font-serif text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-all duration-500 group-hover:bg-[length:100%_2px]">
              {email}
            </span>
            <ArrowUpRight size={22} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </a>
        </Reveal>

        {/* Socials */}
        <Reveal delay={240}>
          <div className="flex items-center gap-3">
            {links.map((l) => (
              <Social key={l.label} href={l.href} label={l.label} Icon={l.Icon} />
            ))}
          </div>
        </Reveal>

        {/* Availability */}
        <Reveal delay={300}>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-muted/40 font-mono text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" style={{ animation: "pulse-ring 2s cubic-bezier(0,0,0.2,1) infinite" }} />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Available for new projects
          </div>
        </Reveal>
      </div>
    </section>
  );
}
