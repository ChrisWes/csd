// ============================================================
// NashTech Playbook — "Closing the AI Execution Gap in 90 Days"
// Source: NashTech Playbook, Version 1, July 2026. Author: Ella Higham.
// Grounded in NashTech's "State of Custom Software Development 2026"
// research and NashTech Leaders Lab sessions (Leeds, London, Birmingham).
// ============================================================

export const meta = {
  title: "Closing the AI Execution Gap in 90 Days",
  subtitle: "An execution playbook for engineering, data and AI leaders",
  version: "Version 1",
  publishDate: "July 2026",
  author: "Ella Higham",
  publisher: "NashTech",
  csdReportUrl: "https://www.nashtechglobal.com/our-thinking/reports/differentiating-through-custom-software/",
  contactUrl: "https://www.nashtechglobal.com/contact/",
  homeUrl: "https://www.nashtechglobal.com/",
  surveyMicrositeUrl: "index.html",
};

// ── Section 1: The reality ─────────────────────────────────────
export const signals = [
  { stat: 43, unit: "%", label: "lack internal AI expertise", meaning: "Capacity and ownership must be designed, not assumed." },
  { stat: 42, unit: "%", label: "are unclear on ROI", meaning: "The baseline and value hypothesis must be agreed before build." },
  { stat: 40, unit: "%", label: "lack scalable infrastructure or MLOps capability", meaning: "Architecture, integration, evaluation and monitoring must start in week 1." },
];
export const signalsSource = "NashTech, The state of custom software development 2026. These figures support the case for structured delivery — they do not prove that every AI initiative fails for the same reason.";

export const windowShould = {
  should: [
    "Create urgency without bypassing risk review",
    "Produce evidence from a real workflow",
    "Expose integration and ownership gaps early",
    "End with a scale, hold, rework or stop decision",
  ],
  shouldNot: [
    "Promise enterprise-wide transformation",
    "Treat a demo as proof of production readiness",
    "Hide unresolved dependencies in a future backlog",
    "Assume that reaching day 90 means the use case should scale",
  ],
};

export const executionLayers = [
  { layer: "Outcome", question: "Which measurable workflow result are we changing?", evidence: "Baseline, target, owner, user group" },
  { layer: "Foundation", question: "Can the data, systems and controls support the workflow?", evidence: "Data inventory, integration map, risk classification" },
  { layer: "Delivery", question: "Can a cross-functional team build and evaluate in thin slices?", evidence: "Backlog, evaluation set, acceptance criteria, decision log" },
  { layer: "Run", question: "Can the capability be monitored, supported and stopped safely?", evidence: "Runbook, telemetry, escalation path, rollback plan" },
];

export const ruleOfThumb = "A strong model cannot compensate for an undefined outcome, inaccessible data, unclear ownership or an unsafe operating workflow.";

