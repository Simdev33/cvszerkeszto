import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let counter = 0;

/** Short unique id for list items. */
export function uid() {
  counter = (counter + 1) % 1296;
  return `${Date.now().toString(36)}${counter.toString(36).padStart(2, "0")}${Math.random().toString(36).slice(2, 6)}`;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** "#1e40af" → [30, 64, 175]; invalid input falls back to a neutral blue. */
export function hexToRgb(hex: string): [number, number, number] {
  const match = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex.trim());
  if (!match) return [37, 99, 235];
  return [Number.parseInt(match[1], 16), Number.parseInt(match[2], 16), Number.parseInt(match[3], 16)];
}

export function rgbToHex([r, g, b]: [number, number, number]) {
  return `#${[r, g, b].map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, "0")).join("")}`;
}

/** WCAG relative luminance, 0 (black) – 1 (white). */
export function luminance(hex: string) {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Readable text colour on top of `background`. */
export function textOn(background: string) {
  return luminance(background) > 0.42 ? "#16181d" : "#ffffff";
}

/** Mixes a colour with white (amount 0–1), for tints. */
export function tint(hex: string, amount: number) {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex([r + (255 - r) * amount, g + (255 - g) * amount, b + (255 - b) * amount]);
}

export function isValidHex(value: string) {
  return /^#[\da-f]{6}$/i.test(value.trim());
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  return kb < 1024 ? `${Math.round(kb)} KB` : `${(kb / 1024).toLocaleString("hu-HU", { maximumFractionDigits: 1 })} MB`;
}

export function formatNumber(value: number, maximumFractionDigits = 1) {
  return value.toLocaleString("hu-HU", { maximumFractionDigits });
}

/** Parses user input like "12,5" or "12.5". Returns NaN when invalid. */
export function parseDecimal(input: string) {
  const normalized = input.trim().replace(/\s/g, "").replace(",", ".");
  if (!/^-?\d*\.?\d+$|^-?\d+\.$/.test(normalized)) return Number.NaN;
  return Number.parseFloat(normalized);
}
