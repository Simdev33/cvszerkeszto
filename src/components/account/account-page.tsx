"use client";

import { CircleUserRound, CreditCard, LogOut, PencilLine } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/controls";
import { useI18n } from "@/i18n/client";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { fmt } from "@/i18n/format";
import { errorText, loadAccount, openBillingPortal, signOut, useAccount, type AccessInfo } from "@/lib/account";
import { formatMoney, PLAN } from "@/lib/plan";
import { LoginForm } from "./login-form";

function statusText(access: AccessInfo | null, locale: Locale, text: Dictionary["billing"]["account"]) {
  const date = (seconds: number | null) => (seconds ? new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(seconds * 1000)) : "–");
  const monthly = formatMoney(PLAN.monthlyCents, locale);
  if (!access || !["trialing", "active", "past_due"].includes(access.status)) return text.none;
  if (access.status === "past_due") return text.pastDue;
  if (access.cancelAtPeriodEnd) return fmt(text.canceling, { date: date(access.periodEnd) });
  if (access.status === "trialing") return fmt(text.trial, { date: date(access.trialEnd), monthly });
  return fmt(text.active, { date: date(access.periodEnd), monthly });
}

/** Sign in with an e-mail code; subscribers see their plan and the Stripe portal (cancellation, card, invoices). */
export function AccountPage() {
  const { locale, billing } = useI18n();
  const text = billing.account;
  const account = useAccount();
  const [busy, setBusy] = useState<"portal" | "logout" | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAccount().catch(() => setError(text.error));
  }, [text.error]);

  const act = async (kind: "portal" | "logout") => {
    setBusy(kind);
    setError(null);
    try {
      if (kind === "portal") await openBillingPortal(locale, localePath(locale, "account"));
      else await signOut();
    } catch (failure) {
      setError(errorText(failure, billing));
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="relative mx-auto max-w-md px-5 pt-14 pb-24 sm:pt-20">
      <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
        <CircleUserRound className="size-6" />
      </span>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight">{account.signedIn ? text.title : billing.auth.title}</h1>

      <div className="mt-8 rounded-3xl border border-border bg-surface p-6 shadow-sm">
        {!account.loaded && !error ? (
          <p className="flex items-center gap-2 text-sm text-fg-subtle">
            <Spinner /> {text.loading}
          </p>
        ) : account.signedIn ? (
          <div className="space-y-5">
            <div className="rounded-2xl bg-surface-2 p-4 ring-1 ring-border ring-inset">
              <p className="text-[13px] text-fg-subtle">{fmt(text.signedInAs, { email: account.email ?? "" })}</p>
              <p className="mt-2 text-[15px] leading-relaxed">{statusText(account.access, locale, text)}</p>
            </div>
            <div className="space-y-2">
              <Button variant="primary" size="lg" className="w-full" onClick={() => void act("portal")} disabled={busy !== null}>
                {busy === "portal" ? <Spinner /> : <CreditCard />}
                {text.manage}
              </Button>
              <p className="text-[12.5px] leading-relaxed text-fg-subtle">{text.manageHint}</p>
            </div>
            <Link
              href={localePath(locale, "editor")}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-surface text-sm font-medium ring-1 ring-border-strong/70 ring-inset hover:bg-surface-2"
            >
              <PencilLine className="size-4" /> {text.start}
            </Link>
            <Button variant="ghost" className="w-full" onClick={() => void act("logout")} disabled={busy !== null}>
              {busy === "logout" ? <Spinner /> : <LogOut />}
              {text.logout}
            </Button>
          </div>
        ) : (
          <LoginForm />
        )}
        {error && <p className="mt-4 text-sm text-danger">{error}</p>}
      </div>
    </div>
  );
}
