import { BarChart2, Sparkles, Globe2 } from "lucide-react";
import { translations } from "../LandingPage.i18n";
import { useLandingContext } from "./LandingPage.context";

export function Features() {
  const { isDark, lang, theme } = useLandingContext();
  const tr = translations[lang];

  const progressBars = [
    { label: "Saudi Aramco", pct: 89 },
    { label: "NEOM", pct: 96 },
    { label: "General", pct: 78 },
  ];

  const features = [
    {
      icon: BarChart2,
      title: tr.features.ats.title,
      subtitle: tr.features.ats.subtitle,
      desc: tr.features.ats.desc,
      colSpan: "md:col-span-2",
      extra: (
        <div className="mt-4 flex flex-col gap-2">
          {progressBars.map((bar) => (
            <div key={bar.label}>
              <div className="flex items-center justify-between text-xs">
                <span className={theme.textSecondary}>{bar.label}</span>
                <span className="text-[#C9A84C] font-semibold">{bar.pct}%</span>
              </div>
              <div className={`mt-1 h-2 w-full overflow-hidden rounded-full ${isDark ? "bg-white/10" : "bg-black/8"}`}>
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D4954A]"
                  style={{ width: `${bar.pct}%`, animation: "progress-fill 1.5s ease-out" }}
                />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: Sparkles,
      title: tr.features.ai.title,
      subtitle: tr.features.ai.subtitle,
      desc: tr.features.ai.desc,
      colSpan: "",
      extra: (
        <div className={`mt-4 rounded-lg border ${theme.borderColor} ${isDark ? "bg-white/5" : "bg-black/3"} p-3`}>
          <p className={`text-sm ${theme.textSecondary}`}>
            {tr.features.ai.demo}
            <span className="animate-typing-cursor ms-0.5 inline-block h-4 w-0.5 bg-[#C9A84C]" />
          </p>
        </div>
      ),
    },
    {
      icon: Globe2,
      title: tr.features.arabic.title,
      subtitle: tr.features.arabic.subtitle,
      desc: tr.features.arabic.desc,
      colSpan: "",
      extra: (
        <div className={`mt-4 rounded-lg border ${theme.borderColor} ${isDark ? "bg-white/5" : "bg-black/3"} p-3`} dir="rtl">
          <div className={`mb-1.5 h-2 w-full rounded ${isDark ? "bg-white/15" : "bg-black/10"}`} />
          <div className={`mb-1.5 h-2 w-4/5 rounded ${isDark ? "bg-white/10" : "bg-black/8"}`} />
          <div className={`h-2 w-3/5 rounded ${isDark ? "bg-white/10" : "bg-black/8"}`} />
        </div>
      ),
    },
  ];

  return (
    <section id="features" className={`${theme.bg} py-12`}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="slide-in-up text-center">
          <h2
            className={`text-3xl font-bold md:text-4xl ${theme.textPrimary}`}
            style={{ fontFamily: "'Almarai', sans-serif" }}
          >
            {tr.features.title1}
            <span className="gradient-text">{tr.features.title2}</span>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`slide-in-up col-span-1 rounded-2xl border ${theme.borderColor} ${theme.cardBg} p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.15)] ${feature.colSpan}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/8 border ${theme.borderColor}`}>
                <feature.icon size={24} className="text-[#C9A84C]" />
              </div>
              <h3
                className={`text-lg font-bold ${theme.textPrimary}`}
                style={{ fontFamily: "'Almarai', sans-serif" }}
              >
                {feature.title}
              </h3>
              <p className={`text-xs ${theme.textSecondary}`}>{feature.subtitle}</p>
              <p
                className={`mt-2 text-sm leading-relaxed ${theme.textMuted}`}
                style={{ fontFamily: "'Almarai', sans-serif" }}
              >
                {feature.desc}
              </p>
              {feature.extra}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
