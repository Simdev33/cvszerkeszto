/**
 * "CV strength": a simple, transparent checklist with actionable tips.
 */
import type { Entry, Resume } from "./types";

export interface ScoreTip {
  id: string;
  text: string;
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
    { id: "name", points: 10, done: !!(basics.lastName.trim() && basics.firstName.trim()), text: "Add meg a teljes neved." },
    { id: "headline", points: 8, done: !!basics.headline.trim(), text: "Írj a neved alá egy rövid címet, például „Pénzügyi elemző”." },
    { id: "email", points: 8, done: /\S+@\S+\.\S+/.test(basics.email), text: "Adj meg egy e-mail-címet." },
    { id: "phone", points: 6, done: basics.phone.replace(/\D/g, "").length >= 7, text: "Adj meg egy telefonszámot." },
    { id: "location", points: 3, done: !!basics.location.trim(), text: "Add meg, melyik városban élsz vagy dolgoznál." },
    { id: "photo", points: 5, done: !!basics.photo, text: "Egy profi, világos hátterű fotó sokat javít az első benyomáson." },
    {
      id: "summary",
      points: 12,
      done: summary >= 200,
      partial: summary >= 80 ? 6 : 0,
      text: summary ? "Bővítsd a bemutatkozást 3–4 mondatra: ki vagy, miben vagy erős, mit keresel." : "Írj egy rövid bemutatkozást (3–4 mondat).",
    },
    { id: "experience", points: 12, done: experience.length > 0, text: "Add hozzá legalább egy munkahelyedet vagy gyakorlatodat." },
    {
      id: "experience-details",
      points: 8,
      done: experience.length > 0 && experience.every((entry) => entry.description.trim().length >= 40),
      text: "Írj rövid leírást minden munkahelyedhez – a „-” jellel kezdett sorok felsorolásként jelennek meg.",
    },
    {
      id: "numbers",
      points: 5,
      done: experience.some((entry) => /\d/.test(entry.description)),
      text: "Számszerűsítsd az eredményeidet, például: „18%-kal nőtt a konverzió”.",
    },
    { id: "education", points: 8, done: education.length > 0, text: "Add meg a legmagasabb iskolai végzettségedet." },
    {
      id: "skills",
      points: 8,
      done: skills.length >= 4,
      partial: skills.length > 0 ? 4 : 0,
      text: "Sorolj fel legalább 4 készséget, amely a megpályázott állashoz kapcsolódik.",
    },
    { id: "languages", points: 5, done: languages.length > 0, text: "Add meg a nyelvtudásodat (az anyanyelvedet is)." },
    { id: "links", points: 2, done: !!(basics.linkedin.trim() || basics.website.trim()), text: "Add meg a LinkedIn-profilodat vagy a weboldaladat." },
  ];

  let score = 0;
  const tips: ScoreTip[] = [];
  for (const check of checks) {
    if (check.done) score += check.points;
    else {
      score += check.partial ?? 0;
      tips.push({ id: check.id, text: check.text, points: check.points - (check.partial ?? 0) });
    }
  }
  tips.sort((a, b) => b.points - a.points);
  return { score, tips };
}
