import { ArrowRight } from "lucide-react";
import { translations } from "../LandingPage.i18n";
import { useLandingContext } from "./LandingPage.context";

export function Hero() {
  const { isDark, lang, theme } = useLandingContext();
  const tr = translations[lang];

  return (
    <section className={`relative overflow-hidden ${theme.bg} py-12 lg:py-16`}>
      <div className="absolute -left-[10%] -top-[20%] h-[400px] w-[400px] rounded-full bg-[#C9A84C]/10 blur-[120px]" />
      <div className="absolute -bottom-[20%] -right-[10%] h-[300px] w-[300px] rounded-full bg-white/5 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div
            className={`slide-in-up mb-6 inline-flex items-center gap-2 rounded-full border ${theme.borderColor} ${
              isDark ? "bg-white/10" : "bg-black/5"
            } px-4 py-1.5`}
          >
            <span className={`text-xs ${theme.textSecondary}`}>
              {tr.hero.badge}
            </span>
          </div>

          <h1 className="slide-in-up max-w-3xl" style={{ animationDelay: "0.1s" }}>
            <span
              className={`block text-4xl font-bold leading-tight md:text-5xl lg:text-6xl ${theme.textPrimary}`}
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              {tr.hero.title1}
            </span>
            <span
              className="block text-4xl font-bold leading-tight gradient-text-animated md:text-5xl lg:text-6xl"
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              {tr.hero.title2}
            </span>
          </h1>

          <p
            className={`slide-in-up mt-4 max-w-xl text-base md:text-lg ${theme.textSecondary}`}
            style={{
              animationDelay: "0.2s",
              fontFamily: "'Almarai', sans-serif",
            }}
          >
            {tr.hero.subtitle}
          </p>

          <div
            className="slide-in-up mt-6 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "0.3s" }}
          >
            <button
              type="button"
              className="group flex items-center gap-2 rounded-full bg-[#C9A84C] px-8 py-3.5 text-base font-bold text-[#0A0A14] transition-transform hover:scale-105 hover:bg-[#D4954A]"
            >
              <span style={{ fontFamily: "'Almarai', sans-serif" }}>
                {tr.hero.cta1}
              </span>
              <ArrowRight
                size={18}
                className={`transition-transform group-hover:translate-x-1 ${lang === "ar" ? "rotate-180" : ""}`}
              />
            </button>
            <p
              className={`text-xs ${theme.textMuted}`}
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              {tr.hero.trust}
            </p>
          </div>

          <div
            className={`slide-in-up mt-10 flex flex-wrap items-center justify-center gap-6 rounded-2xl border ${theme.borderColor} ${theme.cardBg} px-6 py-4`}
            style={{ animationDelay: "0.4s" }}
          >
            <span className={`text-xs uppercase tracking-wider ${theme.textMuted}`}>
              {tr.logos.title}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {["Saudi Aramco", "NEOM", "STC", "SABIC", "Amazon KSA"].map((company) => (
                <span
                  key={company}
                  className={`text-sm font-semibold ${theme.textMuted} opacity-70`}
                >
                  {company}
                </span>
              ))}
            </div>
          </div>

          <div
            className="slide-in-up mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-10"
            style={{ animationDelay: "0.5s" }}
          >
            {tr.testimonials.stats.slice(0, 3).map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-[#C9A84C]" style={{ fontFamily: "'Almarai', sans-serif" }}>
                  {stat.num}
                </div>
                <p className={`text-xs ${theme.textMuted}`} style={{ fontFamily: "'Almarai', sans-serif" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
