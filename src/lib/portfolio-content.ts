// ============================================================================
// PM.EXE — CONTENU DU PORTFOLIO
// Contenu réel de Valentin Renard, extrait de son CV et de son ancien site.
// ============================================================================

import cibliImg from "../assets/projects/cibli.jpg.asset.json";
import cibli2Img from "../assets/projects/cibli2.jpg.asset.json";
import naonairImg from "../assets/projects/naonair.png.asset.json";
import evappImg from "../assets/projects/evapp.png.asset.json";
import kitMetiersImg from "../assets/projects/kitmetiers.png.asset.json";
import premierPasImg from "../assets/projects/premierpas.webp.asset.json";
import monRetabImg from "../assets/projects/monretab.jpg.asset.json";
import saltoImg from "../assets/projects/salto.jpg.asset.json";

export const PROFILE = {
  name: "Valentin Renard",
  role: "Product Manager",
  years: 10,
  tagline: "Vivez le Product Management à travers de vraies décisions.",
  location: "Nantes, France",
  email: "renard.valentin49@gmail.com",
  phone: "06 88 84 05 18",
  linkedin: "https://www.linkedin.com/in/valentin-renard-149200a9/",
  bio: [
    "Ma passion : concevoir les expériences de demain. Depuis bientôt 10 ans, je suis spécialisé dans la conception, le pilotage et l'optimisation de produits digitaux.",
    "Travail d'équipe, analyse produit et recherche de ce qui fera mouche auprès des utilisateurs… c'est mon quotidien. La pluralité de mon profil me permet d'avoir une vision autant technique que business sur l'ensemble des produits dont j'ai la charge.",
  ],
  currentFocus:
    "Product Manager chez Lonestone, à Nantes — du cadrage produit jusqu'à la mise en production.",
};

export interface TimelineItem {
  period: string;
  title: string;
  company: string;
  description: string;
}

export const TIMELINE: TimelineItem[] = [
  {
    period: "2021 — aujourd'hui",
    title: "Product Manager",
    company: "Lonestone",
    description:
      "Analyse de marché et compréhension utilisateur, stratégie produit et roadmap, suivi de production et management d'équipes internes et externes (devs & UX/UI). Apps, SaaS, sites institutionnels et webapps.",
  },
  {
    period: "2017 — 2021",
    title: "Product Manager / Responsable marketing",
    company: "LiveE",
    description:
      "Pilotage et exécution de projets dans les délais et le budget, rédaction des spécifications, management d'équipe et responsabilité de la stratégie marketing & communication. Conception de la plateforme événementielle Evapp.io.",
  },
  {
    period: "2016 — 2017",
    title: "Chef de projet digital",
    company: "37DEUX",
    description:
      "Pilotage, coordination et exécution de projets web (WordPress, WooCommerce) et conception d'un CMS de création de plateformes e-commerce d'objets publicitaires (Symfony).",
  },
];

export interface CaseStudy {
  slug: string;
  name: string;
  oneLiner: string;
  year: string;
  tags: string[];
  problem: string;
  discovery: string;
  decision: string;
  solution: string;
  impact: { label: string; value: string }[];
  lessons: string;
  differently: string;
}

