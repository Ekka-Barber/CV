interface LogoProps {
  locale?: "en" | "ar";
  className?: string;
}

export function Logo({ locale = "en", className = "" }: LogoProps) {
  const appName = locale === "ar" ? "منشئ السيرة الذاتية" : "CV Builder";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect
          x="2"
          y="2"
          width="28"
          height="28"
          rx="6"
          fill="var(--color-primary)"
        />
        <rect x="6" y="8" width="14" height="3" rx="1.5" fill="white" />
        <rect x="6" y="14" width="20" height="2" rx="1" fill="rgba(255,255,255,0.7)" />
        <rect x="6" y="18" width="16" height="2" rx="1" fill="rgba(255,255,255,0.7)" />
        <rect x="6" y="22" width="12" height="2" rx="1" fill="rgba(255,255,255,0.7)" />
        <circle cx="24" cy="10" r="3" fill="var(--color-accent)" />
      </svg>
      <span className="text-lg font-semibold text-[var(--color-primary)]">
        {appName}
      </span>
    </div>
  );
}