// ── Interactive 1: Execution gap diagnostic (Section 1) ────────
export const diagnostic = {
  intro: "Score each area from 1 to 5. This isn't a maturity league table — it's a way to find the first constraint that could break your production path.",
  dimensions: [
    { id: "outcome", label: "Outcome", anchors: { 1: "No agreed problem", 3: "Problem and target drafted", 5: "Baseline, target and decision owner agreed" },
      whyItMatters: "Without an agreed problem, target and decision owner, every downstream choice is guesswork.",
      decision: "Agree the outcome and name a decision owner before anything else starts." },
    { id: "data", label: "Data", anchors: { 1: "Unknown or inaccessible", 3: "Access possible; quality gaps known", 5: "Representative data approved and available" },
      whyItMatters: "If representative data isn't accessible and approved, neither the evaluation nor the production system has anything real to run on.",
      decision: "Resolve data access and quality gaps before scoping architecture." },
    { id: "integration", label: "Integration", anchors: { 1: "No system path", 3: "Key interfaces identified", 5: "Read/write path, identity and failure handling designed" },
      whyItMatters: "No system path means the AI component has nowhere safe to read, write or fail into.",
      decision: "Map the read/write path, identity and failure handling before writing a use-case charter." },
    { id: "governance", label: "Governance", anchors: { 1: "Review deferred", 3: "Risks identified", 5: "Controls, approval and evidence requirements agreed" },
      whyItMatters: "A deferred review becomes an unmanaged risk the moment the system touches a real decision.",
      decision: "Agree controls, approval routes and evidence requirements before build starts." },
    { id: "ownership", label: "Ownership", anchors: { 1: "Shared responsibility", 3: "Named leads", 5: "Business, technical and run owners committed" },
      whyItMatters: "Shared responsibility with no named leads is how capabilities lose their owner the moment the project ends.",
      decision: "Name a business owner, technical lead and run owner before week 1 starts." },
    { id: "evaluation", label: "Evaluation", anchors: { 1: "Demo feedback only", 3: "Draft metrics", 5: "Evaluation set, thresholds and guardrails agreed" },
      whyItMatters: "Demo feedback alone can't tell you whether the system is safe or effective at scale.",
      decision: "Agree the evaluation set, thresholds and guardrails before optimisation begins." },
    { id: "operations", label: "Operations", anchors: { 1: "No support model", 3: "Support needs listed", 5: "Monitoring, escalation and rollback designed" },
      whyItMatters: "No support model means nobody is accountable for the capability once it's live.",
      decision: "Design monitoring, escalation and rollback before go-live, not after an incident." },
  ],
};

// ── Section 2: Decide what to build ─────────────────────────────
export const useCasePattern = {
  template: "For [named user group], improve [specific workflow] from [baseline] to [target] by using AI to [bounded role], while [human control or risk condition].",
  example: "For claims operations analysts, reduce the time spent triaging low-complexity documents while keeping final decisions with authorised staff and routing low-confidence outputs for review.",
};

// ── Interactive 2: NashTech AI-ready scorecard (Section 2) ─────
export const scorecard = {
  intro: "Score each dimension from 1 to 4. Score independently first, then discuss the largest differences. The total is a planning heuristic, not an external benchmark — any critical risk can override it.",
  criticalIds: ["data", "governance", "ownership"],
  dimensions: [
    { id: "value", label: "Business value", options: ["Unclear", "Qualitative", "Metric drafted", "Baseline and target agreed"] },
    { id: "data", label: "Data readiness", options: ["Unknown", "Access uncertain", "Known gaps", "Approved representative data"] },
    { id: "architecture", label: "Architecture and integration", options: ["No path", "Dependencies listed", "Design drafted", "Interfaces and controls agreed"] },
    { id: "governance", label: "Governance and risk", options: ["Not assessed", "Risks listed", "Controls drafted", "Approval and evidence agreed"] },
    { id: "ownership", label: "Ownership and capacity", options: ["No owner", "Technical owner only", "Business and technical owners", "Run owner and capacity confirmed"] },
    { id: "operating", label: "Operating fit", options: ["Workflow unclear", "Process mapped", "Users and exceptions mapped", "Support and change approach agreed"] },
    { id: "measurement", label: "Measurement", options: ["Demo criteria", "Technical metrics only", "Business and quality metrics", "Thresholds and decision rules agreed"] },
  ],
  bands: [
    { min: 22, max: 28, label: "Proceed", interpretation: "Proceed to 90-day planning." },
    { min: 17, max: 21, label: "Narrow", interpretation: "Narrow the scope, or run a controlled pilot with named closure actions." },
    { min: 7, max: 16, label: "Pause", interpretation: "Pause. Resolve the foundations or choose a different use case." },
  ],
  criticalOverride: "Do not move to build until the blocker has an owner and closure evidence.",
  footnote: "These thresholds are an internal working heuristic. Adjust them to your organisation's risk appetite, regulatory context and delivery standards.",
};

