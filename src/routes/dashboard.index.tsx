import { createFileRoute } from "@tanstack/react-router";
import { PROFILE, TIMELINE } from "../lib/portfolio-content";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "À propos — Valentin Renard, Product Manager" },
      { name: "description", content: "À propos de Valentin Renard, Product Manager à Nantes : parcours, expertise et approche produit." },
      { property: "og:title", content: "À propos — Valentin Renard, Product Manager" },
      { property: "og:description", content: "À propos de Valentin Renard, Product Manager à Nantes : parcours, expertise et approche produit." },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://valentin-exe.lovable.app/dashboard" },
    ],
    links: [{ rel: "canonical", href: "https://valentin-exe.lovable.app/dashboard" }],
  }),
  component: About,
});

function About() {
  const contacts = [
    { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { label: "Téléphone", value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, "")}` },
    { label: "LinkedIn", value: "valentin-renard", href: PROFILE.linkedin },
  ];
  return (
    <div className="space-y-12">
      <section>
        <p className="font-mono text-xs tracking-[0.25em] text-muted-foreground">
          // À PROPOS
        </p>
        <div className="mt-6 grid gap-8 md:grid-cols-[260px_1fr] md:items-start">
          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-[260px]">
            <div className="absolute -inset-2 rounded-3xl bg-[var(--gradient-primary,linear-gradient(135deg,var(--primary),transparent))] opacity-20 blur-xl" />
            <div className="glass relative aspect-[4/5] overflow-hidden rounded-3xl">
              {PROFILE.photo ? (
                <img
                  src={PROFILE.photo}
                  alt={`Portrait de ${PROFILE.name}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-foreground/5">
                  <span className="font-[var(--font-display)] text-5xl font-extrabold tracking-tight text-muted-foreground">
                    VR
                  </span>
                  <span className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Photo à venir
                  </span>
                </div>
              )}
              <span className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] uppercase tracking-widest text-foreground/70">
                ./portrait.png
              </span>
            </div>
          </div>

          {/* Intro */}
          <div>
            <h1 className="font-[var(--font-display)] text-4xl font-extrabold tracking-tight sm:text-5xl">
              {PROFILE.name}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {PROFILE.role} · {PROFILE.years} ans d'expérience · {PROFILE.location}
            </p>
            <div className="mt-6 max-w-2xl space-y-4 text-muted-foreground">
              {PROFILE.bio.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-muted-foreground">Actuellement :</span>
          <span>{PROFILE.currentFocus}</span>
        </div>

        {/* contacts */}
        <div className="mt-6 flex flex-wrap gap-2">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:border-foreground/40 hover:bg-foreground/5"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {c.label}
              </span>
              <span>{c.value}</span>
              <span className="text-muted-foreground transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          ))}
        </div>
          </div>
        </div>
      </section>

      <section>
        <p className="mb-5 font-mono text-xs tracking-widest text-muted-foreground">
          PARCOURS
        </p>
        <div className="relative space-y-4 border-l border-border/60 pl-6">
          {TIMELINE.map((t) => (
            <div key={t.title} className="relative">
              <span className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full border border-foreground/40 bg-background" />
              <div className="glass rounded-xl p-5 transition-colors hover:border-foreground/30">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-semibold">
                    {t.title} · <span className="text-muted-foreground">{t.company}</span>
                  </h2>
                  <span className="font-mono text-xs text-muted-foreground">{t.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}