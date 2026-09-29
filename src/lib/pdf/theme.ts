import { Font } from "@react-pdf/renderer";
import { CV_LABELS, type CvLabels } from "@/lib/resume/i18n";
import type { CvLanguage, Density, Design, FontId, PhotoShape } from "@/lib/resume/types";
import { textOn, tint } from "@/lib/utils";

export const FONT_FAMILIES: Record<FontId, { label: string; body: string; heading: string }> = {
  inter: { label: "Inter", body: "Inter", heading: "Inter" },
  roboto: { label: "Roboto", body: "Roboto", heading: "Roboto" },
  montserrat: { label: "Montserrat", body: "Montserrat", heading: "Montserrat" },
  merriweather: { label: "Merriweather", body: "Merriweather", heading: "Merriweather" },
  elegant: { label: "Playfair + Inter", body: "Inter", heading: "Playfair Display" },
};

const FILES: Record<string, { file: string; fontWeight?: number; fontStyle?: "italic" }[]> = {
  Inter: [{ file: "Inter-Regular.ttf" }, { file: "Inter-Italic.ttf", fontStyle: "italic" }, { file: "Inter-SemiBold.ttf", fontWeight: 600 }, { file: "Inter-Bold.ttf", fontWeight: 700 }],
  Roboto: [{ file: "Roboto-Regular.ttf" }, { file: "Roboto-Italic.ttf", fontStyle: "italic" }, { file: "Roboto-SemiBold.ttf", fontWeight: 600 }, { file: "Roboto-Bold.ttf", fontWeight: 700 }],
  Montserrat: [
    { file: "Montserrat-Regular.ttf" },
    { file: "Montserrat-Italic.ttf", fontStyle: "italic" },
    { file: "Montserrat-SemiBold.ttf", fontWeight: 600 },
    { file: "Montserrat-Bold.ttf", fontWeight: 700 },
  ],
  Merriweather: [{ file: "Merriweather-Regular.ttf" }, { file: "Merriweather-Italic.ttf", fontStyle: "italic" }, { file: "Merriweather-Bold.ttf", fontWeight: 700 }],
  "Playfair Display": [{ file: "PlayfairDisplay-Regular.ttf" }, { file: "PlayfairDisplay-Bold.ttf", fontWeight: 700 }],
};

let registered = false;

/**
 * Registers the embedded fonts once. `resolve` turns a file name into a URL
 * (browser) or a file path (Node). Fonts are only downloaded when used.
 */
export function registerFonts(resolve: (file: string) => string) {
  if (registered) return;
  registered = true;
  for (const [family, fonts] of Object.entries(FILES)) {
    Font.register({ family, fonts: fonts.map(({ file, ...variant }) => ({ src: resolve(file), ...variant })) });
  }
  // Hungarian words must not be hyphenated with English rules. Only absurdly
  // long tokens may break (react-pdf then adds a hyphen), so nothing overflows.
  Font.registerHyphenationCallback((word) => (word.length > 32 ? (word.match(/.{1,16}/g) ?? [word]) : [word]));
}

type LoadedSource = { data: { _glyphs?: Record<number, unknown> } | null };

/**
 * Call before rendering each document. fontkit caches glyph objects together
 * with the code points of their first use, and subsetting a finished PDF adds
 * the components of composite glyphs (e.g. the ’ inside ”) with no code points.
 * The next document would then reuse those: its text layer reads "d6expérience"
 * and line breaks shift. A fresh cache per document avoids that.
 */
export function resetGlyphCaches() {
  for (const family of Object.values(Font.getRegisteredFonts())) {
    for (const source of (family as unknown as { sources: LoadedSource[] }).sources) {
      if (source.data?._glyphs) source.data._glyphs = {};
    }
  }
}

const DENSITY: Record<Density, { size: number; line: number; gap: number; entryGap: number; page: number }> = {
  compact: { size: 8.7, line: 1.36, gap: 11, entryGap: 7, page: 30 },
  normal: { size: 9.3, line: 1.4, gap: 13, entryGap: 8, page: 34 },
  spacious: { size: 10.3, line: 1.5, gap: 19, entryGap: 12, page: 42 },
};

export interface Theme {
  accent: string;
  onAccent: string;
  accentSoft: string;
  accentMuted: string;
  ink: string;
  muted: string;
  rule: string;
  body: string;
  heading: string;
  size: number;
  line: number;
  gap: number;
  entryGap: number;
  page: number;
  language: CvLanguage;
  labels: CvLabels;
  photoShape: PhotoShape;
}

export function makeTheme(design: Design): Theme {
  const fonts = FONT_FAMILIES[design.font];
  return {
    accent: design.accent,
    onAccent: textOn(design.accent),
    accentSoft: tint(design.accent, 0.92),
    accentMuted: tint(design.accent, 0.35),
    ink: "#1d2025",
    muted: "#5d636f",
    rule: "#dfe2e6",
    body: fonts.body,
    heading: fonts.heading,
    ...DENSITY[design.density],
    language: design.language,
    labels: CV_LABELS[design.language],
    photoShape: design.photoShape,
  };
}
