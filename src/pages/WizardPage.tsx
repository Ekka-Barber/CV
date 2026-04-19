import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Resume } from "@/types/resume";
import { Header } from "@/components/Layout/Header";
import { WizardSteps } from "@/features/wizard/WizardSteps";
import { useAppStore } from "@/store/useAppStore";
import { useTranslation } from "@/i18n/useTranslation";

const STEPS = 10;

export function WizardPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { locale, guestResumes, updateGuestResume } = useAppStore((s) => ({
    locale: s.locale,
    guestResumes: s.guestResumes,
    updateGuestResume: s.updateGuestResume,
  }));
  const { t } = useTranslation(locale);

  const resume = guestResumes.find((r) => r.id === id);
  const [step, setStep] = useState(0);
  const [easyMode, setEasyMode] = useState(true);

  const handleUpdate = useCallback(
    (updater: (r: Resume) => Resume) => {
      if (!id || !resume) return;
      updateGuestResume(id, (r) => ({
        ...updater(r),
        updatedAt: new Date().toISOString(),
      }));
    },
    [id, resume, updateGuestResume]
  );

  const currentResume = resume ?? null;

  if (!id) {
    navigate("/app");
    return null;
  }

  if (!currentResume) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Resume not found.</p>
        <button
          type="button"
          onClick={() => navigate("/app")}
          className="ml-4 text-[var(--color-accent)]"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header showAuth={false} />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2 rounded border border-slate-200 p-0.5">
            <button
              type="button"
              onClick={() => setEasyMode(true)}
              className={`rounded px-3 py-1.5 text-sm ${
                easyMode ? "bg-[var(--color-primary)] text-white" : "text-slate-600"
              }`}
            >
              {t("wizard.easyMode")}
            </button>
            <button
              type="button"
              onClick={() => setEasyMode(false)}
              className={`rounded px-3 py-1.5 text-sm ${
                !easyMode ? "bg-[var(--color-primary)] text-white" : "text-slate-600"
              }`}
            >
              {t("wizard.professionalMode")}
            </button>
          </div>
        </div>
        <div className="mb-6 h-2 rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-[var(--color-accent)] transition-all"
            style={{ width: `${((step + 1) / STEPS) * 100}%` }}
          />
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <WizardSteps
            step={step}
            resume={currentResume}
            resumeId={id}
            easyMode={easyMode}
            onUpdate={handleUpdate}
            onNext={() => setStep((s) => Math.min(s + 1, STEPS - 1))}
            onBack={() => setStep((s) => Math.max(s - 1, 0))}
            onFinish={() => {}}
          />
        </div>
      </main>
    </div>
  );
}
