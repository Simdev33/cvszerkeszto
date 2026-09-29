"use client";

import { CloudCheck, Download, FilePlus2, FileDown, FileUp, MoreHorizontal, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { Logo } from "@/components/brand";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/controls";
import { useI18n } from "@/i18n/client";
import { LOCALES, localePath, type Locale } from "@/i18n/config";
import { downloadBlob, fileBaseName } from "@/lib/files";
import { emptyResume, sampleResume } from "@/lib/resume/defaults";
import { exportResume, normalizeResume, NotACvError } from "@/lib/resume/normalize";
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

const MENU: { id: MenuAction; icon: ReactNode }[] = [
  { id: "sample", icon: <Sparkles /> },
  { id: "new", icon: <FilePlus2 /> },
  { id: "export", icon: <FileDown /> },
  { id: "import", icon: <FileUp /> },
];

const EDITOR_LINKS = Object.fromEntries(LOCALES.map((locale) => [locale, localePath(locale, "editor")])) as Record<Locale, string>;

export async function downloadPdf() {
  const resume = useEditor.getState().resume;
  const { renderResumePdf } = await import("@/lib/pdf/render");
  const blob = await renderResumePdf(resume);
  downloadBlob(blob, `${fileBaseName(resume)}.pdf`);
}

export function TopBar() {
  const { t, common, locale } = useI18n();
  const replaceResume = useEditor((state) => state.replaceResume);
  const [downloading, setDownloading] = useState(false);
  const menu = useRef<HTMLDetailsElement>(null);
  const importInput = useRef<HTMLInputElement>(null);

  const confirmReplace = (message: string) => !hasContent() || window.confirm(message);

  const onDownload = async () => {
    setDownloading(true);
    try {
      await downloadPdf();
      toast(t.topBar.downloaded, "success");
    } catch (error) {
      console.error(error);
      toast(t.topBar.downloadFailed, "error");
    } finally {
      setDownloading(false);
    }
  };

  const runAction = (id: MenuAction) => {
    if (menu.current) menu.current.open = false;
    switch (id) {
      case "sample":
        if (confirmReplace(t.topBar.confirmSample)) replaceResume(sampleResume(locale));
        break;
      case "new":
        if (confirmReplace(t.topBar.confirmNew)) replaceResume(emptyResume(useEditor.getState().resume.design.language));
        break;
      case "export": {
        const resume = useEditor.getState().resume;
        downloadBlob(new Blob([exportResume(resume)], { type: "application/json" }), `${fileBaseName(resume)}.json`);
        toast(t.topBar.exported, "success");
        break;
      }
      case "import":
        importInput.current?.click();
        break;
    }
  };

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-surface px-4">
      <Link href={localePath(locale)} className="shrink-0 rounded-lg" aria-label={common.home}>
        <Logo />
      </Link>
      <span className="hidden items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-xs font-medium text-success md:inline-flex" title={t.topBar.autosavedTitle}>
        <CloudCheck className="size-3.5" />
        {t.topBar.autosaved}
      </span>

      <div className="ml-auto flex items-center gap-1.5">
        <details ref={menu} className="relative [&_summary::-webkit-details-marker]:hidden">
          <summary className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-fg-muted hover:bg-surface-2 hover:text-fg [&_svg]:size-4">
            <MoreHorizontal />
            <span className="hidden sm:inline">{t.topBar.file}</span>
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
                {t.topBar[action.id]}
              </button>
            ))}
          </div>
        </details>
        <LanguageSwitcher current={locale} links={EDITOR_LINKS} label={common.language} />
        <ThemeToggle label={common.theme} />
        <Button variant="primary" onClick={() => void onDownload()} disabled={downloading}>
          {downloading ? <Spinner /> : <Download />}
          <span className="hidden sm:inline">{t.topBar.download}</span>
          <span className="sm:hidden">{t.topBar.downloadShort}</span>
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
            if (!confirmReplace(t.topBar.confirmImport)) return;
            replaceResume(resume);
            toast(t.topBar.imported, "success");
          } catch (error) {
            toast(error instanceof NotACvError ? t.topBar.notCv : t.topBar.importFailed, "error");
          }
        }}
      />
    </header>
  );
}
