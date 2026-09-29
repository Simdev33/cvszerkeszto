import type { SampleData } from "./types";

const sample: SampleData = {
  basics: {
    lastName: "Clarke",
    firstName: "Emma",
    headline: "Senior Product Manager",
    email: "emma.clarke@example.com",
    phone: "+44 7700 900123",
    location: "London",
    website: "emmaclarke.example.com",
    linkedin: "linkedin.com/in/emma-clarke-example",
    github: "",
    birthDate: "",
    drivingLicense: "",
    summary:
      "Product manager with seven years of experience taking digital products from idea to market success through data-driven decisions and close teamwork. Skilled at uncovering user needs, keeping priorities transparent and aligning engineering, design and business teams.",
  },
  experience: [
    {
      title: "Senior Product Manager",
      subtitle: "Nova Digital Ltd",
      location: "London",
      url: "",
      start: "2021-03",
      end: "",
      current: true,
      description:
        "- Own the mobile banking app used by 1.2 million active customers\n- Redesigned onboarding, raising the sign-up completion rate by 34%\n- Align the roadmaps of 3 engineering teams and set quarterly OKRs\n- Introduced user research and A/B testing into everyday decision-making",
    },
    {
      title: "Product Manager",
      subtitle: "Example Retail Ltd",
      location: "Manchester",
      url: "",
      start: "2018-09",
      end: "2021-02",
      current: false,
      description:
        "- Rebuilt the web shop's basket and checkout flow (+18% conversion)\n- Rolled out a product information system for 40,000 products\n- Worked closely with the marketing and customer service teams",
    },
    {
      title: "Business Analyst",
      subtitle: "Datapoint Consulting Ltd",
      location: "Manchester",
      url: "",
      start: "2016-07",
      end: "2018-08",
      current: false,
      description: "Gathered client needs, documented business requirements and built reports for clients in finance and retail.",
    },
  ],
  education: [
    {
      title: "MSc Business Analytics",
      subtitle: "University of Manchester",
      location: "Manchester",
      url: "",
      start: "2014-09",
      end: "2016-06",
      current: false,
      description: "Dissertation: Data-driven product development in digital banking",
    },
    {
      title: "BSc Business Management",
      subtitle: "University of Leeds",
      location: "Leeds",
      url: "",
      start: "2011-09",
      end: "2014-06",
      current: false,
      description: "",
    },
  ],
  skills: [
    { name: "Product strategy and roadmaps", level: 5 },
    { name: "User research", level: 4 },
    { name: "Agile methods (Scrum)", level: 5 },
    { name: "Data analysis (SQL, Amplitude)", level: 4 },
    { name: "Figma and prototyping", level: 3 },
    { name: "Stakeholder management", level: 5 },
  ],
  languages: [
    { name: "English", level: "native" },
    { name: "French", level: "c1" },
    { name: "German", level: "b1" },
  ],
  projects: [
    {
      title: "Open-source survey builder",
      subtitle: "Founder, product owner",
      location: "",
      url: "github.com/example/survey",
      start: "2022",
      end: "",
      current: true,
      description: "Volunteer project for non-profits; used by more than 200 organisations.",
    },
  ],
  certificates: [
    { title: "Professional Scrum Product Owner I", subtitle: "Scrum.org", location: "", url: "", start: "", end: "2020-05", current: false, description: "" },
    { title: "Google Analytics Certification", subtitle: "Google", location: "", url: "", start: "", end: "2019-11", current: false, description: "" },
  ],
  interests: ["Running", "Photography", "Mentoring", "Board games"],
};

export default sample;
