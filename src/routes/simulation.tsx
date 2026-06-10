import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { Backdrop } from "../components/Noise";
import { findScenario, DEFAULT_SCENARIOS, type Scenario } from "../lib/sim-content";
import { scenariosQueryOptions } from "../lib/scenarios";
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
  const { data: scenarios = DEFAULT_SCENARIOS } = useQuery(scenariosQueryOptions);
  const scenarioId = useSimStore((s) => s.scenarioId);
  const setScenario = useSimStore((s) => s.setScenario);
  const setChoice = useSimStore((s) => s.setChoice);
  const reset = useSimStore((s) => s.reset);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const topRef = useRef<HTMLDivElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);

  if (!scenarioId) {
    return <ScenarioPicker scenarios={scenarios} onPick={(id) => setScenario(id)} />;
  }

  const scenario = findScenario(scenarios, scenarioId);
  const chapters = scenario.chapters;
  const chapter = chapters[step];
  const progress = ((step + (revealed ? 1 : 0.5)) / chapters.length) * 100;

  function pick(i: number) {
    if (revealed) return;
    setSelected(i);
    setChoice(chapter.id, i);
    setTimeout(() => {
      setRevealed(true);
      setTimeout(() => {
        revealRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }, 350);
  }

  function next() {
    if (step + 1 >= chapters.length) {
      navigate({ to: "/result" });
      return;
    }
    setStep((s) => s + 1);
    setSelected(null);
    setRevealed(false);
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Backdrop />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10">
        {/* progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between font-mono text-xs tracking-widest text-muted-foreground">
            <span>
              <span className={scenario.accent}>{scenario.project.toUpperCase()}</span> · ÉTAPE {chapter.index}/{chapters.length}
            </span>
            <button
              onClick={() => {
                reset();
                setStep(0);
                setSelected(null);
                setRevealed(false);
              }}
              className="rounded-full border border-border px-3 py-1 text-[10px] tracking-widest text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              ← CHANGER DE PARCOURS
            </button>
          </div>
          <div className="mt-3 h-px w-full bg-border">
            <motion.div
              className="h-px bg-foreground"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
          <div className="mt-2 text-right font-mono text-[10px] tracking-widest text-muted-foreground">
            {Math.round(progress)}%
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
            <p className={`font-mono text-xs tracking-[0.25em] ${scenario.accent}`}>
              {chapter.tag}
            </p>
            <h1 className="mt-3 font-[var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              {chapter.title}
            </h1>
            <div className="mt-6 rounded-2xl border border-border bg-card/40 p-5 backdrop-blur">
              <p className="whitespace-pre-line text-base leading-relaxed text-foreground/85 sm:text-lg">
                {chapter.situation}
              </p>
            </div>

            <p className="mt-8 text-lg font-semibold text-foreground">{chapter.prompt}</p>

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
                      "group flex items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-all",
                      isValentin
                        ? "border-emerald-400/60 bg-emerald-400/10"
                        : isSel
                          ? "border-foreground bg-foreground/10"
                          : "border-border glass hover:border-foreground/40 hover:bg-foreground/5",
                      revealed && !isSel && !isValentin ? "opacity-40" : "",
                    ].join(" ")}
                  >
                    <span className="flex items-start gap-3">
                      <span
                        className={[
                          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border font-mono text-xs",
                          isSel || isValentin ? "border-foreground/40 text-foreground" : "border-border text-muted-foreground",
                        ].join(" ")}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>
                        <span className="block font-medium leading-snug">{opt.label}</span>
                        {opt.hint && (
                          <span className="text-sm text-muted-foreground">{opt.hint}</span>
                        )}
                      </span>
                    </span>
                    {(isValentin || isSel) && (
                      <span
                        className={[
                          "ml-2 shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-widest",
                          isValentin ? "bg-emerald-400/15 text-emerald-300" : "bg-foreground/10 text-foreground",
                        ].join(" ")}
                      >
                        {isValentin ? "VALENTIN" : "VOUS"}
                      </span>
                    )}
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
                  <div className="relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6 backdrop-blur">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent" />
                    <p className={`flex items-center gap-2 font-mono text-xs tracking-widest ${scenario.accent}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {chapter.revealTitle.toUpperCase()}
                    </p>
                    <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-foreground/80">
                      {chapter.revealBody.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                    {chapter.meta && (
                      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {chapter.meta.map((m) => (
                          <div
                            key={m.label}
                            className="rounded-xl border border-border bg-background/40 p-4"
                          >
                            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                              {m.label}
                            </div>
                            <div className={`mt-1.5 text-base font-semibold ${scenario.accent}`}>{m.value}</div>
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

function ScenarioPicker({
  scenarios,
  onPick,
}: {
  scenarios: Scenario[];
  onPick: (id: string) => void;
}) {
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
          {scenarios.map((s, i) => (
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
