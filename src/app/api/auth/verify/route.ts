import { fail, json, readBody, text } from "@/lib/server/api";
import { finishLogin } from "@/lib/server/login";
import { clientIp, limited } from "@/lib/server/rate-limit";

export const dynamic = "force-dynamic";

const CODES = { invalid: "codeInvalid", expired: "codeExpired", locked: "codeLocked" } as const;

/** Sign-in, step 2: checks the code and starts the session. */
export async function POST(request: Request) {
  const body = await readBody(request);
  if (limited(`verify:${clientIp(request)}`, 20, 15 * 60_000)) return fail("rateLimited", 429);
  try {
    const result = await finishLogin(text(body.code, 20));
    return result === "ok" ? json({ signedIn: true }) : fail(CODES[result], result === "invalid" ? 400 : 410);
  } catch (error) {
    console.error("[auth/verify]", error);
    return fail("billingUnavailable", 503);
  }
}
