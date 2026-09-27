"use client";

import { CloudCheck, Download, FilePlus2, FileDown, FileUp, MoreHorizontal, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { Logo } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/controls";
import { downloadBlob, fileBaseName } from "@/lib/files";
import { emptyResume, sampleResume } from "@/lib/resume/defaults";
import { exportResume, normalizeResume } from "@/lib/resume/normalize";
import { useEditor } from "@/lib/store";
import { toast } from "@/lib/toast";

const hasContent = () => {
  const { basics, sections } = useEditor.getState().resume;
  return (
    !!(basics.firstName || basics.lastName || basics.summary || basics.email) ||
    sections.some((section) =>
      "entries" in section ? section.entries.length > 0 : section.type === "skills" ? section.skills.length > 0 : section.type === "languages" ? section.languages.length > 0 : section.tags.length > 0,
    )
  );
};

type MenuAction = "sample" | "new" | "export" | "import";

const MENU: { id: MenuAction; icon: ReactNode; label: string }[] = [
  { id: "sample", icon: <Sparkles />, label: "Mintaadatok betöltése" },
  { id: "new", icon: <FilePlus2 />, label: "Új, üres önéletrajz" },
  { id: "export", icon: <FileDown />, label: "Mentés fájlba (.json)" },
  { id: "import", icon: <FileUp />, label: "Betöltés fájlból (.json)" },
];

export async function downloadPdf() {
  const resume = useEditor.getState().resume;
  const { renderResumePdf } = await import("@/lib/pdf/render");
  const blob = await renderResumePdf(resume);
  downloadBlob(blob, `${fileBaseName(resume)}.pdf`);
}

export function TopBar() {
  const replaceResume = useEditor((state) => state.replaceResume);
  const [downloading, setDownloading] = useState(false);
  const menu = useRef<HTMLDetailsElement>(null);
  const importInput = useRef<HTMLInputElement>(null);

  const confirmReplace = (message: string) => !hasContent() || window.confirm(message);

  const onDownload = async () => {
    setDownloading(true);
    try {
      await downloadPdf();
      toast("Az önéletrajz PDF-ben letöltve.", "success");
    } catch (error) {
      console.error(error);
      toast("A PDF elkészítése nem sikerült. Próbáld újra.", "error");
    } finally {
      setDownloading(false);
    }
  };

  const runAction = (id: MenuAction) => {
    if (menu.current) menu.current.open = false;
    switch (id) {
      case "sample":
        if (confirmReplace("A mintaadatok felülírják a jelenlegi önéletrajzodat. Folytatod?")) replaceResume(sampleResume());
        break;
      case "new":
        if (confirmReplace("Biztosan törlöd a jelenlegi önéletrajzot és újat kezdesz?")) replaceResume(emptyResume());
        break;
      case "export": {
        const resume = useEditor.getState().resume;
        downloadBlob(new Blob([exportResume(resume)], { type: "application/json" }), `${fileBaseName(resume)}.json`);
        toast("Mentés kész – ezzel a fájllal később bárhol folytathatod.", "success");
        break;
      }
      case "import":
        importInput.current?.click();
        break;
    }
  };

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-surface px-4">
      <Link href="/" className="shrink-0 rounded-lg" aria-label="Kezdőlap">
        <Logo />
      </Link>
      <span className="hidden items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-xs font-medium text-success md:inline-flex" title="Minden változás automatikusan mentődik ebben a böngészőben.">
        <CloudCheck className="size-3.5" />
        Automatikusan mentve
      </span>

      <div className="ml-auto flex items-center gap-1.5">
        <details ref={menu} className="relative [&_summary::-webkit-details-marker]:hidden">
          <summary className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-fg-muted hover:bg-surface-2 hover:text-fg [&_svg]:size-4">
            <MoreHorizontal />
            <span className="hidden sm:inline">Fájl</span>
          </summary>
          <div className="absolute right-0 z-40 mt-1 w-64 rounded-xl border border-border bg-surface p-1 shadow-xl animate-pop-in">
            {MENU.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => runAction(action.id)}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] hover:bg-surface-2 [&_svg]:size-4 [&_svg]:text-fg-subtle"
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        </details>
        <ThemeToggle />
        <Button variant="primary" onClick={() => void onDownload()} disabled={downloading}>
          {downloading ? <Spinner /> : <Download />}
          <span className="hidden sm:inline">PDF letöltése</span>
          <span className="sm:hidden">PDF</span>
        </Button>
      </div>

      <input
        ref={importInput}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;
          try {
            const resume = normalizeResume(JSON.parse(await file.text()));
            if (!confirmReplace("A betöltött fájl felülírja a jelenlegi önéletrajzodat. Folytatod?")) return;
            replaceResume(resume);
            toast("Önéletrajz betöltve.", "success");
          } catch (error) {
            toast(error instanceof Error && error.message.includes("CV Stúdió") ? error.message : "Ez a fájl nem olvasható be.", "error");
          }
        }}
      />
    </header>
  );
}
