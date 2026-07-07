import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Backdrop } from "../components/Noise";
import { useSimStore } from "../lib/sim-store";
import { computeScore, computeDeltas, valentinScore, findScenario, DEFAULT_SCENARIOS } from "../lib/sim-content";
import { scenariosQueryOptions } from "../lib/scenarios";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "Votre score de Product Thinking — Valentin.EXE" },
      { name: "description", content: "Votre score de product thinking, comparé à celui de Valentin Renard." },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: Result,
});

function Result() {
  const navigate = useNavigate();
  const { data: scenarios = DEFAULT_SCENARIOS } = useQuery(scenariosQueryOptions);
  const choices = useSimStore((s) => s.choices);
  const unlock = useSimStore((s) => s.unlock);
  const scenarioId = useSimStore((s) => s.scenarioId);
  const scenario = findScenario(scenarios, scenarioId);
  const target = computeScore(scenario, choices);
  const deltas = computeDeltas(scenario, choices);
  const vScore = valentinScore(scenario);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  function enter() {
    unlock();
    navigate({ to: "/dashboard" });
  }

  const verdict = getVerdict(target, vScore);
  const maxAbsDelta = Math.max(1, ...deltas.map((d) => Math.abs(d.delta)));

  // gauge geometry
  const R = 84;
  const C = 2 * Math.PI * R;
  const dash = (display / 100) * C;

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Backdrop />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
      <div
        className={`pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full opacity-20 blur-[100px] ${accentBg(scenario.accent)}`}
      />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-xs tracking-[0.3em] text-muted-foreground"
        >
          SIMULATION TERMINÉE
        </motion.p>
        <h1 className="mt-4 font-[var(--font-display)] text-2xl font-bold sm:text-3xl">
          Score de Product Thinking
        </h1>
        <p className={`mt-2 font-mono text-xs uppercase tracking-widest ${scenario.accent}`}>
          {scenario.project}
        </p>

        {/* Score gauge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mt-10 grid place-items-center"
        >
          <svg width="220" height="220" viewBox="0 0 220 220" className="-rotate-90">
            <circle
              cx="110"
              cy="110"
              r={R}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-border"
            />
            <circle
              cx="110"
              cy="110"
              r={R}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${C}`}
              className={scenario.accent}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-glow">
            <div className="flex items-baseline">
              <span className="font-[var(--font-display)] text-7xl font-extrabold tracking-tight">
                {display}
              </span>
              <span className="ml-1 text-xl text-muted-foreground">/100</span>
            </div>
          </div>
        </motion.div>

        {/* Verdict */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`mt-6 inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5 font-mono text-xs tracking-widest ${scenario.accent}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {verdict.label}
        </motion.p>

        {/* You vs Valentin bars */}
        <div className="mt-10 w-full max-w-md space-y-4">
          <ScoreBar label="Vous" value={target} delay={0.7} colorClass={scenario.accent} />
          <ScoreBar label="Valentin" value={vScore} delay={0.85} colorClass="text-foreground" />
        </div>

        {/* Dimension comparison */}
        <div className="mt-12 w-full max-w-md">
          <p className="mb-4 font-mono text-xs tracking-widest text-muted-foreground">
            DÉTAIL PAR DIMENSION
          </p>
          <div className="space-y-2.5">
            {deltas.map((d, i) => {
              const pct = (Math.abs(d.delta) / maxAbsDelta) * 50;
              const positive = d.delta > 0;
              const neutral = d.delta === 0;
              return (
                <motion.div
                  key={d.dimension}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="glass rounded-xl border border-border px-4 py-3 text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{d.dimension}</span>
                    <span
                      className={[
                        "font-mono text-sm",
                        positive ? "text-emerald-400" : neutral ? "text-muted-foreground" : "text-rose-400",
                      ].join(" ")}
                    >
                      {neutral ? "= identique" : `${positive ? "+" : ""}${d.delta}`}
                    </span>
                  </div>
                  {/* diverging bar */}
                  <div className="relative mt-2 h-1.5 w-full rounded-full bg-muted">
                    <div className="absolute left-1/2 top-0 h-full w-px bg-border" />
                    {!neutral && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}
                        className={[
                          "absolute top-0 h-full rounded-full",
                          positive ? "left-1/2 bg-emerald-400" : "right-1/2 bg-rose-400",
                        ].join(" ")}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={enter}
          className="mt-12 rounded-full bg-foreground px-10 py-4 font-mono text-sm font-semibold tracking-[0.2em] text-background transition-shadow hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]"
        >
          DÉBLOQUER LE PORTFOLIO →
        </motion.button>
      </div>
    </main>
  );
}

function ScoreBar({
  label,
  value,
  delay,
  colorClass,
}: {
  label: string;
  value: number;
  delay: number;
  colorClass: string;
}) {
  return (
    <div className="text-left">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-mono text-xs tracking-widest text-muted-foreground">
          {label.toUpperCase()}
        </span>
        <span className="font-mono text-sm">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay, duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${accentBg(colorClass)}`}
        />
      </div>
    </div>
  );
}

function getVerdict(score: number, vScore: number): { label: string } {
  const gap = vScore - score;
  if (gap <= 0) return { label: "PRODUCT THINKING D'ÉLITE" };
  if (gap <= 10) return { label: "TRÈS BON INSTINCT PRODUIT" };
  if (gap <= 25) return { label: "BON POTENTIEL PRODUIT" };
  return { label: "EN ROUTE VERS LE PRODUCT THINKING" };
}

/** Map a `text-*` accent class to its `bg-*` equivalent (Tailwind needs static classes). */
function accentBg(accent: string): string {
  const map: Record<string, string> = {
    "text-amber-400": "bg-amber-400",
    "text-sky-400": "bg-sky-400",
    "text-emerald-400": "bg-emerald-400",
    "text-foreground": "bg-foreground",
  };
  return map[accent] ?? "bg-foreground";
}