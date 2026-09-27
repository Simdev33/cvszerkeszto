import type { Metadata } from "next";
import { EditorShell } from "@/components/editor/editor-shell";

export const metadata: Metadata = {
  title: "Szerkesztő",
  description: "Önéletrajz szerkesztése élő PDF-előnézettel.",
  robots: { index: false },
};

export default function EditorPage() {
  return <EditorShell />;
}
