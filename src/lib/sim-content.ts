// ============================================================================
// Valentin.EXE — CONTENU DE LA SIMULATION
// Basé sur un vrai projet de Valentin : Naonair, l'app mobile d'analyse de la
// qualité de l'air conçue avec Air Pays de la Loire.
// Les 5 chapitres suivent une seule et même trame projet.
// ============================================================================

export interface SimOption {
  label: string;
  hint?: string;
  /** product-thinking points awarded for this option (0-20) */
  points: number;
}

export interface SimChapter {
  id: string;
  index: number;
  /** dimension label shown in the score comparison */
  dimension: string;
  tag: string;
  title: string;
  situation: string;
  prompt: string;
  options: SimOption[];
  /** index of the option Valentin actually chose */
  valentinChoice: number;
  revealTitle: string;
  revealBody: string[];
  meta?: { label: string; value: string }[];
}

export const VALENTIN = "Valentin";

export const CHAPTERS: SimChapter[] = [
  {
    id: "problem",
    index: 1,
    dimension: "Cadrage du problème",
    tag: "MISSION 01 — LE PROBLÈME",
    title: "Un problème réel à cadrer",
    situation:
      "Air Pays de la Loire veut aider les citoyens nantais à mieux comprendre et éviter la pollution de l'air. Les données existent, mais elles restent abstraites et inexploitables au quotidien.",
    prompt: "Tu arrives sur le projet. Par quoi commences-tu ?",
    options: [
      { label: "Développer une fonctionnalité visible", hint: "Aller vite, montrer quelque chose", points: 6 },
      { label: "S'immerger dans le métier et les besoins", hint: "Comprendre avant de construire", points: 18 },
      { label: "Lancer une campagne de communication", hint: "Générer du trafic", points: 4 },
    ],
    valentinChoice: 1,
    revealTitle: "Ce que j'ai fait",
    revealBody: [
      "J'ai résisté à l'envie de construire tout de suite. Sur un sujet de données environnementales, foncer sans comprendre le métier, c'est livrer un produit que personne n'utilise.",
      "Je me suis immergé avec les experts d'Air Pays de la Loire pour comprendre comment la donnée de qualité de l'air est produite et ce que les citoyens en attendent réellement.",
      "Cadrer le vrai problème — rendre la donnée actionnable — avant de toucher à la roadmap, c'est l'action à plus fort levier d'un PM.",
    ],
    meta: [
      { label: "Partenaire", value: "Air Pays de la Loire" },
      { label: "Approche", value: "Immersion métier" },
      { label: "Livrable", value: "Cadrage produit" },
    ],
  },
  {
    id: "discovery",
    index: 2,
    dimension: "Discovery",
    tag: "MISSION 02 — DISCOVERY",
    title: "Écouter les utilisateurs",
    situation:
      "Ce que disent les citoyens :\n\n« Je vois bien qu'il y a de la pollution, mais je ne sais pas quoi en faire. »\n« J'aimerais savoir quel trajet prendre pour moins respirer de pollution. »\n« Les chiffres ne me parlent pas. »",
    prompt: "Quel est le vrai point de douleur ?",
    options: [
      { label: "L'interface n'est pas assez moderne", hint: "Esthétique", points: 6 },
      { label: "La donnée n'est pas actionnable au quotidien", hint: "Usage concret", points: 18 },
      { label: "Il manque des fonctionnalités", hint: "Manque de features", points: 4 },
      { label: "Le service est trop lent", hint: "Performance", points: 7 },
    ],
    valentinChoice: 1,
    revealTitle: "L'insight clé",
    revealBody: [
      "Tous les retours pointaient la même cause : la donnée existait, mais elle ne se traduisait pas en geste concret pour l'utilisateur.",
      "Le produit ne devait pas afficher plus de mesures : il devait dire à l'utilisateur quoi faire — par exemple quel itinéraire emprunter pour moins s'exposer.",
      "J'ai reformulé l'objectif : passer de « montrer la pollution » à « aider à l'éviter ».",
    ],
    meta: [
      { label: "Signal", value: "Donnée non actionnable" },
      { label: "Recadrage", value: "Agir, pas seulement informer" },
    ],
  },
  {
    id: "prioritization",
    index: 3,
    dimension: "Priorisation",
    tag: "MISSION 03 — PRIORISATION",
    title: "Choisir le pari",
    situation:
      "Plusieurs pistes crédibles sont sur la table. Chacune se défend. Tu ne peux en pousser sérieusement qu'une seule pour le prochain cycle.",
    prompt: "Sur quoi paries-tu ?",
    options: [
      { label: "Tableau de bord de mesures détaillées", hint: "Plus de data", points: 9 },
      { label: "Cartographie + itinéraires « air sain »", hint: "Donnée actionnable", points: 18 },
      { label: "Alertes push génériques", hint: "Notifications", points: 8 },
      { label: "Articles pédagogiques sur la pollution", hint: "Contenu", points: 7 },
    ],
    valentinChoice: 1,
    revealTitle: "Mon choix et pourquoi",
    revealBody: [
      "J'ai parié sur la cartographie et les itinéraires géolocalisés. C'est ce qui répondait directement au besoin confirmé : agir, pas seulement consulter.",
      "Arbitrage : un tableau de bord riche impressionne en démo, mais reste passif. L'itinéraire transforme la donnée en décision concrète.",
      "Cela impliquait un vrai travail de géocoding pour ajuster les données en temps réel — un risque technique assumé car il portait toute la valeur.",
    ],
    meta: [
      { label: "Pari", value: "Carto + itinéraires" },
      { label: "Risque", value: "Géocoding temps réel" },
      { label: "Pourquoi", value: "Valeur actionnable" },
    ],
  },
  {
    id: "delivery",
    index: 4,
    dimension: "Delivery",
    tag: "MISSION 04 — DELIVERY",
    title: "Livrer dans le cadre",
    situation:
      "Le projet est cadencé en sprints de deux semaines, avec démos et ajustements à chaque itération. Les parties prenantes attendent un produit réellement utilisable.",
    prompt: "Comment organises-tu la livraison ?",
    options: [
      { label: "Tout livrer d'un coup en fin de projet", hint: "Effet tunnel", points: 6 },
      { label: "Sprints de 2 semaines avec démos & ajustements", hint: "Amélioration continue", points: 18 },
      { label: "Un prototype non testé", hint: "Pas de vrais usages", points: 9 },
      { label: "Une simple page de présentation", hint: "Tester la demande", points: 7 },
    ],
    valentinChoice: 1,
    revealTitle: "Ce que nous avons construit",
    revealBody: [
      "Nous avons piloté la production en sprints agiles de deux semaines, chaque itération se terminant par une démo et des ajustements basés sur les retours.",
      "J'ai supervisé la recette finale puis la mise en ligne de l'app sur l'App Store et Google Play.",
      "Livrer par itérations courtes a garanti une amélioration continue et un produit réellement adopté plutôt qu'un grand lancement risqué.",
    ],
    meta: [
      { label: "Cadence", value: "Sprints de 2 sem." },
      { label: "Cycle", value: "Démo + ajustements" },
      { label: "Déploiement", value: "iOS + Android" },
    ],
  },
  {
    id: "results",
    index: 5,
    dimension: "Recul",
    tag: "MISSION 05 — RÉSULTATS",
    title: "Lire le résultat avec honnêteté",
    situation:
      "Naonair est lancée depuis octobre 2023. L'app est utilisée au quotidien et continue d'évoluer. Comment juges-tu le succès ?",
    prompt: "Comment l'évalues-tu ?",
    options: [
      { label: "Célébrer le lancement", hint: "On a livré !", points: 6 },
      { label: "Usage réel + retours + évolutions utiles", hint: "Vision complète", points: 18 },
      { label: "Ne suivre que les téléchargements", hint: "Métrique de vanité", points: 5 },
    ],
    valentinChoice: 1,
    revealTitle: "Résultats, et ce que je ferais différemment",
    revealBody: [
      "Impact : depuis son lancement en octobre 2023, Naonair aide des utilisateurs à adapter leurs déplacements selon la qualité de l'air, avec des retours positifs.",
      "Ce qui a marché : rendre la donnée actionnable (itinéraires) a créé bien plus de valeur qu'un simple affichage de mesures.",
      "L'app continue d'évoluer (ex. suivi des pollens). Ce que je ferais différemment : anticiper encore plus tôt ces évolutions dans l'architecture initiale.",
    ],
    meta: [
      { label: "Lancement", value: "Oct. 2023" },
      { label: "Usage", value: "Quotidien" },
      { label: "Évolution", value: "Suivi pollens" },
    ],
  },
];

export const MAX_POINTS = CHAPTERS.length * 20;

export function valentinScore(): number {
  const pts = CHAPTERS.reduce((sum, c) => sum + c.options[c.valentinChoice].points, 0);
  return Math.round((pts / MAX_POINTS) * 100);
}

export function computeScore(choices: Record<string, number>): number {
  const pts = CHAPTERS.reduce((sum, c) => {
    const idx = choices[c.id];
    return sum + (idx != null ? c.options[idx]?.points ?? 0 : 0);
  }, 0);
  return Math.round((pts / MAX_POINTS) * 100);
}

export interface DimensionDelta {
  dimension: string;
  delta: number; // user points - valentin points (scaled by 5 for readability)
}

export function computeDeltas(choices: Record<string, number>): DimensionDelta[] {
  return CHAPTERS.map((c) => {
    const userPts = choices[c.id] != null ? c.options[choices[c.id]]?.points ?? 0 : 0;
    const valPts = c.options[c.valentinChoice].points;
    return { dimension: c.dimension, delta: userPts - valPts };
  });
}