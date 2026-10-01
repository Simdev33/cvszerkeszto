/**
 * The only plan: 7 days of full access for €4.99, then €9.99 a month (a
 * subscription with a 7-day trial and a one-off fee on its first invoice).
 * The payment form shows the amounts Stripe reports; these are for the
 * other texts (pricing, account, legal pages) and for creating the prices.
 */
export const PLAN = { trialDays: 7, trialFeeCents: 499, monthlyCents: 999, currency: "EUR" } as const;

export const formatMoney = (cents: number, locale: string) =>
  new Intl.NumberFormat(locale, { style: "currency", currency: PLAN.currency, currencyDisplay: "narrowSymbol" }).format(cents / 100);

/** Dictionary placeholders: {trial}, {monthly}, {days}, {next}. */
export const priceVars = (locale: string) => ({
  trial: formatMoney(PLAN.trialFeeCents, locale),
  monthly: formatMoney(PLAN.monthlyCents, locale),
  days: PLAN.trialDays,
  next: PLAN.trialDays + 1,
});
