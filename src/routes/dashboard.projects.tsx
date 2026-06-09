import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "../lib/portfolio-content";

export const Route = createFileRoute("/dashboard/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Valentin Renard" },
      { name: "description", content: "Selected product case studies by Valentin Renard." },
    ],
  }),
  component: Projects,
});

type StringKey = "problem" | "discovery" | "decision" | "solution" | "lessons" | "differently";
const SECTIONS: { key: StringKey; label: string }[] = [
  { key: "problem", label: "The Problem" },
  { key: "discovery", label: "Discovery" },
  { key: "decision", label: "Decision Making" },
  { key: "solution", label: "Solution" },
  { key: "lessons", label: "Lessons Learned" },
  { key: "differently", label: "What I'd Do Differently Today" },
];

function Projects() {
  const [active, setActive] = useState(0);
  const p = PROJECTS[active];

  return (
    <div>
      <p className="font-mono text-xs tracking-[0.25em] text-muted-foreground">// PROJECTS</p>
      <h1 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight">
        Case Studies
      </h1>

      <div className="mt-6 flex flex-wrap gap-2">
        {PROJECTS.map((proj, i) => (
          <button
            key={proj.slug}
            onClick={() => setActive(i)}
            className={[
              "rounded-lg border px-4 py-2 text-sm transition-colors",
              i === active
                ? "border-foreground bg-foreground/10 text-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {proj.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={p.slug}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="mt-8"
        >
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-[var(--font-display)] text-2xl font-bold">{p.name}</h2>
              <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
            </div>
            <p className="mt-2 text-muted-foreground">{p.oneLiner}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* impact */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {p.impact.map((m) => (
                <div key={m.label} className="rounded-xl border border-border p-4 text-center">
                  <div className="font-[var(--font-display)] text-xl font-bold sm:text-2xl">
                    {m.value}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-6">
              {SECTIONS.map((s) => (
                <div key={s.key}>
                  <p className="font-mono text-xs tracking-widest text-muted-foreground">
                    {s.label.toUpperCase()}
                  </p>
                  <p className="mt-2 leading-relaxed text-foreground/90">{p[s.key]}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}