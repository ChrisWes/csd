// ============================================================
// NashTech CSD Survey 2026 — Data Store
// Source: "Differentiating Through Custom Software", NashTech 2026 UK
// Commissioned from Vanson Bourne. N=1,000 senior technology leaders.
// 6 territories. Organisations: 500–9,999 employees.
// ============================================================

export const meta = {
  title: "Differentiating Through Custom Software",
  subtitle: "NashTech 2026 UK",
  publishYear: 2026,
  respondents: 1000,
  territories: 6,
  researchPartner: "Vanson Bourne",
  organisationSizeRange: "500–9,999 employees",
  audiences: {
    enterprises: 850,
    isvs: 150,
  },
  reportUrl: "https://www.nashtechglobal.com/our-thinking/reports/differentiating-through-custom-software/",
};

// ============================================================
// HEADLINE STATS — the numbers that open conversations
// ============================================================

export const headlines = [
  {
    id: "custom-preference",
    stat: 70,
    unit: "%",
    label: "favour custom software over off-the-shelf for competitive differentiation",
    theme: "differentiation",
    personaRelevance: ["ceo", "cio", "cto"],
  },
  {
    id: "ai-adoption",
    stat: 85,
    unit: "%",
    label: "have adopted or will adopt AI within the next 12 months",
    theme: "ai",
    personaRelevance: ["ceo", "cio", "cto", "cdo"],
  },
  {
    id: "ai-impact",
    stat: 75,
    unit: "%",
    label: "expect AI to have a significant positive impact on custom software",
    theme: "ai",
    personaRelevance: ["ceo", "cio", "cdo"],
  },
  {
    id: "offshore-use",
    stat: 92,
    unit: "%",
    label: "use offshore partners for custom software development",
    theme: "offshore",
    personaRelevance: ["ceo", "cfo", "cio"],
  },
  {
    id: "offshore-outcomes",
    stat: 99,
    unit: "%",
    label: "of those using offshore partners report measurably better outcomes",
    theme: "offshore",
    personaRelevance: ["ceo", "cfo", "cio"],
  },
  {
    id: "resourcing-concerns",
    stat: 97,
    unit: "%",
    label: "report resourcing concerns for custom software delivery",
    theme: "people",
    personaRelevance: ["ceo", "cio", "cto", "architect"],
  },
  {
    id: "strategic-partners",
    stat: 32,
    unit: "%",
    label: "classify their development partner as truly strategic",
    theme: "partnerships",
    personaRelevance: ["ceo", "cio"],
  },
  {
    id: "would-invest-strategic",
    stat: 97,
    unit: "%",
    label: "would invest more in a partner who consistently delivers long-term value",
    theme: "partnerships",
    personaRelevance: ["ceo", "cio", "cfo"],
  },
  {
    id: "quality-purchase-driver",
    stat: 57,
    unit: "%",
    label: "cite engineering quality as the most compelling purchase factor when selecting a CSD partner",
    theme: "quality",
    personaRelevance: ["cio", "cto", "architect"],
  },
];

// ============================================================
// THEME 1 — It's the differentiation layer
// WHY organisations build custom vs buy COTS
// ============================================================

export const buildDrivers = {
  question: "What factors lead your organisation to develop or customise software rather than purchase a COTS product?",
  note: "Multiple responses permitted",
  data: [
    { label: "Better integration with existing systems", value: 44 },
    { label: "Greater control over roadmap / feature development", value: 43 },
    { label: "Better user or customer experience", value: 42 },
    { label: "Security, regulatory or data sovereignty concerns", value: 42 },
    { label: "Unique business processes off-the-shelf can't support", value: 39 },
    { label: "Need to differentiate or innovate", value: 37 },
    { label: "Rapid prototyping or flexibility for experimentation", value: 36 },
    { label: "COTS solutions too costly or too rigid over time", value: 32 },
    { label: "Generally prefer to buy off-the-shelf", value: 30 },
  ],
};

// Integration driver breakdown by industry
export const integrationByIndustry = {
  question: "% citing integration as a reason to build custom, by sector",
  data: [
    { label: "IT & technology", value: 61 },
    { label: "Consumer packaged goods", value: 57 },
    { label: "Manufacturing", value: 53 },
    { label: "Logistics", value: 43 },
  ],
};

