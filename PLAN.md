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

## Implementation control

The student has now authorized the complete course implementation, with a working
deadline of 28 September 2026 and human feedback required between five stages.
[Detailed goals and acceptance criteria](docs/planning/implementation-goals.md)
record every requested workflow requirement. [The living research record](docs/IMPLEMENTATION-RESEARCH.md)
will connect sources to decisions, comparisons and observed results.

Current stage: Gate 1 ready for human review. [Review record and preview links](docs/planning/gate-1-review.md).
Do not begin Gate 2 until the student reviews Gate 1.
Known pre-implementation state: four spec checks pass; the twelve-week coverage
check fails because only weeks 1 and 2 exist. The final evidence gate remains red
for starter content/images and the unfilled PROCESS.md.

The [dated course map](docs/planning/course-map.md) proposes the twelve questions
and assessment progression for review. A read-only evaluator probe reproduced a
false-positive deck-link regex case; fix it with valid/invalid fixtures before
accepting the representative unit. No application source was changed by that probe.

Gate 1 implementation lives only at `/review/a/` and `/review/b/`, sharing one
outline and original vector artwork. The existing main homepage/catalogue and
teaching collections have not been presented as complete. Local production
preview is running on port 4321. Both marking viewport sizes were inspected;
mobile orientation, fragment navigation and Escape-after-resize issues were fixed
and rechecked. Final check: type/build/link/accessibility passed, spec four pass /
one expected coverage failure, evidence gate still red for starter content and
PROCESS. Independent follow-up review returned no actionable issue. The student's
choice and feedback are pending; resume with Gate 2 after they respond.

## Design revision requested on 27 September

The student requested a more vivid, immersive design, research beyond course sites,
and suitable additional packages/APIs within the fixed course platform. The
[detailed goals](docs/planning/implementation-goals.md) now specify continuous
review/refinement, motion acceptance and the new authorization to commit and push
implementation checkpoints. The repository is currently private with push access;
visibility/publication remain unchanged.

Current work: Gate 1 revision. Research actual reference sites and build an
immersive candidate at `/review/c/`, preserving A/B for comparison. The student
has not selected a final direction. Deliver the revised working preview and
verification before the next human review. Do not bulk-author twelve weeks before
that review. The active work has resumed at the student's request; the app's Goal
status still reports paused and requires its user-side Resume control.
