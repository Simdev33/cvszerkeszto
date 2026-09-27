"use client";

import { Check, Palette } from "lucide-react";
import Image from "next/image";
import { Segmented } from "@/components/ui/controls";
import { FONT_FAMILIES } from "@/lib/pdf/theme";
import type { Density, FontId, PageSize, PhotoShape, TemplateId } from "@/lib/resume/types";
import { useEditor } from "@/lib/store";
import { cn, isValidHex } from "@/lib/utils";
import { Label } from "./fields";
import { Panel } from "./panel";

export const TEMPLATES: { id: TemplateId; name: string; description: string }[] = [
  { id: "modern", name: "Modern", description: "Színes oldalsáv, két hasáb" },
  { id: "classic", name: "Klasszikus", description: "Hagyományos, egyhasábos" },
  { id: "minimal", name: "Minimál", description: "Letisztult, idővonalas" },
  { id: "elegant", name: "Elegáns", description: "Színes fejléc, oldalsáv" },
];

const ACCENTS = [
  { value: "#1e3a8a", name: "Sötétkék" },
  { value: "#4338ca", name: "Indigó" },
  { value: "#0369a1", name: "Égkék" },
  { value: "#0f766e", name: "Petrol" },
  { value: "#166534", name: "Zöld" },
  { value: "#7f1d1d", name: "Bordó" },
  { value: "#9a3412", name: "Terrakotta" },
  { value: "#6b21a8", name: "Lila" },
  { value: "#9d174d", name: "Mályva" },
  { value: "#1f2937", name: "Grafit" },
];

export function DesignPanel() {
  const design = useEditor((state) => state.resume.design);
  const setDesign = useEditor((state) => state.setDesign);
  const template = TEMPLATES.find((item) => item.id === design.template);

  return (
    <Panel icon={<Palette />} title="Sablon és megjelenés" subtitle={`${template?.name} · ${FONT_FAMILIES[design.font].label}`} defaultOpen>
      <div>
        <Label>Sablon</Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TEMPLATES.map((item) => {
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
                  <Image src={`/templates/${item.id}.webp`} alt={`${item.name} sablon`} width={952} height={1347} className="h-auto w-full" />
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
        <Label>Kiemelő szín</Label>
        <div className="flex flex-wrap items-center gap-2">
          {ACCENTS.map((accent) => {
            const active = accent.value.toLowerCase() === design.accent.toLowerCase();
            return (
              <button
                key={accent.value}
                type="button"
                title={accent.name}
                aria-label={accent.name}
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
          <label className="relative grid size-8 cursor-pointer place-items-center overflow-hidden rounded-full bg-[conic-gradient(red,yellow,lime,aqua,blue,magenta,red)] ring-offset-2 ring-offset-surface" title="Egyéni szín">
            <input
              type="color"
              value={isValidHex(design.accent) ? design.accent : "#1e3a8a"}
              onChange={(event) => setDesign({ accent: event.target.value })}
              className="absolute inset-0 cursor-pointer opacity-0"
              aria-label="Egyéni szín"
            />
          </label>
        </div>
      </div>

      <div>
        <Label>Betűtípus</Label>
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
                <span className="block text-[11px] text-fg-subtle">{font.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Méret és térköz</Label>
          <Segmented<Density>
            size="sm"
            label="Méret és térköz"
            value={design.density}
            onChange={(density) => setDesign({ density })}
            options={[
              { value: "compact", label: "Kompakt" },
              { value: "normal", label: "Normál" },
              { value: "spacious", label: "Tágas" },
            ]}
          />
        </div>
        <div>
          <Label>Önéletrajz nyelve</Label>
          <Segmented<"hu" | "en">
            size="sm"
            label="Önéletrajz nyelve"
            value={design.language}
            onChange={(language) => setDesign({ language })}
            options={[
              { value: "hu", label: "Magyar" },
              { value: "en", label: "English" },
            ]}
          />
        </div>
        <div>
          <Label>Papírméret</Label>
          <Segmented<PageSize>
            size="sm"
            label="Papírméret"
            value={design.pageSize}
            onChange={(pageSize) => setDesign({ pageSize })}
            options={[
              { value: "A4", label: "A4" },
              { value: "LETTER", label: "US Letter" },
            ]}
          />
        </div>
        <div>
          <Label>Fotó alakja</Label>
          <Segmented<PhotoShape>
            size="sm"
            label="Fotó alakja"
            value={design.photoShape}
            onChange={(photoShape) => setDesign({ photoShape })}
            options={[
              { value: "circle", label: "Kör" },
              { value: "rounded", label: "Lekerekített" },
              { value: "square", label: "Szögletes" },
            ]}
          />
        </div>
      </div>
      {design.language === "en" && (
        <p className="rounded-lg bg-surface-2 px-3 py-2 text-xs leading-relaxed text-fg-muted">
          Angol nyelvű önéletrajznál a címsorok, a dátumok és a névsorrend (keresztnév elöl) automatikusan angolra vált – a tartalmat neked kell angolul megírnod.
        </p>
      )}
    </Panel>
  );
}
