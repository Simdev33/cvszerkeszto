"use client";

import { Check, RotateCcw, Square, Undo2, WandSparkles, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/controls";
import { requestAi } from "@/lib/ai/client";
import type { AiAction, AiField } from "@/lib/ai/shared";
import { useEditor } from "@/lib/store";
import { TextArea } from "./fields";

const ACTIONS: Record<Exclude<AiAction, "write">, { label: string; text: string }> = {
  improve: { label: "Szebbé tétel", text: "Helyesírás, stílus, gördülékeny megfogalmazás" },
  impact: { label: "Meggyőzőbbé tétel", text: "Erős, eredményközpontú megfogalmazás" },
  bullets: { label: "Felsorolássá alakítás", text: "Tömör, egységes pontok" },
  shorten: { label: "Tömörítés", text: "Rövidebb, lényegre törő változat" },
};

function actionLabel(action: AiAction, field: AiField, empty: boolean) {
  if (action !== "write") return ACTIONS[action].label;
  if (field === "description") return "Javaslat a tétel alapján";
  return empty ? "Megírás az önéletrajzod alapján" : "Újraírás az önéletrajzod alapján";
}

function actionText(action: AiAction, field: AiField) {
  if (action !== "write") return ACTIONS[action].text;
  return field === "description" ? "Jellemző feladatok, amiket kiegészíthetsz" : "A tapasztalataidból és készségeidből";
}

type Job = { action: AiAction; text: string; status: "streaming" | "done" | "error"; error?: string };

/**
 * A textarea with an "AI-segéd" menu: the model's suggestion streams in below
 * the field and only replaces the text when the user accepts it (with undo).
 */
export function AiTextArea({
  field,
  value,
  onValueChange,
  context,
  writeHint,
  className,
  ...props
}: {
  field: AiField;
  value: string;
  onValueChange: (value: string) => void;
  /** Background for the model; an empty string means there is nothing to write from yet. */
  context: () => string;
  /** Why "write" is unavailable while the context is empty. */
  writeHint: string;
  label: ReactNode;
  hint?: ReactNode;
  placeholder?: string;
  minRows?: number;
  className?: string;
}) {
  const language = useEditor((state) => state.resume.design.language);
  const [menu, setMenu] = useState<{ canWrite: boolean } | null>(null);
  const [job, setJob] = useState<Job | null>(null);
  const [undo, setUndo] = useState<{ before: string; after: string } | null>(null);
  const request = useRef<AbortController | null>(null);
  const menuRef = useRef<HTMLSpanElement>(null);
  const empty = !value.trim();
  const streaming = job?.status === "streaming";

  useEffect(() => {
    if (!menu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenu(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menu]);

  useEffect(() => () => request.current?.abort(), []);

  const run = async (action: AiAction) => {
    setMenu(null);
    setUndo(null);
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setJob({ action, text: "", status: "streaming" });
    try {
      const text = await requestAi(
        { field, action, language, text: value, context: context() },
        (partial) => setJob((current) => (current && request.current === controller ? { ...current, text: partial } : current)),
        controller.signal,
      );
      if (request.current === controller) setJob({ action, text, status: "done" });
    } catch (error) {
      if (controller.signal.aborted) return;
      setJob({ action, text: "", status: "error", error: error instanceof Error ? error.message : "Ismeretlen hiba történt." });
    }
  };

  const discard = () => {
    request.current?.abort();
    request.current = null;
    setJob(null);
  };

  const accept = () => {
    if (!job || job.status !== "done") return;
    setUndo({ before: value, after: job.text });
    onValueChange(job.text);
    setJob(null);
  };

  const available: AiAction[] = empty ? ["write"] : field === "summary" ? ["improve", "impact", "shorten", "write"] : ["improve", "impact", "bullets", "shorten"];

  const trigger = (
    <span ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setMenu(menu ? null : { canWrite: context().length > 0 })}
        disabled={streaming}
        aria-haspopup="menu"
        aria-expanded={menu !== null}
        className="inline-flex h-6 items-center gap-1 rounded-md px-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary-soft disabled:opacity-50"
      >
        <WandSparkles className="size-3.5" />
        AI-segéd
      </button>
      {menu && (
        <div role="menu" className="absolute top-full right-0 z-30 mt-1 w-72 origin-top-right rounded-xl bg-surface p-1.5 shadow-xl ring-1 ring-border animate-pop-in">
          {available.map((action) => {
            const blocked = action === "write" && !menu.canWrite;
            return (
              <button
                key={action}
                type="button"
                role="menuitem"
                disabled={blocked}
                onClick={() => run(action)}
                className="flex w-full flex-col items-start gap-0.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:bg-transparent"
              >
                <span className="text-[13px] font-medium text-fg">{actionLabel(action, field, empty)}</span>
                <span className="text-xs text-fg-subtle">{blocked ? writeHint : actionText(action, field)}</span>
              </button>
            );
          })}
          <p className="mt-1 border-t border-border px-2.5 pt-2 pb-1 text-[11px] leading-snug text-fg-subtle">
            A mező szövegét a Google Gemini dolgozza fel{language === "en" ? " (angol nyelvű önéletrajzhoz angolul válaszol)" : ""}. Nevet, elérhetőséget és fotót nem küldünk el.
          </p>
        </div>
      )}
    </span>
  );

  return (
    <div className={className}>
      <TextArea {...props} action={trigger} value={value} onChange={(event) => onValueChange(event.target.value)} />

      {job && (
        <div className="mt-2 rounded-xl bg-primary-soft/50 p-3 ring-1 ring-primary/20 ring-inset animate-fade-in" aria-live="polite" aria-busy={streaming}>
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-primary-soft-fg">
            {streaming ? <Spinner className="size-3.5" /> : <WandSparkles className="size-3.5" />}
            AI-javaslat · {actionLabel(job.action, field, empty)}
            <button type="button" onClick={discard} aria-label="Elvetés" className="-my-1 -mr-1 ml-auto grid size-6 place-items-center rounded-md text-fg-subtle hover:bg-surface-2 hover:text-fg">
              <X className="size-3.5" />
            </button>
          </div>
          {job.status === "error" ? (
            <p className="text-sm leading-relaxed text-danger">{job.error}</p>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap text-fg">{job.text || <span className="text-fg-subtle">Fogalmazás folyamatban…</span>}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {streaming ? (
              <Button size="sm" onClick={discard}>
                <Square />
                Leállítás
              </Button>
            ) : (
              <>
                {job.status === "done" && (
                  <Button size="sm" variant="primary" onClick={accept}>
                    <Check />
                    Csere erre
                  </Button>
                )}
                <Button size="sm" onClick={() => run(job.action)}>
                  <RotateCcw />
                  Újra
                </Button>
                <Button size="sm" variant="ghost" onClick={discard}>
                  {job.status === "done" ? "Elvetés" : "Bezárás"}
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {!job && undo && value === undo.after && (
        <div className="mt-2 flex items-center gap-2 rounded-lg bg-success-soft px-3 py-1.5 text-xs text-success animate-fade-in" role="status">
          <Check className="size-3.5 shrink-0" />
          <span className="min-w-0 flex-1">Lecserélve az AI-javaslatra.</span>
          <button
            type="button"
            onClick={() => {
              onValueChange(undo.before);
              setUndo(null);
            }}
            className="inline-flex items-center gap-1 font-medium hover:underline"
          >
            <Undo2 className="size-3.5" />
            Visszavonás
          </button>
          <button type="button" onClick={() => setUndo(null)} aria-label="Bezárás" className="grid size-5 place-items-center rounded hover:bg-success/15">
            <X className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
