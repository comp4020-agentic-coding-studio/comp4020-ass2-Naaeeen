# Implementation goals and human review gates

Status: Gate 2 was accepted for progression. Gate 3 is in progress: complete twelve concise weekly guides, remaining course information and an interactive atlas. The complete assignment remains unfinished. Deadline supplied by the student: **tomorrow**, relative
to 27 September 2026 (28 September, Australia/Sydney); exact cutoff time has not
been supplied. The public course deadline is different. This plan records the
student's working deadline without claiming that an extension has been verified.

## Outcome

Build **After Aincrad: A History of the Full-Dive Age**, SLOP1897, as a complete
English course at Slop University. Follow the course identity and source boundary
in [PLAN.md](../../PLAN.md). Produce twelve distinct, dated teaching weeks with
usable preparation, activities and outcomes; coherent assessments; real lectures
and slides; a source guide; and a responsive site that a student can navigate.
The intended standard is the published HD descriptors, not a promised grade.

The active Codex Goal tracks the whole assignment. This document makes that goal
operational. PLAN.md is the current handoff, the research record explains decisions,
and CLAUDE.md contains compact standing instructions. None replaces PROCESS.md,
which must reflect the student's actual decisions and participation.

## Keeping this goal current

Follow this document throughout implementation. At the start of a resumed work
block, before a human review gate, and whenever new evidence changes scope or the
approach, compare actual work with these requirements. Update the relevant goal,
acceptance criteria and PLAN.md handoff; record the reason and evidence in the
living research record. Keep completed findings and genuine feedback traceable.
Refine the plan when needed without quietly dropping earlier requirements or
turning an unfinished stage into a completed one.

At each gate's start, after a scope change, and before its delivery, use
[the requirements audit](requirements-audit.md) to revisit the live brief/spec,
upstream README/revision and the relevant local files. Explicitly separate course
requirements, project choices and the student's process requirements. Update the
record when a check changes the plan; do not silently promote an optional feature
into a required workload.

The student accepted revised C's broad direction: “这个大致方向不错”, and asked to
continue implementation, commits and pushes under these process requirements.
Gate 1 is accepted for progression; Gate 2 now develops a complete teaching slice.
Later design refinement remains possible. Preserve the real feedback and comparison
evidence; do not treat this as approval to skip the remaining human gates.

## Evidence for the later process account

Maintain [docs/PROCESS-EVIDENCE.md](../PROCESS-EVIDENCE.md) as a curated English
record of distinctive or consequential problems, reviews, refinements and decisions.
Add an entry when the evidence is fresh, then update its status after verification
and commit/push. Record what happened rather than reconstructing an impressive
story at the end. Link detailed research and test records instead of duplicating
all routine output.

For each worthwhile entry include the trigger, observable evidence, alternatives
considered, decision and reason, changed files, any exact CLAUDE.md rule change and
why it belongs there, checks actually run, remaining limits, commit links and real
human feedback. Distinguish an agent's suggestion from a parent-verified finding,
and a code-level fix from a browser-verified result. Preserve corrections when a
review or test oracle was wrong. Mark unresolved items explicitly.

This file is an evidence bank for the student's later PROCESS.md, not a substitute
for their personal judgement or a prewritten first-person account. Select the
entries that explain what this particular course should be and how that shaped
the harness; do not turn the final account into a list of unrelated bug fixes.

## Motion, interaction and additional tools

Research excellent websites beyond education: product narratives, interactive
exhibitions, creative portfolios, visual journalism and other strong examples.
Inspect real interactions and, where available, their authors' explanations or
source. Identify a specific transferable technique and explain its purpose in
this course. Study their approaches rather than copying branded assets or adding
effects solely because a famous site uses them.

Additional browser APIs, npm packages, components and external APIs are allowed
when compatible with the course's fixed platform. Verify that compatibility from
the live brief, upstream template and installed dependencies before adoption.
Retain Slop identity/palette, Astro integration, collection keys and generated API.
Choose tools by the desired experience, not only by what happens to be installed.
Document why a dependency helps, its current version/licence, runtime/build cost
and actual outcome. Ordinary suitable project dependencies are authorized; a paid
service, new account, credential change or unrelated integration needs separate
scoped authorization. Never put a secret in the client bundle.

Aim for an expressive historical exhibition: a memorable scene, meaningful depth,
well-timed transitions and responsive feedback that invite exploration. Animation
should connect an event, source or course section with its meaning. Keep course
orientation, preparation, assessment and navigation easy to read and reach.

