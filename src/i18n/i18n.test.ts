import { describe, expect, it } from "vitest";
import { SITE } from "@/config/site";
import { getLegal } from "@/legal";
import type { LegalBlock, LegalDoc } from "@/legal/types";
import { sampleResume } from "@/lib/resume/defaults";
import { exportResume, normalizeResume } from "@/lib/resume/normalize";
import { LOCALES, localePath, matchLocale, PAGE_SLUGS, pageFromSlug, type Locale } from "./config";
import { DICTIONARIES } from "./dictionaries";
import { fmt, plural } from "./format";

const TRANSLATED: Locale[] = ["fr", "de", "es"];

const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort().join(",");

/** Collects every difference in shape, array length or placeholders between two dictionaries. */
function compare(reference: unknown, other: unknown, path: string, errors: string[]) {
  if (typeof reference === "string") {
    if (typeof other !== "string") errors.push(`${path}: expected a string`);
    else {
      if (placeholders(reference) !== placeholders(other)) errors.push(`${path}: placeholders ${placeholders(other) || "–"} ≠ ${placeholders(reference) || "–"}`);
      if (reference.trim() && !other.trim()) errors.push(`${path}: empty`);
    }
    return;
  }
  if (Array.isArray(reference)) {
    if (!Array.isArray(other)) return void errors.push(`${path}: expected an array`);
    if (!path.endsWith("meta.keywords") && other.length !== reference.length) errors.push(`${path}: ${other.length} items ≠ ${reference.length}`);
    other.forEach((item, index) => compare(reference[Math.min(index, reference.length - 1)], item, `${path}[${index}]`, errors));
    return;
  }
  if (reference && typeof reference === "object") {
    if (!other || typeof other !== "object" || Array.isArray(other)) return void errors.push(`${path}: expected an object`);
    const keys = new Set([...Object.keys(reference), ...Object.keys(other)]);
    for (const key of keys) {
      if (!(key in other)) errors.push(`${path}.${key}: missing`);
      else if (!(key in reference)) errors.push(`${path}.${key}: unexpected`);
      else compare((reference as Record<string, unknown>)[key], (other as Record<string, unknown>)[key], `${path}.${key}`, errors);
    }
  }
}

/** Every string in a nested value, for "is it really translated?" checks. */
const strings = (value: unknown): string[] =>
  typeof value === "string" ? [value] : Array.isArray(value) ? value.flatMap(strings) : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];

const docText = (doc: LegalDoc) => [doc.title, doc.description, ...doc.intro, ...doc.sections.flatMap((section) => [section.title, ...section.blocks.flatMap((block: LegalBlock) => (typeof block === "string" ? [block] : block.list))])];

describe("dictionaries", () => {
  it.each(LOCALES)("%s has exactly the keys and placeholders of the Hungarian master", (locale) => {
    const errors: string[] = [];
    compare(DICTIONARIES.hu, DICTIONARIES[locale], locale, errors);
    expect(errors).toEqual([]);
  });

  it.each(TRANSLATED)("%s is translated, not a copy of English", (locale) => {
    const english = strings(DICTIONARIES.en);
    const own = strings(DICTIONARIES[locale]);
    const same = own.filter((text, index) => text.length > 12 && text === english[index]).length;
    expect(same).toBeLessThan(10);
  });

  it("has twelve month names everywhere", () => {
    for (const locale of LOCALES) expect(DICTIONARIES[locale].editor.entry.months).toHaveLength(12);
  });
});

describe("legal texts", () => {
  it.each(LOCALES)("%s has every section of the English Terms and Privacy Policy", (locale) => {
    const legal = getLegal(locale);
    const english = getLegal("en");
    for (const doc of ["terms", "privacy"] as const) {
      expect(legal[doc].sections.map((section) => section.id)).toEqual(english[doc].sections.map((section) => section.id));
      expect(docText(legal[doc]).every((text) => text.trim().length > 0)).toBe(true);
    }
    expect(docText(legal.terms).join(" ")).toContain(SITE.operator.email);
    expect(docText(legal.privacy).join(" ")).toContain(SITE.ai.terms);
  });

  it.each(TRANSLATED)("%s legal texts are translated", (locale) => {
    const english = docText(getLegal("en").privacy);
    const own = docText(getLegal(locale).privacy);
    expect(own.filter((text, index) => text === english[index]).length).toBeLessThan(3);
  });
});

describe("sample CVs", () => {
  it.each(LOCALES)("%s sample is complete and survives export/import", (locale) => {
    const sample = sampleResume(locale);
    expect(sample.design.language).toBe(locale);
    expect(sample.basics.firstName && sample.basics.lastName && sample.basics.summary).toBeTruthy();
    const reference = sampleResume("hu");
    const shape = (resume: typeof sample) => resume.sections.map((section) => `${section.type}:${"entries" in section ? section.entries.length : ""}`);
    expect(shape(sample)).toEqual(shape(reference));
    const strip = (resume: typeof sample) => JSON.parse(JSON.stringify(resume, (key, value) => (key === "id" ? undefined : value)));
    expect(strip(normalizeResume(JSON.parse(exportResume(sample))))).toEqual(strip(sample));
  });

  it.each(TRANSLATED)("%s sample is its own person, not the English one", (locale) => {
    expect(sampleResume(locale).basics.summary).not.toBe(sampleResume("en").basics.summary);
  });
});

describe("routing helpers", () => {
  it("picks the best locale from Accept-Language", () => {
    expect(matchLocale("fr-CH,fr;q=0.9,en;q=0.8")).toBe("fr");
    expect(matchLocale("en;q=0.5,hu")).toBe("hu");
    expect(matchLocale("de-AT")).toBe("de");
    expect(matchLocale("it-IT,it;q=0.9")).toBe("en");
    expect(matchLocale(null)).toBe("en");
  });

  it("maps localized slugs back to pages", () => {
    expect(pageFromSlug("agb")).toBe("terms");
    expect(pageFromSlug("szerkeszto")).toBe("editor");
    expect(pageFromSlug("nope")).toBeNull();
    expect(localePath("fr", "editor")).toBe("/fr/editeur");
    for (const locale of LOCALES) {
      const slugs = Object.values(PAGE_SLUGS).map((slugs) => slugs[locale]);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it("formats placeholders and plurals per language", () => {
    expect(fmt("{count} / {max}", { count: 3, max: 5 })).toBe("3 / 5");
    const forms = { one: "{count} page", other: "{count} pages" };
    expect(plural("en", forms, 1)).toBe("1 page");
    expect(plural("en", forms, 0)).toBe("0 pages");
    expect(plural("fr", forms, 0)).toBe("0 page");
  });
});
