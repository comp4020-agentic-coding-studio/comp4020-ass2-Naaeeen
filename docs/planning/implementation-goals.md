# Implementation goals and human review gates

Status: Gate 1 package ready; awaiting student review. The complete course remains unfinished. Deadline supplied by the student: **tomorrow**, relative
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
limitations. Local completion is separate from deployment. Push, publication,
visibility changes and the course ship workflow require explicit authorization;
when authorized, verify the deployed URL rather than inferring it from a local build.

## Working loop and stopping rules

1. Identify the next observable outcome and the source of its requirements.
2. Research the uncertain decision; inspect actual installed code for API behavior.
3. Implement a small coherent change, preserving unrelated work.
4. Run relevant checks; inspect real output and obtain independent review when
   substantive. Check the reviewer and test oracle rather than accepting a label.
5. Refine against evidence, compare alternatives where the answer is uncertain,
   and record what changed. Stop iterating when the outcome is demonstrated.
6. Commit a coherent checkpoint and update the handoff. At a gate, wait for the
   student's feedback; time passing is not approval to move ahead.

Parallel agents may own independent research, bounded files or read-only review.
Use the existing WSL checkout while ownership is clear; introduce isolation only
when simultaneous changes or an experiment justify it. Do not install a new stack,
service, plugin or permission preset merely because a practitioner recommends it.

The deadline favors a coherent, complete course over optional feature growth.
Do not spend the remaining time repeating a broad harness benchmark, manufacturing
red tests or polishing a comparison that cannot change a decision. Necessary
source checking, genuine user gates and truthful reporting remain in scope.
