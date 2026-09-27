# Assignment 2 course plan

## Course identity

- **Title:** After Aincrad: A History of the Full-Dive Age
- **Code:** SLOP1897
- **Audience:** First-year students interested in technology, history and virtual worlds.
- **Format:** A twelve-week seminar taught in English at Slop University, set in 2035.

No programming or prior knowledge of the whole SAO series is required. Selected
scenes and short background notes should make the material accessible.

## Central idea

Treat the selected SAO events as historical events within the course's fictional
setting. Follow their beginnings, development and consequences, asking:

> Why do people continue to enter, inhabit and protect virtual worlds after the
> SAO incident?

History provides the structure. Computing helps explain the technologies and
decisions that shaped events. Adventure, friendship, ordinary life and belonging
matter alongside conflict and institutional power.

The 2035 teaching date is our framing choice, not an addition to SAO canon.
Briefly identify the fictional premise in the course introduction, then maintain
a consistent historical voice.

## Material and source boundaries

Use the television mainline from Aincrad through *Alicization: War of Underworld*,
together with *Ordinal Scale*. Use the two *Progressive* films to revisit early
Aincrad, including different perspectives on the same period.

The television continuity is the main narrative reference. Label differences
between adaptations rather than silently merging them. Light novels can provide
attributed supplementary material. Game continuities and unreleased stories are
outside the initial scope.

Separate events supported by the chosen works, our historical interpretations,
and any teaching documents we create. Identify invented documents as teaching
reconstructions. Keep release dates distinct from dates within the story.

## Learning goals and progression

Students should be able to:

- Reconstruct an event timeline using identifiable sources.
- Compare accounts and explain how perspective affects interpretation.
- Explain connections between technology, institutions and people's choices.
- Make an evidence-based argument about life in virtual worlds.

Organize the semester in three phases:

| Weeks | Focus |
| --- | --- |
| 1–4 | The promise of Full-Dive, the SAO incident and the emergence of society inside Aincrad, including Progressive material. |
| 5–8 | Escape and its aftermath: ALO, Phantom Bullet and Mother's Rosario, with attention to continuing relationships and different reasons for returning. |
| 9–12 | Ordinal Scale, artificial life and the Underworld conflict, followed by a synthesis of the period's legacy. |

Each week needs a distinct question, a small set of selected material and a
discussion or source-analysis activity. Build connections across weeks rather
than giving every episode its own summary.

## Assessment direction

These are assessments for students taking the fictional course.

| Assessment | Weight | Purpose |
| --- | --- | --- |
| Source comparison | 20% | Compare two accounts of one event and distinguish evidence from interpretation. |
| Incident study | 30% | Explain a technological and social consequence using selected sources. |
| Digital history exhibition | 50% | Curate a small exhibition answering the central question through an evidence-based argument. |

The exhibition may use slides or a simple webpage, so programming skill is not a
prerequisite. Develop detailed briefs, criteria and due dates with the weekly
content.

## Website direction and next step

Use the character of a university course site with an archival feel, retaining
Slop University's fixed identity. Keep weeks, assessments and sources easy to
find. A simple event timeline will connect the material; distinguish it from the
course's teaching timetable.

Start implementation with the site structure and one representative week linked
to a real deck. Use that sample to establish the voice and level of detail before
expanding the remaining weeks. Exact readings, teaching dates, page layouts and
interaction details can be settled during implementation.

The published [A2 brief](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/assessments/assignment-2/)
and the repository README remain the assignment and platform requirements.
Earlier setup and verification notes are preserved in
[the setup handoff](docs/planning/setup-handoff.md).

## Implementation control and current handoff

Follow [the detailed goals and five gates](docs/planning/implementation-goals.md),
[the living research](docs/IMPLEMENTATION-RESEARCH.md), and
[the process evidence](docs/PROCESS-EVIDENCE.md). The student accepted revised C's
broad direction and requested continued implementation, commits and pushes.
Current stage: **Gate 2 verified; awaiting human review**.

The actual homepage now carries the accepted immersive direction and links to a
complete Week 2 path: seminar, source packet, worked lecture, ten-slide deck and
20% Source comparison brief. The other assessments are clearly marked 30%/50%
draft outlines. Untouched Week 1 content/deck is unpublished with markers retained.
Course metadata is SLOP1897, first year, Semester 1 2035, 19 February–11 May.

The parent verified A/B/C source claims, reviewed the whole slice and checked the
actual browser. Independent reviews prompted a stronger source fallback and a
concrete SAO explanation, corrected sticky/current-page navigation, and validated
the parsed-anchor test repair. A/B reading pages render the same content; B is the
parent recommendation for its direct section navigation. All ten slides fit the
marking sizes; phone body text is 18px. See the [Gate 2 record](docs/planning/gate-2-review.md)
for actual checks, additional sizes, refinements and qualified limits.

Check state: type/build/21-page accessibility/internal links pass; spec 35 pass,
one expected failure because only Week 2 is a complete published seminar. The
evidence gate still flags starter Week 1, people/policies, images and PROCESS.md.
The original deck-link false positive is resolved. The full dependency audit is
clear after compatible dev-tool patches; fixed platform versions remain Astro
7.2.8 and Astromotion 0.23.0. Do not apply a wholesale upstream upgrade.

Checkpoints: oracle `785b1ce`; teaching implementation/harness `4fc9cde`;
development-tool patches `2752781`. Review documentation is committed with the
handoff. Verify the remote commit after the authorized private push.

Next: obtain the student's review of teaching depth/voice, reading layout and
mobile slides. After approval, use this pattern to complete the other eleven
weeks, their dates and distinct activities, the remaining briefs, people/policies
and source/media work. Do not clone the same question or activity twelve times.
PROCESS.md remains the student's account, supported by the real evidence bank.

The whole-assignment Goal was verified active during this stage and pauses at the
requested human-review gate. The full assignment is unfinished. Working deadline
remains 28 September 2026; exact cutoff unspecified.

## Authorized external actions

The student explicitly authorized ordinary commits and pushes during implementation.
Inspect outgoing changes and verify the remote checkpoint. Repo is private; retain
visibility. This preview stays private. Public Pages publication, visibility changes
and the course ship workflow remain separately authorized release tasks.
