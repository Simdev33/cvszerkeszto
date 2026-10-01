/**
 * Renders the example CV of every language with every template into
 * public/templates/<locale>/*.webp (landing page and template picker).
 * Run with: npm run thumbnails
 */
import { createCanvas } from "@napi-rs/canvas";
import { renderToBuffer } from "@react-pdf/renderer";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { it } from "vitest";
import { ResumeDocument } from "@/lib/pdf/document";
import { LOCALES } from "@/i18n/config";
import { registerFonts, resetGlyphCaches } from "@/lib/pdf/theme";
import { sampleResume } from "@/lib/resume/defaults";
import type { Design } from "@/lib/resume/types";

const VARIANTS: Pick<Design, "template" | "accent" | "font">[] = [
  { template: "modern", accent: "#1e3a8a", font: "inter" },
  { template: "classic", accent: "#7c2d12", font: "merriweather" },
  { template: "minimal", accent: "#0f766e", font: "roboto" },
  { template: "elegant", accent: "#312e81", font: "elegant" },
  { template: "executive", accent: "#9a3412", font: "elegant" },
  { template: "creative", accent: "#6b21a8", font: "montserrat" },
  { template: "compact", accent: "#0369a1", font: "inter" },
  { template: "fresh", accent: "#166534", font: "roboto" },
  { template: "contrast", accent: "#4338ca", font: "inter" },
];

it("renders template thumbnails", async () => {
  registerFonts((file) => join(process.cwd(), "public", "fonts", file));
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");

  for (const locale of LOCALES) {
    const out = join(process.cwd(), "public", "templates", locale);
    mkdirSync(out, { recursive: true });
    for (const variant of VARIANTS) {
      const resume = sampleResume(locale);
      resume.design = { ...resume.design, ...variant };
      resetGlyphCaches();
      const bytes = new Uint8Array(await renderToBuffer(<ResumeDocument resume={resume} />));
      const pdf = await pdfjs.getDocument({ data: bytes }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.6 });
      const canvas = createCanvas(Math.round(viewport.width), Math.round(viewport.height));
      await page.render({ canvas: canvas as unknown as HTMLCanvasElement, viewport }).promise;
      writeFileSync(join(out, `${variant.template}.webp`), canvas.toBuffer("image/webp", 82));
      await pdf.loadingTask.destroy();
    }
  }
}, 300_000);
