/**
 * Central content source for the PureHabitat partner site.
 *
 * All product claims are taken verbatim (or lightly condensed) from the
 * official YOGa Clean Air brochure and the "Y-CAB vs ERV" comparison
 * document. No claims are invented here — keep it that way.
 */

export const site = {
  name: "PureHabitat",
  tagline: "Purity for the places that matter most.",
  partnerOf: "YOGa Clean Air",
  description:
    "PureHabitat is an authorized channel partner for YOGa Clean Air. We partner with interior designers, architects, luxury builders and home-automation companies to bring hospital-grade clean air to the homes they create.",
  url: "https://mypurehabitat.com",
  email: "partners@mypurehabitat.com",
  contacts: [
    { name: "Miren", phone: "+91 98798 69406", tel: "+919879869406", whatsapp: "919879869406" },
    { name: "Karan", phone: "+91 96574 41692", tel: "+919657441692", whatsapp: "919657441692" },
  ],
  whatsappMessage:
    "Hi PureHabitat, I'd like to learn more about YOGa Clean Air for my space / clients.",
} as const;

/** Pre-filled WhatsApp click-to-chat link for a raw number. */
export function whatsappLink(number: string, message: string = site.whatsappMessage) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { label: "The System", href: "#concept" },
  { label: "Who It's For", href: "#who" },
  { label: "Spaces", href: "#spaces" },
  { label: "Why YOGa", href: "#why-yoga" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
] as const;

/**
 * What the product actually is — ventilation + purification, in plain terms.
 * Sourced from the brochure concept + comparison document.
 */
export const concept = {
  eyebrow: "The system",
  title: "Fresh air in, pollution out — ventilation and purification in one.",
  lead: "Think of the Y-CAB as a 'fresh air window'. It draws outdoor air through a duct in the wall, filters it through hospital-grade media, then pumps clean air in at slight positive pressure — creating a bubble that pushes polluted air out so it can't get back in.",
  pillars: [
    {
      title: "Fresh air",
      caption: "Ventilation",
      body: "Continuously brings in filtered outdoor air and flushes CO₂ — unlike purifiers that just recycle the same stale air.",
    },
    {
      title: "Constant purification",
      caption: "Filtration",
      body: "Medical-grade H14 HEPA + deep-bed activated carbon strip out PM2.5, VOCs, bacteria and viruses, 24/7.",
    },
    {
      title: "Your space",
      caption: "Positive pressure",
      body: "A slight positive pressure forms a protective clean-air bubble across the whole space — pollution simply cannot seep in.",
    },
  ],
  dual: [
    {
      kind: "Ventilation",
      title: "Ventilation — fresh air, in",
      points: [
        "Draws in fresh outdoor air at up to 500 CFM",
        "Positive pressure blocks polluted air from seeping through gaps",
        "Continuously flushes CO₂ for better sleep and focus",
        "Solves the stale-air problem room purifiers can't",
      ],
    },
    {
      kind: "Purification",
      title: "Purification — pollutants, out",
      points: [
        "Multi-stage H14 HEPA + deep-bed activated carbon",
        "99.5% efficient down to 0.3 µm — no ozone, no ionization",
        "Keeps indoor PM2.5 in the single digits (< 5 µg/m³)",
        "Filters guaranteed and serviced for 20+ years",
      ],
    },
  ],
} as const;

/** Every premium space the Y-CAB is designed for (brochure "Best For"). */
export const spaces = [
  { title: "Luxury Homes", body: "Whole-home clean air across 1,500 sq.ft per unit." },
  { title: "Schools", body: "Protect developing lungs across classrooms and floors." },
  { title: "Corporate Offices", body: "Lower CO₂ and PM2.5 for sharper, healthier teams." },
  { title: "Clinics & Hospitals", body: "Hospital-grade air where health matters most." },
  { title: "Gyms & Studios", body: "Clean, oxygen-rich air for people breathing hard." },
  { title: "Hospitality", body: "A memorable wellness signature guests can feel." },
] as const;

