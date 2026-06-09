unchanged# PM.EXE — Interactive Product Management Portfolio

A premium, dark-mode, simulation-style personal site for Valentin Renard. Visitors "become the PM", make real product decisions across 5 chapters, get a Product Thinking Score, then unlock a dashboard portfolio. A hidden terminal adds easter eggs.

Built with placeholder-but-realistic content (clearly marked) that you'll later replace with your real CV. 6 project case studies. The simulation follows one specific project narrative.

## Visual Direction
- Dark mode only: background `#080808`, white type, subtle gray accents, soft gradients, glassmorphism.
- Typography: Inter (body) + Geist (display), loaded via `<link>` in the root head.
- Motion: smooth transitions, progressive reveals, slight parallax, animated boot/typing effects (Framer Motion / `motion`).
- OS/simulation aesthetic — feels like booting a system, not a CV.

## Experience Flow & Routes

```text
/                  Boot sequence → WELCOME → START SIMULATION
/simulation        5-chapter mission flow (single immersive route, state-driven)
/result            Product Thinking Score + comparison with Valentin
/dashboard         Unlocked OS-style portfolio hub
/dashboard/about
/dashboard/projects        (6 case studies, smooth in-page navigation)
/dashboard/thinking        (frameworks as interactive cards)
/dashboard/experiments
/dashboard/contact         (links incl. LinkedIn)
```

Terminal easter egg: a global overlay (toggle via the backtick key or a subtle dock icon) available anywhere, responding to `whoami`, `projects`, `current_focus`, `biggest_failure`, `future`, `help`, `clear`.

## Landing (`/`)
- Full-screen black hero.
- Boot sequence typing animation: Initializing… / Loading experiences… / products… / learnings… / failures… / Simulation ready.
- Then: "WELCOME. Today, you're the Product Manager. You have 10 minutes. Good luck."
- Large `START SIMULATION` CTA. No nav menu visible.

## Simulation (`/simulation`)
Progress indicator `Mission X/5`. One step at a time with reveal-after-choice pattern. Choices stored in a small global store (Zustand or React context) to compute the score.

1. **The Problem** — present a user problem, 3 options (Build / Interviews / Marketing), then reveal Valentin's actual approach + reasoning.
2. **Discovery** — user-interview snippets; pick the main pain point; reveal the real insight + reasoning.
3. **Prioritization** — 4 solution options (AI assistant / Guided journeys / Knowledge base / Human coaching); reveal choice + trade-offs, risks, constraints.
4. **Delivery** — constraint ("4 weeks"); choose MVP / Full Product / Prototype / Landing Page; reveal what was built with wireframe/screenshot placeholders + decisions.
5. **Results** — impact metrics; then What worked / What failed / What I'd do differently.

All 5 chapters follow one consistent project storyline (placeholder, to be swapped for your real flagship project).

## Result (`/result`)
- Animated Product Thinking Score (e.g. 83/100) derived from choices.
- Per-dimension comparison vs Valentin (Discovery +10, Prioritization +4, Delivery −3, etc.).
- Gamified reveal animation → CTA "Unlock Portfolio" → `/dashboard`.

## Dashboard / Portfolio
Futuristic OS-style shell with a sidebar/dock and the 5 sections. 

- **About Me** — bio, 10y PM, parcours timeline.
- **Projects** — 6 premium case studies, each: The Problem → Discovery → Decision Making → Solution → Impact → Lessons Learned → What I'd Do Differently. Smooth navigation between projects.
- **Product Thinking** — frameworks (Discovery, Prioritization, User Research, Roadmapping, Metrics) as interactive cards.
- **Experiments** — smaller bets / side explorations.
- **Contact** — email + LinkedIn (https://www.linkedin.com/in/valentin-renard-149200a9/).

## Content
All copy, metrics, and project details will be realistic placeholders, clearly marked with comments so they're easy to find and replace. Wireframe/screenshot slots use generated abstract visuals or styled placeholder blocks.

## SEO & Responsiveness
- Per-route `head()` metadata (title <60, description <160, og/twitter), single H1 per page, semantic HTML, JSON-LD Person schema on About.
- Fully responsive desktop + mobile; the simulation and terminal adapt to touch.

## Technical Notes
- Stack: TanStack Start (React 19) + TypeScript + Tailwind v4 + `motion` for animations. (Equivalent capabilities to the requested Next.js; not literally Next.js.)
- Design tokens (`#080808`, grays, gradients, radii) defined in `src/styles.css` under `@theme`.
- Fonts via `<link>` in `src/routes/__root.tsx` (no CSS `@import` of URLs).
- Simulation/score state in a lightweight store; persisted so the unlocked dashboard stays accessible.
- Clean component architecture: `src/components/sim/`, `src/components/dashboard/`, `src/components/terminal/`, shared UI in `src/components/ui/`.
- Reusable building blocks: BootSequence, MissionStep, ChoiceCard, RevealPanel, ScoreMeter, OSShell, CaseStudy, FrameworkCard, Terminal.

## Build Order (single pass)
1. Tokens, fonts, layout shell, global motion setup.
2. Landing boot sequence + START.
3. Simulation engine + 5 chapters + state/scoring.
4. Result screen + unlock.
5. Dashboard shell + 5 sections + 6 case studies.
6. Terminal overlay + commands.
7. SEO metadata, responsive polish, QA in preview.