// ── Section 3: Design for production ────────────────────────────
export const successLoop = [
  { id: 1, stage: "Define", question: "What workflow and outcome are in scope?", output: "Use case charter and baseline" },
  { id: 2, stage: "Prepare data", question: "What data can be used, under which conditions?", output: "Data inventory, quality view and access decision" },
  { id: 3, stage: "Design human oversight", question: "Where must a person review, approve or intervene?", output: "Human review and escalation map" },
  { id: 4, stage: "Test", question: "What evidence is required for release?", output: "Evaluation plan, test set and acceptance criteria" },
  { id: 5, stage: "Deploy", question: "How will the capability be released safely?", output: "Controlled rollout plan and runbook" },
  { id: 6, stage: "Learn", question: "How will quality, value and risk be monitored?", output: "Dashboard, feedback loop and improvement backlog" },
];
export const loopDiscipline = "After Learn, the team must choose to improve, re-scope, scale or stop. Continuous learning is a decision process, not a licence for endless experimentation.";

export const operatingDecisions = [
  { area: "Outcome", owner: "Business owner", decideBeforeBuild: "Value target and trade-offs", evidence: "Baseline and target" },
  { area: "Architecture", owner: "Enterprise / solution architect", decideBeforeBuild: "Target design and non-negotiables", evidence: "Architecture decision record" },
  { area: "Data", owner: "Data owner", decideBeforeBuild: "Access, quality, rights and retention", evidence: "Approved data inventory" },
  { area: "Risk", owner: "Risk / compliance owner", decideBeforeBuild: "Risk class, review and release conditions", evidence: "Control and evidence plan" },
  { area: "Delivery", owner: "Engineering / AI lead", decideBeforeBuild: "Backlog, environments and release flow", evidence: "Integrated delivery plan" },
  { area: "Run", owner: "Service / operations owner", decideBeforeBuild: "Monitoring, support, incident and rollback", evidence: "Runbook and support model" },
  { area: "Scale", owner: "Steering group", decideBeforeBuild: "Scale, hold, rework or stop criteria", evidence: "Day-90 decision record" },
];

export const humanInLoop = [
  { level: 1, label: "Assist", aiRole: "Draft, summarise or suggest", humanRole: "User decides every action", useWhen: "Early-stage or low-risk productivity", color: "#1A4FAB" },
  { level: 2, label: "Recommend", aiRole: "Rank, flag or propose", humanRole: "Human approves before action", useWhen: "Triage, analysis and decision support", color: "#0E9E8E" },
  { level: 3, label: "Execute with approval", aiRole: "Complete a bounded task", humanRole: "Human approves defined actions or exceptions", useWhen: "Controlled workflow automation", color: "#D4820A" },
  { level: 4, label: "Monitor and escalate", aiRole: "Act within policy and thresholds", humanRole: "Human reviews drift, incidents and exceptions", useWhen: "Mature, well-governed and reversible processes", color: "#5B2D8E" },
];
export const humanInLoopIntro = "The action's risk and reversibility should guide human oversight. The design question is not simply whether a human is involved — it's where the human sits, what evidence they receive, what authority they hold, and what happens when the system is uncertain.";

// ── Interactive 3: Governance design checklist (Section 3) ─────
export const governanceChecklist = [
  "The decisions AI may support, and the decisions it must not make, are explicit.",
  "Confidence or risk thresholds that trigger review are defined.",
  "Approval, escalation, override and rollback routes have named owners.",
  "Required evidence is logged for audit and incident review.",
  "Evaluation covers quality, safety, groundedness, task success and business impact where relevant.",
  "Monitoring covers model or prompt changes, data drift, cost, latency, failure patterns and user feedback.",
  "The team knows which event should pause or stop the service.",
];

