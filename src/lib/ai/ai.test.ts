import { describe, expect, it } from "vitest";
import { sampleResume } from "@/lib/resume/defaults";
import type { EntrySection } from "@/lib/resume/types";
import { entryContext, resumeContext } from "./context";
import { buildPrompt } from "./prompt";
import { AI_LIMITS, cleanAiText, parseAiRequest } from "./shared";

const valid = { field: "description", action: "improve", language: "hu", text: "árut pakoltam", context: "Position: Raktáros" };

describe("request validation", () => {
  it("accepts a well-formed request", () => {
    expect(parseAiRequest(valid)).toEqual(valid);
    expect(parseAiRequest({ ...valid, action: "write", text: "" })).not.toBeNull();
  });

  it("rejects unknown values, empty text and oversized input", () => {
    expect(parseAiRequest(null)).toBeNull();
    expect(parseAiRequest({ ...valid, field: "email" })).toBeNull();
    expect(parseAiRequest({ ...valid, action: "hack" })).toBeNull();
    expect(parseAiRequest({ ...valid, language: "it" })).toBeNull();
    expect(parseAiRequest({ ...valid, language: "de" })).not.toBeNull();
    expect(parseAiRequest({ ...valid, text: "   " })).toBeNull();
    expect(parseAiRequest({ ...valid, field: "summary", action: "bullets" })).toBeNull();
    expect(parseAiRequest({ ...valid, text: "x".repeat(AI_LIMITS.text + 1) })).toBeNull();
    expect(parseAiRequest({ ...valid, context: "x".repeat(AI_LIMITS.context + 1) })).toBeNull();
  });
});

describe("output cleanup", () => {
  it("normalises bullets and strips markdown", () => {
    expect(cleanAiText("* **Árumozgatás** és rakodás\n• Havi leltár\n– Betanítás")).toBe("- Árumozgatás és rakodás\n- Havi leltár\n- Betanítás");
    expect(cleanAiText("```\n- Egy\n- Kettő\n```")).toBe("- Egy\n- Kettő");
  });

  it("removes wrapping quotes but keeps ordinary text intact", () => {
    expect(cleanAiText("„Tapasztalt könyvelő vagyok.”")).toBe("Tapasztalt könyvelő vagyok.");
    expect(cleanAiText("-5% költség")).toBe("-5% költség");
    expect(cleanAiText("Első bekezdés.\n\n\n\nMásodik.")).toBe("Első bekezdés.\n\nMásodik.");
  });
});

describe("context", () => {
  const resume = sampleResume("hu");
  const experience = resume.sections.find((section): section is EntrySection => section.type === "experience")!;

  it("never contains the name or contact details", () => {
    const text = resumeContext(resume);
    expect(text).toContain("Senior termékmenedzser");
    expect(text).toContain("Nova Digital Zrt.");
    expect(text).toContain("Angol – Advanced (C1)");
    expect(text).toContain("termékfelelőse (1,2 millió aktív felhasználó); Az új onboarding");
    for (const secret of ["Kovács", "kovacs.anna@example.com", "+36 30 123 4567", "linkedin.com"]) expect(text).not.toContain(secret);
  });

  it("describes a single entry, or nothing when it is still blank", () => {
    const text = entryContext(resume, "experience", experience.entries[0]);
    expect(text).toContain("Position: Senior termékmenedzser");
    expect(text).toContain("(ongoing)");
    expect(entryContext(resume, "experience", { ...experience.entries[0], title: "", subtitle: "" })).toBe("");
  });
});

describe("prompt", () => {
  it("asks for the CV language and the right format", () => {
    const hu = buildPrompt({ field: "description", action: "bullets", language: "hu", text: "árut pakoltam", context: "Position: Raktáros" });
    expect(hu.system).toContain("Output language: Hungarian");
    expect(hu.user).toContain('starting with "- "');
    expect(hu.user).toContain("Position: Raktáros");
    const de = buildPrompt({ field: "summary", action: "write", language: "de", text: "", context: "" });
    expect(de.system).toContain("Output language: German");
    expect(de.user).toContain("„Ich“");
    expect(de.user).toContain("(empty)");
  });
});
