import type { CvLanguage, LanguageLevel, SectionType } from "./types";

export const CV_LANGUAGES = ["hu", "en", "fr", "de", "es"] as const satisfies readonly CvLanguage[];

export interface CvLabels {
  summary: string;
  contact: string;
  present: string;
  birthDate: string;
  drivingLicense: string;
  sections: Record<SectionType, string>;
  levels: Record<LanguageLevel, string>;
  months: string[];
  /** Shown in grey on the CV while the name is still empty. */
  namePlaceholder: string;
  /** PDF metadata title and the downloaded file name. */
  documentTitle: string;
  fileSuffix: string;
  /** BCP 47 tag for the PDF and for date formatting. */
  intl: string;
  /** Whether language levels are lower-cased inside a sentence ("Angol – felsőfok (C1)"). */
  lowerInlineLevels: boolean;
}

/**
 * Labels printed on the CV itself. They follow the CV's language, which can
 * differ from the language of the editor.
 */
export const CV_LABELS: Record<CvLanguage, CvLabels> = {
  hu: {
    summary: "Bemutatkozás",
    contact: "Elérhetőség",
    present: "jelenleg",
    birthDate: "Születési dátum",
    drivingLicense: "Jogosítvány",
    sections: {
      experience: "Szakmai tapasztalat",
      education: "Tanulmányok",
      projects: "Projektek",
      certificates: "Tanúsítványok és képzések",
      volunteering: "Önkéntes munka",
      custom: "További információk",
      skills: "Készségek",
      languages: "Nyelvtudás",
      interests: "Érdeklődési kör",
    },
    levels: {
      native: "Anyanyelv",
      c2: "Felsőfok (C2)",
      c1: "Felsőfok (C1)",
      b2: "Középfok (B2)",
      b1: "Középfok (B1)",
      a2: "Alapfok (A2)",
      a1: "Alapfok (A1)",
    },
    months: ["jan.", "febr.", "márc.", "ápr.", "máj.", "jún.", "júl.", "aug.", "szept.", "okt.", "nov.", "dec."],
    namePlaceholder: "Neved",
    documentTitle: "Önéletrajz",
    fileSuffix: "CV",
    intl: "hu-HU",
    lowerInlineLevels: true,
  },
  en: {
    summary: "Profile",
    contact: "Contact",
    present: "Present",
    birthDate: "Date of birth",
    drivingLicense: "Driving licence",
    sections: {
      experience: "Experience",
      education: "Education",
      projects: "Projects",
      certificates: "Certifications",
      volunteering: "Volunteering",
      custom: "Additional information",
      skills: "Skills",
      languages: "Languages",
      interests: "Interests",
    },
    levels: {
      native: "Native",
      c2: "Proficient (C2)",
      c1: "Advanced (C1)",
      b2: "Upper intermediate (B2)",
      b1: "Intermediate (B1)",
      a2: "Elementary (A2)",
      a1: "Beginner (A1)",
    },
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    namePlaceholder: "Your name",
    documentTitle: "Résumé",
    fileSuffix: "CV",
    intl: "en-GB",
    lowerInlineLevels: false,
  },
  fr: {
    summary: "Profil",
    contact: "Contact",
    present: "aujourd’hui",
    birthDate: "Date de naissance",
    drivingLicense: "Permis de conduire",
    sections: {
      experience: "Expérience professionnelle",
      education: "Formation",
      projects: "Projets",
      certificates: "Certifications",
      volunteering: "Bénévolat",
      custom: "Informations complémentaires",
      skills: "Compétences",
      languages: "Langues",
      interests: "Centres d’intérêt",
    },
    levels: {
      native: "Langue maternelle",
      c2: "Bilingue (C2)",
      c1: "Courant (C1)",
      b2: "Avancé (B2)",
      b1: "Intermédiaire (B1)",
      a2: "Notions (A2)",
      a1: "Débutant (A1)",
    },
    months: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
    namePlaceholder: "Votre nom",
    documentTitle: "CV",
    fileSuffix: "CV",
    intl: "fr-FR",
    lowerInlineLevels: true,
  },
  de: {
    summary: "Profil",
    contact: "Kontakt",
    present: "heute",
    birthDate: "Geburtsdatum",
    drivingLicense: "Führerschein",
    sections: {
      experience: "Berufserfahrung",
      education: "Ausbildung",
      projects: "Projekte",
      certificates: "Zertifikate und Weiterbildungen",
      volunteering: "Ehrenamt",
      custom: "Weitere Angaben",
      skills: "Kenntnisse",
      languages: "Sprachen",
      interests: "Interessen",
    },
    levels: {
      native: "Muttersprache",
      c2: "Verhandlungssicher (C2)",
      c1: "Fließend (C1)",
      b2: "Sehr gute Kenntnisse (B2)",
      b1: "Gute Kenntnisse (B1)",
      a2: "Grundkenntnisse (A2)",
      a1: "Anfänger (A1)",
    },
    months: ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez."],
    namePlaceholder: "Ihr Name",
    documentTitle: "Lebenslauf",
    fileSuffix: "Lebenslauf",
    intl: "de-DE",
    lowerInlineLevels: false,
  },
  es: {
    summary: "Perfil",
    contact: "Contacto",
    present: "actualidad",
    birthDate: "Fecha de nacimiento",
    drivingLicense: "Carné de conducir",
    sections: {
      experience: "Experiencia profesional",
      education: "Formación",
      projects: "Proyectos",
      certificates: "Certificaciones",
      volunteering: "Voluntariado",
      custom: "Información adicional",
      skills: "Habilidades",
      languages: "Idiomas",
      interests: "Intereses",
    },
    levels: {
      native: "Lengua materna",
      c2: "Bilingüe (C2)",
      c1: "Avanzado (C1)",
      b2: "Intermedio alto (B2)",
      b1: "Intermedio (B1)",
      a2: "Básico (A2)",
      a1: "Principiante (A1)",
    },
    months: ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sept.", "oct.", "nov.", "dic."],
    namePlaceholder: "Tu nombre",
    documentTitle: "Currículum",
    fileSuffix: "CV",
    intl: "es-ES",
    lowerInlineLevels: true,
  },
};

/** Level as a 0–1 fraction, for bars and dots. */
export const LEVEL_VALUE: Record<LanguageLevel, number> = { native: 1, c2: 1, c1: 0.84, b2: 0.67, b1: 0.5, a2: 0.34, a1: 0.17 };
