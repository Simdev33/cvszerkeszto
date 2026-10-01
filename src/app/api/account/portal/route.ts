import { fail, json, localeOf, readBody, returnUrl } from "@/lib/server/api";
import { portalUrl } from "@/lib/server/billing";
import { getSession } from "@/lib/server/session";

export const dynamic = "force-dynamic";

/** A Stripe customer portal link: cancellation, card change, invoices. */
export async function POST(request: Request) {
  const body = await readBody(request);
  const locale = localeOf(body.locale);
  const session = await getSession();
  if (!session) return fail("notSignedIn", 401);
  try {
    return json({ url: await portalUrl(session.customer, returnUrl(request, body.returnPath).toString(), locale) });
  } catch (error) {
    console.error("[portal]", error);
    return fail("billingUnavailable", 503);
  }
}
