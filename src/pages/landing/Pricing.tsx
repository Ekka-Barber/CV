import { Check } from "lucide-react";
import { translations } from "../LandingPage.i18n";
import { useLandingContext } from "./LandingPage.context";

export function Pricing() {
  const { isDark, lang, theme } = useLandingContext();
  const tr = translations[lang];

  const plans = [
    {
      badge: tr.pricing.plans[0].badge,
      name: tr.pricing.plans[0].name,
      price: tr.pricing.plans[0].price,
      sub: tr.pricing.plans[0].sub,
      features: tr.pricing.plans[0].features,
      cta: tr.pricing.plans[0].cta,
      isPopular: false,
    },
    {
      badge: tr.pricing.plans[2].badge,
      name: tr.pricing.plans[2].name,
      price: tr.pricing.plans[2].price,
      sub: tr.pricing.plans[2].sub,
      features: tr.pricing.plans[2].features,
      cta: tr.pricing.plans[2].cta,
      isPopular: true,
    },
    {
      badge: tr.pricing.plans[3].badge,
      name: tr.pricing.plans[3].name,
      price: tr.pricing.plans[3].price,
      sub: tr.pricing.plans[3].sub,
      features: tr.pricing.plans[3].features,
      cta: tr.pricing.plans[3].cta,
      isPopular: false,
    },
  ];

  return (
    <section
      id="pricing"
      className={`bg-gradient-to-b ${isDark ? "from-[#0A0A14] to-[#0D0D1A]" : "from-[#FAFAFA] to-[#F0F0F5]"} py-12`}
    >
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <div className="slide-in-up text-center">
          <h2
            className="text-3xl font-bold gradient-text-animated md:text-4xl"
            style={{ fontFamily: "'Almarai', sans-serif" }}
          >
            {tr.pricing.title}
          </h2>
          <p
            className={`mx-auto mt-2 max-w-md text-sm ${theme.textMuted}`}
            style={{ fontFamily: "'Almarai', sans-serif" }}
          >
            {tr.pricing.subtitle}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-5 transition-all duration-300 ${
                plan.isPopular
                  ? `scale-100 md:scale-105 z-10 border-[#C9A84C]/30 ${
                      isDark ? "bg-[#C9A84C]/10" : "bg-[#C9A84C]/5"
                    } shadow-xl shadow-[#C9A84C]/10`
                  : `${theme.borderColor} ${theme.cardBg} hover:border-[#C9A84C]/50`
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="whitespace-nowrap rounded-full bg-[#C9A84C] px-3 py-1 text-xs font-bold text-[#0A0A14]">
                    {tr.pricing.popular}
                  </span>
                </div>
              )}
              <div className={`mb-1 text-xs font-semibold ${theme.textMuted}`} style={{ fontFamily: "'Almarai', sans-serif" }}>
                {plan.badge}
              </div>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold gradient-text">{plan.price}</span>
                <span className={`mb-1 text-sm ${theme.textMuted}`}>{tr.pricing.currency}</span>
              </div>
              <p className={`text-xs ${theme.textMuted}`} style={{ fontFamily: "'Almarai', sans-serif" }}>
                {plan.sub}
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {plan.features.map((f, i) => (
                  <li key={i} className={`flex items-center gap-2 text-xs ${theme.textSecondary}`}>
                    <Check size={12} className="text-[#C9A84C] flex-shrink-0" />
                    <span style={{ fontFamily: "'Almarai', sans-serif" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`mt-5 w-full rounded-full py-2.5 text-sm font-semibold transition ${
                  plan.isPopular
                    ? "bg-[#C9A84C] text-[#0A0A14] font-bold hover:bg-[#D4954A]"
                    : `border ${theme.borderColor} ${theme.textSecondary} hover:${
                        isDark ? "bg-white/10" : "bg-black/5"
                      }`
                }`}
                style={{ fontFamily: "'Almarai', sans-serif" }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className={`mt-6 text-center text-xs ${theme.textMuted}`} style={{ fontFamily: "'Almarai', sans-serif" }}>
          {tr.pricing.trust}
        </p>
      </div>
    </section>
  );
}
