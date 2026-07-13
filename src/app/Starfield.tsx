import { useMemo, type CSSProperties } from "react";
import { useReducedMotion } from "./lib/motion";

// Build a big box-shadow string of white dots scattered across a 2000x2000 field.
function shadows(count: number) {
  let out = "";
  for (let i = 0; i < count; i++) {
    if (i) out += ",";
    out += `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #fff`;
  }
  return out;
}

function Layer({ count, size, duration, reduced }: { count: number; size: number; duration: number; reduced: boolean }) {
  const shadow = useMemo(() => shadows(count), [count]);
  const dot: CSSProperties = { position: "absolute", left: 0, width: size, height: size, borderRadius: "50%", background: "transparent" };
  return (
    <div style={{ position: "absolute", top: 0, left: 0, animation: reduced ? undefined : `animStar ${duration}s linear infinite`, willChange: "transform" }}>
      <div style={{ ...dot, top: 0, boxShadow: shadow }} />
      <div style={{ ...dot, top: 2000, boxShadow: shadow }} />
    </div>
  );
}

/** Animated parallax starfield — a fixed backdrop behind the whole app (dark mode). */
export function Starfield() {
  const reduced = useReducedMotion();
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ background: "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)" }}
    >
      <Layer count={700} size={1} duration={50} reduced={reduced} />
      <Layer count={200} size={2} duration={100} reduced={reduced} />
      <Layer count={100} size={3} duration={150} reduced={reduced} />
    </div>
  );
}
