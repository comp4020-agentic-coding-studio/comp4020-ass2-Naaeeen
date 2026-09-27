# Working plan

## Course direction

The user wants a course inspired by Sword Art Online, which originally motivated
them to study computer science. They have approved an in-universe history of
technology and society: treat the selected SAO events as historical events within
the course's fictional framing. Follow their beginnings, development and aftermath,
including the films. Historical narrative is primary; computing explains relevant
mechanisms. People's relationships and attachment to virtual worlds remain part
of the subject. Keep the allocated code suffix 897.

The proposed central question is why people continue to enter, inhabit and protect
virtual worlds after Aincrad. Its exact wording, the course title, audience, level,
source/continuity boundary, fictional teaching date and assessment are not yet final.
The earlier twelve-week outline is a draft, not an approved content schedule.

## Verified handoff

- `0b50b24`: harness adapted from crit5.
- `faf6cd0`: Assignment 2 promise checks.
- Typecheck and production build pass. Four spec tests pass; twelve-week
  coverage fails because only weeks 1 and 2 exist.
- The evidence gate reports starter content, images and the unfinished process
  template. These remain work to complete before submission.

## Handoff corrections completed

- Reproduced two false failures (rendered deck links without slides metadata;
  more than one session in a week) and a false pass (deck metadata retained but
  its rendered link removed).
- The deck check now follows rendered lecture links to built deck pages.
  The week check compares distinct weeks, preserving the 1-12 requirement.
- The harness now distinguishes known unfinished acceptance checks from
  regressions and does not require artificial red results.
- Seven isolated cases match their expected outcomes: metadata and body links,
  twelve weeks, an extra session in a week, missing weeks, an unlinked deck and
  a missing deck page. Fixtures were removed after the run.
- The first fixture invocation was blocked by pnpm's automatic install check;
  those exits were not test evidence. The rerun used the installed Vitest CLI
  directly under the pinned Node runtime and produced the results above.
- Final `pnpm check`: typecheck and production build pass; four spec tests pass
  and only the known twelve-week coverage check fails. `check:evidence` still
  identifies the unchanged starter material and unfinished process template.
- Independent source review found no remaining actionable issue. Diff whitespace
  checks pass. This verification used the Windows-to-WSL bridge; no visual
  browser verification was performed and no course content was authored.

## Confirmed content scope

The [A2 brief](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/assessments/assignment-2/)
requires twelve dated teaching weeks and at least one lecture linked to a real
deck. It expects coherent, distinct week content but sets no per-week word count
or requirement for twelve decks. Week-by-week topics, activities and preparation
are a proposed design structure, not extra course rules.

## Next decision

Resolve audience/prerequisites, the included works and how version differences
are attributed, and the course's in-universe historical standpoint. Then align
learning outcomes, assessment and the twelve-week progression. Set language,
student workload and visual direction before authoring the full site. Use the
existing template dates only as placeholders until the teaching year is chosen.

## Harness research update

The user requested an evidence-backed review of Claude/Codex practices and
controlled comparisons, then asked to accelerate completion. The source register,
research report, preserved variants and evaluation protocol are in
`docs/harness-research/`. The final CLAUDE.md uses task-scaled planning, grounding
and verification, preserves course contracts, and distinguishes faithful help
with student-supplied process notes from invented personal experience.

Two scored comparison rounds completed: 12 runs on v2 and six focused runs on
final v3, all passing mechanical artifact checks. These are local observations,
not proof of universal superiority. Independent review caught a missed HTML
attribute edge case in a baseline-generated test; it is retained as a limitation
of the automatic grader. See the report for scope, environment and review limits.
No SAO course content or PROCESS.md was authored during this research task.
