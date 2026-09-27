import { create } from "zustand";

export type ToastTone = "info" | "success" | "error";

export interface Toast {
  id: number;
  tone: ToastTone;
  message: string;
}

export const useToasts = create<{ toasts: Toast[] }>()(() => ({ toasts: [] }));

let id = 0;

export function toast(message: string, tone: ToastTone = "info") {
  const next = ++id;
  useToasts.setState((state) => ({ toasts: [...state.toasts, { id: next, tone, message }].slice(-3) }));
  setTimeout(() => dismissToast(next), tone === "error" ? 6000 : 3500);
}

export function dismissToast(target: number) {
  useToasts.setState((state) => ({ toasts: state.toasts.filter((item) => item.id !== target) }));
}
