"use client";

import { Check, Globe } from "lucide-react";
import { useEffect, useRef } from "react";
import { LOCALE_COOKIE, LOCALE_NAMES, LOCALES, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/** Remembers the choice, so a later visit to "/" opens in this language. */
function remember(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/** Language menu; `links` holds the current page's address in every language. */
export function LanguageSwitcher({ current, links, label, className }: { current: Locale; links: Record<Locale, string>; label: string; className?: string }) {
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (menu.current?.open && !menu.current.contains(event.target as Node)) menu.current.open = false;
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  return (
    <details ref={menu} className={cn("relative [&_summary::-webkit-details-marker]:hidden", className)}>
      <summary
        aria-label={label}
        title={label}
        className="inline-flex h-9 cursor-pointer list-none items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-fg-muted transition-colors select-none hover:bg-surface-2 hover:text-fg"
      >
        <Globe className="size-4" />
        <span className="uppercase">{current}</span>
      </summary>
      <div className="absolute right-0 z-50 mt-1 w-44 rounded-xl border border-border bg-surface p-1 shadow-xl animate-pop-in">
        {LOCALES.map((locale) => (
          <a
            key={locale}
            href={links[locale]}
            hrefLang={locale}
            lang={locale}
            onClick={() => remember(locale)}
            aria-current={locale === current ? "page" : undefined}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-colors hover:bg-surface-2",
              locale === current ? "font-medium text-fg" : "text-fg-muted",
            )}
          >
            <span className="w-6 text-[11px] font-semibold text-fg-subtle uppercase">{locale}</span>
            <span className="flex-1">{LOCALE_NAMES[locale]}</span>
            {locale === current && <Check className="size-3.5 text-primary" />}
          </a>
        ))}
      </div>
    </details>
  );
}
