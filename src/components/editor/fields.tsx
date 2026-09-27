"use client";

import { useId, useLayoutEffect, useRef, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-lg bg-surface px-3 text-sm ring-1 ring-border-strong/70 outline-none ring-inset transition-shadow placeholder:text-fg-subtle focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50";

export function Label({ children, htmlFor, hint, action }: { children: ReactNode; htmlFor?: string; hint?: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-1.5 flex items-baseline justify-between gap-2">
      <label htmlFor={htmlFor} className="text-xs font-medium text-fg-muted">
        {children}
      </label>
      {(hint || action) && (
        <span className="flex min-w-0 items-baseline gap-2">
          {hint && <span className={cn("truncate text-[11px] text-fg-subtle tabular-nums", action && "max-sm:hidden")}>{hint}</span>}
          {action}
        </span>
      )}
    </div>
  );
}

export function TextField({
  label,
  hint,
  className,
  ...props
}: { label: ReactNode; hint?: ReactNode; className?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div className={className}>
      <Label htmlFor={id} hint={hint}>
        {label}
      </Label>
      <input id={id} {...props} className={cn(inputClass, "h-9")} />
    </div>
  );
}

/** Textarea that grows with its content. */
export function TextArea({
  label,
  hint,
  action,
  className,
  minRows = 3,
  ...props
}: { label: ReactNode; hint?: ReactNode; action?: ReactNode; className?: string; minRows?: number } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight + 2}px`;
  }, [props.value]);
  return (
    <div className={className}>
      <Label htmlFor={id} hint={hint} action={action}>
        {label}
      </Label>
      <textarea id={id} ref={ref} rows={minRows} {...props} className={cn(inputClass, "resize-none py-2 leading-relaxed")} />
    </div>
  );
}

const MONTHS = ["jan.", "febr.", "márc.", "ápr.", "máj.", "jún.", "júl.", "aug.", "szept.", "okt.", "nov.", "dec."];

/** Month + year picker producing "YYYY-MM", "YYYY" or "". */
export function MonthField({ label, value, onChange, disabled }: { label: ReactNode; value: string; onChange: (value: string) => void; disabled?: boolean }) {
  const id = useId();
  const [year = "", month = ""] = value.split("-");
  const update = (nextYear: string, nextMonth: string) => {
    const cleanYear = nextYear.replace(/\D/g, "").slice(0, 4);
    if (!cleanYear) return onChange("");
    onChange(nextMonth ? `${cleanYear}-${nextMonth}` : cleanYear);
  };
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-1.5">
        <select
          aria-label="Hónap"
          value={month}
          disabled={disabled}
          onChange={(event) => update(year || String(new Date().getFullYear()), event.target.value)}
          className={cn(inputClass, "h-9 w-[5.5rem] shrink-0 appearance-none px-2.5")}
        >
          <option value="">hónap</option>
          {MONTHS.map((name, index) => (
            <option key={name} value={String(index + 1).padStart(2, "0")}>
              {name}
            </option>
          ))}
        </select>
        <input
          id={id}
          inputMode="numeric"
          placeholder="év"
          value={year}
          disabled={disabled}
          maxLength={4}
          onChange={(event) => update(event.target.value, month)}
          className={cn(inputClass, "h-9 min-w-0 flex-1 tabular-nums")}
        />
      </div>
    </div>
  );
}

export function Checkbox({ label, checked, onChange }: { label: ReactNode; checked: boolean; onChange: (checked: boolean) => void }) {
  const id = useId();
  return (
    <label htmlFor={id} className="inline-flex items-center gap-2 text-[13px] text-fg-muted select-none">
      <input id={id} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="size-4 accent-primary" />
      {label}
    </label>
  );
}
