/**
 * Import/export of CVs as JSON. Imported data is never trusted: every field
 * is checked and missing parts are filled with defaults.
 */
import { uid } from "@/lib/utils";
import { DEFAULT_DESIGN, EMPTY_BASICS, emptyResume } from "./defaults";
import type { Basics, Design, Entry, LanguageLevel, LanguageSkill, Resume, Section, SectionType, Skill } from "./types";

export const EXPORT_APP = "cv-studio";

type Json = Record<string, unknown>;

const isObject = (value: unknown): value is Json => typeof value === "object" && value !== null && !Array.isArray(value);
const str = (value: unknown, max = 5000) => (typeof value === "string" ? value.slice(0, max) : "");
const oneOf = <T extends string>(value: unknown, allowed: readonly T[], fallback: T): T =>
  allowed.includes(value as T) ? (value as T) : fallback;

const DATE = /^\d{4}(-\d{2})?$/;
const date = (value: unknown) => (typeof value === "string" && DATE.test(value.trim()) ? value.trim() : "");

const SECTION_TYPES: SectionType[] = ["experience", "education", "projects", "certificates", "volunteering", "custom", "skills", "languages", "interests"];
const LEVELS: LanguageLevel[] = ["native", "c2", "c1", "b2", "b1", "a2", "a1"];

function normalizeDesign(input: unknown): Design {
  const d = isObject(input) ? input : {};
  return {
    template: oneOf(d.template, ["modern", "classic", "minimal", "elegant"], DEFAULT_DESIGN.template),
    accent: typeof d.accent === "string" && /^#[\da-f]{6}$/i.test(d.accent) ? d.accent : DEFAULT_DESIGN.accent,
    font: oneOf(d.font, ["inter", "roboto", "montserrat", "merriweather", "elegant"], DEFAULT_DESIGN.font),
    density: oneOf(d.density, ["compact", "normal", "spacious"], DEFAULT_DESIGN.density),
    language: oneOf(d.language, ["hu", "en"], DEFAULT_DESIGN.language),
    pageSize: oneOf(d.pageSize, ["A4", "LETTER"], DEFAULT_DESIGN.pageSize),
    photoShape: oneOf(d.photoShape, ["circle", "rounded", "square"], DEFAULT_DESIGN.photoShape),
  };
}

function normalizeBasics(input: unknown): Basics {
  const b = isObject(input) ? input : {};
  const basics = { ...EMPTY_BASICS };
  for (const key of Object.keys(EMPTY_BASICS) as (keyof Basics)[]) {
    if (key === "photo") continue;
    basics[key] = str(b[key], key === "summary" ? 5000 : 300) as never;
  }
  const photo = b.photo;
  basics.photo = typeof photo === "string" && /^data:image\/(jpeg|png|webp);base64,/.test(photo) && photo.length < 3_000_000 ? photo : null;
  return basics;
}

function normalizeEntry(input: unknown): Entry {
  const e = isObject(input) ? input : {};
  return {
    id: uid(),
    title: str(e.title, 300),
    subtitle: str(e.subtitle, 300),
    location: str(e.location, 200),
    url: str(e.url, 500),
    start: date(e.start),
    end: date(e.end),
    current: e.current === true,
    description: str(e.description),
  };
}

function normalizeSection(input: unknown): Section | null {
  if (!isObject(input) || !SECTION_TYPES.includes(input.type as SectionType)) return null;
  const base = { id: uid(), title: str(input.title, 120), visible: input.visible !== false };
  const list = (value: unknown) => (Array.isArray(value) ? value.slice(0, 100) : []);
  switch (input.type) {
    case "skills":
      return {
        ...base,
        type: "skills",
        skills: list(input.skills).map((skill): Skill => {
          const s = isObject(skill) ? skill : {};
          const level = Number(s.level);
          return { id: uid(), name: str(s.name, 200), level: Number.isInteger(level) && level >= 0 && level <= 5 ? level : 0 };
        }),
      };
    case "languages":
      return {
        ...base,
        type: "languages",
        languages: list(input.languages).map((language): LanguageSkill => {
          const l = isObject(language) ? language : {};
          return { id: uid(), name: str(l.name, 100), level: oneOf(l.level, LEVELS, "b2") };
        }),
      };
    case "interests":
      return { ...base, type: "interests", tags: list(input.tags).map((tag) => str(tag, 80)).filter(Boolean) };
    default:
      return { ...base, type: input.type as Exclude<SectionType, "skills" | "languages" | "interests">, entries: list(input.entries).map(normalizeEntry) };
  }
}

export function normalizeResume(input: unknown): Resume {
  const data = isObject(input) && isObject(input.resume) ? input.resume : input;
  if (!isObject(data) || (!isObject(data.basics) && !Array.isArray(data.sections))) {
    throw new Error("Ez a fájl nem CV Stúdió önéletrajz.");
  }
  const sections = Array.isArray(data.sections) ? data.sections.map(normalizeSection).filter((s): s is Section => s !== null) : emptyResume().sections;
  return { version: 1, design: normalizeDesign(data.design), basics: normalizeBasics(data.basics), sections };
}

export function exportResume(resume: Resume) {
  return JSON.stringify({ app: EXPORT_APP, version: 1, exportedAt: new Date().toISOString(), resume }, null, 2);
}
