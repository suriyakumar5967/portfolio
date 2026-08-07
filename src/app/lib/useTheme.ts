import { useState, useEffect, useCallback } from "react";

const KEY = "sk-portfolio-theme";

/** Dark/light theme with persistence + system fallback. Toggles `.dark` on <html>. */
export function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    // Default (no saved preference) = dark theme (toggle OFF).
    setDark(saved !== null ? saved === "dark" : true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(KEY, dark ? "dark" : "light");
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#0D0C12" : "#F5F3EE");
  }, [dark]);

  const toggle = useCallback(() => setDark((d) => !d), []);
  return { dark, setDark, toggle };
}