/** Headline stats — all verified in the brochure. */
export const heroStats = [
  { value: "< 5 µg/m³", label: "Indoor PM2.5", sub: "Single-digit guaranteed" },
  { value: "1,500 sq.ft", label: "Coverage per unit", sub: "Whole-space clean air" },
  { value: "500 CFM", label: "Fresh airflow", sub: "Filtered outdoor air" },
  { value: "99.99%", label: "Uptime", sub: "24/7 service SLA" },
] as const;

export const whyPartner = {
  eyebrow: "Why partner with PureHabitat",
  title: "The professionals who shape luxury spaces make the biggest impact.",
  lead: "You already serve affluent clients who care about wellness. Recommending YOGa Clean Air adds a signature upgrade to your projects — and one introduction can become qualified buyers for years.",
  points: [
    {
      title: "Serve clients who already value wellness",
      body: "Your clients invest in organic food and filtered water. Clean air is the natural next upgrade — introduced by someone they already trust: you.",
    },
    {
      title: "One introduction, many buyers",
      body: "A single professional relationship can introduce multiple qualified buyers over time — far more scalable than reaching homeowners one by one.",
    },
    {
      title: "Differentiate every project",
      body: "Hospital-grade clean air is a rare, memorable amenity that sets your work apart, gets talked about, and preserves the architecture with a ductless system.",
    },
    {
      title: "Zero operational burden",
      body: "You make the introduction; PureHabitat handles the IAQ consultation, installation and lifetime white-glove service. Your name stays on the relationship.",
    },
  ],
} as const;

/** High-value professional categories we build relationships with. */
export const targetProfessionals = [
  {
    title: "Interior Designers",
    body: "Add air your clients can feel to every space you style — a wellness layer that elevates the entire design.",
    image: "/img/leaf.jpg",
    alt: "Fresh green leaf with dew, representing clean air",
  },
  {
    title: "Architects",
    body: "Specify clean air into the build from day one. A ductless, minimal-duct system preserves ceiling heights and open volumes.",
    image: "/img/sky.jpg",
    alt: "Clear blue sky with soft clouds",
  },
  {
    title: "Luxury Builders & Developers",
    body: "Offer a premium, sellable amenity that differentiates your homes and delights buyers long after handover.",
    image: "/img/breathe.jpg",
    alt: "Person breathing calmly in fresh air",
  },
  {
    title: "Home Automation Companies",
    body: "Fold certified clean air into your smart-home stack as a high-margin, health-first upgrade clients ask for by name.",
    image: "/img/breeze.jpg",
    alt: "Soft breeze moving through the air",
  },
] as const;

/** Core YOGa advantages — from the brochure "ADVANTAGE" section. */
export const yogaBenefits = [
  {
    title: "Fresh outdoor air, not recycled stale air",
    body: "Room purifiers endlessly recirculate the same stale indoor air. YOGa continuously brings in fresh filtered outdoor air — solving both PM2.5 and CO₂ buildup simultaneously.",
  },
  {
    title: "Whole space — not just one room",
    body: "A single Y-CAB covers 1,500 sq.ft — an entire home, school floor or clinic. Every room breathes clean, not just the one with a purifier in the corner.",
  },
  {
    title: "IIT Delhi validated — real Indian data",
    body: "Independent IIT Delhi studies confirmed results in real Indian spaces. Golf Links: 2.82 µg/m³ indoor vs 561 outside — a verified 99.5% reduction, not a lab claim.",
  },
  {
    title: "Filters available for 20+ years",
    body: "YOGa guarantees parts and filters for 20+ years. Most consumer purifiers are obsolete in 2 years when filters go out of production.",
  },
] as const;

/** Verified installations — IIT Delhi study, from the brochure. */
export const verifiedResults = [
  { indoor: "2.82 µg/m³", reduction: "99.5%", place: "Golf Links Residence", outside: "561 µg/m³ outside" },
  { indoor: "4.53 µg/m³", reduction: "96%", place: "Vasant Vihar Home", outside: "118 µg/m³ outside" },
  { indoor: "1.63 µg/m³", reduction: "99%", place: "GD Goenka School", outside: "170 µg/m³ outside" },
] as const;

