import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "@/i18n/useTranslation";
import { Header } from "@/components/Layout/Header";
import { authApi } from "@/services/api";
import { useAppStore } from "@/store/useAppStore";

export function SignInPage() {
  const locale = useAppStore((s) => s.locale);
  const { t } = useTranslation(locale);
  const navigate = useNavigate();
  const setUser = useAppStore((s) => s.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { data, error: err } = await authApi.signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    if (data?.user && typeof data.user === "object" && "email" in data.user) {
      setUser({
        id: (data.user as { id?: string }).id ?? "",
        email: (data.user as { email?: string }).email ?? email,
      });
    }
    navigate("/app");
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header />
      <main className="mx-auto max-w-md px-4 py-12">
        <h1 className="text-2xl font-semibold text-slate-900">
          {t("auth.signIn")}
        </h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <p className="rounded border border-[var(--color-error)] bg-red-50 p-3 text-sm text-[var(--color-error)]">
              {error}
            </p>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              {t("auth.email")}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-base focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              {t("auth.password")}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-base focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-[var(--color-primary)] py-2.5 font-medium text-white hover:bg-[var(--color-primary-dark)] disabled:opacity-60"
          >
            {loading ? "…" : t("auth.signIn")}
          </button>
        </form>
        <button
          type="button"
          onClick={() => navigate("/app", { state: { guest: true } })}
          className="mt-4 w-full text-center text-sm text-slate-600 hover:text-[var(--color-accent)]"
        >
          {t("auth.guestMode")}
        </button>
        <p className="mt-2 text-center text-xs text-slate-500">
          {t("auth.guestWarning")}
        </p>
        <p className="mt-6 text-center text-sm text-slate-600">
          <Link to="/auth/sign-up" className="text-[var(--color-accent)] hover:underline">
            {t("auth.signUp")}
          </Link>
        </p>
      </main>
    </div>
  );
}
