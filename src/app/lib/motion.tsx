import {
  useState, useEffect, useRef, useCallback,
  type ReactNode, type CSSProperties, type ElementType,
} from "react";

// ─── prefers-reduced-motion ──────────────────────────────────────────────────

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

// ─── In-view detection ───────────────────────────────────────────────────────

export function useInView<T extends HTMLElement = HTMLDivElement>(
  { threshold = 0.15, once = true, rootMargin = "0px 0px -8% 0px" } = {}
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once, rootMargin]);
  return { ref, inView };
}

// ─── Reveal wrapper ──────────────────────────────────────────────────────────

type Variant = "fade-up" | "fade" | "blur" | "scale";

const OFFSCREEN: Record<Variant, string> = {
  "fade-up": "opacity-0 translate-y-6",
  fade: "opacity-0",
  blur: "opacity-0 blur-md translate-y-3",
  scale: "opacity-0 scale-[0.97]",
};

export function Reveal({
  children,
  as: Tag = "div",
  variant = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
  once = true,
  style,
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  style?: CSSProperties;
  [key: string]: unknown;
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ once });
  const show = reduced || inView;
  return (
    <Tag
      ref={ref}
      className={`will-change-[opacity,transform] transition-all ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        show ? "opacity-100 blur-0 translate-y-0 scale-100" : OFFSCREEN[variant]
      } ${className}`}
      style={{ transitionDelay: `${show ? delay : 0}ms`, transitionDuration: `${duration}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ─── Scroll progress (0..1) ──────────────────────────────────────────────────

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0);
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return progress;
}

// ─── Scroll spy (active section id) ──────────────────────────────────────────

export function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    if (!ids.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      // Nothing is active until a section's top has passed the offset line
      // (so the hero/landing area highlights no nav item).
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      // near the bottom → force last section active
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids.join("|"), offset]);
  return active;
}

// ─── Parallax (translateY on scroll) ─────────────────────────────────────────

export function Parallax({
  children, speed = 0.12, className = "", style,
}: { children: ReactNode; speed?: number; className?: string; style?: CSSProperties }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const centre = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-centre * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed, reduced]);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

// ─── Magnetic pointer effect (fine pointers only) ────────────────────────────

export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const onMove = useCallback((e: React.MouseEvent) => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  }, [strength, reduced]);
  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  }, []);
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}
