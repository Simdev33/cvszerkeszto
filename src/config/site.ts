/**
 * Operator and legal details used by the Terms and the Privacy Policy in every
 * language. Fill in the bracketed values before going live.
 */
export const SITE = {
  name: "CV Stúdió",
  operator: {
    name: "[ÜZEMELTETŐ NEVE / CÉGNÉV]",
    address: "[SZÉKHELY / CÍM]",
    email: "[KAPCSOLATI E-MAIL-CÍM]",
    registry: "[CÉGJEGYZÉKSZÁM / NYILVÁNTARTÁSI SZÁM]",
    taxNumber: "[ADÓSZÁM]",
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
    privacy: "https://policies.google.com/privacy",
  },
  /** Supervisory authority for data protection complaints (the operator is based in Hungary). */
  authority: {
    name: "Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)",
    address: "1055 Budapest, Falk Miksa utca 9–11.",
    email: "ugyfelszolgalat@naih.hu",
    website: "https://www.naih.hu",
  },
  /** Date from which the current Terms and Privacy Policy apply (YYYY-MM-DD). */
  legalEffectiveDate: "2026-09-29",
} as const;

export type SiteInfo = typeof SITE;
