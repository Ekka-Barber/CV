import type { Resume } from "@/types/resume";
import type { Locale } from "@/i18n/translations";
import { Suspense, lazy } from "react";
import { useTranslation } from "@/i18n/useTranslation";
import { useAppStore } from "@/store/useAppStore";

const StepContact = lazy(() =>
  import("./steps/StepContact").then((m) => ({ default: m.StepContact }))
);
const StepSummary = lazy(() =>
  import("./steps/StepSummary").then((m) => ({ default: m.StepSummary }))
);
const StepSkills = lazy(() =>
  import("./steps/StepSkills").then((m) => ({ default: m.StepSkills }))
);
const StepExperience = lazy(() =>
  import("./steps/StepExperience").then((m) => ({ default: m.StepExperience }))
);
const StepEducation = lazy(() =>
  import("./steps/StepEducation").then((m) => ({ default: m.StepEducation }))
);
const StepCertifications = lazy(() =>
  import("./steps/StepCertifications").then((m) => ({ default: m.StepCertifications }))
);
const StepOptional = lazy(() =>
  import("./steps/StepOptional").then((m) => ({ default: m.StepOptional }))
);
const StepTemplate = lazy(() =>
  import("./steps/StepTemplate").then((m) => ({ default: m.StepTemplate }))
);
const StepAts = lazy(() =>
  import("./steps/StepAts").then((m) => ({ default: m.StepAts }))
);
const StepExport = lazy(() =>
  import("./steps/StepExport").then((m) => ({ default: m.StepExport }))
);

const STEPS = [
  "contact",
  "summary",
  "skills",
  "experience",
  "education",
  "certifications",
  "optional",
  "template",
  "ats",
  "export",
] as const;

interface WizardStepsProps {
  step: number;
  resume: Resume;
  resumeId: string;
  easyMode: boolean;
  onUpdate: (updater: (r: Resume) => Resume) => void;
  onNext: () => void;
  onBack: () => void;
  onFinish: () => void;
}

export interface StepCommonProps {
  locale: Locale;
  resume: Resume;
  easyMode: boolean;
  onUpdate: (updater: (r: Resume) => Resume) => void;
  onNext: () => void;
  onBack: () => void;
  t: (key: string) => string;
}

function StepLoader() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
    </div>
  );
}

export function WizardSteps({
  step,
  resume,
  resumeId,
  easyMode,
  onUpdate,
  onNext,
  onBack,
  onFinish,
}: WizardStepsProps) {
  const locale = useAppStore((s) => s.locale);
  const { t } = useTranslation(locale);
  const stepKey = STEPS[step] ?? "contact";

  const common: StepCommonProps = {
    locale,
    resume,
    easyMode,
    onUpdate,
    onNext,
    onBack,
    t,
  };

  return (
    <Suspense fallback={<StepLoader />}>
      {stepKey === "contact" && <StepContact {...common} />}
      {stepKey === "summary" && <StepSummary {...common} />}
      {stepKey === "skills" && <StepSkills {...common} />}
      {stepKey === "experience" && <StepExperience {...common} />}
      {stepKey === "education" && <StepEducation {...common} />}
      {stepKey === "certifications" && <StepCertifications {...common} />}
      {stepKey === "optional" && <StepOptional {...common} />}
      {stepKey === "template" && <StepTemplate {...common} />}
      {stepKey === "ats" && <StepAts {...common} />}
      {stepKey === "export" && (
        <StepExport {...common} resumeId={resumeId} onFinish={onFinish} />
      )}
    </Suspense>
  );
}
