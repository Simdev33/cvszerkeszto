import type { Basics, Entry, LanguageLevel } from "../types";

export type SampleEntry = Omit<Entry, "id">;

/**
 * A fully filled example CV in one language (fictional person and companies).
 * lib/resume/defaults.ts turns it into a Resume with fresh ids.
 */
export interface SampleData {
  basics: Omit<Basics, "photo">;
  experience: SampleEntry[];
  education: SampleEntry[];
  skills: { name: string; level: number }[];
  languages: { name: string; level: LanguageLevel }[];
  projects: SampleEntry[];
  certificates: SampleEntry[];
  interests: string[];
}
