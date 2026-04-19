import { Link } from "react-router-dom";
import { useTranslation } from "@/i18n/useTranslation";
import { useAppStore } from "@/store/useAppStore";
import { Logo } from "./Logo";

interface HeaderProps {
  showAuth?: boolean;
}

export function Header({ showAuth = true }: HeaderProps) {
  const { locale, setLocale } = useAppStore((s) => ({
    locale: s.locale,
    setLocale: s.setLocale,
  }));
  const { t } = useTranslation(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-[var(--color-surface)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-surface)]/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="flex items-center gap-4">
          <div className="flex rounded border border-slate-200 bg-slate-50 p-0.5">
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`rounded px-2 py-1 text-sm ${
                locale === "en"
                  ? "bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t("en")}
            </button>
            <button
              type="button"
              onClick={() => setLocale("ar")}
              className={`rounded px-2 py-1 text-sm ${
                locale === "ar"
                  ? "bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t("ar")}
            </button>
          </div>
          {showAuth && (
            <>
              <Link
                to="/auth/sign-in"
                className="text-sm font-medium text-slate-700 hover:text-[var(--color-primary)]"
              >
                {t("signIn")}
              </Link>
              <Link
                to="/auth/sign-up"
                className="rounded bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)]"
              >
                {t("signUp")}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
