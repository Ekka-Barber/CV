import { translations } from "../LandingPage.i18n";
import { useLandingContext } from "./LandingPage.context";

export function Testimonials() {
  const { lang, theme, isDark } = useLandingContext();
  const tr = translations[lang];

  const duplicatedTestimonials = [...tr.testimonials.items, ...tr.testimonials.items];

  const fadeGradientLeft = isDark 
    ? "bg-gradient-to-r from-[#0A0A14] to-transparent" 
    : "bg-gradient-to-r from-[#FAFAFA] to-transparent";
  const fadeGradientRight = isDark 
    ? "bg-gradient-to-l from-[#0A0A14] to-transparent" 
    : "bg-gradient-to-l from-[#FAFAFA] to-transparent";

  return (
    <section id="testimonials" className={`${theme.bg} py-12 overflow-hidden`}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className={`text-2xl font-bold md:text-3xl ${theme.textPrimary}`} style={{ fontFamily: "'Almarai', sans-serif" }}>
            <span className="text-[#C9A84C]">{tr.testimonials.title1}</span>{" "}{tr.testimonials.title2}
          </h2>
        </div>
      </div>

      <div className="mt-8 relative">
        <div className={`absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 ${fadeGradientLeft} pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 ${fadeGradientRight} pointer-events-none`} />
        
        <div className="animate-marquee-testimonials flex gap-4 px-4 hover:[animation-play-state:paused]">
          {duplicatedTestimonials.map((testimonial, i) => (
            <div
              key={i}
              className={`flex-shrink-0 w-[300px] md:w-[340px] rounded-2xl border ${theme.borderColor} ${theme.cardBg} p-5`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A84C] to-[#D4954A] text-sm font-bold text-[#0A0A14]"
                  style={{ fontFamily: "'Almarai', sans-serif" }}
                >
                  <span>{testimonial.initials}</span>
                </div>
                <div>
                  <div className={`font-semibold text-sm ${theme.textPrimary}`} style={{ fontFamily: "'Almarai', sans-serif" }}>
                    {testimonial.name}
                  </div>
                  <div className={`text-xs ${theme.textMuted}`} style={{ fontFamily: "'Almarai', sans-serif" }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <span key={si} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className={`mt-2 text-sm leading-relaxed ${theme.textSecondary}`} style={{ fontFamily: "'Almarai', sans-serif" }}>
                {`"${testimonial.text}"`}
              </p>
              <div className={`mt-2 text-xs ${theme.textMuted}`}>
                🇸🇦 {testimonial.city}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
