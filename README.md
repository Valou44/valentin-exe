# Valentin.EXE

Portfolio interactif de **Valentin Renard**, Product Manager à Nantes.

Au lieu d'un CV classique, le visiteur _devient_ PM : il traverse une simulation de décisions produit, obtient un score de « Product Thinking », puis débloque le portfolio (parcours, études de cas, méthode, contact). Un terminal caché propose quelques easter eggs.

## Stack

| Couche        | Outil                                                        |
| ------------- | ------------------------------------------------------------ |
| Framework     | [TanStack Start](https://tanstack.com/start) (React 19, SSR) |
| Build         | Vite 7 + [Nitro](https://nitro.build) (preset Cloudflare)    |
| UI            | Tailwind CSS 4, shadcn/ui (Radix), Motion                    |
| Données       | Supabase (Postgres)                                          |
| Hébergement   | Cloudflare Workers                                           |
| Gestionnaire  | [Bun](https://bun.sh)                                        |

## Démarrage

Prérequis : [Bun](https://bun.sh) ≥ 1.2.

```bash
bun install
bun run dev        # http://localhost:8080
```

| Commande          | Rôle                                          |
| ----------------- | --------------------------------------------- |
| `bun run dev`     | Serveur de développement                      |
| `bun run build`   | Build de production (Worker dans `.output/`)  |
| `bun run lint`    | ESLint                                        |
| `bun run format`  | Prettier                                      |

## Variables d'environnement

**Publiques** — dans `.env` (versionné). Elles sont injectées dans le bundle et visibles côté navigateur :

| Variable                        | Rôle                          |
| ------------------------------- | ----------------------------- |
| `VITE_SUPABASE_URL`             | URL du projet Supabase        |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Clé publique (anon) Supabase  |
| `VITE_SUPABASE_PROJECT_ID`      | ID du projet Supabase         |

**Secrètes** — à définir dans les _Settings → Variables and Secrets_ du Worker Cloudflare (et dans `.dev.vars`, non versionné, pour le dev local) :

| Variable                    | Rôle                                                    |
| --------------------------- | ------------------------------------------------------- |
| `SUPABASE_URL`              | URL Supabase, lue côté serveur                          |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service role — utilisée par l'admin pour écrire     |
| `ADMIN_ACCESS_CODE`         | Code d'accès à la page `/admin`                         |

> ⚠️ Ne jamais préfixer un secret par `VITE_` : il finirait dans le bundle client.

## Structure

```text
src/
├── routes/                  Pages (routing par fichiers TanStack)
│   ├── index.tsx            /             Séquence de boot + accueil
│   ├── simulation.tsx       /simulation   Simulation en chapitres
│   ├── result.tsx           /result       Score + comparaison
│   ├── dashboard*.tsx       /dashboard/…  Portfolio (à propos, projets, méthode, contact)
│   ├── admin.tsx            /admin        Éditeur de contenu (protégé par code)
│   ├── sitemap[.]xml.ts     /sitemap.xml
│   └── robots[.]txt.ts      /robots.txt
├── components/              Composants (Terminal, BootSequence, ui/ shadcn…)
├── lib/
│   ├── site.ts              URL publique du site (SEO, sitemap, robots)
│   ├── portfolio-content.ts Profil, parcours, études de cas par défaut
│   ├── sim-content.ts       Contenu par défaut de la simulation
│   ├── case-studies.ts      Lecture des études de cas depuis Supabase
│   └── admin.functions.ts   Server functions de l'admin (vérif. du code, sauvegarde)
├── integrations/supabase/   Clients Supabase (navigateur + serveur) et types
└── server.ts                Entrée serveur : page d'erreur propre en cas de crash SSR
public/
├── assets/                  Images (projets, logos, portrait) et CV
└── og-image.png             Image de partage réseaux sociaux
supabase/migrations/         Schéma de la base
```

## Modifier le contenu

- **Études de cas et scénarios de la simulation** : depuis `/admin`. Les modifications sont enregistrées dans Supabase (tables `case_studies` et `sim_scenarios`). Si la base est vide, le site retombe sur le contenu par défaut de `src/lib/portfolio-content.ts` et `src/lib/sim-content.ts`.
- **Profil, parcours, compétences, logos** : directement dans `src/lib/portfolio-content.ts` et `src/routes/dashboard.index.tsx`.
- **Images** : déposer le fichier dans `public/assets/` et le référencer par `/assets/<fichier>`.
- **Domaine du site** : changer `SITE_URL` dans `src/lib/site.ts` — c'est la seule source pour les balises canonical / Open Graph, le sitemap et `robots.txt`.

## Déploiement

Le repo est connecté à **Cloudflare Workers Builds** : chaque push sur `main` lance un build et déploie le Worker `valentin-exe`. Les autres branches génèrent une preview.

Le statut du build apparaît directement sur le commit dans GitHub.

## Base de données

Le schéma est versionné dans `supabase/migrations/`. Pour l'appliquer à un nouveau projet Supabase :

```bash
supabase link --project-ref <project-id>
supabase db push
```
