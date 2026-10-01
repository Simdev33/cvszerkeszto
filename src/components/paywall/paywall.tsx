"use client";

import { Check, CircleCheck, FileText, Lock, ShieldCheck, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { fieldClass, LoginForm } from "@/components/account/login-form";
import { Logo } from "@/components/brand";
import { LinkText } from "@/components/link-text";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/controls";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/format";
import { api, ApiError, errorText, loadAccount, requestLoginCode, useAccount } from "@/lib/account";
import { buildPdf, savePdf, usePaywall } from "@/lib/download";
import { fileBaseName } from "@/lib/files";
import { formatMoney, PLAN } from "@/lib/plan";
import { useEditor } from "@/lib/store";
import { toast } from "@/lib/toast";
import { StripeCheckout, stripeConfigured, type Prices } from "./stripe-checkout";

/** Shown instead of the download for visitors without a subscription. */
export function Paywall() {
  const open = usePaywall((state) => state.open);
  return open ? <PaywallScreen /> : null;
}

const close = () => usePaywall.setState({ open: false, error: null });

function PaywallScreen() {
  const { billing, common } = useI18n();
  const resume = useEditor((state) => state.resume);
  // The CV cannot change while this screen is open, so one PDF serves the preview and the download.
  const [pdf, setPdf] = useState<Blob | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    buildPdf(resume)
      .then((blob) => !cancelled && setPdf(blob))
      .catch((error) => console.warn("[paywall] pdf failed", error));
    return () => {
      cancelled = true;
    };
    // Built once when the screen opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unlocked = async () => {
    close();
    toast(billing.paywall.success, "success");
    await savePdf(pdf ?? undefined);
  };

  return (
    <div role="dialog" aria-modal aria-label={billing.paywall.label} className="fixed inset-0 z-[60] overflow-y-auto bg-bg animate-fade-in">
      <header className="sticky top-0 z-10 border-b border-border bg-bg/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5">
          <Logo />
          <button type="button" onClick={close} aria-label={common.close} className="grid size-9 place-items-center rounded-lg text-fg-muted hover:bg-surface-2 hover:text-fg">
            <X className="size-5" />
          </button>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-8 pb-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pt-12">
        <section className="min-w-0">
          <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight text-success sm:text-4xl">
            <CircleCheck className="size-8 shrink-0" />
            {billing.paywall.ready}
          </h1>
          <PreviewCard pdf={pdf} name={`${fileBaseName(resume)}.pdf`} />
        </section>
        <section className="min-w-0">
          <PaymentPanel onUnlocked={unlocked} />
        </section>
      </div>
    </div>
  );
}

/** The first page of the PDF – so you see what you are paying for. */
function PreviewCard({ pdf, name }: { pdf: Blob | null; name: string }) {
  const { billing } = useI18n();
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!pdf) return;
    let cancelled = false;
    let made: string[] = [];
    (async () => {
      const { renderPreview } = await import("@/lib/preview");
      const pages = await renderPreview(new Uint8Array(await pdf.arrayBuffer()), Math.round(560 * Math.min(window.devicePixelRatio || 1, 2)));
      made = pages.map((page) => page.url);
      if (!cancelled) setUrl(made[0] ?? null);
    })().catch((error) => console.warn("[paywall] preview failed", error));
    return () => {
      cancelled = true;
      made.forEach((item) => URL.revokeObjectURL(item));
    };
  }, [pdf]);

  return (
    <div className="mt-8 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-10">
      <div className="relative mx-auto max-w-sm">
        <span className="absolute -top-3 -left-3 z-10 rounded-md bg-primary px-2 py-1 text-[11px] font-bold tracking-wide text-primary-fg shadow">PDF</span>
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element -- rendered locally from the generated PDF
          <img src={url} alt="" className="w-full rounded-[3px] bg-white shadow-page" />
        ) : (
          <div className="grid aspect-[1/1.414] w-full place-items-center rounded-[3px] bg-surface-2">
            <span className="flex flex-col items-center gap-2 text-sm text-fg-subtle">
              <FileText className="size-8" />
              <span className="flex items-center gap-2">
                <Spinner /> {billing.paywall.preparing}
              </span>
            </span>
          </div>
        )}
      </div>
      <p className="mt-5 truncate text-center text-sm font-medium text-fg-muted" title={name}>
        {name}
      </p>
    </div>
  );
}

type Step = { kind: "email" } | { kind: "pay"; clientSecret: string; email: string } | { kind: "login"; email: string; codeSent: boolean; note?: string };

