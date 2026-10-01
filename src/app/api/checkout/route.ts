import { fail, json, localeOf, readBody, returnUrl, text } from "@/lib/server/api";
import { APP, BillingError, customersFor, ensureCustomer, isEmail, normalizeEmail, PLAN, prices, stripe } from "@/lib/server/billing";
import { clientIp, limited } from "@/lib/server/rate-limit";

export const dynamic = "force-dynamic";

/**
 * A Checkout Session for our own payment form (ui_mode "elements"):
 * €4.99 today for 7 days, then €9.99 a month.
 */
export async function POST(request: Request) {
  const body = await readBody(request);
  const locale = localeOf(body.locale);
  const email = normalizeEmail(text(body.email, 254));
  if (!isEmail(email)) return fail("invalidEmail", 400);
  if (limited(`checkout:${clientIp(request)}`, 20, 15 * 60_000)) return fail("rateLimited", 429);

  try {
    const existing = await customersFor(email);
    if (existing[0]?.access.active) return fail("alreadySubscribed", 409);
    const [{ trial, monthly }, customer] = await Promise.all([prices(), ensureCustomer(email, locale)]);

    // Stripe replaces the literal {CHECKOUT_SESSION_ID}, so it must not be URL-encoded.
    const back = returnUrl(request, body.returnPath);
    back.searchParams.delete("checkout_session_id");
    const separator = back.search ? "&" : "?";

    const session = await stripe().checkout.sessions.create({
      ui_mode: "elements",
      mode: "subscription",
      customer,
      line_items: [
        { price: monthly, quantity: 1 },
        { price: trial, quantity: 1 },
      ],
      subscription_data: { trial_period_days: PLAN.trialDays, metadata: { app: APP } },
      billing_address_collection: "auto",
      return_url: `${back.toString()}${separator}checkout_session_id={CHECKOUT_SESSION_ID}`,
      metadata: { app: APP, locale },
    });
    return json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("[checkout]", error);
    return fail(error instanceof BillingError && error.code === "notConfigured" ? "billingUnavailable" : "checkoutFailed", 503);
  }
}
