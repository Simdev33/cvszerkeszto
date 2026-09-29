/**
 * "CV strength": a simple, transparent checklist with actionable tips.
 */
import type { Entry, Resume } from "./types";

export type ScoreTipId =
  | "name"
  | "headline"
  | "email"
  | "phone"
  | "location"
  | "photo"
  | "summary"
  | "summaryEmpty"
  | "experience"
  | "experienceDetails"
  | "numbers"
  | "education"
  | "skills"
  | "languages"
  | "links";

/** A missing item; the editor shows the text for `id` in its own language. */
export interface ScoreTip {
  id: ScoreTipId;
  points: number;
}

export interface ScoreResult {
  score: number;
  tips: ScoreTip[];
}

export function scoreResume(resume: Resume): ScoreResult {
  const { basics } = resume;
  const visible = resume.sections.filter((section) => section.visible);
  const entriesOf = (type: string): Entry[] => visible.flatMap((section) => (section.type === type && "entries" in section ? section.entries : []));
  const experience = entriesOf("experience").filter((entry) => entry.title.trim() || entry.subtitle.trim());
  const education = entriesOf("education").filter((entry) => entry.title.trim() || entry.subtitle.trim());
  const skills = visible.flatMap((section) => (section.type === "skills" ? section.skills.filter((skill) => skill.name.trim()) : []));
  const languages = visible.flatMap((section) => (section.type === "languages" ? section.languages.filter((language) => language.name.trim()) : []));
  const summary = basics.summary.trim().length;

  const checks: (ScoreTip & { done: boolean; partial?: number })[] = [
    { id: "name", points: 10, done: !!(basics.lastName.trim() && basics.firstName.trim()) },
    { id: "headline", points: 8, done: !!basics.headline.trim() },
    { id: "email", points: 8, done: /\S+@\S+\.\S+/.test(basics.email) },
    { id: "phone", points: 6, done: basics.phone.replace(/\D/g, "").length >= 7 },
    { id: "location", points: 3, done: !!basics.location.trim() },
    { id: "photo", points: 5, done: !!basics.photo },
    {
      id: summary ? "summary" : "summaryEmpty",
      points: 12,
      done: summary >= 200,
      partial: summary >= 80 ? 6 : 0,
    },
    { id: "experience", points: 12, done: experience.length > 0 },
    {
      id: "experienceDetails",
      points: 8,
      done: experience.length > 0 && experience.every((entry) => entry.description.trim().length >= 40),
    },
    {
      id: "numbers",
      points: 5,
      done: experience.some((entry) => /\d/.test(entry.description)),
    },
    { id: "education", points: 8, done: education.length > 0 },
    {
      id: "skills",
      points: 8,
      done: skills.length >= 4,
      partial: skills.length > 0 ? 4 : 0,
    },
    { id: "languages", points: 5, done: languages.length > 0 },
    { id: "links", points: 2, done: !!(basics.linkedin.trim() || basics.website.trim()) },
  ];

  let score = 0;
  const tips: ScoreTip[] = [];
  for (const check of checks) {
    if (check.done) score += check.points;
    else {
      score += check.partial ?? 0;
      tips.push({ id: check.id, points: check.points - (check.partial ?? 0) });
    }
  }
  tips.sort((a, b) => b.points - a.points);
  return { score, tips };
}
