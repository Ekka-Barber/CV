import { useState } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { translations } from "../LandingPage.i18n";
import { useLandingContext } from "./LandingPage.context";

export function Navbar() {
  const { isDark, setIsDark, lang, setLang, theme } = useLandingContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const tr = translations[lang];

  const navItems = [
    { key: "features", href: "#features" },
    { key: "testimonials", href: "#testimonials" },
    { key: "pricing", href: "#pricing" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-xl ${
        isDark ? "bg-black/40" : "bg-white/70"
      } border-b ${theme.borderColor}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-1">
          <span
            className="text-2xl font-bold gradient-text"
            style={{ fontFamily: "'Almarai', sans-serif" }}
          >
            بصير
          </span>
          <span className={`text-2xl font-bold ${theme.textSecondary}`}>
            {" | Baseer"}
          </span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`text-sm ${theme.textSecondary} hover:${theme.textPrimary} transition-colors`}
            >
              {tr.nav[item.key as keyof typeof tr.nav]}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className={`rounded-full border ${theme.borderColor} px-3 py-1 text-xs ${theme.textSecondary} hover:${theme.textPrimary} transition`}
          >
            {lang === "ar" ? "EN | عر" : "عر | EN"}
          </button>

          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            className={`flex h-8 w-8 items-center justify-center rounded-full border ${theme.borderColor} ${theme.textSecondary} hover:${theme.textPrimary} transition`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button type="button" className={`text-sm ${theme.textSecondary}`}>
            {tr.nav.signIn}
          </button>

          <button
            type="button"
            className="rounded-full bg-[#C9A84C] px-6 py-2 text-sm font-bold text-[#0A0A14] transition hover:bg-[#D4954A] animate-pulse-glow"
          >
            {tr.nav.startFree}
          </button>
        </div>

        <button
          type="button"
          className={`md:hidden ${theme.textPrimary}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className={`md:hidden backdrop-blur-xl ${
            isDark ? "bg-black/80" : "bg-white/90"
          } border-b ${theme.borderColor} px-4 pb-6 pt-2`}
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`text-sm ${theme.textSecondary}`}
                onClick={() => setMobileOpen(false)}
              >
                {tr.nav[item.key as keyof typeof tr.nav]}
              </a>
            ))}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                className={`rounded-full border ${theme.borderColor} px-3 py-1 text-xs ${theme.textSecondary}`}
              >
                {lang === "ar" ? "EN | عر" : "عر | EN"}
              </button>
              <button
                type="button"
                onClick={() => setIsDark(!isDark)}
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${theme.borderColor} ${theme.textSecondary}`}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
            <button
              type="button"
              className="rounded-full bg-[#C9A84C] px-6 py-3 text-sm font-bold text-[#0A0A14] transition hover:bg-[#D4954A]"
            >
              {tr.nav.startFree}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
