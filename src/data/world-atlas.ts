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
    technology: "The opening synopsis introduces NerveGear and Full-Dive, then describes Kayaba's announcement that players cannot leave until the game is cleared. Control of the interface becomes control of the exit.",
    everyday: "Episode 8 follows rare food, a shop, cooking skill, and an invitation to share a meal. Survival also contains work, exchange, hospitality, and friendship.",
    power: "Who gets to set the conditions of life when the people inside cannot simply leave?",
    sources: [
      { label: "Aincrad · episode 1", href: "https://www.swordart-onlineusa.com/aincrad/story/", purpose: "Official episode synopsis · entry and confinement" },
      { label: "Aincrad · episode 8", href: "https://www.swordart-onlineusa.com/aincrad/story/?no=08", purpose: "Official episode synopsis · cooking and exchange" },
    ],
    weeks: [1, 2, 3, 4], next: "alo", connection: "Does a new world offer a fresh start when data and relationships travel with its players?", x: 145, y: 190,
  },
  {
    id: "alo", name: "Alfheim Online", shortName: "ALO", number: "02",
    mode: "Return · relationships · care",
    title: "Returning is never only starting over.",
    invitation: "Follow the ties that make another virtual world worth entering, and the barriers that remain.",
    technology: "The Fairy Dance synopsis says Kirito's new ALO character retains his SAO data. It reports that continuity without explaining the transfer mechanism.",
    everyday: "The later Mother's Rosario synopsis follows Yuuki's wish to attend school while living in hospital. Her medical Full-Dive experience brings participation and care into the course's study of return.",
    power: "Which barriers can virtual presence change, and whose help or permission does participation still require?",
    sources: [
      { label: "Fairy Dance · episode 16", href: "https://www.swordart-onlineusa.com/fairy_dance/story/?no=16", purpose: "Official episode synopsis · returning with retained data" },
      { label: "Mother's Rosario · episode 23", href: "https://www.swordart-onlineusa.com/mothers_rosario/story/?no=23", purpose: "Official episode synopsis · medical Full-Dive and a school visit" },
    ],
    weeks: [5, 7, 8], next: "ggo", connection: "When someone returns after a crisis, what must they trust, and who helps them act?", x: 380, y: 325,
  },
  {
    id: "ggo", name: "Gun Gale Online", shortName: "GGO", number: "03",
    mode: "Investigation · trust · protection",
    title: "Entering to investigate. Staying to protect.",
    invitation: "Trace how an unfamiliar game becomes a place of cooperation under uncertain threat.",
    technology: "The introduction describes GGO as a VRMMO and Kirito's entry as an investigation. Reports connect in-game attacks with real-world deaths; the introduction presents the connection as a question to investigate.",
    everyday: "Sinon helps Kirito navigate the unfamiliar world. Episode 9 then describes the two joining forces to prevent further casualties: protection depends on a relationship as well as individual skill.",
    power: "How should people act when a threat is serious but their explanation of it is incomplete?",
    sources: [
      { label: "Phantom Bullet · introduction", href: "https://www.swordart-onlineusa.com/phantom_bullet/intro/", purpose: "Official story introduction · an investigation begins" },
      { label: "Phantom Bullet · episode 9", href: "https://www.swordart-onlineusa.com/phantom_bullet/story/?no=09", purpose: "Official episode synopsis · cooperation and protection" },
    ],
    weeks: [6], next: "augma", connection: "What changes when the interface moves from an enclosed virtual world into everyday places?", x: 605, y: 180,
  },
  {
    id: "augma", name: "Augma / Ordinal Scale", shortName: "Augma", number: "04",
    mode: "Augmented reality · place · rank",
    title: "The game comes into the street.",
    invitation: "Consider a different way to enter: remaining awake while a device adds a game to familiar places.",
    technology: "The film's story guide describes Augma as an augmented-reality device without a Full-Dive function. It supplies sensations while users remain awake.",
    everyday: "Ordinal Scale places collectible items in real-world locations. Its ranking system gives higher-ranked players substantial advantages, connecting movement through everyday space with competitive status.",
    power: "How does a ranking system shape who can participate, compete, and be noticed in a shared place?",
    sources: [
      { label: "Ordinal Scale · story and device guide", href: "https://sao-movie.net/us/story/story.html", purpose: "Official film publicity · Augma, locations, and ranking" },
    ],
    weeks: [9], next: "underworld", connection: "If systems can rank a participant, who gets to decide what counts as a participant at all?", x: 840, y: 325,
  },
  {
    id: "underworld", name: "Underworld", shortName: "Underworld", number: "05",
    mode: "Artificial lives · institutions · recognition",
    title: "Whose world is it to defend?",
    invitation: "Shift the question from the visitor's experience to the lives of those for whom this is home.",
    technology: "The introduction places Underworld's artificial intelligence at stake in a conflict involving inhabitants and outside players. Some outside participants enter through named deity super-accounts.",
    everyday: "The introduction describes people joining the fight to preserve Underworld. Episode 22 later presents Alice publicly as an artificial general intelligence, opening a question about recognition beyond the world.",
    power: "Who can speak for a world's inhabitants, and what would it mean to recognise their lives on their own terms?",
    sources: [
      { label: "War of Underworld · introduction", href: "https://sao-alicization.com/intro/", purpose: "Official story introduction · residents, outsiders, and conflict" },
      { label: "War of Underworld · episode 22", href: "https://sao-alicization.com/story/?id=ep22", purpose: "Official episode synopsis · Alice's public introduction" },
    ],
    weeks: [10, 11, 12], next: "aincrad", connection: "Return to Aincrad: how has your understanding of inhabiting and protecting a world changed?", x: 1065, y: 190,
  },
];
