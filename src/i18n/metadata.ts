import { siteOrigin } from "@/config/site";
import { DEFAULT_LOCALE, LOCALES, localePath, type Locale, type PageKey } from "./config";

/** Origin for canonical and Open Graph links – never localhost in a deployment. */
export const siteUrl = siteOrigin;

/** Canonical URL plus hreflang links to the same page in every language. */
export function alternates(locale: Locale, page?: PageKey) {
  return {
    canonical: localePath(locale, page),
    languages: {
      ...Object.fromEntries(LOCALES.map((other) => [other, localePath(other, page)])),
      "x-default": localePath(DEFAULT_LOCALE, page),
    },
  };
}
