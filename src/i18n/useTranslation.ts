import { useMemo } from "react";
import type { Locale } from "./translations";
import { translations } from "./translations";

export function useTranslation(locale: Locale) {
  return useMemo(() => {
    const t = translations[locale];
    
    const tr = (key: string): string => {
      const parts = key.split(".");
      let val: unknown = t;
      for (const p of parts) {
        val = (val as Record<string, unknown>)?.[p];
      }
      return typeof val === "string" ? val : key;
    };

    const getNested = <T>(key: string): T => {
      const parts = key.split(".");
      let val: unknown = t;
      for (const p of parts) {
        val = (val as Record<string, unknown>)?.[p];
      }
      return val as T;
    };
    
    return { t: tr, getNested, locale };
  }, [locale]);
}
