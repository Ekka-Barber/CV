import { ArrowRight, Sparkles } from "lucide-react";
import { translations } from "../LandingPage.i18n";
import { useLandingContext } from "./LandingPage.context";

export function FinalCTA() {
  const { lang, theme } = useLandingContext();
  const tr = translations[lang];

  return (
    <section className={`relative overflow-hidden ${theme.bg} py-16`}>
      <div className="absolute -left-[10%] -top-[20%] h-[300px] w-[300px] rounded-full bg-[#C9A84C]/10 blur-[100px]" />
      <div className="absolute -bottom-[20%] -right-[10%] h-[250px] w-[250px] rounded-full bg-white/5 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 px-4 py-1.5 mb-6">
          <Sparkles size={14} className="text-[#C9A84C]" />
          <span className="text-xs font-medium text-[#C9A84C]" style={{ fontFamily: "'Almarai', sans-serif" }}>
            {lang === "ar" ? "+٢٤٠٠ مهني انضموا هذا الشهر" : "2,400+ joined this month"}
          </span>
        </div>

        <h2 className={`text-3xl font-bold md:text-4xl lg:text-5xl ${theme.textPrimary}`} style={{ fontFamily: "'Almarai', sans-serif" }}>
          <span>{tr.cta.title1}</span>
          <span className="gradient-text-animated">{tr.cta.title2}</span>
        </h2>
        
        <p className={`mt-3 ${theme.textMuted}`} style={{ fontFamily: "'Almarai', sans-serif" }}>
          {tr.cta.subtitle}
        </p>
        
        <button
          type="button"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C9A84C] px-10 py-4 text-lg font-bold text-[#0A0A14] transition-transform hover:scale-105 hover:bg-[#D4954A]"
          style={{ fontFamily: "'Almarai', sans-serif" }}
        >
          {tr.cta.button.replace(" ←", "").replace(" →", "")}
          <ArrowRight
            size={20}
            className={`transition-transform group-hover:translate-x-1 ${lang === "ar" ? "rotate-180" : ""}`}
          />
        </button>
        
        <p className={`mt-3 text-xs ${theme.textMuted}`} style={{ fontFamily: "'Almarai', sans-serif" }}>
          {tr.cta.trust}
        </p>
      </div>
    </section>
  );
}
