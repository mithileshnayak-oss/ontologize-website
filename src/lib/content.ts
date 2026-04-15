// Site-wide copy extracted from aavya_website_content_v2.docx
export const site = {
  name: "ontology.aavya",
  domain: "ontology.aavya.com",
  parentBrand: "Aavya",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/training", label: "Training" },
  { href: "/consulting", label: "Consulting" },
  { href: "/blog", label: "Blog" },
];

export const industries = [
  {
    title: "Defense & Intelligence",
    body: "Mission-critical data operations under the most demanding security and governance requirements.",
    ontology: "Federated Ontology with dynamic access control.",
  },
  {
    title: "Manufacturing & Supply Chain",
    body: "Real-time visibility from raw input to finished output, at scale.",
    ontology: "Real-time asset and process Ontology.",
  },
  {
    title: "Financial Services",
    body: "Risk, compliance, and fraud detection frameworks built for institutional-grade reliability.",
    ontology: "Transaction and entity Ontology with full audit trail.",
  },
  {
    title: "Healthcare & Life Sciences",
    body: "Patient data integration, clinical operations, and regulatory reporting that meets the standard.",
    ontology: "Clinical Ontology with embedded privacy controls.",
  },
  {
    title: "Energy & Utilities",
    body: "Predictive asset management, grid optimization, and operational continuity under pressure.",
    ontology: "Asset and event Ontology at field scale.",
  },
  {
    title: "Government & Public Sector",
    body: "Inter-agency data sharing, program management, and operational intelligence that serves the public.",
    ontology: "Shared Ontology with multi-organization governance.",
  },
];

export const services = [
  {
    slug: "ontology-strategy",
    number: "01",
    title: "Ontology Strategy & Design",
    tagline:
      "The right architecture changes everything. The wrong one costs you years.",
    summary:
      "The Palantir Ontology is the semantic and operational model of your entire business — the layer that connects raw data to decisions, and determines the ceiling on every capability you will ever build in Foundry.",
    hard: "Most Ontology failures are not visible at design time. They surface twelve months into production — when structures that looked clean become query bottlenecks at three hundred million objects.",
    deliverables: [
      "Business entity mapping and semantic layer design anchored to your operational model",
      "Object, link, and action type architecture with complete governance documentation",
      "Ontology health assessment with a prioritized remediation roadmap",
      "Integration architecture connecting Ontology to upstream sources and downstream apps",
      "Scalability review ensuring your design supports future expansion",
    ],
  },
  {
    slug: "foundry-implementation",
    number: "02",
    title: "Palantir Foundry Implementation",
    tagline: "From design decision to production deployment — no shortcuts.",
    summary:
      "Our teams are not generalists who have read the Foundry documentation. They are practitioners who have deployed the platform at scale, across sectors, under real enterprise performance and security requirements.",
    hard: "Most Foundry implementations stall not at the technical layer but at the handoff layer — where pipeline, application, and adoption teams must operate as one integrated effort.",
    deliverables: [
      "Data pipeline design and build using Code Workbooks, Contour, and Transform",
      "Object-level application development using Workshop and Slate",
      "AIP Logic and AIP Agent configuration for AI-enabled decision workflows",
      "Role-based access control and object-level security implementation",
      "Production-readiness review, go-live support, and hypercare monitoring",
    ],
  },
  {
    slug: "aip-agentic-ai",
    number: "03",
    title: "AIP & Agentic AI Deployment",
    tagline: "When your Ontology is ready for AI, we build the agent that runs on it.",
    summary:
      "Palantir's AIP grounds LLM capabilities in your actual Ontology, data, and governance policies — the difference between AI that summarizes documents and AI that executes business workflows.",
    hard: "Most organizations discover that deploying AIP is not primarily an AI problem. It is an Ontology problem. Fixing the Ontology under a live AIP deployment is significantly more expensive than designing it correctly beforehand.",
    deliverables: [
      "AIP Logic design and implementation for AI-assisted decision workflows",
      "Agentic architecture with directed actions and constrained, auditable permissioning",
      "LLM integration within the Ontology for semantic search and natural language querying",
      "AI governance framework aligned to policies and regulatory obligations",
      "ROI measurement framework tying AI automation to specific business KPIs",
    ],
  },
  {
    slug: "platform-support",
    number: "04",
    title: "Platform Support & Optimization",
    tagline: "We stay in the work after the build is complete.",
    summary:
      "Most organizations encounter a second wave of challenges six to twelve months after launch: use case drift, pipeline performance degradation, team turnover. We provide the ongoing stewardship that keeps Foundry aligned with your operations.",
    hard: "The go-live date is not the destination. The slow erosion of Ontology integrity as the business evolves faster than the platform is the single largest determinant of long-term ROI.",
    deliverables: [
      "Production monitoring and issue resolution against defined SLAs",
      "Ontology maintenance and evolution as business requirements change",
      "Pipeline performance tuning and infrastructure cost reduction",
      "Use case expansion support without creating architectural conflict",
      "Quarterly business reviews with measurable KPI reporting",
    ],
  },
];

