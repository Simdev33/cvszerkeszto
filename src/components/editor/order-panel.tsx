"use client";

import { ArrowDownUp, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CV_LABELS } from "@/lib/resume/i18n";
import { useEditor } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Panel } from "./panel";
import { SECTION_ICONS } from "./section-panels";
import { SortableList, SortableRow } from "./sortable";

const SIDEBAR_HINT: Record<string, string> = {
  modern: "A Modern sablonban a készségek, nyelvek és érdeklődési körök az oldalsávba kerülnek.",
  elegant: "Az Elegáns sablonban a készségek, nyelvek, tanúsítványok és érdeklődési körök az oldalsávba kerülnek.",
};

/** Section order and visibility at a glance. */
export function OrderPanel() {
  const sections = useEditor((state) => state.resume.sections);
  const template = useEditor((state) => state.resume.design.template);
  const moveSection = useEditor((state) => state.moveSection);
  const updateSection = useEditor((state) => state.updateSection);

  return (
    <Panel icon={<ArrowDownUp />} title="Szakaszok sorrendje" subtitle="Húzással rendezheted, a szemmel elrejtheted">
      <div className="space-y-1.5">
        <SortableList items={sections} onMove={moveSection}>
          {(section) => (
            <SortableRow key={section.id} id={section.id}>
              {(handle) => (
                <div className={cn("flex items-center gap-2 rounded-lg bg-surface-2/60 py-1 pr-1 pl-0.5 ring-1 ring-border ring-inset", !section.visible && "opacity-55")}>
                  {handle}
                  <span className="text-primary [&_svg]:size-4">{SECTION_ICONS[section.type]}</span>
                  <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{section.title.trim() || CV_LABELS.hu.sections[section.type]}</span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => updateSection(section.id, { visible: !section.visible })}
                    aria-label={section.visible ? "Elrejtés" : "Megjelenítés"}
                  >
                    {section.visible ? <Eye /> : <EyeOff />}
                  </Button>
                </div>
              )}
            </SortableRow>
          )}
        </SortableList>
      </div>
      {SIDEBAR_HINT[template] && <p className="text-xs leading-relaxed text-fg-subtle">{SIDEBAR_HINT[template]}</p>}
    </Panel>
  );
}
