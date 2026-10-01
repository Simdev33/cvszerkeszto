/** Cookie names – shared by the server, the browser and the Privacy Policy. */
export const COOKIES = {
  /** Signed, httpOnly: which Stripe customer is signed in (180 days). */
  session: "gp_session",
  /** Readable by scripts: tells the page to ask /api/account (180 days). */
  signedIn: "gp_signed_in",
  /** Signed, httpOnly: the e-mail code sign-in in progress (10 minutes). */
  login: "gp_login",
  /** The language picked in the language switcher (1 year). */
  locale: "NEXT_LOCALE",
} as const;