// ── Section 4: Execute in 90 days — the signature timeline ─────
export const ninetyDayPath = {
  intro: "By day 90, the team should be able to make an evidence-based decision: scale, hold, rework or stop. The target is not a polished demo — it is a bounded capability used in a real workflow, with named owners, tested controls, measurable outcomes and a run plan.",
  evidenceNote: "The 90-day cadence is a delivery design choice, not a universal benchmark. It works when the scope is narrow enough to control, the workflow is measurable, and required data and owners are available. High-risk or deeply integrated use cases may need a longer path.",
  phases: [
    {
      id: "entry", tag: "Before day 1", title: "Entry gate", weeks: 0, weekSpan: "Day 0", color: "#4A4A48",
      objective: "Select one use case and name the accountable owner.",
      workstreams: ["Charter", "Baseline", "Architecture", "Data", "Controls", "Evaluation plan"],
      checklist: [
        "One use case is selected and written in a single sentence.",
        "A business owner is accountable for the workflow outcome.",
        "A technical lead and run owner are named.",
        "The baseline can be measured with available data.",
        "The initial risk classification is complete.",
        "The team has access to representative users and data.",
        "The 90-day decision is defined: scale, hold, rework or stop.",
      ],
    },
    {
      id: "plan", tag: "Weeks 1–3", title: "Architecture and planning", weeks: 3, weekSpan: "Weeks 1–3", color: "#5B2D8E",
      objective: "Remove ambiguity before build. The phase ends when the team can explain the target workflow, system path, data path, human controls and evaluation plan in one joined-up view.",
      workstreams: ["Charter", "Baseline", "Architecture", "Data", "Controls", "Evaluation plan"],
      gate: "Gate 1: permission to build",
      checklist: [
        "The target architecture and integration path are approved.",
        "Representative data is accessible and approved for the intended use.",
        "The evaluation set and acceptance criteria are agreed before optimisation.",
        "Human review, escalation, audit and rollback requirements are designed.",
        "No critical red item is ownerless.",
      ],
      weeklyFocus: [
        { week: "1", workstream: "Outcome and baseline", output: "Approved charter and baseline" },
        { week: "1", workstream: "Workflow and users", output: "Current and target workflow map" },
        { week: "1–2", workstream: "Data", output: "Data inventory and quality view" },
        { week: "2", workstream: "Architecture and integration", output: "Target architecture and integration map" },
        { week: "2", workstream: "Risk and human oversight", output: "Control and escalation map" },
        { week: "2–3", workstream: "Evaluation", output: "Evaluation set and acceptance criteria" },
        { week: "3", workstream: "Delivery and release", output: "Prioritised backlog and release plan" },
        { week: "3", workstream: "Operations", output: "Draft runbook and monitoring plan" },
      ],
    },
    {
      id: "build", tag: "Weeks 4–8", title: "Orchestrated build", weeks: 5, weekSpan: "Weeks 4–8", color: "#1A4FAB",
      objective: "Build the smallest end-to-end slice that can generate real evidence. Integrate early, evaluate continuously, and keep every change traceable — don't wait until week 8 to discover the workflow can't connect to production systems or meet review capacity.",
      workstreams: ["Thin slices", "Integration", "Continuous evaluation", "User workflow", "Operational rehearsal"],
      gate: "Gate 2: permission to validate",
      checklist: [
        "The end-to-end release candidate works in the intended workflow.",
        "Integration, identity, logging and failure handling have been tested.",
        "The evaluation results meet the agreed threshold or have an approved exception.",
        "The human review workload is practical for the operating team.",
        "The team can explain known limitations and open risks.",
      ],
      weeklyFocus: [
        { week: "4", workstream: "End-to-end thin slice on representative data", output: "Is the system path viable?" },
        { week: "5", workstream: "Integration, identity, permissions and logging", output: "Can it fail safely and visibly?" },
        { week: "6", workstream: "Quality and risk iteration", output: "Which failure mode matters most?" },
        { week: "7", workstream: "User workflow and review capacity", output: "Does the design work for people?" },
        { week: "8", workstream: "Release candidate and operational rehearsal", output: "Is the candidate ready for formal validation?" },
      ],
    },
    {
      id: "validate", tag: "Weeks 9–12", title: "Validation and deployment", weeks: 4, weekSpan: "Weeks 9–12", color: "#D4820A",
      objective: "Prove that the release candidate is useful, safe enough for the agreed context, and operable by the people who will own it. Validation must use representative cases and real workflow conditions, not only hand-picked examples.",
      workstreams: ["Formal evaluation", "UAT", "Security and privacy", "Controlled release", "Monitoring"],
      checklist: [
        "Outcome baseline, target and reporting method are confirmed.",
        "Quality release thresholds are met on representative cases.",
        "Data access, usage rights, quality and retention are approved.",
        "Required security and privacy review and tests are complete.",
        "Human oversight: review, escalation, override and stop routes are tested.",
        "Monitoring, support, incident and rollback are rehearsed.",
        "Users have training, communications and a feedback route ready.",
        "Model, prompt, data and configuration changes are traceable.",
      ],
      weeklyFocus: [
        { week: "9", workstream: "Formal evaluation and non-functional testing", output: "Does it meet the agreed release thresholds?" },
        { week: "10", workstream: "User acceptance and operational readiness", output: "Can users and operations run it safely?" },
        { week: "11", workstream: "Controlled release", output: "Does production behaviour match test evidence?" },
        { week: "12", workstream: "Measure and decide", output: "Scale, hold, rework or stop?" },
      ],
    },
  ],
};

