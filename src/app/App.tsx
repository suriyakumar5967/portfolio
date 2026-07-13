import { useState, useEffect, useCallback } from "react";
import { useTheme } from "./lib/useTheme";
import { CASE_STUDIES, CaseStudyPage } from "./case-studies";
import { Nav } from "./sections/Nav";
import { Hero } from "./sections/Hero";
import { Work } from "./sections/Work";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { AboutPage } from "./pages/AboutPage";
import { Starfield } from "./Starfield";
import { FloatingConnect } from "./sections/FloatingConnect";

type Route = { name: "home" } | { name: "about" } | { name: "case"; slug: string };

export default function App() {
  const { dark, toggle } = useTheme();
  const [route, setRoute] = useState<Route>({ name: "home" });

  // ── Routing via URL hash (#about, #case/<slug>) ──
  useEffect(() => {
    const valid = CASE_STUDIES.map((c) => c.slug);
    const read = () => {
      const h = window.location.hash;
      const m = h.match(/^#case\/(.+)$/);
      if (m && valid.includes(m[1])) setRoute({ name: "case", slug: m[1] });
      else if (h === "#about") setRoute({ name: "about" });
      else setRoute({ name: "home" });
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  // Scroll to top when entering a sub-page.
  useEffect(() => {
    if (route.name !== "home") window.scrollTo({ top: 0, behavior: "auto" });
  }, [route]);

  const clearHash = () => {
    if (window.location.hash) history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  const goHome = useCallback(() => {
    clearHash();
    setRoute({ name: "home" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openAbout = useCallback(() => { window.location.hash = "about"; }, []);
  const openCase = useCallback((slug: string) => { window.location.hash = `case/${slug}`; }, []);
  const closeCase = useCallback(() => { clearHash(); setRoute({ name: "home" }); }, []);

  // Scroll to a section — on the current page if present, else return home first.
  const goSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    clearHash();
    setRoute({ name: "home" });
    requestAnimationFrame(() =>
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }))
    );
  }, []);

  const routeKey = route.name === "case" ? `case-${route.slug}` : route.name;

  return (
    <div className={`min-h-screen text-foreground [overflow-x:clip] font-sans ${dark ? "" : "bg-background"}`}>
      {dark && <Starfield />}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>

      <Nav
        dark={dark}
        onToggleTheme={toggle}
        onHome={goHome}
        onAbout={openAbout}
        onSection={goSection}
        view={route.name}
      />

      <main id="main" key={routeKey} className="animate-[fade-in_0.45s_ease]">
        {route.name === "case" ? (
          <CaseStudyPage slug={route.slug} onBack={closeCase} onOpenCase={openCase} />
        ) : route.name === "about" ? (
          <AboutPage />
        ) : (
          <>
            <Hero onNav={goSection} />
            <Work onOpenCase={openCase} />
            <Contact />
          </>
        )}
      </main>

      <Footer dark={dark} onNav={goSection} onAbout={openAbout} onTop={goHome} />

      <FloatingConnect routeKey={routeKey} onClick={() => goSection("contact")} />
    </div>
  );
}
