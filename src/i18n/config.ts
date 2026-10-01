/**
 * Locales and localized URLs. English is the main language and lives at the
 * root without a prefix (/editor, /terms); the others have a prefix and
 * translated slugs (/hu/szerkeszto, /de/agb …). Safe to import from the
 * proxy, server and client code.
 */
import type { CvLanguage } from "@/lib/resume/types";

export const LOCALES = ["en", "hu", "fr", "de", "es"] as const satisfies readonly CvLanguage[];
export type Locale = (typeof LOCALES)[number];

/** The main language: no URL prefix, and used when the browser asks for none of the supported ones. */
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Each language's own name, for the language switcher. */
export const LOCALE_NAMES: Record<Locale, string> = { en: "English", hu: "Magyar", fr: "Français", de: "Deutsch", es: "Español" };

/** Open Graph locale tags. */
export const OG_LOCALES: Record<Locale, string> = { en: "en_GB", hu: "hu_HU", fr: "fr_FR", de: "de_DE", es: "es_ES" };

export type PageKey = "editor" | "terms" | "privacy" | "account";

export const PAGE_SLUGS: Record<PageKey, Record<Locale, string>> = {
  editor: { en: "editor", hu: "szerkeszto", fr: "editeur", de: "editor", es: "editor" },
  terms: { en: "terms", hu: "aszf", fr: "conditions", de: "agb", es: "condiciones" },
  privacy: { en: "privacy", hu: "adatvedelem", fr: "confidentialite", de: "datenschutz", es: "privacidad" },
  account: { en: "account", hu: "fiok", fr: "compte", de: "konto", es: "cuenta" },
};

export const isLocale = (value: string | null | undefined): value is Locale => LOCALES.includes(value as Locale);

/** "/" or "/editor" in English, "/fr" or "/fr/editeur" in the other languages. */
export function localePath(locale: Locale, page?: PageKey) {
  const slug = page ? `/${PAGE_SLUGS[page][locale]}` : "";
  return locale === DEFAULT_LOCALE ? slug || "/" : `/${locale}${slug}`;
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
  return ranked.map((item) => item.base).find(isLocale) ?? DEFAULT_LOCALE;
}
