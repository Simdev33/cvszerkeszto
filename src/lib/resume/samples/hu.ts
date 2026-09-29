import type { SampleData } from "./types";

const sample: SampleData = {
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
    summary:
      "Hét év tapasztalattal rendelkező termékmenedzser, aki adatvezérelt döntésekkel és szoros csapatmunkával juttat el digitális termékeket az ötlettől a piaci sikerig. Erősségem a felhasználói igények feltárása, a prioritások átlátható kezelése és a fejlesztői, design és üzleti csapatok összehangolása.",
  },
  experience: [
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
  ],
  education: [
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
  ],
  skills: [
    { name: "Termékstratégia és roadmap", level: 5 },
    { name: "Felhasználói kutatás", level: 4 },
    { name: "Agilis módszertanok (Scrum)", level: 5 },
    { name: "Adatelemzés (SQL, Amplitude)", level: 4 },
    { name: "Figma, prototípusok", level: 3 },
    { name: "Stakeholder-menedzsment", level: 5 },
  ],
  languages: [
    { name: "Magyar", level: "native" },
    { name: "Angol", level: "c1" },
    { name: "Német", level: "b1" },
  ],
  projects: [
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
  ],
  certificates: [
    { title: "Professional Scrum Product Owner I", subtitle: "Scrum.org", location: "", url: "", start: "", end: "2020-05", current: false, description: "" },
    { title: "Google Analytics minősítés", subtitle: "Google", location: "", url: "", start: "", end: "2019-11", current: false, description: "" },
  ],
  interests: ["Futás", "Fotózás", "Mentorálás", "Társasjátékok"],
};

export default sample;
