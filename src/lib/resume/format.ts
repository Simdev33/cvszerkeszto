/**
 * Formatting helpers shared by the PDF templates.
 */
import { CV_LABELS } from "./i18n";
import type { Basics, CvLanguage, Entry } from "./types";

/** "2021-03" → "2021. márc." / "Mar 2021"; "2021" → "2021". */
export function formatMonth(value: string, language: CvLanguage) {
  const match = /^(\d{4})(?:-(\d{1,2}))?$/.exec(value.trim());
  if (!match) return value.trim();
  const [, year, month] = match;
  if (!month) return year;
  const name = CV_LABELS[language].months[Math.min(11, Math.max(0, Number(month) - 1))];
  return language === "hu" ? `${year}. ${name}` : `${name} ${year}`;
}

export function formatRange(entry: Pick<Entry, "start" | "end" | "current">, language: CvLanguage) {
  const start = entry.start ? formatMonth(entry.start, language) : "";
  const end = entry.current ? CV_LABELS[language].present : entry.end ? formatMonth(entry.end, language) : "";
  if (start && end) return start === end ? start : `${start} – ${end}`;
  return start || end;
}

/** Hungarian puts the family name first ("Kovács Anna"), English the given name. */
export function fullName(basics: Pick<Basics, "firstName" | "lastName">, language: CvLanguage) {
  const parts = language === "hu" ? [basics.lastName, basics.firstName] : [basics.firstName, basics.lastName];
  return parts.map((part) => part.trim()).filter(Boolean).join(" ");
}

export function initials(basics: Pick<Basics, "firstName" | "lastName">, language: CvLanguage) {
  return fullName(basics, language)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

export type DescriptionBlock = { type: "paragraph"; text: string } | { type: "bullets"; items: string[] };

const BULLET = /^\s*(?:[-*•–·▪]|\d+[.)])\s+/;

/**
 * Descriptions are plain text: lines starting with "-", "*" or "•" become
 * bullet points, other lines are paragraphs.
 */
export function parseDescription(text: string): DescriptionBlock[] {
  const blocks: DescriptionBlock[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    if (BULLET.test(line)) {
      const item = line.replace(BULLET, "").trim();
      const last = blocks.at(-1);
      if (last?.type === "bullets") last.items.push(item);
      else blocks.push({ type: "bullets", items: [item] });
    } else {
      blocks.push({ type: "paragraph", text: line });
    }
  }
  return blocks;
}

/** Display form of a URL: no protocol, no "www.", no trailing slash. */
export function prettyUrl(url: string) {
  return url
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/$/, "");
}

export function linkHref(value: string, kind: "url" | "email" | "phone") {
  const trimmed = value.trim();
  if (kind === "email") return `mailto:${trimmed}`;
  if (kind === "phone") return `tel:${trimmed.replace(/[^\d+]/g, "")}`;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}
