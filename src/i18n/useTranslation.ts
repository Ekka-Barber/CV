import { useMemo, useEffect, useState } from "react";
import type { Locale, Translations } from "./translations";
import { loadLocale, getLocaleSync } from "./translations";

const DEFAULT_LOCALE: Locale = "en";
const EMPTY_TRANSLATIONS: Translations = {};

export function useTranslation(locale: Locale) {
  const [translations, setTranslations] = useState<Translations>(() => {
    const cached = getLocaleSync(locale);
    return cached ?? EMPTY_TRANSLATIONS;
  });
  const [isLoading, setIsLoading] = useState(() => !getLocaleSync(locale));

  useEffect(() => {
    const cached = getLocaleSync(locale);
    if (cached) {
      setTranslations(cached);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    loadLocale(locale).then((loaded) => {
      setTranslations(loaded);
      setIsLoading(false);
    });
  }, [locale]);

  useEffect(() => {
    if (!getLocaleSync(DEFAULT_LOCALE)) {
      loadLocale(DEFAULT_LOCALE);
    }
  }, []);

  return useMemo(() => {
    const t = translations;
    
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
    
    return { t: tr, getNested, locale, isLoading };
  }, [translations, locale, isLoading]);
}
