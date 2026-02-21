import type { Resume, Experience } from "@/types/resume";
import type { Locale } from "@/i18n/translations";
import { generateId } from "@/store/useAppStore";

interface StepExperienceProps {
  locale: Locale;
  resume: Resume;
  easyMode: boolean;
  onUpdate: (updater: (r: Resume) => Resume) => void;
  onNext: () => void;
  onBack: () => void;
  t: (key: string) => string;
}

const emptyExp = (): Experience => ({
  id: generateId(),
  jobTitle: "",
  company: "",
  startDate: "",
  endDate: "",
  current: false,
  bullets: [""],
});

export function StepExperience({
  resume,
  onUpdate,
  onNext,
  onBack,
  t,
}: StepExperienceProps) {
  const exps = resume.experience.length ? resume.experience : [emptyExp()];

  function updateExp(i: number, upd: Partial<Experience>) {
    const base = resume.experience.length ? resume.experience : [emptyExp()];
    const next = base.map((e, j) => (j === i ? { ...e, ...upd } : e));
    onUpdate((r) => ({ ...r, experience: next }));
  }

  function addExp() {
    const base = resume.experience.length ? resume.experience : [emptyExp()];
    onUpdate((r) => ({ ...r, experience: [...base, emptyExp()] }));
  }

  function removeExp(i: number) {
    const base = resume.experience.length ? resume.experience : [emptyExp()];
    const next = base.filter((_, j) => j !== i);
    onUpdate((r) => ({ ...r, experience: next.length ? next : [] }));
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">
        {t("wizard.steps.experience")}
      </h2>
      {exps.map((e, i) => (
        <div key={e.id} className="rounded border border-slate-200 bg-slate-50 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Job Title</label>
              <input
                value={e.jobTitle}
                onChange={(ev) => updateExp(i, { jobTitle: ev.target.value })}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Company</label>
              <input
                value={e.company}
                onChange={(ev) => updateExp(i, { company: ev.target.value })}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Start</label>
              <input
                type="month"
                value={e.startDate}
                onChange={(ev) => updateExp(i, { startDate: ev.target.value })}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">End</label>
              <input
                type="month"
                value={e.endDate}
                onChange={(ev) => updateExp(i, { endDate: ev.target.value })}
                disabled={e.current}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2 disabled:opacity-60"
              />
              <label className="mt-1 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={e.current}
                  onChange={(ev) =>
                    updateExp(i, { current: ev.target.checked, endDate: ev.target.checked ? "Present" : "" })
                  }
                />
                <span className="text-sm">Current</span>
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700">Bullet points</label>
            {e.bullets.map((b, bi) => (
              <input
                key={bi}
                value={b}
                onChange={(ev) =>
                  updateExp(i, {
                    bullets: e.bullets.map((x, j) => (j === bi ? ev.target.value : x)),
                  })
                }
                placeholder={`Achievement ${bi + 1}`}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => removeExp(i)}
            className="mt-2 text-sm text-red-600 hover:underline"
          >
            {t("common.remove")}
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addExp}
        className="rounded border border-dashed border-slate-300 px-4 py-2 text-slate-600 hover:bg-slate-50"
      >
        + {t("common.add")} {t("wizard.steps.experience")}
      </button>
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