// ── Interactive 4: Day-90 decision (Section 4) ──────────────────
export const dayNinetyDecision = [
  { id: "scale", label: "Scale", detail: "Expand only after capacity, risk and economics are rechecked." },
  { id: "hold", label: "Hold", detail: "Keep the current boundary while more evidence is collected." },
  { id: "rework", label: "Rework", detail: "Change scope, workflow, controls, data or architecture before release." },
  { id: "stop", label: "Stop", detail: "Close the use case, record the learning and redirect investment." },
];

// ── Section 5: Make it work (and scale) ─────────────────────────
export const leadersLabQuote = {
  text: "AI initiatives are rarely limited by model capability. They are limited by the systems, operating models and organisational behaviours surrounding them.",
  attribution: "Senior technology leaders, NashTech Leaders Lab · Leeds, London, Birmingham",
};

export const scalingIntro = "Getting to production in 90 days is an achievement. Keeping AI useful, trusted and scalable six months later is where the real challenge begins. The organisations creating measurable AI value are not necessarily those with the largest budgets or the most advanced technology estates — they are the ones that make execution repeatable.";

// ── Interactive 5: The scaling test (Section 5) ─────────────────
export const scalingTest = {
  intro: "Before moving beyond your first production deployment, ask:",
  questions: [
    "Can we explain the business value in measurable terms?",
    "Do we know who owns the capability after launch?",
    "Is governance operating as designed?",
    "Can we monitor quality, risk and performance continuously?",
    "Have we removed manual workarounds from the workflow?",
    "Would we confidently deploy a second AI use case using the same operating model?",
  ],
  passVerdict: "All six, yes. The foundations are in place — scaling is a capacity and economics decision now, not a readiness one.",
  failVerdict: "If the answer to any of these is “no,” the next priority isn't scale. It's strengthening the foundations.",
};

export const finalThought = [
  "Closing the AI execution gap is not about deploying more AI. It is about creating the conditions that allow AI to deliver value consistently.",
  "The organisations achieving the greatest impact are not treating AI as an isolated technology programme. They are treating it as a business transformation initiative built on strong integration, clear ownership, disciplined delivery and trusted data foundations.",
];
export const closingQuestion = "The question is no longer “What could AI do for our organisation?” The more important question is “What is preventing us from operationalising it today?” Answer that, and execution becomes significantly easier.";
export const closingCta = "Whether you're evaluating your first use case, modernising legacy architecture, improving data foundations, building custom software, or scaling AI into production, NashTech's teams work alongside technology leaders to turn strategy into practical outcomes.";
