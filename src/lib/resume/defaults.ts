import { uid } from "@/lib/utils";
import sampleDe from "./samples/de";
import sampleEn from "./samples/en";
import sampleEs from "./samples/es";
import sampleFr from "./samples/fr";
import sampleHu from "./samples/hu";
import type { SampleData, SampleEntry } from "./samples/types";
import type { Basics, CvLanguage, Design, Entry, EntrySectionType, Resume, Section, SectionType } from "./types";

export const DEFAULT_DESIGN: Design = {
  template: "modern",
  accent: "#1e3a8a",
  font: "inter",
  density: "normal",
  language: "en",
  pageSize: "A4",
  photoShape: "circle",
};

export const EMPTY_BASICS: Basics = {
  lastName: "",
  firstName: "",
  headline: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  linkedin: "",
  github: "",
  birthDate: "",
  drivingLicense: "",
  photo: null,
  summary: "",
};

export function emptyEntry(patch: Partial<Entry> = {}): Entry {
  return { id: uid(), title: "", subtitle: "", location: "", url: "", start: "", end: "", current: false, description: "", ...patch };
}

export function createSection(type: SectionType, patch: Partial<{ title: string; visible: boolean }> = {}): Section {
  const base = { id: uid(), title: patch.title ?? "", visible: patch.visible ?? true };
  switch (type) {
    case "skills":
      return { ...base, type, skills: [] };
    case "languages":
      return { ...base, type, languages: [] };
    case "interests":
      return { ...base, type, tags: [] };
    default:
      return { ...base, type: type as EntrySectionType, entries: [] };
  }
}

export const DEFAULT_SECTION_ORDER: SectionType[] = ["experience", "education", "skills", "languages", "projects", "certificates", "interests"];

export function emptyResume(language: CvLanguage = DEFAULT_DESIGN.language): Resume {
  return {
    version: 1,
    design: { ...DEFAULT_DESIGN, language },
    basics: { ...EMPTY_BASICS },
    sections: DEFAULT_SECTION_ORDER.map((type) => createSection(type)),
  };
}

const SAMPLES: Record<CvLanguage, SampleData> = { hu: sampleHu, en: sampleEn, fr: sampleFr, de: sampleDe, es: sampleEs };

/** A realistic, fully filled example in the given language (fictional person and companies). */
export function sampleResume(language: CvLanguage = DEFAULT_DESIGN.language): Resume {
  const sample = SAMPLES[language];
  const entries = (items: SampleEntry[]): Entry[] => items.map((item) => ({ id: uid(), ...item }));
  const base = () => ({ id: uid(), title: "", visible: true });
  return {
    version: 1,
    design: { ...DEFAULT_DESIGN, language },
    basics: { ...sample.basics, photo: null },
    sections: [
      { ...base(), type: "experience", entries: entries(sample.experience) },
      { ...base(), type: "education", entries: entries(sample.education) },
      { ...base(), type: "skills", skills: sample.skills.map((skill) => ({ id: uid(), ...skill })) },
      { ...base(), type: "languages", languages: sample.languages.map((item) => ({ id: uid(), ...item })) },
      { ...base(), type: "projects", entries: entries(sample.projects) },
      { ...base(), type: "certificates", entries: entries(sample.certificates) },
      { ...base(), type: "interests", tags: [...sample.interests] },
    ],
  };
}
