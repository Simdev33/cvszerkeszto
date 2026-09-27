"use client";

import { Eye, PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/toaster";
import { sampleResume } from "@/lib/resume/defaults";
import type { TemplateId } from "@/lib/resume/types";
import { useEditor } from "@/lib/store";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { DesignPanel, TEMPLATES } from "./design-panel";
import { OrderPanel } from "./order-panel";
import { PersonalPanel, SummaryPanel } from "./personal-panel";
import { Preview } from "./preview";
import { ScoreCard } from "./score-card";
import { AddSectionMenu, SectionPanel } from "./section-panels";
import { downloadPdf, TopBar } from "./top-bar";

export function EditorApp() {
  const sections = useEditor((state) => state.resume.sections);
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  // Links from the landing page: ?minta (load the example) and ?sablon=<id>.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.size) return;
    const { resume, replaceResume, setDesign } = useEditor.getState();
    if (params.has("minta") && !resume.basics.firstName && !resume.basics.lastName) replaceResume(sampleResume());
    const template = params.get("sablon");
    if (template && TEMPLATES.some((item) => item.id === template)) setDesign({ template: template as TemplateId });
    window.history.replaceState(null, "", "/szerkeszto");
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        downloadPdf().catch(() => toast("A PDF elkészítése nem sikerült.", "error"));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
            <p className="px-2 pt-2 text-center text-xs leading-relaxed text-fg-subtle">
              Az adataid csak ebben a böngészőben tárolódnak. Másik gépen a „Fájl → Mentés fájlba” funkcióval folytathatod.
            </p>
          </div>
        </main>
        <Preview className={cn("flex-1 lg:flex", tab === "preview" ? "flex" : "hidden")} />
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-1 border-t border-border bg-surface/95 p-2 backdrop-blur lg:hidden" aria-label="Nézet">
        {(
          [
            ["edit", "Szerkesztés", <PencilLine key="e" className="size-4" />],
            ["preview", "Előnézet", <Eye key="p" className="size-4" />],
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
      <Toaster />
    </div>
  );
}
