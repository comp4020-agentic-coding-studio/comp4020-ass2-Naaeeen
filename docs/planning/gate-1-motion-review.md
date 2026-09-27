# Gate 1 motion revision: acceptance and review

Status: revision 2 is verified and ready for human review, 27 September 2026.
The first-candidate results below are retained as history; current work and checks
appear under Revision 2. The student requested greater fidelity and motion.

## Declared acceptance cases

| Case | Expected observable outcome | Result |
| --- | --- | --- |
| Normal desktop 1920×1080 | Course orientation, scene, controls and course links readable; no horizontal overflow | PASS: verified size, one ready canvas, no overflow or normal-path console errors. |
| Phone 390×844 | Orientation before illustration; useful touch targets and normal document scrolling | PASS: readable first frame, orientation within first screen, 12px model controls/11px caption, no overflow. |
| Chapter selection with pointer and keyboard | Selected control/panel agree; arrows/Home/End behave correctly; link to chosen week works | PASS: selection/panels agree, orientation changes with viewport, Home/arrows/Tab reach the panel; selected deep link survives Back. |
| Scene view and rotate controls | World/citadel/settlement views differ meaningfully; buttons retain focus; canvas does not trap page scrolling | PASS: three visibly distinct views; a scene-only capture changes after rotation. |
| Pause and resume | Nonessential motion stops while the rest of the page remains usable; resumes only on request | PASS: paused full captures identical; scene-only captures change after resume. |
| Reduced motion, initial and changed while open | No ambient/camera/reveal animation; state changes and navigation still work | PASS: motion paused and control disabled on device preference; initial content opaque and tab changes immediate. |
| Menu navigation then resize | Menu state, target visibility and focus remain correct | PASS: target focus restored, menu closes; 390→1920→390 keeps navigation/tabs usable and Escape returns focus. |
| JavaScript disabled | Course text, source links, all chapter content and useful static artwork remain available | PASS: zero canvas, all chapter panels readable, static art and plain course-contents links work; dead menu toggle hidden. |
| Scene module unavailable | Static artwork/content survive; remaining interactions continue | PASS: blocked the observed scene URL; static art and functional chapter tabs remained, model controls hidden. |
| Slow connection | Course does not wait for the illustration to become usable | PASS: 150ms latency/204800 bytes per second; heading and week link readable while model pending, then scene ready. |
| Leave/return to the page and offscreen scene | No duplicate scene or stale disposed callbacks; loop suspension checked at supported evidence level | PASS for ordinary return navigation and single-instance output; native BFCache restoration and GPU suspension were not directly measured (source reviewed). |
| Build and outgoing diff | No new type/build/accessibility/link regression; packages and outgoing files intentional | Type/build/19-page accessibility/links PASS. Existing twelve-week spec failure remains; optional scene size warning retained and measured. |

Run the real browser cases against production preview. Record actual viewport
sizes rather than assuming a new tab inherits an earlier override. Keep browser
emulation and request-blocking scoped to the test tab and reset it afterwards.
Screenshots show a state; they do not establish animation smoothness or frame-rate
performance. Do not claim those properties without corresponding measurements.

## Comparison question

Does the new inspectable scene and chapter explorer make the historical premise
more engaging while leaving course orientation and weekly navigation clear?
Compare the same course proposition with static A/B. The user's actual judgement
will decide the direction; model review supplies findings to check, not that answer.

## Remaining scope

Full teaching units, revised catalogue metadata, real course decks, final media,
PROCESS.md and public shipping are still later work. Existing twelve-week data
coverage and submission-evidence failures are not hidden by the new preview.

## First implementation observations

The first build failed `landmark-unique`: chapter panels and weekly-outline regions
shared three accessible names. The parent parsed the output to reproduce the six
colliding regions and added distinct weekly-outline names. The next build passed
19-page accessibility/link validation; spec remained four pass/one known coverage
failure. Typecheck reported no errors, warnings or hints. Vite retained the scene
chunk-size warning; measured optional scene gzip is 142,285 bytes, controller/GSAP
29,084 bytes. The threshold was not suppressed.

