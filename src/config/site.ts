/**
 * Site and operator details. The Terms and the Privacy Policy take them from
 * here in every language.
 */
export const SITE = {
  name: "GetProCV",
  domain: "getprocv.com",
  operator: {
    name: "TourCierge s. r. o.",
    address: "Karpatské námestie 10A, 831 06 Bratislava – mestská časť Rača, Slovenská republika",
    /** Not provided yet – while empty, the legal pages show a "to be completed" marker. */
    email: "",
    registry: "IČO 57383898 · Obchodný register Mestského súdu Bratislava III, oddiel Sro, vložka č. 194953/B",
    taxNumber: "DIČ 2122693199",
  },
  hosting: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
    website: "https://vercel.com",
  },
  ai: {
    name: "Google LLC",
    address: "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
    terms: "https://ai.google.dev/gemini-api/terms",
  },
  payments: {
    name: "Stripe Payments Europe, Ltd.",
    address: "1 Grand Canal Street Lower, Grand Canal Dock, Dublin, D02 H210, Ireland",
    privacy: "https://stripe.com/privacy",
  },
  email: {
    name: "Resend, Inc.",
    website: "https://resend.com",
  },
  /** Supervisory authority of the operator's registered office. */
  authority: {
    name: "Úrad na ochranu osobných údajov Slovenskej republiky",
    address: "Hraničná 12, 820 07 Bratislava 27",
    website: "https://dataprotection.gov.sk",
  },
  /** Alternative dispute resolution for consumers. */
  adr: {
    name: "Slovenská obchodná inšpekcia",
    website: "https://www.soi.sk",
  },
  /** Date from which the current Terms and Privacy Policy apply (YYYY-MM-DD). */
  legalEffectiveDate: "2026-10-01",
} as const;

export type SiteInfo = typeof SITE;

/**
 * The public origin for links that leave the page (canonical, Open Graph,
 * Stripe return and portal links): NEXT_PUBLIC_SITE_URL if set, the real
 * domain in Vercel production, the deployment URL in previews.
 */
export function siteOrigin() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_ENV === "production") return `https://${SITE.domain}`;
  const vercel = process.env.VERCEL_ENV === "preview" ? process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL : process.env.VERCEL_URL;
  return vercel ? `https://${vercel}` : "http://localhost:3245";
}
