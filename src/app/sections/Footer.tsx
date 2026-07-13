import { type CSSProperties } from "react";
import { ArrowUp } from "lucide-react";
import SkSvg from "@/imports/SkSvg1/index";
import { PROFILE } from "../lib/content";

export function Footer({ dark, onNav, onAbout, onTop }: { dark: boolean; onNav: (id: string) => void; onAbout: () => void; onTop: () => void }) {
  const logoFill = dark ? "#F0EDE4" : "#08083A";
  const items: { label: string; onClick: () => void }[] = [
    { label: "About", onClick: onAbout },
    { label: "Work", onClick: () => onNav("work") },
    { label: "Contact", onClick: () => onNav("contact") },
  ];
  return (
    <footer className="border-t border-border py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <span className="block w-7 h-7" style={{ "--fill-0": logoFill } as CSSProperties}>
            <SkSvg />
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} {PROFILE.name} · Built with care
          </span>
        </div>

        <div className="flex items-center gap-6">
          {items.map((item) => (
            <button key={item.label} onClick={item.onClick} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {item.label}
            </button>
          ))}
          <button
            onClick={onTop}
            aria-label="Back to top"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
