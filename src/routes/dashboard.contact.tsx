import { createFileRoute } from "@tanstack/react-router";
import { PROFILE } from "../lib/portfolio-content";

export const Route = createFileRoute("/dashboard/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Valentin Renard" },
      { name: "description", content: "Contactez Valentin Renard, Product Manager à Nantes." },
      { property: "og:title", content: "Contact — Valentin Renard" },
      { property: "og:description", content: "Contactez Valentin Renard, Product Manager à Nantes." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://valentin-exe.lovable.app/dashboard/contact" },
    ],
    links: [{ rel: "canonical", href: "https://valentin-exe.lovable.app/dashboard/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const links = [
    { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { label: "Téléphone", value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, "")}` },
    { label: "LinkedIn", value: "valentin-renard", href: PROFILE.linkedin },
  ];
  return (
    <div>
      <p className="font-mono text-xs tracking-[0.25em] text-muted-foreground">// CONTACT</p>
      <h1 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight">
        Travaillons ensemble
      </h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Ouvert aux opportunités produit, au conseil et aux belles conversations autour de la conception de produits utiles.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="glass group flex items-center justify-between rounded-xl p-6 transition-colors hover:border-foreground/40"
          >
            <div>
              <div className="font-mono text-xs tracking-widest text-muted-foreground">
                {l.label.toUpperCase()}
              </div>
              <div className="mt-1 font-medium">{l.value}</div>
            </div>
            <span className="text-muted-foreground transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}