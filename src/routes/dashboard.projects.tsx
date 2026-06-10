import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { caseStudiesQueryOptions, DEFAULT_CASE_STUDIES } from "../lib/case-studies";

export const Route = createFileRoute("/dashboard/projects")({
  head: () => ({
    meta: [
      { title: "Projets — Valentin Renard" },
      { name: "description", content: "Études de cas produit sélectionnées par Valentin Renard." },
      { property: "og:title", content: "Projets — Valentin Renard" },
      { property: "og:description", content: "Études de cas produit sélectionnées par Valentin Renard." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://valentin-exe.lovable.app/dashboard/projects" },
    ],
    links: [{ rel: "canonical", href: "https://valentin-exe.lovable.app/dashboard/projects" }],
  }),
  component: Projects,
});

type StringKey = "problem" | "discovery" | "decision" | "solution" | "lessons" | "differently";
const SECTIONS: { key: StringKey; label: string }[] = [
  { key: "problem", label: "Le problème" },
  { key: "discovery", label: "Discovery" },
  { key: "decision", label: "Prise de décision" },
  { key: "solution", label: "Solution" },
  { key: "lessons", label: "Ce que j'en retiens" },
  { key: "differently", label: "Ce que je ferais différemment" },
];

function Projects() {
  const [active, setActive] = useState(0);
  const { data: PROJECTS = DEFAULT_CASE_STUDIES } = useQuery(caseStudiesQueryOptions);
  const p = PROJECTS[active] ?? PROJECTS[0];

  if (!p) return null;

  return (
    <div>
      <div className="flex items-center gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          // Projets
        </p>
        <div className="h-px flex-1 bg-border" />
      </div>
      <h1 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight">
        Études de cas
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Une sélection de produits conçus et pilotés de bout en bout — du cadrage à la mise en production.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {PROJECTS.map((proj, i) => (
          <button
            key={proj.slug}
            onClick={() => setActive(i)}
            className={[
              "group flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors",
              i === active
                ? "border-foreground/40 bg-foreground/[0.06] text-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            <span
              className={[
                "h-1.5 w-1.5 rounded-full transition-all",
                i === active
                  ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]"
                  : "bg-foreground/15 group-hover:bg-foreground/40",
              ].join(" ")}
            />
            {proj.name}
            <span className="ml-2 font-mono text-[10px] text-muted-foreground">{proj.year}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={p.slug}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="mt-8"
        >
          <div className="glass overflow-hidden rounded-2xl">
            {/* cover image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border bg-secondary">
              <img
                src={p.image}
                alt={`Aperçu du projet ${p.name}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="glass rounded-full px-3 py-1 font-mono text-[11px] text-foreground/90"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="mt-3 font-[var(--font-display)] text-3xl font-bold text-glow sm:text-4xl">
                  {p.name}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <p className="max-w-2xl text-lg text-muted-foreground">{p.oneLiner}</p>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex shrink-0 items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:border-foreground/40 hover:bg-foreground/5"
                  >
                    Voir le projet
                    <span className="transition-transform group-hover:translate-x-0.5">↗</span>
                  </a>
                )}
              </div>

              {/* impact */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {p.impact.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-border bg-foreground/[0.02] p-4 text-center"
                  >
                    <div className="font-[var(--font-display)] text-lg font-bold sm:text-2xl">
                      {m.value}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* gallery */}
              {p.gallery && p.gallery.length > 1 && (
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {p.gallery.map((src, i) => (
                    <div
                      key={i}
                      className="aspect-[4/3] overflow-hidden rounded-xl border border-border bg-secondary"
                    >
                      <img
                        src={src}
                        alt={`${p.name} — visuel ${i + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {SECTIONS.map((s) => (
                  <div key={s.key} className="border-l-2 border-border/60 pl-4">
                    <p className="font-mono text-xs tracking-widest text-muted-foreground">
                      {s.label.toUpperCase()}
                    </p>
                    <p className="mt-2 leading-relaxed text-foreground/90">{p[s.key]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}