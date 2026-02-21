export type LanguageMode = "AR" | "EN" | "BILINGUAL";
export type TemplateKey = "classic" | "modern-minimal" | "executive";

export interface Contact {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  linkedIn?: string;
  website?: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  bullets?: string[];
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
}

export interface Volunteering {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface AtsSettings {
  dateFormat: string;
  sectionOrder: string[];
  hideOptionalSections: string[];
}

export interface Resume {
  id: string;
  title: string;
  languageMode: LanguageMode;
  templateKey: TemplateKey;
  updatedAt: string;
  contact: Contact;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  projects?: Project[];
  languages?: Language[];
  awards?: Award[];
  volunteering?: Volunteering[];
  atsSettings: AtsSettings;
}

export const SECTION_KEYS = [
  "summary",
  "skills",
  "experience",
  "education",
  "certifications",
  "projects",
  "languages",
  "awards",
  "volunteering",
] as const;
