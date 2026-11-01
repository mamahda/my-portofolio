import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";
const themeColors = { dark: "#161619", light: "#ecebe7" };

const readSaved = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

/* index.html sets the starting class before first paint; this hook only reads and changes it. */
const apply = (theme) => {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  root.classList.toggle("light", theme === "light");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColors[theme]);
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-switching")));
};

const useTheme = () => {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("light") ? "light" : "dark",
  );

  const toggle = useCallback(() => {
    const next = theme === "light" ? "dark" : "light";
    apply(next);
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the choice just lasts for this visit.
    }
  }, [theme]);

  // Until the visitor picks a theme themselves, keep following the system setting.
  useEffect(() => {
    const query = matchMedia("(prefers-color-scheme: light)");
    const onChange = (event) => {
      if (readSaved()) return;
      const next = event.matches ? "light" : "dark";
      apply(next);
      setTheme(next);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return { theme, toggle };
};

export default useTheme;
