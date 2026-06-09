import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Backdrop } from "../components/Noise";
import { CHAPTERS } from "../lib/sim-content";
import { useSimStore } from "../lib/sim-store";

export const Route = createFileRoute("/simulation")({
  head: () => ({
    meta: [
      { title: "Simulation — PM.EXE" },
      {
        name: "description",
        content: "Step into 5 real product decisions and discover how Valentin Renard thinks.",
      },
    ],
  }),
  component: Simulation,
});

function Simulation() {
  const navigate = useNavigate();
  const setChoice = useSimStore((s) => s.setChoice);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const chapter = CHAPTERS[step];
  const progress = ((step + (revealed ? 1 : 0.5)) / CHAPTERS.length) * 100;

  function pick(i: number) {
    if (revealed) return;
    setSelected(i);
    setChoice(chapter.id, i);
    setTimeout(() => setRevealed(true), 350);
  }

  function next() {
    if (step + 1 >= CHAPTERS.length) {
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
            <span>MISSION {chapter.index}/{CHAPTERS.length}</span>
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
                      {isValentin ? "VALENTIN'S PICK" : isSel ? "YOU" : ""}
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
                      {step + 1 >= CHAPTERS.length ? "SEE YOUR SCORE" : "NEXT MISSION"}
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