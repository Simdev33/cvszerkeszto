/**
 * AI writing assistant: forwards one field's text to Google Gemini and streams
 * the rewritten text back as plain text. The API key never leaves the server.
 */
import { buildPrompt } from "@/lib/ai/prompt";
import { AI_RESET, parseAiRequest, type AiErrorCode } from "@/lib/ai/shared";

export const maxDuration = 60;

const API = "https://generativelanguage.googleapis.com/v1beta/models";

/** Tried in order; availability of the newest models fluctuates, so there are fallbacks. */
const MODELS = (process.env.GEMINI_MODELS ?? "gemini-3.8-flash,gemini-3.5-flash-lite,gemini-3.6-flash")
  .split(",")
  .map((model) => model.trim())
  .filter(Boolean);

/** Models that were overloaded, missing or broke off a stream are skipped for a while (per server instance). */
const cooldown = new Map<string, number>();

/** A stream that ends without a proper finish is retried at most this many times. */
const MAX_RETRIES = 2;

/* ------------------------------- rate limit ------------------------------- */

const WINDOW_MS = 10 * 60_000;
const MAX_REQUESTS = 40;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

/* --------------------------------- gemini --------------------------------- */

type Prompt = { system: string; user: string };
type Upstream = { ok: true; model: string; body: ReadableStream<Uint8Array> } | { ok: false; status: number };

/** Errors are codes; the editor shows them in the visitor's language. */
const fail = (error: AiErrorCode, status: number) => Response.json({ error }, { status, headers: { "cache-control": "no-store" } });

/** Opens a streaming completion on the first model that accepts the request. */
async function openStream(key: string, prompt: Prompt, signal: AbortSignal): Promise<Upstream> {
  const now = Date.now();
  const ready = MODELS.filter((model) => (cooldown.get(model) ?? 0) <= now);
  let lastStatus = 0;

  for (const model of ready.length ? ready : MODELS) {
    // Waiting for the first byte is bounded; the stream itself may take longer.
    const connect = new AbortController();
    const timer = setTimeout(() => connect.abort(), 15_000);
    try {
      const response = await fetch(`${API}/${model}:streamGenerateContent?alt=sse`, {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: prompt.system }] },
          contents: [{ role: "user", parts: [{ text: prompt.user }] }],
          generationConfig: { temperature: 0.6, maxOutputTokens: 4096, thinkingConfig: { thinkingLevel: "low" } },
        }),
        signal: AbortSignal.any([signal, connect.signal]),
      });
      if (response.ok && response.body) return { ok: true, model, body: response.body };
      lastStatus = response.status;
      console.warn(`[ai] ${model}: HTTP ${response.status} ${(await response.text()).slice(0, 300)}`);
      if (response.status === 404) cooldown.set(model, now + 60 * 60_000);
      else if (response.status === 429 || response.status >= 500) cooldown.set(model, now + 60_000);
    } catch (error) {
      if (signal.aborted) throw error;
      console.warn(`[ai] ${model}: ${error instanceof Error ? error.message : error}`);
      cooldown.set(model, now + 60_000);
    } finally {
      clearTimeout(timer);
    }
  }
  return { ok: false, status: lastStatus };
}

interface StreamEvent {
  candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] }; finishReason?: string }[];
}

/**
 * Forwards the text of Gemini's server-sent events. Returns the finish reason
 * ("" when the stream broke off) and whether any text was produced.
 */
async function relay(body: ReadableStream<Uint8Array>, send: (text: string) => void) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let finish = "";
  let produced = false;
  const handle = (line: string) => {
    if (!line.startsWith("data:")) return;
    try {
      const candidate = (JSON.parse(line.slice(5)) as StreamEvent).candidates?.[0];
      for (const part of candidate?.content?.parts ?? []) {
        if (typeof part.text !== "string" || part.thought || !part.text) continue;
        send(part.text);
        produced = true;
      }
      if (candidate?.finishReason) finish = candidate.finishReason;
    } catch {
      // A malformed event is skipped; a missing finish reason triggers a retry.
    }
  };
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() ?? "";
      lines.forEach(handle);
    }
    handle(buffer + decoder.decode());
  } catch {
    finish = "";
  }
  return { finish, produced };
}

/* ---------------------------------- route --------------------------------- */

export async function POST(request: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return fail("not_configured", 503);

  // Only the editor itself may call this endpoint (browsers always send this header).
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return fail("forbidden", 403);

  const ip = request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) return fail("rate_limited", 429);

  const body = parseAiRequest(await request.json().catch(() => null));
  if (!body) return fail("invalid", 400);

  const prompt = buildPrompt(body);
  const upstreamAbort = new AbortController();
  const signal = AbortSignal.any([request.signal, upstreamAbort.signal]);
  const first = await openStream(key, prompt, signal);
  if (!first.ok) {
    if (first.status === 429 || first.status >= 500 || first.status === 0) {
      return fail("overloaded", 503);
    }
    return fail("rejected", 502);
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (text: string) => controller.enqueue(encoder.encode(text));
      let current = first;
      for (let attempt = 0; ; attempt++) {
        const { finish, produced } = await relay(current.body, send);
        if (finish === "STOP" && produced) return controller.close();
        console.warn(`[ai] ${current.model}: finishReason=${finish || "none"}, produced=${produced}, attempt ${attempt + 1}`);
        if (attempt >= MAX_RETRIES || signal.aborted) break;
        // A stream that broke off usually means the model is overloaded: move on to the next one.
        if (!finish) cooldown.set(current.model, Date.now() + 60_000);
        const next = await openStream(key, prompt, signal).catch(() => null);
        if (!next?.ok) break;
        // Tells the client to discard the partial text it has received so far.
        if (produced) send(AI_RESET);
        current = next;
      }
      // Never let a cut-off text look finished: the client shows an error instead.
      controller.error(new Error("incomplete"));
    },
    cancel() {
      upstreamAbort.abort();
    },
  });

  return new Response(stream, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store", "x-ai-model": first.model },
  });
}
