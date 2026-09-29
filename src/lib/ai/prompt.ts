/** Prompts for the AI writing assistant (used by the /api/ai route). */
import type { CvLanguage } from "@/lib/resume/types";
import type { AiAction, AiRequest } from "./shared";

/** Per-language output rules, so each CV reads like one written by a native recruiter. */
const LANGUAGES: Record<CvLanguage, { name: string; rules: string; summary: string; bullets: string }> = {
  hu: {
    name: "Hungarian",
    rules: "Follow Hungarian spelling rules (e.g. 34%-kal, 40 000, Kft.) and avoid needless anglicisms.",
    summary: "first person singular (e.g. „…termékmenedzser vagyok, aki…”)",
    bullets: "Start every point with a noun phrase (e.g. „Új ügyfélkör kiépítése”, „Havi leltár lebonyolítása”).",
  },
  en: {
    name: "English (British spelling)",
    rules: "Use natural, concise CV English and keep proper names unchanged.",
    summary: "the usual subject-less CV style (e.g. “Product manager with…”)",
    bullets: "Start every point with a strong action verb (past tense for past roles, present tense for the current role).",
  },
  fr: {
    name: "French",
    rules: "Follow French typography (« guillemets », a non-breaking space before : ; ! ? and %, e.g. 34 %).",
    summary: "the usual impersonal French CV style (e.g. « Chef de produit avec sept ans d’expérience… »)",
    bullets: "Start every point consistently with a noun phrase (e.g. « Pilotage de… », « Mise en place de… »).",
  },
  de: {
    name: "German",
    rules: "Use the formal register and German number formatting (e.g. 34 %, 40.000).",
    summary: "the usual German CV profile style, not starting with „Ich“ (e.g. „Produktmanagerin mit sieben Jahren Erfahrung …“)",
    bullets: "Use a consistent nominal style (e.g. „Verantwortung für …“, „Einführung von …“).",
  },
  es: {
    name: "Spanish (Spain)",
    rules: "Use Spanish as written in Spain and Spanish number formatting (e.g. 34 %, 40.000).",
    summary: "the usual Spanish CV style (e.g. «Product manager con siete años de experiencia…»)",
    bullets: "Start every point consistently with a noun phrase (e.g. «Gestión de…», «Implantación de…»).",
  },
};

function system(request: AiRequest) {
  const language = LANGUAGES[request.language];
  return [
    "You are an experienced HR professional and CV editor. You write or improve the text of one field of a CV.",
    "",
    "Rules:",
    "- Return only the finished text: no introduction, explanation, quotation marks, headings or markdown formatting (bold, italics).",
    "- Do not invent facts: no numbers, percentages, company names, tools, results or responsibilities that are not in the given data. Leave out anything uncertain.",
    "- Do not exaggerate: no “more than”, “numerous” or “outstanding” style inflation unless the data supports it; take numbers over exactly as given.",
    `- Output language: ${language.name}. If the input is in another language, translate it naturally, not word for word.`,
    "- Natural, polished professional language. Avoid clichés (e.g. “team player”, “dynamic”, “motivated”) and advertising style.",
    `- ${language.rules}`,
  ].join("\n");
}

function format(request: AiRequest) {
  const language = LANGUAGES[request.language];
  if (request.field === "summary") {
    const length = request.action === "shorten" ? "2–3 sentences, at most 350 characters" : "3–4 sentences, at most 600 characters in total";
    return `Format: a single paragraph, ${length}, no bullet points, in ${language.summary}. Highlight only the 1–2 most important achievements from the background; do not list the whole career.`;
  }
  const bullets = `Format: a concise bullet list, every point on its own line starting with "- ", 3–6 points; one idea per point, at most about 15 words. ${language.bullets}`;
  if (request.action === "improve" || request.action === "shorten") {
    return `Keep the original form: a bullet list stays a bullet list (with "- "), running text stays running text. ${bullets}`;
  }
  return bullets;
}

const TASKS: Record<AiAction, (request: AiRequest) => string> = {
  write: (request) =>
    request.field === "summary"
      ? "Write a professional profile based on the CV data: who the candidate is professionally, the length of their experience (if it follows from the dates), their main field and 1–2 genuine strengths. If the field contains a draft or notes, work from them."
      : "Write a description for this item. If the field contains a draft or notes, work from them; otherwise describe only duties that are typical for the position in general, without specific numbers or results – the candidate will add those later.",
  improve: () => "Improve the text: spelling, grammar, flow and professional tone. Keep the content and roughly the length.",
  impact: () =>
    "Make the text more convincing and results-oriented: strong, active wording that puts responsibility and achieved results first. Highlight existing numbers; do not invent new ones.",
  bullets: () => "Turn the text into a consistent, concise bullet list, keeping all information.",
  shorten: () => "Shorten the text to about half to two thirds of its length, keeping the most important information.",
};

const FIELD_NAME = { summary: "Professional profile (summary)", description: "Description of one item" } as const;

export function buildPrompt(request: AiRequest) {
  const user = [
    request.context.trim() ? `CV data (background):\n${request.context.trim()}` : "",
    `Field: ${FIELD_NAME[request.field]}`,
    `Current text of the field:\n"""\n${request.text.trim() || "(empty)"}\n"""`,
    `Task: ${TASKS[request.action](request)}`,
    format(request),
  ]
    .filter(Boolean)
    .join("\n\n");
  return { system: system(request), user };
}