export const PROJECTS: CaseStudy[] = [
  {
    slug: "naonair",
    name: "Naonair",
    oneLiner: "Application mobile d'analyse de la qualité de l'air, conçue avec Air Pays de la Loire.",
    year: "2023",
    tags: ["App mobile", "Géodonnées", "Santé"],
    problem:
      "Offrir aux citoyens et aux décideurs nantais des informations précises et géolocalisées pour comprendre et agir face à la pollution urbaine, en temps réel.",
    discovery:
      "Immersion métier avec Air Pays de la Loire et travail avancé de géocoding pour ajuster les données de pollution en temps réel et concevoir des parcours utilisateurs clairs.",
    decision:
      "Prioriser la cartographie et les itinéraires « air sain » plutôt qu'un simple tableau de mesures, pour rendre la donnée directement actionnable au quotidien.",
    solution:
      "Une app mobile (iOS & Android) de visualisation des zones de pollution et de calcul d'itinéraires, livrée en sprints de deux semaines avec démos et ajustements continus.",
    impact: [
      { label: "Lancement", value: "Oct. 2023" },
      { label: "Stores", value: "iOS + Android" },
      { label: "Évolutions", value: "Suivi pollens" },
    ],
    lessons:
      "Une donnée complexe ne crée de la valeur que si elle est rendue actionnable dans le geste quotidien de l'utilisateur.",
    differently:
      "J'anticiperais encore plus tôt les évolutions (pollens, alertes) pour les intégrer à l'architecture dès le départ.",
  },
  {
    slug: "evapp",
    name: "Evapp.io",
    oneLiner: "SaaS de création et de gestion d'événements en ligne, hybrides et interactifs.",
    year: "2020",
    tags: ["SaaS", "0→1", "Événementiel"],
    problem:
      "Répondre à la demande croissante de solutions pour organiser webinaires, conférences interactives, émissions en direct et événements hybrides depuis une plateforme unique.",
    discovery:
      "Travail étroit avec la direction, les utilisateurs et les clients clés de LiveE pour définir les fonctionnalités prioritaires : webinaire, webcast et conférences interactives.",
    decision:
      "Construire une roadmap basée sur les retours utilisateurs et miser sur l'interactivité (votes, sondages, quiz, questions modérées) comme différenciateur.",
    solution:
      "Une plateforme tout-en-un avec modules personnalisables et branding client, pilotée en sprints de 3 semaines avec une équipe de 10 développeurs et 2 designers.",
    impact: [
      { label: "Équipe", value: "10 dev · 2 design" },
      { label: "Clients", value: "SNCF, Ouest France" },
      { label: "Périmètre", value: "Bout en bout" },
    ],
    lessons:
      "L'interactivité bien dosée est ce qui transforme un outil de diffusion en véritable expérience d'événement.",
    differently:
      "Je structurerais plus tôt l'onboarding client pour accélérer l'autonomie des organisateurs.",
  },
  {
    slug: "kit-metiers",
    name: "Kit Métiers — UIMM",
    oneLiner: "Refonte de l'outil de promotion des métiers de la métallurgie, utilisé partout en France.",
    year: "2021",
    tags: ["Webapp", "Refonte", "UX"],
    problem:
      "Moderniser un outil basé sur Flash, obsolète et difficile à maintenir, dont la mise à jour manuelle des données était chronophage et source d'erreurs.",
    discovery:
      "Ateliers d'immersion avec les prescripteurs (conseillers Pôle Emploi, missions locales) pour redéfinir les parcours et prioriser les fonctionnalités à garder ou supprimer.",
    decision:
      "Refondre entièrement la plateforme autour d'une bibliothèque de contenus multimédias permettant aux utilisateurs de créer des présentations personnalisées.",
    solution:
      "Une webapp moderne, accessible et évolutive, avec gestion fine des droits et suivi des KPI, livrée en sprints de deux semaines puis maintenue de façon évolutive.",
    impact: [
      { label: "Utilisateurs", value: "400+ réguliers" },
      { label: "Présentations", value: "2 000+" },
      { label: "Mise en ligne", value: "Juil. 2021" },
    ],
    lessons:
      "Remplacer un outil obsolète, c'est d'abord comprendre le quotidien des utilisateurs avant de toucher à la techno.",
    differently:
      "J'investirais encore davantage dans l'outillage de mise à jour de contenu dès la première version.",
  },
  {
    slug: "myklub",
    name: "MyKlub",
    oneLiner: "Plateforme e-learning pour les formateurs agréés QUALIOPI.",
    year: "2022",
    tags: ["SaaS", "E-learning", "B2B"],
    problem:
      "Donner aux organismes de formation un outil conforme aux exigences QUALIOPI pour créer et diffuser leurs parcours pédagogiques.",
    discovery:
      "Cadrage produit avec les formateurs pour comprendre leurs contraintes réglementaires et leurs usages réels du quotidien.",
    decision:
      "Prioriser la conformité et la simplicité de création de parcours plutôt que la multiplication de fonctionnalités secondaires.",
    solution:
      "Une plateforme SaaS de création, diffusion et suivi de formations, conçue et pilotée du cadrage jusqu'au suivi des performances.",
    impact: [
      { label: "Domaine", value: "E-learning" },
      { label: "Conformité", value: "QUALIOPI" },
      { label: "Rôle", value: "PM bout en bout" },
    ],
    lessons:
      "Dans un produit contraint par la réglementation, la valeur vient de la fluidité offerte malgré les contraintes.",
    differently:
      "Je formaliserais plus tôt les retours terrain des formateurs dans une boucle de discovery continue.",
  },
  {
    slug: "mon-retab",
    name: "Mon Retab d'abord",
    oneLiner: "Plateforme e-santé d'accompagnement au rétablissement en santé mentale.",
    year: "2022",
    tags: ["E-santé", "Impact", "Webapp"],
    problem:
      "Accompagner les personnes dans leur parcours de rétablissement en santé mentale avec un outil digital adapté et bienveillant.",
    discovery:
      "Compréhension fine des besoins des usagers et des professionnels de santé, dans un contexte sensible où la confiance est centrale.",
    decision:
      "Concevoir une expérience rassurante et accessible plutôt qu'un outil clinique complexe, en plaçant l'usager au centre.",
    solution:
      "Une plateforme e-santé d'accompagnement, cadrée et pilotée pour répondre à un enjeu d'impact social réel.",
    impact: [
      { label: "Domaine", value: "E-santé" },
      { label: "Public", value: "Santé mentale" },
      { label: "Enjeu", value: "Impact social" },
    ],
    lessons:
      "Sur un sujet sensible, le ton et la posture du produit comptent autant que les fonctionnalités.",
    differently:
      "J'impliquerais encore plus tôt les usagers et les soignants dans la co-conception.",
  },
  {
    slug: "salto",
    name: "Salto.run",
    oneLiner: "Outil interne d'analyse financière et de suivi d'acquisition du parc audiovisuel.",
    year: "2022",
    tags: ["Outil interne", "Data", "Efficacité"],
    problem:
      "Donner aux équipes un outil fiable pour analyser la performance financière et suivre l'acquisition du parc audiovisuel.",
    discovery:
      "Cartographie des workflows réels des équipes internes pour identifier les analyses les plus coûteuses en temps.",
    decision:
      "Concentrer l'effort sur les analyses à plus forte valeur plutôt que de répliquer tous les tableurs existants.",
    solution:
      "Un outil interne d'analyse et de suivi, conçu pour fiabiliser la prise de décision financière.",
    impact: [
      { label: "Type", value: "Outil interne" },
      { label: "Domaine", value: "Analyse financière" },
      { label: "Cible", value: "Équipes internes" },
    ],
    lessons:
      "Les utilisateurs internes méritent autant de soin produit que les utilisateurs finaux.",
    differently:
      "Je mettrais en place le suivi d'usage de l'outil dès le premier jour.",
  },
];

