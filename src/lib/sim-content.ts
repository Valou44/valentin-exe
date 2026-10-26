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

// Les champs texte (situation, revealBody) acceptent du HTML simple.
export const SCENARIOS: Scenario[] = [
  {
    id: "monretab",
    question:
      "Comment rendre les patients acteurs et contributeurs de leur parcours de rétablissement en santé mentale ?",
    project: "Mon Retab' d'abord",
    inspiration: "E-santé",
    accent: "text-amber-400",
    intro:
      "En santé mentale, le parcours de soin est souvent subi par le patient. Comment lui donner une place active, voire contributive, dans son propre rétablissement ?",
    chapters: [
      {
        id: "problem",
        index: 1,
        dimension: "Cadrage du problème",
        tag: "ÉTAPE 01 — LE PROBLÈME",
        title: "Comment rendre le patient acteur de son rétablissement ?",
        situation:
          "<p>Dans les structures de santé mentale, les patients sont accompagnés par des professionnels du rétablissement à travers différents outils papier : objectifs, auto-évaluations, plans d'action, prévention des rechutes... </p><p>Pourtant, une grande partie des informations est dispersée et difficile à suivre dans le temps. Les patients ont parfois du mal à visualiser leur progression et les coordonnateurs à avoir une vision globale du parcours.</p>",
        prompt: "Tu démarres le projet. Par quoi commences-tu ?",
        options: [
          {
            label: "Numériser les documents papier existants",
            hint: "Faciliter l'accès aux informations",
            points: 12,
          },
          {
            label: "Développer un dossier médical partagé",
            hint: "Centraliser les données de santé",
            points: 15,
          },
          {
            label:
              "Comprendre ce qui empêche les patients de devenir pleinement acteurs de leur rétablissement",
            hint: "Identifier les freins à l'autonomie",
            points: 20,
          },
        ],
        valentinChoice: 2,
        revealTitle: "Ce que j'ai fait",
        revealBody: [
          "<p>Avant de réfléchir à la solution, j'ai voulu comprendre ce que le numérique pouvait réellement apporter au dispositif existant.</p><ul><li><p>Le problème n'était pas l'absence d'outils.</p></li><li><p>Le dispositif papier fonctionnait déjà.</p></li></ul><p>Le véritable enjeu était de permettre au patient de mieux suivre sa progression, de gagner en autonomie et de partager une vision commune de son parcours avec son coordonnateur.</p><p>Cette réflexion a orienté tout le projet : ne pas simplement numériser un support, mais renforcer le pouvoir d'agir du patient.</p>",
        ],
        meta: [
          {
            label: "Public",
            value: "Patients en rétablissement",
          },
          {
            label: "Problème",
            value: "Manque de visibilité du parcours",
          },
          {
            label: "Objectif",
            value: "Renforcer l'autonomie",
          },
        ],
      },
      {
        id: "discovery",
        index: 2,
        dimension: "Discovery",
        tag: "ÉTAPE 02 — DISCOVERY",
        title: "Que cherches-tu à comprendre en premier ?",
        situation:
          "Le dispositif de rétablissement existe déjà.\n\nLes patients utilisent des supports papier pour suivre leurs objectifs, leurs progrès et leurs réflexions.\n\nPourtant, les professionnels constatent des difficultés dans le suivi au quotidien.",
        prompt: "Que cherches-tu à comprendre en premier ?",
        options: [
          {
            label:
              "Comment le patient et le coordonnateur collaborent réellement autour du parcours de rétablissement",
            hint: "Comprendre les interactions",
            points: 20,
          },
          {
            label: "Pourquoi les patients remplissent peu les supports",
            hint: "Comprendre l'engagement",
            points: 12,
          },
          {
            label: "Pourquoi les professionnels manquent de temps",
            hint: "Comprendre les contraintes métier",
            points: 12,
          },
        ],
        valentinChoice: 0,
        revealTitle: "Ce que j'ai fait",
        revealBody: [
          "Je ne voulais pas simplement numériser un document.",
          "J'ai cherché à comprendre comment le patient et son coordonnateur travaillaient ensemble autour du rétablissement.",
          "Très vite, un constat est apparu : l'information était dispersée, difficile à suivre dans le temps et rarement accessible au bon moment.",
          "L'enjeu n'était donc pas seulement la digitalisation mais la création d'un espace partagé autour du parcours du patient.",
        ],
        meta: [
          {
            label: "Discovery",
            value: "Parcours patient/coordonnateur",
          },
          {
            label: "Observation",
            value: "Information fragmentée",
          },
          {
            label: "Insight",
            value: "Besoin d'un référentiel commun",
          },
        ],
      },
      {
        id: "prioritization",
        index: 3,
        dimension: "Priorisation",
        tag: "ÉTAPE 03 — PRIORISATION",
        title: "Que numérises-tu en premier ?",
        situation:
          "<p>Le dispositif papier comporte de nombreux éléments : </p><ul><li><p>Objectifs court terme </p></li><li><p>Objectifs long terme </p></li><li><p>Auto-évaluations </p></li><li><p>Prévention des rechutes </p></li><li><p>Carnet de santé </p></li><li><p>Notes de suivi </p></li></ul><p>Tu ne peux pas tout construire immédiatement.</p><p></p>",
        prompt: "Quelle brique priorises-tu ?",
        options: [
          {
            label: "Le carnet de santé",
            hint: "Centraliser les informations médicales",
            points: 11,
          },
          {
            label: "La messagerie",
            hint: "Fluidifier les échanges",
            points: 8,
          },
          {
            label: "Les objectifs et le suivi du rétablissement",
            hint: "Structurer la progression",
            points: 20,
          },
          {
            label: "Les statistiques et indicateurs",
            hint: "Mesurer davantage",
            points: 4,
          },
        ],
        valentinChoice: 2,
        revealTitle: "Mon choix et pourquoi",
        revealBody: [
          "J'ai choisi de commencer par le cœur du dispositif.",
          "Le rétablissement repose avant tout sur la capacité à définir des objectifs, les suivre dans le temps et visualiser sa progression.",
          "Les fiches ACTION et PARI étaient déjà utilisées sur papier.",
          "Je les ai placées au centre du produit afin de préserver la logique du dispositif tout en facilitant son utilisation quotidienne.",
        ],
        meta: [
          {
            label: "Priorité",
            value: "Objectifs",
          },
          {
            label: "Support",
            value: "ACTION / PARI",
          },
          {
            label: "Vision",
            value: "Structurer le rétablissement",
          },
        ],
      },
      {
        id: "delivery",
        index: 4,
        dimension: "Delivery",
        tag: "ÉTAPE 04 — DELIVERY",
        title: "Comment éviter une simple numérisation du papier ?",
        situation:
          "Tu pourrais simplement reproduire les formulaires existants à l'identique.\n\nMais le numérique permet aussi d'aller plus loin.",
        prompt: "Quelle approche choisis-tu ?",
        options: [
          {
            label: "Repenser entièrement la méthode",
            hint: "Créer un nouveau cadre",
            points: 5,
          },
          {
            label: "Ajouter un maximum de fonctionnalités",
            hint: "Exploiter le numérique",
            points: 11,
          },
          {
            label: "Reproduire fidèlement le dispositif papier",
            hint: "Minimiser les changements",
            points: 6,
          },
          {
            label:
              "Conserver les principes du dispositif tout en apportant de nouveaux leviers de suivi",
            hint: "Respecter le métier et améliorer l'usage",
            points: 20,
          },
        ],
        valentinChoice: 3,
        revealTitle: "Ce que j'ai fait",
        revealBody: [
          "<p>Je ne voulais pas dénaturer un dispositif déjà éprouvé sur le terrain. L'objectif n'était pas de remplacer la méthode mais de l'augmenter.</p><p>Le numérique a permis d'ajouter des fonctionnalités impossibles sur papier :</p><ul><li><p>Historique des évolutions</p></li><li><p>Visualisation des indicateurs</p></li><li><p>Alertes sur les facteurs de rechute</p></li><li><p>Vision consolidée du parcours</p></li></ul><p>tout en conservant les pratiques des professionnels.</p>",
        ],
        meta: [
          {
            label: "Delivery",
            value: "Augmentation du dispositif",
          },
          {
            label: "Principe",
            value: "Ne pas casser les usages",
          },
          {
            label: "Valeur",
            value: "Visibilité dans le temps",
          },
        ],
      },
      {
        id: "results",
        index: 5,
        dimension: "Recul",
        tag: "ÉTAPE 05 — RÉSULTATS",
        title: "Quel est le principal apport du numérique ?",
        situation:
          "Le dispositif papier fonctionnait déjà avant la plateforme.\n\nLe produit n'avait donc pas pour objectif d'inventer une nouvelle méthode.",
        prompt: "Avec le recul, qu'est-ce que le numérique a réellement apporté ?",
        options: [
          {
            label: "Une meilleure capacité à rendre visibles les progrès et les signaux faibles",
            hint: "Mieux accompagner le rétablissement",
            points: 20,
          },
          {
            label: "Une réduction du temps administratif",
            hint: "Gagner en efficacité",
            points: 18,
          },
          {
            label: "Davantage de fonctionnalités",
            hint: "Étendre le périmètre",
            points: 5,
          },
          {
            label: "Davantage de données",
            hint: "Mesurer plus",
            points: 0,
          },
        ],
        valentinChoice: 0,
        revealTitle: "Ce que j'en ai tiré",
        revealBody: [
          "<p>Le principal bénéfice n'a pas été la digitalisation elle-même.</p><p>La vraie valeur a été de rendre visibles des informations qui étaient auparavant dispersées ou oubliées :</p><ul><li><p>Progression des objectifs</p></li><li><p>Evolution de l'humeur</p></li><li><p>Facteurs fragilisants</p></li><li><p>Signes annonciateurs de crise</p></li><li><p>Ressources mobilisables</p></li></ul><p>Le numérique a permis au patient comme au coordonnateur d'avoir une lecture beaucoup plus claire du parcours de rétablissement.</p>",
        ],
        meta: [
          {
            label: "Learning",
            value: "Visibilité",
          },
          {
            label: "Impact",
            value: "Anticipation",
          },
          {
            label: "Conviction",
            value: "Mieux voir pour mieux agir",
          },
        ],
      },
    ],
  },
  {
    id: "premierpas",
    question:
      "Comment simplifier et démocratiser l'entrée dans la vie active des jeunes de 16 à 25 ans ?",
    project: "Premier Pas",
    inspiration: "Ed-Tech",
    accent: "text-sky-400",
    intro:
      "Entre dispositifs, aides et démarches, l'entrée dans la vie active est un labyrinthe pour les 16-25 ans. Comment leur rendre ce premier pas simple et accessible ?",
    chapters: [
      {
        id: "problem",
        index: 1,
        dimension: "Cadrage du problème",
        tag: "ÉTAPE 01 — LE PROBLÈME",
        title: "Tu démarres le projet. Par quoi commences-tu ?",
        situation:
          "<p>Au fil des années, tu constates toujours les mêmes difficultés. Des jeunes ne savent pas : </p><ul><li><p>Comment trouver un logement </p></li><li><p>Comment comprendre leurs droits </p></li><li><p>Quelles aides existent </p></li><li><p>Comment décrocher leur premier emploi Ils ont l'impression d'être \"lâchés dans la vie adulte\" sans mode d'emploi.</p></li></ul><p></p>",
        prompt: "Tu identifies un besoin chez les jeunes. Par quoi commences-tu ?",
        options: [
          {
            label: "Créer une plateforme recensant toutes les aides existantes",
            hint: "Centraliser l'information",
            points: 14,
          },
          {
            label: "Comprendre les moments où les jeunes se sentent réellement bloqués",
            hint: "Identifier les situations les plus difficiles",
            points: 20,
          },
          {
            label: "Développer directement des outils d'accompagnement",
            hint: "Passer rapidement à l'action",
            points: 10,
          },
        ],
        valentinChoice: 1,
        revealTitle: "Ce que j'ai fait",
        revealBody: [
          "Avant de penser aux fonctionnalités, j'ai cherché à comprendre les situations qui généraient le plus d'anxiété.",
          "Les discussions menées auprès de jeunes et d'associations ont révélé un sentiment récurrent :",
          '"On nous demande d\'être autonomes sans nous expliquer les règles du jeu."',
          "Le problème n'était pas uniquement le manque d'information mais surtout le manque de repères et de compréhension.",
        ],
        meta: [
          {
            label: "Public",
            value: "Jeunes 16-25 ans",
          },
          {
            label: "Insight",
            value: "Manque de repères",
          },
          {
            label: "Méthode",
            value: "Observation terrain",
          },
        ],
      },
      {
        id: "discovery",
        index: 2,
        dimension: "Discovery",
        tag: "ÉTAPE 02 — DISCOVERY",
        title: "Quel problème cherches-tu à résoudre ?",
        situation:
          "<p>Les échanges terrain font émerger plusieurs constats : </p><ul><li><p>Les aides sont mal connues </p></li><li><p>Le langage administratif est complexe </p></li><li><p>Les démarches paraissent intimidantes </p></li><li><p>Les jeunes ne savent pas toujours par où commencer </p></li></ul><p>Tu dois identifier le problème central.</p><p></p>",
        prompt: "Quel sujet décides-tu d'approfondir ?",
        options: [
          {
            label: "Le manque d'accompagnement humain",
            hint: "Les jeunes ont besoin d'être guidés",
            points: 14,
          },
          {
            label: "Le manque d'information",
            hint: "Les ressources sont difficiles à trouver",
            points: 14,
          },
          {
            label: "La difficulté à transformer l'information en action",
            hint: "Comprendre ne signifie pas savoir faire",
            points: 20,
          },
          {
            label: "Le manque de dispositifs publics",
            hint: "Créer davantage d'aides",
            points: 7,
          },
        ],
        valentinChoice: 1,
        revealTitle: "Ce que j'ai fait",
        revealBody: [
          "Au départ, je pensais que l'information était le problème principal.",
          "Mais en observant les usages, j'ai réalisé que les ressources existaient déjà.",
          "Le vrai problème était ailleurs : beaucoup de jeunes savaient qu'une aide ou une démarche existait mais ne savaient pas comment passer à l'action.",
          "Comprendre n'était pas suffisant.",
          "Il fallait rendre les choses actionnables.",
        ],
        meta: [
          {
            label: "Discovery",
            value: "Compréhension des usages",
          },
          {
            label: "Insight",
            value: "Information ≠ Passage à l'action",
          },
          {
            label: "Apprentissage",
            value: "Simplifier les premières étapes",
          },
        ],
      },
      {
        id: "prioritization",
        index: 3,
        dimension: "Priorisation",
        tag: "ÉTAPE 03 — PRIORISATION",
        title: "Comment aider les jeunes à apprendre ?",
        situation:
          "<p>Après plusieurs mois, tu dois choisir une direction produit. Plusieurs pistes sont possibles :</p><ul><li><p>Guides pratiques </p></li><li><p>Articles</p></li><li><p>Fiches explicatives </p></li><li><p>Parcours interactifs </p></li><li><p>Quizz</p></li></ul><p></p>",
        prompt: "Quelle approche priorises-tu ?",
        options: [
          {
            label: "Produire davantage de contenu",
            hint: "Couvrir plus de sujets",
            points: 14,
          },
          {
            label: "Développer une base documentaire exhaustive",
            hint: "Répondre à toutes les questions",
            points: 8,
          },
          {
            label: "Mettre en avant les contenus les plus populaires",
            hint: "Faire apprendre par l'action",
            points: 8,
          },
          {
            label: "Créer des parcours pédagogiques interactifs",
            hint: "Faire apprendre par l'action",
            points: 20,
          },
        ],
        valentinChoice: 3,
        revealTitle: "Ce que j'ai fait",
        revealBody: [
          "<p>Mon hypothèse initiale était que du contenu de qualité suffirait.</p><p>Pendant plusieurs mois, les utilisateurs consultaient les guides puis disparaissaient.</p><p>Les données racontaient une histoire claire :</p><ul><li><p>Les jeunes lisaient.</p></li><li><p>Mais ils ne revenaient pas.</p></li></ul><p>J'ai alors décidé de changer complètement d'approche.</p><p>Plutôt que de transmettre de l'information, j'ai commencé à construire des expériences d'apprentissage.</p><p>C'est la naissance des parcours pédagogiques et des quiz gamifiés.</p>",
        ],
        meta: [
          {
            label: "Pivot",
            value: "Éditorial → Gamification",
          },
          {
            label: "Signal",
            value: "Faible rétention",
          },
          {
            label: "Décision",
            value: "Apprentissage actif",
          },
        ],
      },
      {
        id: "delivery",
        index: 4,
        dimension: "Delivery",
        tag: "ÉTAPE 04 — DELIVERY",
        title: "Que fais-tu quand les données contredisent ton intuition ?",
        situation:
          "<p>Après plusieurs mois de lancement : </p><ul><li><p>Les guides sont consultés</p></li><li><p>L'acquisition progresse </p></li><li><p>La rétention reste faible </p></li></ul><p>Ton hypothèse de départ est fragilisée.</p><p></p>",
        prompt: "Comment réagis-tu ?",
        options: [
          {
            label: "Repenser le produit autour de l'engagement utilisateur",
            hint: "Accepter de remettre en question son hypothèse",
            points: 20,
          },
          {
            label: "Produire encore plus de contenu",
            hint: "Renforcer la stratégie actuelle",
            points: 12,
          },
          {
            label: "Investir davantage dans l'acquisition",
            hint: "Augmenter le trafic",
            points: 10,
          },
          {
            label: "Attendre davantage de données",
            hint: "Reporter la décision",
            points: 5,
          },
        ],
        valentinChoice: 0,
        revealTitle: "Ce que j'ai fait",
        revealBody: [
          "J'ai accepté que mon intuition de départ était incomplète.",
          "Les utilisateurs obtenaient une réponse puis quittaient définitivement l'application.",
          "J'ai choisi de reconstruire une partie importante du produit autour d'une logique de progression, de récompenses et d'apprentissage continu.",
          "Ce changement représentait un risque important mais il répondait directement au problème observé.",
        ],
        meta: [
          {
            label: "Delivery",
            value: "Product Pivot",
          },
          {
            label: "Décision",
            value: "Suivre les données",
          },
          {
            label: "Risque",
            value: "Refonte de l'expérience",
          },
        ],
      },
      {
        id: "results",
        index: 5,
        dimension: "Recul",
        tag: "ÉTAPE 05 — RÉSULTATS",
        title: "Quel a été le principal apprentissage ?",
        situation:
          "<p>Un an après le lancement :</p><ul><li><p>Plus de 500 utilisateurs </p></li><li><p>Plus de 20 % de rétention hebdomadaire </p></li><li><p>Des parcours pédagogiques utilisés régulièrement </p></li></ul><p>Le produit a beaucoup évolué depuis sa première version.</p><p></p>",
        prompt: "Avec le recul, quel enseignement retiens-tu ?",
        options: [
          {
            label: "L'engagement se construit plus par l'expérience que par l'information",
            hint: "Faire vivre plutôt que transmettre",
            points: 20,
          },
          {
            label: "L'acquisition est le principal levier",
            hint: "Faire croître l'audience",
            points: 15,
          },
          {
            label: "Les jeunes ont surtout besoin de davantage d'informations",
            hint: "Miser sur la quantité",
            points: 5,
          },
          {
            label: "Produire beaucoup de contenu est la clé",
            hint: "Miser sur l'expertise",
            points: 5,
          },
        ],
        valentinChoice: 0,
        revealTitle: "Ce que j'en ai tiré ",
        revealBody: [
          "Premier Pas m'a appris qu'informer et faire apprendre sont deux choses très différentes.",
          "Les utilisateurs ne reviennent pas pour consulter une bibliothèque de contenus.",
          "Ils reviennent lorsqu'ils ont le sentiment de progresser.",
          "Le passage d'une logique éditoriale à une logique d'apprentissage gamifié a profondément changé les performances du produit et ma façon de concevoir l'engagement.",
        ],
        meta: [
          {
            label: "Résultat",
            value: "+500 utilisateurs",
          },
          {
            label: "Rétention",
            value: "→ +20% hebdomadaire",
          },
          {
            label: "Learning",
            value: "Expérience > Contenu",
          },
        ],
      },
    ],
  },
];

