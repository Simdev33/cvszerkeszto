"use client";

/**
 * The visitor's account as the browser sees it: signed in or not, and whether
 * they may download. The server decides (/api/account); this only keeps it for the UI.
 */
import { create } from "zustand";
import { COOKIES } from "@/config/cookies";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

export interface AccessInfo {
  active: boolean;
  status: string;
  trialEnd: number | null;
  periodEnd: number | null;
  cancelAtPeriodEnd: boolean;
}

export interface AccountState {
  loaded: boolean;
  signedIn: boolean;
  email: string | null;
  access: AccessInfo | null;
  /** Stripe is set up on the server. */
  billing: boolean;
}

export const useAccount = create<AccountState>()(() => ({ loaded: false, signedIn: false, email: null, access: null, billing: true }));

type ServerCode = keyof Dictionary["billing"]["server"];

export class ApiError extends Error {
  constructor(
    readonly code: ServerCode,
    readonly status: number,
  ) {
    super(code);
  }
}

/** The server's error code in the visitor's language. */
export const errorText = (error: unknown, billing: Dictionary["billing"]) =>
  error instanceof ApiError ? (billing.server[error.code] ?? billing.server.unexpected) : billing.server.unexpected;

export async function api<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const response = await fetch(path, {
    method: init?.method ?? (init?.body ? "POST" : "GET"),
    headers: init?.body ? { "Content-Type": "application/json" } : undefined,
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  const data = (await response.json().catch(() => ({}))) as T & { code?: ServerCode };
  if (!response.ok) throw new ApiError(data.code ?? "unexpected", response.status);
  return data;
}

/** Whether someone may be signed in, from the cookie scripts can read. */
export const maybeSignedIn = () => typeof document !== "undefined" && document.cookie.split("; ").some((cookie) => cookie.startsWith(`${COOKIES.signedIn}=`));

export async function loadAccount(): Promise<AccountState> {
  const data = await api<Omit<AccountState, "loaded">>("/api/account");
  const state: AccountState = { loaded: true, signedIn: data.signedIn, email: data.email ?? null, access: data.access ?? null, billing: data.billing };
  useAccount.setState(state);
  return state;
}

/** The account as far as the page knows it – asks the server only if someone may be signed in. */
export async function currentAccount(): Promise<AccountState> {
  const state = useAccount.getState();
  if (state.loaded) return state;
  if (!maybeSignedIn()) {
    const anonymous = { ...state, loaded: true, signedIn: false };
    useAccount.setState(anonymous);
    return anonymous;
  }
  return loadAccount();
}

export async function signOut() {
  await api("/api/account", { method: "DELETE" });
  useAccount.setState({ loaded: true, signedIn: false, email: null, access: null });
}

export const requestLoginCode = (email: string, locale: Locale) => api<{ sent: boolean }>("/api/auth/request", { body: { email, locale } });

export async function verifyLoginCode(code: string, locale: Locale) {
  await api("/api/auth/verify", { body: { code, locale } });
  return loadAccount();
}

export async function openBillingPortal(locale: Locale, returnPath: string) {
  const { url } = await api<{ url: string }>("/api/account/portal", { body: { locale, returnPath } });
  window.location.assign(url);
}