export const trainings = [
  {
    code: "T-01",
    title: "Foundry Fundamentals",
    subtitle: "The foundation every successful deployment is built on.",
    audience: "Technical and non-technical participants",
    duration: "Instructor-led: 3 days · Self-paced: 8–12 hours",
    topics: [
      "Palantir platform architecture: Foundry, AIP, Gotham, Apollo",
      "Ontology essentials: objects, properties, links, actions, functions",
      "Data integration fundamentals: ingestion, pipeline design, governance",
      "Application development with Workshop and Slate",
      "Platform security and permission model fundamentals",
    ],
  },
  {
    code: "T-02",
    title: "Ontology Design Masterclass",
    subtitle: "For the architects responsible for your digital business model.",
    audience: "Data architects, senior engineers, Foundry administrators",
    duration: "Instructor-led: 4 days (intensive, private delivery only)",
    topics: [
      "Object type design: naming, cardinality, inheritance patterns",
      "Link type architecture without technical debt",
      "Action type and function design — the kinetic layer",
      "Ontology governance: version control and backward compatibility",
      "Performance patterns stable from thousands to billions of objects",
      "AIP-ready design for safe LLM integration",
    ],
  },
  {
    code: "T-03",
    title: "AIP & Agentic AI for Practitioners",
    subtitle: "From prompt engineering to production AI agents.",
    audience: "Practitioners deploying AIP at enterprise scale",
    duration: "Instructor-led: 3 days",
    topics: [
      "AIP Logic: designing AI-assisted decision workflows",
      "Agent architecture: constrained agents with directed actions",
      "Prompt engineering grounded in Ontological context",
      "Evaluation frameworks for agent performance vs. KPIs",
      "AI governance and auditability for enterprise and regulated environments",
    ],
  },
  {
    code: "T-04",
    title: "Foundry for Business Users",
    subtitle: "The platform belongs to the business, not only to engineering.",
    audience: "Operational leaders, analysts, frontline decision-makers",
    duration: "Instructor-led: 2 days",
    topics: [
      "Navigating Foundry: Object Explorer, Quiver, Contour",
      "Reading Ontology relationships in your domain",
      "Working with Workshop applications without code",
      "Independent analysis and personal data views",
    ],
  },
];

export const engagements = [
  {
    n: "01",
    title: "Palantir Readiness Assessment",
    body: "A structured two-week diagnostic for organizations evaluating Palantir or seeking an objective third-party review of an early-stage deployment.",
    deliverables:
      "Use case prioritization matrix · Data architecture review · Organizational readiness report · Foundry deployment roadmap · ROI model for top-three use cases",
  },
  {
    n: "02",
    title: "Ontology Rescue & Redesign",
    body: "For organizations whose Ontology has become a constraint rather than an asset. We audit the existing architecture, identify root causes, and design a migration path that preserves working functionality.",
    deliverables:
      "Ontology health audit · Architectural debt inventory · Redesign specification · Migration roadmap · Knowledge transfer",
  },
  {
    n: "03",
    title: "Use Case Velocity Program",
    body: "Sprint-based engagement for organizations ready to accelerate production-grade Foundry use cases. Aavya embeds with your team to design, build, and launch one high-priority use case per six-week sprint.",
    deliverables:
      "Per sprint: one production-ready use case · full documentation · team knowledge transfer · next sprint specification",
  },
  {
    n: "04",
    title: "Enterprise AI Transformation Program",
    body: "Aavya's flagship engagement — a 12-to-24-week program moving the organization from fragmented data to a coherent, AI-ready Ontology with multiple production use cases.",
    deliverables:
      "Full Ontology architecture · Multiple production use cases · AIP integration · Internal team certification · Operating model documentation · Executive KPI dashboard",
  },
];

