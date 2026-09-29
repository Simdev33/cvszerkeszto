"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Thin wrapper around the native <dialog>: focus trap, Esc and top layer for free. */
export function Dialog({
  open,
  onClose,
  children,
  className,
  label,
  dismissible = true,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  label: string;
  dismissible?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onCancel={(event) => {
        event.preventDefault();
        if (dismissible) onClose();
      }}
      onClick={(event) => {
        if (dismissible && event.target === ref.current) onClose();
      }}
      className={cn(
        "m-auto w-[calc(100%-2rem)] max-w-lg overflow-visible rounded-2xl bg-transparent p-0 text-fg open:animate-pop-in",
        className,
      )}
    >
      {open && <div className="overflow-hidden rounded-2xl bg-surface shadow-2xl ring-1 ring-border">{children}</div>}
    </dialog>
  );
}
