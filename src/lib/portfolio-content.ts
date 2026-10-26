// ============================================================================
// Valentin.EXE — CONTENU DU PORTFOLIO
// Contenu réel de Valentin Renard, extrait de son CV et de son ancien site.
// ============================================================================

import naonairImg from "../assets/projects/naonair.png.asset.json";
import evappImg from "../assets/projects/evapp.png.asset.json";
import premierPasImg from "../assets/projects/premierpas.webp.asset.json";
import monRetabImg from "../assets/projects/monretab.jpg.asset.json";
import saltoImg from "../assets/projects/salto.jpg.asset.json";
import valentinPhoto from "../assets/valentin-photo.avif.asset.json";

export const PROFILE = {
  name: "Valentin Renard",
  role: "Product Manager",
  years: 10,
  tagline: "Vivez le Product Management à travers de vraies décisions.",
  location: "Nantes, France",
  email: "renard.valentin49@gmail.com",
  photo: valentinPhoto.url,
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
  image: string;
  gallery?: string[];
  problem: string;
  discovery: string;
  decision: string;
  solution: string;
  impact: { label: string; value: string; sub?: string }[];
  lessons: string;
  differently: string;
  link?: string;
  /** Brouillon quand false ; publié (visible) quand true ou absent. */
  published?: boolean;
}

