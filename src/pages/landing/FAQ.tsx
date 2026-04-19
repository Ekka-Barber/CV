import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { translations } from "../LandingPage.i18n";
import { useLandingContext } from "./LandingPage.context";

export function FAQ() {
  const { lang, theme } = useLandingContext();
  const tr = translations[lang];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = tr.faq.items.slice(0, 3);

  return (
    <section id="faq" className={`${theme.bg} py-12`}>
      <div className="mx-auto max-w-2xl px-4 lg:px-8">
        <div className="slide-in-up text-center">
          <h2 className={`text-2xl font-bold md:text-3xl ${theme.textPrimary}`} style={{ fontFamily: "'Almarai', sans-serif" }}>
            {tr.faq.title}
          </h2>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className={`slide-in-up overflow-hidden rounded-xl border ${theme.borderColor} ${theme.cardBg} transition-all duration-300`}
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className={`flex w-full items-center justify-between p-4 ${lang === "ar" ? "text-right" : "text-left"} text-sm font-medium ${theme.textPrimary}`}
                style={{ fontFamily: "'Almarai', sans-serif" }}
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={16}
                  className={`flex-shrink-0 ml-2 transition-transform duration-300 ${theme.textMuted} ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className={`px-4 pb-4 text-sm leading-relaxed ${theme.textSecondary}`} style={{ fontFamily: "'Almarai', sans-serif" }}>
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
