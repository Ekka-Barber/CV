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
  MessageSquare,
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
  0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.4); }
  50% { box-shadow: 0 0 60px rgba(99,102,241,0.6); }
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
  background: linear-gradient(135deg, #6366F1, #06B6D4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gradient-text-animated {
  background: linear-gradient(135deg, #6366F1, #06B6D4, #A78BFA, #6366F1);
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
      initials: "أ",
      gradient: "from-[#6366F1] to-[#06B6D4]",
      name: "أحمد الرشيدي",
      role: "مهندس برمجيات",
      city: "الرياض",
      stars: 5,
      text: "كنت أرسل سيرتي دون ردود — حتى استخدمت بصير. حصلت على ٥ مقابلات في أسبوعين فقط!",
    },
    {
      initials: "س",
      gradient: "from-[#A78BFA] to-[#EC4899]",
      name: "سارة الفهد",
      role: "مديرة تسويق \u00B7 جدة",
      city: "جدة",
      stars: 5,
      text: "الدعم الكامل للغة العربية مذهل — أخيراً منصة تفهم RTL بشكل صحيح. سيرتي العربية تبدو احترافية جداً.",
    },
    {
      initials: "م",
      gradient: "from-[#06B6D4] to-[#10B981]",
      name: "محمد القاسم",
      role: "محلل مالي \u00B7 الدمام",
      city: "الدمام",
      stars: 5,
      text: "ميزة الذكاء الاصطناعي وفّرت عليّ ساعات. حوّلت نقاطي العادية إلى إنجازات مؤثرة. أنصح به بشدة!",
    },
    {
      initials: "ف",
      gradient: "from-[#F59E0B] to-[#F97316]",
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
                className="rounded-full bg-gradient-to-r from-[#6366F1] to-[#06B6D4] px-6 py-2 text-sm font-semibold text-white animate-pulse-glow"
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
                  className="rounded-full bg-gradient-to-r from-[#6366F1] to-[#06B6D4] px-6 py-3 text-sm font-semibold text-white"
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
          {/* Blobs */}
          <div className="absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full bg-[#6366F1]/20 blur-[120px] animate-blob" />
          <div className="absolute -bottom-[20%] -right-[10%] h-[500px] w-[500px] rounded-full bg-[#06B6D4]/15 blur-[100px] animate-blob-reverse" />
          <div className="absolute left-[40%] top-[40%] h-[300px] w-[300px] rounded-full bg-[#A78BFA]/10 blur-[80px] animate-blob-slow" />

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
                    className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6366F1] to-[#06B6D4] px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-105 animate-pulse-glow"
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
                          stroke="url(#atsGradient)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="248 264"
                          style={{
                            animation: "ats-ring 2s ease-out forwards",
                          }}
                        />
                        <defs>
                          <linearGradient
                            id="atsGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#6366F1" />
                            <stop offset="100%" stopColor="#06B6D4" />
                          </linearGradient>
                        </defs>
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
                        className={`mt-1 inline-flex w-fit items-center rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs text-green-400`}
                      >
                        {"🎯 Top 5% of applicants"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating CV Mockup (desktop) */}
              <div className="hidden lg:block">
                <div
                  className={`animate-float w-[280px] overflow-hidden rounded-2xl border ${borderColor} shadow-2xl shadow-indigo-500/20`}
                >
                  {/* CV header */}
                  <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#06B6D4]" />
                      <div>
                        <div
                          className="text-sm font-bold text-white"
                          style={{ fontFamily: "'Almarai', sans-serif" }}
                        >
                          أحمد الرشيدي
                        </div>
                        <div className="text-xs text-white/60">
                          Software Engineer
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
                    <div className="mb-4 flex items-start gap-2">
                      <div className="mt-1 w-1 self-stretch rounded bg-[#6366F1]" />
                      <div className="flex-1">
                        <div
                          className="mb-2 text-xs font-bold text-[#6366F1]"
                          style={{ fontFamily: "'Almarai', sans-serif" }}
                        >
                          الخبرات العملية
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
                      <div className="mt-1 w-1 self-stretch rounded bg-[#6366F1]" />
                      <div className="flex-1">
                        <div
                          className="mb-2 text-xs font-bold text-[#6366F1]"
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
        <section id="features" className={`${bg} py-24`}>
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
                className={`slide-in-up col-span-1 rounded-2xl border ${borderColor} ${cardBg} p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] md:col-span-2`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#6366F1]/60">
                  <BarChart2 size={24} className="text-white" />
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
                        <span className="gradient-text font-semibold">
                          {bar.pct}%
                        </span>
                      </div>
                      <div
                        className={`mt-1 h-2 w-full overflow-hidden rounded-full ${
                          isDark ? "bg-white/10" : "bg-black/8"
                        }`}
                      >
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#06B6D4]"
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
                className={`slide-in-up rounded-2xl border ${borderColor} ${cardBg} p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(167,139,250,0.3)]`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#A78BFA] to-[#A78BFA]/60">
                  <Sparkles size={24} className="text-white" />
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
                    <span className="animate-typing-cursor ml-0.5 inline-block h-4 w-0.5 bg-[#6366F1]" />
                  </p>
                </div>
              </div>

              {/* Cell 3 - Arabic-First */}
              <div
                className={`slide-in-up rounded-2xl border ${borderColor} ${cardBg} p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#06B6D4]/60">
                  <Globe2 size={24} className="text-white" />
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

              {/* Cell 4 - Fast */}
              <div
                className={`slide-in-up rounded-2xl border ${borderColor} ${cardBg} p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#F59E0B]/60">
                  <Zap size={24} className="text-white" />
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
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-6xl font-black gradient-text">10</span>
                  <span
                    className={`mb-2 text-sm ${textMuted}`}
                    style={{ fontFamily: "'Almarai', sans-serif" }}
                  >
                    دقائق
                  </span>
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
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#6366F1] to-[#06B6D4]">
                          <step.icon size={24} className="text-white" />
                        </div>
                        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#6366F1] text-xs font-bold text-white">
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
          } py-24`}
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
                      ? `scale-100 sm:scale-105 z-10 border-transparent bg-gradient-to-b ${
                          isDark
                            ? "from-[#6366F1]/20 to-[#06B6D4]/10"
                            : "from-[#6366F1]/10 to-[#06B6D4]/5"
                        } shadow-xl shadow-indigo-500/10`
                      : `${borderColor} ${cardBg} hover:border-indigo-500/50`
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="whitespace-nowrap rounded-full bg-gradient-to-r from-[#6366F1] to-[#06B6D4] px-4 py-1.5 text-xs font-bold text-white">
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
                          className={
                            plan.popular ? "text-[#06B6D4]" : "text-[#6366F1]"
                          }
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
                        ? "bg-gradient-to-r from-[#6366F1] to-[#06B6D4] text-white animate-pulse-glow"
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
        <section id="testimonials" className={`${bg} py-24`}>
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
                {"+٢٤٠٠ مهني سعودي حصلوا على وظائفهم بالفعل"}
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
                        className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-sm font-bold text-white`}
                        style={{ fontFamily: "'Almarai', sans-serif" }}
                      >
                        {t.initials}
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
            <div className="mt-16 flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
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
                      className="text-3xl font-bold gradient-text"
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
        <section className={`${bg2} py-20`}>
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
                  badgeColor: "bg-green-500/10 text-green-400 border-green-500/20",
                  dotColor: "bg-green-400",
                  items: [
                    "قوالب محسّنة لـ ATS",
                    "تصدير PDF و DOCX",
                    "مساعد كتابة بالذكاء الاصطناعي",
                    "دعم كامل للغة العربية RTL",
                  ],
                },
                {
                  badge: "⏳ قريباً",
                  badgeColor:
                    "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
                  dotColor: "bg-indigo-400",
                  items: [
                    "منشئ خطاب التغطية",
                    "محسّن ملف LinkedIn",
                    "تصاميم قوالب جديدة",
                    "نصائح التحضير للمقابلات",
                  ],
                },
                {
                  badge: "🔮 المستقبل",
                  badgeColor:
                    "bg-violet-500/10 text-violet-400 border-violet-500/20",
                  dotColor: "bg-violet-400",
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
        <section id="faq" className={`${bg} py-20`}>
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
        <section className={`relative overflow-hidden ${bg} py-28`}>
          {/* Blobs */}
          <div className="absolute -left-[10%] -top-[20%] h-[400px] w-[400px] rounded-full bg-[#6366F1]/10 blur-[120px] animate-blob" />
          <div className="absolute -bottom-[20%] -right-[10%] h-[350px] w-[350px] rounded-full bg-[#06B6D4]/10 blur-[100px] animate-blob-reverse" />

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center lg:px-8">
            <div className="animate-float mb-6 text-5xl">🚀</div>
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
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6366F1] to-[#06B6D4] px-12 py-5 text-xl font-semibold text-white transition-transform hover:scale-105 animate-pulse-glow"
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
                  {/* Social icons */}
                  {["WhatsApp", "X", "LinkedIn"].map((social) => (
                    <button
                      key={social}
                      type="button"
                      className={`flex h-9 w-9 items-center justify-center rounded-full border ${borderColor} ${textMuted} transition hover:border-indigo-500 hover:text-[#6366F1]`}
                      aria-label={social}
                    >
                      <MessageSquare size={16} />
                    </button>
                  ))}
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
