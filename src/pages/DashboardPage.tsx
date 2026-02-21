import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/i18n/useTranslation";
import type { Resume } from "@/types/resume";
import { Header } from "@/components/Layout/Header";
import { createEmptyResume } from "@/utils/createResume";
import { useAppStore, generateId } from "@/store/useAppStore";

export function DashboardPage() {
  const locale = useAppStore((s) => s.locale);
  const { t } = useTranslation(locale);
  const navigate = useNavigate();
  const guestResumes = useAppStore((s) => s.guestResumes);
  const addGuestResume = useAppStore((s) => s.addGuestResume);
  const deleteGuestResume = useAppStore((s) => s.deleteGuestResume);
  const duplicateGuestResume = useAppStore((s) => s.duplicateGuestResume);

  const resumes = guestResumes;

  function handleCreate() {
    const id = generateId();
    const resume = createEmptyResume(id);
    addGuestResume(resume);
    navigate(`/app/resume/${id}/wizard`);
  }

  function handleOpen(id: string) {
    navigate(`/app/resume/${id}/editor`);
  }

  function handleDuplicate(id: string) {
    const copy = duplicateGuestResume(id);
    if (copy) navigate(`/app/resume/${copy.id}/editor`);
  }

  function handleDelete(id: string) {
    if (window.confirm(t("common.delete") + "?")) {
      deleteGuestResume(id);
    }
  }

  function formatDate(iso: string) {
    try {
      return new Date(iso).toLocaleDateString(locale === "ar" ? "ar" : "en");
    } catch {
      return iso;
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header showAuth={false} />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">
            {t("dashboard.title")}
          </h1>
          <button
            type="button"
            onClick={handleCreate}
            className="rounded bg-[var(--color-primary)] px-4 py-2 font-medium text-white hover:bg-[var(--color-primary-dark)]"
          >
            {t("dashboard.createNew")}
          </button>
        </div>
        {resumes.length === 0 ? (
          <div className="mt-12 rounded-lg border border-slate-200 bg-white p-12 text-center">
            <p className="text-slate-600">{t("dashboard.noResumes")}</p>
            <button
              type="button"
              onClick={handleCreate}
              className="mt-4 rounded bg-[var(--color-accent)] px-4 py-2 font-medium text-white hover:bg-[var(--color-accent-hover)]"
            >
              {t("dashboard.createNew")}
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {resumes.map((r: Resume) => (
              <div
                key={r.id}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <h2 className="font-medium text-slate-900">{r.title}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {r.languageMode} · {t("dashboard.lastUpdated")}: {formatDate(r.updatedAt)}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpen(r.id)}
                    className="rounded border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {t("dashboard.open")}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDuplicate(r.id)}
                    className="rounded border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {t("dashboard.duplicate")}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(r.id)}
                    className="rounded border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
                  >
                    {t("dashboard.delete")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
