# Process evidence bank

Updated: 27 September 2026. This is a factual working record for the student's
later PROCESS.md, not a student reflection. Decisions labelled as recommendations
or source-level findings are not human feedback or verified runtime outcomes.
Keep this file selective: preserve events that changed what we asked for, built,
checked or accepted. The [living research](IMPLEMENTATION-RESEARCH.md) and
[review records](planning/gate-1-review.md) hold supporting detail.

## E01 — A history course with computing as an explanation

**Trigger and decision.** The student said SAO originally motivated them to study
computing, proposed treating its events as history, and accepted a history of
technology and society. The course plan makes historical inquiry the structure;
computing explains relevant mechanisms. Friendship, ordinary life and reasons for
returning accompany institutional conflict. The 2035 teaching frame is invented,
while source-supported events remain distinguishable from interpretation.

**Alternative and consequence.** A plot recap would not teach a method; a generic
computing course with substituted names would lose the student's particular
interest. The planned source comparison, incident study and exhibition give the
semester a progression. These are design arguments, not measured learning effects.
The full teaching content still needs implementation and human review.

**Evidence.** [c14d959](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/c14d959)
records PLAN.md and the implementation gates. The student has not yet reviewed a
complete teaching unit; do not claim that they have.

## E02 — Compare the same content, then fix first-screen orientation

**Observation.** A and B share one outline dataset. A foregrounds an archive-like
composition; B brings semester navigation forward. On the first A phone layout at
390×844, prerequisite information appeared around y=1495. The illustration had
pushed essential orientation beyond the first screen.

**Decision and verification.** Move the fictional frame and entry requirements into
the shared opening. They then occupied about y=451–556 in A and y=399–505 in B,
inside the first viewport. Keep both alternatives for human judgement. This tests
placement and function, not comprehension or preference.

**Commits.** Initial comparison:
[800ed14](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/800ed14).
Refinement and actual observations:
[4fe3d0c](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/4fe3d0c).
See [Gate 1 record](planning/gate-1-review.md). Human choice remains open; the
student subsequently requested a more immersive direction, now being developed as C.

## E03 — Check a reviewer's prediction against the browser

**Finding.** An independent reviewer predicted that the expanded mobile menu would
hide an anchor destination. The browser confirmed that the menu stayed open, but
the assessment heading remained visible: menu bottom about y=297, heading y=327.
The parent narrowed the claim; the reviewer withdrew the unconfirmed occlusion.

**Fix.** Close the disclosure after a same-page selection and focus its destination.
Keyboard selection then reached the assessment section with the menu closed; its
heading appeared near y=138 below a roughly 90px navigation bar. A second test
found that resizing could move focus to BODY, preventing a nav-scoped Escape
handler from receiving the key. A guarded document listener fixed that case.

**Harness consequence.** CLAUDE.md gained: "For in-page navigation, verify
destination visibility, keyboard focus and mobile menu state after activation."
The reusable check belongs in the harness; selector code and pixel measurements
remain in the review record. This is a demonstrated correction rather than a
speculative rule.

**Evidence.** [4fe3d0c](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/4fe3d0c),
actual pointer/keyboard/resize checks at the marking viewports and independent
follow-up source review. No user enjoyment or preference was inferred from them.

## E04 — A green test can still have a faulty oracle

**Reproduction.** The current lecture-deck regex accepts `href=` text inside a
quoted title attribute. An isolated probe returned one regex match but zero real
anchors with an href when the same fragment was parsed as HTML. The earlier
harness study had identified this failure pattern, and the parent reproduced it
against the current expression.

**Status: unresolved.** The real starter deck link is valid; the probe does not
show it broken. Replace the faulty extraction and check legitimate and invalid
cases before accepting the representative unit. Do not present the current green
assertion as proof that every apparent match is a real link.

**Evidence.** The probe and pending action are recorded in
[4fe3d0c](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/4fe3d0c)
and [the research record](IMPLEMENTATION-RESEARCH.md). The prior paired harness
study lives at [2b885c8](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/2b885c8);
its 18 mechanical passes are not 18 fully verified semantic successes.

## E05 — Add immersion within the course platform

**User feedback.** The student requested more vivid animation and permitted
additional APIs/packages if compatible with course rules. The parent rechecked the
live brief and upstream template, inspected Apple and Bruno Simon pages, and read
original maker accounts and package documentation.

**Decision.** Use an original procedural world with inspectable views and a chapter
explorer. Keep course meaning and navigation in HTML. Choose Three.js for depth,
GSAP for finite sequences, and native CSS for small states. Motion was considered
but adding a second coordinator offered little benefit. A full driving game,
external model downloads and a new framework were outside the useful scope.

**Evidence and limits.** Expanded goals:
[2bdf84d](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/2bdf84d).
Dependencies/research:
[e1b037f](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/e1b037f).
Candidate C is now ready for human review. An initial build measured 142,285 gzip bytes
for the scene chunk and 29,084 for its controller/GSAP chunk. The 571,138-byte
minified scene triggers Vite's size warning; lazy loading and actual usability,
not a suppressed threshold, must justify that cost. These are compressed-file
measurements, not observed network transfer or frame-rate measurements.

## E06 — Dependency review found a real inherited issue

**Observation.** Adding animation libraries prompted a production dependency audit.
It reported seven entries in the inherited platform, including the AVIF decoding
issue in Astro/sharp. Neither new animation library appeared in the report. Static
output does not remove image decoding during a build.

