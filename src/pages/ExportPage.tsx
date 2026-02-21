import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { useAppStore } from "@/store/useAppStore";
import { useTranslation } from "@/i18n/useTranslation";

export function ExportPage() {
  const { id } = useParams<{ id: string }>();
  const locale = useAppStore((s) => s.locale);
  const { t } = useTranslation(locale);
  const user = useAppStore((s) => s.user);
  const guestResumes = useAppStore((s) => s.guestResumes);
  const resume = guestResumes.find((r) => r.id === id);
  const [showLoginModal, setShowLoginModal] = useState(false);

  function handleExport(format: "pdf" | "docx") {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    alert(`Export ${format} would be triggered. Backend not implemented.`);
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
          ← Editor
        </Link>
        <h1 className="text-2xl font-semibold text-slate-900">
          {t("export.title")}
        </h1>
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="font-medium text-slate-800">{t("export.checklist")}</h2>
          <ul className="mt-2 list-inside list-disc text-sm text-slate-600">
            <li>Single-column layout</li>
            <li>No images or icons</li>
            <li>Standard section headings</li>
          </ul>
        </div>
        <div className="mt-6 flex gap-4">
          <button
            type="button"
            onClick={() => handleExport("pdf")}
            className="rounded bg-[var(--color-primary)] px-6 py-3 font-medium text-white hover:bg-[var(--color-primary-dark)]"
          >
            {t("export.downloadPdf")}
          </button>
          <button
            type="button"
            onClick={() => handleExport("docx")}
            className="rounded border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
          >
            {t("export.downloadDocx")}
          </button>
        </div>
        {!user && (
          <p className="mt-4 text-sm text-slate-500">
            {t("export.loginRequired")}
          </p>
        )}
      </main>

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="rounded-lg bg-white p-6 shadow-xl">
            <h3 className="font-semibold">{t("export.loginRequired")}</h3>
            <p className="mt-2 text-sm text-slate-600">
              Sign in to export your CV as PDF or DOCX.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="rounded border border-slate-300 px-4 py-2"
              >
                {t("common.cancel")}
              </button>
              <Link
                to="/auth/sign-in"
                className="rounded bg-[var(--color-primary)] px-4 py-2 text-white"
              >
                {t("signIn")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
