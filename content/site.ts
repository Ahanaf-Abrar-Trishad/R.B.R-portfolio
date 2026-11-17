// All site content lives here. To add something new, append to the matching list. No component edits needed.
// Empty strings ("") are placeholders: anything left empty is simply not shown on the site.
// `short` is the heading people read; the full official title is shown underneath in small print.

export const profile = {
  name: "Rubya Binte Rezanur",
  role: "Aquatic ecotoxicology · Microplastics",
  affiliation: "M.Sc. Fisheries Management, Bangladesh Agricultural University",
  tagline: "I study what microplastics do to freshwater fish and mussels. I also work with farming families to keep their ponds healthy.",
  location: "Mymensingh, Bangladesh",
  photo: "", // TODO: e.g. "/profile.jpg" placed in web/public/
  bio: "", // TODO: optional 1–2 sentences
  highlights: [
    { title: "Guest speaker, FAO World Food Forum", detail: "Rome, 2026" },
    { title: "Winning team, WUR Food Systems Innovation Challenge", detail: "Top 3 of 105+ teams, 2025" },
    { title: "Best Poster Award", detail: "FSB Young Fisheries Students Congress" },
    { title: "NST Fellowship", detail: "Ranked 262nd nationally" },
  ],
};

export const contact = {
  email: "", // TODO
  linkedin: "", // TODO: full URL
  scholar: "", // TODO: Google Scholar URL
  orcid: "", // TODO: ORCID URL
  researchgate: "", // TODO
  cv: "", // TODO: e.g. "/cv.pdf" placed in web/public/
};

export const education = [
  {
    degree: "M.Sc. in Fisheries Management",
    school: "Bangladesh Agricultural University",
    period: "2024–2026",
    grade: "CGPA 3.92 / 4.00",
    note: "Thesis on microplastic toxicity in the freshwater pearl mussel.",
  },
  {
    degree: "B.Sc. in Fisheries (Honours)",
    school: "Bangladesh Agricultural University",
    period: "2019–2024",
    grade: "CGPA 3.72 / 4.00",
    note: "",
  },
];

export const awards = [
  { title: "Best Poster Presentation Award", by: "FSB Young Fisheries Students Congress 2025", date: "Jan 2026", note: "Climate Change and Pollution track." },
  { title: "National Science and Technology Fellowship", by: "Ministry of Science and Technology, Bangladesh", date: "Dec 2024", note: "Ranked 262nd nationally." },
  { title: "University Merit Stipend", by: "Bangladesh Agricultural University", date: "2019–2026", note: "" },
];

// The path a microplastic takes through her work, shown as a strip at the top of Research.
export const pathway = [
  { step: "Water & sediment", detail: "River samples, Brahmaputra" },
  { step: "Fish & mussels", detail: "Nile tilapia, pearl mussel" },
  { step: "Blood & tissue", detail: "Haematology, histology, bioaccumulation" },
  { step: "Toxicity", detail: "LC50, growth, stress markers" },
];

export const research = [
  {
    role: "Research Assistant · APN-funded",
    short: "Microplastics in Brahmaputra fish and food chains",
    title: "Microplastics Contamination in Fish and Aquatic Food Chains along the Brahmaputra River",
    lab: "Aquatic Ecology Laboratory, BAU",
    points: [
      "Ran dose-response exposure trials on fish and bivalves: LC50, growth, stress markers.",
      "Pulled microplastics out of water, sediment and tissue, and counted them.",
      "Helped write up the results.",
    ],
  },
  {
    role: "Research Assistant · BoBP-IGO-funded",
    short: "Marine litter in the Sundarbans mangroves",
    title:
      "Unveiling the Marine Litters: Mapping, Distribution and Identification in the Indian and Bangladesh Parts of Sundarbans Mangroves along the Bay of Bengal",
    lab: "Aquatic Ecology Laboratory, BAU",
    points: [
      "Field surveys and litter sampling in the mangroves.",
      "Mapped where different kinds of litter end up.",
      "Identified the organisms found by taxonomy and likely origin.",
    ],
  },
  {
    role: "Master's thesis",
    short: "What microplastics do to the freshwater pearl mussel",
    title: "Toxicity of Microplastics in the Freshwater Pearl Mussel: Growth, Haemato-Biochemistry and Bioaccumulation Responses",
    lab: "Bangladesh Agricultural University",
    points: [],
  },
  {
    role: "Research Intern",
    short: "Microsporidia in freshwater fish",
    title: "Appearance of Microsporidia Larvae in Freshwater Fishes",
    lab: "Laboratory of Parasitology, BAU",
    points: ["Found and identified Microsporidia larvae in fish, then confirmed them with DNA extraction and PCR."],
  },
];

