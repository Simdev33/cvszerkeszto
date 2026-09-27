import { AI_RESET, cleanAiText, type AiRequest } from "./shared";

/**
 * Calls /api/ai and reports the growing text while it streams in. Resolves
 * with the cleaned final text; rejects with a user-facing Hungarian message.
 */
export async function requestAi(request: AiRequest, onText: (text: string) => void, signal: AbortSignal) {
  let response: Response;
  try {
    response = await fetch("/api/ai", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(request), signal });
  } catch (error) {
    if (signal.aborted) throw error;
    throw new Error("Nincs kapcsolat a szerverrel. Ellenőrizd az internetkapcsolatot.");
  }
  if (!response.ok || !response.body) {
    const message = await response
      .json()
      .then((data: { error?: string }) => data.error)
      .catch(() => undefined);
    throw new Error(message ?? "Az AI-segéd most nem érhető el.");
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
    throw new Error("A válasz megszakadt. Próbáld újra.");
  }

  const result = cleanAiText(text);
  if (!result) throw new Error("Az AI nem adott vissza szöveget. Próbáld újra, vagy fogalmazd át a mezőt.");
  return result;
}
