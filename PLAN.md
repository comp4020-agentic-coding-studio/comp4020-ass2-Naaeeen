# Working plan

## Course direction

The user wants a course inspired by Sword Art Online, which originally motivated
them to study computer science. The central question, audience and level are
still to be chosen. Keep the allocated code suffix 897.

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

Choose a focused SAO-inspired course premise and target students, then plan its
learning outcomes, twelve weeks and assessment before authoring the site.
