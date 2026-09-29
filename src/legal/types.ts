import type { SiteInfo } from "@/config/site";

/**
 * A paragraph, or a bullet list. Text may contain **bold** parts; URLs and
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

export type LegalContent = (site: SiteInfo, cookieName: string) => LegalDocs;
