import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { SITE } from "@/config/site";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";
import type { LegalDoc } from "@/legal/types";

const TOKEN = /(\*\*[^*]+\*\*|https?:\/\/[^\s,;)]*[^\s,;).:]|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

/** Plain text with **bold** parts; URLs and e-mail addresses become links. */
function Rich({ text }: { text: string }) {
  return text.split(TOKEN).map((part, index): ReactNode => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index} className="font-semibold text-fg">{part.slice(2, -2)}</strong>;
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-2 hover:underline">
          {part.replace(/^https?:\/\//, "")}
        </a>
      );
    }
    if (/^[\w.+-]+@[\w-]+\./.test(part)) {
      return (
        <a key={index} href={`mailto:${part}`} className="text-primary underline-offset-2 hover:underline">
          {part}
        </a>
      );
    }
    return part;
  });
}

export function LegalPage({ lang, dict, doc, page }: { lang: Locale; dict: Dictionary; doc: LegalDoc; page: "terms" | "privacy" }) {
  const effective = new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(new Date(`${SITE.legalEffectiveDate}T12:00:00`));
  return (
    <>
      <SiteHeader lang={lang} dict={dict} page={page} />
      <main className="relative">
        <article className="mx-auto max-w-3xl px-5 pt-12 pb-20">
          <Link href={localePath(lang)} className="inline-flex items-center gap-1.5 text-sm text-fg-subtle hover:text-fg">
            <ArrowLeft className="size-4" />
            {dict.legal.back}
          </Link>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{doc.title}</h1>
          <p className="mt-2 text-sm text-fg-subtle">{fmt(dict.legal.updated, { date: effective })}</p>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-fg-muted">
            {doc.intro.map((text) => (
              <p key={text}>
                <Rich text={text} />
              </p>
            ))}
          </div>

          <nav aria-label={dict.legal.contents} className="mt-8 rounded-2xl border border-border bg-surface p-5">
            <p className="text-xs font-semibold tracking-wide text-fg-subtle uppercase">{dict.legal.contents}</p>
            <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
              {doc.sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-fg-muted hover:text-fg">
                    <span className="mr-1.5 text-fg-subtle tabular-nums">{index + 1}.</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {doc.sections.map((section, index) => (
            <section key={section.id} id={section.id} className="mt-10 scroll-mt-20">
              <h2 className="text-xl font-semibold tracking-tight">
                <span className="mr-2 text-fg-subtle tabular-nums">{index + 1}.</span>
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-fg-muted">
                {section.blocks.map((block, blockIndex) =>
                  typeof block === "string" ? (
                    <p key={blockIndex}>
                      <Rich text={block} />
                    </p>
                  ) : (
                    <ul key={blockIndex} className="list-disc space-y-1.5 pl-5 marker:text-fg-subtle">
                      {block.list.map((item) => (
                        <li key={item}>
                          <Rich text={item} />
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </div>
            </section>
          ))}

          <div className="mt-14 flex justify-center">
            <Link
              href={localePath(lang, "editor")}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-[15px] font-medium text-primary-fg shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover"
            >
              {dict.legal.editor}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </article>
        <SiteFooter lang={lang} dict={dict} />
      </main>
    </>
  );
}
