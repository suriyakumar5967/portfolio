import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

/**
 * Floating "Let's connect" CTA — fixed bottom-right, visible on every page.
 * Hidden (via IntersectionObserver) whenever the Contact section is in view,
 * and reappears with a fade + scale once the user scrolls away from it.
 * Re-attaches the observer on each route change via `routeKey`.
 */
export function FloatingConnect({ routeKey, onClick }: { routeKey: string; onClick: () => void }) {
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById("contact");
    // Pages without a Contact section (e.g. case studies) → always show.
    if (!el) { setContactVisible(false); return; }
    const obs = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [routeKey]);

  return (
    <button
      onClick={onClick}
      aria-label="Let's connect"
      aria-hidden={contactVisible}
      tabIndex={contactVisible ? -1 : 0}
      className={`fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 pl-4 pr-5 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-soft-lg ring-1 ring-inset ring-white/10 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-0.5 hover:shadow-soft-xl ${
        contactVisible ? "opacity-0 scale-90 translate-y-2 pointer-events-none" : "opacity-100 scale-100 translate-y-0"
      }`}
    >
      <MessageCircle size={16} />
      Let&apos;s connect
    </button>
  );
}