export const PROJECTS: CaseStudy[] = [
  {
    slug: "premier-pas",
    name: "Premier Pas",
    oneLiner:
      "Application gamifiée qui apprend aux 16-25 ans les bases de l'autonomie : logement, emploi, budget, santé.",
    year: "2024",
    tags: ["App", "Gamification", "Impact social", "Jeunesse"],
    image: premierPasImg.url,
    problem:
      "Chaque année, de nombreux jeunes se retrouvent confrontés à des démarches essentielles — trouver un logement, gérer un budget, accéder à leurs droits ou effectuer des formalités administratives — sans savoir par où commencer. Les informations existent, mais elles sont dispersées, complexes et souvent rédigées dans un langage peu accessible.\n\nL’enjeu était de créer un outil capable de transformer cette complexité en parcours simples, compréhensibles et actionnables.",
    discovery:
      "J’ai travaillé à comprendre les difficultés rencontrées par les jeunes dans leur parcours vers l’autonomie en échangeant avec les structures d’accompagnement et en analysant les étapes clés de leur quotidien.\n\nCette phase a permis d’identifier plusieurs freins récurrents :\n\n- La difficulté à savoir quelles démarches entreprendre.\n- La peur de faire une erreur administrative.\n- Le manque de visibilité sur les aides disponibles.\n- Une surcharge d’informations difficile à prioriser.\n\nÀ partir de ces constats, j’ai cartographié les principaux parcours de vie afin d’identifier les moments où un accompagnement numérique pouvait avoir le plus d’impact.",
    decision:
      "Plutôt que de construire une simple base documentaire, j’ai choisi de concevoir un produit centré sur l’action.\n\nL’objectif était de guider les utilisateurs étape par étape à travers des parcours contextualisés, en leur présentant uniquement les informations pertinentes au bon moment.\n\nCette approche permet de réduire la charge cognitive et de rendre les démarches plus accessibles à des publics parfois éloignés des outils administratifs traditionnels.",
    solution:
      "Premier Pas est une plateforme web et mobile qui accompagne les jeunes dans les grandes étapes de leur accès à l’autonomie.\n\nLe produit permet notamment de :\n\nDécouvrir les démarches adaptées à sa situation.\nSuivre des parcours guidés étape par étape.\nAccéder à des contenus vulgarisés et contextualisés.\nIdentifier les aides et dispositifs mobilisables.\nCentraliser les informations importantes dans un espace unique.\nFaciliter le suivi de l’avancement des démarches.\n\nLa solution a été pensée avec une forte exigence de simplicité, d’accessibilité et de pédagogie afin d’être utilisable par des profils très variés.",
    impact: [
      {
        label: "Cible",
        value: "16-25 ans",
      },
      {
        label: "Accès",
        value: "100% gratuit",
      },
      {
        label: "Format",
        value: "Parcours + guides",
      },
    ],
    lessons:
      "Concevoir pour des publics parfois éloignés du numérique m’a appris qu’un bon produit n’est pas celui qui fournit le plus d’informations, mais celui qui aide l’utilisateur à accomplir concrètement son objectif.\n\nLa clarté, la pédagogie et la simplicité ont souvent plus d’impact que la richesse fonctionnelle.",
    differently:
      "Si je reprenais le projet aujourd’hui, j’intégrerais davantage de mécanismes de personnalisation dès les premières versions afin d’adapter automatiquement les parcours en fonction du profil, de la situation et des objectifs de chaque utilisateur.\n\nCela permettrait de proposer un accompagnement encore plus pertinent et de réduire davantage les efforts nécessaires pour passer à l’action.",
    link: "https://premier-pas.app/",
  },
  {
    slug: "naonair",
    name: "Naonair",
    oneLiner:
      "Application mobile d'analyse de la qualité de l'air, conçue avec Air Pays de la Loire.",
    year: "2023",
    tags: ["App mobile", "Géodonnées", "Santé"],
    image: naonairImg.url,
    problem:
      "<p>La qualité de l’air est devenue l’une des principales préoccupations environnementales des Français. Pourtant, les données liées à la pollution restent complexes à comprendre et rarement exploitables au quotidien par le grand public.</p><p>Dans la métropole nantaise, les citoyens ne disposaient d’aucun outil simple leur permettant de visualiser la pollution en temps réel, de comprendre son impact sur leurs déplacements ou de choisir des itinéraires moins exposés. Air Pays de la Loire souhaitait transformer un important travail de modélisation environnementale en un service concret, utile et accessible à tous.</p>",
    discovery:
      "<p>La phase de découverte a commencé par une immersion dans l’écosystème du projet AIREAL, un programme européen visant à exploiter les données publiques pour encourager des comportements plus respectueux de l’environnement.</p><p>J’ai travaillé à comprendre les différentes sources de données disponibles, les contraintes de modélisation de la pollution et les usages potentiels pour les citoyens. Cette phase a permis d’identifier plusieurs besoins prioritaires :</p><ul><li><p>Consulter la qualité de l’air autour de soi en temps réel.</p></li><li><p>Comprendre les zones les plus exposées à la pollution.</p></li><li><p>Comparer un trajet rapide à un trajet moins pollué.</p></li><li><p>Adapter ses activités sportives ou de loisirs selon les prévisions.</p></li><li><p>Rendre des données scientifiques complexes compréhensibles par tous.</p></li></ul><p></p>",
    decision:
      "<p>Le principal défi du projet n’était pas de produire davantage de données, mais de les rendre actionnables.</p><p>Nous avons donc fait le choix de construire l’expérience utilisateur autour de la prise de décision quotidienne plutôt que de la simple consultation d’indicateurs environnementaux.</p><p>L’application devait permettre à chacun de répondre rapidement à des questions concrètes :</p><ul><li><p>Quel est le niveau de pollution autour de moi ?</p></li><li><p>Quel itinéraire me permet de moins m’exposer ?</p></li><li><p>Est-ce un bon moment pour sortir courir ?</p></li><li><p>Quelle zone est la plus saine aujourd’hui ?</p></li></ul><p>Cette approche a permis de transformer une problématique environnementale complexe en une expérience simple et utile au quotidien.</p>",
    solution:
      "<p>Naonair est une application mobile développée pour Air Pays de la Loire permettant de visualiser la qualité de l’air sur l’ensemble de la métropole nantaise.</p><p>La plateforme permet notamment de :</p><ul><li><p>Consulter les niveaux de pollution en temps réel.</p></li><li><p>Visualiser les zones les plus exposées sur une carte interactive.</p></li><li><p>Rechercher des itinéraires moins pollués.</p></li><li><p>Comparer plusieurs modes de déplacement.</p></li><li><p>Suivre un trajet grâce à une navigation intégrée.</p></li><li><p>Découvrir des parcours adaptés aux activités sportives et de loisirs.</p></li><li><p>Anticiper les évolutions de la qualité de l’air grâce aux prévisions disponibles.</p></li></ul><p></p>",
    impact: [
      {
        label: "Lancement",
        value: "Oct. 2023",
      },
      {
        label: "Stores",
        value: "iOS + Android",
      },
      {
        label: "Évolutions",
        value: "Suivi pollens",
      },
    ],
    lessons:
      "<p>Ce projet m’a appris qu’un produit public efficace ne consiste pas seulement à rendre des données accessibles, mais à les transformer en décisions concrètes pour les utilisateurs.</p><p>L’enjeu n’était pas de montrer la pollution, mais d’aider chacun à agir face à elle. Cette différence de perspective a fortement influencé les choix de conception tout au long du projet.</p>",
    differently:
      "<p>Avec le recul, j’aurais intégré plus tôt des mécanismes de personnalisation permettant d’adapter les recommandations en fonction du profil de l’utilisateur.</p><p>Une personne pratiquant la course à pied, un parent accompagnant ses enfants ou un cycliste quotidien n’ont pas les mêmes attentes face aux données environnementales. Une expérience davantage contextualisée aurait permis d’augmenter encore la valeur perçue du produit.</p>",
    link: "https://www.naonair.org/",
    published: false,
  },
  {
    slug: "mon-retab",
    name: "Mon Retab' d'abord",
    oneLiner:
      "Une application web de soutien au rétablissement en santé mentale, conçue pour aider les usagers à devenir acteurs de leur parcours et prévenir les rechutes.",
    year: "2022",
    tags: ["E-santé", "Impact", "Webapp"],
    image: monRetabImg.url,
    problem:
      "<p>Le Club Action Avenir (C2A) accompagnait ses usagers à l’aide d’un plan de rétablissement construit dans des documents bureautiques. Bien que pertinent sur le fond, cet outil présentait plusieurs limites : </p><ul><li><p>Informations dispersées</p></li><li><p>Faible autonomie des usagers</p></li><li><p>Difficulté à suivre les objectifs dans le temps</p></li><li><p>Manque d’appropriation du parcours de rétablissement. </p></li></ul><p>L’enjeu était de créer un outil numérique permettant aux personnes accompagnées de suivre leur progression, définir leurs objectifs et collaborer plus facilement avec les professionnels qui les accompagnent.</p><p></p>",
    discovery:
      "<p>La phase de conception s’est appuyée sur un important travail de formalisation des pratiques existantes et des besoins des professionnels du rétablissement. Le projet reposait sur une méthodologie déjà éprouvée au sein du C2A, qu’il fallait traduire en expérience numérique sans en dénaturer l’approche humaine. </p><p>Les échanges avec les psychologues coordonnateurs ont permis d’identifier les moments clés du parcours utilisateur : auto-évaluation, définition des objectifs, suivi des actions, prévention des rechutes et préparation des entretiens d’accompagnement.</p>",
    decision:
      "<p>L’une des décisions structurantes du projet a été de placer l’usager au centre du dispositif. </p><p>Plutôt que de reproduire un dossier médical numérique classique, nous avons conçu un outil d’accompagnement personnel permettant à chaque utilisateur de construire progressivement son propre plan de rétablissement. </p><p>L’objectif était de favoriser l’autonomie, l’engagement et le pouvoir d’agir, tout en maintenant un lien fort avec les professionnels de santé.</p>",
    solution:
      "<p>Mon Rétab' d'abord est une plateforme web sécurisée qui accompagne les usagers dans leur parcours de rétablissement personnel. L’application permet notamment de : </p><ul><li><p>Réaliser des auto-évaluations régulières dans plusieurs dimensions du bien-être. </p></li><li><p>Définir des objectifs personnels et suivre leur progression. </p></li><li><p>Mettre en place des plans d’action concrets. </p></li><li><p>Construire un outil de prévention des rechutes. </p></li><li><p>Centraliser les informations utiles aux entretiens d’accompagnement. </p></li><li><p>Faciliter la collaboration entre usagers et professionnels. </p></li></ul><p>Accessible sur ordinateur et mobile, la plateforme accompagne les utilisateurs aussi bien pendant les séances qu’entre les rendez-vous.</p><p></p>",
    impact: [
      {
        label: "Domaine",
        value: "E-santé",
      },
      {
        label: "Approche",
        value: "Rétablissement par l'action",
      },
      {
        label: "Nombre d'usagers",
        value: "+ 100",
      },
    ],
    lessons:
      "<p>Ce projet m’a montré qu’en santé, la valeur d’un produit ne réside pas uniquement dans ses fonctionnalités, mais dans sa capacité à renforcer l’autonomie des personnes qu’il accompagne. </p><p>La technologie n’était pas la finalité du projet : elle était un moyen de rendre les usagers davantage acteurs de leur propre parcours.</p>",
    differently:
      "Avec le recul, j’intégrerais plus tôt des mécanismes de mesure d’engagement et d’usage afin d’identifier précisément les fonctionnalités les plus utiles entre les séances et de mieux prioriser les évolutions du produit sur le long terme.",
    link: "https://www.monretabdabord.fr/",
  },
  {
    slug: "salto",
    name: "Salto.run",
    oneLiner: "Outil interne d'analyse financière et de suivi d'acquisition du parc audiovisuel.",
    year: "2022",
    tags: ["Outil interne", "Data", "Efficacité"],
    image: saltoImg.url,
    problem:
      "<p>SALTO gérait l’acquisition et le pilotage de son catalogue audiovisuel à travers une multitude de fichiers, outils et processus répartis entre plusieurs équipes. Cette organisation générait des ressaisies constantes, une perte d’informations, un manque de traçabilité et des difficultés à produire des analyses financières fiables. </p><p>L’entreprise avait besoin d’un outil centralisé capable de structurer la donnée et d’accompagner les équipes dans leurs prises de décision.</p>",
    discovery:
      "<p>J’ai commencé par une phase d’immersion auprès des différents métiers impliqués dans le cycle de vie d’un contenu audiovisuel : acquisition, programmation, finance et opérations. </p><p>À travers des entretiens et des ateliers de cartographie des processus, j’ai identifié les principaux points de friction, les tâches les plus chronophages et les zones où l’information se perdait entre les équipes. </p><p>Cette phase a permis de reconstruire le parcours complet d’un contenu, depuis son identification avant achat jusqu’à sa sortie du catalogue, et de faire émerger les opportunités à plus forte valeur pour un premier MVP.</p>",
    decision:
      "<p>L’un des principaux défis du projet était son ampleur. Les besoins identifiés couvraient de nombreux métiers et plusieurs années de processus historiques. </p><p>Plutôt que de chercher à reproduire l’ensemble des outils existants, j’ai concentré le périmètre du MVP sur deux enjeux stratégiques : </p><ul><li><p>Le suivi du processus d’acquisition des contenus audiovisuels.</p></li><li><p>Le pilotage financier du catalogue. </p></li></ul><p>Cette approche a permis de livrer rapidement de la valeur tout en posant les fondations d’une plateforme capable d’évoluer progressivement.</p><p></p>",
    solution:
      "<p>J’ai participé à la conception et au développement de Salto.run, une plateforme interne pensée comme un hub unique de connaissance métier. L’outil permet de :</p><ul><li><p>Centraliser les données liées aux contenus audiovisuels.</p></li><li><p>Uniformiser les processus de saisie et de validation.</p></li><li><p>Historiser les modifications pour améliorer la traçabilité.</p></li><li><p>Faciliter la collaboration entre les équipes.</p></li><li><p>Produire des analyses financières et opérationnelles fiables.</p></li><li><p>Fournir des indicateurs d’aide à la décision à court et long terme. </p></li></ul><p>Construit de manière itérative avec les utilisateurs finaux, le produit a été testé et enrichi à chaque sprint afin de garantir son adoption par les équipes.</p><p></p>",
    impact: [
      {
        label: "Type",
        value: "Outil interne",
      },
      {
        label: "Domaine",
        value: "Analyse financière",
      },
      {
        label: "Cible",
        value: "Équipes internes",
      },
    ],
    lessons:
      "Ce projet m’a rappelé qu’un produit interne mérite le même niveau d’exigence qu’un produit destiné à des clients externes. Derrière chaque processus métier se trouvent des utilisateurs qui ont besoin d’outils simples, fiables et agréables à utiliser pour être performants au quotidien.",
    differently:
      "<p>Si je devais recommencer ce projet aujourd’hui, je mettrais en place dès les premières versions un dispositif de mesure d’usage plus complet. </p><p>Cela aurait permis d’identifier plus rapidement les fonctionnalités les plus utilisées, de mieux comprendre les comportements des équipes et d’orienter certaines décisions produit sur la base de données d’adoption réelles plutôt que sur des retours qualitatifs uniquement.</p>",
    published: false,
  },
  {
    slug: "evapp",
    name: "Evapp.io",
    oneLiner: "SaaS de création et de gestion d'événements en ligne, hybrides et interactifs.",
    year: "2020",
    tags: ["SaaS", "Événementiel"],
    image: evappImg.url,
    problem:
      "<p>L'organisation d'événements digitaux repose souvent sur une accumulation d'outils spécialisés : solution d'inscription, plateforme de streaming, outil d'interaction, diffusion replay ou encore gestion des participants.</p><p>Cette fragmentation complexifie la préparation des événements, augmente les coûts opérationnels et rend les équipes dépendantes de prestataires techniques pour chaque diffusion.</p><p>L'objectif était de concevoir une solution unique permettant aux organisateurs de créer et piloter leurs événements de bout en bout en toute autonomie.</p>",
    discovery:
      "<p>Pour comprendre les besoins réels des organisateurs, nous avons analysé les différentes typologies d'événements gérées par la plateforme : webinars, conférences interactives, webcasts, événements hybrides et retransmissions live.</p><p>Cette phase a mis en évidence plusieurs attentes récurrentes :</p><ul><li><p>Réduire le temps de préparation des événements.</p></li><li><p>Offrir une personnalisation avancée aux couleurs de chaque marque.</p></li><li><p>Centraliser les fonctionnalités dans une seule interface.</p></li><li><p>Permettre aux équipes marketing et communication d'être autonomes.</p></li><li><p>Maintenir un haut niveau d'engagement des participants grâce à l'interactivité.</p></li></ul><p></p>",
    decision:
      "<p>Plutôt que de développer une plateforme figée autour d'un format d'événement unique, nous avons choisi une approche modulaire.</p><p>Chaque organisateur peut construire son événement à partir de briques fonctionnelles : inscription, diffusion vidéo, chat, questions-réponses, sondages, quiz, replay ou encore statistiques.</p><p>Cette flexibilité permet d'adapter l'expérience à différents usages sans multiplier les outils ou les développements spécifiques.</p>",
    solution:
      "<p>Evapp est une plateforme SaaS de gestion d'événements digitaux et hybrides conçue pour simplifier l'organisation et la diffusion d'événements en ligne.</p><p>La solution permet notamment de :</p><ul><li><p>Configurer un événement en quelques minutes.</p></li><li><p>Personnaliser l'ensemble des interfaces aux couleurs de la marque.</p></li><li><p>Gérer les inscriptions et la participation.</p></li><li><p>Diffuser des conférences et webcasts en direct.</p></li><li><p>Animer les échanges grâce aux chats, questions et sondages.</p></li><li><p>Produire des événements hybrides mêlant public présentiel et distanciel.</p></li><li><p>Accéder à des indicateurs de suivi et de performance.</p></li></ul><p></p>",
    impact: [
      {
        label: "Équipe",
        value: "5 dev · 1 designer",
      },
      {
        label: "Clients",
        value: "+ 200",
      },
      {
        label: "Année de sortie",
        value: "2020",
      },
    ],
    lessons:
      "<p>Ce projet m'a appris qu'un bon produit B2B ne consiste pas seulement à ajouter des fonctionnalités, mais à réduire la complexité opérationnelle des utilisateurs.</p><p>Les organisateurs d'événements recherchent avant tout de l'autonomie, de la fiabilité et de la simplicité. Lorsqu'un produit répond à ces trois besoins, il devient rapidement un véritable outil de travail quotidien.</p>",
    differently:
      "<p>Avec le recul, j'intégrerais davantage d'outils d'analyse comportementale dès les premières versions afin de mieux comprendre les usages des organisateurs et des participants.</p><p>Cela aurait permis d'identifier plus rapidement les fonctionnalités les plus créatrices de valeur et d'optimiser les parcours utilisateurs sur la base de données réelles plutôt que de simples retours qualitatifs.</p>",
    link: "https://evapp.io/",
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
    points: [
      "Interviews & tests utilisateurs",
      "Immersion métier terrain",
      "Cartographie des besoins",
    ],
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
    points: [
      "Gestion de backlog & sprints",
      "JIRA / ClickUp / Notion / Linear",
      "Démos & recettage",
    ],
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
    description:
      "Calculer des trajets optimisés selon la pollution a rendu la donnée actionnable au quotidien.",
  },
  {
    name: "Gamification de l'autonomie (Premier Pas)",
    result: "win",
    description:
      "Transformer chaque étape réelle en XP a poussé les jeunes à passer à l'action, pas juste à lire.",
  },
  {
    name: "Interactivité temps réel (Evapp.io)",
    result: "win",
    description:
      "Votes, sondages et quiz modérés ont nettement renforcé l'engagement des participants.",
  },
  {
    name: "Création de présentations libre (Kit Métiers)",
    result: "mixed",
    description:
      "Forte adoption, mais l'outillage de mise à jour de contenu a sous-estimé l'effort de maintenance.",
  },
  {
    name: "Refonte d'un outil Flash legacy",
    result: "win",
    description:
      "Migration d'un socle obsolète vers une webapp moderne, évolutive et déployée nationalement.",
  },
];

