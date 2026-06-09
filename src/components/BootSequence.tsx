import { useEffect, useState } from "react";
import { motion } from "motion/react";

const LINES = [
  "Initializing...",
  "Loading experiences...",
  "Loading products...",
  "Loading learnings...",
  "Loading failures...",
  "Simulation ready.",
];

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= LINES.length) {
      const t = setTimeout(onDone, 650);
      return () => clearTimeout(t);
    }
    const delay = shown === 0 ? 350 : 480;
    const t = setTimeout(() => setShown((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [shown, onDone]);

  return (
    <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 font-mono text-sm sm:text-base">
      <div className="space-y-2">
        {LINES.slice(0, shown).map((line, i) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <span className="text-muted-foreground">{">"}</span>
            <span
              className={
                i === LINES.length - 1
                  ? "text-foreground text-glow"
                  : "text-muted-foreground"
              }
            >
              {line}
            </span>
            {i === LINES.length - 1 && (
              <span className="text-foreground">✓</span>
            )}
          </motion.div>
        ))}
        {shown < LINES.length && (
          <span className="inline-block h-4 w-2 bg-foreground caret-blink align-middle" />
        )}
      </div>
    </div>
  );
}