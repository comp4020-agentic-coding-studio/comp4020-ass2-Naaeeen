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
Candidate C is still being verified. An initial build measured 142,285 gzip bytes
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
Add the verified result and commit link when available.

## E08 — Pending review lead: chapter state on return navigation

An independent source review found that a stale chapter URL fragment could
overwrite the latest selected tab after a BFCache restore. This is a source-level
finding; actual browser restoration has not yet been checked. Preserve current
selection on restore while still honouring initial deep links and explicit hash
navigation. Record the reproduction/fix/result before calling it resolved.

## Entry checklist

For a new significant event record: trigger; observed evidence; alternative;
decision and reason; source/file changes; exact harness change if any; actual
checks; remaining limits; commit link; real human feedback. Revise this entry when
new evidence corrects it. Do not invent failures, timings, personal learning or
participants to make the eventual PROCESS account look stronger.

## E09 — Inspect the first animated frame, not only the settled page

The first phone capture showed the course introduction fading from near-invisible
text. Source inspection confirmed a GSAP entrance starting at opacity zero. The
settled page was readable, but the earliest usable frame did not meet our stated
orientation goal. A separate phone inspection measured 10px model controls and a
9px illustration caption; the parent judged these too small for comfortable use.

Planned refinement: keep text opaque during the entrance, retain restrained motion,
increase small mobile labels, and recheck the first screen and interactions. This
is a visual/readability judgement, not a claim that a minimum font-size rule in the
assignment was violated. Status: before/after refinement pending.
