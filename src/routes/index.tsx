import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BootSequence } from "../components/BootSequence";
import { Backdrop } from "../components/Noise";
import { useSimStore } from "../lib/sim-store";
import { SITE_URL } from "../lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Valentin.EXE — Valentin Renard, Product Manager" },
      {
        name: "description",
        content:
          "Vivez le Product Management à travers de vraies décisions. Le portfolio interactif de Valentin Renard, Product Manager à Nantes.",
      },
      { property: "og:title", content: "Valentin.EXE — Valentin Renard" },
      {
        property: "og:description",
        content: "Vivez le Product Management à travers de vraies décisions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: `${SITE_URL}/` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(false);
  const navigate = useNavigate();
  const reset = useSimStore((s) => s.reset);

  function start() {
    reset();
    navigate({ to: "/simulation" });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Backdrop />
      <AnimatePresence mode="wait">
        {!booted ? (
          <BootSequence key="boot" onDone={() => setBooted(true)} />
        ) : (
          <motion.section
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center"
          >
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
            <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-foreground/5 blur-[120px]" />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-1.5 font-mono text-[11px] tracking-[0.3em] text-muted-foreground backdrop-blur"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              OUVERT AUX OPPORTUNITÉS — PRODUCT MANAGER
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="relative mt-8 font-[var(--font-display)] text-5xl font-extrabold leading-[0.95] tracking-tight text-glow sm:text-7xl"
            >
              Valentin Renard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="relative mt-4 font-mono text-sm tracking-[0.25em] text-emerald-400 sm:text-base"
            >
              PRODUCT MANAGER · 10 ANS D'EXPÉRIENCE · NANTES
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="relative mt-8 max-w-xl text-lg leading-relaxed text-foreground/85 sm:text-xl"
            >
              Ne lisez pas mon CV — <span className="font-medium text-foreground">vivez</span> ma
              façon de penser produit. Prenez 5 décisions sur un vrai projet, puis comparez vos
              choix aux miens.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="relative mt-12 flex flex-col items-center gap-4 sm:flex-row"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={start}
                className="rounded-full bg-foreground px-10 py-4 font-mono text-sm font-semibold tracking-[0.2em] text-background transition-shadow hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]"
              >
                DÉMARRER LA SIMULATION
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate({ to: "/dashboard" })}
                className="rounded-full border border-border bg-card/40 px-10 py-4 font-mono text-sm font-semibold tracking-[0.2em] text-foreground backdrop-blur transition-colors hover:border-foreground/40 hover:bg-card/70"
              >
                VOIR LE PORTFOLIO
              </motion.button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="relative mt-10 font-mono text-[11px] tracking-widest text-muted-foreground/60"
            >
              5 décisions · ~5 minutes · astuce : appuyez sur{" "}
              <span className="text-muted-foreground">`</span> pour ouvrir le terminal
            </motion.p>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
