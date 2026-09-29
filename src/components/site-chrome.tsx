import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { SITE } from "@/config/site";
import { LOCALES, localePath, type Locale, type PageKey } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/** The current page's address in every language, for the language switcher. */
export const pageLinks = (page?: PageKey) => Object.fromEntries(LOCALES.map((locale) => [locale, localePath(locale, page)])) as Record<Locale, string>;

/** Header of the landing and legal pages; `anchors` shows the landing page's section links. */
export function SiteHeader({ lang, dict, page, anchors = false }: { lang: Locale; dict: Dictionary; page?: PageKey; anchors?: boolean }) {
  const { nav } = dict.landing;
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-5">
        <Link href={localePath(lang)} className="shrink-0 rounded-lg" aria-label={dict.common.home}>
          <Logo />
        </Link>
        {anchors && (
          <nav className="hidden items-center gap-5 text-sm text-fg-muted md:flex">
            <a href="#templates" className="hover:text-fg">
              {nav.templates}
            </a>
            <a href="#features" className="hover:text-fg">
              {nav.features}
            </a>
            <a href="#faq" className="hover:text-fg">
              {nav.faq}
            </a>
          </nav>
        )}
        <div className="ml-auto flex items-center gap-1">
          <LanguageSwitcher current={lang} links={pageLinks(page)} label={dict.common.language} />
          <ThemeToggle label={dict.common.theme} />
          <Link
            href={localePath(lang, "editor")}
            className="ml-1 hidden h-9 items-center gap-2 rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-fg shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover sm:inline-flex"
          >
            {nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-fg-subtle sm:flex-row">
        <p>
          © {new Date().getFullYear()} {SITE.name}
        </p>
        <nav className="flex items-center gap-4">
          <Link href={localePath(lang, "terms")} className="hover:text-fg">
            {dict.common.terms}
          </Link>
          <Link href={localePath(lang, "privacy")} className="hover:text-fg">
            {dict.common.privacy}
          </Link>
        </nav>
        <p className="flex items-center gap-1.5">
          <ShieldCheck className="size-3.5" /> {dict.common.dataLocal}
        </p>
      </div>
    </footer>
  );
}
