import type { Locale } from "./config";

export type Plural = { one: string; other: string };

/** Fills {name} placeholders: fmt("{count} pages", { count: 2 }) → "2 pages". */
export function fmt(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

const rules = new Map<Locale, Intl.PluralRules>();

/** Picks the plural form for `count` (French treats 0 as singular, English does not). */
export function plural(locale: Locale, forms: Plural, count: number, values: Record<string, string | number> = {}) {
  let rule = rules.get(locale);
  if (!rule) rules.set(locale, (rule = new Intl.PluralRules(locale)));
  return fmt(rule.select(count) === "one" ? forms.one : forms.other, { count, ...values });
}
