import type { Resume, Education } from "@/types/resume";
import type { Locale } from "@/i18n/translations";
import { generateId } from "@/store/useAppStore";

interface StepEducationProps {
  locale: Locale;
  resume: Resume;
  easyMode: boolean;
  onUpdate: (updater: (r: Resume) => Resume) => void;
  onNext: () => void;
  onBack: () => void;
  t: (key: string) => string;
}

const emptyEd = (): Education => ({
  id: generateId(),
  degree: "",
  institution: "",
  startDate: "",
  endDate: "",
});

export function StepEducation({
  resume,
  onUpdate,
  onNext,
  onBack,
  t,
}: StepEducationProps) {
  const eds = resume.education.length ? resume.education : [emptyEd()];

  function updateEd(i: number, upd: Partial<Education>) {
    onUpdate((r) => ({
      ...r,
      education: r.education.map((e, j) => (j === i ? { ...e, ...upd } : e)),
    }));
  }

  function addEd() {
    onUpdate((r) => ({ ...r, education: [...r.education, emptyEd()] }));
  }

  function removeEd(i: number) {
    onUpdate((r) => ({
      ...r,
      education: r.education.filter((_, j) => j !== i),
    }));
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">
        {t("wizard.steps.education")}
      </h2>
      {eds.map((e, i) => (
        <div key={e.id} className="rounded border border-slate-200 bg-slate-50 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Degree</label>
              <input
                value={e.degree}
                onChange={(ev) => updateEd(i, { degree: ev.target.value })}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Institution</label>
              <input
                value={e.institution}
                onChange={(ev) => updateEd(i, { institution: ev.target.value })}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Start</label>
              <input
                type="month"
                value={e.startDate}
                onChange={(ev) => updateEd(i, { startDate: ev.target.value })}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">End</label>
              <input
                type="month"
                value={e.endDate}
                onChange={(ev) => updateEd(i, { endDate: ev.target.value })}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeEd(i)}
            className="mt-2 text-sm text-red-600 hover:underline"
          >
            {t("common.remove")}
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addEd}
        className="rounded border border-dashed border-slate-300 px-4 py-2 text-slate-600 hover:bg-slate-50"
      >
        + {t("common.add")} {t("wizard.steps.education")}
      </button>
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
