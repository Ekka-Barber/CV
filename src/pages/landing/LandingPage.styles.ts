export const customStyles = `
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
@keyframes marquee-testimonials {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
}

.animate-float { animation: float 4s ease-in-out infinite; }
.animate-blob { animation: blob-move 10s ease-in-out infinite; }
.animate-blob-reverse { animation: blob-move 14s ease-in-out infinite reverse; }
.animate-blob-slow { animation: blob-move 8s ease-in-out infinite; }
.animate-gradient { animation: gradient-shift 6s ease infinite; background-size: 200% 200%; }
.animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
.animate-typing-cursor { animation: typing-cursor 1s step-end infinite; }
.animate-marquee { animation: marquee 30s linear infinite; }
.animate-marquee-testimonials { animation: marquee-testimonials 25s linear infinite; }

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

/* RTL support */
[dir="rtl"] .rtl-flip {
  transform: scaleX(-1);
}
`;

export function getThemeClasses(isDark: boolean) {
  return {
    modeClass: isDark ? "dark-mode" : "light-mode",
    bg: isDark ? "bg-[#0A0A14]" : "bg-[#FAFAFA]",
    bg2: isDark ? "bg-[#0D0D1A]" : "bg-[#F0F0F5]",
    bgFooter: isDark ? "bg-[#06060F]" : "bg-[#E8E8ED]",
    textPrimary: isDark ? "text-white" : "text-[#1a1a2e]",
    textSecondary: isDark ? "text-white/70" : "text-[#1a1a2e]/70",
    textMuted: isDark ? "text-white/40" : "text-[#1a1a2e]/40",
    borderColor: isDark ? "border-white/10" : "border-black/8",
    cardBg: isDark
      ? "bg-white/[0.04] backdrop-blur-xl"
      : "bg-black/[0.03] backdrop-blur-xl",
  };
}
