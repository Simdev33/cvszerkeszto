/**
 * Locales and localized URLs. Every page lives under /<locale>/…, and the
 * sub-pages have a translated slug (/hu/szerkeszto, /en/editor, /de/agb …).
 * Safe to import from the proxy, server and client code.
 */
import type { CvLanguage } from "@/lib/resume/types";

export const LOCALES = ["hu", "en", "fr", "de", "es"] as const satisfies readonly CvLanguage[];
export type Locale = (typeof LOCALES)[number];

/** Used when the browser asks for none of the supported languages. */
export const FALLBACK_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Each language's own name, for the language switcher. */
export const LOCALE_NAMES: Record<Locale, string> = { hu: "Magyar", en: "English", fr: "Français", de: "Deutsch", es: "Español" };

/** Open Graph locale tags. */
export const OG_LOCALES: Record<Locale, string> = { hu: "hu_HU", en: "en_GB", fr: "fr_FR", de: "de_DE", es: "es_ES" };

export type PageKey = "editor" | "terms" | "privacy";

export const PAGE_SLUGS: Record<PageKey, Record<Locale, string>> = {
  editor: { hu: "szerkeszto", en: "editor", fr: "editeur", de: "editor", es: "editor" },
  terms: { hu: "aszf", en: "terms", fr: "conditions", de: "agb", es: "condiciones" },
  privacy: { hu: "adatvedelem", en: "privacy", fr: "confidentialite", de: "datenschutz", es: "privacidad" },
};

export const isLocale = (value: string | undefined): value is Locale => LOCALES.includes(value as Locale);

/** "/fr" or "/fr/editeur". */
export function localePath(locale: Locale, page?: PageKey) {
  return page ? `/${locale}/${PAGE_SLUGS[page][locale]}` : `/${locale}`;
}

/** Which page a slug belongs to, in any language ("agb" → "terms"). */
export function pageFromSlug(slug: string): PageKey | null {
  for (const page of Object.keys(PAGE_SLUGS) as PageKey[]) {
    if (Object.values(PAGE_SLUGS[page]).includes(slug)) return page;
  }
  return null;
}

/** Picks the best supported locale from an Accept-Language header. */
export function matchLocale(acceptLanguage: string | null): Locale {
  const ranked = (acceptLanguage ?? "")
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((param) => /^q=([\d.]+)$/.exec(param.trim())?.[1]).find(Boolean);
      return { base: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .filter((item) => item.base && item.q > 0)
    .sort((a, b) => b.q - a.q);
  return ranked.map((item) => item.base).find(isLocale) ?? FALLBACK_LOCALE;
}
