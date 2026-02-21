import type { Resume } from "@/types/resume";
import type { Locale } from "@/i18n/translations";

interface StepContactProps {
  locale: Locale;
  resume: Resume;
  easyMode: boolean;
  onUpdate: (updater: (r: Resume) => Resume) => void;
  onNext: () => void;
  onBack: () => void;
  t: (key: string) => string;
}

export function StepContact({
  resume,
  easyMode,
  onUpdate,
  onNext,
  onBack,
  t,
}: StepContactProps) {
  const c = resume.contact;
  const set = (key: keyof typeof c, value: string) =>
    onUpdate((r) => ({
      ...r,
      contact: { ...r.contact, [key]: value },
    }));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">
        {t("wizard.steps.contact")}
      </h2>
      {easyMode && (
        <p className="text-sm text-slate-600">
          Example: John Smith, john@email.com, +1 234 567 8900
        </p>
      )}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Full Name
          </label>
          <input
            type="text"
            value={c.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            placeholder="John Smith"
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            {t("auth.email")}
          </label>
          <input
            type="email"
            value={c.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="john@example.com"
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          />
        </div>
        {!easyMode && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Phone
              </label>
              <input
                type="tel"
                value={c.phone ?? ""}
                onChange={(e) => set("phone", e.target.value)}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Location
              </label>
              <input
                type="text"
                value={c.location ?? ""}
                onChange={(e) => set("location", e.target.value)}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              />
            </div>
          </>
        )}
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