function PaymentPanel({ onUnlocked }: { onUnlocked: () => Promise<void> }) {
  const { locale, billing } = useI18n();
  const text = billing.paywall;
  const accountEmail = useAccount((state) => state.email);
  const initialError = usePaywall((state) => state.error);
  const [step, setStep] = useState<Step>({ kind: "email" });
  const [email, setEmail] = useState(accountEmail ?? "");
  const [consent, setConsent] = useState(false);
  const [consentWarning, setConsentWarning] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(initialError);

  const days = PLAN.trialDays;
  const staticPrices: Prices = { today: formatMoney(PLAN.trialFeeCents, locale), monthly: formatMoney(PLAN.monthlyCents, locale) };

  const startCheckout = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const { clientSecret } = await api<{ clientSecret: string }>("/api/checkout", {
        body: { email: email.trim(), locale, returnPath: window.location.pathname },
      });
      setStep({ kind: "pay", clientSecret, email: email.trim() });
    } catch (failure) {
      if (failure instanceof ApiError && failure.code === "alreadySubscribed") {
        // This address already pays: sign in instead of paying again.
        await requestLoginCode(email.trim(), locale).catch(() => undefined);
        setStep({ kind: "login", email: email.trim(), codeSent: true, note: errorText(failure, billing) });
      } else {
        setError(errorText(failure, billing));
      }
    } finally {
      setBusy(false);
    }
  };

  const unlockIfActive = async () => {
    const account = await loadAccount().catch(() => null);
    if (account?.access?.active) await onUnlocked();
  };

  const paid = async (sessionId: string) => {
    try {
      await api("/api/checkout/complete", { body: { sessionId, locale } });
      await unlockIfActive();
    } catch (failure) {
      setError(errorText(failure, billing));
    }
  };

  const priceRow = (prices: Prices) => (
    <div className="flex items-baseline justify-between gap-4 border-y border-border py-5">
      <span className="font-semibold">{fmt(text.priceLabel, { days })}</span>
      <span className="text-4xl font-semibold tracking-tight tabular-nums">{prices.today}</span>
    </div>
  );

  const renewal = fmt(text.renewal, { days, next: days + 1, monthly: staticPrices.monthly ?? "" });

  return (
    <div>
      <h2 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{text.title}</h2>
      <p className="mt-6 text-sm font-semibold">{fmt(text.includes, { days })}</p>
      <ul className="mt-3 space-y-2.5">
        {text.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-[15px] text-fg-muted">
            <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        {step.kind !== "pay" && priceRow(staticPrices)}

        {!stripeConfigured() ? (
          <p className="mt-6 rounded-xl bg-warning-soft p-4 text-sm text-warning">{text.notConfigured}</p>
        ) : step.kind === "email" ? (
          <form onSubmit={startCheckout} className="mt-6 space-y-3">
            <label className="block space-y-1.5">
              <span className="text-[13px] font-medium text-fg-muted">{text.email}</span>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder={text.emailPlaceholder}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={fieldClass}
              />
              <span className="block text-xs text-fg-subtle">{text.emailHint}</span>
            </label>
            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={busy || !email.trim()}>
              {busy && <Spinner />}
              {text.continue}
            </Button>
            <p className="text-center text-sm text-fg-subtle">
              {text.haveAccount}{" "}
              <button type="button" className="font-medium text-primary hover:underline" onClick={() => setStep({ kind: "login", email: email.trim(), codeSent: false })}>
                {text.login}
              </button>
            </p>
          </form>
        ) : step.kind === "pay" ? (
          <StripeCheckout
            clientSecret={step.clientSecret}
            consent={consent}
            onConsentMissing={() => setConsentWarning(true)}
            onPaid={(sessionId) => void paid(sessionId)}
            renderPrices={(prices) => (
              <>
                {priceRow(prices)}
                <div className="flex items-center justify-between gap-3 pt-2 text-sm">
                  <span className="truncate text-fg-subtle">{step.email}</span>
                  <button type="button" className="shrink-0 font-medium text-primary hover:underline" onClick={() => setStep({ kind: "email" })}>
                    {text.change}
                  </button>
                </div>
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-xl p-3.5 text-sm leading-relaxed ring-1 ring-inset ${
                    consentWarning && !consent ? "bg-danger-soft ring-danger/40" : "bg-surface ring-border"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => {
                      setConsent(event.target.checked);
                      setConsentWarning(false);
                    }}
                    className="mt-1 size-4 shrink-0 accent-primary"
                  />
                  <span>
                    <LinkText text={text.consent} locale={locale} newTab />
                  </span>
                </label>
                {consentWarning && !consent && <p className="text-sm text-danger">{text.consentNeeded}</p>}
                <p className="pt-2 text-[11px] font-semibold tracking-[0.14em] text-fg-subtle uppercase">{text.methods}</p>
              </>
            )}
          />
        ) : (
          <div className="mt-6 space-y-3">
            {step.note && <p className="rounded-xl bg-primary-soft p-3.5 text-sm text-primary-soft-fg">{step.note}</p>}
            <LoginForm initialEmail={step.email} codeSent={step.codeSent} onSuccess={() => void unlockIfActive()} />
            <button type="button" className="text-sm font-medium text-primary hover:underline" onClick={() => setStep({ kind: "email" })}>
              {text.backToPay}
            </button>
          </div>
        )}

        {error && <p className="mt-4 text-sm text-danger">{error}</p>}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-border pt-5 text-xs text-fg-subtle">
        <span className="flex items-center gap-1.5">
          <Lock className="size-3.5" /> {text.ssl}
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="size-3.5" /> {text.stripe}
        </span>
        <span className="flex items-center gap-1.5">
          <Check className="size-3.5" /> {text.cancelAnytime}
        </span>
      </div>
      <p className="mt-5 rounded-xl bg-surface p-4 text-[12.5px] leading-relaxed text-fg-subtle ring-1 ring-border ring-inset">
        <LinkText text={renewal} locale={locale} newTab />
      </p>
    </div>
  );
}
