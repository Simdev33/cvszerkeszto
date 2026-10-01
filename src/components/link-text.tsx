import Link from "next/link";
import type { ReactNode } from "react";
import { localePath, type Locale, type PageKey } from "@/i18n/config";

const INTERNAL = /\[([^\]]+)\]\((terms|privacy|account)\)/g;

/** Text with [label](terms|privacy|account) internal links, in the given language. */
export function LinkText({ text, locale, newTab = false, className }: { text: string; locale: Locale; newTab?: boolean; className?: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INTERNAL)) {
    out.push(text.slice(last, match.index));
    out.push(
      <Link
        key={out.length}
        href={localePath(locale, match[2] as PageKey)}
        target={newTab ? "_blank" : undefined}
        className={className ?? "font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"}
      >
        {match[1]}
      </Link>,
    );
    last = match.index + match[0].length;
  }
  out.push(text.slice(last));
  return <>{out}</>;
}
