// ============================================================================
// PM.EXE — SIMULATION CONTENT
// PLACEHOLDER CONTENT — replace with Valentin's real flagship project details.
// The 5 chapters all follow ONE project storyline (admin-procedures product).
// ============================================================================

export interface SimOption {
  label: string;
  hint?: string;
  /** product-thinking points awarded for this option (0-20) */
  points: number;
}

export interface SimChapter {
  id: string;
  index: number;
  /** dimension label shown in the score comparison */
  dimension: string;
  tag: string;
  title: string;
  situation: string;
  prompt: string;
  options: SimOption[];
  /** index of the option Valentin actually chose */
  valentinChoice: number;
  revealTitle: string;
  revealBody: string[];
  meta?: { label: string; value: string }[];
}

export const VALENTIN = "Valentin";

export const CHAPTERS: SimChapter[] = [
  {
    id: "problem",
    index: 1,
    dimension: "Problem framing",
    tag: "MISSION 01 — THE PROBLEM",
    title: "A blurry, painful problem",
    situation:
      "70% of young adults abandon administrative procedures because they don't know where to start. Support tickets are climbing and nobody can say which step actually breaks people.",
    prompt: "You just joined. What do you do first?",
    options: [
      { label: "Ship a new feature", hint: "Move fast, build something visible", points: 6 },
      { label: "Run user interviews", hint: "Understand before building", points: 18 },
      { label: "Launch a marketing campaign", hint: "Drive more traffic in", points: 4 },
    ],
    valentinChoice: 1,
    revealTitle: "What I actually did",
    revealBody: [
      "I resisted the urge to build. A visible feature feels productive, but shipping into an undefined problem is how teams waste a quarter.",
      "I ran 12 user interviews in 5 days and mapped where people froze. The drop-off wasn't a missing feature — it was uncertainty about the very first step.",
      "Framing the real problem before touching the roadmap is the single highest-leverage thing a PM does.",
    ],
    meta: [
      { label: "Time invested", value: "5 days" },
      { label: "Interviews", value: "12" },
      { label: "Output", value: "Problem map" },
    ],
  },
  {
    id: "discovery",
    index: 2,
    dimension: "Discovery",
    tag: "MISSION 02 — DISCOVERY",
    title: "Listen to the users",
    situation:
      "Three interview snippets:\n\n“I don't even know which document I need first.”\n“I started, got scared I'd make a mistake, and closed the tab.”\n“The official site uses words I don't understand.”",
    prompt: "What is the core pain point?",
    options: [
      { label: "The UI looks outdated", hint: "Visual polish", points: 6 },
      { label: "Users lack a clear starting point & confidence", hint: "Orientation", points: 18 },
      { label: "There aren't enough features", hint: "Feature gap", points: 4 },
      { label: "The service is too slow", hint: "Performance", points: 7 },
    ],
    valentinChoice: 1,
    revealTitle: "The insight I discovered",
    revealBody: [
      "Every quote pointed to the same root cause: people weren't missing features — they were missing orientation and confidence.",
      "The product didn't need more; it needed to tell users exactly what to do next and reassure them they couldn't break anything.",
      "I reframed the goal from 'add capabilities' to 'remove uncertainty'.",
    ],
    meta: [
      { label: "Signal", value: "Confidence gap" },
      { label: "Reframe", value: "Less, not more" },
    ],
  },
  {
    id: "prioritization",
    index: 3,
    dimension: "Prioritization",
    tag: "MISSION 03 — PRIORITIZATION",
    title: "Choose the bet",
    situation:
      "You have four credible solutions on the table. Each is defensible. You can only seriously pursue one for the next cycle.",
    prompt: "Which do you bet on?",
    options: [
      { label: "AI assistant", hint: "Answer any question", points: 10 },
      { label: "Guided journeys", hint: "Step-by-step path", points: 18 },
      { label: "Knowledge base", hint: "Searchable articles", points: 8 },
      { label: "Human coaching", hint: "1:1 support", points: 9 },
    ],
    valentinChoice: 1,
    revealTitle: "What I chose & why",
    revealBody: [
      "I chose guided journeys. It directly attacked the confirmed pain — orientation — instead of a flashier but riskier bet.",
      "Trade-off: an AI assistant demoed better, but it required quality content and trust we hadn't earned yet, and could confidently mislead users on legal steps.",
      "Risk: guided journeys are content-heavy to maintain. Constraint: we had one designer and four weeks. Guided journeys were the highest impact / lowest regret option.",
    ],
    meta: [
      { label: "Bet", value: "Guided journeys" },
      { label: "Main risk", value: "Content upkeep" },
      { label: "Why not AI", value: "Trust + accuracy" },
    ],
  },
  {
    id: "delivery",
    index: 4,
    dimension: "Delivery",
    tag: "MISSION 04 — DELIVERY",
    title: "Ship under constraint",
    situation:
      "Reality check: you have exactly 4 weeks, one designer, two engineers. Stakeholders want something live.",
    prompt: "What do you build?",
    options: [
      { label: "Full product", hint: "Everything at once", points: 6 },
      { label: "Focused MVP", hint: "One journey, end to end", points: 18 },
      { label: "Prototype only", hint: "No real users", points: 9 },
      { label: "Landing page", hint: "Test demand", points: 7 },
    ],
    valentinChoice: 1,
    revealTitle: "What we actually built",
    revealBody: [
      "We shipped a focused MVP: a single, real, end-to-end guided journey for the most common procedure — not three half-finished ones.",
      "Cut from scope: account system, multi-language, fancy animations. Kept: plain-language steps, a progress bar, and a 'you can't get this wrong' tone.",
      "Shipping one journey fully beat shipping five journeys partially. It gave us a clean signal to learn from.",
    ],
    meta: [
      { label: "Scope", value: "1 journey, full depth" },
      { label: "Team", value: "1 design · 2 eng" },
      { label: "Shipped in", value: "4 weeks" },
    ],
  },
  {
    id: "results",
    index: 5,
    dimension: "Reflection",
    tag: "MISSION 05 — RESULTS",
    title: "Read the outcome honestly",
    situation:
      "The MVP has been live for 6 weeks. Completion is up, but the picture is mixed. How do you judge success?",
    prompt: "How do you evaluate it?",
    options: [
      { label: "Celebrate the launch", hint: "We shipped!", points: 6 },
      { label: "Look at completion + drop-off + qualitative feedback", hint: "Full picture", points: 18 },
      { label: "Only track sign-ups", hint: "Vanity metric", points: 5 },
    ],
    valentinChoice: 1,
    revealTitle: "Results, and what I'd do differently",
    revealBody: [
      "Impact: procedure completion rose from 30% to 58%. ~8,400 users reached the guided journey, and support tickets on 'where do I start' dropped 41%.",
      "What worked: the plain-language, reassuring tone moved the metric more than any UI change.",
      "What failed: I under-invested in content tooling, so updating journeys was painful. What I'd do differently today: build the content workflow on day one, not as an afterthought.",
    ],
    meta: [
      { label: "Completion", value: "30% → 58%" },
      { label: "Users reached", value: "8,400" },
      { label: "Tickets", value: "-41%" },
    ],
  },
];

export const MAX_POINTS = CHAPTERS.length * 20;

export function valentinScore(): number {
  const pts = CHAPTERS.reduce((sum, c) => sum + c.options[c.valentinChoice].points, 0);
  return Math.round((pts / MAX_POINTS) * 100);
}

export function computeScore(choices: Record<string, number>): number {
  const pts = CHAPTERS.reduce((sum, c) => {
    const idx = choices[c.id];
    return sum + (idx != null ? c.options[idx]?.points ?? 0 : 0);
  }, 0);
  return Math.round((pts / MAX_POINTS) * 100);
}

export interface DimensionDelta {
  dimension: string;
  delta: number; // user points - valentin points (scaled by 5 for readability)
}

export function computeDeltas(choices: Record<string, number>): DimensionDelta[] {
  return CHAPTERS.map((c) => {
    const userPts = choices[c.id] != null ? c.options[choices[c.id]]?.points ?? 0 : 0;
    const valPts = c.options[c.valentinChoice].points;
    return { dimension: c.dimension, delta: userPts - valPts };
  });
}