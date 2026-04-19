import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { useAppStore } from "@/store/useAppStore";
import { useTranslation } from "@/i18n/useTranslation";

export function AtsPage() {
  const { id } = useParams<{ id: string }>();
  const { locale, guestResumes } = useAppStore((s) => ({
    locale: s.locale,
    guestResumes: s.guestResumes,
  }));
  const { t } = useTranslation(locale);
  const resume = guestResumes.find((r) => r.id === id);

  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    missingKeywords: string[];
    suggestions: string[];
  } | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);

  async function handleAnalyze() {
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 800));
    setResult({
      score: 72,
      missingKeywords: ["Python", "Agile", "Scrum"],
      suggestions: [
        "Add Python to skills if relevant",
        "Mention Agile/Scrum experience",
      ],
    });
    setLoading(false);
  }

  if (!id || !resume) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Resume not found.</p>
        <Link to="/app" className="ml-4 text-[var(--color-accent)]">
          Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header showAuth={false} />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <Link
          to={`/app/resume/${id}/editor`}
          className="mb-6 inline-block text-sm text-[var(--color-accent)] hover:underline"
        >
          ← {t("common.backToEditor")}
        </Link>
        <h1 className="text-2xl font-semibold text-slate-900">
          {t("ats.title")}
        </h1>
        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-700">
            {t("ats.pasteJobDesc")}
          </label>
          <textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            rows={8}
            placeholder="Paste the full job description here..."
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          />
        </div>
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-4 rounded bg-[var(--color-primary)] px-4 py-2 font-medium text-white hover:bg-[var(--color-primary-dark)] disabled:opacity-60"
        >
          {loading ? "…" : t("ats.analyze")}
        </button>

        {result && (
          <div className="mt-8 space-y-6 rounded-lg border border-slate-200 bg-white p-6">
            <div>
              <span className="text-sm text-slate-600">{t("ats.score")}: </span>
              <span className="text-2xl font-bold text-[var(--color-accent)]">
                {result.score}/100
              </span>
            </div>
            {result.missingKeywords.length > 0 && (
              <div>
                <h3 className="font-medium text-slate-800">
                  {t("ats.missingKeywords")}
                </h3>
                <ul className="mt-2 list-inside list-disc text-slate-600">
                  {result.missingKeywords.map((k, i) => (
                    <li key={i}>{k}</li>
                  ))}
                </ul>
              </div>
            )}
            {result.suggestions.length > 0 && (
              <div>
                <h3 className="font-medium text-slate-800">
                  {t("ats.suggestions")}
                </h3>
                <ul className="mt-2 list-inside list-disc text-slate-600">
                  {result.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              type="button"
              onClick={() => setShowApplyModal(true)}
              className="rounded bg-[var(--color-accent)] px-4 py-2 font-medium text-white hover:bg-[var(--color-accent-hover)]"
            >
              {t("ats.applyImprovements")}
            </button>
          </div>
        )}

        {showApplyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="rounded-lg bg-white p-6 shadow-xl">
              <h3 className="font-semibold">Apply Improvements</h3>
              <p className="mt-2 text-sm text-slate-600">
                This will update your resume with the suggested changes. Continue?
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="rounded border border-slate-300 px-4 py-2"
                >
                  {t("common.cancel")}
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="rounded bg-[var(--color-primary)] px-4 py-2 text-white"
                >
                  {t("common.confirm")}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
