import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PROFILE, TIMELINE } from "../lib/portfolio-content";

export const Route = createFileRoute("/dashboard/")({
  component: About,
});

function About() {
  return (
    <div className="space-y-12">
      <section>
        <p className="font-mono text-xs tracking-[0.25em] text-muted-foreground">
          // ABOUT ME
        </p>
        <h1 className="mt-4 font-[var(--font-display)] text-4xl font-extrabold tracking-tight sm:text-5xl">
          {PROFILE.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {PROFILE.role} · {PROFILE.years} years · {PROFILE.location}
        </p>
        <div className="mt-6 max-w-2xl space-y-4 text-muted-foreground">
          {PROFILE.bio.map((p, i) => (
            <p key={i} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-muted-foreground">Currently:</span>
          <span>{PROFILE.currentFocus}</span>
        </div>
      </section>

      <section>
        <p className="mb-5 font-mono text-xs tracking-widest text-muted-foreground">
          PARCOURS
        </p>
        <div className="space-y-4">
          {TIMELINE.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-semibold">
                  {t.title} · <span className="text-muted-foreground">{t.company}</span>
                </h2>
                <span className="font-mono text-xs text-muted-foreground">{t.period}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}