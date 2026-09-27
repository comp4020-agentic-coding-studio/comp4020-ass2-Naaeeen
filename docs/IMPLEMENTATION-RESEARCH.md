# Implementation research and decision record

Updated: 27 September 2026. Scope: After Aincrad, COMP4020 Assignment 2.
This is an English working record, updated when evidence changes a decision.
[Detailed goals](planning/implementation-goals.md) define the human review gates;
[PLAN.md](../PLAN.md) holds the current state. Research is evidence to evaluate,
not permission to change tools, settings or assignment requirements.

## Delivery position

The student traced their interest in computing to Sword Art Online. That gives
this course a specific question: why keep building and inhabiting virtual worlds
after their failures? A historical sequence can hold technical explanations,
ordinary relationships and institutional conflict together. A franchise recap
would describe what happened; each teaching week must also ask students to use
sources to explain a consequence or challenge an interpretation.

The first review compares two homepage treatments with the same outline. The
course remains a proposal until the student has reviewed its representative unit.
The public website is not yet complete. Review routes are explicitly marked and
unlisted; existing starter pages are not evidence of completed curriculum.

## What the assignment rewards

Primary authority: the live [A2 brief](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/assessments/assignment-2/)
and [assessment rubric](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/),
checked 27 September. A2 weights process 45%, artefact 20%, response 35%. The HD
bands call for corroborated decisions, robustness in use and a distinctive,
sustained response. They do not specify a number of research papers or agent runs.

| Contract | Where it will be realised | Verification |
| --- | --- | --- |
| Twelve dated teaching weeks | sessions collection and timetable | Distinct week numbers and date bounds in generated API; human review of progression |
| Course identity and assigned digits | course-config.ts | Existing schema and suffix test |
| Assessment weights total 100% | Three connected briefs, 20/30/50 | Generated API total; human workload/alignment review |
| Lecture links to a real deck | Representative unit, then chosen lecture set | Built lecture link, real deck route, actual slide reading |
| Fixed platform and Slop identity | Existing build, keys, API, crest and brand tokens | Diff inspection and build; no stack replacement |
| Replaced starter material | Authored content and course-specific artwork | Evidence gate plus direct reading |
| Usable at both marking sizes | All student journeys | Build accessibility checks plus browser at 1920×1080 and 390×844 |
| Account supported by history | PROCESS.md, CLAUDE.md, spec and commits | Real commit citations and student-confirmed reasoning |
| Public working submission | Course GitHub Pages URL | Verify deployed URL after explicit shipping authorization |

The supplied README and installed theme are the authority for local implementation
contracts. The initial snapshot used Astro 7.2.2, university theme 0.13.2 and Slop theme 0.1.0; the later dependency refresh below records Astro 7.2.8 in the current
manifest/installation. No new dependency is needed for the first comparison.

## Course teaching: techniques to carry forward

These are the actual HTML lecture decks, not summaries of their titles.

| Primary course source | Evidence and application |
| --- | --- |
| [Week 3: Backpressure](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/lectures/week-3/) | Useful checks identify a particular defect and remain trustworthy. Verify production output and base paths. Do not add a test merely to increase the count. |
| [Week 4: Context engineering](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/lectures/week-4/) | Persistent guidance and on-demand procedures serve different needs. Keep current decisions in the plan and detailed research outside the standing harness. |
| [Week 5: Verification](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/lectures/week-5/) | Inspect actual runtime evidence and turn observed behavioral defects into appropriate regression checks. Keyboard use, screenshots and the console reveal different failures. |
| [Week 6: Evidence of practice](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/lectures/week-6/) | Trace decisions through history, then retain useful corrections and prune stale rules. The final A2 process account connects course-design choices to encoded rules and deliberate human judgement. |

Our extension of these ideas is project-specific: compare shared-content design
alternatives, independently inspect the evaluator, maintain adaptation-level
source provenance, and use actual human review to calibrate editorial and visual
judgements. This is a proposed workflow, not a measured claim that it exceeds all
classroom practice.

## Research beyond the course