// ============================================================
// THEME 2 — Integration is a universal pain point
// ============================================================

export const integrationStats = [
  { stat: 44, label: "choose custom software because it offers better integration with existing systems" },
  { stat: 40, label: "say integration is their biggest challenge in CSD" },
  { stat: 43, label: "see legacy integration as a major hurdle for adopting agentic AI" },
  { stat: 16, label: "cite integration as a leading concern when working with software partners" },
  { stat: 47, label: "say integration with legacy systems could impact compliance" },
];

// ============================================================
// THEME 3 — AI ambition vs operational readiness
// ============================================================

export const aiAdoption = {
  adoptingAI: 85,         // % adopting or will adopt AI within 12 months
  aiGovernance: 75,       // % adopting AI governance in parallel
  positiveImpact: 75,     // % expecting significant positive impact on CSD
};

export const aiBlockers = {
  question: "What challenges does your organisation face in adopting generative or agentic AI?",
  data: [
    { label: "Limited in-house expertise", value: 43 },
    { label: "Lack of integration with existing systems", value: 43 },
    { label: "Access to scalable infrastructure / MLOps", value: 38 },
    { label: "Agentic AI expertise gap specifically", value: 35 },
  ],
};

export const aiStackInvestment = {
  question: "Which layers of the evolving AI technology stack are you prioritising for investment or transformation in the next 12–24 months?",
  data: [
    { label: "Model layer (foundation models, MLOps, domain-specific SLMs)", value: 24 },
    { label: "Application layer (generative & agentic AI, agent-based systems)", value: 21 },
    { label: "Data layer (data lakes, vector databases, semantic layers)", value: 20 },
    { label: "Integration layer (APIs, orchestration, observability)", value: 16 },
    { label: "Security & governance layer (responsible AI, compliance)", value: 14 },
    { label: "Still evaluating", value: 4 },
  ],
};

// ============================================================
// THEME 4 — People are the real bottleneck
// ============================================================

export const peopleStats = [
  { stat: 97, label: "report resourcing concerns for CSD" },
  { stat: 43, label: "point to limited internal expertise to maintain or scale a custom software solution" },
  { stat: 35, label: "say their organisation lacks internal expertise in agentic AI specifically" },
  { stat: 55, label: "use hybrid internal/external teams as primary model" },
  { stat: 52, label: "rely on external partners to fill capability gaps" },
];

// ============================================================
// THEME 5 — The perception gap
// ============================================================

export const perceptionGap = {
  seniorLeadersExceeded: 63,   // % of C-suite / board who say projects exceeded expectations
  midLevelExceeded: 39,        // % of delivery managers who say same
  gap: 24,                     // percentage point gap
  midLevelScopeCreep: 36,      // % of mid-level managers reporting scope creep
  midLevelIntegrationIssues: 46, // % of mid-level pointing to integration challenges
};

export const roiByOrgSize = [
  {
    segment: "Smaller organisations (500–999 employees)",
    primaryMetric: "Cost reduction",
    primaryPct: 58,
    secondaryMetric: "Productivity improvements",
    secondaryPct: 47,
  },
  {
    segment: "Larger organisations (5,000–9,999 employees)",
    primaryMetric: "Productivity improvements",
    primaryPct: 61,
    secondaryMetric: "Cost reduction",
    secondaryPct: 47,
  },
];

export const strategicAlignment = {
  question: "How does your organisation ensure CSD projects align with strategic business priorities?",
  note: "Summary: 100% of organisations report their CSD projects are aligned with strategic business priorities",
  data: [
    { label: "Cross-functional teams involved to ensure alignment", value: 56 },
    { label: "Performance metrics / KPIs tied to strategic goals", value: 54 },
    { label: "Projects must connect to customer experience improvement", value: 53 },
    { label: "Executive sponsorship from business leaders outside IT", value: 50 },
    { label: "Direct mapping to strategic plan objectives", value: 48 },
    { label: "Regular input from leadership or board members", value: 46 },
  ],
};

// ============================================================
// THEME 6 — Governance and risk management
// ============================================================

