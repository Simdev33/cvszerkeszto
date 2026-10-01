/** Helpers shared by the JSON API routes. Errors go out as codes – the browser shows them in the visitor's language. */
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export type ServerCode = keyof Dictionary["billing"]["server"];

export const json = (data: unknown, status = 200) => Response.json(data, { status, headers: { "Cache-Control": "no-store" } });

export const fail = (code: ServerCode, status: number) => json({ code }, status);

export async function readBody(request: Request): Promise<Record<string, unknown>> {
  try {
    const body: unknown = await request.json();
    return body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

export const localeOf = (value: unknown): Locale => (typeof value === "string" && isLocale(value) ? value : DEFAULT_LOCALE);

export const text = (value: unknown, max = 500) => (typeof value === "string" ? value.slice(0, max) : "");

/** A return address on this same site (never another host). */
export function returnUrl(request: Request, path: unknown) {
  const safe = typeof path === "string" && path.startsWith("/") && !path.startsWith("//") ? path : "/";
  return new URL(safe, new URL(request.url).origin);
}