Gate 1 compared static directions with a procedural 3D scene and chapter
explorer, including a matching static alternative. The student accepted revised C's
broad direction. Carry that motion language into the course while verifying
orientation and reading in the browser; do not restart the completed comparison.

The student rejected the first C model's resemblance to Aincrad and found its
motion insufficient. Revision 2 used inspected official visual references and evaluated existing
fan models rather than inventing an unrelated floating castle. Preserve the previous screenshots as comparison
evidence. Compare the continuous tapered body, dense floor bands, underside,
radial bridges, materials and apparent scale with the original anime reference.
Use a readable matching fallback. The student also explicitly asked for more
2D/3D animation and greater amplitude: make normal-mode cloud travel, camera
movement and chapter graphics clearly noticeable, rather than only tiny fades
and shifts. Add a chapter-linked 2D illustration and a developing reading
timeline. Keep text and control hit areas stable, with the motion controls below.

The student permits suitable existing models and images for this private working
preview. Record their creator, source, licence and actual use or reference status.
Do not change repository visibility or publish the site during this revision.
The final assignment's public Pages requirement remains a separate release task.

Motion acceptance criteria:

- Content and navigation appear without waiting for an intro, remote API or canvas.
- Normal scrolling, keyboard navigation and touch reading remain usable.
- Respect reduced motion, including preference changes while the page is open;
  provide a clear pause/stop control for continuous nonessential movement.
- A failed or unavailable enhancement leaves useful HTML and artwork in place.
- Suspend scene work offscreen and in hidden tabs; inspect resize behavior and
  actual download/runtime cost on desktop and mobile before scaling the pattern.
- Verify the animation, selection state, focus and static alternative at both
  marking sizes, with independent review and actual human feedback.

These criteria supplement the five gates below. Gate 2 establishes how the chosen
motion language supports a real teaching unit; Gate 4 audits it across the whole
site. Keep the deadline focused on a complete, coherent course while pursuing a
noticeably stronger visual experience.

## Commit and push authorization

On 27 September the student explicitly requested commits and pushes during
implementation. Make coherent local commits and push reviewed checkpoints to the
existing origin/main, preserving ordinary fast-forward history. Inspect the
outgoing diff/history for secrets and unintended files, run relevant checks and
report actual remaining failures. Intermediate incomplete-course requirements may
remain red as already documented; new regressions must be resolved. Verify the
remote commit after each push. Keep repository visibility unchanged. Publishing,
changing Pages settings and invoking the course ship workflow remain separate
from this authorization. If an existing public branch would auto-deploy, account
for that effect before pushing; the repo was verified private at this revision.

## Requirements from the student

| Request | How we will carry it out | Evidence to retain |
| --- | --- | --- |
| Research before consequential decisions and when problems arise | Consult relevant COMP4020 material, current primary documentation, credible practitioner accounts and research; reuse still-valid findings | English research register with question, source, finding, decision and limitation |
| Go beyond classroom recipes | Evaluate alternatives on this project; audit evaluators; connect source evidence, implementation and observed outcomes | Paired comparisons, rejected alternatives and reproducible checks, rather than claims of a universally best method |
| Work section by section | Build one coherent slice, review it, then extend the verified pattern | Focused diffs and local commits at meaningful boundaries |
| Multiple reviews and refinements | Parent inspection plus independent bounded review; correct supported findings and verify the affected behavior | Finding, change and actual result |
| A/B tests | Compare alternatives against a declared question and shared criteria; distinguish design comparisons from controlled agent experiments | Both candidates, fixed criteria, observations and decision; never invented participants or statistical claims |
| Inspect the actual website | Use browser navigation, keyboard, resizing, console and visual checks at the marking viewports | Recorded browser observations, screenshots where useful and unresolved limits |
| Maintain CLAUDE.md thoughtfully | Add the smallest reusable rule supported by observed failure or a current explicit requirement; check for conflicts and remove superseded wording | Before/after diff and reason, linked to evidence |
| Use tools and agents critically | Delegate independent research/review with bounded ownership, then verify claims against sources, files and actual output | Sources checked by the parent, reconciled review findings |
| Natural English; no defensive writing | Prefer specific questions, concrete activity verbs and evidence; remove filler, repeated disclaimers and empty prestige claims | Editorial comparison and human judgement, not an AI detector score |
| Rich media where useful | Use original/reusable media or official permitted embeds, with provenance and meaningful alternatives | Media ledger, attribution and accessibility checks |
| Immersive design and suitable extra tools | Research notable sites and primary implementation docs; adopt justified APIs/packages within platform rules; compare the actual result | Source-to-design decisions, dependency changes, motion/fallback tests and human feedback |
| Preserve consequential process evidence | Keep a curated English problem/decision/refinement log, including justified CLAUDE.md changes | docs/PROCESS-EVIDENCE.md entries linked to actual checks, commits and human feedback |
| Keep goals current | Review this file at resumes, milestones and consequential new evidence; preserve existing commitments | Updated goals, reason for refinements and current handoff |
| Commit and push during implementation | Commit coherent verified checkpoints and push to the existing remote under the authorization above | Commit hashes, remote verification and honest check status |
| Human review at every node | Present the deliverable and a small number of specific decisions, then wait for feedback | User's actual response and resulting changes |

