import type { SampleData } from "./types";

const sample: SampleData = {
  basics: {
    lastName: "Fernández Ruiz",
    firstName: "Lucía",
    headline: "Product Manager sénior",
    email: "lucia.fernandez@example.com",
    phone: "+34 612 345 678",
    location: "Madrid",
    website: "luciafernandez.example.com",
    linkedin: "linkedin.com/in/lucia-fernandez-ejemplo",
    github: "",
    birthDate: "",
    drivingLicense: "B (vehículo propio)",
    summary:
      "Product manager con siete años de experiencia llevando productos digitales desde la idea hasta el éxito en el mercado gracias a decisiones basadas en datos y a un estrecho trabajo en equipo. Destaco por identificar las necesidades de los usuarios, gestionar las prioridades con transparencia y alinear a los equipos de desarrollo, diseño y negocio.",
  },
  experience: [
    {
      title: "Product Manager sénior",
      subtitle: "Nova Digital S.L.",
      location: "Madrid",
      url: "",
      start: "2021-03",
      end: "",
      current: true,
      description:
        "- Responsable de la app de banca móvil, con 1,2 millones de clientes activos\n- Rediseño del proceso de alta: la tasa de registros completados aumentó un 34 %\n- Coordinación de las hojas de ruta de 3 equipos de desarrollo y definición de OKR trimestrales\n- Implantación de la investigación de usuarios y los tests A/B en la toma de decisiones diaria",
    },
    {
      title: "Product Manager",
      subtitle: "Ejemplo Retail S.A.",
      location: "Barcelona",
      url: "",
      start: "2018-09",
      end: "2021-02",
      current: false,
      description:
        "- Rediseño del carrito y del proceso de pago de la tienda online (+18 % de conversión)\n- Implantación de un sistema de información de producto (PIM) para 40.000 productos\n- Estrecha colaboración con los equipos de marketing y de atención al cliente",
    },
    {
      title: "Analista de negocio",
      subtitle: "Datapoint Consultoría S.L.",
      location: "Barcelona",
      url: "",
      start: "2016-07",
      end: "2018-08",
      current: false,
      description: "Análisis de las necesidades de los clientes, documentación de requisitos de negocio y elaboración de informes para clientes de los sectores financiero y de distribución.",
    },
  ],
  education: [
    {
      title: "Máster en Business Analytics",
      subtitle: "Universitat Pompeu Fabra",
      location: "Barcelona",
      url: "",
      start: "2014-09",
      end: "2016-06",
      current: false,
      description: "Trabajo de fin de máster: Desarrollo de producto basado en datos en la banca digital",
    },
    {
      title: "Grado en Administración y Dirección de Empresas",
      subtitle: "Universidad Complutense de Madrid",
      location: "Madrid",
      url: "",
      start: "2011-09",
      end: "2014-06",
      current: false,
      description: "",
    },
  ],
  skills: [
    { name: "Estrategia de producto y hojas de ruta", level: 5 },
    { name: "Investigación de usuarios", level: 4 },
    { name: "Metodologías ágiles (Scrum)", level: 5 },
    { name: "Análisis de datos (SQL, Amplitude)", level: 4 },
    { name: "Figma y prototipado", level: 3 },
    { name: "Gestión de stakeholders", level: 5 },
  ],
  languages: [
    { name: "Español", level: "native" },
    { name: "Inglés", level: "c1" },
    { name: "Francés", level: "b1" },
  ],
  projects: [
    {
      title: "Herramienta de encuestas de código abierto",
      subtitle: "Fundadora y product owner",
      location: "",
      url: "github.com/example/survey",
      start: "2022",
      end: "",
      current: true,
      description: "Proyecto voluntario para entidades sin ánimo de lucro; lo utilizan más de 200 organizaciones.",
    },
  ],
  certificates: [
    { title: "Professional Scrum Product Owner I", subtitle: "Scrum.org", location: "", url: "", start: "", end: "2020-05", current: false, description: "" },
    { title: "Certificación de Google Analytics", subtitle: "Google", location: "", url: "", start: "", end: "2019-11", current: false, description: "" },
  ],
  interests: ["Correr", "Fotografía", "Mentoría", "Juegos de mesa"],
};

export default sample;