export const me = "Rezanur, R. B."; // highlighted in the author lists

export const publications = {
  published: [
    {
      authors:
        "Tonny, M. J., Roy, S. N. C., Ayesha, S. B., Sadat, M. A., Kanok, N. J. R., Rezanur, R. B., Tazri, J., Zulfahmi, I., Nayak, S., Rashid, H., & Sumon, K. A.",
      year: "in press",
      title:
        "Toxicological assessment of polypropylene microplastics in Nile tilapia (Oreochromis niloticus): Growth, haematological and histopathological insights.",
      venue: "CLEAN – Soil, Air, Water",
      link: "", // TODO: DOI link once published
    },
  ],
  inPrep: [
    {
      authors: "Rezanur, R. B., Mithu, M. M., Siddique, T. T., Mitu, M. M. J., Sumon, K. A., & Rashid, H.",
      year: "2026",
      title:
        "Multilevel toxicity and post-exposure responses to PET microfibre in the freshwater pearl mussel (Lamellidens marginalis): Growth, bioaccumulation, haematobiochemical alterations, histopathology, and oxidative stress.",
      venue: "",
      link: "",
    },
    {
      authors:
        "Kanok, N. J. R., Sadat, M. A., Roy, S. N. C., Hossain, S. S., Rezanur, R. B., Siddiquee, M. A. M., Zulfahmi, I., Hajisamae, S., Rahman, M. M., Rashid, H., & Sumon, K. A.",
      year: "2026",
      title:
        "Polyethylene microplastics exacerbate the toxicity of chromium on growth, haematological parameters, erythrocytic morphology, and tissue histopathology in Nile tilapia (Oreochromis niloticus).",
      venue: "",
      link: "",
    },
  ],
};

// Skills with an image also appear as photo figures above the list.
export const skills = [
  { group: "Lab", title: "Exposure studies & ecotoxicology", image: "" },
  { group: "Lab", title: "LC50 determination", image: "" },
  { group: "Lab", title: "Growth & biochemical stress", image: "" },
  { group: "Lab", title: "Microplastic extraction & counting", image: "" },
  { group: "Lab", title: "DNA extraction & PCR", image: "" },
  { group: "Field", title: "Water, sediment & tissue sampling", image: "" },
  { group: "Field", title: "Field surveys", image: "" },
  { group: "Field", title: "Spatial mapping", image: "" },
  { group: "Desk", title: "R & SPSS", image: "" },
  { group: "Desk", title: "Scientific writing", image: "" },
];

export const leadership = {
  name: "AGRO-FEME SEPTET",
  url: "https://agrofeme.com",
  role: "Founder & Lead",
  period: "2025–now",
  org: "All-women youth innovation team, BAU",
  about: "Seven women, one idea: floating vegetable gardens with filter-feeding fish underneath, to take on water hyacinth and nutrient-choked ponds.",
  win: "Top 3 of 105+ teams from 12 countries at the 2025 Food Systems Innovation Challenge (WUR & Netherlands Food Partnership).",
  innovation: {
    title: "Integrated Floating Vegetable Garden cum Filter-Feeder Fish Culture",
    text: "Food, fish and cleaner water from the same pond.",
  },
  impact: [
    { figure: "67", text: "farming families, three locations" },
    { figure: "12", text: "young people learning with us" },
  ],
  myRole: "I started the team and lead it: shaping the idea, running the group, and working in the field with families.",
};

