import type { COOKIES } from "@/config/cookies";
import type { SiteInfo } from "@/config/site";

/**
 * A paragraph, or a bullet list. Text may contain **bold** parts and internal
 * links like [Privacy Policy](privacy) (terms | privacy | account); URLs and
 * e-mail addresses are turned into links when rendered.
 */
export type LegalBlock = string | { list: string[] };

export interface LegalSection {
  /** Anchor for the table of contents – keep the same ids in every language. */
  id: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  title: string;
  /** One sentence for the page's meta description. */
  description: string;
  intro: string[];
  sections: LegalSection[];
}

export interface LegalDocs {
  terms: LegalDoc;
  privacy: LegalDoc;
}

export interface LegalContext {
  site: SiteInfo;
  /** The operator's e-mail address, or a "to be completed" marker in the page's language. */
  email: string;
  /** The plan, formatted for the page's language. */
  price: { trial: string; monthly: string; days: number; next: number };
  cookies: typeof COOKIES;
}

export type LegalContent = (context: LegalContext) => LegalDocs;
