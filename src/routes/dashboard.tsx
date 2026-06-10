import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Backdrop } from "../components/Noise";
import { PROFILE } from "../lib/portfolio-content";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Portfolio — Valentin Renard, Product Manager" },
      {
        name: "description",
        content:
          "Le portfolio de Valentin Renard, Product Manager : projets, product thinking et expérimentations.",
      },
    ],
  }),
  component: DashboardLayout,
});

const NAV = [
  { to: "/dashboard", label: "À propos", crumb: "about_me", exact: true },
  { to: "/dashboard/projects", label: "Projets", crumb: "projects", exact: false },
  { to: "/dashboard/thinking", label: "Méthode", crumb: "process", exact: false },
  { to: "/dashboard/contact", label: "Contact", crumb: "contact", exact: false },
] as const;

function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current =
    [...NAV].reverse().find((n) =>
      n.exact ? pathname === n.to : pathname.startsWith(n.to),
    ) ?? NAV[0];

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Backdrop />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-3 py-4 sm:px-6 sm:py-6">
        <div className="glass flex flex-1 flex-col overflow-hidden rounded-2xl border border-border md:flex-row">
          {/* sidebar */}
          <aside className="flex flex-col border-b border-border p-5 md:w-64 md:shrink-0 md:border-b-0 md:border-r">
            <Link to="/" className="mb-8 inline-flex items-center gap-2 font-mono text-base font-bold tracking-tight md:mb-12">
              <span className="text-emerald-400">v_</span>
              Valentin<span className="text-muted-foreground">.EXE</span>
            </Link>

            <nav className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.exact }}
                  className="group flex shrink-0 items-center gap-3 rounded-md px-3 py-2 font-mono text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground data-[status=active]:border data-[status=active]:border-border data-[status=active]:bg-foreground/[0.04] data-[status=active]:text-foreground"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/15 transition-all group-hover:bg-foreground/40 group-data-[status=active]:bg-emerald-400 group-data-[status=active]:shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 hidden border-t border-border pt-6 md:mt-auto md:block">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Status
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs text-foreground/80">Ouvert aux opportunités</span>
              </div>
            </div>
          </aside>

          {/* content */}
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/80 px-5 py-3 backdrop-blur-md sm:px-8">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-muted-foreground">user:</span>
                <span className="text-foreground/70">/root/{current.crumb}</span>
              </div>
              <span className="hidden font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:inline">
                {PROFILE.name} · {PROFILE.role}
              </span>
            </header>

            <main className="min-w-0 flex-1 px-5 py-8 pb-16 sm:px-8 lg:px-10">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}