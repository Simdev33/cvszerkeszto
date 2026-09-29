/**
 * Builds the (English) background the AI assistant gets with a request. Deliberately
 * anonymous: no name, contact details, birth date or photo – only what the
 * text is about.
 */
import { formatRange, parseDescription } from "@/lib/resume/format";
import { CV_LABELS } from "@/lib/resume/i18n";
import type { Entry, EntrySectionType, Resume } from "@/lib/resume/types";
import { AI_LIMITS } from "./shared";

// The model gets its background in English, whatever the CV's language.
const ENTRY_LABELS: Record<EntrySectionType, [title: string, subtitle: string]> = {
  experience: ["Position", "Company"],
  education: ["Degree / subject", "Institution"],
  projects: ["Project", "Role"],
  certificates: ["Name", "Issuer"],
  volunteering: ["Role", "Organisation"],
  custom: ["Title", "Subtitle"],
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
  const range = formatRange(entry, "en");
  return lines([
    `Section: ${CV_LABELS.en.sections[type]}`,
    entry.title.trim() && `${titleLabel}: ${entry.title.trim()}`,
    entry.subtitle.trim() && `${subtitleLabel}: ${entry.subtitle.trim()}`,
    range && `Period: ${range}${entry.current ? " (ongoing)" : ""}`,
    resume.basics.headline.trim() && `Candidate’s professional title: ${resume.basics.headline.trim()}`,
  ]);
}

/** Context for the summary: an outline of the whole CV; empty when it is still blank. */
export function resumeContext(resume: Resume) {
  const parts: string[] = [];
  if (resume.basics.headline.trim()) parts.push(`Professional title: ${resume.basics.headline.trim()}`);

  for (const section of resume.sections) {
    if (!section.visible) continue;
    const heading = section.title.trim() || CV_LABELS.en.sections[section.type];
    switch (section.type) {
      case "skills": {
        const names = section.skills.map((skill) => skill.name.trim()).filter(Boolean);
        if (names.length) parts.push(`${heading}: ${names.join(", ")}`);
        break;
      }
      case "languages": {
        const names = section.languages.filter((language) => language.name.trim()).map((language) => `${language.name.trim()} – ${CV_LABELS.en.levels[language.level]}`);
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
            const range = formatRange(entry, "en");
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