export const values = [
  {
    title: "Results as the Only Currency",
    body: "We do not measure our work in hours billed or slides produced. The single metric that matters is what changes in your operations as a result of what we built together.",
  },
  {
    title: "Expertise Earned, Not Assumed",
    body: "Technical authority at Aavya is built on direct experience — not vendor certifications. We know Foundry because we have shipped on Foundry. We know what breaks, and why.",
  },
  {
    title: "Honesty as Respect",
    body: "We tell clients what they need to hear. If your Ontology has fundamental architectural problems, we say so clearly and offer a path forward.",
  },
  {
    title: "One Team, Always",
    body: "We do not draw a line between our team and yours. The best solutions come from genuine collaboration, not the contractor-client dynamic most firms default to.",
  },
  {
    title: "Security and Governance by Default",
    body: "We design access controls, governance frameworks, and compliance into every Ontology — not as an afterthought, but as a non-negotiable characteristic of well-built systems.",
  },
];

export const testimonials = [
  {
    quote:
      "The Aavya team solved in four weeks what our internal engineers had been trying to crack for six months. The depth of their Ontology knowledge — and the clarity of how they communicated it — was unlike anything we had experienced from a consulting partner.",
    name: "Director of Data Engineering",
    company: "Fortune 500 Industrial Manufacturer",
  },
  {
    quote:
      "We brought Aavya in to rescue a Foundry deployment that had gone sideways. They gave us a clear diagnosis within days, a redesign specification within weeks, and a live production Ontology within the quarter. They are the team you want when the stakes are real.",
    name: "Program Lead",
    company: "U.S. Federal Agency",
  },
  {
    quote:
      "Aavya has a rare ability to translate complex platform concepts into the precise vocabulary each audience needs. Our analysts left training confident. Our architects left with a completely different understanding of what was possible.",
    name: "Program Manager",
    company: "U.S. Department of Defense",
  },
];

export const articles = [
  {
    slug: "ontology-is-infrastructure",
    title: "The Ontology Is Infrastructure: Why Your AI Ceiling Is an Architecture Problem",
    excerpt:
      "Most enterprises approach AI deployment as a technology procurement decision. They evaluate models, select vendors, and nominate use cases — and then discover the AI system cannot reason about their operations with any meaningful depth.",
    tags: ["Ontology Design", "AI Architecture", "Palantir AIP"],
    readTime: "9 min",
  },
  {
    slug: "end-of-point-solution-saas",
    title: "The End of Point-Solution SaaS — and What Replaces It",
    excerpt:
      "The average large enterprise now operates over 130 distinct SaaS applications. The next architectural paradigm is not more SaaS. It is a semantically coherent operational platform that models the business as a connected whole.",
    tags: ["Enterprise Architecture", "SaaS Consolidation", "Ontology Strategy"],
    readTime: "7 min",
  },
  {
    slug: "why-enterprise-ai-projects-stall",
    title: "Why Enterprise AI Projects Stall — and the Architectural Fix",
    excerpt:
      "Enterprise AI investment is accelerating. The rate of transformation is not keeping pace. The failure mode is structural, not technological — and the fix is an architectural intervention, not a better model.",
    tags: ["Enterprise AI", "Data Strategy", "ROI"],
    readTime: "8 min",
  },
  {
    slug: "ontologies-that-hold-at-scale",
    title: "Designing Ontologies That Hold at Scale: The Failure Modes You Will Not See Until It Is Too Late",
    excerpt:
      "There is a class of Ontology design errors that remain invisible through development, through testing, and through early production. They surface when the object count reaches the hundreds of millions.",
    tags: ["Ontology Design", "Scalability", "Technical Architecture"],
    readTime: "11 min",
  },
];

export const process = [
  { step: "Discover", body: "Structured stakeholder interviews and data landscape assessment." },
  { step: "Diagnose", body: "Business entity mapping, use case prioritization, Ontology design." },
  { step: "Build", body: "Iterative Foundry development in sprint cadence with stakeholder alignment." },
  { step: "Validate", body: "User acceptance testing, performance validation, and go-live support." },
  { step: "Transfer", body: "Knowledge transfer, documentation, governance framework delivery." },
  { step: "Sustain", body: "Ongoing monitoring, optimization, and use case expansion roadmap." },
];

export const stats = [
  { value: "4wk", label: "From diagnosis to first production Ontology" },
  { value: "300M+", label: "Objects under production load in client deployments" },
  { value: "6", label: "Critical industries served, end-to-end" },
  { value: "100%", label: "Practitioner-led engagements — no junior teams" },
];