/** Three-way comparison: Room Purifier vs Standard ERV vs Y-CAB. */
export const comparison = {
  columns: ["Room Purifier", "Standard ERV", "Y-CAB System"] as const,
  rows: [
    {
      feature: "Air source",
      purifier: "Recirculates the same stale indoor air",
      erv: "Balanced exchange of indoor and outdoor air",
      ycab: "Continuously supplies fresh, filtered outdoor air",
    },
    {
      feature: "Pressure principle",
      purifier: "None — passive recirculation",
      erv: "Neutral / balanced pressure",
      ycab: "Positive pressure — forms a protective clean-air bubble",
    },
    {
      feature: "Pollution ingress (India)",
      purifier: "Untreated air keeps seeping through gaps",
      erv: "Fails — unfiltered air seeps through window & door gaps",
      ycab: "Blocked — indoor air pushes outward through any gap",
    },
    {
      feature: "CO₂ control",
      purifier: "None — CO₂ keeps building up",
      erv: "Partial via air exchange",
      ycab: "Continuously flushed with oxygenated fresh air",
    },
    {
      feature: "Coverage",
      purifier: "A single room",
      erv: "Whole home via extensive ductwork",
      ycab: "1,500 sq.ft whole-space per unit",
    },
    {
      feature: "Filtration",
      purifier: "Consumer-grade, obsolete in ~2 years",
      erv: "Thin filters that clog within weeks at Indian AQI",
      ycab: "Medical-grade H14 HEPA + deep-bed activated carbon",
    },
    {
      feature: "Architectural footprint",
      purifier: "Freestanding appliance in the room",
      erv: "Invasive dual ducts that lower ceiling heights",
      ycab: "Ductless / minimal-duct — preserves ceilings & aesthetics",
    },
    {
      feature: "Service model",
      purifier: "Replace the whole unit when filters end",
      erv: "Third-party trader, no long-term accountability",
      ycab: "White-glove managed service, 20+ year parts guarantee",
    },
  ],
} as const;

/** Technical specifications — from the brochure "TECHNICAL" section. */
export const techSpecs = [
  { label: "Airflow", value: "500 CFM max" },
  { label: "Coverage", value: "1,500 sq.ft per unit" },
  { label: "Power", value: "30–170 Watts" },
  { label: "Fan type", value: "EC fan — 10 speed levels" },
  { label: "Efficiency", value: "99.5% down to 0.3 µm" },
  { label: "Filter media", value: "Synthetic micropore + H14 HEPA" },
  { label: "Mounting", value: "Wall / floor / ceiling" },
  { label: "Dimensions", value: "580 × 350 × 380 mm" },
  { label: "Weight", value: "22 kg" },
  { label: "Ozone / ionization", value: "None — pure passive filtration" },
  { label: "Running cost", value: "≈ ₹400–500 / month, 24/7" },
  { label: "Best for", value: "Premium homes, schools, offices, clinics" },
] as const;

export const howItWorks = [
  {
    step: "01",
    title: "Become a partner",
    body: "Register in minutes. We onboard you, share the toolkit and brief you on the product so you can recommend with confidence.",
  },
  {
    step: "02",
    title: "Introduce a client",
    body: "Refer a client or project. Send us the space details and we take it from there — your name stays on the relationship.",
  },
  {
    step: "03",
    title: "We handle consultation",
    body: "Our team runs a free on-site Indoor Air Quality (IAQ) assessment and recommends the right YOGa solution for the space.",
  },
  {
    step: "04",
    title: "Installation",
    body: "A ductless or minimal-duct Y-CAB is installed cleanly, preserving the architecture and finishes of the project.",
  },
  {
    step: "05",
    title: "Earn & repeat",
    body: "Receive your referral reward, and we keep the system running with white-glove service. Then introduce the next project — one relationship, many opportunities.",
  },
] as const;

