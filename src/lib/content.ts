/**
 * Central content source for the PureHabitat site.
 *
 * All product claims are taken verbatim (or lightly condensed) from the
 * official YOGa Clean Air brochure and the "Y-CAB vs ERV" comparison
 * document. No claims are invented here — keep it that way.
 *
 * Terminology note: the word "partner" appears NOWHERE on this site. We only
 * build a **Referral Network** — professionals are *referrers* / *members*.
 * Our own relationship with YOGa is described as "authorized dealer", never
 * "channel partner", so nobody can read a partnership offer into the page.
 * If you are tempted to write "partner", write "referrer" or "dealer" instead.
 */

export const site = {
  name: "PureHabitat",
  tagline: "Purity for the places that matter most.",
  /** The product we are the authorized dealer for. */
  brand: "YOGa Clean Air",
  /** How we describe our own relationship to that brand. */
  authorization: "Authorized dealer",
  /** Name of the professional programme. */
  network: "Referral Network",
  coverage: "Serving across India",
  description:
    "PureHabitat is the authorized dealer for YOGa Clean Air. Interior designers, architects, luxury builders, home-automation and HVAC firms refer their clients and earn; homeowners, gyms, schools and clinics get a free on-site air-quality assessment. Installed and serviced across India.",
  url: "https://mypurehabitat.com",
  email: "hello@mypurehabitat.com",
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

/**
 * Nav hrefs are absolute, not bare hashes — the site is two pages now, so
 * "#faq" would silently do nothing when you are already on /technology.
 */
export const nav = [
  { label: "Work With Us", href: "/#work-with-us" },
  { label: "The System", href: "/#concept" },
  { label: "Projects", href: "/#projects" },
  { label: "Why YOGa", href: "/technology" },
  { label: "Where It Works", href: "/technology#spaces" },
  { label: "FAQ", href: "/technology#faq" },
] as const;

/** The two routes, in one place, so cross-page links stay consistent. */
export const routes = {
  home: "/",
  technology: "/technology",
  join: "/#join",
  assessment: "/#assessment",
} as const;

/** Header for the second page, and the band on the home page that links to it. */
export const technologyPage = {
  eyebrow: "Technology & proof",
  title: "The evidence behind the Clean Air Bubble.",
  lead: "Independent IIT Delhi measurements, a straight comparison against room purifiers and standard ERVs, and the full Y-CAB specification — everything you need before recommending it to a client or installing it in your own space.",
  crossLink: {
    eyebrow: "Go deeper",
    title: "Want the numbers, not the pitch?",
    body: "Verified IIT Delhi results, the Room Purifier vs ERV vs Y-CAB comparison, full technical specifications and the brochure — on one page.",
    cta: "See the technical proof",
  },
  backLink: {
    title: "Ready to talk?",
    body: "Refer your clients and earn on every install, or book a free on-site air-quality assessment for your own space.",
  },
} as const;

/** Headline proof points shown under the hero. */
export const heroStats = [
  { value: "< 5 µg/m³", label: "Indoor PM2.5", sub: "Single-digit guaranteed" },
  { value: "10+", label: "Spaces delivered", sub: "Homes, schools & clinics" },
  { value: "1,500 sq.ft", label: "Coverage per unit", sub: "Whole-space clean air" },
  { value: "Pan-India", label: "Install & service", sub: "Metros and beyond" },
] as const;

/** Hero headline, split so the second half can carry the brand gradient. */
export const hero = {
  headline: "The cleanest air",
  headlineAccent: "your space has ever breathed.",
  lead: "Designers, architects, builders, home-automation and HVAC firms refer their clients and earn on every install. Homeowners, gyms, schools and clinics get a free on-site air-quality assessment. Assessed, installed and serviced by PureHabitat across India.",
} as const;

/**
 * Real measured figures from the IIT Delhi study (Golf Links Residence) used
 * for the animated before/after readout in the hero. These are actual verified
 * numbers from the brochure — do NOT swap them for illustrative ones, and do
 * not present the readout as live data.
 */
export const aqiDemo = {
  source: "Verified · IIT Delhi study",
  place: "Golf Links Residence, Delhi",
  outside: { value: 561, label: "Outside", unit: "µg/m³" },
  inside: { value: 2.82, label: "Inside", unit: "µg/m³" },
  reduction: "99.5%",
} as const;

/**
 * Hero house-cutaway animation: the Y-CAB switches on and the rooms clear.
 *
 * The counters are an ILLUSTRATION, not measured data — the panel says so, and
 * carries the real verified figures underneath it. Do not relabel it as live
 * or measured, and do not claim a specific clearing time: `runSeconds` is
 * animation pacing, not a performance promise.
 */
export const airSim = {
  label: "Clean Air Bubble",
  badge: "Simulation",
  pm25: { from: 432, to: 3, label: "PM 2.5", unit: "µg/m³" },
  co2: { from: 2342, to: 480, label: "CO₂", unit: "ppm" },
  footnote:
    "Illustrative. Verified in a real home: 2.82 µg/m³ indoors vs 561 outside — IIT Delhi study.",
} as const;

/**
 * The two ways to work with PureHabitat. This is the primary fork in the page:
 * professionals earn on referrals, end clients get a free assessment instead.
 */
export const tracks = {
  eyebrow: "Work with us",
  title: "Two ways to bring clean air into a space.",
  lead: "Recommend YOGa to the clients you already serve — or get it installed in your own home, gym, school or clinic. Pick the path that fits you.",
  refer: {
    key: "refer",
    kicker: "For professionals",
    title: "Refer your clients, earn on every install",
    body: "Interior designers, architects, luxury builders, home-automation and HVAC firms join the PureHabitat Referral Network. You make the introduction — we handle the assessment, installation and lifetime service, and you earn a reward on every completed project.",
    points: [
      "Free to join — no cost, no targets, no exclusivity",
      "Referral reward on every completed installation",
      "Free on-site air-quality assessment for your client",
      "Your name stays on the client relationship",
    ],
    cta: "Join the Referral Network",
    href: "#join",
  },
  own: {
    key: "own",
    kicker: "For your own space",
    title: "Get clean air in the space you own",
    body: "Homeowners, gym and studio owners, school and hospital managements — you don't need to refer anyone. Book a free on-site Indoor Air Quality assessment and we'll show you exactly what you're breathing, then quote a system sized for your space.",
    points: [
      "Free on-site IAQ assessment — no obligation",
      "Live before/after PM2.5 demo in your own space",
      "Sized, quoted and installed for your floor plan",
      "White-glove service with a 20+ year parts guarantee",
    ],
    cta: "Book a free assessment",
    href: "#assessment",
  },
} as const;

/**
 * What the product actually is — ventilation + purification, in plain terms.
 * Sourced from the brochure concept + comparison document.
 */
export const concept = {
  eyebrow: "The system",
  title: "Fresh air in, pollution out — ventilation and purification in one.",
  lead: "Think of the Y-CAB as a 'fresh air window'. It draws outdoor air through a duct in the wall, filters it through medical-grade media, then pumps clean air in at slight positive pressure — creating a bubble that pushes polluted air out so it can't get back in.",
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

/**
 * Completed-projects showcase.
 *
 * Video source resolution (first match wins) — see README "Adding the site video":
 *   1. NEXT_PUBLIC_SHOWCASE_YOUTUBE_ID  → click-to-load YouTube embed
 *   2. /video/showcase.mp4              → self-hosted file in public/video/
 */
export const projects = {
  eyebrow: "Completed projects",
  title: "10+ spaces already breathing clean air.",
  lead: "Homes, schools and clinics with the Clean Air Bubble installed and running — designed, installed and serviced by PureHabitat across India.",
  videoSrc: "/video/showcase.mp4",
  videoPoster: "/img/showcase-poster.jpg",
  videoLabel: "Walkthrough of a completed PureHabitat installation",
  stats: [
    { value: "10+", label: "Spaces delivered" },
    { value: "Pan-India", label: "Install & service" },
    { value: "24/7", label: "Running, monitored" },
    { value: "20+ yrs", label: "Parts guarantee" },
  ],
  /** Service coverage — where we install and service, not a list of completed sites. */
  cities: [
    "Mumbai",
    "Delhi NCR",
    "Bengaluru",
    "Hyderabad",
    "Ahmedabad",
    "Pune",
    "Chennai",
    "Kolkata",
    "Surat",
    "Jaipur",
    "Chandigarh",
    "Goa",
    "Lucknow",
    "Indore",
  ],
} as const;

/** Editorial "brand moment" band — pairs the moodboard with the brand promise. */
export const brandMoment = {
  eyebrow: "The promise",
  title: "Cleaner air. Healthier habitat.",
  lead: "PureHabitat exists for one reason: to make the air inside the places you design, build and live in as pure as it can be. Not a gadget in the corner — a whole-space upgrade you feel the moment you walk in.",
  image: "/img/moodboard.jpg",
  alt: "PureHabitat moodboard — cleaner air, healthy habitat, pure living, breathe better",
} as const;

/** Every premium space the Y-CAB is designed for (brochure "Best For"). */
export const spaces = [
  { title: "Luxury Homes", body: "Whole-home clean air across 1,500 sq.ft per unit." },
  { title: "Schools", body: "Protect developing lungs across classrooms and floors." },
  { title: "Corporate Offices", body: "Lower CO₂ and PM2.5 for sharper, healthier teams." },
  { title: "Clinics & Hospitals", body: "The cleanest air possible, where health matters most." },
  { title: "Gyms & Studios", body: "Clean, oxygen-rich air for people breathing hard." },
  { title: "Hospitality", body: "A memorable wellness signature guests can feel." },
] as const;

export const whyRefer = {
  eyebrow: "Why refer",
  title: "The professionals who shape luxury spaces make the biggest impact.",
  lead: "You already serve clients who care about wellness. Recommending YOGa Clean Air adds a signature upgrade to your projects — and one introduction can become qualified buyers for years.",
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
      body: "Air this clean is a rare, memorable amenity that sets your work apart, gets talked about, and preserves the architecture with a ductless system.",
    },
    {
      title: "Zero operational burden",
      body: "You make the introduction; PureHabitat handles the IAQ assessment, installation and lifetime white-glove service. Your name stays on the relationship.",
    },
  ],
} as const;

