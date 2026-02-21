import type { Resume } from "@/types/resume";
import type { Locale } from "@/i18n/translations";
import { useTranslation } from "@/i18n/useTranslation";
import { StepContact } from "./steps/StepContact";
import { StepSummary } from "./steps/StepSummary";
import { StepSkills } from "./steps/StepSkills";
import { StepExperience } from "./steps/StepExperience";
import { StepEducation } from "./steps/StepEducation";
import { StepCertifications } from "./steps/StepCertifications";
import { StepOptional } from "./steps/StepOptional";
import { StepTemplate } from "./steps/StepTemplate";
import { StepAts } from "./steps/StepAts";
import { StepExport } from "./steps/StepExport";

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
  locale: Locale;
  resume: Resume;
  resumeId: string;
  easyMode: boolean;
  onUpdate: (updater: (r: Resume) => Resume) => void;
  onNext: () => void;
  onBack: () => void;
  onFinish: () => void;
}

export function WizardSteps({
  step,
  locale,
  resume,
  resumeId,
  easyMode,
  onUpdate,
  onNext,
  onBack,
  onFinish,
}: WizardStepsProps) {
  const { t } = useTranslation(locale);
  const stepKey = STEPS[step] ?? "contact";

  const common = {
    locale,
    resume,
    easyMode,
    onUpdate,
    onNext,
    onBack,
    t,
  };

  switch (stepKey) {
    case "contact":
      return <StepContact {...common} />;
    case "summary":
      return <StepSummary {...common} />;
    case "skills":
      return <StepSkills {...common} />;
    case "experience":
      return <StepExperience {...common} />;
    case "education":
      return <StepEducation {...common} />;
    case "certifications":
      return <StepCertifications {...common} />;
    case "optional":
      return <StepOptional {...common} />;
    case "template":
      return <StepTemplate {...common} />;
    case "ats":
      return <StepAts {...common} />;
    case "export":
      return <StepExport {...common} resumeId={resumeId} onFinish={onFinish} />;
    default:
      return null;
  }
}
