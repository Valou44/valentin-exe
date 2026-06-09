// ============================================================================
// PM.EXE — PORTFOLIO CONTENT
// PLACEHOLDER CONTENT — replace every field with Valentin Renard's real data.
// ============================================================================

export const PROFILE = {
  name: "Valentin Renard",
  role: "Product Manager",
  years: 10,
  tagline: "Experience Product Management through real decisions.",
  location: "Paris, France", // PLACEHOLDER
  email: "hello@valentinrenard.com", // PLACEHOLDER
  linkedin: "https://www.linkedin.com/in/valentin-renard-149200a9/",
  bio: [
    "I'm a Product Manager with 10 years of experience turning fuzzy problems into products people actually use.", // PLACEHOLDER
    "I care about discovery, sharp prioritization and shipping the smallest thing that creates real impact — then being honest about what worked and what didn't.", // PLACEHOLDER
  ],
  currentFocus:
    "Building products that remove uncertainty for everyday users.", // PLACEHOLDER
};

export interface TimelineItem {
  period: string;
  title: string;
  company: string;
  description: string;
}

export const TIMELINE: TimelineItem[] = [
  {
    period: "2021 — Now",
    title: "Senior Product Manager",
    company: "Company A", // PLACEHOLDER
    description: "Leading discovery and delivery for a flagship consumer product.",
  },
  {
    period: "2018 — 2021",
    title: "Product Manager",
    company: "Company B", // PLACEHOLDER
    description: "Owned the activation and onboarding roadmap end to end.",
  },
  {
    period: "2015 — 2018",
    title: "Associate Product Manager",
    company: "Company C", // PLACEHOLDER
    description: "Started in product, learned to ship under real constraints.",
  },
];

export interface CaseStudy {
  slug: string;
  name: string;
  oneLiner: string;
  year: string;
  tags: string[];
  problem: string;
  discovery: string;
  decision: string;
  solution: string;
  impact: { label: string; value: string }[];
  lessons: string;
  differently: string;
}

export const PROJECTS: CaseStudy[] = [
  {
    slug: "guided-journeys",
    name: "Guided Journeys",
    oneLiner: "Helping young adults complete administrative procedures with confidence.",
    year: "2024",
    tags: ["0→1", "Consumer", "Onboarding"],
    problem:
      "70% of young adults abandoned administrative procedures because they didn't know where to start.",
    discovery:
      "12 interviews revealed the real blocker wasn't features — it was orientation and confidence.",
    decision:
      "Bet on guided step-by-step journeys over an AI assistant, prioritizing trust and clarity over novelty.",
    solution:
      "A focused MVP: one complete, plain-language guided journey with a progress bar and a reassuring tone.",
    impact: [
      { label: "Completion", value: "30% → 58%" },
      { label: "Users reached", value: "8,400" },
      { label: "Support tickets", value: "-41%" },
    ],
    lessons:
      "Tone and clarity moved the metric more than any UI redesign would have.",
    differently:
      "I'd build the content-editing workflow on day one instead of treating it as an afterthought.",
  },
  {
    slug: "activation-engine",
    name: "Activation Engine",
    oneLiner: "Rebuilding onboarding to get new users to their first win faster.",
    year: "2023",
    tags: ["Growth", "Activation", "B2C"],
    problem: "New users signed up but never reached the product's core value moment.",
    discovery: "Funnel analysis + 8 interviews isolated a single confusing step mid-onboarding.",
    decision: "Cut the step entirely instead of decorating it; measured the counterfactual.",
    solution: "A streamlined 3-step onboarding with contextual nudges.",
    impact: [
      { label: "Activation", value: "+22%" },
      { label: "Time to value", value: "-35%" },
      { label: "D7 retention", value: "+9 pts" },
    ],
    lessons: "Removing friction beat adding guidance.",
    differently: "I'd instrument the funnel before redesigning, not after.",
  },
  {
    slug: "pricing-revamp",
    name: "Pricing Revamp",
    oneLiner: "Repackaging plans to align price with perceived value.",
    year: "2023",
    tags: ["Monetization", "Strategy"],
    problem: "Conversion stalled; users couldn't tell the plans apart.",
    discovery: "Willingness-to-pay research and plan-comparison testing.",
    decision: "Moved from 4 confusing tiers to 3 clear ones with a clear default.",
    solution: "A redesigned pricing page with value-based naming and anchoring.",
    impact: [
      { label: "Conversion", value: "+18%" },
      { label: "ARPU", value: "+12%" },
      { label: "Refunds", value: "-6%" },
    ],
    lessons: "Clarity converts better than discounts.",
    differently: "I'd run the WTP study a quarter earlier.",
  },
  {
    slug: "mobile-companion",
    name: "Mobile Companion",
    oneLiner: "Extending a web product into a focused mobile experience.",
    year: "2022",
    tags: ["Mobile", "0→1"],
    problem: "Power users wanted to act on the go but the web app was desktop-first.",
    discovery: "Diary study revealed only 3 tasks mattered on mobile.",
    decision: "Built a lean companion app, not a full port.",
    solution: "An app focused on the 3 highest-frequency mobile jobs.",
    impact: [
      { label: "DAU", value: "+27%" },
      { label: "App rating", value: "4.7★" },
      { label: "Sessions", value: "+1.8x" },
    ],
    lessons: "Scope discipline made a small team feel large.",
    differently: "I'd ship the notification strategy alongside v1.",
  },
  {
    slug: "data-trust",
    name: "Data Trust Layer",
    oneLiner: "Giving users transparency and control over their data.",
    year: "2021",
    tags: ["Trust", "Compliance", "Platform"],
    problem: "Users distrusted how their data was used, hurting engagement.",
    discovery: "Surveys + support analysis surfaced consistent privacy anxiety.",
    decision: "Prioritized a visible trust center over silent backend compliance.",
    solution: "A privacy dashboard with plain-language controls.",
    impact: [
      { label: "Opt-in rate", value: "+31%" },
      { label: "Trust score", value: "+14 pts" },
      { label: "Churn", value: "-5%" },
    ],
    lessons: "Transparency is a feature, not overhead.",
    differently: "I'd co-design the controls with legal from the start.",
  },
  {
    slug: "internal-tooling",
    name: "Ops Tooling",
    oneLiner: "An internal tool that gave the ops team back their week.",
    year: "2020",
    tags: ["Internal", "Efficiency"],
    problem: "The ops team spent hours on manual, error-prone workflows.",
    discovery: "Shadowed the team for two days to map the real workflow.",
    decision: "Automated the two steps causing 80% of the pain first.",
    solution: "A focused internal dashboard replacing spreadsheets.",
    impact: [
      { label: "Time saved", value: "12h / week" },
      { label: "Errors", value: "-90%" },
      { label: "Adoption", value: "100%" },
    ],
    lessons: "Internal users deserve real product thinking too.",
    differently: "I'd set up usage analytics from day one.",
  },
];

