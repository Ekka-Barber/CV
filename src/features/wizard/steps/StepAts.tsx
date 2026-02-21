import type { Resume } from "@/types/resume";
import type { Locale } from "@/i18n/translations";

interface StepAtsProps {
  locale: Locale;
  resume: Resume;
  easyMode: boolean;
  onUpdate: (updater: (r: Resume) => Resume) => void;
  onNext: () => void;
  onBack: () => void;
  t: (key: string) => string;
}

export function StepAts({
  onNext,
  onBack,
  t,
}: StepAtsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">
        {t("wizard.steps.ats")}
      </h2>
      <p className="text-sm text-slate-600">
        You can run ATS analysis in the editor. For now, continue to export.
      </p>
      <div className="flex gap-4">
        <button type="button" onClick={onBack} className="rounded border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50">
          {t("wizard.back")}
        </button>
        <button type="button" onClick={onNext} className="rounded bg-[var(--color-primary)] px-4 py-2 text-white hover:bg-[var(--color-primary-dark)]">
          {t("wizard.next")}
        </button>
      </div>
    </div>
  );
}
