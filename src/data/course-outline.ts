// Gate 1 course-outline preview. The catalogue record remains in course-config.ts.
export const courseOutline = {
  title: "After Aincrad: A History of the Full-Dive Age",
  shortTitle: "After Aincrad",
  subtitle: "A History of the Full-Dive Age",
  year: "2035",
  description:
    "A twelve-week, first-year history seminar about technology, everyday life and belonging in the virtual worlds of Sword Art Online.",
  hook: "The crisis ended. The worlds did not.",
  question:
    "Why do people keep entering, inhabiting and protecting virtual worlds after the SAO incident?",
  premise:
    "Set in a fictional 2035, this first-year seminar studies the events of Sword Art Online as a history of technology and society.",
  invitation:
    "Follow the people who build a life inside a virtual world: the friendships they form, the institutions they create and the places they choose to call home.",
  access:
    "Taught in English. No prior knowledge of Sword Art Online or programming is required; selected scenes and short background notes introduce each period.",
  method:
    "Read scenes as sources, compare perspectives and build an argument. We ask what an account shows, what it leaves out and whose experience it preserves.",
  sourceBoundary:
    "The mainline television series and Ordinal Scale form our core material. The two Progressive films revisit early Aincrad from other perspectives; they are not chronological sequels. We distinguish events in the works from our historical interpretations.",
} as const;

export const courseActs = [
  {
    id: "beginnings",
    number: "I",
    range: "01–04",
    title: "Entering a world",
    description: "Promise, crisis and the making of everyday society.",
  },
  {
    id: "returns",
    number: "II",
    range: "05–08",
    title: "Reasons to return",
    description: "After escape: relationships, access, care and belonging.",
  },
  {
    id: "legacies",
    number: "III",
    range: "09–12",
    title: "Lives and legacies",
    description: "Memory, artificial life and the histories we preserve.",
  },
] as const;

export const courseWeeks = [
  { number: 1, act: "beginnings", title: "The promise of Full-Dive", question: "What makes an imagined technology worth entering?", material: "Full-Dive and its promise" },
  { number: 2, act: "beginnings", title: "The SAO incident", question: "How do we reconstruct a crisis from partial accounts?", material: "Aincrad · the incident" },
  { number: 3, act: "beginnings", title: "Everyday life in Aincrad", question: "How does a place of confinement become a society?", material: "Aincrad · work, friendship and ordinary life" },
  { number: 4, act: "beginnings", title: "Another view of the beginning", question: "What changes when a familiar event has another witness?", material: "The two Progressive films · early Aincrad revisited" },
  { number: 5, act: "returns", title: "Escape and its aftermath", question: "What remains unresolved when people leave a virtual world?", material: "ALO · beyond Aincrad" },
  { number: 6, act: "returns", title: "Trust after the incident", question: "How does a past crisis shape trust in a new world?", material: "Phantom Bullet" },
  { number: 7, act: "returns", title: "Access, care and connection", question: "Whose possibilities change when presence can be virtual?", material: "Mother’s Rosario" },
  { number: 8, act: "returns", title: "Choosing to return", question: "What turns a virtual place into somewhere to belong?", material: "Synthesis · relationships across worlds" },
  { number: 9, act: "legacies", title: "Memory beyond the headset", question: "How does augmented reality change the stakes of memory?", material: "Ordinal Scale · AR and memory" },
  { number: 10, act: "legacies", title: "Taking artificial lives seriously", question: "What counts as a life in the historical record?", material: "Alicization · artificial lives" },
  { number: 11, act: "legacies", title: "The Underworld conflict", question: "How do institutions and individual choices shape a conflict?", material: "War of Underworld" },
  { number: 12, act: "legacies", title: "What the Full-Dive age leaves us", question: "Which stories should an exhibition preserve, and why?", material: "Historical exhibition · the period’s legacy" },
] as const;

export const courseAssessments = [
  { number: "01", title: "Source comparison", weight: 20, description: "Compare two accounts of one event. Explain how perspective shapes what each account can tell us." },
  { number: "02", title: "Incident study", weight: 30, description: "Build an evidence-based explanation of a technological and social consequence using selected sources." },
  { number: "03", title: "Digital history exhibition", weight: 50, description: "Curate a small exhibition that answers the course question. Use slides or a simple webpage; coding is optional." },
] as const;

export const courseSources = [
  { title: "Sword Art Online", detail: "Official series guide · core television material", href: "https://www.swordart-online.net/" },
  { title: "Progressive", detail: "Official story and character guide · revisiting early Aincrad", href: "https://sao-p.net/aria/story-character/" },
  { title: "Ordinal Scale", detail: "Official film story guide · augmented reality and memory", href: "https://sao-movie.net/us/story/story.html" },
  { title: "Alicization", detail: "Official introduction · the Underworld period", href: "https://sao-alicization.com/intro/" },
] as const;