export interface Framework {
  name: string;
  summary: string;
  points: string[];
}

export const FRAMEWORKS: Framework[] = [
  {
    name: "Discovery produit",
    summary: "Comprendre le problème en profondeur avant de s'engager sur une solution.",
    points: ["Interviews & tests utilisateurs", "Immersion métier terrain", "Cartographie des besoins"],
  },
  {
    name: "Cadrage & priorisation",
    summary: "Investir la capacité limitée sur les paris à plus fort impact.",
    points: ["Cadrage produit", "Priorisation fonctionnelle", "Impact vs effort"],
  },
  {
    name: "Conception UX",
    summary: "Traduire les besoins en parcours clairs et en wireframes.",
    points: ["Wireframing (Figma)", "Parcours utilisateurs", "A/B testing"],
  },
  {
    name: "Pilotage agile",
    summary: "Tenir les délais et le budget avec une équipe alignée.",
    points: ["Gestion de backlog & sprints", "JIRA / ClickUp / Notion / Linear", "Démos & recettage"],
  },
  {
    name: "Suivi & performance",
    summary: "Mesurer ce qui compte et documenter pour durer.",
    points: ["Analyse de performance (KPI)", "Suivi de production", "Documentation produit"],
  },
];

export interface Experiment {
  name: string;
  result: "win" | "fail" | "mixed";
  description: string;
}

export const EXPERIMENTS: Experiment[] = [
  {
    name: "Itinéraires « air sain » (Naonair)",
    result: "win",
    description: "Calculer des trajets optimisés selon la pollution a rendu la donnée actionnable au quotidien.",
  },
  {
    name: "Interactivité temps réel (Evapp.io)",
    result: "win",
    description: "Votes, sondages et quiz modérés ont nettement renforcé l'engagement des participants.",
  },
  {
    name: "Création de présentations libre (Kit Métiers)",
    result: "mixed",
    description: "Forte adoption, mais l'outillage de mise à jour de contenu a sous-estimé l'effort de maintenance.",
  },
  {
    name: "Refonte d'un outil Flash legacy",
    result: "win",
    description: "Migration d'un socle obsolète vers une webapp moderne, évolutive et déployée nationalement.",
  },
];

export const TERMINAL_RESPONSES: Record<string, string[]> = {
  whoami: [
    "Valentin Renard — Product Manager, bientôt 10 ans d'expérience.",
    "Je conçois, pilote et optimise des produits digitaux que les gens utilisent.",
  ],
  projects: [
    "naonair    evapp    kit-metiers",
    "myklub     mon-retab    salto",
    "Tape un nom ou ouvre la section Projets pour explorer.",
  ],
  current_focus: ["Product Manager chez Lonestone, à Nantes — du cadrage jusqu'à la mise en production."],
  biggest_failure: [
    "Sous-estimer l'outillage de mise à jour de contenu sur une plateforme riche.",
    "Leçon : la maintenabilité se conçoit dès le jour 1, pas après le lancement.",
  ],
  future: [
    "Plus de produits à impact, plus d'honnêteté, moins de fonctionnalités gadgets.",
  ],
  help: [
    "Commandes disponibles :",
    "  whoami           biggest_failure",
    "  projects         future",
    "  current_focus    clear",
  ],
};