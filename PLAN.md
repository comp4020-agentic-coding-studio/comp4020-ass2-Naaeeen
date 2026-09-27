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

Follow [the detailed goals and five review gates](docs/planning/implementation-goals.md),
[the research record](docs/IMPLEMENTATION-RESEARCH.md), and the curated
[process evidence](docs/PROCESS-EVIDENCE.md). Working deadline: 28 September 2026,
exact cutoff unspecified. The Goal is active; the full assignment is unfinished.

Current stage: **Gate 1 revision after human feedback**. Do not begin Gate 2 until
the student accepts the revised direction. A/B/C share the proposed course outline
under `/review/`; the main catalogue and teaching collections remain starter content.
The [dated course map](docs/planning/course-map.md) proposes twelve distinct questions
and 20/30/50 assessment progression for the accepted direction.

The student reviewed C and found Aincrad insufficiently realistic or faithful to
the original and the motion insufficient. They invited existing models/images
as assets or references. Parent inspected the official SAOA exterior and the CC BY
mhil fan model: a continuous densely layered tapered fortress with lower supports
and radial bridges, unlike our separated terraces. The model download requires
login and its viewer reports a device-weight limit; use it as reference, not an
imported asset. Rebuild the local scene and coordinate clouds, camera movement
and chapter transitions while keeping readable HTML, native scrolling and motion
controls. See E11 for the new visual-reference harness rule and actual feedback.

Prior C baseline: original scene/page `99b0491`, runtime/readability refinements
`03159e6`, documentation `93bd572`. All pushed. The earlier
[motion review](docs/planning/gate-1-motion-review.md) records actual results and
limits; it does not automatically validate this new revision. Preview is served
at `http://127.0.0.1:4321/comp4020-ass2-Naaeeen/review/c/`.

Known acceptance state: type/build/19-page accessibility/internal links pass;
four spec checks pass and twelve-week coverage fails because collections contain
only weeks 1 and 2. Evidence remains red for starter material/images and unfilled
PROCESS.md. E04's reproduced false-positive lecture-link regex is still to be
corrected before accepting Gate 2's real deck. Native BFCache, GPU frame-rate
profiling and forced context loss were not browser-verified in the earlier pass.

Next: integrate the bounded scene/UI changes, inspect both marking viewports and
reference fidelity, reconcile independent review, record actual results, commit
and push the reviewed checkpoint, then present revised C for human review.
After approval, build the representative week/source comparison with a real deck
and correct the test oracle before scaling to twelve weeks.

## Authorized external actions

The student explicitly authorized ordinary commits and pushes during implementation.
Inspect outgoing changes and verify the remote checkpoint. Repo is private; retain
visibility. This preview stays private. Public Pages publication, visibility changes
and the course ship workflow remain separately authorized release tasks.
