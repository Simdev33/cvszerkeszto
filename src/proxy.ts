import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, LOCALES, matchLocale, PAGE_SLUGS, pageFromSlug, type Locale } from "@/i18n/config";

/**
 * English is the main language and lives at the root without a prefix; the
 * pages are served from /en/… internally.
 * - /en and /en/… → permanent redirect to the address without the prefix;
 * - /hu, /de, /fr, /es → as they are (a slug from another language is fixed: /de/terms → /de/agb);
 * - / → on the first visit, the browser's language (the language switcher's cookie wins);
 * - an old link with another language's slug (/szerkeszto) → that language's page;
 * - every other address without a prefix is English.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const [first, second, ...rest] = url.pathname.split("/").filter(Boolean);

  if (first === DEFAULT_LOCALE) {
    url.pathname = `/${[second, ...rest].filter(Boolean).join("/")}`;
    return NextResponse.redirect(url, 308);
  }

  if (isLocale(first)) {
    const page = second && rest.length === 0 ? pageFromSlug(second) : null;
    if (!page || PAGE_SLUGS[page][first] === second) return NextResponse.next();
    url.pathname = `/${first}/${PAGE_SLUGS[page][first]}`;
    return NextResponse.redirect(url, 308);
  }

  if (!first) {
    const saved = request.cookies.get(LOCALE_COOKIE)?.value;
    const wanted = isLocale(saved) ? saved : matchLocale(request.headers.get("accept-language"));
    if (wanted !== DEFAULT_LOCALE) {
      url.pathname = `/${wanted}`;
      const response = NextResponse.redirect(url, 307);
      response.headers.set("Vary", "Accept-Language, Cookie");
      return response;
    }
  }

  const page = first && !second ? pageFromSlug(first) : null;
  if (page && PAGE_SLUGS[page][DEFAULT_LOCALE] !== first) {
    const owners = LOCALES.filter((locale) => PAGE_SLUGS[page][locale] === first);
    const saved = request.cookies.get(LOCALE_COOKIE)?.value as Locale | undefined;
    const locale = saved && owners.includes(saved) ? saved : owners[0];
    url.pathname = `/${locale}/${PAGE_SLUGS[page][locale]}`;
    return NextResponse.redirect(url, 308);
  }

  url.pathname = `/${DEFAULT_LOCALE}${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except API routes, Next.js internals and files with an extension (fonts, images, pdf.js …).
  matcher: ["/((?!api|_next|.*\\.[\\w]+$).*)"],
};
