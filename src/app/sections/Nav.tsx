import { useState, useEffect, type CSSProperties } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import SkSvg from "@/imports/SkSvg1/index";
import avatar from "@/assets/avatar.png";
import { PROFILE } from "../lib/content";
import { useScrollProgress, useScrollSpy } from "../lib/motion";
import { ThemeToggle } from "./ThemeToggle";

export function Nav({
  dark, onToggleTheme, onHome, onAbout, onSection, view,
}: {
  dark: boolean;
  onToggleTheme: () => void;
  onHome: () => void;
  onAbout: () => void;
  onSection: (id: string) => void;
  view: "home" | "about" | "case";
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useScrollProgress();

  // Nav floats transparently over the hero, then settles into glass on scroll.
  // On content pages (about/case) it stays solid so it never clashes with content.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; setScrolled(window.scrollY > 12); });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  const solid = view !== "home" || scrolled || open;
  // Include "hero" so nothing is highlighted on the landing section — "Work"
  // only activates once the case-studies section is actually in view.
  const spy = useScrollSpy(view === "home" ? ["hero", "work", "contact"] : []);
  const resumeUrl = PROFILE.resumeUrl;
  const logoFill = dark ? "#F2EFE8" : "#08083A";

  const activeId =
    view === "about" ? "about" : view === "home" ? spy : "";

  const items: { id: string; label: string; onClick: () => void }[] = [
    { id: "about", label: "About", onClick: () => { onAbout(); setOpen(false); } },
    { id: "work", label: "Work", onClick: () => { onSection("work"); setOpen(false); } },
  ];

  const pillBase = "relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap";

  const ResumeLink = ({ mobile = false }: { mobile?: boolean }) =>
    resumeUrl ? (
      <a
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setOpen(false)}
        className={mobile
          ? "inline-flex items-center gap-1.5 px-3 py-3 text-base font-medium rounded-xl hover:bg-muted transition-colors"
          : `${pillBase} inline-flex items-center gap-1 text-muted-foreground hover:text-foreground`}
      >
        Resume <ArrowUpRight size={mobile ? 15 : 13} />
      </a>
    ) : mobile ? (
      <span className="inline-flex items-center gap-1.5 px-3 py-3 text-base font-medium text-muted-foreground/60">
        Resume <ArrowUpRight size={15} /> <span className="text-xs">(soon)</span>
      </span>
    ) : (
      <button
        type="button"
        title="Resume — coming soon"
        aria-disabled="true"
        onClick={() => {}}
        className={`${pillBase} inline-flex items-center gap-1 text-muted-foreground/60 hover:text-muted-foreground cursor-default`}
      >
        Resume <ArrowUpRight size={13} />
      </button>
    );

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className={`transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ease-out border-b ${
        solid
          ? "bg-background/70 backdrop-blur-xl border-border shadow-soft-sm"
          : "bg-transparent backdrop-blur-0 border-transparent shadow-none"
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-[64px] flex items-center justify-between gap-4">
          {/* Left — logo (SK mark → avatar droplet reveal on hover/press) */}
          <button
            onClick={onHome}
            aria-label={`${PROFILE.name} — home`}
            className="logo-swap group relative flex-shrink-0 w-8 h-8 rounded-full"
          >
            <span className="logo-mark absolute inset-0 grid place-items-center" style={{ "--fill-0": logoFill } as CSSProperties}>
              <span className="block w-8 h-8">
                <SkSvg />
              </span>
            </span>
            <img
              src={avatar}
              alt=""
              aria-hidden
              className="logo-avatar absolute inset-0 w-8 h-8 rounded-full object-cover"
            />
          </button>

          {/* Right — pill group + theme toggle (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-0.5 p-1 rounded-full border border-border bg-muted/50">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  aria-current={activeId === item.id ? "true" : undefined}
                  className={`${pillBase} ${activeId === item.id ? "bg-foreground text-background shadow-soft-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {item.label}
                </button>
              ))}
              <ResumeLink />
            </div>

            <ThemeToggle dark={dark} onToggle={onToggleTheme} />
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle dark={dark} onToggle={onToggleTheme} />
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={open}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Scroll progress */}
        <div className="h-px w-full bg-transparent">
          <div className="h-px bg-primary origin-left transition-transform duration-150 ease-out" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-b border-border bg-background/98 backdrop-blur-xl animate-[slide-down_0.2s_ease]">
          <div className="px-6 py-5 flex flex-col gap-1">
            {items.map((item) => (
              <button key={item.id} onClick={item.onClick} className="text-left px-3 py-3 text-base font-medium rounded-xl hover:bg-muted transition-colors">
                {item.label}
              </button>
            ))}
            <ResumeLink mobile />
          </div>
        </div>
      )}
    </nav>
  );
}