**Decision and outcome.** Apply compatible patches, retaining Astro 7.2 and the
Slop integrations. Installed versions became Astro 7.2.8, sharp 0.35.4, js-yaml
4.3.2, SVGO 4.1.0 and devalue 5.9.4. Audit then exited 0 with zero reported production
advisories. Typecheck/build/accessibility/links passed on the 18-page baseline;
the existing incomplete twelve-week test remained red.

**Evidence.** [e1b037f](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/e1b037f)
and primary advisory links in the research record. This is a verified dependency
refresh, not an assertion that an exploit occurred or that the whole app was
security-audited. Both planning and dependency commits were pushed and the remote
hashes matched the local commits.

## E07 — Progressive enhancement must also pass without JavaScript

**Observed failure.** The first C build failed the existing axe `landmark-unique`
rule. The chapter panels and full weekly outline used the same three accessible
region names. A direct parse of the built HTML confirmed each name twice. Client
code would later turn the panels into tabs, but that did not repair the initial
HTML or the no-script experience.

**Change.** Give weekly-outline regions distinct descriptive accessible names;
keep the checker intact. The repeated production build checked 19 pages with
zero accessibility violations; the original incomplete twelve-week check remained
red. Passing build log: `/tmp/a2-immersive-landmarks-g8ucwu3b.log`. First failing log: `/tmp/a2-immersive-first-zib1v8ya.log`.
The corrected HTML is recorded in [99b0491](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/99b0491).

## E08 — A source review lead needed a broader runtime correction

An independent source review identified a stale-fragment issue on cache restore.
The parent tested navigation away/back and observed the selected chapter revert,
but protocol events showed ordinary Navigation, not BFCache. A cache-only guard
therefore did not cover the actual observed path. User selection now updates the
chapter fragment with history.replaceState, while cached state is retained and
explicit hash navigation still works. The repeated browser case returned to both
the selected beginnings chapter and its matching URL.

**Evidence.** [03159e6](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/03159e6). Initial deep links, pointer/keyboard selection
and ordinary Back behavior were verified. The native BFCache branch received
source review; it was not exercised by this browser. The distinction matters when
explaining why the first proposed fix was insufficient.

## E09 — Inspect the first animated frame, not only the settled page

The first phone capture showed the course introduction fading from near-invisible
text. Source inspection confirmed a GSAP entrance starting at opacity zero. The
settled page was readable, but the earliest usable frame did not meet our stated
orientation goal. A separate phone inspection measured 10px model controls and a
9px illustration caption; the parent judged these too small for comfortable use.

The refinement keeps text opaque during the entrance and retains restrained
position movement. Model controls are now 12px, captions 11px and introductory
body text 16px on the phone. The first frame computed to opacity 1 and the
introduction fitted in the first viewport. This
is a visual/readability judgement, not a claim that a minimum font-size rule in the
assignment was violated. [03159e6](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/03159e6) also adds the CLAUDE.md check for the
first usable frame, reduced motion and HTML fallback, alongside the settled view.

## E10 — Preserve navigation when enhancements are unavailable

A real browser run with script execution disabled retained all chapter content,
static illustration and body links, but the inherited theme's menu remained inert
and its toggle could not operate. Add a plain HTML course-contents navigation for
that condition and hide the nonfunctional toggle. Also avoid adding a second
anchor offset on top of the theme's existing scroll padding: the first mobile
Assessment jump left the heading around y=335 despite a roughly 70px closed nav.
These are refinements of the student path, not reasons to replace the theme.
Status: browser verified. With scripting disabled, all three panels and five
plain course-contents links were available; the menu toggle was hidden and the
Assessment link worked. The normal menu/resize path was also rechecked.
[03159e6](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/03159e6) records the fixes.

## E11 — Human feedback exposed a reference gap in the artwork

**Trigger.** The student said Aincrad was not realistic or close enough to the
original and requested more and better animation. They explicitly invited existing
models and images as assets or references. Previous mechanical checks had passed
for the preview; none established recognizable fidelity or sufficient visual impact.

**Evidence and decision.** Parent inspected the official anime exterior and a CC BY
fan model. The official image shows a continuous densely layered tapered fortress,
not the previous model's separated terraces. The fan model's download required
login and its viewer reported a device-weight limit. Use these as references for
a local reconstruction and coordinated atmosphere, preserving ordinary HTML and
the established motion controls. Details and primary links are in the research log.

**Harness refinement.** Added to CLAUDE.md: “When depicting a recognizable subject,
inspect a primary visual reference and compare the rendered silhouette, proportions
and materials before presenting it for human review.” This addresses an observed
failure to ground visual work, rather than adding a generic longer design checklist.

**Status.** Implementation and browser verification pending. No new approval or
preference is claimed. Record the actual revision, checks and commit below when
complete; the whole course remains unfinished.

## Entry checklist

For a new significant event record: trigger; observed evidence; alternative;
decision and reason; source/file changes; exact harness change if any; actual
checks; remaining limits; commit link; real human feedback. Revise this entry when
new evidence corrects it. Do not invent failures, timings, personal learning or
participants to make the eventual PROCESS account look stronger.

## Current checkpoint

The first C candidate was reviewed by the student; E11 records the requested
revision now in progress. See [the complete motion test record](planning/gate-1-motion-review.md).
The actual course collections, student PROCESS.md and public shipping are still
unfinished. E04 remains an explicit follow-up before the representative unit.
No human preference or learning outcome has been invented for this record.
