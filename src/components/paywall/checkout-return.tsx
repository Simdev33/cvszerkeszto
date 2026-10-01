"use client";

import { useEffect } from "react";
import { useI18n } from "@/i18n/client";
import { api, errorText, loadAccount } from "@/lib/account";
import { savePdf, usePaywall } from "@/lib/download";
import { toast } from "@/lib/toast";

/**
 * Coming back from a payment method that left the page (e.g. PayPal): signs in
 * with the completed Checkout Session, then downloads the CV – it is still in
 * this browser's storage, so nothing had to be kept aside.
 */
export function CheckoutReturn() {
  const { locale, billing } = useI18n();

  useEffect(() => {
    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get("checkout_session_id");
    if (!sessionId) return;
    url.searchParams.delete("checkout_session_id");
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);

    void (async () => {
      toast(billing.paywall.returning);
      try {
        await api("/api/checkout/complete", { body: { sessionId, locale } });
        const account = await loadAccount();
        if (!account.access?.active) throw new Error("no access");
        toast(billing.paywall.success, "success");
        await savePdf();
      } catch (error) {
        usePaywall.setState({ open: true, error: errorText(error, billing) });
      }
    })();
    // Runs once per page load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
