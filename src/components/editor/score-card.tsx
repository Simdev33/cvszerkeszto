"use client";

import { ChevronDown, Lightbulb } from "lucide-react";
import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/client";
import { scoreResume } from "@/lib/resume/score";
import { useEditor } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ScoreCard() {
  const { t, plural } = useI18n();
  const resume = useEditor((state) => state.resume);
  const { score, tips } = useMemo(() => scoreResume(resume), [resume]);
  const [open, setOpen] = useState(false);
  const color = score >= 80 ? "var(--success)" : score >= 50 ? "var(--warning)" : "var(--danger)";
  const label = score >= 80 ? t.score.excellent : score >= 50 ? t.score.good : t.score.weak;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  return (
    <section className="rounded-2xl border border-border bg-surface p-4 shadow-xs">
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 48 48" className="size-14 shrink-0 -rotate-90" aria-hidden>
          <circle cx="24" cy="24" r={radius} fill="none" stroke="var(--surface-3)" strokeWidth="5" />
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - score / 100)}
            className="transition-[stroke-dashoffset] duration-500"
          />
        </svg>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-fg-subtle">{t.score.title}</p>
          <p className="text-lg font-semibold tracking-tight tabular-nums">
            {score}% <span className="text-sm font-medium" style={{ color }}>· {label}</span>
          </p>
          {tips[0] && <p className="truncate text-xs text-fg-muted">{t.score.tips[tips[0].id]}</p>}
        </div>
        {tips.length > 0 && (
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-primary hover:bg-primary-soft"
            aria-expanded={open}
          >
            {plural(t.score.tipCount, tips.length)}
            <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
          </button>
        )}
      </div>
      {open && (
        <ul className="mt-4 space-y-2 border-t border-border pt-3 animate-fade-in">
          {tips.map((tip) => (
            <li key={tip.id} className="flex gap-2.5 text-[13px] leading-relaxed text-fg-muted">
              <Lightbulb className="mt-0.5 size-3.5 shrink-0 text-warning" />
              <span className="flex-1">{t.score.tips[tip.id]}</span>
              <span className="shrink-0 text-xs text-fg-subtle tabular-nums">+{tip.points}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
