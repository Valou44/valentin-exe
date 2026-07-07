import { useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function FloatingNavButton() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  const fullLabel = isDashboard ? "Revenir à la simulation" : "Accéder au portfolio";
  const shortLabel = isDashboard ? "Simulation" : "Portfolio";
  const target = isDashboard ? "/simulation" : "/dashboard";

  return (
    <motion.button
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate({ to: target })}
      className="fixed right-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 font-mono text-xs font-medium tracking-wider text-foreground backdrop-blur transition-colors hover:border-emerald-400/50 hover:bg-foreground/[0.06] sm:right-6 sm:top-6"
    >
      {isDashboard ? <span aria-hidden="true">←</span> : null}
      <span className="sm:hidden">{shortLabel}</span>
      <span className="hidden sm:inline">{fullLabel}</span>
      {isDashboard ? null : <span aria-hidden="true">→</span>}
    </motion.button>
  );
}