## Gate 1 — course structure and visual direction

Deliverables:

- Recheck the live brief, rubric and relevant lecture decks; map requirements to
  implementation and validation. Keep fixed branding, collection keys, build and
  API; preserve the assigned course-code suffix 897.
- Establish the English living research record, linked to existing harness
  research rather than rerunning all earlier experiments.
- Present a twelve-week topic progression and assessment alignment at outline
  depth. Keep adaptation boundaries and the 2035 teaching premise clear.
- Build two browser-viewable homepage treatments using the same course proposition
  and Slop identity. Compare orientation, readability, access to weeks/assessments,
  and the archival character. Recommend one with observed reasons.

Acceptance: the preview builds, affected links work, new pages have no new
accessibility failures, and both marking viewports have been inspected. Existing
incomplete-course checks may remain red, explicitly recorded as such.

**Human review:** course promise, tone, chronology balance, and homepage direction.
Stop here until feedback arrives. Do not expand all twelve weeks first.

## Gate 2 — complete representative teaching unit

After Gate 1 feedback, deliver one fully usable week, its lecture page and real
slide deck, a source-analysis activity, and a representative assessment brief.
Use one source-rich case to demonstrate the expected depth. Check source identity,
continuity, preparation burden and accessibility for a student new to SAO.

Acceptance: a student can follow homepage -> week -> preparation/activity ->
lecture/deck -> assessment without a broken link or unexplained dependency. Deck
text fits and is legible at both marking viewports; notes or an equivalent readable
page preserve access on a phone. Read-only independent review is reconciled.

**Human review:** level of detail, teaching voice, source selection, and whether the
course feels worth taking. Record the response before scaling the pattern.

## Gate 3 — complete curriculum and information architecture

After Gate 2 feedback, implement all twelve weeks with consistent 2035 dates,
distinct questions, feasible preparation and activities, and links between weeks.
Complete the three assessments (20/30/50), their criteria and deadlines, meaningful
lecture pages, the promised decks, people, policies, sources and a useful event
timeline. Separate the event chronology from the teaching timetable.

Acceptance: every required page carries authored course content; no unlabelled
fabricated source material; source comparisons identify their adaptations; weights
sum to 100; weeks cover 1–12; dates stay in period; allocated digits remain; at least
one lecture links to a real built deck. Replace starter material substantively.
Use the generated API and build output to verify mechanical requirements.

**Human review:** completeness, progression, balance between historical argument,
computing explanations and ordinary life, and the assessment workload.

## Gate 4 — usability, editorial and media refinement

After Gate 3 feedback, review the whole student journey and compare consequential
alternatives where uncertainty remains (for example weekly navigation or source
presentation). Keep useful visual features; discard effects that obscure learning.
Audit non-adjacent weeks, each assessment, representative slides and the timeline.

Acceptance: inspect desktop 1920×1080 and mobile 390×844; exercise keyboard access,
focus visibility, narrow-width wrapping, resize behavior and reduced motion where
applicable. Check console/errors and a slow-connection condition with available
browser tools. If a tool cannot reproduce a condition, record the gap rather than
claiming it passed. Audit loading cost, image alternatives and media provenance.

**Human review:** the complete site in use, prose quality, readability and any final
content corrections. Human feedback is distinct from automated or model review.

## Gate 5 — submission candidate and evidence

After Gate 4 feedback, run the required final checks once against the candidate;
resolve actual failures and repeat only affected verification. Inspect the final
diff, generated API and required routes. Reconcile remaining starter/evidence
markers, relevant local history and any independent review findings.

