import { courseMeta } from "../course-config";

// Course interpretation and topic progression; shared catalogue facts live in courseMeta.
export const courseOutline = {
  learningOutcomes: [
    "Reconstruct an event sequence from identifiable sources.",
    "Compare accounts and explain how perspective shapes a history.",
    "Connect technical choices with institutions and everyday life.",
    "Curate a supported argument about entering, inhabiting and protecting virtual worlds.",
  ],
  title: courseMeta.title,
  shortTitle: "After Aincrad",
  subtitle: "A History of the Full-Dive Age",
  year: String(courseMeta.year),
  description: courseMeta.description,
  hook: "Why would anyone log in again?",
  question:
    "Why do people keep entering, inhabiting and protecting virtual worlds after the SAO incident?",
  premise:
    "An English history seminar in a fictional 2035, treating Sword Art Online as a history of technology and society. No knowledge of the series or programming is required.",
  invitation:
    "Follow the people who build a life inside a virtual world: the friendships they form, the institutions they create and the places they choose to call home.",
  access:
    "Selected scenes and short background notes introduce each period. Bring a question about the people who lived through it.",
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
    description: "Bodies, artificial life and the histories we preserve.",
  },
] as const;

export const courseWeeks = [
  { number: 1, act: "beginnings", title: "The promise of Full-Dive", question: "What did Full-Dive promise its first users?", material: "Full-Dive and its promise" },
  { number: 2, act: "beginnings", title: "The SAO incident", question: "How do we reconstruct a crisis from partial accounts?", material: "Aincrad · the incident" },
  { number: 3, act: "beginnings", title: "Life inside Aincrad", question: "How does a place of confinement become a society?", material: "Aincrad · work, friendship and ordinary life" },
  { number: 4, act: "beginnings", title: "Who gets to tell Aincrad?", question: "What changes when a familiar event has another witness?", material: "The two Progressive films · early Aincrad revisited" },
  { number: 5, act: "returns", title: "Escape and its aftermath", question: "What remains unresolved when people leave a virtual world?", material: "ALO · beyond Aincrad" },
  { number: 6, act: "returns", title: "Phantom Bullet and a reported threat", question: "How does a past crisis shape trust in a new world?", material: "Phantom Bullet" },
  { number: 7, act: "returns", title: "Care and participation", question: "Whose possibilities change when presence can be virtual?", material: "Mother’s Rosario" },
  { number: 8, act: "returns", title: "Why return?", question: "What turns a virtual place into somewhere to belong?", material: "Synthesis · relationships across worlds" },
  { number: 9, act: "legacies", title: "Ordinal Scale and the moving body", question: "What changes when a virtual game follows its players into physical places?", material: "Ordinal Scale · AR, place and rank" },
  { number: 10, act: "legacies", title: "Recognising artificial life", question: "What counts as a life in the historical record?", material: "Alicization · artificial lives" },
  { number: 11, act: "legacies", title: "Who gets to protect Underworld", question: "How do institutions and individual choices shape a conflict?", material: "War of Underworld" },
  { number: 12, act: "legacies", title: "A history worth sharing", question: "Which stories should an exhibition preserve, and why?", material: "Historical exhibition · the period’s legacy" },
] as const;

export const courseAssessments = [
  { number: "01", title: "Source comparison", weight: 20, description: "Compare two accounts of one event. Explain how perspective shapes what each account can tell us." },
  { number: "02", title: "Incident study", weight: 30, description: "Build an evidence-based explanation of a technological and social consequence using selected sources." },
  { number: "03", title: "Digital history exhibition", weight: 50, description: "Curate a small exhibition that answers the course question. Use slides, a document or a simple webpage; coding is optional." },
] as const;

export const courseSources = [
  { title: "Sword Art Online", detail: "Official series guide · core television material", href: "https://www.swordart-online.net/" },
  { title: "Progressive", detail: "Official story and character guide · revisiting early Aincrad", href: "https://sao-p.net/aria/story-character/" },
  { title: "Ordinal Scale", detail: "Official film story guide · augmented reality", href: "https://sao-movie.net/us/story/story.html" },
  { title: "Alicization", detail: "Official introduction · the Underworld period", href: "https://sao-alicization.com/intro/" },
] as const;
