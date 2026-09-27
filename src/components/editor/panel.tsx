"use client";

import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Collapsible card used for every editor section. */
export function Panel({
  icon,
  title,
  subtitle,
  actions,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  children,
  muted,
  id,
}: {
  icon: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  muted?: boolean;
  id?: string;
}) {
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const open = controlledOpen ?? innerOpen;
  const toggle = () => {
    setInnerOpen(!open);
    onOpenChange?.(!open);
  };

  return (
    <section id={id} className={cn("scroll-mt-4 rounded-2xl border border-border bg-surface shadow-xs transition-opacity", muted && "opacity-60")}>
      <div className="flex items-center gap-3 px-4 py-3.5">
        <button type="button" onClick={toggle} aria-expanded={open} className="flex min-w-0 flex-1 items-center gap-3 text-left outline-none">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary [&_svg]:size-[18px]">{icon}</span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[15px] font-semibold tracking-tight">{title}</span>
            {subtitle && <span className="block truncate text-xs text-fg-subtle">{subtitle}</span>}
          </span>
        </button>
        {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
        <button type="button" onClick={toggle} aria-label={open ? "Összecsukás" : "Kinyitás"} className="grid size-8 shrink-0 place-items-center rounded-lg text-fg-subtle hover:bg-surface-2 hover:text-fg">
          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
        </button>
      </div>
      {open && <div className="space-y-4 border-t border-border px-4 pt-4 pb-5 animate-fade-in">{children}</div>}
    </section>
  );
}