/** High-value professional categories we build the Referral Network from. */
export const targetProfessionals = [
  {
    tag: "Design",
    title: "Interior Designers",
    body: "Add air your clients can feel to every space you style — a wellness layer that elevates the entire design.",
    image: "/img/interior.jpg",
    alt: "Styled luxury living room with plants and a designer armchair",
  },
  {
    tag: "Specify",
    title: "Architects",
    body: "Specify clean air into the build from day one. A ductless, minimal-duct system preserves ceiling heights and open volumes.",
    image: "/img/architect.jpg",
    alt: "Architects reviewing building blueprints with a ruler and pen",
  },
  {
    tag: "Build",
    title: "Luxury Builders & Developers",
    body: "Offer a premium, sellable amenity that differentiates your homes and delights buyers long after handover.",
    image: "/img/builder.jpg",
    alt: "High-rise buildings under construction with tower cranes",
  },
  {
    tag: "Integrate",
    title: "Home Automation Companies",
    body: "Fold certified clean air into your smart-home stack as a high-margin, health-first upgrade clients ask for by name.",
    image: "/img/automation.jpg",
    alt: "Smart-home devices controlled from a phone — lights and camera",
  },
] as const;

/**
 * Trades without a dedicated photo card — shown as a compact strip so HVAC,
 * MEP and PMC firms can see themselves on the page too.
 */
