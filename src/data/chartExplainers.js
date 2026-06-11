// Persona-specific 2-paragraph explainers for each chart section.
// Keys match section IDs. Each entry has an 'all' default plus per-persona overrides.

export const chartExplainers = {
  buildDrivers: {
    all: [
      "Integration tops the list of reasons organisations build rather than buy — not because COTS products are deficient, but because no off-the-shelf solution can map cleanly onto a business that has evolved its processes, data structures, and customer relationships over years. The need to integrate is, by definition, a need no vendor can fully anticipate.",
      "What makes this finding particularly significant is that integration reappears as the primary delivery blocker. The same factor driving organisations toward custom software is also the one slowing them down. Until integration is treated as a strategic discipline rather than a project-level concern, that tension will persist.",
    ],
    ceo: [
      "The top driver for custom software investment — better integration with existing systems — is a proxy for something more fundamental: control. Every organisation that has ceded its integration architecture to a patchwork of vendor APIs and middleware is an organisation whose strategic agility is constrained by its technology estate.",
      "The executive question is not whether to invest in integration capability — it is whether that investment sits as a line item in IT's budget or as a strategic programme with board-level sponsorship. As AI adoption makes data flows more consequential, the 44% citing integration as a build driver will only grow.",
    ],
    cfo: [
      "The integration driver at 44% represents a total-cost-of-ownership argument that COTS vendors rarely surface in sales cycles. Every integration point between an off-the-shelf platform and your existing systems is a future maintenance liability — one that compounds when those systems are upgraded, retired, or replaced.",
      "The organisations that have shifted to custom software on integration grounds are not necessarily spending more; they are choosing where to spend. The build decision internalises that cost and gives the organisation control over the timeline and architecture. The buy decision externalises it — often invisibly, until a migration or an upgrade makes it visible all at once.",
    ],
    cio: [
      "Integration topping the build drivers list is unlikely to surprise anyone responsible for a multi-system technology estate. What the data confirms is that this is not a minority pain point — it is the dominant reason organisations across all sectors choose to build, and it is consistently the leading delivery blocker when they do.",
      "Legacy integration is also the single greatest inhibitor of AI adoption in this dataset: 43% say it is a major hurdle for agentic AI. The integration question is therefore not just about current delivery — it is the infrastructure decision that determines what your AI strategy can and cannot do in the next 24 months.",
    ],
    cdo: [
      "The integration driver has a specific meaning for data leaders: most COTS platforms do not expose data in a form that supports modern AI workloads. Proprietary schemas, locked-down APIs, and vendor-managed data layers make it functionally impossible to build the semantic data layer, vector store, or ML pipeline that AI-first architectures require.",
      "Building custom — or at minimum, investing in an API-led integration layer over existing COTS — is increasingly the precondition for a coherent data strategy. The 44% building for integration reasons are, implicitly, building for AI readiness. The question is whether that connection is being made explicitly in your organisation's technology strategy.",
    ],
    architect: [
      "'Integration with existing systems' covers a wide range of architectural realities: event-driven integration with legacy ERPs, API wrappers over monolithic applications, synchronisation between on-premise and cloud-native systems, and the data pipelines that AI models depend on. Each of these is a distinct engineering problem that the 44% headline figure compresses into a single data point.",
      "The implication for architecture strategy is that integration cannot be treated as a project-level concern. Organisations that continue to address it tactically — point-to-point, case-by-case — will find that every new capability they build, every offshore team they onboard, and every AI model they deploy is working against a growing debt of brittle connections.",
    ],
  },

  ai: {
    all: [
      "85% of organisations are moving on AI — but ambition and readiness are not the same thing. Skills gaps, infrastructure deficits, and integration debt are compressing delivery timelines across the board. The organisations that will realise AI's productivity and competitive benefits first are those treating the infrastructure foundations as the primary investment, not the model layer.",
      "The governance gap is the most significant risk signal in this data. One in four organisations building AI capability without a governance framework is not a minor compliance concern — it is an architecture decision that becomes harder to reverse as AI systems accumulate dependencies and start influencing processes that were not designed to accommodate them.",
    ],
    ceo: [
      "The 85% AI adoption figure reflects boardroom ambition as much as technical readiness. What the survey makes clear is that ambition without governance creates a category of risk that is genuinely difficult to quantify until something goes wrong. The 25% building without governance represent a liability that will surface in a compliance audit, a regulatory conversation, or a production incident.",
      "The strategic question for CEOs is not whether to move on AI — the competitive pressure to do so is real and well-evidenced here. It is whether the organisation's risk framework, data infrastructure, and skills base are being built at the same pace as the AI ambition. Boards approving AI programmes should be asking for a governance readiness report alongside every deployment plan.",
    ],
    cfo: [
      "The 10-point gap between AI adoption (85%) and governance adoption (75%) is a financial risk that most organisations have not priced. AI systems deployed without governance frameworks create audit exposure, regulatory liability, and — when they fail — remediation costs that are difficult to bound. The upfront investment in governance is almost always lower than the cost of retrofitting it.",
      "The infrastructure investment picture reinforces this: the model layer attracts 24% of AI stack investment, while the governance and security layer attracts just 14%. That ratio suggests that for many organisations, the most expensive problems have not yet arrived. CFOs building the governance business case now will be in a substantially better position when the regulatory environment firms up in the next 12–24 months.",
    ],
    cio: [
      "The top two AI blockers — limited in-house expertise (43%) and lack of integration with existing systems (43%) — are not independent problems. Integration debt makes it harder to expose data to AI systems, harder to evaluate AI outputs against live operational data, and harder to deploy agents that need to orchestrate across multiple systems. Closing the expertise gap while the integration gap remains open is building on an unstable foundation.",
      "Most organisations are prioritising the model layer (24%) and application layer (21%) ahead of the integration layer (16%). For organisations with complex legacy estates, this ordering creates a technical dependency that will slow AI delivery regardless of model capability. CIOs treating integration modernisation as an AI prerequisite — not an IT maintenance programme — are the ones most likely to show meaningful AI ROI in the next 18 months.",
    ],
    cdo: [
      "The data layer — data lakes, vector databases, semantic layers — represents 20% of AI stack investment priorities, making it the third-largest focus area. But the survey data makes a compelling case that this ordering is backwards for organisations with meaningful legacy infrastructure. Without a clean, accessible, and semantically coherent data layer, the model layer has nothing reliable to work with.",
      "The skills gaps cited by 43% as the primary AI blocker are real — but for data leaders, the more actionable concern is often the infrastructure that would allow those skills to be applied effectively. Hiring AI engineers into an organisation without vector stores, structured data pipelines, or a governed ML platform is an expensive way to build very slowly.",
    ],
    architect: [
      "The AI stack investment data reveals a technically significant pattern: organisations are investing heavily in the model layer (24%) and application layer (21%) while underweighting the integration layer (16%) and governance layer (14%). For organisations with heterogeneous estates, this ordering means AI capabilities are being built on top of infrastructure not designed to support them.",
      "The 43% citing integration with existing systems as an AI blocker are experiencing an architecture problem, not a tooling one. Agentic AI systems that orchestrate across ERP, CRM, data warehouse, and operational databases require an integration fabric that most enterprises have never built to those standards. The architectural decisions made in the next 12 months will define what is and is not possible for AI delivery for the decade that follows.",
    ],
  },

  perceptionGap: {
    all: [
      "A 24-point gap between how senior leaders and delivery managers perceive project outcomes is not a measurement anomaly — it is an organisational signal. When the two groups are measuring different things, with different information, against different baselines, the gap is not surprising. It is the inevitable result of a success framework that is defined once at project initiation and never reconciled.",
      "The downstream consequences are visible in the delivery data: 36% of mid-level managers report scope creep, and 46% cite integration challenges as primary blockers — problems that rarely feature in board-level project reviews. Closing the gap requires less a change in attitude and more a change in how success is defined, shared, and tracked across organisational levels.",
    ],
    ceo: [
      "The perception gap is a leadership accountability issue as much as a delivery problem. When C-suite leaders believe 63% of projects exceeded expectations and the delivery teams running those projects put the number at 39%, the gap reveals that success metrics are not being set collaboratively, shared transparently, or reviewed honestly.",
      "The executive response should not be to dismiss delivery-manager pessimism — the scope creep and integration challenge data suggests their concerns are well-founded. It should be to ask whether the organisation's project reporting mechanisms are designed to surface ground-level reality before it becomes a board-level surprise. The 24-point gap is the cost of not having that design in place.",
    ],
    cfo: [
      "For CFOs, the 24-point perception gap has a direct financial interpretation: it is where value leaks. If projects are being signed off as exceeding expectations while delivery teams are managing scope creep on 36% of projects and integration failures on 46%, then the ROI calculations attached to those projects are not reflecting operational reality. They are reflecting leadership optimism.",
      "The implication is not that custom software investment is wrong — the broader survey data makes that case compellingly. It is that the financial model for those investments needs to be built on delivery-team reality, not boardroom narrative. ROI frameworks that incorporate scope risk, integration cost, and delivery-team success metrics will produce more accurate figures — and make the argument more defensible over time.",
    ],
    cio: [
      "The delivery-side data behind the perception gap is technically specific: 46% of mid-level managers cite integration challenges and 36% report scope creep. Both emerge from insufficient discovery, underspecified integration requirements, and the tendency to treat legacy system constraints as known rather than investigated — problems that become harder to surface the more layers of management separate the delivery team from the executive sponsor.",
      "The CIO's structural response is to change how projects are scoped and how delivery reality reaches leadership. Sprint-level metrics, integration risk registers, and mid-project reviews that give delivery managers a direct reporting line to decision-makers are not bureaucracy — they are the mechanisms that close the gap before it becomes a 24-point headline.",
    ],
    cdo: [
      "The perception gap is a data problem in a specific sense: the organisation does not have a shared, granular, real-time view of project performance. Senior leaders see dashboards; delivery managers see Jira boards. The information that matters for understanding project health — integration blockers, scope changes, technical debt accumulation — rarely makes it from one view to the other in a timely or structured form.",
      "Data leaders are well-positioned to build the measurement infrastructure that closes this gap. Project telemetry, delivery KPIs that map to business outcomes, and a shared definition of success that spans from delivery sprint to board review — these are data architecture questions as much as governance ones. Organisations that build this infrastructure find their custom software investment thesis becomes easier to defend, and their delivery performance genuinely harder to misread.",
    ],
    architect: [
      "From a delivery perspective, the 46% of mid-level managers citing integration challenges as their primary blocker is the most technically meaningful number in this section. Scope creep at 36% is often a symptom of the same problem: integration requirements are underspecified at discovery, complexity emerges during implementation, and timelines are revised — but not always communicated upward with the same fidelity they arrive at downward.",
      "The architectural implication is that integration complexity needs to be surfaced as a project risk at the outset, not discovered mid-sprint. Detailed integration mapping, early proof-of-concept work on the highest-risk connections, and realistic estimates of legacy system variability are the technical activities that prevent the perception gap from forming in the first place.",
    ],
  },

  offshore: {
    all: [
      "The headline figures are striking: 92% of organisations use offshore partners, and 99% of them report better outcomes. The near-universality of both adoption and positive outcomes suggests that the debate about whether offshore development works has been settled in practice, even if it persists in some boardrooms. The more productive question is what distinguishes organisations that get transformational results from those that get marginal ones.",
      "The outcome data points to where value accumulates: innovation and faster feature delivery (51%), software quality and reliability (49%), and team scalability (49%) lead the list. These are not cost-reduction outcomes — they are capability outcomes. The organisations treating offshore as a capability extension rather than a labour arbitrage are extracting the majority of the value the model offers.",
    ],
    ceo: [
      "The offshore data reframes a conversation that has often been framed incorrectly. Offshore development is not primarily a cost-reduction lever: 51% of organisations report increased innovation and faster feature delivery as the top outcome, ahead of cost control at 39%. The organisations that have made offshore work are competing faster, not just spending less.",
      "The strategic question is whether your organisation's offshore operating model is designed to deliver capability or to deliver cost savings. The two are not mutually exclusive, but they require different partner relationships, governance structures, and cultural investments. The data suggests that organisations closest to a strategic partnership model are reporting the strongest capability outcomes.",
    ],
    cfo: [
      "The offshore outcome data should recalibrate the financial case most organisations have built for offshore investment. Cost control (39%) and product delivery speed (39%) sit at the bottom of the outcomes list. The top outcomes — innovation (51%), quality (49%), and scalability (49%) — are value-creation metrics, not efficiency metrics. If the business case was built on cost savings, it may be under-representing the actual return.",
      "This has practical implications for how offshore investment is budgeted and evaluated. Organisations measuring ROI purely through headcount cost comparison are not capturing the innovation and quality benefits the majority of offshore users report. A more complete financial model — one that includes time-to-market improvement, quality-related cost avoidance, and scalability value — will typically produce a more compelling and accurate picture.",
    ],
    cio: [
      "The quality outcome at 49% is the most technically significant finding in this section. Software quality manifests in reduced defect rates, lower remediation cost, faster release cycles, and more predictable delivery. Achieving it through an offshore model requires investment in shared standards, consistent tooling, and governance frameworks that treat offshore teams as first-class engineering contributors rather than executing resources.",
      "The 43% reporting stronger business continuity reflects the architectural benefit of geographically distributed teams — but only when those teams are genuinely integrated into delivery processes. Offshore models that operate as separate execution squads with weekly handoffs do not produce continuity benefits; they create coordination overhead. The operating model is the differentiating variable, not the geography.",
    ],
    cdo: [
      "The innovation outcome at 51% is worth interrogating for data and AI leaders specifically. Innovation in a software context increasingly means the ability to experiment quickly: to test data hypotheses, deploy models to a subset of users, and iterate on AI-driven features faster than competitors. Offshore teams deeply embedded in product and data workflows can accelerate this; those operating as ticket-executing contractors cannot.",
      "The scalability outcome (49%) has a specific value for data organisations: the ability to scale data engineering and ML engineering capacity rapidly in response to AI programme timelines is a capability most in-house teams cannot match alone. Offshore models that include data engineering, MLOps, and AI engineering capability — not just application development — are the most relevant to a modern data organisation's delivery needs.",
    ],
    architect: [
      "The quality and reliability outcome (49%) is technically earned, not automatically conferred by the offshore model. It requires shared engineering standards — code review processes, test coverage expectations, deployment pipeline design, and definition-of-done criteria that apply equally to offshore and onshore contributors. Where those standards exist and are applied consistently, offshore teams perform to the same quality bar.",
      "The business continuity outcome (43%) depends on the integration architecture being robust enough to support asynchronous collaboration. Teams sharing a codebase across time zones need clean interface contracts, comprehensive automated testing, and deployment pipelines that can be operated independently. These are not offshore-specific requirements — but offshore delivery makes them non-optional.",
    ],
  },

  partnerMaturity: {
    all: [
      "The gap between aspiration and reality in partner relationships is one of the survey's most actionable findings. 97% of organisations say they would invest more in a partner that consistently delivers long-term value. Only 32% currently have a relationship they would describe as strategic. That is not a market gap — it is an operating model gap. The capability exists on both sides; the architecture for the relationship does not.",
      "The progression from tactical support to strategic partner is not a natural evolution of a long-enough engagement. It requires explicit investment: in shared governance, in joint planning horizons, in the kind of cultural and knowledge integration that turns a vendor into a genuine extension of the internal team. Organisations that have made that investment report meaningfully better outcomes across the metrics that matter most.",
    ],
    ceo: [
      "The partner maturity data points to an opportunity most organisations are leaving on the table. 47% have a trusted delivery partner — consistent, reliable, technically competent — but not one genuinely embedded in strategic decision-making. The move from trusted to strategic does not require finding a better supplier. It requires building a better relationship with the one you already have.",
      "That move is a leadership decision as much as a procurement one. Strategic partnerships require executive sponsorship, joint planning processes, and a willingness to give external partners access to business context that most organisations default to withholding from vendors. The 32% who have made this work are not outliers in terms of supplier quality — they are outliers in terms of the investment they have made in the relationship architecture.",
    ],
    cfo: [
      "The partner classification data has a financial subtext worth making explicit. The 47% with a trusted delivery partner and the 14% with a project-based provider represent significant external development spend that is not being managed against a long-term value model. Tactical and project-based relationships have higher transaction costs, lower knowledge retention, and fewer opportunities for the continuous improvement that generates compounding value over time.",
      "The 97% who would invest more in a genuinely strategic partner implies a latent willingness to increase external development spend — but conditional on evidence of long-term value. For CFOs, this is an argument for moving partner evaluation from a procurement exercise (cost per sprint, day rate benchmarking) to a value framework that accounts for knowledge accumulation, delivery quality improvement, and strategic input that makes the best external partners genuinely additive to internal capability.",
    ],
    cio: [
      "Strategic partners are distinguished from trusted delivery partners not by willingness but by depth. Deep partners understand your architecture well enough to challenge it. They have opinions about your technical decisions, flag risks before they become blockers, and contribute to roadmap thinking rather than waiting for specifications. That level of depth takes time to build — and it is also a choice to invest in it.",
      "The organisation-size gap in the data — 28% of smaller enterprises have a strategic partner versus 45% of larger ones — reflects resource investment as much as partner capability. Larger organisations have more capacity to manage the governance and communication overhead of a deep partnership. But the organisations getting the best outcomes from their development partners, at any size, are those that have made the relationship investment explicit and sustained it.",
    ],
    cdo: [
      "For data and AI leaders, the partner maturity question has an increasingly specific meaning. As organisations move from application development into data platform engineering, MLOps, and AI system design, the capability bar for a strategic partner rises. A partner excellent at web application delivery may not have the data engineering, model deployment, or AI governance capability that a maturing data strategy requires.",
      "The aspiration-reality gap — 97% wanting a strategic partner, 32% having one — is partly a relationship investment problem and partly a capability alignment problem. The most effective partnerships for data leaders are those where the partner has co-invested in understanding the organisation's data architecture, has relevant depth in AI engineering, and is contributing actively to the data strategy rather than executing it line-by-line.",
    ],
    architect: [
      "From an architecture perspective, the difference between a strategic partner and a trusted delivery partner is most visible in the quality of technical decision-making at the boundary between the two organisations. Trusted delivery partners execute well against specifications. Strategic partners challenge them — they bring architectural context, flag technical debt risks, and push back when a proposed approach will create problems two sprints from now.",
      "The 32% who have built strategic partnerships have typically invested in the structures that make technical depth possible: long-lived, stable squads rather than rotating delivery resources; joint architecture reviews rather than handoff documentation; shared tooling and standards rather than parallel development environments. These are the technical preconditions for the kind of deep collaboration that the 97% aspiration figure suggests nearly every technology leader is looking for.",
    ],
  },
};
