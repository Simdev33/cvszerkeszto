import { NextResponse, type NextRequest } from "next/server";
import { isLocale, LOCALE_COOKIE, LOCALES, matchLocale, PAGE_SLUGS, pageFromSlug } from "@/i18n/config";

/**
 * Sends every address without a locale to its localized version
 * (/ → /hu, /szerkeszto → /hu/szerkeszto) and fixes slugs from another
 * language (/en/szerkeszto → /en/editor).
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const [first, second, ...rest] = url.pathname.split("/").filter(Boolean);

  if (isLocale(first)) {
    const page = second && rest.length === 0 ? pageFromSlug(second) : null;
    if (!page || PAGE_SLUGS[page][first] === second) return NextResponse.next();
    url.pathname = `/${first}/${PAGE_SLUGS[page][first]}`;
    return NextResponse.redirect(url, 308);
  }

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const page = first ? pageFromSlug(first) : null;
  // The saved choice wins; an old link like /szerkeszto names its language; otherwise ask the browser.
  const owners = page ? LOCALES.filter((locale) => PAGE_SLUGS[page][locale] === first) : [];
  const locale = isLocale(saved) ? saved : owners.length === 1 ? owners[0] : matchLocale(request.headers.get("accept-language"));

  url.pathname = page && !second ? `/${locale}/${PAGE_SLUGS[page][locale]}` : `/${locale}${url.pathname === "/" ? "" : url.pathname}`;
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  // Everything except API routes, Next.js internals and files with an extension (fonts, images, pdf.js …).
  matcher: ["/((?!api|_next|.*\\.[\\w]+$).*)"],
};