export const alsoForProfessionals = [
  "HVAC Companies",
  "MEP Consultants",
  "PMC & Project Managers",
  "Turnkey Contractors",
  "Real Estate Consultants",
  "Facility Management Firms",
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
  { label: "Efficiency", value: "99.5% down to 0.3 µm" },
  { label: "Filter media", value: "Synthetic micropore + H14 HEPA" },
  { label: "Fan type", value: "EC fan — 10 speed levels" },
  { label: "Mounting", value: "Wall / floor / ceiling" },
  { label: "Dimensions", value: "580 × 350 × 380 mm" },
  { label: "Running cost", value: "≈ ₹400–500 / month, 24/7" },
] as const;

/**
 * How it works — the flow differs by audience, so each track gets its own
 * numbered path rather than one flow that only makes sense for professionals.
 */
export const howItWorks = {
  eyebrow: "How it works",
  title: "A short, transparent path — whichever side you're on.",
  lead: "Same team, same white-glove service. Only the first step changes.",
  refer: [
    {
      step: "01",
      title: "Join the network",
      body: "Register in minutes. We onboard you, share the toolkit and brief you on the product so you can recommend with confidence.",
    },
    {
      step: "02",
      title: "Introduce a client",
      body: "Send us the client or project details. Your name stays on the relationship throughout.",
    },
    {
      step: "03",
      title: "We assess the space",
      body: "Our team runs a free on-site Indoor Air Quality assessment and recommends the right YOGa system.",
    },
    {
      step: "04",
      title: "We install",
      body: "A ductless or minimal-duct Y-CAB is installed cleanly, preserving the architecture and finishes.",
    },
    {
      step: "05",
      title: "You earn, we service",
      body: "You receive your referral reward; we keep the system running with white-glove service. Then introduce the next project.",
    },
  ],
  own: [
    {
      step: "01",
      title: "Tell us about your space",
      body: "Share the type of space, city and rough area. Takes under a minute — no cost, no commitment.",
    },
    {
      step: "02",
      title: "Free on-site assessment",
      body: "We visit, measure your actual indoor PM2.5 and CO₂, and show you what you and your family are breathing.",
    },
    {
      step: "03",
      title: "See the difference live",
      body: "A live before/after demo in your own space — watch the numbers drop, no sales deck required.",
    },
    {
      step: "04",
      title: "Sized quote & install",
      body: "A system sized for your floor plan, installed cleanly around your interiors and finishes.",
    },
    {
      step: "05",
      title: "We keep it running",
      body: "White-glove maintenance, filter service and a 20+ year parts guarantee. You just breathe.",
    },
  ],
} as const;

