// ============================================================================
// Valentin.EXE — CONTENU DE LA SIMULATION
// Le visiteur choisit une problématique métier, puis traverse les 5 mêmes
// étapes (Problème, Discovery, Priorisation, Delivery, Résultats) déclinées
// selon le projet réel de Valentin associé à cette problématique.
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

export interface Scenario {
  id: string;
  /** la problématique métier affichée au choix */
  question: string;
  project: string;
  inspiration: string;
  accent: string; // tailwind text color class
  intro: string;
  chapters: SimChapter[];
}

export const VALENTIN = "Valentin";

// Les libellés de la trame, communs à tous les scénarios
const TRAME = [
  { id: "problem", dimension: "Cadrage du problème", tag: "ÉTAPE 01 — LE PROBLÈME", base: "Le problème réel à cadrer" },
  { id: "discovery", dimension: "Discovery", tag: "ÉTAPE 02 — DISCOVERY", base: "La discovery" },
  { id: "prioritization", dimension: "Priorisation", tag: "ÉTAPE 03 — PRIORISATION", base: "La priorisation" },
  { id: "delivery", dimension: "Delivery", tag: "ÉTAPE 04 — DELIVERY", base: "Le delivery" },
  { id: "results", dimension: "Recul", tag: "ÉTAPE 05 — RÉSULTATS", base: "Les résultats" },
] as const;

