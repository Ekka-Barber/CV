import type { Resume, Certification } from "@/types/resume";
import type { Locale } from "@/i18n/translations";
import { generateId } from "@/store/useAppStore";

interface StepCertificationsProps {
  locale: Locale;
  resume: Resume;
  easyMode: boolean;
  onUpdate: (updater: (r: Resume) => Resume) => void;
  onNext: () => void;
  onBack: () => void;
  t: (key: string) => string;
}

const emptyCert = (): Certification => ({
  id: generateId(),
  name: "",
  issuer: "",
  date: "",
});

export function StepCertifications({
  resume,
  onUpdate,
  onNext,
  onBack,
  t,
}: StepCertificationsProps) {
  const certs = resume.certifications;

  function updateCert(i: number, upd: Partial<Certification>) {
    onUpdate((r) => ({
      ...r,
      certifications: r.certifications.map((c, j) =>
        j === i ? { ...c, ...upd } : c
      ),
    }));
  }

  function addCert() {
    onUpdate((r) => ({
      ...r,
      certifications: [...r.certifications, emptyCert()],
    }));
  }

  function removeCert(i: number) {
    onUpdate((r) => ({
      ...r,
      certifications: r.certifications.filter((_, j) => j !== i),
    }));
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">
        {t("wizard.steps.certifications")}
      </h2>
      {certs.map((c, i) => (
        <div key={c.id} className="rounded border border-slate-200 bg-slate-50 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Name</label>
              <input
                value={c.name}
                onChange={(e) => updateCert(i, { name: e.target.value })}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Issuer</label>
              <input
                value={c.issuer}
                onChange={(e) => updateCert(i, { issuer: e.target.value })}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Date</label>
              <input
                type="month"
                value={c.date}
                onChange={(e) => updateCert(i, { date: e.target.value })}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeCert(i)}
            className="mt-2 text-sm text-red-600 hover:underline"
          >
            {t("common.remove")}
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addCert}
        className="rounded border border-dashed border-slate-300 px-4 py-2 text-slate-600 hover:bg-slate-50"
      >
        + {t("common.add")} {t("wizard.steps.certifications")}
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
