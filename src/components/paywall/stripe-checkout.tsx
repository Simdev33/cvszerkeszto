"use client";

import { CheckoutElementsProvider, ExpressCheckoutElement, PaymentElement, useCheckoutElements } from "@stripe/react-stripe-js/checkout";
import { loadStripe, type Appearance, type Stripe, type StripeConstructorOptions } from "@stripe/stripe-js";
import { CreditCard, Lock } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/controls";
import { useI18n } from "@/i18n/client";
import type { Locale } from "@/i18n/config";
import { fmt } from "@/i18n/format";

const stripes = new Map<Locale, Promise<Stripe | null>>();

function stripeFor(locale: Locale) {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) return null;
  let promise = stripes.get(locale);
  if (!promise) {
    // developerTools: with test keys Stripe.js would put its "stripe >" badge in a corner of every page.
    promise = loadStripe(key, { locale: locale as StripeConstructorOptions["locale"], developerTools: { assistant: { enabled: false } } });
    stripes.set(locale, promise);
  }
  return promise;
}

export const stripeConfigured = () => Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

/** Stripe's iframes cannot see our CSS variables, so the colours are passed in. */
function appearance(): Appearance {
  const css = getComputedStyle(document.documentElement);
  const token = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
  const dark = document.documentElement.classList.contains("dark");
  return {
    theme: dark ? "night" : "stripe",
    variables: {
      colorPrimary: token("--primary", "#4f46e5"),
      colorBackground: token("--surface", "#ffffff"),
      colorText: token("--fg", "#0e1014"),
      colorDanger: token("--danger", "#dc2626"),
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      borderRadius: "10px",
    },
  };
}

export interface Prices {
  today: string;
  monthly: string | null;
}

/**
 * A Checkout Session's payment methods: express buttons (Apple Pay, Google Pay,
 * PayPal, Link) and the card form behind one button. Nothing works without `consent`.
 */
export function StripeCheckout(props: {
  clientSecret: string;
  consent: boolean;
  onConsentMissing: () => void;
  onPaid: (sessionId: string) => void;
  renderPrices: (prices: Prices) => ReactNode;
}) {
  const { locale } = useI18n();
  const stripe = useMemo(() => stripeFor(locale), [locale]);
  const options = useMemo(() => ({ clientSecret: props.clientSecret, elementsOptions: { appearance: appearance() } }), [props.clientSecret]);
  return (
    <CheckoutElementsProvider stripe={stripe} options={options}>
      <PaymentMethods {...props} />
    </CheckoutElementsProvider>
  );
}

function PaymentMethods({
  consent,
  onConsentMissing,
  onPaid,
  renderPrices,
}: {
  consent: boolean;
  onConsentMissing: () => void;
  onPaid: (sessionId: string) => void;
  renderPrices: (prices: Prices) => ReactNode;
}) {
  const state = useCheckoutElements();
  const { locale, billing } = useI18n();
  const text = billing.paywall;
  const [cardOpen, setCardOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (state.type === "loading") {
    return (
      <p className="flex items-center gap-2 py-6 text-sm text-fg-subtle">
        <Spinner /> {text.loading}
      </p>
    );
  }
  if (state.type === "error") return <p className="py-4 text-sm text-danger">{state.error.message}</p>;

  const { checkout } = state;
  // Stripe's own texts show "4,99 EUR" in some languages; amounts are formatted like the rest of the page.
  const money = (minor: number) =>
    new Intl.NumberFormat(locale, { style: "currency", currency: checkout.currency.toUpperCase(), currencyDisplay: "narrowSymbol" }).format(
      minor / checkout.minorUnitsAmountDivisor,
    );
  const prices: Prices = {
    today: money(checkout.total.total.minorUnitsAmount),
    monthly: checkout.recurring ? money(checkout.recurring.dueNext.total.minorUnitsAmount) : null,
  };

  const confirm = async (extra: Parameters<typeof checkout.confirm>[0] = {}) => {
    if (!consent) {
      onConsentMissing();
      return;
    }
    setBusy(true);
    setError(null);
    const result = await checkout.confirm({ redirect: "if_required", ...extra });
    if (result.type === "error") {
      setError(result.error.message);
      setBusy(false);
      return;
    }
    onPaid(result.session.id);
  };

  return (
    <div className="space-y-3">
      {renderPrices(prices)}

      <div className="relative">
        {/* Express buttons cannot be held back, so they stay disabled until the consent is given. */}
        <div className={`space-y-3 transition-opacity ${consent ? "" : "pointer-events-none opacity-45"}`} aria-disabled={!consent}>
          <ExpressCheckoutElement
            options={{
              buttonHeight: 48,
              buttonTheme: undefined,
              paymentMethods: undefined,
              buttonType: { applePay: "plain", googlePay: "plain", paypal: "paypal" },
              layout: { maxColumns: 1, maxRows: 6, overflow: "never" },
              paymentMethodOrder: ["apple_pay", "google_pay", "paypal", "link"],
            }}
            onConfirm={(event) => void confirm({ expressCheckoutConfirmEvent: event })}
          />
          {cardOpen ? (
            <div className="space-y-3 rounded-xl bg-surface p-4 ring-1 ring-border ring-inset">
              <PaymentElement options={{ layout: "tabs" }} />
              <Button variant="primary" size="lg" className="w-full" disabled={busy} onClick={() => void confirm()}>
                {busy ? <Spinner /> : <Lock />}
                {fmt(text.pay, { amount: prices.today })}
              </Button>
            </div>
          ) : (
            <Button size="lg" className="w-full" onClick={() => setCardOpen(true)}>
              <CreditCard />
              {text.card}
            </Button>
          )}
        </div>
        {!consent && <button type="button" aria-label={text.consentNeeded} className="absolute inset-0 cursor-not-allowed" onClick={onConsentMissing} />}
      </div>

      {busy && !error && (
        <p className="flex items-center gap-2 text-sm text-fg-subtle">
          <Spinner /> {text.processing}
        </p>
      )}
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}