export const governanceStats = [
  { stat: 49, label: "have concerns about data privacy across systems" },
  { stat: 49, label: "have a detailed risk register with mitigation strategies" },
  { stat: 48, label: "see third parties handling sensitive data as high risk" },
  { stat: 46, label: "have a dedicated business sponsor with decision authority" },
];

// ============================================================
// THEME 7 — Quality wins, even when speed matters
// ============================================================

export const qualityVsSpeed = {
  bothSpeedAndQuality: 46,  // % aiming for both
  qualityFirst: 47,         // % choosing quality when pressed (board/C-suite leaders)
  qualityDrivesPurchase: 57, // % citing engineering quality as #1 purchase factor
  retailQualityPriority: 57, // % in retail sector prioritising quality
};

// ============================================================
// THEME 8 — Partners: from tactical to strategic
// ============================================================

export const partnerClassification = {
  question: "Which best describes your organisation's current relationship with your third-party software development provider?",
  data: [
    { label: "Strategic partner", description: "Closely aligned with long-term goals, involved in high-value initiatives", value: 32 },
    { label: "Trusted delivery partner", description: "Consistent support for ongoing or repeatable development work", value: 47 },
    { label: "Project-based provider", description: "Brought in for specific, time-bound projects", value: 14 },
    { label: "Tactical support", description: "Used occasionally to fill short-term resource or skills gaps", value: 7 },
  ],
};

export const partnerByOrgSize = [
  { segment: "Smaller enterprises (500–999 employees)", strategicPct: 28 },
  { segment: "Larger enterprises (5,000–9,999 employees)", strategicPct: 45 },
];

export const partnerAspiration = {
  wouldInvestMore: 97, // % who would invest more in a partner delivering long-term value
};

// ============================================================
// THEME 9 — The offshore reality check
// ============================================================

export const offshoreStats = {
  useOffshore: 92,
  reportBetterOutcomes: 99,
};

export const offshoreOutcomes = {
  question: "Since partnering with an offshore development team, which outcomes have improved?",
  note: "Base: Organisations using offshore partners",
  data: [
    { label: "Increased innovation and faster delivery of new features", value: 51 },
    { label: "Higher software quality and reliability", value: 49 },
    { label: "Greater team scalability and flexibility", value: 49 },
    { label: "Stronger business continuity and resilience", value: 43 },
    { label: "Improved customer satisfaction", value: 41 },
    { label: "Development cost control", value: 39 },
    { label: "Product delivery speed", value: 39 },
    { label: "Nothing has improved", value: 1 },
  ],
};

// ============================================================
// PERSONA MESSAGING
// Tailored framing of the same data for different audiences
// ============================================================

