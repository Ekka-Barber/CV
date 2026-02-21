import { useState } from "react";
import type { Resume } from "@/types/resume";
import type { Locale } from "@/i18n/translations";

interface StepSkillsProps {
  locale: Locale;
  resume: Resume;
  easyMode: boolean;
  onUpdate: (updater: (r: Resume) => Resume) => void;
  onNext: () => void;
  onBack: () => void;
  t: (key: string) => string;
}

export function StepSkills({
  resume,
  easyMode,
  onUpdate,
  onNext,
  onBack,
  t,
}: StepSkillsProps) {
  const [input, setInput] = useState("");

  function addSkill() {
    const s = input.trim();
    if (!s || resume.skills.includes(s)) return;
    onUpdate((r) => ({ ...r, skills: [...r.skills, s] }));
    setInput("");
  }

  function removeSkill(i: number) {
    onUpdate((r) => ({
      ...r,
      skills: r.skills.filter((_, j) => j !== i),
    }));
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">
        {t("wizard.steps.skills")}
      </h2>
      {easyMode && (
        <p className="text-sm text-slate-600">
          Example: JavaScript, React, Python, Project Management
        </p>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
          placeholder="Add skill"
          className="flex-1 rounded border border-slate-300 px-3 py-2"
        />
        <button
          type="button"
          onClick={addSkill}
          className="rounded bg-[var(--color-accent)] px-4 py-2 text-white hover:bg-[var(--color-accent-hover)]"
        >
          {t("common.add")}
        </button>
      </div>
      <ul className="flex flex-wrap gap-2">
        {resume.skills.map((s, i) => (
          <li
            key={`${s}-${i}`}
            className="flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-sm"
          >
            {s}
            <button
              type="button"
              onClick={() => removeSkill(i)}
              className="text-slate-500 hover:text-red-600"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
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
