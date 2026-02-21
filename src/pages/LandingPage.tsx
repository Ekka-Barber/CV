import { useState, useEffect, useRef, useCallback } from "react";
import {
  BarChart2,
  Sparkles,
  Globe2,
  Zap,
  FileText,
  Wand2,
  Download,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Check,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Custom keyframes & animations (injected via <style>)              */
/* ------------------------------------------------------------------ */
const customStyles = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes blob-move {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(180deg); }
}
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes slide-in-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(201,168,76,0.3); }
  50% { box-shadow: 0 0 40px rgba(201,168,76,0.5); }
}
@keyframes typing-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes progress-fill {
  from { width: 0%; }
}
@keyframes count-fade {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes ats-ring {
  from { stroke-dasharray: 0 283; }
}

.animate-float { animation: float 4s ease-in-out infinite; }
.animate-blob { animation: blob-move 10s ease-in-out infinite; }
.animate-blob-reverse { animation: blob-move 14s ease-in-out infinite reverse; }
.animate-blob-slow { animation: blob-move 8s ease-in-out infinite; }
.animate-gradient { animation: gradient-shift 6s ease infinite; background-size: 200% 200%; }
.animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
.animate-typing-cursor { animation: typing-cursor 1s step-end infinite; }
.animate-marquee { animation: marquee 30s linear infinite; }

.slide-in-up {
  opacity: 0;
  transform: translateY(40px);
}
.slide-in-up.in-view {
  animation: slide-in-up 0.6s ease-out forwards;
}

.gradient-text {
  background: linear-gradient(135deg, #C9A84C, #D4954A);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gradient-text-animated {
  background: linear-gradient(135deg, #C9A84C, #D4954A, #C9A84C);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 6s ease infinite;
}

/* Light mode overrides */
.light-mode {
  --bg-primary: #FAFAFA;
  --bg-secondary: #F0F0F5;
  --bg-card: rgba(0,0,0,0.03);
  --border-color: rgba(0,0,0,0.08);
  --text-primary: #1a1a2e;
  --text-secondary: rgba(26,26,46,0.7);
  --text-muted: rgba(26,26,46,0.4);
}
.dark-mode {
  --bg-primary: #0A0A14;
  --bg-secondary: #0D0D1A;
  --bg-card: rgba(255,255,255,0.04);
  --border-color: rgba(255,255,255,0.1);
  --text-primary: #ffffff;
  --text-secondary: rgba(255,255,255,0.7);
  --text-muted: rgba(255,255,255,0.4);
}
`;

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
export function LandingPage() {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const modeClass = isDark ? "dark-mode" : "light-mode";

  /* bg / text helpers based on mode */
  const bg = isDark ? "bg-[#0A0A14]" : "bg-[#FAFAFA]";
  const bg2 = isDark ? "bg-[#0D0D1A]" : "bg-[#F0F0F5]";
  const bgFooter = isDark ? "bg-[#06060F]" : "bg-[#E8E8ED]";
  const textPrimary = isDark ? "text-white" : "text-[#1a1a2e]";
  const textSecondary = isDark ? "text-white/70" : "text-[#1a1a2e]/70";
  const textMuted = isDark ? "text-white/40" : "text-[#1a1a2e]/40";
  const borderColor = isDark ? "border-white/10" : "border-black/8";
  const cardBg = isDark
    ? "bg-white/[0.04] backdrop-blur-xl"
    : "bg-black/[0.03] backdrop-blur-xl";

  /* ---- IntersectionObserver for slide-in-up ---- */
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

  /* Re-observe on mode/lang change */
  const reobserve = useCallback(() => {
    setTimeout(() => {
      const els = document.querySelectorAll(".slide-in-up:not(.in-view)");
      els.forEach((el) => observerRef.current?.observe(el));
    }, 100);
  }, []);

  useEffect(() => {
    reobserve();
  }, [isDark, lang, reobserve]);

  /* ---- FAQ data ---- */
  const faqItems = [
    {
      q: "ما هو ATS ولماذا يهم؟ \u00B7 What is ATS and why does it matter?",
      a: "ATS هو نظام تتبع المتقدمين الذي تستخدمه الشركات لفرز السير الذاتية تلقائياً. أكثر من ٧٥٪ من السير الذاتية لا تصل لمسؤول التوظيف بسبب هذه الفلاتر. بصير يضمن أن سيرتك تتجاوزها.",
    },
    {
      q: "هل هناك اشتراك شهري؟ \u00B7 Is there a subscription?",
      a: "لا إطلاقاً. تدفع مرة واحدة فقط وتحتفظ بسيرتك إلى الأبد. لا مفاجآت، لا رسوم خفية.",
    },
    {
      q: "هل يمكنني إنشاء سيرة ذاتية بالعربية؟ \u00B7 Can I create an Arabic CV?",
      a: "نعم! بصير هو أول منصة توفر دعماً حقيقياً للغة العربية — خط احترافي، اتجاه RTL صحيح، وتنسيق مناسب للسوق السعودي.",
    },
    {
      q: "كيف تعمل ميزة الذكاء الاصطناعي؟ \u00B7 How does AI writing work?",
      a: "أدخل تجربتك الخام وسيحوّلها الذكاء الاصطناعي إلى إنجازات مؤثرة موجّهة نحو النتائج — بلغة تُقنع مسؤولي التوظيف.",
    },
    {
      q: "ما صيغ التصدير المتاحة؟ \u00B7 What export formats?",
      a: "PDF و DOCX. جميع الملفات محسّنة ومرتبة بشكل صحيح لأنظمة ATS.",
    },
  ];

  /* ---- Pricing data ---- */
  const pricingPlans = [
    {
      badge: "مجاني للأبد",
      name: "Free",
      price: "0",
      sub: "ابدأ من هنا",
      features: ["سيرة ذاتية واحدة", "قوالب أساسية", "تصدير PDF", "فاحص ATS"],
      cta: "ابدأ مجاناً",
      popular: false,
    },
    {
      badge: "للخريجين الجدد",
      name: "Basic",
      price: "49",
      sub: "دفعة واحدة",
      features: [
        "3 سير ذاتية",
        "جميع القوالب",
        "PDF و DOCX",
        "تحسين ATS",
        "دعم أولوية",
      ],
      cta: "اختر Basic",
      popular: false,
    },
    {
      badge: "للمهنيين الجادين",
      name: "Professional",
      price: "99",
      sub: "دفعة واحدة",
      features: [
        "10 سير ذاتية",
        "جميع القوالب",
        "PDF و DOCX",
        "مساعد كتابة AI",
        "تحسين ATS",
        "منشئ خطاب التغطية",
        "دعم أولوية",
      ],
      cta: "اختر Professional \u2192",
      popular: true,
    },
    {
      badge: "للمحترفين",
      name: "Premium",
      price: "199",
      sub: "دفعة واحدة",
      features: [
        "سير ذاتية غير محدودة",
        "جميع القوالب",
        "PDF و DOCX",
        "مساعد AI",
        "تحسين ATS",
        "خطاب تغطية",
        "محسّن LinkedIn",
        "مراجعة 1-on-1",
        "دعم 24/7",
      ],
      cta: "اختر Premium",
      popular: false,
    },
  ];

  /* ---- Testimonials ---- */
  const testimonials = [
    {
      initials: "\u0623",
      name: "أحمد الرشيدي",
      role: "مهندس برمجيات",
      city: "الرياض",
      stars: 5,
      text: "كنت أرسل سيرتي دون ردود — حتى استخدمت بصير. حصلت على ٥ مقابلات في أسبوعين فقط!",
    },
    {
      initials: "\u0633",
      name: "سارة الفهد",
      role: "مديرة تسويق \u00B7 جدة",
      city: "جدة",
      stars: 5,
      text: "الدعم الكامل للغة العربية مذهل — أخيراً منصة تفهم RTL بشكل صحيح. سيرتي العربية تبدو احترافية جداً.",
    },
    {
      initials: "\u0645",
      name: "محمد القاسم",
      role: "محلل مالي \u00B7 الدمام",
      city: "الدمام",
      stars: 5,
      text: "ميزة الذكاء الاصطناعي وفّرت عليّ ساعات. حوّلت نقاطي العادية إلى إنجازات مؤثرة. أنصح به بشدة!",
    },
    {
      initials: "\u0641",
      name: "فاطمة الناصر",
      role: "متخصصة موارد بشرية \u00B7 الرياض",
      city: "الرياض",
      stars: 5,
      text: "بصفتي من تراجع السير الذاتية يومياً — هذه القوالب مصممة بذكاء. نظيفة، احترافية، وسهلة القراءة.",
    },
  ];

  /* ---- Logo Bar ---- */
  const logos =
    "Saudi Aramco \u00B7 NEOM \u00B7 STC \u00B7 Mobily \u00B7 Elm \u00B7 SABIC \u00B7 PIF \u00B7 Tamimi \u00B7 Alfanar \u00B7 Accenture KSA \u00B7 McKinsey KSA \u00B7 Amazon KSA";

  return (
    <>
      <style>{customStyles}</style>
      <div
        className={`${modeClass} min-h-screen transition-colors duration-500`}
        style={{ fontFamily: "'Plus Jakarta Sans', 'Almarai', sans-serif" }}
        dir="ltr"
      >
        {/* ======================= NAVBAR ======================= */}
        <nav
          className={`sticky top-0 z-50 backdrop-blur-xl ${
            isDark ? "bg-black/40" : "bg-white/70"
          } border-b ${borderColor}`}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
            {/* Logo */}
            <div className="flex items-center gap-1">
              <span
                className="text-2xl font-bold gradient-text"
                style={{ fontFamily: "'Almarai', sans-serif" }}
              >
                بصير
              </span>
              <span className={`text-2xl font-bold ${textSecondary}`}>
                {" | Baseer"}
              </span>
            </div>

            {/* Center nav (desktop) */}
            <div className="hidden items-center gap-8 md:flex">
              {["Features", "Templates", "Pricing", "FAQ"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm ${textSecondary} hover:${textPrimary} transition-colors`}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className="hidden items-center gap-3 md:flex">
              {/* Language toggle */}
              <button
                type="button"
                onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                className={`rounded-full border ${borderColor} px-3 py-1 text-xs ${textSecondary} hover:${textPrimary} transition`}
              >
                {lang === "ar" ? "EN | عر" : "عر | EN"}
              </button>

              {/* Dark/Light toggle */}
              <button
                type="button"
                onClick={() => setIsDark(!isDark)}
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${borderColor} ${textSecondary} hover:${textPrimary} transition`}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <button type="button" className={`text-sm ${textSecondary}`}>
                Sign In
              </button>

              <button
                type="button"
                className="rounded-full bg-[#C9A84C] px-6 py-2 text-sm font-bold text-[#0A0A14] transition hover:bg-[#D4954A] animate-pulse-glow"
              >
                {lang === "ar" ? "ابدأ مجاناً" : "Start Free"}
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className={`md:hidden ${textPrimary}`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile drawer */}
          {mobileOpen && (
            <div
              className={`md:hidden backdrop-blur-xl ${
                isDark ? "bg-black/80" : "bg-white/90"
              } border-b ${borderColor} px-4 pb-6 pt-2`}
            >
              <div className="flex flex-col gap-4">
                {["Features", "Templates", "Pricing", "FAQ"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`text-sm ${textSecondary}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                    className={`rounded-full border ${borderColor} px-3 py-1 text-xs ${textSecondary}`}
                  >
                    {lang === "ar" ? "EN | عر" : "عر | EN"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDark(!isDark)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border ${borderColor} ${textSecondary}`}
                  >
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  </button>
                </div>
                <button
                  type="button"
                  className="rounded-full bg-[#C9A84C] px-6 py-3 text-sm font-bold text-[#0A0A14] transition hover:bg-[#D4954A]"
                >
                  {lang === "ar" ? "ابدأ مجاناً" : "Start Free"}
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* ======================= HERO ======================= */}
        <section
          className={`relative min-h-screen overflow-hidden ${bg} flex items-center`}
        >
          {/* Blobs — gold + white only */}
          <div className="absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full bg-[#C9A84C]/10 blur-[120px] animate-blob" />
          <div className="absolute -bottom-[20%] -right-[10%] h-[500px] w-[500px] rounded-full bg-white/5 blur-[100px] animate-blob-reverse" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
              {/* Left content */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                {/* Badge */}
                <div
                  className={`slide-in-up mb-8 inline-flex items-center gap-2 rounded-full border ${borderColor} ${
                    isDark ? "bg-white/10" : "bg-black/5"
                  } px-4 py-1.5`}
                >
                  <span className={`text-xs ${textSecondary}`}>
                    {"✦ مصمّم لسوق العمل السعودي — Built for the Saudi Job Market"}
                  </span>
                </div>

                {/* Heading */}
                <h1
                  className="slide-in-up"
                  style={{ animationDelay: "0.1s" }}
                >
                  <span
                    className={`block text-5xl font-bold leading-tight md:text-7xl ${textPrimary}`}
                    style={{ fontFamily: "'Almarai', sans-serif" }}
                  >
                    سيرتك الذاتية
                  </span>
                  <span
                    className="block text-5xl font-bold leading-tight gradient-text-animated md:text-7xl"
                    style={{ fontFamily: "'Almarai', sans-serif" }}
                  >
                    بوابتك لأفضل الوظائف
                  </span>
                  <span
                    className={`mt-2 block text-3xl font-light md:text-5xl ${
                      isDark ? "text-white/80" : "text-[#1a1a2e]/80"
                    }`}
                  >
                    Your CV. Your Future.
                  </span>
                </h1>

                {/* Subtitle */}
                <p
                  className={`slide-in-up mx-auto mt-4 max-w-xl text-lg lg:mx-0 ${textSecondary}`}
                  style={{
                    animationDelay: "0.2s",
                    fontFamily: "'Almarai', sans-serif",
                  }}
                >
                  صمّم سيرة ذاتية تتخطى فلاتر التوظيف وتصل مباشرةً للمدير
                  المختص — في أقل من ١٠ دقائق
                </p>

                {/* CTAs */}
                <div
                  className="slide-in-up mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
                  style={{ animationDelay: "0.3s" }}
                >
                  <button
                    type="button"
                    className="group flex items-center gap-2 rounded-full bg-[#C9A84C] px-8 py-4 text-lg font-bold text-[#0A0A14] transition-transform hover:scale-105 hover:bg-[#D4954A] animate-pulse-glow"
                  >
                    <span style={{ fontFamily: "'Almarai', sans-serif" }}>
                      ابنِ سيرتي مجاناً
                    </span>
                    <ArrowRight
                      size={20}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                  <button
                    type="button"
                    className={`rounded-full border ${borderColor} px-8 py-4 ${textSecondary} transition hover:${
                      isDark ? "bg-white/10" : "bg-black/5"
                    }`}
                  >
                    {"شاهد كيف يعمل ▶"}
                  </button>
                </div>

                {/* Trust line */}
                <p
                  className={`slide-in-up mt-3 text-xs ${textMuted}`}
                  style={{
                    animationDelay: "0.35s",
                    fontFamily: "'Almarai', sans-serif",
                  }}
                >
                  بدون بطاقة ائتمان · بدون اشتراك شهري · جاهز في ١٠ دقائق
                </p>

                {/* ATS Score Widget */}
                <div
                  className="slide-in-up mt-12"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div
                    className={`flex flex-col items-center gap-6 rounded-3xl border ${borderColor} ${cardBg} p-6 sm:flex-row`}
                  >
                    {/* Circular progress */}
                    <div className="relative flex-shrink-0">
                      <svg
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        className="-rotate-90"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="#C9A84C"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="248 264"
                          style={{
                            animation: "ats-ring 2s ease-out forwards",
                          }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold gradient-text">
                          94
                        </span>
                        <span className={`text-xs ${textMuted}`}>
                          ATS Score
                        </span>
                      </div>
                    </div>

                    {/* Score details */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-green-400" />
                        <span className={`text-sm ${textSecondary}`}>
                          Formatting
                        </span>
                        <span className="text-sm text-green-400">
                          {"✓ Perfect"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-green-400" />
                        <span className={`text-sm ${textSecondary}`}>
                          Keywords
                        </span>
                        <span className="text-sm text-green-400">
                          {"✓ Matched"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-yellow-400" />
                        <span className={`text-sm ${textSecondary}`}>
                          Photo
                        </span>
                        <span className="text-sm text-yellow-400">
                          {"⚠ Optional"}
                        </span>
                      </div>
                      <div
                        className="mt-1 inline-flex w-fit items-center rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs text-green-400"
                      >
                        {"🎯 Top 5% of applicants"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating CV Mockup */}
              <div className="hidden lg:block">
                <div
                  className={`animate-float w-[280px] overflow-hidden rounded-2xl border ${borderColor} shadow-2xl shadow-[#C9A84C]/10`}
                >
                  {/* CV header */}
                  <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#D4954A]" />
                      <div>
                        <div
                          className="text-sm font-bold text-white"
                          style={{ fontFamily: "'Almarai', sans-serif" }}
                        >
                          أحمد الرشيدي
                        </div>
                        <div className="text-xs text-white/60">
                          {"Software Engineer · مهندس برمجيات"}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* CV body */}
                  <div
                    className={`${
                      isDark ? "bg-[#12121e]" : "bg-white"
                    } p-5`}
                  >
                    {/* Left gold accent border bar */}
                    <div className="mb-4 flex items-start gap-2">
                      <div className="mt-1 w-1 self-stretch rounded bg-[#C9A84C]" />
                      <div className="flex-1">
                        <div
                          className="mb-2 text-xs font-bold text-[#C9A84C]"
                          style={{ fontFamily: "'Almarai', sans-serif" }}
                        >
                          الخبرات
                        </div>
                        <div
                          className={`mb-1.5 h-2 w-full rounded ${
                            isDark ? "bg-white/10" : "bg-black/8"
                          }`}
                        />
                        <div
                          className={`mb-1.5 h-2 w-4/5 rounded ${
                            isDark ? "bg-white/10" : "bg-black/8"
                          }`}
                        />
                        <div
                          className={`mb-1.5 h-2 w-3/5 rounded ${
                            isDark ? "bg-white/10" : "bg-black/8"
                          }`}
                        />
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 w-1 self-stretch rounded bg-[#C9A84C]" />
                      <div className="flex-1">
                        <div
                          className="mb-2 text-xs font-bold text-[#C9A84C]"
                          style={{ fontFamily: "'Almarai', sans-serif" }}
                        >
                          المهارات
                        </div>
                        <div
                          className={`mb-1.5 h-2 w-3/4 rounded ${
                            isDark ? "bg-white/10" : "bg-black/8"
                          }`}
                        />
                        <div
                          className={`mb-1.5 h-2 w-1/2 rounded ${
                            isDark ? "bg-white/10" : "bg-black/8"
                          }`}
                        />
                        <div
                          className={`h-2 w-2/3 rounded ${
                            isDark ? "bg-white/10" : "bg-black/8"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= LOGO BAR ======================= */}
        <section
          className={`${bg2} border-y ${borderColor} py-10 overflow-hidden`}
        >
          <p
            className={`mb-6 text-center text-sm uppercase tracking-[0.3em] ${textMuted}`}
          >
            {"وُظِّف خبراؤنا في · OUR USERS WERE HIRED AT"}
          </p>
          <div className="relative overflow-hidden">
            <div className="animate-marquee flex whitespace-nowrap">
              <span
                className={`mx-8 text-lg font-bold ${textMuted}`}
              >
                {logos}
              </span>
              <span
                className={`mx-8 text-lg font-bold ${textMuted}`}
              >
                {logos}
              </span>
            </div>
          </div>
        </section>

        {/* ======================= FEATURES BENTO ======================= */}
        <section id="features" className={`${bg} py-16`}>
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Header */}
            <div className="slide-in-up text-center">
              <span
                className={`inline-flex items-center rounded-full border ${borderColor} ${
                  isDark ? "bg-white/5" : "bg-black/3"
                } px-4 py-1.5 text-xs ${textSecondary}`}
              >
                {"✦ المميزات · Features"}
              </span>
              <h2
                className={`mt-4 text-4xl font-bold md:text-5xl ${textPrimary}`}
                style={{ fontFamily: "'Almarai', sans-serif" }}
              >
                {"كل ما تحتاجه للحصول على "}
                <span className="gradient-text">وظيفة أحلامك</span>
              </h2>
              <p
                className={`mx-auto mt-3 max-w-lg ${textMuted}`}
                style={{ fontFamily: "'Almarai', sans-serif" }}
              >
                مصمّم خصيصًا للسوق السعودي — من شركات رؤية ٢٠٣٠ إلى الشركات
                العالمية
              </p>
            </div>

            {/* Bento Grid */}
            <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Cell 1 - ATS (col-span-2) */}
              <div
                className={`slide-in-up col-span-1 rounded-2xl border ${borderColor} ${cardBg} p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.15)] md:col-span-2`}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/8 border ${borderColor}`}>
                  <BarChart2 size={24} className="text-[#C9A84C]" />
                </div>
                <h3
                  className={`text-xl font-bold ${textPrimary}`}
                  style={{ fontFamily: "'Almarai', sans-serif" }}
                >
                  سيرتك تتجاوز كل الفلاتر الآلية
                </h3>
                <p className={`text-sm ${textSecondary}`}>
                  ATS-Optimized by Default
                </p>
                <p
                  className={`mt-2 text-sm leading-relaxed ${textMuted}`}
                  style={{ fontFamily: "'Almarai', sans-serif" }}
                >
                  قوالبنا مختبرة على أنظمة التوظيف في أرامكو السعودية ونيوم
                  والشركات الكبرى. درجة تطابق أعلى = فرص أكثر.
                </p>
                {/* Progress bars */}
                <div className="mt-6 flex flex-col gap-3">
                  {[
                    { label: "Saudi Aramco", pct: 89 },
                    { label: "NEOM", pct: 96 },
                    { label: "General", pct: 78 },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="flex items-center justify-between text-xs">
                        <span className={textSecondary}>{bar.label}</span>
                        <span className="text-[#C9A84C] font-semibold">
                          {bar.pct}%
                        </span>
                      </div>
                      <div
                        className={`mt-1 h-2 w-full overflow-hidden rounded-full ${
                          isDark ? "bg-white/10" : "bg-black/8"
                        }`}
                      >
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D4954A]"
                          style={{
                            width: `${bar.pct}%`,
                            animation: "progress-fill 1.5s ease-out",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cell 2 - AI Writing */}
              <div
                className={`slide-in-up rounded-2xl border ${borderColor} ${cardBg} p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.15)]`}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/8 border ${borderColor}`}>
                  <Sparkles size={24} className="text-[#C9A84C]" />
                </div>
                <h3
                  className={`text-lg font-bold ${textPrimary}`}
                  style={{ fontFamily: "'Almarai', sans-serif" }}
                >
                  ذكاء اصطناعي يكتب عنك
                </h3>
                <p className={`text-sm ${textSecondary}`}>
                  AI Writing Assistant
                </p>
                <p
                  className={`mt-2 text-sm leading-relaxed ${textMuted}`}
                  style={{ fontFamily: "'Almarai', sans-serif" }}
                >
                  حوّل تجربتك إلى إنجازات لا يستطيع المسؤول تجاهلها — بضغطة زر.
                </p>
                <div
                  className={`mt-4 rounded-lg border ${borderColor} ${
                    isDark ? "bg-white/5" : "bg-black/3"
                  } p-3`}
                >
                  <p className={`text-sm ${textSecondary}`}>
                    {"Improved customer satisfaction by"}
                    <span className="animate-typing-cursor ml-0.5 inline-block h-4 w-0.5 bg-[#C9A84C]" />
                  </p>
                </div>
              </div>

              {/* Cell 3 - Arabic-First */}
              <div
                className={`slide-in-up rounded-2xl border ${borderColor} ${cardBg} p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.15)]`}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/8 border ${borderColor}`}>
                  <Globe2 size={24} className="text-[#C9A84C]" />
                </div>
                <h3
                  className={`text-lg font-bold ${textPrimary}`}
                  style={{ fontFamily: "'Almarai', sans-serif" }}
                >
                  أول منصة تفهم العربية حقًا
                </h3>
                <p className={`text-sm ${textSecondary}`}>
                  True Arabic-First
                </p>
                <p
                  className={`mt-2 text-sm leading-relaxed ${textMuted}`}
                  style={{ fontFamily: "'Almarai', sans-serif" }}
                >
                  دعم كامل RTL، خط احترافي، وتنسيق صحيح. سيرتك العربية ستبدو
                  كأنها صُمِّمت بيد محترف.
                </p>
                {/* RTL preview */}
                <div
                  className={`mt-4 rounded-lg border ${borderColor} ${
                    isDark ? "bg-white/5" : "bg-black/3"
                  } p-3`}
                  dir="rtl"
                >
                  <div
                    className={`mb-1.5 h-2 w-full rounded ${
                      isDark ? "bg-white/15" : "bg-black/10"
                    }`}
                  />
                  <div
                    className={`mb-1.5 h-2 w-4/5 rounded ${
                      isDark ? "bg-white/10" : "bg-black/8"
                    }`}
                  />
                  <div
                    className={`h-2 w-3/5 rounded ${
                      isDark ? "bg-white/10" : "bg-black/8"
                    }`}
                  />
                </div>
              </div>

              {/* Cell 4 - Fast (10 minutes) with timeline */}
              <div
                className={`slide-in-up rounded-2xl border ${borderColor} ${cardBg} p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.15)]`}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/8 border ${borderColor}`}>
                  <Zap size={24} className="text-[#C9A84C]" />
                </div>
                <h3
                  className={`text-lg font-bold ${textPrimary}`}
                  style={{ fontFamily: "'Almarai', sans-serif" }}
                >
                  جاهز في ١٠ دقائق
                </h3>
                <p
                  className={`mt-1 text-sm ${textMuted}`}
                  style={{ fontFamily: "'Almarai', sans-serif" }}
                >
                  لا تعقيد، لا ضياع
                </p>
                <div className="mt-4 flex gap-6">
                  {/* Left: big number */}
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-black gradient-text">10</span>
                    <span
                      className={`mb-1 text-sm ${textMuted}`}
                      style={{ fontFamily: "'Almarai', sans-serif" }}
                    >
                      دقائق
                    </span>
                  </div>
                  {/* Right: vertical timeline */}
                  <div className="flex flex-col gap-0">
                    {[
                      { time: "٣ دقائق", label: "املأ بياناتك" },
                      { time: "٥ دقائق", label: "اختر القالب" },
                      { time: "٢ دقائق", label: "حمّل سيرتك" },
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="flex flex-col items-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-[#C9A84C] flex-shrink-0 mt-1" />
                          {idx < 2 && (
                            <div className="w-px h-5 bg-[#C9A84C]/40" />
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 pb-1">
                          <span className="text-xs font-bold text-[#C9A84C]">{step.time}</span>
                          <span className={`text-xs ${textMuted}`} style={{ fontFamily: "'Almarai', sans-serif" }}>{step.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cell 5 - How it works (col-span-2) */}
              <div
                className={`slide-in-up col-span-1 rounded-2xl border ${borderColor} ${cardBg} p-6 md:col-span-2`}
              >
                <h3
                  className={`mb-6 text-xl font-bold ${textPrimary}`}
                  style={{ fontFamily: "'Almarai', sans-serif" }}
                >
                  كيف يعمل بصير؟
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {[
                    {
                      icon: FileText,
                      num: "1",
                      ar: "أجب على أسئلة بسيطة",
                      en: "Answer simple questions",
                    },
                    {
                      icon: Wand2,
                      num: "2",
                      ar: "اختر قالبك",
                      en: "Pick your template",
                    },
                    {
                      icon: Download,
                      num: "3",
                      ar: "حمّل سيرتك فوراً",
                      en: "Download instantly",
                    },
                  ].map((step) => (
                    <div
                      key={step.num}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="relative mb-3">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-white/8 border ${borderColor}`}>
                          <step.icon size={24} className="text-[#C9A84C]" />
                        </div>
                        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#C9A84C] bg-transparent text-xs font-bold text-[#C9A84C]">
                          {step.num}
                        </span>
                      </div>
                      <p
                        className={`font-semibold ${textPrimary}`}
                        style={{ fontFamily: "'Almarai', sans-serif" }}
                      >
                        {step.ar}
                      </p>
                      <p className={`text-xs ${textMuted}`}>{step.en}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= PRICING ======================= */}
        <section
          id="pricing"
          className={`bg-gradient-to-b ${
            isDark
              ? "from-[#0A0A14] to-[#0D0D1A]"
              : "from-[#FAFAFA] to-[#F0F0F5]"
          } py-16`}
        >
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Header */}
            <div className="slide-in-up text-center">
              <span
                className={`inline-flex items-center rounded-full border ${borderColor} ${
                  isDark ? "bg-white/5" : "bg-black/3"
                } px-4 py-1.5 text-xs ${textSecondary}`}
              >
                {"✦ الأسعار · Pricing"}
              </span>
              <h2
                className="mt-4 text-4xl font-bold gradient-text-animated md:text-5xl"
                style={{ fontFamily: "'Almarai', sans-serif" }}
              >
                ادفع مرة واحدة. احتفظ بها للأبد.
              </h2>
              <p
                className={`mx-auto mt-3 max-w-lg text-sm ${textMuted}`}
                style={{ fontFamily: "'Almarai', sans-serif" }}
              >
                بينما المنافسون يشتركون شهريًا — أنت تدفع مرة واحدة فقط
              </p>
              <p className={`text-sm ${textMuted}`}>
                One payment. Lifetime access. No subscriptions. No hidden fees.
              </p>
            </div>

            {/* Cards */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border p-6 transition-all duration-300 ${
                    plan.popular
                      ? `scale-100 sm:scale-105 z-10 border-[#C9A84C]/30 ${
                          isDark
                            ? "bg-[#C9A84C]/10"
                            : "bg-[#C9A84C]/5"
                        } shadow-xl shadow-[#C9A84C]/10`
                      : `${borderColor} ${cardBg} hover:border-[#C9A84C]/50`
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="whitespace-nowrap rounded-full bg-[#C9A84C] px-4 py-1.5 text-xs font-bold text-[#0A0A14]">
                        {"🔥 الأكثر اختياراً · Best Value"}
                      </span>
                    </div>
                  )}
                  <div
                    className={`mb-1 text-xs font-semibold ${textMuted}`}
                    style={{ fontFamily: "'Almarai', sans-serif" }}
                  >
                    {plan.badge}
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold gradient-text">
                      {plan.price}
                    </span>
                    <span className={`mb-1 text-sm ${textMuted}`}>ر.س</span>
                  </div>
                  <p
                    className={`text-xs ${textMuted}`}
                    style={{ fontFamily: "'Almarai', sans-serif" }}
                  >
                    {plan.sub}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {plan.features.map((f, i) => (
                      <li
                        key={i}
                        className={`flex items-center gap-2 text-sm ${textSecondary}`}
                      >
                        <Check
                          size={14}
                          className="text-[#C9A84C]"
                        />
                        <span style={{ fontFamily: "'Almarai', sans-serif" }}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={`mt-6 w-full rounded-full py-3 text-sm font-semibold transition ${
                      plan.popular
                        ? "bg-[#C9A84C] text-[#0A0A14] font-bold hover:bg-[#D4954A] animate-pulse-glow"
                        : `border ${borderColor} ${textSecondary} hover:${
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

            {/* Trust row */}
            <p
              className={`mt-8 text-center text-sm ${textMuted}`}
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              {"🔒 دفع آمن · Secure Payment | ✓ مدى وفيزا وآبل باي | ↩ ضمان استرداد ٧ أيام"}
            </p>
          </div>
        </section>

        {/* ======================= TESTIMONIALS ======================= */}
        <section id="testimonials" className={`${bg} py-16`}>
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="slide-in-up text-center">
              <span
                className={`inline-flex items-center rounded-full border ${borderColor} ${
                  isDark ? "bg-white/5" : "bg-black/3"
                } px-4 py-1.5 text-xs ${textSecondary}`}
              >
                {"✦ آراء العملاء · Testimonials"}
              </span>
              <h2
                className={`mt-4 text-3xl font-bold md:text-4xl ${textPrimary}`}
                style={{ fontFamily: "'Almarai', sans-serif" }}
              >
                <span className="text-[#C9A84C]">{"+٢٤٠٠"}</span>{" مهني سعودي حصلوا على وظائفهم بالفعل"}
              </h2>
              <p className={`mt-2 text-sm ${textMuted}`}>
                {"2,400+ Saudi Professionals Already Got Hired"}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`slide-in-up rounded-2xl border ${borderColor} ${cardBg} p-6 transition-transform hover:scale-[1.02]`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A84C] to-[#D4954A] text-sm font-bold text-[#0A0A14]"
                        style={{ fontFamily: "'Almarai', sans-serif" }}
                      >
                        <span style={{ fontFamily: "'Almarai', sans-serif" }}>{t.initials}</span>
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#0A0A14] bg-green-400" />
                    </div>
                    <div>
                      <div
                        className={`font-semibold ${textPrimary}`}
                        style={{ fontFamily: "'Almarai', sans-serif" }}
                      >
                        {t.name}
                      </div>
                      <div
                        className={`text-xs ${textMuted}`}
                        style={{ fontFamily: "'Almarai', sans-serif" }}
                      >
                        {t.role}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <span key={si} className="text-amber-400">
                        {"★"}
                      </span>
                    ))}
                  </div>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${textSecondary}`}
                    style={{ fontFamily: "'Almarai', sans-serif" }}
                  >
                    {`"${t.text}"`}
                  </p>
                  <div className={`mt-2 text-xs ${textMuted}`}>
                    {"🇸🇦"} {t.city}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
              {[
                { num: "+٢٤٠٠", label: "سيرة ذاتية أُنشئت" },
                { num: "٩٤٪", label: "معدل اجتياز ATS" },
                { num: "+٨٠٪", label: "من المستخدمين حصلوا على مقابلات" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-8">
                  {i > 0 && (
                    <div
                      className={`hidden h-12 w-px md:block ${
                        isDark ? "bg-white/10" : "bg-black/8"
                      }`}
                    />
                  )}
                  <div className="text-center">
                    <div
                      className="text-3xl font-bold text-[#C9A84C]"
                      style={{ fontFamily: "'Almarai', sans-serif" }}
                    >
                      {stat.num}
                    </div>
                    <p
                      className={`text-sm ${textMuted}`}
                      style={{ fontFamily: "'Almarai', sans-serif" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================= ROADMAP ======================= */}
        <section className={`${bg2} py-16`}>
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="slide-in-up text-center">
              <h2
                className={`text-3xl font-bold md:text-4xl ${textPrimary}`}
                style={{ fontFamily: "'Almarai', sans-serif" }}
              >
                {"ماذا ينتظرك قادمًا؟"}
              </h2>
              <p className={`mt-2 text-sm ${textMuted}`}>
                {"What's Coming Next"}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  badge: "✓ متاح الآن",
                  badgeColor: "bg-[#C9A84C]/10 text-[#C9A84C] border-[#C9A84C]/20",
                  dotColor: "bg-[#C9A84C]",
                  items: [
                    "قوالب محسّنة لـ ATS",
                    "تصدير PDF و DOCX",
                    "مساعد كتابة بالذكاء الاصطناعي",
                    "دعم كامل للغة العربية RTL",
                  ],
                },
                {
                  badge: "⏳ قريباً",
                  badgeColor: `${isDark ? "bg-white/5 text-white/60 border-white/10" : "bg-black/5 text-black/60 border-black/10"}`,
                  dotColor: isDark ? "bg-white/40" : "bg-black/40",
                  items: [
                    "منشئ خطاب التغطية",
                    "محسّن ملف LinkedIn",
                    "تصاميم قوالب جديدة",
                    "نصائح التحضير للمقابلات",
                  ],
                },
                {
                  badge: "🔮 المستقبل",
                  badgeColor: `${isDark ? "bg-white/5 text-white/40 border-white/10" : "bg-black/5 text-black/40 border-black/10"}`,
                  dotColor: isDark ? "bg-white/25" : "bg-black/25",
                  items: [
                    "السيرة الذاتية بالفيديو",
                    "منشئ الملف الشخصي",
                    "متتبع طلبات التوظيف",
                    "لوحة تحليلات السيرة الذاتية",
                  ],
                },
              ].map((col, ci) => (
                <div
                  key={ci}
                  className={`slide-in-up rounded-2xl border ${borderColor} ${cardBg} p-6`}
                >
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${col.badgeColor}`}
                  >
                    {col.badge}
                  </span>
                  <ul className="mt-4 flex flex-col gap-3">
                    {col.items.map((item, ii) => (
                      <li
                        key={ii}
                        className={`flex items-center gap-3 text-sm ${textSecondary}`}
                        style={{ fontFamily: "'Almarai', sans-serif" }}
                      >
                        <span
                          className={`h-2 w-2 flex-shrink-0 rounded-full ${col.dotColor} animate-pulse`}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================= FAQ ======================= */}
        <section id="faq" className={`${bg} py-16`}>
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <div className="slide-in-up text-center">
              <h2
                className={`text-3xl font-bold md:text-4xl ${textPrimary}`}
                style={{ fontFamily: "'Almarai', sans-serif" }}
              >
                {"الأسئلة الشائعة · FAQ"}
              </h2>
            </div>

            <div className="mt-12 flex flex-col gap-3">
              {faqItems.map((item, i) => (
                <div
                  key={i}
                  className={`slide-in-up overflow-hidden rounded-xl border ${borderColor} ${cardBg} transition-all duration-300`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={`flex w-full items-center justify-between p-4 text-left text-sm font-medium ${textPrimary}`}
                    style={{ fontFamily: "'Almarai', sans-serif" }}
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={18}
                      className={`flex-shrink-0 ml-2 transition-transform duration-300 ${textMuted} ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      openFaq === i
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`px-4 pb-4 text-sm leading-relaxed ${textSecondary}`}
                        style={{ fontFamily: "'Almarai', sans-serif" }}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================= FINAL CTA ======================= */}
        <section className={`relative overflow-hidden ${bg} py-20`}>
          {/* Blobs */}
          <div className="absolute -left-[10%] -top-[20%] h-[400px] w-[400px] rounded-full bg-[#C9A84C]/10 blur-[120px] animate-blob" />
          <div className="absolute -bottom-[20%] -right-[10%] h-[350px] w-[350px] rounded-full bg-white/5 blur-[100px] animate-blob-reverse" />

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center lg:px-8">
            <h2
              className={`text-5xl font-bold md:text-6xl ${textPrimary}`}
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              <span>{"وظيفتك التالية "}</span>
              <span className="gradient-text-animated">تبدأ بسيرة ذاتية</span>
            </h2>
            <p
              className={`mt-2 text-3xl font-light md:text-4xl ${
                isDark ? "text-white/80" : "text-[#1a1a2e]/80"
              }`}
            >
              Your Next Job Starts Here
            </p>
            <p
              className={`mt-4 ${textMuted}`}
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              انضم إلى آلاف المهنيين السعوديين الذين وجدوا وظائفهم مع بصير
            </p>
            <button
              type="button"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#C9A84C] px-12 py-5 text-xl font-bold text-[#0A0A14] transition-transform hover:scale-105 hover:bg-[#D4954A] animate-pulse-glow"
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              {"ابنِ سيرتي الذاتية مجاناً ←"}
            </button>
            <p
              className={`mt-3 text-xs ${textMuted}`}
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              بدون بطاقة ائتمان · بدون اشتراك · جاهز في ١٠ دقائق
            </p>
          </div>
        </section>

        {/* ======================= FOOTER ======================= */}
        <footer className={`${bgFooter} border-t ${borderColor} pb-8 pt-16`}>
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-1">
                  <span
                    className="text-xl font-bold gradient-text"
                    style={{ fontFamily: "'Almarai', sans-serif" }}
                  >
                    بصير
                  </span>
                  <span className={`text-xl font-bold ${textSecondary}`}>
                    {" | Baseer"}
                  </span>
                </div>
                <p
                  className={`mt-2 text-sm ${textMuted}`}
                  style={{ fontFamily: "'Almarai', sans-serif" }}
                >
                  ابنِ سيرتك. افتح أبوابك.
                </p>
                <div className="mt-4 flex gap-3">
                  {/* WhatsApp */}
                  <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:opacity-80"
                    aria-label="WhatsApp"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                  {/* X / Twitter */}
                  <a
                    href="#"
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${isDark ? "bg-white text-black" : "bg-black text-white"} transition hover:opacity-80`}
                    aria-label="X"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0077B5] text-white transition hover:opacity-80"
                    aria-label="LinkedIn"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Product */}
              <div>
                <h4
                  className={`text-xs font-semibold uppercase tracking-widest ${textMuted}`}
                >
                  {"المنتج · Product"}
                </h4>
                <ul className="mt-4 flex flex-col gap-2">
                  {[
                    "المميزات / Features",
                    "القوالب / Templates",
                    "الأسعار / Pricing",
                    "الذكاء الاصطناعي / AI Features",
                  ].map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className={`text-sm ${
                          isDark
                            ? "text-white/60 hover:text-white"
                            : "text-[#1a1a2e]/60 hover:text-[#1a1a2e]"
                        } transition`}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4
                  className={`text-xs font-semibold uppercase tracking-widest ${textMuted}`}
                >
                  {"الشركة · Company"}
                </h4>
                <ul className="mt-4 flex flex-col gap-2">
                  {[
                    "من نحن / About",
                    "التوظيف / Careers",
                    "تواصل معنا / Contact",
                  ].map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className={`text-sm ${
                          isDark
                            ? "text-white/60 hover:text-white"
                            : "text-[#1a1a2e]/60 hover:text-[#1a1a2e]"
                        } transition`}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4
                  className={`text-xs font-semibold uppercase tracking-widest ${textMuted}`}
                >
                  {"الدعم · Support"}
                </h4>
                <ul className="mt-4 flex flex-col gap-2">
                  {[
                    "مركز المساعدة / Help Center",
                    "سياسة الخصوصية / Privacy Policy",
                    "شروط الاستخدام / Terms",
                    "سياسة الاسترداد / Refund Policy",
                  ].map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className={`text-sm ${
                          isDark
                            ? "text-white/60 hover:text-white"
                            : "text-[#1a1a2e]/60 hover:text-[#1a1a2e]"
                        } transition`}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom */}
            <div
              className={`mt-12 flex flex-col items-center justify-between gap-4 border-t ${borderColor} pt-6 sm:flex-row`}
            >
              <p className={`text-sm ${textMuted}`}>
                {"© 2026 بصير | Baseer. جميع الحقوق محفوظة."}
              </p>
              <p className={`text-sm ${textMuted}`}>
                {"🇸🇦 صُنع بـ ❤️ في المملكة العربية السعودية"}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