Build a compact evidence map from genuine decisions to commit links and observed
results. Help the student write PROCESS.md only from their actual notes and
feedback, within the assignment's guidance. Do not manufacture personal reasoning,
failed experiments, review participants or experience. Ensure CLAUDE.md matches the
workflow actually used and does not contain abandoned rules.

**Human review:** submission candidate, factual/process accuracy and remaining
limitations. Implementation pushes are authorized as recorded above. Public
publication, visibility changes and the course ship workflow require separate
authorization; when authorized, verify the deployed URL rather than inferring it
from a local build.

## Working loop and stopping rules

1. Identify the next observable outcome and the source of its requirements.
2. Research the uncertain decision; inspect actual installed code for API behavior.
3. Implement a small coherent change, preserving unrelated work.
4. Run relevant checks; inspect real output and obtain independent review when
   substantive. Check the reviewer and test oracle rather than accepting a label.
5. Refine against evidence, compare alternatives where the answer is uncertain,
   and record what changed. Stop iterating when the outcome is demonstrated.
6. Commit and push a reviewed checkpoint under the authorization above, verify
   its remote state and update the handoff. At a gate, wait for the
   student's feedback; time passing is not approval to move ahead.

Parallel agents may own independent research, bounded files or read-only review.
Use the existing WSL checkout while ownership is clear; introduce isolation only
when simultaneous changes or an experiment justify it. Do not install a new stack,
service, plugin or permission preset merely because a practitioner recommends it.

The deadline favors a coherent, complete course over optional feature growth.
Do not spend the remaining time repeating a broad harness benchmark, manufacturing
red tests or polishing a comparison that cannot change a decision. Necessary
source checking, genuine user gates and truthful reporting remain in scope.

## Latest checkpoint and Gate 3 execution plan

The student approved continuation after Gate 2 and again requested imaginative,
research-led design work. They also asked whether all twelve weeks were necessary.
The parent rechecked the official brief and upstream: twelve dated weeks are
required; twelve full lecture scripts or decks are not. Gate 3 uses that boundary.

Deliver:

1. Twelve dated, distinct weekly guides. Keep Week 2's existing detailed exemplar;
   write the others concisely with a question, setting, accessible preparation,
   activity and concrete output. A target around 250–400 words is an authoring
   aid, not a grading rule or quota.
2. A complete source library covering beginnings, aftermath/return, Ordinal Scale
   and Underworld. Parent-check official sources and keep source purpose, story
   dates, publication dates and classroom inventions distinguishable.
3. Selected readable lecture notes, including the opening, care/participation and
   artificial-life questions. Keep the working Week 2 deck; additional decks are
   optional teaching decisions, not an invented minimum.
4. Full 30% Incident study and 50% Digital history exhibition briefs, aligned with
   the existing 20% source comparison. Complete staff and course policies; remove
   inherited placeholder content and imagery that this stage replaces.
5. A visually ambitious world atlas inspired by linked-object museum narratives
   and responsive visual explanations. Compare an interactive atlas and reading
   list over the same five settings/interfaces. Use the current stack unless a
   verified need justifies an addition. Preserve static access, meaningful labels,
   keyboard navigation, motion controls and small-screen reading.
6. Integrate the atlas, source library, staff/policies and actual weekly routes
   into the approved site. Verify content/API dates and weight contracts, inspect
   non-adjacent weeks and complete source-to-assessment journeys in the browser.
7. Reconcile independent research/review, update this audit/research/evidence and
   the smallest justified harness rules, then commit and push reviewed checkpoints.

The existing whole-assignment Goal was verified active when this stage resumed.
Stop at Gate 3 for the student's review of the complete curriculum and its new
atlas before the full-site Gate 4 refinement and final Gate 5 evidence/release.


### Gate 3 delivery checkpoint — 27 September 2026

The implementation is now [1c27051](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/1c27051bc85009e128952a9afff34729670ddc04). All seven items above are
implemented and the [review record](gate-3-review.md) gives actual checks and
limits: 12 dated weeks, 4 selected lecture-note pages, 1 real deck, 3 completed
assessment briefs, 2 staff profiles, policies, sources/chronology and the atlas.
The final required site check passes all 36 tests; 42 built pages pass the
configured accessibility/base/link checks. The evidence gate remains red only
for the student's unfilled PROCESS account and example hashes.

Human Gate 3 review is pending. Keep the whole-assignment goal paused at that
requested boundary until the student responds. Gate 4 and Gate 5 remain open;
no grade, human preference or public deployment has been claimed.
