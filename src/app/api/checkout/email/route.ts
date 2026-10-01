import { fail, json, readBody, text } from "@/lib/server/api";
import { BillingError, customersFor, isEmail, normalizeEmail } from "@/lib/server/billing";
import { clientIp, limited } from "@/lib/server/rate-limit";

export const dynamic = "force-dynamic";

/** Before paying: is there already a live subscription with this address (then sign in instead of paying)? */
export async function POST(request: Request) {
  const body = await readBody(request);
  const email = normalizeEmail(text(body.email, 254));
  if (!isEmail(email)) return fail("invalidEmail", 400);
  if (limited(`checkout-email:${clientIp(request)}`, 20, 15 * 60_000)) return fail("rateLimited", 429);

  try {
    const [existing] = await customersFor(email);
    if (existing?.access.active) return fail("alreadySubscribed", 409);
    return json({ ok: true });
  } catch (error) {
    console.error("[checkout/email]", error);
    return fail(error instanceof BillingError && error.code === "notConfigured" ? "billingUnavailable" : "checkoutFailed", 503);
  }
}
