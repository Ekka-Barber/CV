import type { Resume } from "@/types/resume";
import type { TemplateKey } from "@/types/resume";
import type { Locale } from "@/i18n/translations";

interface StepTemplateProps {
  locale: Locale;
  resume: Resume;
  easyMode: boolean;
  onUpdate: (updater: (r: Resume) => Resume) => void;
  onNext: () => void;
  onBack: () => void;
  t: (key: string) => string;
}

const TEMPLATES: { key: TemplateKey; label: string }[] = [
  { key: "classic", label: "Classic" },
  { key: "modern-minimal", label: "Modern Minimal" },
  { key: "executive", label: "Executive" },
];

export function StepTemplate({
  resume,
  onUpdate,
  onNext,
  onBack,
  t,
}: StepTemplateProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">
        {t("wizard.steps.template")}
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {TEMPLATES.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() =>
              onUpdate((r) => ({ ...r, templateKey: key }))
            }
            className={`rounded-lg border-2 p-4 text-left ${
              resume.templateKey === key
                ? "border-[var(--color-primary)] bg-slate-50"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>
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
