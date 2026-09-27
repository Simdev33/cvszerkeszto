import { describe, expect, it } from "vitest";
import { emptyResume, sampleResume } from "./defaults";
import { formatMonth, formatRange, fullName, initials, linkHref, parseDescription, prettyUrl } from "./format";
import { exportResume, normalizeResume } from "./normalize";
import { scoreResume } from "./score";

describe("dates", () => {
  it("formats months in Hungarian and English", () => {
    expect(formatMonth("2021-03", "hu")).toBe("2021. márc.");
    expect(formatMonth("2021-03", "en")).toBe("Mar 2021");
    expect(formatMonth("2019", "hu")).toBe("2019");
    expect(formatMonth("", "hu")).toBe("");
  });

  it("formats ranges, including ongoing ones", () => {
    expect(formatRange({ start: "2018-09", end: "2021-02", current: false }, "hu")).toBe("2018. szept. – 2021. febr.");
    expect(formatRange({ start: "2021-03", end: "", current: true }, "hu")).toBe("2021. márc. – jelenleg");
    expect(formatRange({ start: "2021-03", end: "", current: true }, "en")).toBe("Mar 2021 – Present");
    expect(formatRange({ start: "", end: "2020-05", current: false }, "en")).toBe("May 2020");
    expect(formatRange({ start: "2020", end: "2020", current: false }, "hu")).toBe("2020");
  });
});

describe("names and links", () => {
  it("orders names by CV language", () => {
    const basics = { lastName: "Kovács", firstName: "Anna" };
    expect(fullName(basics, "hu")).toBe("Kovács Anna");
    expect(fullName(basics, "en")).toBe("Anna Kovács");
    expect(initials(basics, "hu")).toBe("KA");
    expect(fullName({ lastName: "", firstName: "Anna" }, "hu")).toBe("Anna");
  });

  it("prettifies and links URLs, e-mails and phones", () => {
    expect(prettyUrl("https://www.example.com/")).toBe("example.com");
    expect(linkHref("example.com", "url")).toBe("https://example.com");
    expect(linkHref("+36 30 123 4567", "phone")).toBe("tel:+36301234567");
  });
});

describe("parseDescription", () => {
  it("splits bullets and paragraphs", () => {
    expect(parseDescription("Bevezető mondat.\n- első\n• második\n\n* harmadik\nZárás")).toEqual([
      { type: "paragraph", text: "Bevezető mondat." },
      { type: "bullets", items: ["első", "második", "harmadik"] },
      { type: "paragraph", text: "Zárás" },
    ]);
  });
});

describe("normalizeResume", () => {
  it("round-trips an export", () => {
    const sample = sampleResume();
    const restored = normalizeResume(JSON.parse(exportResume(sample)));
    const strip = (resume: typeof sample) => JSON.parse(JSON.stringify(resume, (key, value) => (key === "id" ? undefined : value)));
    expect(strip(restored)).toEqual(strip(sample));
  });

  it("repairs broken or hostile input", () => {
    const resume = normalizeResume({
      design: { template: "nope", accent: "red", font: "comic-sans" },
      basics: { firstName: 42, lastName: "Nagy", photo: "javascript:alert(1)" },
      sections: [
        { type: "experience", entries: [{ title: "Fejlesztő", start: "tavaly", current: "yes" }] },
        { type: "skills", skills: [{ name: "React", level: 9 }] },
        { type: "hacker" },
      ],
    });
    expect(resume.design.template).toBe("modern");
    expect(resume.design.accent).toMatch(/^#[\da-f]{6}$/i);
    expect(resume.basics.firstName).toBe("");
    expect(resume.basics.photo).toBeNull();
    expect(resume.sections).toHaveLength(2);
    const [experience, skills] = resume.sections;
    expect(experience.type === "experience" && experience.entries[0]).toMatchObject({ title: "Fejlesztő", start: "", current: false });
    expect(skills.type === "skills" && skills.skills[0].level).toBe(0);
  });

  it("rejects files that are not CVs", () => {
    expect(() => normalizeResume({ hello: "world" })).toThrow();
    expect(() => normalizeResume("text")).toThrow();
  });
});

describe("scoreResume", () => {
  it("rates an empty CV low and the sample high", () => {
    const empty = scoreResume(emptyResume());
    expect(empty.score).toBe(0);
    expect(empty.tips[0].points).toBeGreaterThanOrEqual(empty.tips.at(-1)!.points);
    const sample = scoreResume(sampleResume());
    expect(sample.score).toBeGreaterThanOrEqual(90);
    expect(sample.tips.map((tip) => tip.id)).toContain("photo");
  });
});
