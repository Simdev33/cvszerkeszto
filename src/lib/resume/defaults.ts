import { uid } from "@/lib/utils";
import type { Basics, Design, Entry, EntrySectionType, Resume, Section, SectionType } from "./types";

export const DEFAULT_DESIGN: Design = {
  template: "modern",
  accent: "#1e3a8a",
  font: "inter",
  density: "normal",
  language: "hu",
  pageSize: "A4",
  photoShape: "circle",
};

export const EMPTY_BASICS: Basics = {
  lastName: "",
  firstName: "",
  headline: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  linkedin: "",
  github: "",
  birthDate: "",
  drivingLicense: "",
  photo: null,
  summary: "",
};

export function emptyEntry(patch: Partial<Entry> = {}): Entry {
  return { id: uid(), title: "", subtitle: "", location: "", url: "", start: "", end: "", current: false, description: "", ...patch };
}

export function createSection(type: SectionType, patch: Partial<{ title: string; visible: boolean }> = {}): Section {
  const base = { id: uid(), title: patch.title ?? "", visible: patch.visible ?? true };
  switch (type) {
    case "skills":
      return { ...base, type, skills: [] };
    case "languages":
      return { ...base, type, languages: [] };
    case "interests":
      return { ...base, type, tags: [] };
    default:
      return { ...base, type: type as EntrySectionType, entries: [] };
  }
}

export const DEFAULT_SECTION_ORDER: SectionType[] = ["experience", "education", "skills", "languages", "projects", "certificates", "interests"];

export function emptyResume(): Resume {
  return {
    version: 1,
    design: { ...DEFAULT_DESIGN },
    basics: { ...EMPTY_BASICS },
    sections: DEFAULT_SECTION_ORDER.map((type) => createSection(type)),
  };
}

/** A realistic, fully filled example (fictional person and companies). */
export function sampleResume(): Resume {
  const entries = (items: Omit<Entry, "id">[]) => items.map((item) => ({ id: uid(), ...item }));
  return {
    version: 1,
    design: { ...DEFAULT_DESIGN },
    basics: {
      lastName: "Kovács",
      firstName: "Anna",
      headline: "Senior termékmenedzser",
      email: "kovacs.anna@example.com",
      phone: "+36 30 123 4567",
      location: "Budapest",
      website: "annakovacs.example.com",
      linkedin: "linkedin.com/in/kovacs-anna-pelda",
      github: "",
      birthDate: "",
      drivingLicense: "B kategória",
      photo: null,
      summary:
        "Hét év tapasztalattal rendelkező termékmenedzser, aki adatvezérelt döntésekkel és szoros csapatmunkával juttat el digitális termékeket az ötlettől a piaci sikerig. Erősségem a felhasználói igények feltárása, a prioritások átlátható kezelése és a fejlesztői, design és üzleti csapatok összehangolása.",
    },
    sections: [
      {
        id: uid(),
        type: "experience",
        title: "",
        visible: true,
        entries: entries([
          {
            title: "Senior termékmenedzser",
            subtitle: "Nova Digital Zrt.",
            location: "Budapest",
            url: "",
            start: "2021-03",
            end: "",
            current: true,
            description:
              "- A mobilbanki alkalmazás termékfelelőse (1,2 millió aktív felhasználó)\n- Az új onboarding folyamattal 34%-kal nőtt a regisztrációk befejezési aránya\n- 3 fejlesztői csapat roadmapjének összehangolása, negyedéves OKR-ek kialakítása\n- Felhasználói kutatások és A/B tesztek bevezetése a döntéshozatalba",
          },
          {
            title: "Termékmenedzser",
            subtitle: "Példa Kereskedelmi Kft.",
            location: "Budapest",
            url: "",
            start: "2018-09",
            end: "2021-02",
            current: false,
            description:
              "- A webáruház kosár- és fizetési folyamatának újratervezése (+18% konverzió)\n- Termékadat-kezelő rendszer bevezetése 40 000 termékhez\n- Szoros együttműködés a marketing- és ügyfélszolgálati csapattal",
          },
          {
            title: "Üzleti elemző",
            subtitle: "Adatpont Consulting Kft.",
            location: "Budapest",
            url: "",
            start: "2016-07",
            end: "2018-08",
            current: false,
            description: "Ügyféligények felmérése, üzleti követelmények dokumentálása és riportok készítése pénzügyi és kiskereskedelmi ügyfeleknek.",
          },
        ]),
      },
      {
        id: uid(),
        type: "education",
        title: "",
        visible: true,
        entries: entries([
          {
            title: "Gazdaságinformatikus MSc",
            subtitle: "Budapesti Corvinus Egyetem",
            location: "Budapest",
            url: "",
            start: "2014-09",
            end: "2016-06",
            current: false,
            description: "Szakdolgozat: Adatvezérelt termékfejlesztés a digitális bankolásban",
          },
          {
            title: "Gazdálkodás és menedzsment BSc",
            subtitle: "Szegedi Tudományegyetem",
            location: "Szeged",
            url: "",
            start: "2011-09",
            end: "2014-06",
            current: false,
            description: "",
          },
        ]),
      },
      {
        id: uid(),
        type: "skills",
        title: "",
        visible: true,
        skills: [
          { id: uid(), name: "Termékstratégia és roadmap", level: 5 },
          { id: uid(), name: "Felhasználói kutatás", level: 4 },
          { id: uid(), name: "Agilis módszertanok (Scrum)", level: 5 },
          { id: uid(), name: "Adatelemzés (SQL, Amplitude)", level: 4 },
          { id: uid(), name: "Figma, prototípusok", level: 3 },
          { id: uid(), name: "Stakeholder-menedzsment", level: 5 },
        ],
      },
      {
        id: uid(),
        type: "languages",
        title: "",
        visible: true,
        languages: [
          { id: uid(), name: "Magyar", level: "native" },
          { id: uid(), name: "Angol", level: "c1" },
          { id: uid(), name: "Német", level: "b1" },
        ],
      },
      {
        id: uid(),
        type: "projects",
        title: "",
        visible: true,
        entries: entries([
          {
            title: "Nyílt forráskódú kérdőívkészítő",
            subtitle: "Alapító, termékfelelős",
            location: "",
            url: "github.com/pelda/kerdoiv",
            start: "2022",
            end: "",
            current: true,
            description: "Önkéntes projekt civil szervezeteknek; több mint 200 szervezet használja.",
          },
        ]),
      },
      {
        id: uid(),
        type: "certificates",
        title: "",
        visible: true,
        entries: entries([
          { title: "Professional Scrum Product Owner I", subtitle: "Scrum.org", location: "", url: "", start: "", end: "2020-05", current: false, description: "" },
          { title: "Google Analytics minősítés", subtitle: "Google", location: "", url: "", start: "", end: "2019-11", current: false, description: "" },
        ]),
      },
      { id: uid(), type: "interests", title: "", visible: true, tags: ["Futás", "Fotózás", "Mentorálás", "Társasjátékok"] },
    ],
  };
}
