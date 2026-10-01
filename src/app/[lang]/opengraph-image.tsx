import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/config/site";
import { DEFAULT_LOCALE, isLocale, LOCALES } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { sampleResume } from "@/lib/resume/defaults";
import { fullName } from "@/lib/resume/format";

export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const bar = (width: number, color = "#e3e5e8", height = 10) => (
  <div style={{ width, height, borderRadius: 5, backgroundColor: color }} />
);

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const { meta } = getDictionary(locale);
  const name = fullName(sampleResume(locale).basics, locale);
  // Inter has the Hungarian double acute letters (ő, ű) the default font lacks.
  const [bold, regular, icon] = await Promise.all([
    readFile(join(process.cwd(), "public", "fonts", "Inter-Bold.ttf")),
    readFile(join(process.cwd(), "public", "fonts", "Inter-Regular.ttf")),
    readFile(join(process.cwd(), "src", "app", "icon.svg")),
  ]);
  const mark = `data:image/svg+xml;base64,${icon.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 72,
          background: "radial-gradient(circle at 15% 0%, #2e2a7a 0%, #0b0c10 62%)",
          color: "#f1f2f4",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
            <img src={mark} width={64} height={64} alt="" />
            <div style={{ fontSize: 36, fontWeight: 700 }}>{SITE.name}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 70, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{meta.ogTitle1}</div>
            <div style={{ fontSize: 70, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "#a5a1ff" }}>{meta.ogTitle2}</div>
          </div>
          <div style={{ display: "flex", gap: 12, fontSize: 24, color: "#c9ccd4" }}>
            {meta.ogChips.map((chip) => (
              <div key={chip} style={{ padding: "8px 18px", borderRadius: 999, border: "2px solid #353843" }}>
                {chip}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", width: 330, height: 460, marginTop: 10, borderRadius: 14, backgroundColor: "#ffffff", overflow: "hidden", transform: "rotate(4deg)" }}>
          <div style={{ width: 104, backgroundColor: "#1e3a8a", display: "flex", flexDirection: "column", alignItems: "center", padding: "26px 14px", gap: 12 }}>
            <div style={{ width: 62, height: 62, borderRadius: 31, backgroundColor: "#c4b5fd" }} />
            {bar(70, "rgba(255,255,255,0.6)", 7)}
            {bar(56, "rgba(255,255,255,0.35)", 7)}
            {bar(64, "rgba(255,255,255,0.35)", 7)}
            {bar(48, "rgba(255,255,255,0.35)", 7)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", padding: "28px 20px", gap: 12, flex: 1 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#16181d" }}>{name}</div>
            {bar(110, "#1e3a8a", 8)}
            <div style={{ height: 8 }} />
            {bar(180)}
            {bar(160)}
            {bar(170)}
            <div style={{ height: 8 }} />
            {bar(90, "#1e3a8a", 8)}
            {bar(175)}
            {bar(150)}
            {bar(165)}
            {bar(120)}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: bold, weight: 700, style: "normal" },
        { name: "Inter", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