export interface Framework {
  name: string;
  summary: string;
  points: string[];
}

export const FRAMEWORKS: Framework[] = [
  {
    name: "Product Discovery",
    summary: "Understand the problem deeply before committing to a solution.",
    points: ["Continuous interviews", "Opportunity solution trees", "Assumption mapping"],
  },
  {
    name: "Prioritization",
    summary: "Spend scarce capacity on the highest impact / lowest regret bets.",
    points: ["Impact vs effort", "RICE when useful", "One bet per cycle"],
  },
  {
    name: "User Research",
    summary: "Let real behavior, not opinions, drive decisions.",
    points: ["Qualitative + quantitative", "Jobs to be done", "Diary studies"],
  },
  {
    name: "Roadmapping",
    summary: "Communicate direction without faking certainty.",
    points: ["Now / Next / Later", "Outcome over output", "Tied to strategy"],
  },
  {
    name: "Metrics",
    summary: "Measure what matters and resist vanity metrics.",
    points: ["North star + guardrails", "Funnel instrumentation", "Counterfactual thinking"],
  },
];

export interface Experiment {
  name: string;
  result: "win" | "fail" | "mixed";
  description: string;
}

export const EXPERIMENTS: Experiment[] = [
  { name: "Empty-state nudges", result: "win", description: "Contextual tips raised feature discovery by 14%." },
  { name: "Gamified streaks", result: "fail", description: "Boosted short-term use, hurt long-term trust. Killed it." },
  { name: "Referral loop v2", result: "mixed", description: "More invites, lower quality. Iterating on targeting." },
  { name: "AI summary beta", result: "win", description: "Saved users ~3 min per session in early tests." },
];

export const TERMINAL_RESPONSES: Record<string, string[]> = {
  whoami: [
    "Valentin Renard — Product Manager, 10 years.",
    "I turn fuzzy problems into products people use.",
  ],
  projects: [
    "guided-journeys   activation-engine   pricing-revamp",
    "mobile-companion  data-trust          internal-tooling",
    "Type a name or open the Projects section to dive in.",
  ],
  current_focus: ["Building products that remove uncertainty for everyday users."],
  biggest_failure: [
    "Gamified streaks: I optimized engagement and eroded trust.",
    "Lesson: never let a metric override the user relationship.",
  ],
  future: [
    "More 0→1. More honest products. Less feature theater.",
  ],
  help: [
    "Available commands:",
    "  whoami           biggest_failure",
    "  projects         future",
    "  current_focus    clear",
  ],
};