# Valentin.EXE

Portfolio interactif de **Valentin Renard**, Product Manager à Nantes.

Au lieu d'un CV classique, le visiteur _devient_ PM : il traverse une simulation de décisions produit, obtient un score de « Product Thinking », puis débloque le portfolio (parcours, études de cas, méthode, contact). Un terminal caché propose quelques easter eggs.

## Stack

| Couche        | Outil                                                        |
| ------------- | ------------------------------------------------------------ |
| Framework     | [TanStack Start](https://tanstack.com/start) (React 19, SSR) |
| Build         | Vite 7 + [Nitro](https://nitro.build) (preset Cloudflare)    |
| UI            | Tailwind CSS 4, shadcn/ui (Radix), Motion                    |
| Contenu       | Fichiers TypeScript versionnés (`src/lib/*-content.ts`)      |
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

Aucune variable d'environnement n'est nécessaire : le site n'a ni base de données ni service externe.

## Structure

```text
src/
├── routes/                  Pages (routing par fichiers TanStack)
│   ├── index.tsx            /             Séquence de boot + accueil
│   ├── simulation.tsx       /simulation   Simulation en chapitres
│   ├── result.tsx           /result       Score + comparaison
│   ├── dashboard*.tsx       /dashboard/…  Portfolio (à propos, projets, méthode, contact)
│   ├── sitemap[.]xml.ts     /sitemap.xml
│   └── robots[.]txt.ts      /robots.txt
├── components/              Composants (Terminal, BootSequence, ui/ shadcn…)
├── lib/
│   ├── site.ts              URL publique du site (SEO, sitemap, robots)
│   ├── portfolio-content.ts Profil, parcours, études de cas
│   └── sim-content.ts       Scénarios de la simulation et calcul du score
└── server.ts                Entrée serveur : page d'erreur propre en cas de crash SSR
public/
├── assets/                  Images (projets, logos, portrait) et CV
└── og-image.png             Image de partage réseaux sociaux
```

## Modifier le contenu

Tout le contenu vit dans le code : on modifie le fichier, on pousse, Cloudflare redéploie.

- **Études de cas** : tableau `PROJECTS` de `src/lib/portfolio-content.ts`. L'ordre du tableau est l'ordre d'affichage ; `published: false` masque une étude de cas.
- **Scénarios de la simulation** : tableau `SCENARIOS` de `src/lib/sim-content.ts`.
- Les champs texte longs acceptent du HTML simple (`<p>`, `<ul>`, `<strong>`…).
- **Profil, parcours, compétences, logos** : `src/lib/portfolio-content.ts` et `src/routes/dashboard.index.tsx`.
- **Images** : déposer le fichier dans `public/assets/` et le référencer par `/assets/<fichier>`.
- **Domaine du site** : changer `SITE_URL` dans `src/lib/site.ts` — c'est la seule source pour les balises canonical / Open Graph, le sitemap et `robots.txt`.

## Déploiement

Le repo est connecté à **Cloudflare Workers Builds** :

- push sur `main` → build + déploiement en production sur https://valentin-exe.premier-pas-app.workers.dev ;
- push sur une autre branche → build + **preview** (URL dédiée, visible dans le statut du commit sur GitHub).

La config Wrangler est générée au build par Nitro (`.output/server/wrangler.json`) à partir de `vite.config.ts`.