export const partnerBenefits = [
  {
    title: "Dedicated partner support",
    body: "A single point of contact for every referral, quote and installation — no chasing distributors.",
  },
  {
    title: "Technical guidance",
    body: "Load calculations, placement and specification support for your drawings and BOQs.",
  },
  {
    title: "Marketing resources",
    body: "Co-branded brochures, renders, comparison sheets and social assets ready to share with clients.",
  },
  {
    title: "Training & enablement",
    body: "Product and IAQ training so your team can speak to clean air with authority.",
  },
  {
    title: "Referral rewards",
    body: "A structured referral program that recognizes and rewards every successful installation.",
  },
  {
    title: "White-glove fulfilment",
    body: "PureHabitat owns consultation, install and lifetime service — you stay focused on design.",
  },
] as const;

export const resources = [
  {
    title: "YOGa Clean Air brochure",
    description: "The complete product overview — concept, health impact, verified results and specifications.",
    cta: "Download PDF",
    kind: "Brochure",
    href: "/downloads/yoga-clean-air-brochure.pdf",
    download: true,
  },
  {
    title: "Y-CAB vs ERV technical guide",
    description: "Why standard ERV systems fall short in Indian conditions and how the Y-CAB system is engineered differently.",
    cta: "Read the guide",
    kind: "Technical",
    href: "#why-yoga",
    download: false,
  },
  {
    title: "Partner FAQ",
    description: "Everything architects, designers and consultants ask before recommending YOGa to clients.",
    cta: "Browse FAQ",
    kind: "FAQ",
    href: "#faq",
    download: false,
  },
] as const;

export const faqs = [
  {
    q: "What exactly is the Clean Air Bubble?",
    a: "Think of it as a 'fresh air window'. The Y-CAB unit draws outdoor air through a duct in the wall, filters it through hospital-grade media, then pumps clean air in at slight positive pressure. This bubble pushes polluted air out — so pollution cannot enter.",
  },
  {
    q: "How is this different from a room air purifier?",
    a: "Room purifiers recirculate the same stale indoor air, cover a single room and do nothing for CO₂. YOGa continuously brings in fresh filtered outdoor air across 1,500 sq.ft and solves PM2.5 and CO₂ buildup simultaneously.",
  },
  {
    q: "Why not just use a standard ERV?",
    a: "Standard ERVs are engineered for sealed Western homes and run at neutral pressure, so polluted outdoor air seeps in through gaps in Indian construction. Their thin filters also clog within weeks at Indian AQI levels. Y-CAB uses positive pressure and medical-grade H14 HEPA + deep-bed carbon.",
  },
  {
    q: "Is the performance actually proven?",
    a: "Yes. Independent IIT Delhi studies verified results in real Indian spaces — for example the Golf Links residence measured 2.82 µg/m³ indoors versus 561 µg/m³ outside, a 99.5% reduction.",
  },
  {
    q: "Will it disrupt the architecture or ceiling heights?",
    a: "No. Y-CAB is a ductless or minimal-duct system with a compact footprint, unlike ERVs that require extensive dual ductwork and lower false ceilings.",
  },
  {
    q: "What does it cost to run?",
    a: "Approximately ₹400–500 per month running 24/7 — less than the cost of one coffee a day for hospital-grade clean air in every room.",
  },
  {
    q: "Is there any cost to become a partner?",
    a: "No. Joining the PureHabitat partner network is free. You introduce clients and projects; we handle everything else — and reward you for every successful referral.",
  },
  {
    q: "What support do partners get after referring a client?",
    a: "PureHabitat handles the free IAQ consultation, installation and lifetime white-glove maintenance with a 24/7 service SLA and 20+ year parts guarantee. You stay focused on your client relationship.",
  },
  {
    q: "Who is the ideal client for YOGa?",
    a: "Premium homes, schools, corporate offices, clinics, hospitals and gyms — and anyone with asthma, allergies, respiratory conditions or a focus on longevity and wellness.",
  },
] as const;

export const businessTypes = [
  "Interior Designer",
  "Architect",
  "Luxury Builder / Developer",
  "Home Automation Company",
  "Other",
] as const;
