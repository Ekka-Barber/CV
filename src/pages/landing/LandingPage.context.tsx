import { createContext, useContext, useState, useEffect, useRef, useCallback, type ReactNode } from "react";

interface LandingContextType {
  isDark: boolean;
  setIsDark: (v: boolean) => void;
  lang: "ar" | "en";
  setLang: (v: "ar" | "en") => void;
  theme: ReturnType<typeof import("./LandingPage.styles").getThemeClasses>;
}

const LandingContext = createContext<LandingContextType | null>(null);

export function useLandingContext() {
  const ctx = useContext(LandingContext);
  if (!ctx) throw new Error("useLandingContext must be used within LandingProvider");
  return ctx;
}

import { getThemeClasses } from "./LandingPage.styles";

export function LandingProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const theme = getThemeClasses(isDark);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".slide-in-up");
    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const reobserve = useCallback(() => {
    setTimeout(() => {
      const els = document.querySelectorAll(".slide-in-up:not(.in-view)");
      els.forEach((el) => observerRef.current?.observe(el));
    }, 100);
  }, []);

  useEffect(() => {
    reobserve();
  }, [isDark, lang, reobserve]);

  return (
    <LandingContext.Provider value={{ isDark, setIsDark, lang, setLang, theme }}>
      {children}
    </LandingContext.Provider>
  );
}
