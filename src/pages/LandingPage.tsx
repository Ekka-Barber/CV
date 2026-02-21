import { Link } from "react-router-dom";
import { useTranslation } from "@/i18n/useTranslation";
import { Header } from "@/components/Layout/Header";
import { Logo } from "@/components/Layout/Logo";
import { useAppStore } from "@/store/useAppStore";

function LandingLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
    </div>
  );
}

export function LandingPage() {
  const locale = useAppStore((s) => s.locale);
  const { getNested, isLoading } = useTranslation(locale);
  const isRTL = locale === "ar";

  const landing = getNested<{
    hero: string;
    subtitle: string;
    cta: string;
    heroSecondary: string;
    features: {
      title: string;
      subtitle: string;
      ats: { title: string; description: string };
      ai: { title: string; description: string };
      arabic: { title: string; description: string };
      fast: { title: string; description: string };
    };
    pricing: {
      title: string;
      subtitle: string;
      currency: string;
      free: { name: string; price: string; period: string; description: string; features: string[]; cta: string; popular: boolean };
      basic: { name: string; price: string; period: string; description: string; features: string[]; cta: string; popular: boolean };
      pro: { name: string; price: string; period: string; description: string; features: string[]; cta: string; popular: boolean };
      premium: { name: string; price: string; period: string; description: string; features: string[]; cta: string; popular: boolean };
    };
    testimonials: {
      title: string;
      subtitle: string;
      items: Array<{ name: string; role: string; location: string; text: string; avatar: string }>;
    };
    roadmap: {
      title: string;
      subtitle: string;
      phases: Array<{ name: string; items: string[] }>;
    };
    faq: {
      title: string;
      items: Array<{ question: string; answer: string }>;
    };
    footer: {
      description: string;
      product: string;
      company: string;
      support: string;
      links: { features: string; pricing: string; templates: string; about: string; careers: string; contact: string; help: string; privacy: string; terms: string };
      copyright: string;
    };
  }>("landing");

  if (isLoading || !landing.features) {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        <Header />
        <LandingLoader />
      </div>
    );
  }

  const { features, pricing, testimonials, roadmap, faq, footer } = landing;

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[var(--color-surface)]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className={`grid items-center gap-12 md:grid-cols-2 ${isRTL ? "md:flex-row-reverse" : ""}`}>
              <div className={isRTL ? "md:order-2" : ""}>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                  {landing.hero}
                </h1>
                <p className="mt-6 text-lg text-slate-600 md:text-xl">
                  {landing.subtitle}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/app"
                    className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent)] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[var(--color-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2"
                  >
                    {landing.cta}
                  </Link>
                  <p className="flex items-center text-sm text-slate-500">
                    {landing.heroSecondary}
                  </p>
                </div>
              </div>
              <div className={`relative ${isRTL ? "md:order-1" : ""}`}>
                <div className="relative mx-auto w-full max-w-md">
                  <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 blur-xl" />
                  <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                    <div className="bg-[var(--color-primary)] px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-white/20" />
                        <div>
                          <div className="h-3 w-24 rounded bg-white/40" />
                          <div className="mt-2 h-2 w-16 rounded bg-white/30" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <div className="mb-2 h-2 w-12 rounded bg-[var(--color-primary)]" />
                        <div className="h-2 w-full rounded bg-slate-200" />
                        <div className="mt-1 h-2 w-3/4 rounded bg-slate-200" />
                      </div>
                      <div className="mb-4">
                        <div className="mb-2 h-2 w-12 rounded bg-[var(--color-primary)]" />
                        <div className="space-y-1">
                          <div className="h-2 w-full rounded bg-slate-200" />
                          <div className="h-2 w-5/6 rounded bg-slate-200" />
                          <div className="h-2 w-4/5 rounded bg-slate-200" />
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="mb-2 h-2 w-12 rounded bg-[var(--color-primary)]" />
                        <div className="flex flex-wrap gap-2">
                          <div className="h-6 w-16 rounded-full bg-[var(--color-accent)]/20" />
                          <div className="h-6 w-20 rounded-full bg-[var(--color-accent)]/20" />
                          <div className="h-6 w-14 rounded-full bg-[var(--color-accent)]/20" />
                          <div className="h-6 w-18 rounded-full bg-[var(--color-accent)]/20" />
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 h-2 w-12 rounded bg-[var(--color-primary)]" />
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="mt-1 h-2 w-2 rounded-full bg-slate-300" />
                            <div className="flex-1">
                              <div className="h-2 w-3/4 rounded bg-slate-200" />
                              <div className="mt-1 h-2 w-1/2 rounded bg-slate-200" />
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="mt-1 h-2 w-2 rounded-full bg-slate-300" />
                            <div className="flex-1">
                              <div className="h-2 w-2/3 rounded bg-slate-200" />
                              <div className="mt-1 h-2 w-1/2 rounded bg-slate-200" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-lg">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {features.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                {features.subtitle}
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {(["ats", "ai", "arabic", "fast"] as const).map((key) => (
                <div
                  key={key}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                    {key === "ats" && (
                      <svg className="h-6 w-6 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {key === "ai" && (
                      <svg className="h-6 w-6 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                    {key === "arabic" && (
                      <svg className="h-6 w-6 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    )}
                    {key === "fast" && (
                      <svg className="h-6 w-6 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {features[key].title}
                  </h3>
                  <p className="mt-2 text-slate-600">
                    {features[key].description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-[var(--color-surface)] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {pricing.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                {pricing.subtitle}
              </p>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {(["free", "basic", "pro", "premium"] as const).map((tier) => {
                const tierData = pricing[tier];
                const isPopular = tierData.popular;
                return (
                  <div
                    key={tier}
                    className={`relative rounded-xl border p-6 ${
                      isPopular
                        ? "border-[var(--color-accent)] bg-white shadow-lg ring-2 ring-[var(--color-accent)]"
                        : "border-slate-200 bg-white shadow-sm"
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3 start-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold text-white">
                          {isRTL ? "الأكثر شعبية" : "Most Popular"}
                        </span>
                      </div>
                    )}
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {tierData.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {tierData.description}
                      </p>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-slate-900">
                          {tierData.price}
                        </span>
                        <span className="text-slate-500">
                          {" "}{pricing.currency}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        {tierData.period}
                      </p>
                    </div>
                    <ul className="mt-6 space-y-3">
                      {tierData.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <svg className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/app"
                      className={`mt-6 block w-full rounded-lg py-2.5 text-center text-sm font-semibold ${
                        isPopular
                          ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]"
                          : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {tierData.cta}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {testimonials.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                {testimonials.subtitle}
              </p>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {testimonials.items.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-semibold text-white">
                      {item.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{item.name}</div>
                      <div className="text-xs text-slate-500">{item.role}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                    "{item.text}"
                  </p>
                  <div className="mt-3 text-xs text-slate-400">{item.location}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="roadmap" className="bg-[var(--color-surface)] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {roadmap.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                {roadmap.subtitle}
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {roadmap.phases.map((phase, idx) => (
                <div key={idx} className="relative">
                  {idx < roadmap.phases.length - 1 && (
                    <div className="absolute start-1/2 top-8 hidden h-0.5 w-full -translate-x-1/2 bg-slate-200 md:block" />
                  )}
                  <div className="relative text-center">
                    <div
                      className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
                        idx === 0
                          ? "bg-[var(--color-accent)] text-white"
                          : "border-2 border-slate-300 bg-white text-slate-400"
                      }`}
                    >
                      {idx === 0 && (
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {idx === 1 && (
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {idx === 2 && (
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{phase.name}</h3>
                    <ul className="mx-auto mt-4 max-w-xs space-y-2 text-start">
                      {phase.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-center gap-2 text-sm text-slate-600">
                          <svg className="h-4 w-4 shrink-0 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {faq.title}
              </h2>
            </div>
            <div className="mt-12 space-y-4">
              {faq.items.map((item, idx) => (
                <details
                  key={idx}
                  className="group rounded-lg border border-slate-200 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-slate-900 hover:bg-slate-50">
                    {item.question}
                    <svg className="h-5 w-5 text-slate-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="border-t border-slate-100 px-4 py-3 text-slate-600">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-primary)] py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              {isRTL ? "هل أنت مستعد لبدء البحث عن وظيفة؟" : "Ready to Land Your Dream Job?"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              {isRTL
                ? "انضم إلى آلاف الباحثين عن عمل الذين يستخدمون منشئ السيرة الذاتية"
                : "Join thousands of job seekers using CV Builder to get more interviews"}
            </p>
            <Link
              to="/app"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-semibold text-[var(--color-primary)] shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-primary)]"
            >
              {landing.cta}
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-[var(--color-surface)] py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-1">
              <Logo />
              <p className="mt-4 text-sm text-slate-600">
                {footer.description}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">{footer.product}</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#features" className="text-sm text-slate-600 hover:text-[var(--color-primary)]">
                    {footer.links.features}
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-sm text-slate-600 hover:text-[var(--color-primary)]">
                    {footer.links.pricing}
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-sm text-slate-600 hover:text-[var(--color-primary)]">
                    {footer.links.templates}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">{footer.company}</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-[var(--color-primary)]">
                    {footer.links.about}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-[var(--color-primary)]">
                    {footer.links.careers}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-[var(--color-primary)]">
                    {footer.links.contact}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">{footer.support}</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-[var(--color-primary)]">
                    {footer.links.help}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-[var(--color-primary)]">
                    {footer.links.privacy}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-[var(--color-primary)]">
                    {footer.links.terms}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
            {footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
