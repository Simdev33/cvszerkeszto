import { fullName } from "@/lib/resume/format";
import type { Resume } from "@/lib/resume/types";

export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

/** "Kovács Anna" → "Kovacs_Anna" – ASCII file names survive every e-mail client and ATS. */
export function fileBaseName(resume: Resume) {
  const name = fullName(resume.basics, resume.design.language)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "_");
  const suffix = resume.design.language === "hu" ? "oneletrajz" : "CV";
  return name ? `${name}_${suffix}` : suffix;
}
