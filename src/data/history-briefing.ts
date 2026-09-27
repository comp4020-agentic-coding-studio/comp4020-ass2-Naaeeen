// Source mapping and the educational premise are documented at /sources/credits/.
// These descriptions are written for the course's retrospective 2035 viewpoint.
export const historyBriefing = {
  introduction:
    'In November 2022, people entered the online game Sword Art Online (SAO) and found they could not log out. Its creator warned that death inside meant death outside. From our 2035 classroom, we follow how people lived through the crisis, and why they later built lives in virtual worlds again.',
  events: [
    {
      id: 'entering-sao',
      label: '6 November 2022',
      title: 'Entering Sword Art Online',
      description:
        'Sword Art Online, or SAO, was an online role-playing game. The NerveGear device enabled Full-Dive: immersive access to a virtual world. SAO took place in Aincrad, a floating castle divided into 100 floors.',
    },
    {
      id: 'trapped-in-aincrad',
      label: '2022–2024',
      title: 'A game its players could not leave',
      description:
        'After launch, players lost the ability to log out. Developer Akihiko Kayaba announced that escape required clearing the game and that death inside it meant death outside it. For roughly two years, players faced the problem of surviving and acting together inside Aincrad.',
    },
    {
      id: 'return-and-recovery',
      label: 'After Aincrad',
      title: 'Escape left recovery unfinished',
      description:
        'The player Kirito returned after fighting Kayaba, who had used the name Heathcliff. Other survivors returned too, but 300 players, including Asuna, remained unconscious. Kirito entered another online world, Alfheim Online or ALO, after seeing evidence that Asuna might be there.',
    },
    {
      id: 'reasons-to-return',
      label: 'The later Full-Dive age',
      title: 'New reasons to enter and protect worlds',
      description:
        'Later cases bring different purposes into view: investigating harm, sharing everyday activities and helping someone participate beyond a hospital room. In 2026, Augma also brought game information into physical surroundings through augmented reality. Underworld raised another question: what did visitors owe to artificial inhabitants such as Eugeo and Alice?',
    },
  ],
  glossary: [
    { term: 'Full-Dive', definition: 'Immersive access through a device to a virtual world.' },
    { term: 'NerveGear', definition: 'The device used to enter SAO through Full-Dive.' },
    { term: 'SAO', definition: 'Sword Art Online, the game at the centre of the opening crisis.' },
    { term: 'Aincrad', definition: 'The many-level floating castle that formed SAO’s setting.' },
    { term: 'Augmented reality (AR)', definition: 'Digital information or game activity alongside physical surroundings; Augma users remained awake.' },
  ],
} as const;
