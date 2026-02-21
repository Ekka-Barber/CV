import type { Resume } from "@/types/resume";
import type { Locale } from "@/i18n/translations";

interface StepSummaryProps {
  locale: Locale;
  resume: Resume;
  easyMode: boolean;
  onUpdate: (updater: (r: Resume) => Resume) => void;
  onNext: () => void;
  onBack: () => void;
  t: (key: string) => string;
}

export function StepSummary({
  resume,
  easyMode,
  onUpdate,
  onNext,
  onBack,
  t,
}: StepSummaryProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">
        {t("wizard.steps.summary")}
      </h2>
      {easyMode && (
        <p className="text-sm text-slate-600">
          Example: Experienced software engineer with 5+ years...
        </p>
      )}
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Professional Summary
        </label>
        <textarea
          value={resume.summary}
          onChange={(e) =>
            onUpdate((r) => ({ ...r, summary: e.target.value }))
          }
          rows={5}
          placeholder="Brief summary of your experience and goals"
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="rounded border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
        >
          {t("wizard.back")}
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded bg-[var(--color-primary)] px-4 py-2 text-white hover:bg-[var(--color-primary-dark)]"
        >
          {t("wizard.next")}
        </button>
      </div>
    </div>
  );
}