/** What Referral Network members get. */
export const networkBenefits = [
  {
    title: "A named point of contact",
    body: "One person handling every referral, quote and installation — no chasing distributors.",
  },
  {
    title: "Technical guidance",
    body: "Load calculations, placement and specification support for your drawings and BOQs.",
  },
  {
    title: "Client-ready collateral",
    body: "Co-branded brochures, renders, comparison sheets and social assets ready to share.",
  },
  {
    title: "Training & enablement",
    body: "Product and IAQ training so your team can speak to clean air with authority.",
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
    title: "Questions, answered",
    description: "Everything architects, designers, consultants and homeowners ask before choosing YOGa.",
    cta: "Browse FAQ",
    kind: "FAQ",
    href: "#faq",
    download: false,
  },
] as const;

export const faqs = [
  {
    q: "What exactly is the Clean Air Bubble?",
    a: "Think of it as a 'fresh air window'. The Y-CAB unit draws outdoor air through a duct in the wall, filters it through medical-grade media, then pumps clean air in at slight positive pressure. This bubble pushes polluted air out — so pollution cannot enter.",
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
    q: "Do you install outside the metros?",
    a: "Yes. PureHabitat installs and services across India. Share your city when you enquire and we'll confirm the site-visit schedule for your location.",
  },
  {
    q: "I'm a homeowner / gym owner / school — can I just buy one?",
    a: "Absolutely. You don't need to be part of the Referral Network. Choose 'For my own space' on the enquiry form and we'll arrange a free on-site Indoor Air Quality assessment, show you a live before/after demo, and quote a system sized for your floor plan.",
  },
  {
    q: "What does the free assessment involve?",
    a: "A technician visits your space, measures actual indoor PM2.5 and CO₂ against outdoor levels, and walks you through the readings. There is no cost and no obligation to buy.",
  },
  {
    q: "Will it disrupt the architecture or ceiling heights?",
    a: "No. Y-CAB is a ductless or minimal-duct system with a compact footprint, unlike ERVs that require extensive dual ductwork and lower false ceilings.",
  },
  {
    q: "What does it cost to run?",
    a: "Approximately ₹400–500 per month running 24/7 — less than the cost of one coffee a day for the cleanest air possible in every room.",
  },
  {
    q: "Is there any cost to join the Referral Network?",
    a: "No. Joining is free, with no targets and no exclusivity. You introduce clients and projects; we handle everything else — and reward you for every completed installation.",
  },
  {
    q: "What support do members get after referring a client?",
    a: "PureHabitat handles the free IAQ assessment, installation and lifetime white-glove maintenance with a 24/7 service SLA and 20+ year parts guarantee. You stay focused on your client relationship.",
  },
] as const;

/** Professional categories — the "I refer clients" branch of the enquiry form. */
export const professions = [
  "Interior Designer",
  "Architect",
  "Luxury Builder / Developer",
  "Home Automation Company",
  "HVAC Company",
  "MEP / PMC Consultant",
  "Real Estate Consultant",
  "Other",
] as const;

/** Space categories — the "for my own space" branch of the enquiry form. */
export const spaceTypes = [
  "Home / Villa / Apartment",
  "Gym / Fitness Studio",
  "School / Preschool",
  "Hospital / Clinic",
  "Corporate Office",
  "Hotel / Hospitality",
  "Other",
] as const;