export const TERMINAL_RESPONSES: Record<string, string[]> = {
  whoami: [
    "Valentin Renard — Product Manager, bientôt 10 ans d'expérience.",
    "Je conçois, pilote et optimise des produits digitaux que les gens utilisent.",
  ],
  projects: [
    "naonair    premier-pas    mon-retab",
    "evapp      kit-metiers    salto",
    "Tape un nom ou ouvre la section Projets pour explorer.",
  ],
  current_focus: [
    "Product Manager chez Lonestone, à Nantes — du cadrage jusqu'à la mise en production.",
  ],
  biggest_failure: [
    "Sous-estimer l'outillage de mise à jour de contenu sur une plateforme riche.",
    "Leçon : la maintenabilité se conçoit dès le jour 1, pas après le lancement.",
  ],
  future: ["Plus de produits à impact, plus d'honnêteté, moins de fonctionnalités gadgets."],
  help: [
    "Commandes disponibles :",
    "  coffee",
    "  sudo",
    "  cat secret.txt",
    "",
    "psst… certaines commandes ne sont pas listées ici 👀",
  ],
  // --- commandes cachées (easter eggs) ---
  secret: [
    "🥚 Bien joué — tu as trouvé l'easter egg.",
    "Si tu cherches jusqu'ici, c'est qu'on est faits pour bosser ensemble.",
    "Tape 'sudo hire' pour la suite, ou 'matrix' pour le spectacle.",
  ],
  "sudo hire": [
    "[sudo] mot de passe pour recruteur : ********",
    "✅ Accès accordé. Valentin a été ajouté à ton équipe (enfin, presque).",
    "→ renard.valentin49@gmail.com",
  ],
  sudo: ["Nice try 😏 — précise : 'sudo hire'."],
  coffee: [
    "☕ Café lancé. Productivité +200%.",
    "C'est aussi comme ça que naissent les bons produits.",
  ],
  ls: ["about/   projets/   methode/   contact/   secret.txt"],
  "cat secret.txt": [
    "Le meilleur produit, c'est celui qu'on ose retirer.",
    "— note perso, 03:14 du matin",
  ],
  matrix: ["Wake up… 🟢", "Lancement de la pluie de code…"],
  "42": ["La réponse à la grande question sur la vie, l'univers et le reste."],
  exit: ["Tu ne peux pas vraiment partir. (Échap pour fermer)"],
};
