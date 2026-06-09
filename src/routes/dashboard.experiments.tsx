import { createFileRoute } from "@tanstack/react-router";
import { EXPERIMENTS } from "../lib/portfolio-content";

export const Route = createFileRoute("/dashboard/experiments")({
  head: () => ({
    meta: [
      { title: "Expérimentations — Valentin Renard" },
      { name: "description", content: "Les paris produit de Valentin Renard : réussites, échecs et apprentissages." },
    ],
  }),
  component: Experiments,
});

const STYLE = {
  win: { label: "RÉUSSI", cls: "text-emerald-400 border-emerald-400/30" },
  fail: { label: "ÉCHEC", cls: "text-rose-400 border-rose-400/30" },
  mixed: { label: "MITIGÉ", cls: "text-amber-400 border-amber-400/30" },
} as const;

function Experiments() {
  return (
    <div>
      <p className="font-mono text-xs tracking-[0.25em] text-muted-foreground">// EXPÉRIMENTATIONS</p>
      <h1 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight">
        Paris & apprentissages
      </h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Tout ne fonctionne pas. Voici ce que j'ai tenté et ce que j'en ai appris.
      </p>

      <div className="mt-8 space-y-4">
        {EXPERIMENTS.map((e) => (
          <div
            key={e.name}
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
          </div>
        ))}
      </div>
    </div>
  );
}