import { Moon, Sun } from "lucide-react";

/**
 * Theme switch — sliding pill with Moon (dark) / Sun (light) states.
 * The thumb uses foreground-on-background, so it stays high-contrast in both themes.
 * OFF (thumb left, moon) = dark · ON (thumb right, sun) = light.
 */
export function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={!dark}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={onToggle}
      className="group relative inline-flex h-8 w-[58px] shrink-0 items-center rounded-full border border-border bg-muted/70 px-1 transition-colors duration-300 hover:bg-muted"
    >
      {/* faint state markers */}
      <Moon size={13} aria-hidden className="absolute left-[9px] text-muted-foreground/55" />
      <Sun size={13} aria-hidden className="absolute right-[9px] text-muted-foreground/55" />

      {/* sliding thumb (carries the active icon) */}
      <span
        className={`relative z-10 grid h-6 w-6 place-items-center rounded-full bg-foreground text-background shadow-soft-sm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-soft-md group-active:scale-90 ${
          dark ? "translate-x-0" : "translate-x-[26px]"
        }`}
      >
        {dark ? <Moon size={13} /> : <Sun size={13} />}
      </span>
    </button>
  );
}
