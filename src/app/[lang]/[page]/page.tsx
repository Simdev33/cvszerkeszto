import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorShell } from "@/components/editor/editor-shell";
import { LegalPage } from "@/components/legal-page";
import { isLocale, LOCALES, PAGE_SLUGS, type Locale, type PageKey } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternates } from "@/i18n/metadata";
import { getLegal } from "@/legal";

type Params = Promise<{ lang: string; page: string }>;

/** The translated slugs of each language (/hu/szerkeszto, /de/agb …); any other slug gets the localized 404. */
export function generateStaticParams() {
  return LOCALES.flatMap((lang) => (Object.keys(PAGE_SLUGS) as PageKey[]).map((page) => ({ lang, page: PAGE_SLUGS[page][lang] })));
}

async function resolve(params: Params): Promise<{ lang: Locale; page: PageKey } | null> {
  const { lang, page } = await params;
  const key = isLocale(lang) ? (Object.keys(PAGE_SLUGS) as PageKey[]).find((candidate) => PAGE_SLUGS[candidate][lang] === page) : undefined;
  return isLocale(lang) && key ? { lang, page: key } : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  // Unknown slugs: the page itself calls notFound(), so the localized 404 renders.
  const resolved = await resolve(params);
  if (!resolved) return {};
  const { lang, page } = resolved;
  if (page === "editor") {
    const { meta } = getDictionary(lang);
    return { title: meta.editorTitle, description: meta.editorDescription, robots: { index: false }, alternates: alternates(lang, page) };
  }
  const doc = getLegal(lang)[page];
  return { title: doc.title, description: doc.description, alternates: alternates(lang, page) };
}

export default async function Page({ params }: { params: Params }) {
  const resolved = await resolve(params);
  if (!resolved) notFound();
  const { lang, page } = resolved;
  const dict = getDictionary(lang);
  if (page === "editor") return <EditorShell locale={lang} messages={{ editor: dict.editor, common: dict.common }} />;
  return <LegalPage lang={lang} dict={dict} doc={getLegal(lang)[page]} page={page} />;
}
