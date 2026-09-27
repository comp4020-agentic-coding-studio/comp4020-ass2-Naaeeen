# Gate 2: complete teaching slice and review

Status: verified Gate 2 candidate, ready for human review following acceptance of revised C.

## Observable outcome

A student new to SAO can move from the homepage to Week 2, identify preparation,
read the source packet, complete the source-ledger activity, use the lecture/slides
and understand the Source comparison submission and marking criteria.

## Same-content layout comparison

A uses the existing reading layout; B uses the proposed course reading layout.
Both render the same session entry with the same question, preparation, sources,
activity, output and assessment. Differences in navigation and placement are the
comparison, not different teaching content. Routes: `/review/unit-a/` and
`/review/unit-b/`; keep them unlisted and noindex.

Inspect A then B at one viewport, reverse order at the other, and record whether
the reader can locate the task, source, expected output and assessment. A parent
walkthrough and independent model review are not a user study or a randomized
agent benchmark. The student's Gate 2 response supplies the human judgement.

## Acceptance matrix

| Case | Evidence | Status |
| --- | --- | --- |
| Required source claims and access | Compare substantive claims with A/B/C and their actual source purpose | PASS: parent and independent reviewer checked A/B/C; fallback paraphrases were refined to preserve evidence needed by the activity. |
| Coherent learning task | Question → preparation → worked example → activity → output → assessment | PASS for the intended sequence and source support; learning effectiveness remains a human/course-delivery question. |
| Homepage and unit journey | Actual links and back navigation at 1920x1080 and 390x844 | Parent followed homepage → seminar → packet → worked lecture → deck → assessment. Both reading layouts and source page fit the phone. |
| Reading-layout A/B | Same content; observations against the declared tasks at both viewports | Same 14 teaching headings confirmed. B offers 5 working section links; A has none. Both fit both marking sizes. Parent recommends B; human judgement pending. |
| Deck | Every slide fits and remains legible at both marking viewports; keyboard/touch path works; HTML notes available | All 10 slides traversed with keyboard at 1920x1080 and 390x844. Phone body text 18px. Next link activated at phone size. DOM fit checked at 4 further sizes; HTML notes and no-script reading verified. Physical touch hardware not tested. |
| Fixed platform and API | Suffix 897, collections/integrations preserved, dates aligned, weights total 100 | PASS: generated API has SLOP1897, 2035 term, 20/30/50 weights, Week 2 session/lecture; schema and integration pipeline unchanged. |
| Deck-link oracle | Genuine red fixture; parsed-anchor check accepts valid alternatives and rejects title text/missing target | PASS: parent reproduced original false positive and ran all 31 regressions; independent review found no actionable issue. Commit 785b1ce. |
| Runtime and fallbacks | Console, reduced motion and useful HTML for changed paths | Reading and deck paths work; no-script teaching nav has 5 links and hides inert controls; no-script deck shows all 10 slides and hides unavailable slide controls. Existing motion preferences retained; no new runtime animation controller. |
| Required checks | Type/build/a11y/links/tests and honest evidence-gate findings | Types: 0 errors/warnings/hints; 21-page build/a11y/links pass. Spec 35 pass, only incomplete twelve-week coverage fails for [2]. Evidence gate remains red as itemized below. |
| Process and delivery | Sources, actual findings, small harness diff, focused commits and private push verified | Research/claim ledger, exact harness changes, independent review and actual outcomes recorded. Implementation and dependency commits created; remote delivery verified at handoff. |

Expected incompleteness: this is one full unit, not twelve. Untouched starter
Week 1 content/deck is staged as unpublished, with markers retained. Later
assessment briefs are draft outlines. PROCESS.md, remaining course pages/assets
and public release are not being declared complete at this gate.

## Comparison observations and refinements

Desktop comparison used A then B; phone comparison used B then A. Both pages
render the same session component. This parent walkthrough is not a blind user
study: the parent had already implemented and inspected B. The heading sequence
was identical and neither page overflowed horizontally. B's five section links
make the activity and preparation directly reachable; A offers the same content
through ordinary scrolling. The comparison banner adds height in both previews
and is absent on the actual seminar page. No learner-time or learning-gain claim
is made. The student's review decides whether this teaching voice/layout fits.

Actual checks produced these changes:

- The shared description prop needed to accept the collection schema's nullable
  value and normalize it at the layout boundary; the first typecheck reported
  three errors, then the corrected boundary passed.
- Ten identically named slide navigation landmarks failed the static build.
  Unique per-slide labels fixed the real accessibility finding.
- Source B's fallback omitted Kirito's difficulty alone, which the worked example
  needed. The reviewer identified the gap; the parent added that evidence and
  strengthened the lecture's concrete mapping of entry, exit and collective action.
- The contents rail stuck at 32px under a 118px header. After correction, the
  browser showed it at 141px with the target heading visible and focused.
  Course and Seminars had both been marked current; the homepage fragment link
  now leaves only Seminars current on the real seminar page.
- A phone card's Publication label had only about 1.6px of visual separation from
  its date. It was crowded, not geometrically overlapping. Intrinsic label width
  increased the measured separation to about 19.7px. Slide-bounds checks alone
  had not caught this readability problem.
- No-script inspection found an inert mobile menu/search and visible slide links
  that depended on Reveal. Plain reading-page navigation and a more specific
  no-script deck selector restored useful controls. All ten deck sections remain
  readable without JavaScript.

## Checks and limits

Full patched check: `/tmp/a2-gate2-patched-final-mk5lpl5s.log` (Vitest 4.1.11).
Final CSS-only build: `/tmp/a2-gate2-noscript-final-469xb2q4.log`.
Focused parent oracle run: `/tmp/a2-gate2-oracle-tsl201ue.log`.
Evidence output: `/tmp/a2-gate2-evidence.log`.

Every slide's rendered text/content bounds were checked at 1920x1080 and 390x844,
with screenshots retained and the distinct card/step/question layouts visually
inspected. Additional actual-size DOM checks covered 1280x720, 768x1024, 375x667
and 667x375. Early supplementary runs had requested sizes but still reported
390x844; those were discarded and repeated using tab-scoped emulation. Likewise,
a hash-only navigation retained old CSS after a rebuild; a full document reload
was necessary. These observations justify the new short CLAUDE.md verification
rule, not a claim that the website itself caused the browser-state problem.

The promoted homepage retained one working scene. One browser session emitted a
non-fatal Three.js shader precision warning; no JavaScript exception was observed.
The unchanged scene's GPU frame rate was not profiled. Core lecture/reading
navigation and first-slide arrival were checked after navigation settled.

The all-dependency audit found 4 high fast-uri entries and 2 moderate Vitest/mocker
entries in development chains. Compatible patches resolved the six entries.
The parent verified primary advisories, the exact lock diff, installed Vitest and
post-patch audit JSON (zero advisories); a worker additionally ran 71 tooling/oracle
tests. Those are worker-run checks, not a separate parent-run suite.

Unfinished submission work is explicit: tracked starter Week 1 content/deck,
people/policies, four starter images, and PROCESS.md's template/sample citations
remain. Staging Week 1 does not bypass the evidence gate. Only Week 2 is a complete
published teaching unit. The other eleven weeks, later briefs and release remain
Gate 3 onward. Repository visibility/publication are unchanged.

Implementation: [4fc9cde](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/4fc9cde).
Oracle: [785b1ce](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/785b1ce).
