"use client";

import { FileWarning, Minus, Plus } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/controls";
import type { PreviewPage } from "@/lib/preview";
import type { Resume } from "@/lib/resume/types";
import { useEditor } from "@/lib/store";
import { cn } from "@/lib/utils";

const ZOOMS = [0.6, 0.8, 1, 1.25, 1.5];

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width / 40) * 40));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

interface Rendered {
  pages: PreviewPage[];
  resume: Resume | null;
  width: number;
  error: string | null;
}

/** Live preview: renders the real PDF and shows its pages. */
export function Preview({ className }: { className?: string }) {
  const resume = useEditor((state) => state.resume);
  const setDesign = useEditor((state) => state.setDesign);
  const [debounced, setDebounced] = useState(resume);
  const [zoom, setZoom] = useState(1);
  const [ref, containerWidth] = useWidth<HTMLDivElement>();
  const [rendered, setRendered] = useState<Rendered>({ pages: [], resume: null, width: 0, error: null });
  const sequence = useRef(0);
  const pageWidth = Math.max(240, Math.min(containerWidth - 48, 900) * zoom);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(resume), 280);
    return () => clearTimeout(timer);
  }, [resume]);

  useEffect(() => {
    if (!containerWidth) return;
    const id = ++sequence.current;
    const target = Math.min(2200, Math.round(pageWidth * Math.min(window.devicePixelRatio || 1, 2)));
    (async () => {
      const [{ renderResumePdf }, { renderPreview }] = await Promise.all([import("@/lib/pdf/render"), import("@/lib/preview")]);
      const blob = await renderResumePdf(debounced);
      if (id !== sequence.current) return;
      const pages = await renderPreview(new Uint8Array(await blob.arrayBuffer()), target);
      if (id !== sequence.current) {
        pages.forEach((page) => URL.revokeObjectURL(page.url));
        return;
      }
      setRendered((previous) => {
        previous.pages.forEach((page) => URL.revokeObjectURL(page.url));
        return { pages, resume: debounced, width: pageWidth, error: null };
      });
    })().catch((error: unknown) => {
      console.error(error);
      if (id === sequence.current) {
        setRendered((previous) => ({ ...previous, resume: debounced, error: "Az előnézet nem készült el. Próbáld újra, vagy válassz másik betűtípust." }));
      }
    });
  }, [debounced, containerWidth, pageWidth]);

  useEffect(() => () => rendered.pages.forEach((page) => URL.revokeObjectURL(page.url)), [rendered.pages]);

  const busy = rendered.resume !== resume || rendered.width !== pageWidth;
  const pageCount = rendered.pages.length;
  const zoomIndex = ZOOMS.indexOf(zoom);

  return (
    <div className={cn("flex min-h-0 flex-col bg-canvas", className)}>
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-surface/85 px-4 backdrop-blur">
        <p className="text-[13px] font-medium">Előnézet</p>
        <span className="text-xs text-fg-subtle tabular-nums">{pageCount ? `${pageCount} oldal` : ""}</span>
        {busy && (
          <span className="flex items-center gap-1.5 text-xs text-fg-subtle">
            <Spinner className="size-3" /> frissítés…
          </span>
        )}
        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" onClick={() => setZoom(ZOOMS[Math.max(0, zoomIndex - 1)])} disabled={zoomIndex === 0} aria-label="Kicsinyítés">
            <Minus />
          </Button>
          <button type="button" onClick={() => setZoom(1)} className="w-12 text-center text-xs text-fg-muted tabular-nums hover:text-fg" title="Laphoz igazítás">
            {Math.round(zoom * 100)}%
          </button>
          <Button variant="ghost" size="icon-sm" onClick={() => setZoom(ZOOMS[Math.min(ZOOMS.length - 1, zoomIndex + 1)])} disabled={zoomIndex === ZOOMS.length - 1} aria-label="Nagyítás">
            <Plus />
          </Button>
        </div>
      </div>

      {pageCount > 1 && resume.design.density !== "compact" && (
        <div className="flex items-center justify-between gap-3 border-b border-border bg-warning-soft px-4 py-2 text-xs text-warning">
          <span>Az önéletrajzod {pageCount} oldalas. Egy oldal általában jobb benyomást kelt.</span>
          <button type="button" className="shrink-0 font-semibold underline-offset-2 hover:underline" onClick={() => setDesign({ density: "compact" })}>
            Kompakt méret
          </button>
        </div>
      )}

      <div ref={ref} className="scrollbar-thin min-h-0 flex-1 overflow-auto">
        <div className="mx-auto flex flex-col items-center gap-5 p-6" style={{ width: pageWidth + 48 }}>
          {rendered.error && (
            <div className="flex items-start gap-2 rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger">
              <FileWarning className="mt-0.5 size-4 shrink-0" />
              {rendered.error}
            </div>
          )}
          {pageCount === 0 && !rendered.error && (
            <div className="grid w-full place-items-center rounded-sm bg-white shadow-page" style={{ aspectRatio: "1 / 1.4142" }}>
              <Spinner className="size-6 text-neutral-400" />
            </div>
          )}
          {rendered.pages.map((page, index) => (
            // eslint-disable-next-line @next/next/no-img-element -- rendered locally from the generated PDF
            <img
              key={page.url}
              src={page.url}
              alt={`${index + 1}. oldal`}
              className={cn("w-full rounded-[2px] bg-white shadow-page transition-opacity", busy && "opacity-80")}
              style={{ aspectRatio: `${page.width} / ${page.height}` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
