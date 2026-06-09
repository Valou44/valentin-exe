import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { FRAMEWORKS } from "../lib/portfolio-content";

export const Route = createFileRoute("/dashboard/thinking")({
  head: () => ({
    meta: [
      { title: "Product Thinking — Valentin Renard" },
      { name: "description", content: "Les méthodes et approches que Valentin Renard utilise pour concevoir des produits." },
    ],
  }),
  component: Thinking,
});

function Thinking() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <p className="font-mono text-xs tracking-[0.25em] text-muted-foreground">// PRODUCT THINKING</p>
      <h1 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight">
        Méthodes & approches
      </h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Ma façon d'aborder la conception produit. Cliquez sur une carte pour la déplier.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {FRAMEWORKS.map((f, i) => {
          const isOpen = open === i;
          return (
            <motion.button
              key={f.name}
              layout
              onClick={() => setOpen(isOpen ? null : i)}
              className="glass rounded-2xl p-6 text-left"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-[var(--font-display)] text-lg font-semibold">{f.name}</h2>
                <span className="font-mono text-xs text-muted-foreground">{isOpen ? "−" : "+"}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{f.summary}</p>
              {isOpen && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 space-y-2"
                >
                  {f.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-sm">
                      <span className="h-1 w-1 rounded-full bg-foreground" />
                      {pt}
                    </li>
                  ))}
                </motion.ul>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}