/**
 * Browser entry point for PDF generation. Imported lazily, so react-pdf and
 * the templates never weigh down the landing page.
 */
import { pdf } from "@react-pdf/renderer";
import type { Resume } from "@/lib/resume/types";
import { ResumeDocument } from "./document";
import { registerFonts, resetGlyphCaches } from "./theme";

export async function renderResumePdf(resume: Resume): Promise<Blob> {
  registerFonts((file) => new URL(`/fonts/${file}`, window.location.origin).href);
  resetGlyphCaches();
  return pdf(<ResumeDocument resume={resume} />).toBlob();
}

export { documentTitle } from "./document";
