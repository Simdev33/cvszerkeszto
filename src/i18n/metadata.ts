import { FALLBACK_LOCALE, LOCALES, localePath, PAGE_SLUGS, type Locale, type PageKey } from "./config";

/**
 * The public origin for canonical and Open Graph links: NEXT_PUBLIC_SITE_URL if
 * set, otherwise the deployment's own domain on Vercel (its system variables are
 * available at build time), so shared links never point at localhost.
 */
export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const vercel =
    process.env.VERCEL_ENV === "preview"
      ? process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL
      : process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  return vercel ? `https://${vercel}` : "http://localhost:3000";
}

/** Canonical URL plus hreflang links to the same page in every language. */
export function alternates(locale: Locale, page?: PageKey) {
  return {
    canonical: localePath(locale, page),
    languages: {
      ...Object.fromEntries(LOCALES.map((other) => [other, localePath(other, page)])),
      // Without a locale the proxy picks the visitor's language.
      "x-default": page ? `/${PAGE_SLUGS[page][FALLBACK_LOCALE]}` : "/",
    },
  };
}
