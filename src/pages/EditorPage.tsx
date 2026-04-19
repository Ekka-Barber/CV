import { useState, useCallback, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import type { Resume } from "@/types/resume";
import { Header } from "@/components/Layout/Header";
import { CVPreview } from "@/components/CVPreview/CVPreview";
import { useAppStore } from "@/store/useAppStore";
import { useTranslation } from "@/i18n/useTranslation";

function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number) {
  let t: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

export function EditorPage() {
  const { id } = useParams<{ id: string }>();
  const { locale, guestResumes, updateGuestResume } = useAppStore((s) => ({
    locale: s.locale,
    guestResumes: s.guestResumes,
    updateGuestResume: s.updateGuestResume,
  }));
  const { t } = useTranslation(locale);

  const resume = guestResumes.find((r) => r.id === id);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const debouncedSave = useRef(
    debounce(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 1500);
    }, 1200)
  );

  const handleUpdate = useCallback(
    (updater: (r: Resume) => Resume) => {
      if (!id || !resume) return;
      setSaveStatus("saving");
      updateGuestResume(id, (r) => ({
        ...updater(r),
        updatedAt: new Date().toISOString(),
      }));
      debouncedSave.current();
    },
    [id, resume, updateGuestResume]
  );

  if (!id) return null;
  if (!resume) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Resume not found.</p>
        <Link to="/app" className="ml-4 text-[var(--color-accent)]">
          Dashboard
        </Link>
      </div>
    );
  }

  const previewLang: "en" | "ar" =
    resume.languageMode === "AR" ? "ar" : resume.languageMode === "EN" ? "en" : locale;

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header showAuth={false} />
      <div className="flex items-start justify-between gap-4 px-4 py-4">
        <aside className="sticky top-20 w-80 space-y-4 overflow-y-auto rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              {saveStatus === "saving" && t("common.saving")}
              {saveStatus === "saved" && t("common.saved")}
            </span>
            <Link
              to="/app"
              className="text-sm text-[var(--color-accent)] hover:underline"
            >
              ← Dashboard
            </Link>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              {t("editor.languageMode")}
            </label>
            <select
              value={resume.languageMode}
              onChange={(e) =>
                handleUpdate((r) => ({
                  ...r,
                  languageMode: e.target.value as Resume["languageMode"],
                }))
              }
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            >
              <option value="AR">AR</option>
              <option value="EN">EN</option>
              <option value="BILINGUAL">BILINGUAL</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              {t("editor.template")}
            </label>
            <select
              value={resume.templateKey}
              onChange={(e) =>
                handleUpdate((r) => ({
                  ...r,
                  templateKey: e.target.value as Resume["templateKey"],
                }))
              }
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            >
              <option value="classic">Classic</option>
              <option value="modern-minimal">Modern Minimal</option>
              <option value="executive">Executive</option>
            </select>
          </div>
          <div className="border-t border-slate-200 pt-4">
            <p className="mb-2 text-xs text-slate-500">{t("editor.helperText")}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded border border-slate-300 px-2 py-1 text-sm hover:bg-slate-50"
              >
                {t("editor.improveText")}
              </button>
              <button
                type="button"
                className="rounded border border-slate-300 px-2 py-1 text-sm hover:bg-slate-50"
              >
                {t("editor.rewriteBullets")}
              </button>
              <button
                type="button"
                className="rounded border border-slate-300 px-2 py-1 text-sm hover:bg-slate-50"
              >
                {t("editor.translate")}
              </button>
              <button
                type="button"
                className="rounded border border-slate-300 px-2 py-1 text-sm hover:bg-slate-50"
              >
                {t("editor.makeMeasurable")}
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/app/resume/${id}/ats`}
              className="flex-1 rounded border border-slate-300 px-3 py-2 text-center text-sm hover:bg-slate-50"
            >
              ATS Analyzer
            </Link>
            <Link
              to={`/app/resume/${id}/export`}
              className="flex-1 rounded bg-[var(--color-accent)] px-3 py-2 text-center text-sm text-white hover:bg-[var(--color-accent-hover)]"
            >
              Export
            </Link>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <CVPreview resume={resume} lang={previewLang} />
        </main>
      </div>
    </div>
  );
}
