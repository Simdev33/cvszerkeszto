"use client";

import { ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useI18n } from "@/i18n/client";
import { clamp, cn } from "@/lib/utils";

const VIEW = 272;
const OUTPUT = 640;

interface Loaded {
  image: HTMLImageElement;
  url: string;
}

/** Square crop with drag-to-position and zoom; returns a JPEG data URL. */
export function PhotoDialog({
  file,
  shape,
  onCancel,
  onSave,
}: {
  file: File | null;
  shape: "circle" | "rounded" | "square";
  onCancel: () => void;
  onSave: (dataUrl: string) => void;
}) {
  const { t: { photo: t } } = useI18n();
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [error, setError] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; start: { x: number; y: number } } | null>(null);

  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image
      .decode()
      .then(() => {
        if (cancelled) return;
        setLoaded({ image, url });
        setZoom(1);
        setOffset({ x: 0, y: 0 });
        setError(false);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const image = loaded?.image;
  const base = image ? VIEW / Math.min(image.naturalWidth, image.naturalHeight) : 1;
  const width = image ? image.naturalWidth * base * zoom : VIEW;
  const height = image ? image.naturalHeight * base * zoom : VIEW;
  const limit = (value: number, size: number) => clamp(value, -(size - VIEW) / 2, (size - VIEW) / 2);
  const x = limit(offset.x, width);
  const y = limit(offset.y, height);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, start: { x, y } };
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current) return;
    setOffset({ x: current.start.x + event.clientX - current.x, y: current.start.y + event.clientY - current.y });
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  const save = () => {
    if (!image) return;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = OUTPUT;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, OUTPUT, OUTPUT);
    ctx.imageSmoothingQuality = "high";
    const k = OUTPUT / VIEW;
    ctx.drawImage(image, ((VIEW - width) / 2 + x) * k, ((VIEW - height) / 2 + y) * k, width * k, height * k);
    onSave(canvas.toDataURL("image/jpeg", 0.88));
  };

  return (
    <Dialog open={file !== null} onClose={onCancel} label={t.title} className="max-w-md">
      <div className="p-6">
        <h2 className="text-lg font-semibold tracking-tight">{t.title}</h2>
        <p className="mt-1 text-sm text-fg-muted">{t.text}</p>

        <div className="mt-5 flex justify-center">
          <div
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="relative cursor-grab touch-none overflow-hidden bg-surface-2 select-none active:cursor-grabbing"
            style={{ width: VIEW, height: VIEW, borderRadius: 12 }}
          >
            {loaded && (
              // eslint-disable-next-line @next/next/no-img-element -- local object URL
              <img
                src={loaded.url}
                alt=""
                draggable={false}
                className="absolute top-1/2 left-1/2 max-w-none"
                style={{ width, height, transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
              />
            )}
            <div
              className={cn("pointer-events-none absolute inset-0 shadow-[0_0_0_999px_rgb(0_0_0/0.45)] ring-2 ring-white/90", shape === "circle" ? "rounded-full" : shape === "rounded" ? "rounded-[14%]" : "rounded-none")}
            />
            {error && <p className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-danger">{t.unsupported}</p>}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <ZoomOut className="size-4 text-fg-subtle" />
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
            aria-label={t.zoom}
            className="flex-1 accent-primary"
            disabled={!loaded}
          />
          <ZoomIn className="size-4 text-fg-subtle" />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>
            {t.cancel}
          </Button>
          <Button variant="primary" onClick={save} disabled={!loaded}>
            {t.save}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
