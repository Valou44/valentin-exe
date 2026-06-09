import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Backdrop } from "../components/Noise";
import { SCENARIOS, getScenario } from "../lib/sim-content";
import { useSimStore } from "../lib/sim-store";

export const Route = createFileRoute("/simulation")({
  head: () => ({
    meta: [
      { title: "Simulation — Valentin.EXE" },
      {
        name: "description",
        content: "Choisissez une problématique produit et prenez 5 vraies décisions face à Valentin Renard.",
      },
    ],
  }),
  component: Simulation,
});

function Simulation() {
  const navigate = useNavigate();
  const scenarioId = useSimStore((s) => s.scenarioId);
  const setScenario = useSimStore((s) => s.setScenario);
  const setChoice = useSimStore((s) => s.setChoice);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  if (!scenarioId) {
    return <ScenarioPicker onPick={(id) => setScenario(id)} />;
  }

  const scenario = getScenario(scenarioId);
  const chapters = scenario.chapters;
  const chapter = chapters[step];
  const progress = ((step + (revealed ? 1 : 0.5)) / chapters.length) * 100;

  function pick(i: number) {
    if (revealed) return;
    setSelected(i);
    setChoice(chapter.id, i);
    setTimeout(() => setRevealed(true), 350);
  }

  function next() {
    if (step + 1 >= chapters.length) {
      navigate({ to: "/result" });
      return;
    }
    setStep((s) => s + 1);
    setSelected(null);
    setRevealed(false);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Backdrop />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10">
        {/* progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between font-mono text-xs tracking-widest text-muted-foreground">
            <span>
              <span className={scenario.accent}>{scenario.project.toUpperCase()}</span> · ÉTAPE {chapter.index}/{chapters.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="mt-3 h-px w-full bg-border">
            <motion.div
              className="h-px bg-foreground"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-1 flex-col"
          >
            <p className="font-mono text-xs tracking-[0.25em] text-muted-foreground">
              {chapter.tag}
            </p>
            <h1 className="mt-3 font-[var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              {chapter.title}
            </h1>
            <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-muted-foreground sm:text-lg">
              {chapter.situation}
            </p>

            <p className="mt-8 font-medium text-foreground">{chapter.prompt}</p>

            <div className="mt-4 grid gap-3">
              {chapter.options.map((opt, i) => {
                const isSel = selected === i;
                const isValentin = revealed && i === chapter.valentinChoice;
                return (
                  <button
                    key={opt.label}
                    disabled={revealed}
                    onClick={() => pick(i)}
                    className={[
                      "group flex items-center justify-between rounded-xl border px-5 py-4 text-left transition-all",
                      isSel
                        ? "border-foreground bg-foreground/10"
                        : "border-border glass hover:border-foreground/40",
                      revealed && !isSel && !isValentin ? "opacity-40" : "",
                    ].join(" ")}
                  >
                    <span>
                      <span className="block font-medium">{opt.label}</span>
                      {opt.hint && (
                        <span className="text-sm text-muted-foreground">{opt.hint}</span>
                      )}
                    </span>
                    <span className="ml-4 font-mono text-xs text-muted-foreground">
                      {isValentin ? "CHOIX DE VALENTIN" : isSel ? "VOUS" : ""}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-8 overflow-hidden"
                >
                  <div className="glass rounded-2xl p-6">
                    <p className="font-mono text-xs tracking-widest text-muted-foreground">
                      {chapter.revealTitle.toUpperCase()}
                    </p>
                    <div className="mt-4 space-y-3 text-muted-foreground">
                      {chapter.revealBody.map((p, i) => (
                        <p key={i} className="leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                    {chapter.meta && (
                      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {chapter.meta.map((m) => (
                          <div key={m.label} className="rounded-lg border border-border p-3">
                            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                              {m.label}
                            </div>
                            <div className="mt-1 font-semibold">{m.value}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={next}
                      className="rounded-full bg-foreground px-8 py-3 font-mono text-sm font-semibold tracking-widest text-background transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      {step + 1 >= chapters.length ? "VOIR MON SCORE" : "ÉTAPE SUIVANTE"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

function ScenarioPicker({ onPick }: { onPick: (id: string) => void }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Backdrop />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs tracking-[0.3em] text-muted-foreground"
        >
          CHOISISSEZ VOTRE MISSION
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 font-[var(--font-display)] text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          Quelle problématique voulez-vous résoudre&nbsp;?
        </motion.h1>
        <p className="mt-4 text-muted-foreground">
          Vous prendrez ensuite 5 décisions produit, puis comparerez vos choix à ceux de Valentin sur un vrai projet.
        </p>

        <div className="mt-10 grid gap-4">
          {SCENARIOS.map((s, i) => (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onPick(s.id)}
              className="group glass flex flex-col rounded-2xl border border-border p-6 text-left transition-colors hover:border-foreground/40"
            >
              <span className={`font-mono text-[11px] uppercase tracking-widest ${s.accent}`}>
                {s.inspiration}
              </span>
              <span className="mt-3 text-lg font-semibold leading-snug">{s.question}</span>
              <span className="mt-2 text-sm text-muted-foreground">{s.intro}</span>
              <span className="mt-4 inline-flex items-center font-mono text-xs tracking-widest text-muted-foreground transition-transform group-hover:translate-x-1">
                DÉMARRER →
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </main>
  );
}
