import type { Resume, Project, Language } from "@/types/resume";
import type { Locale } from "@/i18n/translations";
import { generateId } from "@/store/useAppStore";

interface StepOptionalProps {
  locale: Locale;
  resume: Resume;
  easyMode: boolean;
  onUpdate: (updater: (r: Resume) => Resume) => void;
  onNext: () => void;
  onBack: () => void;
  t: (key: string) => string;
}

export function StepOptional({
  resume,
  onUpdate,
  onNext,
  onBack,
  t,
}: StepOptionalProps) {
  const projects = resume.projects ?? [];
  const languages = resume.languages ?? [];

  function setProjects(upd: Project[]) {
    onUpdate((r) => ({ ...r, projects: upd }));
  }
  function setLanguages(upd: Language[]) {
    onUpdate((r) => ({ ...r, languages: upd }));
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-slate-900">
        {t("wizard.steps.optional")}
      </h2>
      <p className="text-sm text-slate-600">
        Add optional sections. You can skip and add them later.
      </p>

      <section>
        <h3 className="font-medium text-slate-800">{t("sections.projects")}</h3>
        {projects.map((p, i) => (
          <div key={p.id} className="mt-2 rounded border border-slate-200 p-3">
            <input
              value={p.name}
              onChange={(e) =>
                setProjects(
                  projects.map((x, j) =>
                    j === i ? { ...x, name: e.target.value } : x
                  )
                )
              }
              placeholder="Project name"
              className="mb-2 w-full rounded border border-slate-300 px-2 py-1"
            />
            <textarea
              value={p.description}
              onChange={(e) =>
                setProjects(
                  projects.map((x, j) =>
                    j === i ? { ...x, description: e.target.value } : x
                  )
                )
              }
              placeholder="Description"
              rows={2}
              className="w-full rounded border border-slate-300 px-2 py-1"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setProjects([
              ...projects,
              { id: generateId(), name: "", description: "" },
            ])
          }
          className="mt-2 text-sm text-[var(--color-accent)] hover:underline"
        >
          + {t("common.add")} {t("sections.projects")}
        </button>
      </section>

      <section>
        <h3 className="font-medium text-slate-800">{t("sections.languages")}</h3>
        {languages.map((l, i) => (
          <div key={l.id} className="mt-2 flex gap-2">
            <input
              value={l.name}
              onChange={(e) =>
                setLanguages(
                  languages.map((x, j) =>
                    j === i ? { ...x, name: e.target.value } : x
                  )
                )
              }
              placeholder="Language"
              className="rounded border border-slate-300 px-2 py-1"
            />
            <input
              value={l.proficiency}
              onChange={(e) =>
                setLanguages(
                  languages.map((x, j) =>
                    j === i ? { ...x, proficiency: e.target.value } : x
                  )
                )
              }
              placeholder="Proficiency"
              className="rounded border border-slate-300 px-2 py-1"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setLanguages([
              ...languages,
              { id: generateId(), name: "", proficiency: "" },
            ])
          }
          className="mt-2 text-sm text-[var(--color-accent)] hover:underline"
        >
          + {t("common.add")} {t("sections.languages")}
        </button>
      </section>

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
