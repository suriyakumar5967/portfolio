
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(<App />);

  // Dismiss the preloader once the app has painted. A small minimum so the walk
  // cycle reads and the loader never just flashes; reduced-motion → dismiss fast.
  (() => {
    const el = document.getElementById("site-preloader");
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const MIN = reduce ? 400 : 2500;
    const start = performance.now();
    const remove = () => el.remove();
    const hide = () => {
      el.classList.add("is-hidden");
      el.addEventListener("transitionend", remove, { once: true });
      setTimeout(remove, 900); // fallback if transitionend never fires
    };
    // Wait two frames (app has committed to the DOM), then honour the minimum.
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        setTimeout(hide, Math.max(0, MIN - (performance.now() - start)))
      )
    );
  })();
