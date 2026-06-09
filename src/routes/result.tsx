import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Backdrop } from "../components/Noise";
import { useSimStore } from "../lib/sim-store";
import { computeScore, computeDeltas, valentinScore, getScenario } from "../lib/sim-content";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "Votre score de Product Thinking — Valentin.EXE" },
      { name: "description", content: "Votre score de product thinking, comparé à celui de Valentin Renard." },
    ],
  }),
  component: Result,
});

function Result() {
  const navigate = useNavigate();
  const choices = useSimStore((s) => s.choices);
  const unlock = useSimStore((s) => s.unlock);
  const scenarioId = useSimStore((s) => s.scenarioId);
  const scenario = getScenario(scenarioId);
  const target = computeScore(scenario.id, choices);
  const deltas = computeDeltas(scenario.id, choices);
  const vScore = valentinScore(scenario.id);
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Backdrop />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-xs tracking-[0.3em] text-muted-foreground"
        >
          SIMULATION TERMINÉE
        </motion.p>
        <h1 className="mt-4 font-[var(--font-display)] text-2xl font-bold">
          Score de Product Thinking
        </h1>
        <p className={`mt-2 font-mono text-xs uppercase tracking-widest ${scenario.accent}`}>
          {scenario.project}
        </p>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-glow"
        >
          <span className="font-[var(--font-display)] text-8xl font-extrabold tracking-tight sm:text-9xl">
            {display}
          </span>
          <span className="text-3xl text-muted-foreground"> / 100</span>
        </motion.div>

        <p className="mt-6 text-muted-foreground">
          Valentin a obtenu <span className="text-foreground">{vScore}</span> sur les mêmes décisions.
        </p>

        <div className="mt-10 w-full max-w-md">
          <p className="mb-4 font-mono text-xs tracking-widest text-muted-foreground">
            COMPARAISON AVEC VALENTIN
          </p>
          <div className="space-y-3">
            {deltas.map((d, i) => (
              <motion.div
                key={d.dimension}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.12 }}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-left"
              >
                <span className="text-sm">{d.dimension}</span>
                <span
                  className={[
                    "font-mono text-sm",
                    d.delta > 0
                      ? "text-emerald-400"
                      : d.delta < 0
                        ? "text-rose-400"
                        : "text-muted-foreground",
                  ].join(" ")}
                >
                  {d.delta > 0 ? "+" : ""}
                  {d.delta}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
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