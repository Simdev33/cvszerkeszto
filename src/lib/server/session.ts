/**
 * Signed, httpOnly cookies instead of a user database: the session names the
 * Stripe customer, and Stripe always decides about the subscription.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { COOKIES } from "@/config/cookies";

const SESSION_DAYS = 180;

export interface Session {
  customer: string;
  email: string;
}

export interface PendingLogin {
  customer: string | null;
  email: string;
  exp: number;
}

function secret() {
  const value = process.env.SESSION_SECRET;
  if (value && value.length >= 16) return value;
  if (process.env.NODE_ENV === "production") throw new Error("SESSION_SECRET is not set");
  return "development-only-session-secret";
}

const mac = (body: string) => createHmac("sha256", secret()).update(body).digest("base64url");

export function sign(payload: object) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${mac(body)}`;
}

export function unsign<T>(token: string | undefined): T | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = Buffer.from(mac(body));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}

/** Keyed hash for values we never store in plain form (sign-in codes). */
export function keyedHash(value: string) {
  return createHmac("sha256", secret()).update(`code:${value}`).digest("hex");
}

const base = { path: "/", sameSite: "lax" as const, secure: process.env.NODE_ENV === "production" };

export async function getSession(): Promise<Session | null> {
  const session = unsign<Session>((await cookies()).get(COOKIES.session)?.value);
  return session?.customer && session.email ? session : null;
}

export async function setSession(session: Session) {
  const store = await cookies();
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  store.set(COOKIES.session, sign(session), { ...base, httpOnly: true, maxAge });
  store.set(COOKIES.signedIn, "1", { ...base, httpOnly: false, maxAge });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(COOKIES.session);
  store.delete(COOKIES.signedIn);
}

export async function getPendingLogin(): Promise<PendingLogin | null> {
  const pending = unsign<PendingLogin>((await cookies()).get(COOKIES.login)?.value);
  return pending && pending.exp > Date.now() ? pending : null;
}

export async function setPendingLogin(pending: PendingLogin) {
  (await cookies()).set(COOKIES.login, sign(pending), { ...base, httpOnly: true, maxAge: Math.ceil((pending.exp - Date.now()) / 1000) });
}

export async function clearPendingLogin() {
  (await cookies()).delete(COOKIES.login);
}
