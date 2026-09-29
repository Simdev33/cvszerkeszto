export type TemplateId = "modern" | "classic" | "minimal" | "elegant";
export type FontId = "inter" | "roboto" | "montserrat" | "merriweather" | "elegant";
export type Density = "compact" | "normal" | "spacious";
export type CvLanguage = "hu" | "en" | "fr" | "de" | "es";
export type PageSize = "A4" | "LETTER";
export type PhotoShape = "circle" | "rounded" | "square";

export interface Design {
  template: TemplateId;
  accent: string;
  font: FontId;
  density: Density;
  language: CvLanguage;
  pageSize: PageSize;
  photoShape: PhotoShape;
}

export interface Basics {
  lastName: string;
  firstName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  birthDate: string;
  drivingLicense: string;
  /** Square JPEG as a data URL. */
  photo: string | null;
  summary: string;
}

/** Dates are "YYYY-MM", "YYYY" or "". */
export interface Entry {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  url: string;
  start: string;
  end: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  /** 0 = no level shown, otherwise 1–5. */
  level: number;
}

export type LanguageLevel = "native" | "c2" | "c1" | "b2" | "b1" | "a2" | "a1";

export interface LanguageSkill {
  id: string;
  name: string;
  level: LanguageLevel;
}

export type EntrySectionType = "experience" | "education" | "projects" | "certificates" | "volunteering" | "custom";
export type SectionType = EntrySectionType | "skills" | "languages" | "interests";

interface SectionBase {
  id: string;
  /** Empty string = the default, localised title. */
  title: string;
  visible: boolean;
}

export type Section =
  | (SectionBase & { type: EntrySectionType; entries: Entry[] })
  | (SectionBase & { type: "skills"; skills: Skill[] })
  | (SectionBase & { type: "languages"; languages: LanguageSkill[] })
  | (SectionBase & { type: "interests"; tags: string[] });

export type EntrySection = Extract<Section, { entries: Entry[] }>;

export interface Resume {
  version: 1;
  design: Design;
  basics: Basics;
  sections: Section[];
}
