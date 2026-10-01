"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";
import { plural, type Plural } from "./format";

/** The part of the dictionary the editor and the account pages need in the browser. */
export type ClientMessages = Pick<Dictionary, "editor" | "common" | "billing">;

interface I18nValue {
  locale: Locale;
  t: Dictionary["editor"];
  common: Dictionary["common"];
  billing: Dictionary["billing"];
  plural: (forms: Plural, count: number, values?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ locale, messages, children }: { locale: Locale; messages: ClientMessages; children: ReactNode }) {
  const value = useMemo<I18nValue>(
    () => ({
      locale,
      t: messages.editor,
      common: messages.common,
      billing: messages.billing,
      plural: (forms, count, values) => plural(locale, forms, count, values),
    }),
    [locale, messages],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");
  return value;
}
