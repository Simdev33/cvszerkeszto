import type { CvLanguage, LanguageLevel, SectionType } from "./types";

/** Labels printed on the CV itself (the editor UI is always Hungarian). */
export const CV_LABELS = {
  hu: {
    summary: "Bemutatkozás",
    contact: "Elérhetőség",
    present: "jelenleg",
    birthDate: "Születési dátum",
    drivingLicense: "Jogosítvány",
    sections: {
      experience: "Szakmai tapasztalat",
      education: "Tanulmányok",
      projects: "Projektek",
      certificates: "Tanúsítványok és képzések",
      volunteering: "Önkéntes munka",
      custom: "További információk",
      skills: "Készségek",
      languages: "Nyelvtudás",
      interests: "Érdeklődési kör",
    } satisfies Record<SectionType, string>,
    levels: {
      native: "Anyanyelv",
      c2: "Felsőfok (C2)",
      c1: "Felsőfok (C1)",
      b2: "Középfok (B2)",
      b1: "Középfok (B1)",
      a2: "Alapfok (A2)",
      a1: "Alapfok (A1)",
    } satisfies Record<LanguageLevel, string>,
    months: ["jan.", "febr.", "márc.", "ápr.", "máj.", "jún.", "júl.", "aug.", "szept.", "okt.", "nov.", "dec."],
  },
  en: {
    summary: "Profile",
    contact: "Contact",
    present: "Present",
    birthDate: "Date of birth",
    drivingLicense: "Driving licence",
    sections: {
      experience: "Experience",
      education: "Education",
      projects: "Projects",
      certificates: "Certifications",
      volunteering: "Volunteering",
      custom: "Additional information",
      skills: "Skills",
      languages: "Languages",
      interests: "Interests",
    } satisfies Record<SectionType, string>,
    levels: {
      native: "Native",
      c2: "Proficient (C2)",
      c1: "Advanced (C1)",
      b2: "Upper intermediate (B2)",
      b1: "Intermediate (B1)",
      a2: "Elementary (A2)",
      a1: "Beginner (A1)",
    } satisfies Record<LanguageLevel, string>,
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
} as const;

export type CvLabels = (typeof CV_LABELS)[CvLanguage];

/** Level as a 0–1 fraction, for bars and dots. */
export const LEVEL_VALUE: Record<LanguageLevel, number> = { native: 1, c2: 1, c1: 0.84, b2: 0.67, b1: 0.5, a2: 0.34, a1: 0.17 };
