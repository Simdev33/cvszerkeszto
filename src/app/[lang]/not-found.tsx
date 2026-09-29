import { FileQuestion } from "lucide-react";
import Link from "next/link";
import { lang } from "next/root-params";
import { FALLBACK_LOCALE, isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function NotFound() {
  const current = await lang();
  const locale = isLocale(current) ? current : FALLBACK_LOCALE;
  const t = getDictionary(locale).common.notFound;
  return (
    <main className="grid min-h-dvh place-items-center px-5">
      <div className="max-w-md text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary">
          <FileQuestion className="size-6" />
        </span>
        <p className="mt-6 font-mono text-sm text-fg-subtle">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-3 text-fg-muted">{t.text}</p>
        <Link
          href={localePath(locale)}
          className="mt-8 inline-flex h-11 items-center rounded-xl bg-primary px-5 text-[15px] font-medium text-primary-fg shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover"
        >
          {t.back}
        </Link>
      </div>
    </main>
  );
}