export const personas = {
  ceo: {
    id: "ceo",
    label: "CEO",
    headline: "Custom software is now a competitive moat, not a cost centre",
    insight: "70% of your peers have shifted to custom software as their primary differentiation mechanism. The organisations still treating it as an IT procurement decision are ceding ground to those treating it as a strategic one. The question is not whether to build — it's whether your operating model can sustain what building requires.",
    keyStats: [
      { stat: 70, label: "favour custom over COTS for differentiation" },
      { stat: 97, label: "would invest more in a genuinely strategic partner" },
      { stat: 32, label: "currently have one" },
    ],
    provocation: "If your software strategy and your business strategy are in separate decks, that's your first problem.",
  },
  cfo: {
    id: "cfo",
    label: "CFO",
    headline: "The 24-point gap is where your ROI disappears",
    insight: "63% of C-suite leaders report their custom software projects exceeded expectations. Only 39% of the people actually delivering that work agree. That 24-point gap is not optimism — it's where value leaks, undetected, because success is being measured differently at every level of the organisation. ROI is not a one-off calculation at project sign-off. It is an evergreen model.",
    keyStats: [
      { stat: 63, label: "of senior leaders say projects exceeded expectations" },
      { stat: 39, label: "of delivery managers agree" },
      { stat: 24, label: "percentage point gap — where ROI quietly leaks" },
    ],
    provocation: "Are your leaders and delivery teams measuring success the same way, or just assuming they are?",
  },
  cio: {
    id: "cio",
    label: "CIO / CTO",
    headline: "Integration is driving demand and blocking delivery simultaneously",
    insight: "44% of organisations choose custom software specifically because it integrates better with their existing systems. 40% of those same organisations name integration complexity as their biggest delivery challenge. The same force is fuelling the demand and throttling the execution. Legacy architecture is no longer a background concern — it is the primary constraint on AI adoption, delivery speed, and partnership effectiveness.",
    keyStats: [
      { stat: 44, label: "build custom for better integration" },
      { stat: 40, label: "say integration is their biggest CSD challenge" },
      { stat: 43, label: "see legacy integration as a major AI hurdle" },
    ],
    provocation: "How easily can data flow between your five most business-critical systems today — and how confident are you layering AI on top of them tomorrow?",
  },
  cdo: {
    id: "cdo",
    label: "CDO",
    headline: "AI ambition is near-universal. AI readiness is not.",
    insight: "85% of organisations are moving on AI. But skills gaps, infrastructure shortfalls, and integration debt are compressing real-world timelines. 75% are building governance alongside their AI programmes — which means 25% are not. AI amplifies what is already in place, good or bad. The data foundation, the MLOps capability, and the governance framework are not preparatory steps. They are the delivery mechanism.",
    keyStats: [
      { stat: 85, label: "adopting or planning AI within 12 months" },
      { stat: 75, label: "building AI governance in parallel" },
      { stat: 43, label: "cite skills gaps as the primary AI blocker" },
    ],
    provocation: "Are you building AI on a foundation that can hold it, or on one that AI will expose?",
  },
  architect: {
    id: "architect",
    label: "Senior Architect",
    headline: "Technical debt is no longer serviceable. It has become structural risk.",
    insight: "Integration problems appear at every layer of this survey — as the primary reason to build custom, the primary delivery blocker, and the primary obstacle to AI adoption. Legacy systems, fragmented data, brittle point-to-point connections and inconsistent API coverage are not technical hygiene issues. They are the main reason AI initiatives stall, offshore collaboration gets complicated, and scope creep rates are double what boards expect.",
    keyStats: [
      { stat: 40, label: "cite integration as the top CSD delivery blocker" },
      { stat: 43, label: "see legacy integration as a major agentic AI hurdle" },
      { stat: 47, label: "say legacy integration could impact compliance" },
    ],
    provocation: "Are you treating integration as a strategic programme or a series of tactical fixes? The survey data suggests the latter is far more common — and far more expensive.",
  },
};

// ============================================================
// QUOTES — verbatim from report respondents
// ============================================================

export const quotes = [
  {
    id: "q1",
    text: "The time to build software is when it gives you an advantage in a competitive market. We build our business around industry best standards — so what tips the balance is commercial needs rather than what a supplier can offer us.",
    role: "IT Leader",
    location: "North West, UK",
    theme: "differentiation",
  },
  {
    id: "q2",
    text: "A lot of legacy COTS solutions aren't adequate for today's AI-first world. They don't give you access to the data and the data often isn't structured in a way that allows you to layer AI on top of it.",
    role: "IT Leader",
    location: "North West, UK",
    theme: "integration",
  },
  {
    id: "q3",
    text: "Instead of just 'implementing AI', we are focusing on the use cases, both internally and externally and meeting with our customers to find out exactly what they are looking for.",
    role: "Head of Software Development",
    location: "US",
    theme: "ai",
  },
  {
    id: "q4",
    text: "Misalignment between business goals and technical implementation usually happens when stakeholders and technical teams interpret objectives differently. This leads to mismatched deliverables.",
    role: "Survey respondent",
    location: null,
    theme: "perception",
  },
  {
    id: "q5",
    text: "We see our custom software providers as partners — they have to be part of our team. It's more productive and it creates transparency too.",
    role: "IT Leader",
    location: "US",
    theme: "partnerships",
  },
  {
    id: "q6",
    text: "What we ultimately look for is a custom software partner who understands us. They need a deep understanding of who we are, including our values and ethos.",
    role: "Ross Bray, IT and Operational Senior Manager",
    location: "Velociti, UK",
    theme: "partnerships",
  },
  {
    id: "q7",
    text: "We work with technical partners in two different ways. The first is where they are embedded in our teams and we treat them like our employees. This is what we have with NashTech's offshore development team. It works well and it's got us to where we are today.",
    role: "Matt Pilcer, CTO",
    location: "Unified, US",
    theme: "offshore",
  },
];

