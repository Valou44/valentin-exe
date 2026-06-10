import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FRAMEWORKS } from "../lib/portfolio-content";

export const Route = createFileRoute("/dashboard/thinking")({
  head: () => ({
    meta: [
      { title: "Méthode et approche — Valentin Renard" },
      { name: "description", content: "Les méthodes et approches que Valentin Renard utilise pour concevoir des produits." },
      { property: "og:title", content: "Méthode et approche — Valentin Renard" },
      { property: "og:description", content: "Les méthodes et approches que Valentin Renard utilise pour concevoir des produits." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://valentin-exe.lovable.app/dashboard/thinking" },
    ],
    links: [{ rel: "canonical", href: "https://valentin-exe.lovable.app/dashboard/thinking" }],
  }),
  component: Thinking,
});

function Thinking() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <div className="flex items-center gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          // Méthode et approche
        </p>
        <div className="h-px flex-1 bg-border" />
      </div>
      <h1 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight">
        Méthodes & approches
      </h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Ma façon d'aborder la conception produit. Cliquez sur une carte pour la déplier.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {FRAMEWORKS.map((f, i) => {
          const isOpen = open === i;
          const num = String(i + 1).padStart(2, "0");
          return (
            <motion.button
              key={f.name}
              layout
              onClick={() => setOpen(isOpen ? null : i)}
              className={`group glass relative overflow-hidden rounded-2xl p-6 text-left transition-colors ${
                isOpen ? "border-foreground/40" : "hover:border-foreground/25"
              }`}
            >
              {/* accent bar */}
              <span
                className={`absolute inset-y-0 left-0 w-1 origin-top bg-emerald-400 transition-transform duration-300 ${
                  isOpen ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                }`}
              />
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground/70">{num}</span>
                  <h2 className="font-[var(--font-display)] text-lg font-semibold">{f.name}</h2>
                </div>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border font-mono text-xs text-muted-foreground transition-transform duration-300 ${
                    isOpen ? "rotate-45 border-foreground/40 text-foreground" : ""
                  }`}
                >
                  +
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.summary}</p>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {f.points.map((pt) => (
                        <li
                          key={pt}
                          className="rounded-full border border-border bg-foreground/5 px-3 py-1 font-mono text-xs text-muted-foreground"
                        >
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}