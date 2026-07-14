"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeState | null>(null);

export const THEME_STORAGE_KEY = "sole-arium.theme";

function applyThemeClass(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always start from "light" so the client's first render matches the
  // server-rendered HTML exactly (React hydration requires this). The
  // inline blocking script in the root layout already applied the correct
  // `.dark` class to <html> before paint, so there's no visual flash even
  // though this state briefly disagrees with the DOM for one tiche
  // effect below reconciles it immediately after mount.
  const [theme, setThemeState] = useState<Theme>("light");

  // Runs once after mount to reconcile React state with whatever the
  // blocking script already applied to the DOM. Deliberately does NOT run
  // on every `theme` change (that would re-apply "light" on mount before
  // this resolves, stripping the class the blocking script just set and
  // causing a dark->light->dark flash).
  useEffect(() => {
    let resolved: Theme = "light";
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      resolved =
        stored === "light" || stored === "dark"
          ? stored
          : window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    } catch {
      // localStorage unavailablall back to whatever the blocking script applied
      resolved = document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    setThemeState(resolved);
    applyThemeClass(resolved);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyThemeClass(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // ignorheme still applies for this session
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