| Source and evidence type | Finding used here | Limits and decision |
| --- | --- | --- |
| [Anthropic, Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents), engineering experiment | Incremental work, progress records and browser checks addressed observed agent failures. | Model/task-specific experience; use a representative teaching slice and compact handoffs, not an assumed universal initializer architecture. |
| [Anthropic, Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), engineering guidance | Deterministic, model and human judgements cover different properties; model judges need calibration. | A second model is not a student. Require evidence for review findings and retain the user's own decisions at each gate. |
| [Simon Willison, Agentic manual testing](https://simonwillison.net/guides/agentic-engineering-patterns/agentic-manual-testing/), practitioner account | Running and visually inspecting the result can expose gaps in automated tests; preserve demonstrated outcomes. | Adopt the method with existing browser tools, without installing the author's preferred utilities. |
| [W3C WAI, Easy Checks](https://www.w3.org/WAI/test-evaluate/preliminary/), standards-body guidance | Titles, headings, image alternatives and keyboard access require examination of the real page. | These are preliminary checks, not a claim of full accessibility certification. |
| [Australian Government, plain language guide](https://www.stylemanual.gov.au/style-manual-resources/quick-guides/quick-guide-plain-language), editorial guidance | Put reader needs first, use familiar terms and make actions easy to identify. | Evaluate the student's task and comprehension, not a rigid sentence-length score. |
| [Kobak et al., excess vocabulary, v5](https://arxiv.org/abs/2406.07016v5), empirical paper | Large-scale biomedical abstract vocabulary changed alongside LLM adoption. | Population-level evidence is not an authorship detector for an individual passage or a blacklist of forbidden words. |

The parent re-opened these primary sources and inspected relevant passages after
receiving bounded research reports. Reports are leads, not authority. Research on
OpenAI, Claude Code, empirical instruction-file studies, practitioner settings and
an official webinar is already recorded in the [earlier source register](harness-research/sources.md)
and [harness report](harness-research/REPORT.md); retain their model/version and
experimental limits rather than repeating the entire survey.

### Earlier experiments that remain relevant

The existing [results summary](harness-research/results-summary.json) records 18
scored trials: six original-versus-v2 pairs, then three original-versus-final-v3
pairs. All passed their mechanical grader. This does not mean 18 semantic
successes, a full six-case rerun of v3, a Claude-versus-Codex comparison, or universal
speed improvement. Independent review found a false-positive pattern in a
generated deck-link regex; evaluator scope also needed correction during the pilot.

The revised [AGENTS.md study](https://arxiv.org/html/2602.11988v2) and
[efficiency study](https://arxiv.org/html/2601.20404v2) are already analysed there.
They do not establish one best instruction length, compaction percentage or agent
count. The practical decision is to preserve the current concise harness and make
small justified changes. The user-requested [practitioner repository](https://github.com/shanraisshan/claude-code-best-practice/tree/b70072cc2fed48b710ddb555b66c3d0ad7c40641)
is an idea index, not a permission or settings preset.

## Writing review

Look for empty promises, abstract praise, repeated section rhythms, vague actors,
unearned certainty, redundant disclaimers and conclusions that merely repeat the
opening. Those are editorial problems whether a human or model wrote the words.
Keep qualifications that affect source interpretation or an actual decision.

For each weekly page ask: what happened, whose account supports it, what is the
question, and what does a student do next? Keep a historical voice after a concise
statement of the fictional premise. Do not repeat implementation details to
students. Explain Full-Dive, AR and artificial life at the point where each concept
helps explain an event. Avoid replacing the course's distinctive interests with
generic warnings about technology.

A later paired editorial comparison will hold evidence and intended meaning
constant while comparing an abstract opening with a concrete one. Only real user
responses will count as comprehension evidence. Model comments will be labelled
editorial review.

## SAO source and media decisions

| Primary source | What it currently supports | Boundary |
| --- | --- | --- |
| [Official series portal](https://www.swordart-online.net/) | Identifying the chosen television arcs and films | A navigation page is not enough evidence for detailed episode claims. |
| [Progressive: Aria introduction](https://sao-p.net/aria/story-character/) | Return to early Aincrad, with Asuna's perspective | Compare adaptations explicitly; do not treat the films as sequels after Alicization. |
| [Ordinal Scale story](https://sao-movie.net/us/story/story.html) | The 2026 setting and Augma's AR distinction from Full-Dive | Do not infer every memory mechanism from promotional synopsis. |
| [War of Underworld introduction](https://sao-alicization.com/intro/) | Underworld conflict and artificial intelligence as central stakes | Add episode/scene-level sources before teaching more detailed claims. |

These pages were checked directly. The course year 2035 is an invented teaching
frame; event dates and publication dates remain separate. Selected scenes should
be identifiable without requiring viewers to purchase or watch the entire series;
short background notes and open official material support access. Readings and
claims will receive specific references when the representative unit is authored.

The first preview uses original vector artwork, drawn in the Slop palette, as an
interpretive illustration. It carries no claim to reproduce a canonical map.
Official source pages are linked. Their images have not been downloaded or
relicensed. Later media decisions will record the creator, URL, use and reuse basis;
attribution alone will not be treated as permission for public republication.

## Comparison protocol: Gate 1

Question: should the homepage lead with an archival narrative or immediate course
orientation? A and B use one shared course outline, assessments and source set.
Both preserve the institutional identity. Information order and composition vary;
this is a paired design comparison, not an isolated-variable causal experiment.

Tasks for inspection:

1. Identify the course, audience and central question.
2. Find the week about Ordinal Scale and its historical question.
3. Find what the exhibition is worth and whether coding is required.
4. Locate the source/continuity boundary and navigate between A and B.

Inspect desktop and mobile layout, headings, focus, navigation, overflow and console.
Record actual observations and refinements in the Gate 1 review note. The user then
judges appeal and clarity. No fabricated timing, participant count, preference or
statistical significance will be reported.

## Decision log

| ID | Decision | Evidence | State / next check |
| --- | --- | --- | --- |
| R01 | Preserve the gold/bronze Slop identity and create original archival artwork | README and installed slop.css; approved historical course premise | Preview built and visually inspected; see Gate 1 review |
| R02 | Use unlisted preview routes before selecting a homepage | User requires review before expansion; avoids presenting unfinished curriculum as complete | Both variants inspected; human preference remains pending |
| R03 | Reuse current harness study; add precise review-gate and research pointers | Existing paired results and this explicit user request | Six planning/research lines added, then one navigation-check refinement; no new benchmark claim |
| R04 | Stage the full curriculum after a complete sample unit | User's gates and incremental-delivery evidence | Gate 2 begins only after Gate 1 feedback |
| R05 | Keep the existing checkout with exclusive file ownership | Known planning changes and no conflicting implementation worker | Reassess isolation if edits overlap; no mechanical worktree creation |

## Next review triggers

Update this record when a new API is needed, a source contradicts the course text,
a browser/test failure changes the approach, a comparison changes the design, or
human feedback alters the goal. For a routine known edit, check the relevant local
contract instead of reopening a broad literature survey. Log the question, evidence,
choice, observed result and unresolved limit. Keep this file useful to the next
implementation step rather than accumulating unrelated references.

### Evaluator probe, 27 September

A read-only reproduction compared the current lecture-link regex with linkedom
(the parser already installed with the theme). The invalid fragment
`<a title="Use href='/comp4020-ass2-Naaeeen/decks/week-01/'">Slides</a>`
produced one regex match and zero actual anchors with an href. This confirms the
previous study's blind spot in the current spec implementation. No site content
was modified by the probe. Correct and regression-test the parser before relying
on the deck-link assertion for the representative teaching unit. The valid starter
deck link itself was not shown to be broken.

### Gate 1 outcome

[The review record](planning/gate-1-review.md) records the initial comparison,
actual browser defects, two refinements and independent review reconciliation.
We consulted the [W3C disclosure example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)
when fixing mobile fragment navigation. Its ordinary navigation semantics and
Escape/focus behavior informed a small page-local handler. The example is guidance;
passing our focused cases does not establish assistive-technology certification.

The first phone composition delayed course orientation. Moving the premise and
prerequisites into the shared opening brought them into the first viewport in both
variants. We retained two valid alternatives for the student to judge. No human
A/B result has been collected, and no full course-completion claim is made.

## Immersive design revision — 27 September

The student asked for a more vivid, immersive result, research beyond course
websites, suitable additional APIs/packages, and implementation commits/pushes.
The [goals](planning/implementation-goals.md) were expanded and pushed in
`2bdf84d`; the remote hash was checked against the local commit. This is a Gate 1
revision, not an assumed A/B preference or permission to skip human review.

### Platform permission

The live [brief](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/assessments/assignment-2/)
and [upstream README](https://github.com/comp4020-agentic-coding-studio/template-course-site/blob/main/README.md)
allow custom components and visual treatment while retaining Slop identity,
collections, build and generated API. They do not impose a general ban on added
browser libraries. We infer that a self-hosted decorative scene and motion library
fit these customization points; neither replaces the Astro stack or course API.
No hosted service, account, live-data API or key is needed for this candidate.

### References examined and their use

| Reference | What was actually examined | Transfer to After Aincrad |
| --- | --- | --- |
| [Apple AirPods Pro](https://www.apple.com/airpods-pro/) | Live browser opening and scrolled sections: large product image, clear type, retained navigation, transitions into short visual chapters | A single dominant hero scene, readable introduction and sectional storytelling; no copied product assets or claim about Apple's private implementation |
| [Bruno Simon](https://bruno-simon.com/) and [Folio 2025 source](https://github.com/brunosimon/folio-2025/blob/main/readme.md) | Live opening miniature scene and author README describing ordered simulation/rendering and an asset pipeline | A cohesive original miniature world with a controlled palette; use a small inspectable scene, without recreating a driving game or borrowing its art |
| [a-lign: Webflow Symphony](https://www.a-lign.studio/work/the-webflow-symphony) | Original author case study describing chapters, timeline navigation and GSAP sequencing | Tie animation to a narrative structure; keep the story understandable without motion. The full live Symphony experience was not browser-tested here |
| [The Pudding: Scrollama](https://pudding.cool/process/introducing-scrollama/) | Original 2017 explanation of intersection-triggered story steps and a persistent graphic | Learn the text-to-visual relationship; use current browser/layout techniques and ordinary mobile flow rather than importing an old desktop implementation |

A research subagent supplied leads and limitations. The parent independently read
the original sources and inspected the Apple/Bruno pages. Bruno's rendered entry
scene demonstrates art direction; its minimal accessibility-tree text also reinforces
our decision to keep course navigation and meaning in ordinary HTML. This is a
local design inference, not an accessibility audit of his portfolio.

### Dependency decision

| Candidate | Verified current evidence | Decision |
| --- | --- | --- |
| Native CSS/Web Animations | [MDN Web Animations guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API) documents playback controls; existing CSS handles normal hover/focus feedback | Keep native styling for small states and maintain visible default content |
| GSAP | npm and installed package **3.15.0**; [official docs](https://gsap.com/docs/v3/) cover sequencing and [media-query cleanup](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/) | Adopt one coordinator for finite entrances and chapter transitions, with explicit pause/reduced-motion handling |
| Motion | npm **13.4.4**, MIT; [vanilla quick start](https://motion.dev/docs/quick-start) confirms React is not required | Credible alternative, not installed alongside GSAP because two coordinators add little to this candidate |
| Three.js | npm and installed package **0.186.1**, MIT; current renderer source inspected; **@types/three 0.186.0** installed | Lazy-load one original procedural illustration with HTML controls and a static SVG alternative |

The researcher's Three.js development-branch version differed from the published
package. We used the registry and installed manifest to resolve it. GSAP is under
its [standard no-charge licence](https://gsap.com/standard-license), not MIT;
Three.js's installed MIT licence was checked. Package versions are pinned. These
choices reflect this proposed experience, not a benchmark proving one library best.
Registry unpacked size is not the website's transfer size; measure built chunks.

### Motion and access decisions

[W3C's pause/stop/hide guidance](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
and [tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) inform the controls.
The scene will have a clear pause control; reduced motion will produce immediate
state changes. Canvas contains illustration only. Chapter content exists in the
server-rendered page and becomes an accessible tab interface after initialization.
Keyboard support follows its actual orientation and must survive live resizing.

Candidate C combines an inspectable floating world, finite typographic entrance,
chapter selection and the complete twelve-week outline. Its illustration is a
course interpretation, not a canonical map. Self-hosted code and procedural artwork
avoid blocking the course on an external content service.

Provisional engineering targets: additional compressed animation/scene JavaScript
around 300 KB or less, one canvas, device pixel ratio capped at 1.5, and no running
scene loop while hidden/offscreen/paused. These are our targets to inspect, not
assignment requirements or measured outcomes. Actual results belong in the
[motion review record](planning/gate-1-motion-review.md).

### Dependency audit follow-up

`pnpm audit --prod` reported seven advisory entries in the existing platform
(Astro, sharp, js-yaml, SVGO and devalue); neither added animation library appeared
in the report. The [Astro AVIF advisory](https://github.com/withastro/astro/security/advisories/GHSA-26w7-cxv4-gfx2)
and [sharp advisory](https://github.com/lovell/sharp/security/advisories/GHSA-rgj7-g3m4-5g8c)
require processing malicious image input. Static deployment does not eliminate
image decoding during builds, so the compatible patch was worthwhile before
adding new media. This was an advisory finding, not evidence of compromise.

An independent source triage agreed on Astro 7.2.8 and sharp 0.35.4. The parent
checked the actual installed manifests and lockfile after a targeted update:
Astro **7.2.8**, sharp **0.35.4**, js-yaml **4.3.2**, SVGO **4.1.0**, devalue
**5.9.4**. Existing Slop/theme package versions and integration configuration are
unchanged. The devalue advisory's metadata and description disagree on its first
fixed version; the installed 5.9.4 exceeds both stated thresholds.

The follow-up production audit exited 0 with zero reported advisories. The
post-update baseline build checked 18 pages, with no type/accessibility/link error;
four spec checks passed and the existing twelve-week coverage check remained red.
Local build log: `/tmp/a2-motion-dependencies-0q0k4auc.log`. This validates the
compatible refresh, not the still-in-progress C preview or all possible security
properties. The working three-dimensional scene module also typechecked in this
run; its visual and real browser lifecycle validation remain separate.

### Motion revision results

[The motion review](planning/gate-1-motion-review.md) records the actual cases and
limits. The browser showed a near-invisible initial text entrance, tiny phone
labels, an inherited no-script menu gap and stale chapter return state. We kept
text opaque, enlarged labels, supplied plain no-script navigation, and used the
[History API](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState)
to keep the selected chapter's deep link current without adding history entries.
The final source reviewer found no actionable issue. [03159e6](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/03159e6)
contains the refinements and the corresponding CLAUDE.md checks.

Scene/control compressed files total 171,420 gzip bytes, inside our provisional
300 KB target. The raw optional scene remains above Vite's 500 KB warning threshold;
we kept the warning, tested delayed/failed loading and retained the static alternative.
No GPU frame-rate claim follows from the measurements. Vendor notices stripped by
minification are carried in a linked public notice file. The student's preference
between A/B and the immersive C direction is the next decision, not an agent score.

Consequential review findings and rule changes now feed the curated
[process evidence bank](PROCESS-EVIDENCE.md), as explicitly requested by the student.

## Reference-led Aincrad revision — 27 September 2026

**Trigger.** The student found C's Aincrad insufficiently faithful and its motion
too limited. This is actual negative design feedback, not an inferred preference
or a failed automated test. They invited existing official/fan imagery and models
for the private preview.

| Primary source | Verified evidence | Decision / limit |
| --- | --- | --- |
| [Official SAOA art award](https://www.swordart-online.net/SAOA/) and [Aincrad exterior](https://www.swordart-online.net/SAOA/img/10/thumb_01.jpg) | Parent inspected the image: continuous tapered grey body, closely layered bands, broad lower mass, radial arms and hanging structures, small summit | Use as the original-anime visual anchor; proportions are observations, not canonical measurements. Reference only, not a copied site asset |
| [Official episode 2 synopsis](https://www.swordart-online.net/aincrad/story/?id=ep02) | The Japanese synopsis explicitly describes one hundred floors | Support the dense layered structure; no unverified kilometre dimensions |
| [Castle Aincrad, mhil](https://sketchfab.com/3d-models/castle-aincrad-d1069b4ceb054f328d26fd444e3ea617) | Parent checked public model metadata: CC BY 4.0, downloadable, 169,062 faces and 85,033 vertices. Browser inspection showed its rendered exterior and a device-weight warning. Download opens a login dialog | Useful silhouette reference. No model downloaded, imported or viewer buffers extracted; original file formats/sizes remain unverified |
| [TheGabmeister: Aincrad](https://thegabmeister.com/p/aincrad/) | Creator describes dynamic lighting, cloud cards/TrueSky and a modified StefansArya mesh | Transfer layered atmosphere and light to a lightweight local illustration; no assumption that the creator's textures/mesh are licensed for reuse |
| [Three.js LatheGeometry](https://threejs.org/docs/pages/LatheGeometry.html), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | Current primary APIs support a revolved body and scroll-linked composition | Check installed Three 0.186.1 / GSAP 3.15.0 and the actual result. Additional services are unnecessary for this bounded revision |

The first model optimized for a small warm miniature before establishing the
recognizable structure. Its open terraces and large golden castle were a poor
match for the reference. Slop's UI palette remains fixed; that does not justify
recolouring the depicted architecture. The revision retains the course's identity
while using a cooler material palette inside the artwork.

Initial acceptance plan: compare the new render with the inspected reference and
the saved old C screenshot, then exercise pause, device
preference changes, native scroll, responsive tabs and fallback. Do not report a
build or a source review as proof of resemblance or smooth frame rate.

### Additional primary design accounts checked by the parent

- [Lusion's Oryzo production account](https://blog.lusion.co/oryzo-bts-part-2-7-3d-design-and-motion-graphics) describes testing several representations, then concentrating detail where the camera sees it and combining detailed props with simpler surfaces. Our inference: a constrained, carefully lit fortress and cloud layers can improve this hero without importing its expensive production pipeline. We did not benchmark or copy their splat assets.
- [Active Theory's founders](https://www.commarts.com/webpicks/active-theory-2) describe a simple navigation structure with scroll-responsive feedback and WebGL atmosphere. Our inference: keep stable HTML course links, use animation to respond to selection, and concentrate visual spectacle in the world. No networked cursor system is needed here.
- [Three Material documentation](https://threejs.org/docs/pages/Material.html) explains the draw-call cost of double-sided transparent materials and the grain tradeoff of alpha hashing. Use few shared cloud layers and check transparency in the actual renderer.
- [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/) documents automatic animation/trigger reversion on media-query changes and separate custom cleanup. The existing explicit lifecycle may be retained if it covers those same transitions; adding a second lifecycle abstraction is not itself an improvement.

These source accounts inform design decisions. They do not establish that our
implementation shares those studios' quality, performance or production budget.

### Revision 2 implementation and verified outcome

The new scene uses Three.js 0.186.1 with an original revolved shell of 100 floor
bands, lower foundation, radial bridges, a small summit, generated surface maps
and layered cloud cards. No remote image, model, account or additional service is
required at runtime. The student subsequently asked for both more 2D/3D animation
and larger amplitude: normal mode now uses about +/-18 degrees of slow yaw,
larger cloud travel and a bounded scroll-dependent camera change. The site adds
three chapter SVG compositions, path drawing and a traveling marker, a moving
selection rail, stronger finite entrances, hover feedback and a reading indicator.

The installed GSAP timeline API was checked against the
[primary timeline documentation](https://gsap.com/docs/v3/GSAP/Timeline/). Native
passive scroll events plus one scheduled animation-frame callback were sufficient;
ScrollTrigger was evaluated but not added. Reading progress is functional and
continues under reduced motion; nonessential movement is stopped.

The parent inspected the render at verified 1920x1080 and 390x844. The continuous
body, foundation and bridges now correspond to the inspected exterior reference,
while the actual artwork remains an original interpretation. The larger effects
were checked in use, not inferred from CSS duration values. Paused hero captures
were identical. The visible SVG marker changed coordinates while running and
reduced-motion chapter captures were identical. All three views remained usable
in reduced mode; mobile navigation closed and focused the requested assessment.
Responsive keyboard tabs, selected-fragment Back behavior and the no-script
content/navigation/artwork were checked. See the revision test record for limits.

Independent source review found windows embedded in the sloping exterior. The
first centre-offset correction was insufficient at their lower corners. The final
planes follow the actual wall normal above the floor lip; the reviewer confirmed
that this resolves the geometry relationship. A separate worker reported isolated
mock-renderer geometry/lifecycle checks; its inline harness was not retained, so
those are not described as parent-reproduced tests or real GPU profiling.

Parent visual inspection found abruptly clipped clouds at the canvas edges. A
horizontal edge mask softens those boundaries without fading the central fortress.
No style or integration change was made to the fixed Slop branding or platform.

Full check: `/tmp/a2-aincrad-final-77p3_n74.log`, zero type errors/warnings/hints,
19-page build/accessibility/links passed, spec four passed/one known incomplete
twelve-week failure. After the cloud-only CSS refinement the build passed again:
`/tmp/a2-cloud-edge-refinement-jqe4o4x6.log`. Optional scene raw/gzip bytes:
575292 / 144638; controller+GSAP: 79314 / 30250; combined gzip 174888 bytes.
This measures compressed output, not hosted transfer or GPU timing. The raw chunk
warning remains visible. Production dependency audit returned zero advisories.

Implementation: [06ce955](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/06ce955).
Goals, research and reference-checking harness rule: [8d518f9](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/8d518f9).

### Browser-check recovery

Two test-tab handles disappeared from the browser session, and the 127.0.0.1
origin later reported DPR 1.8 and a smaller CSS viewport than requested. These
were recorded as verification-environment problems, not website bugs. Reusing
the connected browser and opening the same local build at localhost produced
DPR 1 with measured 1920x1080 and 390x844 viewports. No browser profile, global
setting or permission was changed. The cause of the disappearing tabs was not
established; the successful replacement checks are the acceptance evidence.

## Gate 2: from an accepted scene to a teachable unit

The student accepted revised C's broad direction and restated the process
requirements. Continue one slice at a time, then stop for human judgement. The
[claim ledger](planning/gate-2-source-ledger.md) and
[comparison/check record](planning/gate-2-review.md) make the next step inspectable.

### Requirements and upstream recheck

The parent re-read the [A2 brief](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/assessments/assignment-2/)
and current [upstream README](https://github.com/comp4020-agentic-coding-studio/template-course-site).
A representative unit is our review milestone; the final requirements still
include the whole coherent course, dates, weights, deck, checks and evidence.
The [week 4 context lecture](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/lectures/week-4/)
and [week 5 verification lecture](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/lectures/week-5/)
remain relevant to concise guidance and actual-output verification. Researcher
findings about lecture guidance are treated as recommendations, not new fixed
platform rules or permission to install unrelated tools.

Upstream main was reported as ecd1d71228e40105310fcb25e1bcf00cc5ed5284; the parent
opened [that exact spacing-fix commit](https://github.com/comp4020-agentic-coding-studio/template-course-site/commit/ecd1d71228e40105310fcb25e1bcf00cc5ed5284).
Its compressHTML option addresses wrapped prose spacing. Check the actual slice
before adopting it. Local installed Astro 7.2.8 and Astromotion 0.23.0 remain the
implementation baseline; newer upstream versions do not require a wholesale
migration. The installed deck route supports published:false and initializes a
1280x720 Reveal canvas, so phone text needs explicit browser verification.

### External practice, interpreted for this project

| Primary source checked | Finding and project decision | Limit |
| --- | --- | --- |
| [OpenAI eval guidance](https://developers.openai.com/api/docs/guides/evaluation-best-practices) | Use task-specific pass/fail checks and a same-content paired comparison; retain human calibration | The guide does not prove a teaching layout improves learning; our walkthrough is not a controlled learner trial |
| [Anthropic multi-agent account](https://www.anthropic.com/engineering/multi-agent-research-system) | Bounded research questions and owned file sets reduce overlap; parent integrates and verifies | Their research-system gains do not transfer automatically to coding or justify agents for every small task |
| [Gloaguen et al., inspected v1](https://arxiv.org/html/2602.11988v1) | Conclusion distinguishes marginally negative generated context from marginal developer-written gains, with more steps. Keep the harness compact and tied to this course | Python-heavy issue-resolution evaluation; not a verdict on all safety, maintainability or coursework uses of context files |
| [Huang et al.](https://arxiv.org/abs/2310.01798) | Intrinsic correction without external feedback can fail; treat model critiques as leads checked against sources, tests and browser output | Older reasoning-model/task evidence, not proof that present reviewers are useless; parent checked abstract, not every experimental detail |
| [Liang et al.](https://arxiv.org/abs/2403.07183) | Corpus-level vocabulary shifts are not reliable authorship judgements about a single page | Parent checked the abstract/current version metadata; no detector score or banned-word claim follows |
| [GOV.UK clear-language guidance](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-language/) | Replace vague praise with concrete student actions; explain necessary specialist terms | Keep source qualifications that change meaning; do not turn clarity into a ban on passive voice or useful nuance |
| [CMU Eberly alignment](https://www.cmu.edu/teaching/assessment/basics/alignment.html) | Connect the question, preparation, activity, output and assessment | Our fictional-history design and source choices remain our judgement |

### Bounded harness refinement

Replace the generic instruction to propose learning outcomes with a compact unit
alignment and source-purpose rule in CLAUDE.md. The official packet supports
fewer technical claims than common SAO recollection; it is promotional framing,
not survivor testimony. This is a newly explicit teaching requirement supported
by inspected sources, not a manufactured failed experiment. Detailed claims and
paper limitations stay in these linked records rather than inflating the harness.

The existing regex's quoted-title false positive is being corrected with parsed
HTML anchors and valid/invalid fixtures. parse5 8.0.1 is an exact test-only dev
dependency already present transitively; the parent inspected the diff and found
only a direct importer entry added, with existing resolved versions unchanged.
Actual parent tests, review outcomes and commits will be appended after integration.

### Gate 2 verification, refinements and delivery

The [review record](planning/gate-2-review.md) contains actual outcomes. The
[teaching implementation](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/4fc9cde)
promotes the accepted homepage, derives navigation and assessment facts from
published collections, supplies one full seminar/lecture/deck/assessment, and keeps
unfinished content explicitly staged or draft. A/B share the same session entry.

Source review found a genuine access gap: B's paraphrase lacked the evidence
needed for the lesson's worked inference. The fallback now preserves it. The
parent also accepted the reviewer's editorial suggestion to use SAO's entry,
exit and collective action as a concrete explanation of the analytical categories.
The reviewer checked those refinements against the primary packet.

Parent browser checks covered the linked teaching path, responsive reading,
all ten slides, native slide controls, no-script reading and the corrected
contents/current-page state. The phone card-spacing issue illustrates why a
bounding-box pass is not a legibility verdict. Early viewport mismatches and a
stale stylesheet after hash navigation were rejected as evidence and corrected.
This supports the small explicit reload/actual-viewport rule added to the harness.

Selected rendered source/lecture paragraphs retained their intended spaces around
inline links and emphasis. The upstream compressHTML issue was not reproduced in
this slice, so that configuration update was not applied. This is a scoped
observation, not a guarantee about every future MDX/HTML composition.

The [oracle repair](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/785b1ce)
passed all 31 parent-run fixtures. Final required check on patched tooling:
`/tmp/a2-gate2-patched-final-mk5lpl5s.log`, with zero type diagnostics, passing
21-page build/a11y/links and 35 passing spec tests. The only failure is honest
coverage of Week 2 rather than all twelve weeks. A subsequent no-script CSS
specificity fix passed the build at `/tmp/a2-gate2-noscript-final-469xb2q4.log`.
The submission evidence gate still rejects the retained starter files/images
and unfilled PROCESS.md; unpublished staging does not bypass it.

The complete dependency audit additionally found development-only fast-uri and
Vitest/mocker advisories. Parent and worker checked the maintainers' descriptions:
[fast-uri IPv6 normalization](https://github.com/fastify/fast-uri/security/advisories/GHSA-f65p-4m7j-42xc)
requires a consumer that trusts normalized untrusted URLs; the
[Vitest mocker issue](https://github.com/vitest-dev/vitest/security/advisories/GHSA-82fw-gwwq-j7x9)
depends on a reachable mock-registration path. The described unauthenticated
standalone-plugin exposure was not found in this static course configuration.
No exploit or compromise was claimed. Compatible patches in
[2752781](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/2752781)
leave Astro/theme/Astromotion versions intact. The parent inspected the exact
nine-package version family diff and the zero-advisory post-patch audit JSON.

The student still needs to review teaching depth, voice, layout and slide usability.
Completing one unit establishes a usable pattern, not the coherence of twelve
weeks or a promised grade.
