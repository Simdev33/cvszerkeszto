import type { SampleData } from "./types";

const sample: SampleData = {
  basics: {
    lastName: "Becker",
    firstName: "Anna",
    headline: "Senior Product Managerin",
    email: "anna.becker@example.com",
    phone: "+49 176 12345678",
    location: "Berlin",
    website: "annabecker.example.com",
    linkedin: "linkedin.com/in/anna-becker-beispiel",
    github: "",
    birthDate: "",
    drivingLicense: "Klasse B",
    summary:
      "Produktmanagerin mit sieben Jahren Erfahrung, die digitale Produkte durch datenbasierte Entscheidungen und enge Teamarbeit von der Idee bis zum Markterfolg führt. Stärken in der Erhebung von Nutzerbedürfnissen, der transparenten Priorisierung und der Abstimmung von Entwicklungs-, Design- und Business-Teams.",
  },
  experience: [
    {
      title: "Senior Product Managerin",
      subtitle: "Nova Digital GmbH",
      location: "Berlin",
      url: "",
      start: "2021-03",
      end: "",
      current: true,
      description:
        "- Verantwortung für die Mobile-Banking-App mit 1,2 Millionen aktiven Kunden\n- Neugestaltung des Onboardings: Abschlussquote der Registrierung um 34 % gesteigert\n- Abstimmung der Roadmaps von 3 Entwicklungsteams und Festlegung quartalsweiser OKRs\n- Einführung von Nutzerforschung und A/B-Tests in die tägliche Entscheidungsfindung",
    },
    {
      title: "Product Managerin",
      subtitle: "Beispiel Handel GmbH",
      location: "Hamburg",
      url: "",
      start: "2018-09",
      end: "2021-02",
      current: false,
      description:
        "- Neukonzeption von Warenkorb und Checkout im Onlineshop (+18 % Conversion)\n- Einführung eines Produktinformationssystems für 40.000 Artikel\n- Enge Zusammenarbeit mit Marketing und Kundenservice",
    },
    {
      title: "Business Analystin",
      subtitle: "Datapoint Consulting GmbH",
      location: "Hamburg",
      url: "",
      start: "2016-07",
      end: "2018-08",
      current: false,
      description: "Erhebung von Kundenbedürfnissen, Dokumentation fachlicher Anforderungen und Erstellung von Reports für Kunden aus Finanzdienstleistung und Einzelhandel.",
    },
  ],
  education: [
    {
      title: "M.Sc. Wirtschaftsinformatik",
      subtitle: "Universität Mannheim",
      location: "Mannheim",
      url: "",
      start: "2014-09",
      end: "2016-06",
      current: false,
      description: "Masterarbeit: Datengetriebene Produktentwicklung im digitalen Banking",
    },
    {
      title: "B.Sc. Betriebswirtschaftslehre",
      subtitle: "Universität zu Köln",
      location: "Köln",
      url: "",
      start: "2011-09",
      end: "2014-06",
      current: false,
      description: "",
    },
  ],
  skills: [
    { name: "Produktstrategie und Roadmaps", level: 5 },
    { name: "Nutzerforschung", level: 4 },
    { name: "Agile Methoden (Scrum)", level: 5 },
    { name: "Datenanalyse (SQL, Amplitude)", level: 4 },
    { name: "Figma und Prototyping", level: 3 },
    { name: "Stakeholder-Management", level: 5 },
  ],
  languages: [
    { name: "Deutsch", level: "native" },
    { name: "Englisch", level: "c1" },
    { name: "Französisch", level: "b1" },
  ],
  projects: [
    {
      title: "Open-Source-Umfragetool",
      subtitle: "Gründerin, Product Owner",
      location: "",
      url: "github.com/beispiel/umfrage",
      start: "2022",
      end: "",
      current: true,
      description: "Ehrenamtliches Projekt für gemeinnützige Organisationen; im Einsatz bei mehr als 200 Organisationen.",
    },
  ],
  certificates: [
    { title: "Professional Scrum Product Owner I", subtitle: "Scrum.org", location: "", url: "", start: "", end: "2020-05", current: false, description: "" },
    { title: "Google-Analytics-Zertifizierung", subtitle: "Google", location: "", url: "", start: "", end: "2019-11", current: false, description: "" },
  ],
  interests: ["Laufen", "Fotografie", "Mentoring", "Brettspiele"],
};

export default sample;
