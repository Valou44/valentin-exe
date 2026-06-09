import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { EXPERIMENTS } from "../lib/portfolio-content";

export const Route = createFileRoute("/dashboard/experiments")({
  head: () => ({
    meta: [
      { title: "Experiments — Valentin Renard" },
      { name: "description", content: "Small product bets, wins and failures by Valentin Renard." },
    ],
  }),
  component: Experiments,
});

const STYLE = {
  win: { label: "WIN", cls: "text-emerald-400 border-emerald-400/30" },
  fail: { label: "FAIL", cls: "text-rose-400 border-rose-400/30" },
  mixed: { label: "MIXED", cls: "text-amber-400 border-amber-400/30" },
} as const;

function Experiments() {
  return (
    <div>
      <p className="font-mono text-xs tracking-[0.25em] text-muted-foreground">// EXPERIMENTS</p>
      <h1 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight">
        Bets & Learnings
      </h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Not everything works. Here's what I tried and what it taught me.
      </p>

      <div className="mt-8 space-y-4">
        {EXPERIMENTS.map((e, i) => (
          <motion.div
            key={e.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="glass flex items-start justify-between gap-4 rounded-xl p-5"
          >
            <div>
              <h2 className="font-semibold">{e.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{e.description}</p>
            </div>
            <span
              className={`shrink-0 rounded-full border px-3 py-1 font-mono text-[10px] tracking-widest ${STYLE[e.result].cls}`}
            >
              {STYLE[e.result].label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}