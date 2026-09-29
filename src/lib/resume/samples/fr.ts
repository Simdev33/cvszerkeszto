import type { SampleData } from "./types";

const sample: SampleData = {
  basics: {
    lastName: "Dubois",
    firstName: "Camille",
    headline: "Product manager senior",
    email: "camille.dubois@example.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris",
    website: "camilledubois.example.com",
    linkedin: "linkedin.com/in/camille-dubois-exemple",
    github: "",
    birthDate: "",
    drivingLicense: "B",
    summary:
      "Product manager avec sept ans d’expérience dans le pilotage de produits numériques, de l’idée jusqu’au succès commercial, grâce à des décisions fondées sur les données et à un travail d’équipe étroit. Capacité reconnue à identifier les besoins des utilisateurs, à rendre les priorités transparentes et à aligner les équipes techniques, design et métier.",
  },
  experience: [
    {
      title: "Product manager senior",
      subtitle: "Nova Digital SAS",
      location: "Paris",
      url: "",
      start: "2021-03",
      end: "",
      current: true,
      description:
        "- Responsable de l’application de banque mobile utilisée par 1,2 million de clients actifs\n- Refonte du parcours d’inscription : taux de finalisation en hausse de 34 %\n- Coordination des feuilles de route de 3 équipes de développement et définition des OKR trimestriels\n- Intégration de la recherche utilisateur et de l’A/B testing dans les décisions quotidiennes",
    },
    {
      title: "Product manager",
      subtitle: "Exemple Retail SAS",
      location: "Lyon",
      url: "",
      start: "2018-09",
      end: "2021-02",
      current: false,
      description:
        "- Refonte du panier et du tunnel de paiement de la boutique en ligne (+18 % de conversion)\n- Déploiement d’un outil de gestion des informations produit (PIM) pour 40 000 références\n- Collaboration étroite avec les équipes marketing et service client",
    },
    {
      title: "Business analyst",
      subtitle: "Datapoint Conseil",
      location: "Lyon",
      url: "",
      start: "2016-07",
      end: "2018-08",
      current: false,
      description: "Recueil des besoins, rédaction des spécifications fonctionnelles et création de tableaux de bord pour des clients de la finance et de la distribution.",
    },
  ],
  education: [
    {
      title: "Master Business Analytics",
      subtitle: "IAE Lyon – Université Jean Moulin Lyon 3",
      location: "Lyon",
      url: "",
      start: "2014-09",
      end: "2016-06",
      current: false,
      description: "Mémoire : le développement produit piloté par la donnée dans la banque numérique",
    },
    {
      title: "Licence Économie et gestion",
      subtitle: "Université de Bordeaux",
      location: "Bordeaux",
      url: "",
      start: "2011-09",
      end: "2014-06",
      current: false,
      description: "",
    },
  ],
  skills: [
    { name: "Stratégie produit et roadmap", level: 5 },
    { name: "Recherche utilisateur", level: 4 },
    { name: "Méthodes agiles (Scrum)", level: 5 },
    { name: "Analyse de données (SQL, Amplitude)", level: 4 },
    { name: "Figma et prototypage", level: 3 },
    { name: "Gestion des parties prenantes", level: 5 },
  ],
  languages: [
    { name: "Français", level: "native" },
    { name: "Anglais", level: "c1" },
    { name: "Espagnol", level: "b1" },
  ],
  projects: [
    {
      title: "Outil open source de création de questionnaires",
      subtitle: "Fondatrice, product owner",
      location: "",
      url: "github.com/exemple/questionnaire",
      start: "2022",
      end: "",
      current: true,
      description: "Projet bénévole au service des associations ; utilisé par plus de 200 structures.",
    },
  ],
  certificates: [
    { title: "Professional Scrum Product Owner I", subtitle: "Scrum.org", location: "", url: "", start: "", end: "2020-05", current: false, description: "" },
    { title: "Certification Google Analytics", subtitle: "Google", location: "", url: "", start: "", end: "2019-11", current: false, description: "" },
  ],
  interests: ["Course à pied", "Photographie", "Mentorat", "Jeux de société"],
};

export default sample;