Browser at 1920×1080: one real canvas, no horizontal overflow; World, Settlement
and Citadel views differ visibly. A rotate action changed a scene-only screenshot.
Two paused screenshots were byte-identical; after resume, scene-only screenshots
changed. No console warnings/errors were returned for the normal path. These
observations establish visible behavior, not measured GPU frame-rate performance.

Phone at 390×844: orientation ends around y=582 and there is no horizontal overflow.
The earliest capture exposed an opacity-zero entrance that temporarily made text
unreadable. Model controls computed to 10px and caption to 9px; increase these
sizes. Tab arrows/Home changed selection and panel visibility correctly on desktop.
Tab then skipped the panel's introductory text to its first week link; add a
focusable tabpanel following W3C's recommended pattern. Source review also raised
the stale-fragment/BFCache case; verify the refined handling.

## Final verification and refinements

The hero now enters with position movement only; its text stays opaque. The
phone introduction computed to opacity 1 in the first inspected frame. Added
focusable tab panels, larger small labels, no-script navigation and a single
anchor offset. Browser pointer/keyboard results agreed with the final markup.

The reviewer initially identified a cache-restore branch. The browser's recorded
`Page.frameNavigated` events instead reported ordinary Navigation; returning from
A still exposed the stale URL. Keeping the selected chapter's fragment current
with `history.replaceState` fixed that observed path without adding tab-selection
history entries. Retest: selected beginnings → visit A → Back returned to both
`#chapter-beginnings` and the beginnings tab. Native BFCache was not exercised.

All test-only script disabling, reduced-motion emulation, request blocking,
network throttling and cache disabling were reset. A fresh normal tab rendered
one canvas at 1920×1080 and returned no warning/error console entries. The
intentionally blocked module produced its designed fallback, not a normal-path
failure. A and B now link back to C and still fit the phone viewport.

Final full check log: `/tmp/a2-immersive-candidate-53q7daje.log`: typecheck zero
errors/warnings/hints; 19-page build/accessibility/internal links passed; four spec
checks passed and the existing twelve-week collection-coverage assertion failed.
Vite warns about the optional 571,138-byte scene chunk. Its measured gzip size is
142,285 bytes; controller/GSAP is 29,135 bytes (171,420 bytes combined). This is a
compressed-file measurement, not an actual hosted transfer or frame-rate result.

Minification removed the vendor headers. Their notices are now retained in
`public/vendor-notices.txt` and linked from the preview head. A final build exited
0, copied the notice exactly and passed the same 19-page checks:
`/tmp/a2-immersive-notices-gfbaxakw.log`. This documentation-asset addition did not
change the already-tested interactions. Production dependency audit previously
reported zero advisories after the compatible refresh.

Independent source review of the final functional changes returned no actionable
finding. Actual GPU profiling and forced WebGL context-loss testing remain outside
this checkpoint. Source-reviewed safeguards are not reported as those runtime tests.

Implementation: [99b0491](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/99b0491).
Refinements and harness changes: [03159e6](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/03159e6).
The new review URL is `http://127.0.0.1:4321/comp4020-ass2-Naaeeen/review/c/`.

The student subsequently rejected the first model's fidelity and found the motion
insufficient. The results above describe the first candidate; the next revision
and its acceptance evidence are recorded below.

## Revision 2: faithful fortress and larger 2D/3D motion

Status: implementation, independent source review and parent browser checks complete; human review pending. The student explicitly
requested existing media/model research, more varied animation and greater
amplitude. The parent inspected the official original-anime exterior and a CC BY
fan model; the latter required login for its official download. No asset was
imported from that model. Keep the prior C screenshot as a before comparison.

Evaluation question: does the revised silhouette resemble the reference and does
normal mode visibly change the experience beyond the earlier small rotations and
text shifts, while the course remains readable and easy to navigate? This is a
paired design comparison, not a randomized user study. Human acceptance is pending.

