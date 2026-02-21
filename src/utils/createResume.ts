import type { Resume, Contact, AtsSettings } from "@/types/resume";

const defaultContact: Contact = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
};

const defaultAts: AtsSettings = {
  dateFormat: "MM/YYYY",
  sectionOrder: [
    "summary",
    "skills",
    "experience",
    "education",
    "certifications",
    "projects",
    "languages",
    "awards",
    "volunteering",
  ],
  hideOptionalSections: [],
};

export function createEmptyResume(id: string, title = "Untitled CV"): Resume {
  return {
    id,
    title,
    languageMode: "EN",
    templateKey: "classic",
    updatedAt: new Date().toISOString(),
    contact: { ...defaultContact },
    summary: "",
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    atsSettings: { ...defaultAts },
  };
}
