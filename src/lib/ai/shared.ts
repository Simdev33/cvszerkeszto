/**
 * The contract between the editor and /api/ai, shared by browser and server.
 * Only the edited field and a short, anonymous context are ever sent – never
 * names, contact details or the photo.
 */
import type { CvLanguage } from "@/lib/resume/types";

export type AiField = "summary" | "description";
export type AiAction = "write" | "improve" | "impact" | "bullets" | "shorten";

export interface AiRequest {
  field: AiField;
  action: AiAction;
  language: CvLanguage;
  /** The current text of the field (may be empty for "write"). */
  text: string;
  /** Background for the model, built by lib/ai/context.ts. */
  context: string;
}

export const AI_LIMITS = { text: 4000, context: 6000 };

/** Sent by the server when it retries mid-stream: everything before it is discarded. */
export const AI_RESET = "\u001e";

const FIELDS: AiField[] = ["summary", "description"];
const ACTIONS: AiAction[] = ["write", "improve", "impact", "bullets", "shorten"];

/** Validates an untrusted request body; returns null when it is not usable. */
export function parseAiRequest(body: unknown): AiRequest | null {
  if (!body || typeof body !== "object") return null;
  const { field, action, language, text, context } = body as Record<string, unknown>;
  if (!FIELDS.includes(field as AiField) || !ACTIONS.includes(action as AiAction)) return null;
  if (language !== "hu" && language !== "en") return null;
  if (typeof text !== "string" || typeof context !== "string") return null;
  if (text.length > AI_LIMITS.text || context.length > AI_LIMITS.context) return null;
  if (action !== "write" && !text.trim()) return null;
  if (action === "bullets" && field !== "description") return null;
  return { field: field as AiField, action: action as AiAction, language, text, context };
}

const BULLET = /^\s*[-*•–·▪]\s+/;

/**
 * Normalises model output to the editor's plain-text format: no markdown
 * emphasis or code fences, bullets as "- ", no wrapping quotes.
 */
export function cleanAiText(raw: string) {
  let text = raw
    .replace(/^```[a-z]*\s*\n?|\n?```\s*$/gi, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .trim();
  const quoted = /^["„“”']([\s\S]*)["”“']$/.exec(text);
  if (quoted && !/["„“”]/.test(quoted[1])) text = quoted[1].trim();
  return text
    .split(/\r?\n/)
    .map((line) => (BULLET.test(line) ? `- ${line.replace(BULLET, "").trim()}` : line.trimEnd()))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
