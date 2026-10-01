"use client";

import { create } from "zustand";
import { currentAccount, loadAccount, maybeSignedIn } from "@/lib/account";
import { downloadBlob, fileBaseName } from "@/lib/files";
import type { Resume } from "@/lib/resume/types";
import { useEditor } from "@/lib/store";

/** The CV as a PDF, made in the browser. */
export async function buildPdf(resume: Resume = useEditor.getState().resume) {
  const { renderResumePdf } = await import("@/lib/pdf/render");
  return renderResumePdf(resume);
}

export async function savePdf(blob?: Blob) {
  const resume = useEditor.getState().resume;
  downloadBlob(blob ?? (await buildPdf(resume)), `${fileBaseName(resume)}.pdf`);
}

/** The payment screen shown instead of the download without a subscription. */
export const usePaywall = create<{ open: boolean; error: string | null }>(() => ({ open: false, error: null }));

/**
 * The download button: subscribers get the PDF straight away, everyone else
 * the payment screen. (The check runs in the browser, like the PDF itself.)
 */
export async function requestDownload(): Promise<"downloaded" | "paywall"> {
  const account = await (maybeSignedIn() ? loadAccount() : currentAccount()).catch(() => null);
  if (account?.access?.active) {
    await savePdf();
    return "downloaded";
  }
  usePaywall.setState({ open: true, error: null });
  return "paywall";
}