| Check | Evidence required | Current status |
| --- | --- | --- |
| Reference comparison | Continuous tapered body, dense bands, lower foundation and radial bridges, cooler material; visually compare the actual output | Parent inspected the official exterior and actual render. Those structural features are now present; still an original interpretation. Human judgement pending. |
| Desktop and phone | Verified 1920x1080 and 390x844, no overflow, readable first frame and usable controls | PASS at both measured CSS viewport sizes, DPR 1. Phone title opacity 1 and introductory text readable; scene controls remain usable. |
| Larger normal motion | Observe cloud travel, fortress/camera movement, chapter illustration and reading timeline in use | Observed new scene/cloud composition, viewpoint changes, drawn chapter graphics and top reading progress. Visible SVG traveler coordinates changed between captures. No FPS claim. |
| Pause / live reduced motion | New 2D and 3D animation stop, interactive state changes remain usable | PASS: paused hero captures identical; live reduced mode disabled motion control and CSS haze. Chapter captures identical under reduced mode; model view controls still work. |
| Scene views and scroll | All three views and rotation work; native scrolling remains normal and focus targets stay stable | PASS: Exterior/Lower ring/Summit states and different views inspected, rotation used, normal scrolling retained. Scene visibility flag becomes false offscreen. GPU suspension is source-reviewed, not profiled. |
| Chapters and navigation | Pointer/keyboard selection, orientation after resize, fragment/Back state, menu focus | PASS: horizontal Right and phone Down select matching panel/hash; resized orientation is vertical; Back restores legacies selection; phone menu closes and focuses assessment, heading top around 135px. |
| HTML and module fallback | Useful matching static artwork, all course content, no dead controls | PASS: scripts disabled gives 0 canvases, all 3 panels, 5 contents links, hidden menu toggle and visible fortress SVG. Blocking built scene URL gives fallback with model controls hidden and functional chapter selection. |
| Independent review and required checks | Resolve supported findings; preserve known incomplete-course failure only | Final source review: no outstanding actionable finding. Full check: types/build/19-page accessibility/links pass; spec 4 pass, only existing twelve-week coverage failure. |
| Cost / outgoing scope | Measure compiled chunks, inspect changed files/credentials, preserve private visibility | Scene/controller gzip total 174888 bytes, raw chunk warning retained. No new dependencies; production audit zero advisories. Only intended preview and evidence files; private visibility reconfirmed. |

Saved before image: `gate1-c-before-fidelity-desktop.jpg` in the current local
visualization directory. Source references and rejected alternatives are in the
research register and process entry E11.

### Revision 2 refinements and verification limits

Source review found window quads partly inside the wall. The initial correction
fixed their centres only; the reviewer supplied a remaining lower-edge case. The
final placement follows the actual wall slope and clears the projecting lip.
Independent review confirmed the final relationship and the controller lifecycle.
Worker-only mock-renderer/corner checks were reported but their inline harness
was not retained; they are not parent-reproduced or live GPU results.

The parent also corrected a description selector invalidated by inserting SVG
after the paragraph and softened abrupt cloud clipping at the canvas sides. Final
full-check log: `/tmp/a2-aincrad-final-77p3_n74.log`; final CSS build:
`/tmp/a2-cloud-edge-refinement-jqe4o4x6.log`. Scene raw/gzip 575292/144638 bytes;
controller+GSAP 79314/30250. No hosted transfer, frame-rate or native BFCache claim.

Browser verification moved to the same build at localhost after disappearing tab
handles and 127.0.0.1 zoom-related dimension mismatches. The accepted measurements
were read from the actual page at DPR 1; the unknown tab-disappearance cause was
not described as a code defect. Script, network-blocking and media overrides were
reset after the tests. Earlier slow-network verification belongs to candidate 1;
it was not rerun on this revision. Final human judgement is still required.

Implementation: [06ce955](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/06ce955).
Goals/reference rule: [8d518f9](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/8d518f9).