export const SCENARIOS: Scenario[] = [
  // ==========================================================================
  // SCÉNARIO 1 — CIBLI JOBS
  // ==========================================================================
  {
    id: "cibli",
    question: "Comment démocratiser l'accès à l'emploi pour un public écarté du numérique ?",
    project: "Cibli Jobs",
    inspiration: "Inspiré de Cibli Jobs",
    accent: "text-emerald-400",
    intro:
      "Une partie de la population reste éloignée de l'emploi parce que les plateformes de recrutement supposent l'aisance numérique, un CV, une adresse mail. Comment ramener ces personnes vers le travail ?",
    chapters: [
      {
        ...TRAME[0], index: 1,
        title: "Un problème réel à cadrer",
        situation:
          "Les outils d'emploi classiques (job boards, candidatures en ligne) excluent de fait les personnes peu à l'aise avec le numérique : pas de CV, pas de mail, peu de mobilité. L'offre existe pourtant localement.",
        prompt: "Tu démarres le projet. Par quoi commences-tu ?",
        options: [
          { label: "Construire un job board de plus", hint: "Reproduire l'existant", points: 5 },
          { label: "Comprendre les freins réels de ce public", hint: "Aller sur le terrain", points: 18 },
          { label: "Lancer une grosse campagne d'acquisition", hint: "Faire du volume", points: 4 },
        ],
        valentinChoice: 1,
        revealTitle: "Ce que j'ai fait",
        revealBody: [
          "Le réflexe « encore un job board » aurait reproduit exactement l'obstacle. J'ai cadré le vrai problème : ce public est écarté non par manque d'offres, mais par la forme des outils.",
          "Je suis allé comprendre les freins concrets — pas de CV, pas d'aisance digitale, besoin de proximité et de confiance — avant de décider quoi construire.",
        ],
        meta: [
          { label: "Public", value: "Éloigné du numérique" },
          { label: "Approche", value: "Cadrage terrain" },
          { label: "Livrable", value: "Vrai problème" },
        ],
      },
      {
        ...TRAME[1], index: 2,
        title: "Écouter le terrain",
        situation:
          "Sur le terrain, les retours convergent :\n\n« Je sais travailler, mais je ne sais pas me vendre sur internet. »\n« Remplir un formulaire en ligne, c'est un mur. »\n« J'ai besoin de parler à quelqu'un. »",
        prompt: "Quel est le vrai point de douleur ?",
        options: [
          { label: "L'interface manque de design", hint: "Esthétique", points: 6 },
          { label: "Le parcours numérique est un mur", hint: "Friction d'usage", points: 18 },
          { label: "Il manque des offres", hint: "Volume d'annonces", points: 5 },
          { label: "Les salaires sont trop bas", hint: "Hors périmètre", points: 4 },
        ],
        valentinChoice: 1,
        revealTitle: "L'insight clé",
        revealBody: [
          "La douleur n'était pas le manque d'offres mais la complexité du parcours : tout supposait des compétences numériques que le public n'a pas.",
          "J'ai recadré l'objectif : supprimer le numérique comme barrière, en s'appuyant sur l'humain et la simplicité plutôt que sur un formulaire.",
        ],
        meta: [
          { label: "Signal", value: "Friction numérique" },
          { label: "Recadrage", value: "L'humain d'abord" },
        ],
      },
      {
        ...TRAME[2], index: 3,
        title: "Choisir le pari",
        situation:
          "Plusieurs pistes sont crédibles. Tu ne peux en pousser sérieusement qu'une seule pour le premier cycle.",
        prompt: "Sur quoi paries-tu ?",
        options: [
          { label: "Un CV en ligne plus joli", hint: "Améliorer l'existant", points: 8 },
          { label: "Une candidature ultra-simple sans CV", hint: "Lever la barrière", points: 18 },
          { label: "Un chatbot d'orientation", hint: "Techno avant besoin", points: 7 },
          { label: "Des contenus de formation", hint: "Hors urgence", points: 6 },
        ],
        valentinChoice: 1,
        revealTitle: "Mon choix et pourquoi",
        revealBody: [
          "J'ai parié sur une mise en relation sans CV, avec un parcours réduit au minimum et un accompagnement humain. C'est ce qui répondait directement à la barrière identifiée.",
          "Arbitrage : embellir le CV en ligne aurait été plus simple à livrer, mais aurait laissé la vraie barrière intacte.",
        ],
        meta: [
          { label: "Pari", value: "Candidature sans CV" },
          { label: "Levier", value: "Accompagnement humain" },
        ],
      },
      {
        ...TRAME[3], index: 4,
        title: "Livrer dans le cadre",
        situation:
          "Le produit doit être testé par un public peu connecté, dans des conditions réelles. Les parties prenantes attendent du concret rapidement.",
        prompt: "Comment organises-tu la livraison ?",
        options: [
          { label: "Tout livrer d'un coup en fin de projet", hint: "Effet tunnel", points: 5 },
          { label: "Itérations courtes testées sur le terrain", hint: "Boucle de feedback", points: 18 },
          { label: "Un prototype jamais confronté aux usagers", hint: "Pas de réel", points: 8 },
          { label: "Une simple landing page", hint: "Tester la demande", points: 7 },
        ],
        valentinChoice: 1,
        revealTitle: "Ce que nous avons construit",
        revealBody: [
          "Nous avons avancé par itérations courtes, en confrontant chaque version au public cible et aux accompagnants, pour ajuster sans cesse la simplicité du parcours.",
          "Tester avec de vrais usagers peu connectés a évité de livrer un produit « propre » mais inutilisable.",
        ],
        meta: [
          { label: "Cadence", value: "Itérations courtes" },
          { label: "Test", value: "Terrain réel" },
        ],
      },
      {
        ...TRAME[4], index: 5,
        title: "Lire le résultat avec honnêteté",
        situation:
          "Cibli est en service et remet des personnes éloignées de l'emploi en relation avec des employeurs locaux. Comment juges-tu le succès ?",
        prompt: "Comment l'évalues-tu ?",
        options: [
          { label: "Célébrer le lancement", hint: "On a livré", points: 6 },
          { label: "Mises en relation réelles + retours usagers", hint: "Vision complète", points: 18 },
          { label: "Ne suivre que les inscriptions", hint: "Métrique de vanité", points: 5 },
        ],
        valentinChoice: 1,
        revealTitle: "Résultats, et ce que je ferais différemment",
        revealBody: [
          "Le bon indicateur n'est pas le nombre d'inscrits mais les mises en relation qui débouchent réellement sur de l'emploi, et la confiance retrouvée des usagers.",
          "Ce que je ferais différemment : impliquer encore plus tôt les accompagnants sociaux dans la conception du parcours.",
        ],
        meta: [
          { label: "Impact", value: "Retour à l'emploi" },
          { label: "Mesure", value: "Mises en relation" },
        ],
      },
    ],
  },

  // ==========================================================================
  // SCÉNARIO 2 — MON RETAB' D'ABORD
  // ==========================================================================
  {
    id: "monretab",
    question:
      "Comment rendre les patients acteurs et contributeurs de leur parcours de rétablissement en santé mentale ?",
    project: "Mon Retab' d'abord",
    inspiration: "Inspiré de Mon Retab' d'abord",
    accent: "text-amber-400",
    intro:
      "En santé mentale, le parcours de soin est souvent subi par le patient. Comment lui donner une place active, voire contributive, dans son propre rétablissement ?",
    chapters: [
      {
        ...TRAME[0], index: 1,
        title: "Un problème réel à cadrer",
        situation:
          "Les patients en santé mentale sont souvent placés en position passive : on décide pour eux. Or le rétablissement repose justement sur l'engagement et le pouvoir d'agir de la personne.",
        prompt: "Tu arrives sur le projet. Par quoi commences-tu ?",
        options: [
          { label: "Numériser le dossier de soin existant", hint: "Digitaliser l'existant", points: 6 },
          { label: "Comprendre ce que « être acteur » veut dire", hint: "Cadrer avec les concernés", points: 18 },
          { label: "Ajouter un suivi d'humeur", hint: "Feature avant besoin", points: 5 },
        ],
        valentinChoice: 1,
        revealTitle: "Ce que j'ai fait",
        revealBody: [
          "Le sujet est sensible : foncer sur des features aurait reproduit la logique descendante du soin. J'ai d'abord cadré ce que « rendre le patient acteur » signifie concrètement, avec patients et professionnels.",
          "Le vrai problème n'était pas un manque d'outils, mais un manque de pouvoir d'agir donné à la personne.",
        ],
        meta: [
          { label: "Domaine", value: "Santé mentale" },
          { label: "Approche", value: "Co-cadrage" },
          { label: "Enjeu", value: "Pouvoir d'agir" },
        ],
      },
      {
        ...TRAME[1], index: 2,
        title: "Écouter les personnes concernées",
        situation:
          "Les retours des patients et pairs-aidants :\n\n« On décide à ma place. »\n« J'aimerais suivre mes propres objectifs, pas seulement ceux du protocole. »\n« Mon expérience pourrait aider d'autres. »",
        prompt: "Quel est le vrai point de douleur ?",
        options: [
          { label: "Le manque d'informations médicales", hint: "Plus de contenu", points: 7 },
          { label: "L'absence de prise sur son propre parcours", hint: "Manque d'agentivité", points: 18 },
          { label: "Une interface peu moderne", hint: "Esthétique", points: 5 },
          { label: "Le manque de rendez-vous", hint: "Hors périmètre produit", points: 6 },
        ],
        valentinChoice: 1,
        revealTitle: "L'insight clé",
        revealBody: [
          "La douleur centrale : le patient n'a pas de prise sur son parcours, et son vécu — précieux pour les autres — n'est pas valorisé.",
          "J'ai reformulé l'objectif : passer d'un patient suivi à un patient acteur et contributeur, capable de fixer ses objectifs et de partager son expérience.",
        ],
        meta: [
          { label: "Signal", value: "Manque d'agentivité" },
          { label: "Recadrage", value: "Acteur + contributeur" },
        ],
      },
      {
        ...TRAME[2], index: 3,
        title: "Choisir le pari",
        situation:
          "Plusieurs directions se défendent. Tu ne peux en pousser sérieusement qu'une seule pour le premier cycle.",
        prompt: "Sur quoi paries-tu ?",
        options: [
          { label: "Un dossier médical numérique complet", hint: "Outil pro", points: 8 },
          { label: "Des objectifs personnels pilotés par le patient", hint: "Donner la main", points: 18 },
          { label: "Une messagerie avec le soignant", hint: "Utile mais secondaire", points: 9 },
          { label: "Une bibliothèque d'articles", hint: "Contenu passif", points: 6 },
        ],
        valentinChoice: 1,
        revealTitle: "Mon choix et pourquoi",
        revealBody: [
          "J'ai parié sur un espace où le patient définit et suit ses propres objectifs de rétablissement, et peut partager son expérience. C'est ce qui matérialise le pouvoir d'agir.",
          "Arbitrage : un dossier médical complet aurait servi surtout les professionnels, pas l'engagement du patient.",
        ],
        meta: [
          { label: "Pari", value: "Objectifs du patient" },
          { label: "Levier", value: "Contribution par les pairs" },
        ],
      },
      {
        ...TRAME[3], index: 4,
        title: "Livrer dans le cadre",
        situation:
          "Le produit touche un public fragile : la livraison doit être prudente, testée et co-construite. Les soignants suivent de près.",
        prompt: "Comment organises-tu la livraison ?",
        options: [
          { label: "Tout livrer d'un coup", hint: "Effet tunnel", points: 5 },
          { label: "Itérations co-construites avec patients & soignants", hint: "Sécuriser et ajuster", points: 18 },
          { label: "Un prototype non testé auprès des patients", hint: "Risqué ici", points: 6 },
          { label: "Une démo de vente uniquement", hint: "Pas d'usage réel", points: 7 },
        ],
        valentinChoice: 1,
        revealTitle: "Ce que nous avons construit",
        revealBody: [
          "Nous avons livré par itérations, en co-construisant avec patients et professionnels pour garantir que l'outil renforce vraiment le pouvoir d'agir sans fragiliser.",
          "Dans un contexte de santé, tester en continu auprès des concernés est non négociable.",
        ],
        meta: [
          { label: "Cadence", value: "Itérations co-construites" },
          { label: "Garde-fou", value: "Soignants impliqués" },
        ],
      },
      {
        ...TRAME[4], index: 5,
        title: "Lire le résultat avec honnêteté",
        situation:
          "Mon Retab' d'abord est utilisé dans des parcours de rétablissement. Comment juges-tu le succès ?",
        prompt: "Comment l'évalues-tu ?",
        options: [
          { label: "Célébrer le lancement", hint: "On a livré", points: 6 },
          { label: "Engagement réel + sentiment de pouvoir d'agir", hint: "Vision complète", points: 18 },
          { label: "Ne suivre que les téléchargements", hint: "Métrique de vanité", points: 5 },
        ],
        valentinChoice: 1,
        revealTitle: "Résultats, et ce que je ferais différemment",
        revealBody: [
          "Le bon indicateur : l'engagement réel des patients dans leurs objectifs et le sentiment retrouvé d'agir sur leur parcours — pas le nombre d'installations.",
          "Ce que je ferais différemment : outiller encore mieux la dimension contributive entre pairs dès le départ.",
        ],
        meta: [
          { label: "Impact", value: "Patient acteur" },
          { label: "Mesure", value: "Engagement réel" },
        ],
      },
    ],
  },

  // ==========================================================================
  // SCÉNARIO 3 — PREMIER PAS
  // ==========================================================================
  {
    id: "premierpas",
    question:
      "Comment simplifier et démocratiser l'entrée dans la vie active des jeunes de 16 à 25 ans ?",
    project: "Premier Pas",
    inspiration: "Inspiré de Premier Pas",
    accent: "text-sky-400",
    intro:
      "Entre dispositifs, aides et démarches, l'entrée dans la vie active est un labyrinthe pour les 16-25 ans. Comment leur rendre ce premier pas simple et accessible ?",
    chapters: [
      {
        ...TRAME[0], index: 1,
        title: "Un problème réel à cadrer",
        situation:
          "Les jeunes de 16 à 25 ans font face à une jungle de dispositifs, d'aides et d'interlocuteurs. L'information existe mais est éclatée, complexe et peu engageante pour eux.",
        prompt: "Tu démarres le projet. Par quoi commences-tu ?",
        options: [
          { label: "Lister tous les dispositifs sur un site", hint: "Annuaire de plus", points: 6 },
          { label: "Comprendre comment les jeunes cherchent vraiment", hint: "Partir de leurs usages", points: 18 },
          { label: "Refaire la com' institutionnelle", hint: "Surface", points: 4 },
        ],
        valentinChoice: 1,
        revealTitle: "Ce que j'ai fait",
        revealBody: [
          "Un annuaire de plus aurait ajouté de la complexité. J'ai cadré le vrai problème : l'information est là, mais illisible et décourageante pour un jeune.",
          "Je suis parti de la façon dont les 16-25 ans cherchent réellement de l'info — mobile, rapide, sans jargon — avant de décider du produit.",
        ],
        meta: [
          { label: "Cible", value: "16-25 ans" },
          { label: "Approche", value: "Usages réels" },
          { label: "Constat", value: "Info illisible" },
        ],
      },
      {
        ...TRAME[1], index: 2,
        title: "Écouter les jeunes",
        situation:
          "Ce que disent les jeunes :\n\n« Je ne sais même pas à quoi j'ai droit. »\n« C'est trop compliqué, j'abandonne. »\n« Je veux une réponse claire, pas dix pages. »",
        prompt: "Quel est le vrai point de douleur ?",
        options: [
          { label: "Le manque d'aides disponibles", hint: "Volume", points: 6 },
          { label: "La complexité et l'illisibilité de l'info", hint: "Friction cognitive", points: 18 },
          { label: "Un manque de notifications", hint: "Feature", points: 5 },
          { label: "Une marque pas assez connue", hint: "Notoriété", points: 7 },
        ],
        valentinChoice: 1,
        revealTitle: "L'insight clé",
        revealBody: [
          "Le problème n'était pas le manque d'aides mais leur illisibilité : trop d'étapes, trop de jargon, aucun parcours personnalisé.",
          "J'ai recadré l'objectif : passer d'« exposer les dispositifs » à « dire à chaque jeune ce qui le concerne, simplement ».",
        ],
        meta: [
          { label: "Signal", value: "Friction cognitive" },
          { label: "Recadrage", value: "Réponse personnalisée" },
        ],
      },
      {
        ...TRAME[2], index: 3,
        title: "Choisir le pari",
        situation:
          "Plusieurs pistes se défendent. Tu ne peux en pousser sérieusement qu'une seule pour le premier cycle.",
        prompt: "Sur quoi paries-tu ?",
        options: [
          { label: "Un moteur de recherche d'aides", hint: "Toujours un annuaire", points: 8 },
          { label: "Un parcours guidé et personnalisé", hint: "Simplifier la décision", points: 18 },
          { label: "Une appli de messagerie", hint: "Hors besoin", points: 6 },
          { label: "Une chaîne de contenus", hint: "Acquisition avant produit", points: 7 },
        ],
        valentinChoice: 1,
        revealTitle: "Mon choix et pourquoi",
        revealBody: [
          "J'ai parié sur un parcours simple et personnalisé qui, en quelques questions, dit au jeune ce qui le concerne et comment agir. C'est ce qui lève la barrière de complexité.",
          "Arbitrage : un moteur de recherche d'aides aurait reproduit la surcharge d'information au lieu de la réduire.",
        ],
        meta: [
          { label: "Pari", value: "Parcours guidé" },
          { label: "Levier", value: "Personnalisation" },
        ],
      },
      {
        ...TRAME[3], index: 4,
        title: "Livrer dans le cadre",
        situation:
          "Le produit doit toucher un public jeune et exigeant sur l'expérience. Les partenaires attendent de l'usage réel rapidement.",
        prompt: "Comment organises-tu la livraison ?",
        options: [
          { label: "Tout livrer d'un coup", hint: "Effet tunnel", points: 5 },
          { label: "Itérations courtes testées avec des jeunes", hint: "Boucle de feedback", points: 18 },
          { label: "Un prototype non confronté aux usagers", hint: "Pas de réel", points: 7 },
          { label: "Une landing de présentation", hint: "Tester la demande", points: 8 },
        ],
        valentinChoice: 1,
        revealTitle: "Ce que nous avons construit",
        revealBody: [
          "Nous avons livré par itérations courtes, en testant chaque version avec de vrais jeunes pour garder le parcours simple, mobile et engageant.",
          "Confronter tôt le produit au public a évité un parcours « logique pour nous » mais décourageant pour eux.",
        ],
        meta: [
          { label: "Cadence", value: "Itérations courtes" },
          { label: "Test", value: "Avec des jeunes" },
        ],
      },
      {
        ...TRAME[4], index: 5,
        title: "Lire le résultat avec honnêteté",
        situation:
          "Premier Pas aide des jeunes à y voir clair et à agir. Comment juges-tu le succès ?",
        prompt: "Comment l'évalues-tu ?",
        options: [
          { label: "Célébrer le lancement", hint: "On a livré", points: 6 },
          { label: "Parcours complétés + passage à l'action", hint: "Vision complète", points: 18 },
          { label: "Ne suivre que les visites", hint: "Métrique de vanité", points: 5 },
        ],
        valentinChoice: 1,
        revealTitle: "Résultats, et ce que je ferais différemment",
        revealBody: [
          "Le bon indicateur : les parcours réellement complétés et les jeunes qui passent à l'action — pas le simple trafic.",
          "Ce que je ferais différemment : personnaliser encore davantage selon la situation de chaque jeune dès le premier écran.",
        ],
        meta: [
          { label: "Impact", value: "Passage à l'action" },
          { label: "Mesure", value: "Parcours complétés" },
        ],
      },
    ],
  },
];

