"use client";

import { Eye, PencilLine } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/toaster";
import { useI18n } from "@/i18n/client";
import { localePath } from "@/i18n/config";
import { sampleResume } from "@/lib/resume/defaults";
import type { Resume, TemplateId } from "@/lib/resume/types";
import { useEditor } from "@/lib/store";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { DesignPanel, TEMPLATE_IDS } from "./design-panel";
import { OrderPanel } from "./order-panel";
import { PersonalPanel, SummaryPanel } from "./personal-panel";
import { Preview } from "./preview";
import { ScoreCard } from "./score-card";
import { AddSectionMenu, SectionPanel } from "./section-panels";
import { downloadPdf, TopBar } from "./top-bar";

/** Nothing typed in yet – safe to switch the CV language to the editor's language. */
const isBlank = ({ basics, sections }: Resume) =>
  !basics.firstName && !basics.lastName && !basics.headline && !basics.summary && sections.every((section) => ("entries" in section ? section.entries.length === 0 : section.type === "skills" ? section.skills.length === 0 : section.type === "languages" ? section.languages.length === 0 : section.tags.length === 0));

export function EditorApp() {
  const { t, common, locale } = useI18n();
  const sections = useEditor((state) => state.resume.sections);
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  // Links from the landing page: ?sample (load the example) and ?template=<id>; the Hungarian names still work.
  useEffect(() => {
    const { resume, replaceResume, setDesign } = useEditor.getState();
    if (isBlank(resume) && resume.design.language !== locale) setDesign({ language: locale });
    const params = new URLSearchParams(window.location.search);
    if (!params.size) return;
    if ((params.has("sample") || params.has("minta")) && isBlank(resume)) replaceResume(sampleResume(locale));
    const template = params.get("template") ?? params.get("sablon");
    if (template && TEMPLATE_IDS.includes(template as TemplateId)) setDesign({ template: template as TemplateId });
    window.history.replaceState(null, "", window.location.pathname);
  }, [locale]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        downloadPdf().catch(() => toast(t.topBar.downloadFailed, "error"));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [t]);

  return (
    <div className="flex h-dvh flex-col">
      <TopBar />
      <div className="flex min-h-0 flex-1">
        <main className={cn("scrollbar-thin w-full overflow-y-auto bg-bg lg:block lg:w-[min(600px,46vw)] lg:border-r lg:border-border", tab === "edit" ? "block" : "hidden")}>
          <div className="mx-auto max-w-2xl space-y-3 p-4 pb-24 lg:pb-8">
            <ScoreCard />
            <DesignPanel />
            <PersonalPanel />
            <SummaryPanel />
            {sections.map((section) => (
              <SectionPanel key={section.id} section={section} />
            ))}
            <AddSectionMenu />
            <OrderPanel />
            <p className="px-2 pt-2 text-center text-xs leading-relaxed text-fg-subtle">{t.storageNote}</p>
            <p className="flex justify-center gap-4 text-xs text-fg-subtle">
              <Link href={localePath(locale, "terms")} className="hover:text-fg">
                {common.terms}
              </Link>
              <Link href={localePath(locale, "privacy")} className="hover:text-fg">
                {common.privacy}
              </Link>
            </p>
          </div>
        </main>
        <Preview className={cn("flex-1 lg:flex", tab === "preview" ? "flex" : "hidden")} />
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-1 border-t border-border bg-surface/95 p-2 backdrop-blur lg:hidden" aria-label={t.tabs.label}>
        {(
          [
            ["edit", t.tabs.edit, <PencilLine key="e" className="size-4" />],
            ["preview", t.tabs.preview, <Eye key="p" className="size-4" />],
          ] as const
        ).map(([value, label, icon]) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            aria-pressed={tab === value}
            className={cn("flex h-10 items-center justify-center gap-2 rounded-lg text-sm font-medium", tab === value ? "bg-primary-soft text-primary-soft-fg" : "text-fg-muted")}
          >
            {icon}
            {label}
          </button>
        ))}
      </nav>
      <Toaster closeLabel={common.close} />
    </div>
  );
}