// ============================================================
// THEMES — the 10 key themes from the report
// ============================================================

export const themes = [
  { id: 1, slug: "differentiation", title: "It's the differentiation layer", shortTitle: "Differentiation" },
  { id: 2, slug: "ai-native", title: "From traditional to AI-native", shortTitle: "AI-native" },
  { id: 3, slug: "integration", title: "Integration is a universal pain point", shortTitle: "Integration" },
  { id: 4, slug: "ai-readiness", title: "AI ambition versus operational readiness", shortTitle: "AI readiness" },
  { id: 5, slug: "people", title: "People are the real bottleneck", shortTitle: "People" },
  { id: 6, slug: "perception", title: "The perception gap is real (and costly)", shortTitle: "Perception gap" },
  { id: 7, slug: "governance", title: "Governance and risk management are not optional", shortTitle: "Governance" },
  { id: 8, slug: "quality", title: "Quality wins, even when speed matters", shortTitle: "Quality" },
  { id: 9, slug: "partnerships", title: "Partners are shifting from tactical to strategic", shortTitle: "Partnerships" },
  { id: 10, slug: "offshore", title: "The offshore reality check", shortTitle: "Offshore" },
];

// ============================================================
// INDUSTRY HIGHLIGHTS — sector-specific angles
// ============================================================

export const industryHighlights = [
  {
    sector: "Insurance",
    keyFindings: [
      "Legacy integration is a persistent blocker",
      "High sensitivity to security, governance, and risk",
      "AI ambition tempered by compliance reality",
    ],
    salesAngle: "Custom software enables insurers to modernise without destabilising regulated environments.",
  },
  {
    sector: "Consumer / Retail",
    keyFindings: [
      "Integration a top driver (57% in consumer packaged goods)",
      "Differentiation and speed to market are critical",
      "COTS often too rigid or expensive (42%)",
    ],
    salesAngle: "Custom software is how consumer brands compete on experience, speed, and flexibility.",
  },
  {
    sector: "Logistics",
    keyFindings: [
      "Integration challenges are widespread (43%)",
      "Data fragmentation undermines AI and automation",
      "Resilience and continuity are increasingly critical",
    ],
    salesAngle: "Supply chains don't fail because of strategy — they fail because systems don't talk.",
  },
  {
    sector: "Education",
    keyFindings: [
      "Capability gaps and funding pressure are real",
      "Need for scalable, secure platforms",
      "Adoption and change management are as important as technology",
    ],
    salesAngle: "Success depends on operating models, not just platforms.",
  },
  {
    sector: "Manufacturing",
    keyFindings: [
      "Unique processes are a strong build driver (58%)",
      "Integration a top concern",
      "Offshore outcomes strongest in this sector",
    ],
    salesAngle: "Where processes are proprietary, software must be too.",
  },
];

// ============================================================
// NASHTECH POSITIONING — how NashTech maps to survey findings
// ============================================================

export const nashtechPositioning = {
  tagline: "Building the future of software through AI-first engineering",
  engineers: 2400,
  yearsExperience: 25,
  deliveryCentres: ["Vietnam", "India"],
  pillars: [
    {
      id: "inference",
      title: "Inference efficiency",
      description: "Running AI agents efficiently — scope containment, model tier selection, prompt architecture — so clients pay for value, not compute waste.",
    },
    {
      id: "integration",
      title: "Integration as strategy",
      description: "API-led architecture, integration accelerators, and AI-ready data foundations — treating integration as a long-term capability, not a series of tactical fixes.",
    },
    {
      id: "offshore",
      title: "Embedded offshore model",
      description: "Long-lived, stable squads aligned to specific products. Same standards, governance frameworks, and quality metrics as onshore teams. Cultural alignment is not a nice-to-have.",
    },
    {
      id: "advisory",
      title: "CIO-level advisory",
      description: "Strategic guidance alongside hands-on delivery. Business process analysis, data strategy, and technology advisory for under-resourced IT functions.",
    },
  ],
};