export const POINTS_PER_CHAPTER = 20;
export const CHAPTERS_PER_SCENARIO = 5;
export const MAX_POINTS = CHAPTERS_PER_SCENARIO * POINTS_PER_CHAPTER;

/** Liste par défaut, utilisée comme repli si la base est vide. */
export const DEFAULT_SCENARIOS = SCENARIOS;

function maxPointsOf(scenario: Scenario): number {
  return scenario.chapters.length * POINTS_PER_CHAPTER;
}

export function findScenario(list: Scenario[], id: string | null | undefined): Scenario {
  return list.find((s) => s.id === id) ?? list[0];
}

export function valentinScore(scenario: Scenario): number {
  const pts = scenario.chapters.reduce((sum, c) => sum + (c.options[c.valentinChoice]?.points ?? 0), 0);
  return Math.round((pts / maxPointsOf(scenario)) * 100);
}

export function computeScore(scenario: Scenario, choices: Record<string, number>): number {
  const pts = scenario.chapters.reduce((sum, c) => {
    const idx = choices[c.id];
    return sum + (idx != null ? c.options[idx]?.points ?? 0 : 0);
  }, 0);
  return Math.round((pts / maxPointsOf(scenario)) * 100);
}

export interface DimensionDelta {
  dimension: string;
  delta: number;
}

export function computeDeltas(scenario: Scenario, choices: Record<string, number>): DimensionDelta[] {
  return scenario.chapters.map((c) => {
    const userPts = choices[c.id] != null ? c.options[choices[c.id]]?.points ?? 0 : 0;
    const valPts = c.options[c.valentinChoice]?.points ?? 0;
    return { dimension: c.dimension, delta: userPts - valPts };
  });
}
