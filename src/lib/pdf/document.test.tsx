import { renderToBuffer } from "@react-pdf/renderer";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { emptyResume, sampleResume } from "@/lib/resume/defaults";
import type { Resume, TemplateId } from "@/lib/resume/types";
import { ResumeDocument } from "./document";
import { registerFonts } from "./theme";

beforeAll(() => registerFonts((file) => join(process.cwd(), "public", "fonts", file)));

async function textOf(bytes: Uint8Array) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const pdf = await pdfjs.getDocument({ data: bytes.slice() }).promise;
  const pages: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const content = await (await pdf.getPage(i)).getTextContent();
    pages.push(content.items.map((item) => ("str" in item ? item.str : "")).join(" "));
  }
  await pdf.loadingTask.destroy();
  return pages;
}

const render = async (resume: Resume) => new Uint8Array(await renderToBuffer(<ResumeDocument resume={resume} />));

describe("ResumeDocument", () => {
  // Two-column layouts fit the sample on one page; single-column ones run a little longer.
  const maxPages: Record<TemplateId, number> = { modern: 1, elegant: 1, classic: 2, minimal: 2 };
  for (const template of ["modern", "classic", "minimal", "elegant"] satisfies TemplateId[]) {
    it(`renders the sample with the ${template} template`, async () => {
      const resume = sampleResume();
      resume.design.template = template;
      const pages = await textOf(await render(resume));
      expect(pages.length).toBeLessThanOrEqual(maxPages[template]);
      const text = pages.join(" ");
      expect(text).toContain("Kovács Anna");
      // Letter-spaced headings come out of pdf.js as "s z a k m a i", so compare without spaces.
      expect(text.toLowerCase().replace(/\s+/g, "")).toContain("szakmaitapasztalat");
      expect(text).toContain("2021. márc. – jelenleg");
      expect(text).toContain("34%-kal");
    }, 30_000);
  }

  it("switches labels, dates and name order for English CVs", async () => {
    const resume = sampleResume();
    resume.design.language = "en";
    const text = (await textOf(await render(resume))).join(" ");
    expect(text).toContain("Anna Kovács");
    expect(text.toLowerCase().replace(/\s+/g, "")).toContain("experience");
    expect(text).toContain("Mar 2021 – Present");
  }, 30_000);

  it("flows long CVs onto more pages", async () => {
    const resume = sampleResume();
    const experience = resume.sections[0];
    if (experience.type === "experience") experience.entries = Array.from({ length: 5 }, () => experience.entries).flat().map((e, i) => ({ ...e, id: String(i) }));
    const pages = await textOf(await render(resume));
    expect(pages.length).toBeGreaterThan(1);
  }, 30_000);

  it("renders an empty CV without crashing", async () => {
    const pages = await textOf(await render(emptyResume()));
    expect(pages).toHaveLength(1);
    expect(pages[0]).toContain("Neved");
  }, 30_000);
});