export const POINTS_PER_CHAPTER = 20;
export const CHAPTERS_PER_SCENARIO = 5;
export const MAX_POINTS = CHAPTERS_PER_SCENARIO * POINTS_PER_CHAPTER;

function maxPointsOf(scenario: Scenario): number {
  return scenario.chapters.length * POINTS_PER_CHAPTER;
}

export function findScenario(list: Scenario[], id: string | null | undefined): Scenario {
  return list.find((s) => s.id === id) ?? list[0];
}

export function valentinScore(scenario: Scenario): number {
  const pts = scenario.chapters.reduce(
    (sum, c) => sum + (c.options[c.valentinChoice]?.points ?? 0),
    0,
  );
  return Math.round((pts / maxPointsOf(scenario)) * 100);
}

export function computeScore(scenario: Scenario, choices: Record<string, number>): number {
  const pts = scenario.chapters.reduce((sum, c) => {
    const idx = choices[c.id];
    return sum + (idx != null ? (c.options[idx]?.points ?? 0) : 0);
  }, 0);
  return Math.round((pts / maxPointsOf(scenario)) * 100);
}

export interface DimensionDelta {
  dimension: string;
  delta: number;
}

export function computeDeltas(
  scenario: Scenario,
  choices: Record<string, number>,
): DimensionDelta[] {
  return scenario.chapters.map((c) => {
    const userPts = choices[c.id] != null ? (c.options[choices[c.id]]?.points ?? 0) : 0;
    const valPts = c.options[c.valentinChoice]?.points ?? 0;
    return { dimension: c.dimension, delta: userPts - valPts };
  });
}
