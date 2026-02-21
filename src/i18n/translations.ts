export type Locale = "en" | "ar";

type TranslationValue = string | Record<string, unknown> | unknown[];
export type Translations = Record<string, TranslationValue>;

const localeCache: Record<Locale, Translations> = {} as Record<Locale, Translations>;

export async function loadLocale(locale: Locale): Promise<Translations> {
  if (localeCache[locale]) {
    return localeCache[locale];
  }
  
  if (locale === "en") {
    const { en } = await import("./locales/en");
    localeCache[locale] = en as Translations;
  } else {
    const { ar } = await import("./locales/ar");
    localeCache[locale] = ar as Translations;
  }
  
  return localeCache[locale];
}

export function getLocaleSync(locale: Locale): Translations | null {
  return localeCache[locale] ?? null;
}
