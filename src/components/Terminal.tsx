import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TERMINAL_RESPONSES } from "../lib/portfolio-content";

interface Line {
  type: "in" | "out";
  text: string;
}

const INTRO: Line[] = [
  { type: "out", text: "Terminal Valentin.EXE — tapez 'help' pour la liste des commandes." },
];

export function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(INTRO);
  const [value, setValue] = useState("");
  const [matrix, setMatrix] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if (e.key === "`" && !typing) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines, open]);

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") {
      setLines(INTRO);
      return;
    }
    if (cmd === "matrix") {
      setMatrix(true);
      setTimeout(() => setMatrix(false), 4000);
    }
    const out = TERMINAL_RESPONSES[cmd];
    setLines((l) => [
      ...l,
      { type: "in", text: raw },
      ...(out
        ? out.map((t) => ({ type: "out" as const, text: t }))
        : [{ type: "out" as const, text: `commande introuvable : ${cmd} — essayez 'help'` }]),
    ]);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le terminal"
        className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/70 font-mono text-sm text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
      >
        {">_"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-xl overflow-hidden rounded-xl"
            >
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-rose-400/70" />
                <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  valentin@pm.exe — ~
                </span>
              </div>
              <div
                ref={bodyRef}
                className="max-h-[50vh] space-y-1 overflow-y-auto px-4 py-4 font-mono text-sm"
              >
                {lines.map((l, i) => (
                  <div key={i} className={l.type === "in" ? "text-foreground" : "text-muted-foreground"}>
                    {l.type === "in" ? <span className="text-emerald-400">$ </span> : null}
                    {l.text}
                  </div>
                ))}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    run(value);
                    setValue("");
                  }}
                  className="flex items-center"
                >
                  <span className="text-emerald-400">$&nbsp;</span>
                  <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    spellCheck={false}
                    autoComplete="off"
                    className="flex-1 bg-transparent text-foreground outline-none"
                  />
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{matrix && <MatrixRain />}</AnimatePresence>
    </>
  );
}

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = "アイウエオカキクケコｱｲｳ0123456789VALENTINEXE</>";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(0).map(() => Math.random() * -50);

    let raf = 0;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#34d399";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-none fixed inset-0 z-[60] bg-black"
    />
  );
}