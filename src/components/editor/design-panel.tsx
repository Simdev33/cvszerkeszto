"use client";

import { Check, Palette } from "lucide-react";
import Image from "next/image";
import { Segmented, Select } from "@/components/ui/controls";
import { useI18n } from "@/i18n/client";
import { LOCALE_NAMES, LOCALES } from "@/i18n/config";
import { fmt } from "@/i18n/format";
import { FONT_FAMILIES } from "@/lib/pdf/theme";
import type { CvLanguage, Density, FontId, PageSize, PhotoShape, TemplateId } from "@/lib/resume/types";
import { useEditor } from "@/lib/store";
import { cn, isValidHex } from "@/lib/utils";
import { Label } from "./fields";
import { Panel } from "./panel";

export const TEMPLATE_IDS: TemplateId[] = ["modern", "classic", "minimal", "elegant"];

const ACCENTS = [
  { value: "#1e3a8a", name: "navy" },
  { value: "#4338ca", name: "indigo" },
  { value: "#0369a1", name: "sky" },
  { value: "#0f766e", name: "teal" },
  { value: "#166534", name: "green" },
  { value: "#7f1d1d", name: "burgundy" },
  { value: "#9a3412", name: "terracotta" },
  { value: "#6b21a8", name: "purple" },
  { value: "#9d174d", name: "mauve" },
  { value: "#1f2937", name: "graphite" },
] as const;

export function DesignPanel() {
  const { t: { design: t }, locale } = useI18n();
  const design = useEditor((state) => state.resume.design);
  const setDesign = useEditor((state) => state.setDesign);

  return (
    <Panel icon={<Palette />} title={t.title} subtitle={`${t.templates[design.template].name} · ${FONT_FAMILIES[design.font].label}`} defaultOpen>
      <div>
        <Label>{t.template}</Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TEMPLATE_IDS.map((id) => {
            const item = { id, ...t.templates[id] };
            const active = item.id === design.template;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setDesign({ template: item.id })}
                aria-pressed={active}
                className="group text-left outline-none"
              >
                <span
                  className={cn(
                    "relative block overflow-hidden rounded-lg bg-white shadow-sm ring-1 transition-all group-focus-visible:ring-2 group-focus-visible:ring-primary",
                    active ? "ring-2 ring-primary" : "ring-border group-hover:ring-border-strong",
                  )}
                >
                  <Image src={`/templates/${locale}/${item.id}.webp`} alt={fmt(t.templateAlt, { name: item.name })} width={952} height={1347} className="h-auto w-full" />
                  {active && (
                    <span className="absolute top-1.5 right-1.5 grid size-5 place-items-center rounded-full bg-primary text-white shadow">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                  )}
                </span>
                <span className={cn("mt-1.5 block text-[13px] font-medium", active ? "text-fg" : "text-fg-muted")}>{item.name}</span>
                <span className="block text-[11px] leading-tight text-fg-subtle">{item.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label>{t.accent}</Label>
        <div className="flex flex-wrap items-center gap-2">
          {ACCENTS.map((accent) => {
            const active = accent.value.toLowerCase() === design.accent.toLowerCase();
            return (
              <button
                key={accent.value}
                type="button"
                title={t.accents[accent.name]}
                aria-label={t.accents[accent.name]}
                aria-pressed={active}
                onClick={() => setDesign({ accent: accent.value })}
                className={cn(
                  "grid size-8 place-items-center rounded-full ring-offset-2 ring-offset-surface transition-transform hover:scale-110",
                  active && "ring-2 ring-fg",
                )}
                style={{ backgroundColor: accent.value }}
              >
                {active && <Check className="size-3.5 text-white" strokeWidth={3} />}
              </button>
            );
          })}
          <label className="relative grid size-8 cursor-pointer place-items-center overflow-hidden rounded-full bg-[conic-gradient(red,yellow,lime,aqua,blue,magenta,red)] ring-offset-2 ring-offset-surface" title={t.customColor}>
            <input
              type="color"
              value={isValidHex(design.accent) ? design.accent : "#1e3a8a"}
              onChange={(event) => setDesign({ accent: event.target.value })}
              className="absolute inset-0 cursor-pointer opacity-0"
              aria-label={t.customColor}
            />
          </label>
        </div>
      </div>

      <div>
        <Label>{t.font}</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {(Object.entries(FONT_FAMILIES) as [FontId, (typeof FONT_FAMILIES)[FontId]][]).map(([id, font]) => {
            const active = id === design.font;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setDesign({ font: id })}
                aria-pressed={active}
                className={cn(
                  "rounded-lg px-3 py-2 text-left ring-1 transition-colors ring-inset",
                  active ? "bg-primary-soft ring-primary/50" : "bg-surface ring-border hover:bg-surface-2",
                )}
              >
                <span className={cn("block text-[13px] font-semibold", active && "text-primary-soft-fg")}>{font.label}</span>
                <span className="block text-[11px] text-fg-subtle">{t.fonts[id]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>{t.density}</Label>
          <Segmented<Density>
            size="sm"
            label={t.density}
            value={design.density}
            onChange={(density) => setDesign({ density })}
            options={[
              { value: "compact", label: t.densities.compact },
              { value: "normal", label: t.densities.normal },
              { value: "spacious", label: t.densities.spacious },
            ]}
          />
        </div>
        <div>
          <Label>{t.cvLanguage}</Label>
          <Select<CvLanguage>
            label={t.cvLanguage}
            value={design.language}
            onChange={(language) => setDesign({ language })}
            options={LOCALES.map((value) => ({ value, label: LOCALE_NAMES[value] }))}
          />
        </div>
        <div>
          <Label>{t.pageSize}</Label>
          <Segmented<PageSize>
            size="sm"
            label={t.pageSize}
            value={design.pageSize}
            onChange={(pageSize) => setDesign({ pageSize })}
            options={[
              { value: "A4", label: "A4" },
              { value: "LETTER", label: "US Letter" },
            ]}
          />
        </div>
        <div>
          <Label>{t.photoShape}</Label>
          <Segmented<PhotoShape>
            size="sm"
            label={t.photoShape}
            value={design.photoShape}
            onChange={(photoShape) => setDesign({ photoShape })}
            options={[
              { value: "circle", label: t.photoShapes.circle },
              { value: "rounded", label: t.photoShapes.rounded },
              { value: "square", label: t.photoShapes.square },
            ]}
          />
        </div>
      </div>
      {design.language !== locale && <p className="rounded-lg bg-surface-2 px-3 py-2 text-xs leading-relaxed text-fg-muted">{t.cvLanguageHint}</p>}
    </Panel>
  );
}