// cert: filename (without .jpg) in web/public/certificates/
export const conferences = [
  {
    title: "FAO World Food Forum Flagship Event",
    where: "FAO Headquarters, Rome",
    date: "Oct 2026",
    kind: "Team representative",
    text: "Presented our innovation for the Youth Food Lab Global Cohort 2026.",
    cert: "",
  },
  {
    title: "Women Leaders of Science, Technology, and Innovation in Agrifood Systems",
    where: "FAO World Food Forum, Rome",
    date: "Oct 2026",
    kind: "Guest speaker",
    text: "Talked about AGRO-FEME SEPTET, youth-led innovation, and what still holds women back in agrifood science.",
    cert: "",
  },
  { title: "BAPA-BEN National Conference on Environmental Reforms", where: "Krishibid Institute, Dhaka", date: "2026", kind: "Oral", text: "", cert: "" },
  {
    title: "FSB Young Fisheries Students Congress 2025",
    where: "University of Dhaka",
    date: "Jan 2026",
    kind: "Poster",
    text: "",
    cert: "fsb-best-poster-2026",
  },
  { title: "International Conference on Environment and Climate Action (ICECA)", where: "Asian University for Women, Chittagong", date: "2025", kind: "Poster", text: "", cert: "iceca-2025" },
  { title: "Conference on Sustainable Aquaculture and Fisheries", where: "CVASU Fish Festival", date: "Apr 2025", kind: "Oral", text: "", cert: "cvasu-conference-2025" },
];

export const training = [
  { title: "Data Analysis: R & SPSS", by: "GTI, BAU", date: "Apr 2025", cert: "gti-r-spss-2025" },
  { title: "Advanced Spirulina Production", by: "Sher-e-Bangla Agricultural University", date: "Jan 2025", cert: "spirulina-training-2025" },
  { title: "Computer Fundamentals & Office", by: "GTI, BAU", date: "2024", cert: "gti-computer-2024" },
  { title: "Fisheries Research & Development", by: "Bangladesh Fisheries Research Institute", date: "", cert: "" },
  { title: "Agricultural Extension Field Training", by: "Dept. of Agricultural Extension, BAU", date: "", cert: "" },
];

export const community = [
  { name: "HASHIMUKH", role: "Treasurer, 2023–24", text: "Student volunteer group for social welfare and the environment." },
  { name: "BADHON Foundation", role: "Blood donor", text: "" },
  { name: "Fisheries Society of Bangladesh", role: "Member, 2026", text: "" },
];

export const languages = [
  { name: "Bangla", level: "native" },
  { name: "English", level: "IELTS 7.5" },
  { name: "Spanish", level: "learning" },
];

export type CertCategory = "Events" | "Training" | "Service";

export const certificates: { file: string; title: string; detail: string; category: CertCategory }[] = [
  { file: "fsb-best-poster-2026", title: "Best Poster Presentation", detail: "FSB Students Congress · Jan 2026", category: "Events" },
  { file: "fsb-congress-2025", title: "FSB Students Congress 2025", detail: "Participation · Jan 2026", category: "Events" },
  { file: "iceca-2025", title: "ICECA 2025", detail: "Asian University for Women", category: "Events" },
  { file: "cvasu-conference-2025", title: "Aquaculture & Fisheries Conference", detail: "CVASU · Apr 2025", category: "Events" },
  { file: "fisheries-entrepreneur-summit-2025", title: "Fisheries Entrepreneur Summit", detail: "Dept. of Fisheries · Feb 2025", category: "Events" },
  { file: "gti-r-spss-2025", title: "Data Analysis: R & SPSS", detail: "GTI, BAU · Apr 2025", category: "Training" },
  { file: "spirulina-training-2025", title: "Spirulina Production", detail: "SAU · Jan 2025", category: "Training" },
  { file: "gti-computer-2024", title: "Computer Fundamentals", detail: "GTI, BAU · 60 hours", category: "Training" },
  { file: "hashimukh-treasurer-2024", title: "Hashimukh, Treasurer", detail: "2023–24", category: "Service" },
  { file: "fsb-membership-2026", title: "Fisheries Society of Bangladesh", detail: "Member · 2026", category: "Service" },
];
