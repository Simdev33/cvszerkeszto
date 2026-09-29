import { AI_RESET, cleanAiText, type AiErrorCode, type AiRequest } from "./shared";

/** A failure the editor explains in its own language. */
export class AiError extends Error {
  constructor(readonly code: AiErrorCode) {
    super(code);
    this.name = "AiError";
  }
}

/**
 * Calls /api/ai and reports the growing text while it streams in. Resolves
 * with the cleaned final text; rejects with an AiError.
 */
export async function requestAi(request: AiRequest, onText: (text: string) => void, signal: AbortSignal) {
  let response: Response;
  try {
    response = await fetch("/api/ai", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(request), signal });
  } catch (error) {
    if (signal.aborted) throw error;
    throw new AiError("network");
  }
  if (!response.ok || !response.body) {
    const code = await response
      .json()
      .then((data: { error?: AiErrorCode }) => data.error)
      .catch(() => undefined);
    throw new AiError(code ?? "unknown");
  }

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  let text = "";
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      text += value;
      const reset = text.lastIndexOf(AI_RESET);
      if (reset >= 0) text = text.slice(reset + 1);
      onText(cleanAiText(text));
    }
  } catch (error) {
    if (signal.aborted) throw error;
    throw new AiError("interrupted");
  }

  const result = cleanAiText(text);
  if (!result) throw new AiError("empty");
  return result;
}
