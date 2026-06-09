import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
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
  { to: "/dashboard", label: "À propos", exact: true },
  { to: "/dashboard/projects", label: "Projets", exact: false },
  { to: "/dashboard/thinking", label: "Méthode et approche", exact: false },
  { to: "/dashboard/contact", label: "Contact", exact: false },
] as const;

function DashboardLayout() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Backdrop />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6">
        {/* top bar */}
        <header className="flex items-center justify-between border-b border-border py-4">
          <Link to="/" className="font-mono text-sm font-semibold tracking-[0.2em]">
            Valentin<span className="text-muted-foreground">.EXE</span>
          </Link>
          <span className="font-mono text-[11px] text-muted-foreground">
            {PROFILE.name} · {PROFILE.role}
          </span>
        </header>

        <div className="flex flex-1 flex-col gap-6 py-6 md:flex-row">
          {/* sidebar */}
          <nav className="md:w-52 md:shrink-0">
            <ul className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
              {NAV.map((item) => (
                <li key={item.to} className="shrink-0">
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.exact }}
                    className="block whitespace-nowrap rounded-lg px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-foreground/10 data-[status=active]:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* content */}
          <main className="min-w-0 flex-1 pb-16">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}