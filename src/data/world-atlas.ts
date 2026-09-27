export interface AtlasWorld {
  id: string;
  name: string;
  shortName: string;
  number: string;
  mode: string;
  title: string;
  invitation: string;
  technology: string;
  everyday: string;
  power: string;
  sources: { label: string; href: string; purpose: string }[];
  weeks: number[];
  next: string;
  connection: string;
  x: number;
  y: number;
}

/** Course connections, not geographical positions or a chronology. */
export const atlasWorlds: AtlasWorld[] = [
  {
    id: "aincrad", name: "Aincrad", shortName: "Aincrad", number: "01",
    mode: "Full-Dive · confinement",
    title: "A world to escape. A place to live.",
    invitation: "Start with the gap between entering a game and having to make a life inside it.",
    technology: "NerveGear lets a person enter a virtual world through Full-Dive. When SAO opens, its creator Akihiko Kayaba announces that players cannot leave until the game is cleared. Control of the interface becomes control of the exit.",
    everyday: "Inside Aincrad, a rare ingredient brings Kirito to a shop and then to a meal with Asuna, whose cooking skills he needs. People build a daily life through work, exchange, hospitality and friendship.",
    power: "Who gets to set the conditions of life when the people inside cannot simply leave?",
    sources: [
      { label: "Launch conditions · account A", href: "/sources/aincrad/#a1", purpose: "Course case file · accounts and questions" },
      { label: "Craft and a shared meal · week 3", href: "/sources/beginnings/#week-3-craft-and-meals", purpose: "Course case file · accounts and questions" },
    ],
    weeks: [1, 2, 3, 4], next: "alo", connection: "Does a new world offer a fresh start when data and relationships travel with its players?", x: 145, y: 190,
  },
  {
    id: "alo", name: "Alfheim Online", shortName: "ALO", number: "02",
    mode: "Return · relationships · care",
    title: "Returning is never only starting over.",
    invitation: "Follow the ties that make another virtual world worth entering, and the barriers that remain.",
    technology: "Kirito enters ALfheim Online, usually called ALO, while searching for Asuna. His new avatar retains data from SAO: entering another world does not erase everything carried from the first.",
    everyday: "Yuuki, a young player living in hospital, wants to attend school with Asuna. A medical Full-Dive system and the work of friends connect her with activities beyond the hospital room.",
    power: "Which barriers can virtual presence change, and whose help or permission does participation still require?",
    sources: [
      { label: "Unfinished recovery · week 5", href: "/sources/returns/#week-5-what-escape-leaves-unfinished", purpose: "Course case file · accounts and questions" },
      { label: "Participation and care · week 7", href: "/sources/returns/#week-7-a-world-worth-participating-in", purpose: "Course case file · accounts and questions" },
    ],
    weeks: [5, 7, 8], next: "ggo", connection: "When someone returns after a crisis, what must they trust, and who helps them act?", x: 380, y: 325,
  },
  {
    id: "ggo", name: "Gun Gale Online", shortName: "GGO", number: "03",
    mode: "Investigation · trust · protection",
    title: "Entering to investigate. Staying to protect.",
    invitation: "Trace how an unfamiliar game becomes a place of cooperation under uncertain threat.",
    technology: "Gun Gale Online is a shared virtual combat game. Kirito enters to investigate reports connecting attacks by a player called Death Gun with deaths outside the game. A reported connection is the starting question, not yet an explanation.",
    everyday: "Sinon, an experienced GGO player, helps Kirito find his way. They later work together to prevent further casualties. Their cooperation makes protection a shared task.",
    power: "How should people act when a threat is serious but their explanation of it is incomplete?",
    sources: [
      { label: "A reported threat · week 6", href: "/sources/returns/#week-6-a-threat-under-investigation", purpose: "Course case file · accounts and questions" },
      { label: "Investigation and cooperation · week 6", href: "/sources/returns/#week-6-a-threat-under-investigation", purpose: "Course case file · accounts and questions" },
    ],
    weeks: [6], next: "augma", connection: "What changes when the interface moves from an enclosed virtual world into everyday places?", x: 605, y: 180,
  },
  {
    id: "augma", name: "Augma / Ordinal Scale", shortName: "Augma", number: "04",
    mode: "Augmented reality · place · rank",
    title: "The game comes into the street.",
    invitation: "Consider a different way to enter: remaining awake while a device adds a game to familiar places.",
    technology: "Augma is an augmented-reality device: it adds a game to physical surroundings while its users remain awake. Unlike NerveGear, it does not require Full-Dive.",
    everyday: "Ordinal Scale places collectible items in real-world locations. Its ranking system gives higher-ranked players substantial advantages, connecting movement through everyday space with competitive status.",
    power: "How does a ranking system shape who can participate, compete, and be noticed in a shared place?",
    sources: [
      { label: "Augma, locations and ranking · week 9", href: "/sources/ordinal-scale/", purpose: "Course case file · accounts and questions" },
    ],
    weeks: [9], next: "underworld", connection: "If systems can rank a participant, who gets to decide what counts as a participant at all?", x: 840, y: 325,
  },
  {
    id: "underworld", name: "Underworld", shortName: "Underworld", number: "05",
    mode: "Artificial lives · institutions · recognition",
    title: "Whose world is it to defend?",
    invitation: "Shift the question from the visitor's experience to the lives of those for whom this is home.",
    technology: "Underworld is a virtual environment inhabited by artificial intelligences. Its residents and outside players are drawn into a conflict over its future. Some visitors enter through powerful deity accounts.",
    everyday: "People from other worlds join the fight to preserve Underworld. Later, its inhabitant Alice is introduced publicly as an artificial general intelligence and answers reporters' questions. Recognition becomes a question beyond her home.",
    power: "Who can speak for a world's inhabitants, and what would it mean to recognise their lives on their own terms?",
    sources: [
      { label: "Residents, visitors and conflict · weeks 10–11", href: "/sources/underworld/", purpose: "Course case file · accounts and questions" },
      { label: "Alice and public recognition · week 10", href: "/sources/underworld/", purpose: "Course case file · accounts and questions" },
    ],
    weeks: [10, 11, 12], next: "aincrad", connection: "Return to Aincrad: how has your understanding of inhabiting and protecting a world changed?", x: 1065, y: 190,
  },
];
