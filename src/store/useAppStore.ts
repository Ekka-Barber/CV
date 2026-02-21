import { create } from "zustand";
import type { Resume } from "@/types/resume";
import type { Locale } from "@/i18n/translations";

const STORAGE_KEY = "ats-cv-guest-resumes";
const LOCALE_KEY = "ats-cv-locale";

function loadGuestResumes(): Resume[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveGuestResumes(resumes: Resume[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
}

function loadLocale(): Locale {
  return (localStorage.getItem(LOCALE_KEY) as Locale) ?? "en";
}

interface AppState {
  locale: Locale;
  setLocale: (l: Locale) => void;
  user: { id: string; email: string } | null;
  setUser: (u: { id: string; email: string } | null) => void;
  guestResumes: Resume[];
  loadGuestResumes: () => void;
  addGuestResume: (r: Resume) => void;
  updateGuestResume: (id: string, updater: (r: Resume) => Resume) => void;
  deleteGuestResume: (id: string) => void;
  duplicateGuestResume: (id: string) => Resume | null;
}

export const useAppStore = create<AppState>((set, get) => ({
  locale: loadLocale(),
  setLocale: (locale) => {
    localStorage.setItem(LOCALE_KEY, locale);
    document.documentElement.lang = locale === "ar" ? "ar" : "en";
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    set({ locale });
  },
  user: null,
  setUser: (user) => set({ user }),
  guestResumes: loadGuestResumes(),
  loadGuestResumes: () => set({ guestResumes: loadGuestResumes() }),
  addGuestResume: (r) =>
    set((s) => {
      const next = [...s.guestResumes, r];
      saveGuestResumes(next);
      return { guestResumes: next };
    }),
  updateGuestResume: (id, updater) =>
    set((s) => {
      const next = s.guestResumes.map((r) =>
        r.id === id ? updater(r) : r
      );
      saveGuestResumes(next);
      return { guestResumes: next };
    }),
  deleteGuestResume: (id) =>
    set((s) => {
      const next = s.guestResumes.filter((r) => r.id !== id);
      saveGuestResumes(next);
      return { guestResumes: next };
    }),
  duplicateGuestResume: (id) => {
    const r = get().guestResumes.find((x) => x.id === id);
    if (!r) return null;
    const copy: Resume = {
      ...JSON.parse(JSON.stringify(r)),
      id: crypto.randomUUID(),
      title: `${r.title} (Copy)`,
      updatedAt: new Date().toISOString(),
    };
    get().addGuestResume(copy);
    return copy;
  },
}));

export function generateId(): string {
  return crypto.randomUUID();
}
