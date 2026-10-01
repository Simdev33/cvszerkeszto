import { fail, json, readBody, text } from "@/lib/server/api";
import { accessFor, APP, forgetAccess, stripe } from "@/lib/server/billing";
import { setSession } from "@/lib/server/session";

export const dynamic = "force-dynamic";

const MAX_AGE_SECONDS = 24 * 60 * 60;

/** After a successful payment: signs the payer in on this device. */
export async function POST(request: Request) {
  const body = await readBody(request);
  const id = text(body.sessionId, 200);
  if (!id.startsWith("cs_")) return fail("paymentIncomplete", 400);

  try {
    const session = await stripe().checkout.sessions.retrieve(id);
    const customer = typeof session.customer === "string" ? session.customer : session.customer?.id;
    const email = session.customer_details?.email ?? session.customer_email;
    const fresh = Date.now() / 1000 - session.created < MAX_AGE_SECONDS;
    if (session.status !== "complete" || !customer || !email || !fresh || session.metadata?.app !== APP) {
      return fail("paymentIncomplete", 402);
    }
    forgetAccess(customer);
    await setSession({ customer, email });
    return json({ signedIn: true, email, access: await accessFor(customer) });
  } catch (error) {
    console.error("[checkout/complete]", error);
    return fail("billingUnavailable", 503);
  }
}
