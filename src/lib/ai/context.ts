/**
 * Builds the background the AI assistant gets with a request. Deliberately
 * anonymous: no name, contact details, birth date or photo – only what the
 * text is about.
 */
import { formatRange, parseDescription } from "@/lib/resume/format";
import { CV_LABELS } from "@/lib/resume/i18n";
import type { Entry, EntrySectionType, Resume } from "@/lib/resume/types";
import { AI_LIMITS } from "./shared";

const ENTRY_LABELS: Record<EntrySectionType, [title: string, subtitle: string]> = {
  experience: ["Pozíció", "Cég"],
  education: ["Végzettség / szak", "Intézmény"],
  projects: ["Projekt", "Szerepkör"],
  certificates: ["Megnevezés", "Kiállító"],
  volunteering: ["Szerepkör", "Szervezet"],
  custom: ["Cím", "Alcím"],
};

const clip = (text: string, max: number) => {
  const clean = text.trim().replace(/\s+/g, " ");
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
};

const lines = (items: (string | false | undefined)[]) => items.filter(Boolean).join("\n");

/** A description on one line: bullet points joined with semicolons. */
const flatten = (description: string) =>
  parseDescription(description)
    .map((block) => (block.type === "bullets" ? block.items.join("; ") : block.text))
    .join(" ");

/** Context for one entry's description; empty when there is nothing to go on. */
export function entryContext(resume: Resume, type: EntrySectionType, entry: Entry) {
  if (!entry.title.trim() && !entry.subtitle.trim()) return "";
  const [titleLabel, subtitleLabel] = ENTRY_LABELS[type];
  const range = formatRange(entry, "hu");
  return lines([
    `Szakasz: ${CV_LABELS.hu.sections[type]}`,
    entry.title.trim() && `${titleLabel}: ${entry.title.trim()}`,
    entry.subtitle.trim() && `${subtitleLabel}: ${entry.subtitle.trim()}`,
    range && `Időszak: ${range}${entry.current ? " (jelenleg is tart)" : ""}`,
    resume.basics.headline.trim() && `A jelölt szakmai címe: ${resume.basics.headline.trim()}`,
  ]);
}

/** Context for the summary: an outline of the whole CV; empty when it is still blank. */
export function resumeContext(resume: Resume) {
  const parts: string[] = [];
  if (resume.basics.headline.trim()) parts.push(`Szakmai cím: ${resume.basics.headline.trim()}`);

  for (const section of resume.sections) {
    if (!section.visible) continue;
    const heading = section.title.trim() || CV_LABELS.hu.sections[section.type];
    switch (section.type) {
      case "skills": {
        const names = section.skills.map((skill) => skill.name.trim()).filter(Boolean);
        if (names.length) parts.push(`${heading}: ${names.join(", ")}`);
        break;
      }
      case "languages": {
        const names = section.languages.filter((language) => language.name.trim()).map((language) => {
            const level = CV_LABELS.hu.levels[language.level];
            return `${language.name.trim()} – ${level.charAt(0).toLowerCase()}${level.slice(1)}`;
          });
        if (names.length) parts.push(`${heading}: ${names.join(", ")}`);
        break;
      }
      case "interests":
        break;
      default: {
        const entries = section.entries
          .filter((entry) => entry.title.trim() || entry.subtitle.trim())
          .map((entry) => {
            const head = [entry.title.trim(), entry.subtitle.trim()].filter(Boolean).join(", ");
            const range = formatRange(entry, "hu");
            const description = entry.description.trim() ? `: ${clip(flatten(entry.description), 280)}` : "";
            return `- ${head}${range ? ` (${range})` : ""}${description}`;
          });
        if (entries.length) parts.push(`${heading}:\n${entries.join("\n")}`);
      }
    }
  }

  const text = parts.join("\n");
  return text.length > AI_LIMITS.context ? `${text.slice(0, AI_LIMITS.context - 1)}…` : text;
}
